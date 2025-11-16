# mock_glasses.py
import asyncio
import websockets
import cv2

URI = "ws://localhost:8765"

async def send_frames():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise RuntimeError("Cannot open webcam")

    async with websockets.connect(URI, max_size=2**25) as ws:
        print("Connected to ingestion server")
        while True:
            ret, frame = cap.read()
            if not ret:
                continue

            frame = cv2.resize(frame, (640, 360))
            _, jpg = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80])

            try:
                await ws.send(jpg.tobytes())
            except websockets.exceptions.ConnectionClosed:
                print("Server disconnected")
                break

            await asyncio.sleep(0.05)

if __name__ == "__main__":
    asyncio.run(send_frames())
