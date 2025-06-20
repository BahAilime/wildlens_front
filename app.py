from flask import Flask, render_template
from flask_wtf.csrf import CSRFProtect
from dotenv import load_dotenv
import os

load_dotenv()

BACKEND_BASE_URL = os.getenv("BACKEND_BASE_URL")
print(BACKEND_BASE_URL)

app = Flask(__name__)

csrf = CSRFProtect()
csrf.init_app(app)


@app.route("/")
def index():
    return render_template("index.html", BACKEND_BASE_URL=BACKEND_BASE_URL)


@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/scan")
def scan():
    return render_template("scan.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
