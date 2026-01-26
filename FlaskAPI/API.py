from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
import pandas as pd

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "AkajnAJ&576N42@@2r22"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

# User storage
users = {"test@example.com":
    {
        "id": "1",
        "password_hash": generate_password_hash("password123"),
        "name": "Test User",
        "type": "Student"
    }
}

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400


    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # LOGIN
    try:
        stored_password = users.get(email).get("password_hash")
    except:
        return jsonify({"error": "Invalid credentials"}), 401


    return jsonify({
        "message": "Welcome {0}".format(users.get(email).get("name")),
        "access_token": create_access_token(identity=email)
    }), 200


@app.route("/api/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route("/api/profile/info", methods=["GET"])
@jwt_required()
def get_user_data():
    identity = get_jwt_identity()

    if not isinstance(identity, str):
        return jsonify({"error": "Invalid token identity"}), 400

    data = users.get(identity).get("name")

    if data is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify(name=users.get(identity).get("name"), acc_type=users.get(identity).get("type")), 200


@app.route("/api/library/query", methods=["POST"])
@jwt_required()
def query_books():
    query = request.get_json().get("query")
    
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    



if __name__ == "__main__":
    print(users.get("password_hash"))
    app.run(debug=True)