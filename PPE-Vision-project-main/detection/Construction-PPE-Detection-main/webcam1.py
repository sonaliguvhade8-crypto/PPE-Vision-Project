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

# Load environment variables
load_dotenv()

sender_email = os.getenv("SENDER_EMAIL")
receiver_email = os.getenv("RECEIVER_EMAIL")
email_password = os.getenv("EMAIL_PASSWORD")


def draw_text_with_background(frame, text, position, font_scale=0.5,
                              color=(255,255,255), thickness=1,
                              bg_color=(0,0,0), alpha=0.7, padding=5):

    font = cv2.FONT_HERSHEY_SIMPLEX
    text_size = cv2.getTextSize(text, font, font_scale, thickness)[0]

    overlay = frame.copy()
    x, y = position

    cv2.rectangle(
        overlay,
        (x-padding, y-text_size[1]-padding),
        (x+text_size[0]+padding, y+padding),
        bg_color,
        -1
    )

    cv2.addWeighted(overlay, alpha, frame, 1-alpha, 0, frame)

    cv2.putText(frame, text, (x,y), font, font_scale, color, thickness)


def send_email_alert(image_path):

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

    part.add_header(
        "Content-Disposition",
        f"attachment; filename={image_path}"
    )

    message.attach(part)

    try:

        with smtplib.SMTP("smtp.gmail.com", 587) as server:

            server.starttls()
            server.login(sender_email, email_password)

            server.sendmail(
                sender_email,
                receiver_email,
                message.as_string()
            )

        print("Email sent successfully")

    except Exception as e:

        print("Email failed:", e)


def send_email_in_background(image_path):

    thread = threading.Thread(
        target=send_email_alert,
        args=(image_path,)
    )

    thread.start()


def main():

    model = YOLO("Model/ppe.pt")

    print("Model Classes:", model.names)

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():

        print("Camera not accessible")
        return

    print("Press Q to exit")

    colors = [
        (255,0,0),
        (0,255,0),
        (0,0,255),
        (255,255,0),
        (255,0,255),
        (0,255,255),
        (128,0,128),
        (128,128,0),
        (0,128,128),
        (128,128,128)
    ]

    last_email_time = time.time()

    cv2.namedWindow("YOLOv8 Annotated Feed", cv2.WINDOW_NORMAL)

    while True:

        ret, frame = cap.read()

        if not ret:
            break

        # Counters

        hardhat_count = 0
        vest_count = 0
        mask_count = 0
        gloves_count = 0
        boots_count = 0
        goggles_count = 0
        person_count = 0
        violation_count = 0

        hardhat_detected = False
        person_detected = False

        results = model(frame)

        for result in results:

            if result.boxes is None:
                continue

            for box in result.boxes:

                x1, y1, x2, y2 = map(int, box.xyxy[0])

                confidence = float(box.conf[0])
                cls = int(box.cls[0])

                label_name = model.names[cls]

                label = f"{label_name} {confidence:.2f}"

                color = colors[cls % len(colors)]

                cv2.rectangle(frame,(x1,y1),(x2,y2),color,2)

                draw_text_with_background(
                    frame,
                    label,
                    (x1,y1-10),
                    bg_color=color
                )

                # Detection logic

                if label_name == "Hardhat":

                    hardhat_count += 1
                    hardhat_detected = True

                elif label_name == "Safety Vest":

                    vest_count += 1

                elif label_name == "Mask":

                    mask_count += 1

                elif label_name == "Gloves":

                    gloves_count += 1

                elif label_name == "Boots":

                    boots_count += 1

                elif label_name == "Goggles":

                    goggles_count += 1

                elif label_name == "Person":

                    person_count += 1
                    person_detected = True

                elif label_name == "NO-Hardhat":

                    violation_count += 1

                    draw_text_with_background(
                        frame,
                        "NO HARDHAT!",
                        (x1, y1-30),
                        bg_color=(0,0,255)
                    )

                elif label_name == "NO-Safety Vest":

                    violation_count += 1

                    draw_text_with_background(
                        frame,
                        "NO SAFETY VEST!",
                        (x1, y1-50),
                        bg_color=(0,0,255)
                    )

        # Email alert

        if person_detected and not hardhat_detected and (time.time() - last_email_time) >= 10:

            image_path = "no_hardhat_frame.jpg"

            cv2.imwrite(image_path, frame)

            send_email_in_background(image_path)

            last_email_time = time.time()

        # Sideboard statistics

        sideboard = [

            f"People: {person_count}",
            f"Hardhats: {hardhat_count}",
            f"Safety Vests: {vest_count}",
            f"Masks: {mask_count}",
          
           

        ]

        y = 30

        for text in sideboard:

            draw_text_with_background(frame, text, (10,y))
            y += 30

        frame = cv2.resize(frame,(640,480))

        cv2.imshow("YOLOv8 Annotated Feed", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()