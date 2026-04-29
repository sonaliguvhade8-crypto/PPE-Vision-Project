from ultralytics import YOLO
import cv2
import os

# Load model
model = YOLO("Model/ppe.pt")

# Folder jithe images aahet
folder = "test_media"

cv2.namedWindow("PPE Image Detection", cv2.WINDOW_NORMAL)

# Loop through images
for file in os.listdir(folder):

    if file.endswith(".jpg") or file.endswith(".png"):

        path = os.path.join(folder, file)

        print("Processing:", file)

        img = cv2.imread(path)

        if img is None:
            print("❌ Image not loaded:", file)
            continue

        # Detection
        results = model(img, conf=0.5)

        # Draw boxes
        annotated = results[0].plot()

        # 🔥 Resize (NO distortion)
        h, w, _ = annotated.shape
        scale = 600 / h
        new_w = int(w * scale)
        new_h = int(h * scale)

        resized = cv2.resize(annotated, (new_w, new_h))

        # Show image
        cv2.imshow("PPE Image Detection", resized)

        # Wait for key
        key = cv2.waitKey(0)

        if key == ord('q'):
            break

cv2.destroyAllWindows()