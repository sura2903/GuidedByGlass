# server_ingest.py
import asyncio
import websockets
import cv2
import numpy as np
import time
import os
from asyncio import Queue

os.makedirs("frames", exist_ok=True)

VLA_QUEUE: Queue = Queue()
REC_QUEUE: Queue = Queue()

async def handle_client(ws):
    print("Client connected")
    try:
        async for data in ws:
            if isinstance(data, bytes):
                arr = np.frombuffer(data, dtype=np.uint8)
                frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)
                if frame is None:
                    continue

                timestamp = time.time()
                fname = f"frames/frame_{int(timestamp*1000)}.jpg"
                cv2.imwrite(fname, frame)

                await VLA_QUEUE.put((timestamp, frame))
                await REC_QUEUE.put(frame)

    except Exception as e:
        print("Client handler error:", e)

    finally:
        print("Client disconnected")

async def server_main(host="0.0.0.0", port=8765):
    print("Starting ingestion server on", host, port)
    async with websockets.serve(handle_client, host, port, max_size=2**25):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(server_main())
