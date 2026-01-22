from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# User storage
users = {"test@example.com":
    {
        "password_hash": generate_password_hash("password123"),
        "name": "Test User"
    }
}

@app.route("/api/login", methods=["POST"])
def login_or_register():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # LOGIN
    stored_password = users.get(email).get("password_hash")

    if not stored_password or not check_password_hash(stored_password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {"email": email}
    }), 200


if __name__ == "__main__":
    print(users.get("password_hash"))
    app.run(debug=True)