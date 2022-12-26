from flask import Flask, render_template

app = Flask(__name__)

@app.route("/api", methods=["GET"])
def main():
    return render_template("api.html")

@app.route("/api/healthcheck", methods=["GET"])
def healthcheck():
    return "<h1>Working</h1>"