# vla_processor_from_frames.py
import time, os, json
from pathlib import Path
import cv2
import numpy as np
import easyocr
import mediapipe as mp

# Folders
FRAMES_DIR = Path("frames")
OUT_DIR = Path("output")
DEBUG_DIR = OUT_DIR / "debug"
OUT_DIR.mkdir(exist_ok=True)
DEBUG_DIR.mkdir(exist_ok=True)

# OCR (easyocr Reader)
reader = easyocr.Reader(["en"], gpu=False)  # set gpu=True if you have CUDA setup

# MediaPipe hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False,
                       max_num_hands=2,
                       min_detection_confidence=0.5,
                       min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

processed = set()

def preprocess_for_ocr(img):
    # Convert to grayscale, upscale, equalize to help OCR
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # upscale (helps small text)
    scale = 1.5
    gray = cv2.resize(gray, (0,0), fx=scale, fy=scale, interpolation=cv2.INTER_LINEAR)
    # histogram equalization
    gray = cv2.equalizeHist(gray)
    # optional bilateral filter to reduce noise while keeping edges
    gray = cv2.bilateralFilter(gray, d=5, sigmaColor=75, sigmaSpace=75)
    return gray

def classify_gesture(landmarks):
    # landmarks: MediaPipe landmark list with normalized coordinates (.x .y .z)
    # Determine finger extended or folded using tip vs pip y positions.
    # Note: coordinate system: y increases downward in image.
    try:
        def extended(tip_idx, pip_idx):
            return landmarks[tip_idx].y < landmarks[pip_idx].y

        fingers = {
            "thumb": extended(4, 2),
            "index": extended(8, 6),
            "middle": extended(12, 10),
            "ring": extended(16, 14),
            "pinky": extended(20, 18)
        }
        count = sum(1 for v in fingers.values() if v)
        # Fist: no fingers extended
        if count == 0:
            return "fist"
        # Open palm: all fingers extended (ignore thumb nuance)
        if fingers["index"] and fingers["middle"] and fingers["ring"] and fingers["pinky"]:
            return "open_palm"
        # Pointing: only index extended (others not)
        if fingers["index"] and not fingers["middle"] and not fingers["ring"] and not fingers["pinky"]:
            return "point"
        return "unknown"
    except Exception:
        return "unknown"

def process_frame(path: Path):
    img = cv2.imread(str(path))
    if img is None:
        return None
    h, w = img.shape[:2]

    # --- OCR ---
    pre = preprocess_for_ocr(img)
    try:
        # easyocr returns [ (bbox, text, conf), ... ] if detail=1, but detail=0 returns text only
        results = reader.readtext(pre, detail=1)
        # build readable text (filter low confidence)
        texts = []
        for (bbox, text, conf) in results:
            if conf >= 0.3:  # threshold; tune up if too many false positives
                texts.append(text)
        ocr_text = " ".join(texts).strip()
    except Exception as e:
        print("OCR error:", e)
        ocr_text = ""

    # --- Hand detection & gesture classification ---
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    res = hands.process(img_rgb)

    hands_out = []
    if res.multi_hand_landmarks:
        for hand_landmarks in res.multi_hand_landmarks:
            # get bounding box
            xs = [lm.x for lm in hand_landmarks.landmark]
            ys = [lm.y for lm in hand_landmarks.landmark]
            x_min, x_max = min(xs), max(xs)
            y_min, y_max = min(ys), max(ys)
            bbox = [int(x_min * w), int(y_min * h), int((x_max - x_min) * w), int((y_max - y_min) * h)]
            gesture = classify_gesture(hand_landmarks.landmark)
            hands_out.append({"bbox": bbox, "gesture": gesture})
            # draw on debug image
            mp_drawing.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            # draw bbox and gesture
            cv2.rectangle(img, (bbox[0], bbox[1]), (bbox[0]+bbox[2], bbox[1]+bbox[3]), (0,255,0), 2)
            cv2.putText(img, gesture, (bbox[0], bbox[1]-8), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)
    else:
        hands_out = []

    # annotate OCR text on debug image
    cv2.putText(img, f"OCR: {ocr_text[:120]}", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)
    debug_path = DEBUG_DIR / f"annot_{path.name}"
    cv2.imwrite(str(debug_path), img)

    out = {
        "frame": path.name,
        "ocr": ocr_text,
        "hands": hands_out,
        "ts": time.time()
    }
    return out

def main_loop(poll_interval=0.2):
    print("Starting processor, scanning frames folder:", FRAMES_DIR.resolve())
    while True:
        files = sorted([p for p in FRAMES_DIR.glob("*.jpg")])
        new = [p for p in files if p.name not in processed]
        for p in new:
            print("Processing", p.name)
            try:
                out = process_frame(p)
                if out:
                    with open(OUT_DIR / "latest.json", "w") as f:
                        json.dump(out, f)
                    # optional log line
                    with open(OUT_DIR / "history.log", "a") as flog:
                        flog.write(json.dumps(out) + "\n")
                processed.add(p.name)
            except Exception as e:
                print("Error processing", p, e)
        time.sleep(poll_interval)

if __name__ == "__main__":
    main_loop()
