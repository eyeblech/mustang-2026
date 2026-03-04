import os
from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)
app.secret_key = "mustang_secret_key"
PASSWORD = os.getenv("APP_PASSWORD")

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        if request.form.get("password") == PASSWORD:
            session["logged_in"] = True
            return redirect("/home")
    return render_template("login.html")

@app.route("/home")
def home():
    if not session.get("logged_in"):
        return redirect("/")

    image_folder = os.path.join("static", "images")
    images = [f for f in os.listdir(image_folder)
              if f.lower().endswith((".jpg", ".jpeg", ".png"))]

    return render_template("index.html", images=images)

if __name__ == "__main__":
    app.run(debug=True)