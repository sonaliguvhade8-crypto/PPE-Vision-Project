import os
from dotenv import load_dotenv
import cv2
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from ultralytics import YOLO
import threading

# Load env
load_dotenv()

sender_email = os.getenv("SENDER_EMAIL")
receiver_email = os.getenv("RECEIVER_EMAIL")
email_password = os.getenv("EMAIL_PASSWORD")


def send_email_in_background(image_path):
    if not sender_email or not receiver_email or not email_password:
        print("Email skipped")
        return

    def send_email_alert():
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = "Worker Safety Alert"

        body = "Worker detected WITHOUT Hardhat."
        message.attach(MIMEText(body, "plain"))

        with open(image_path, "rb") as attachment:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())

        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f"attachment; filename={image_path}")
        message.attach(part)

        try:
            with smtplib.SMTP("smtp.gmail.com", 587) as server:
                server.starttls()
                server.login(sender_email, email_password)
                server.sendmail(sender_email, receiver_email, message.as_string())
            print("✅ Email sent")
        except Exception as e:
            print("Email error:", e)

    threading.Thread(target=send_email_alert).start()


def main():

    model = YOLO("Model/best.pt")
    print("Model Classes:", model.names)

    cap = cv2.VideoCapture("test_media/video2.mp4")

    if not cap.isOpened():
        print("❌ Video not found")
        return

    print("Press Q to exit")

    last_email_time = time.time()

    # 🔥 WINDOW FIX (no distortion)
    cv2.namedWindow("PPE Detection Demo", cv2.WINDOW_NORMAL)

    while True:

        ret, frame = cap.read()

        if not ret:
            print("✅ Video ended")
            break

        # Fix 4 channel issue
        if frame is not None and len(frame.shape) == 3 and frame.shape[2] == 4:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGRA2BGR)

        results = model(frame, conf=0.5)

        # ✅ Clean YOLO output
        annotated_frame = results[0].plot()

        # 🔥 Detection logic
        hardhat_detected = False
        person_detected = False

        for result in results:
            if result.boxes is None:
                continue

            for box in result.boxes:
                cls = int(box.cls[0])
                label_name = model.names[cls]

                if label_name == "Hardhat":
                    hardhat_detected = True
                elif label_name == "Person":
                    person_detected = True

        # 🚨 Email trigger
        if person_detected and not hardhat_detected and (time.time() - last_email_time) > 10:
            img_path = "alert.jpg"
            cv2.imwrite(img_path, annotated_frame)
            send_email_in_background(img_path)
            last_email_time = time.time()

        # ❌ NO resize → no distortion
        cv2.imshow("PPE Detection Demo", annotated_frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()