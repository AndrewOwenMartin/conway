from flask import Flask, jsonify, render_template
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/hello")
def hello():
    return "<p>Hello!</p>"


@app.route("/abc/<int:a>/<int:b>/<c>")
def ab_int(a, b, c):
    return f"<p>You are a {c} a={a}, b={b}, a*b={a*b}.</p>"


@app.route("/abc/<a>/<b>/<c>")
def ab_str(a, b, c):
    return f"<h2>You are a {a}-{b}-{c}.</h2>"


@app.route("/age/<dob>")
def age(dob):

    now = datetime.datetime.now()

    day, month, year = dob.split("-")

    date_of_birth = datetime.datetime(int(year), int(month), int(day))

    age_timedelta = now - date_of_birth

    years = int(age_timedelta.days // 365.2425)

    rude_old = "On your bike Grandad."

    rude_young = "Do you know what you want to be when you grow up?"

    return f"You are {years}. {rude_old if years > 36 else rude_young}"


users = {
    1: {"name": "Alice", "job": "Doctor"},
    2: {"name": "Bob", "job": "Fireman"},
    3: {"name": "Claire", "job": "Police"},
    4: {"name": "Dave", "job": "Greengrocer"},
    5: {"name": "Emily", "job": "Helicopter Pilot"},
}


@app.route("/template-test")
@app.route("/template-test/<name>")
def template_test(name="Andy"):
    return render_template("hello.html", name=name, users=users)


@app.route("/user/<user_id>")
def user(user_id):

    if user_id == "horse":
        return jsonify("I will not stand for this horsey nonsense."), 418

    try:
        user_id_int = int(user_id)
    except ValueError:
        return jsonify(f"user_id '{user_id}' not a valid integer."), 400

    try:
        user = users[user_id_int]
    except KeyError:
        return jsonify(f"There is no user_id '{user_id}'."), 404

    return jsonify(user)
