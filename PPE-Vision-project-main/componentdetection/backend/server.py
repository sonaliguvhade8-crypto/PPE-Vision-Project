import os
import subprocess
import threading
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Lock to prevent multiple detections
detection_lock = threading.Lock()

# Global variable to store detection process
detection_process = None


def run_detection():
    global detection_process
    try:
        project_path = r"C:\Users\sonal\OneDrive\Desktop\PPE-Vision-Project\PPE-Vision-project-main\detection\Construction-PPE-detection-main"
        script_path = os.path.join(project_path, "webcam.py")

        print(f"🔍 Running detection script at: {script_path}")

        if not os.path.exists(script_path):
            raise FileNotFoundError(f"Could not find {script_path}")

        python_path = r"C:\Users\sonal\OneDrive\Desktop\PPE-Vision-Project\.venv\Scripts\python.exe"

        # Start detection process
        detection_process = subprocess.Popen(
            [python_path, "webcam.py"],
            cwd=project_path
        )

        detection_process.wait()

    except Exception as e:
        print(f"❌ Error while starting detection: {e}")


@app.route("/start-detection")
def start_detection():
    if detection_lock.locked():
        return jsonify({"status": "Detection already running"}), 400

    thread = threading.Thread(target=run_detection_with_lock)
    thread.start()

    return jsonify({"status": "Detection started"}), 200


def run_detection_with_lock():
    with detection_lock:
        run_detection()


@app.route("/stop-detection")
def stop_detection():
    global detection_process

    if detection_process and detection_process.poll() is None:
        detection_process.terminate()
        detection_process = None
        return jsonify({"status": "Detection stopped"}), 200
    else:
        return jsonify({"status": "No detection running"}), 400


@app.route("/")
def home():
    return jsonify({"message": "Backend running"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)