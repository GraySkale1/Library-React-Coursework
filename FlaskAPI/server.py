import Database
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from werkzeug.security import check_password_hash
from datetime import timedelta

app = Flask(__name__)
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

jwt = JWTManager(app)

# SQLAlchemy Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{Database.DB_FILE}"  # replace with your DB URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

# Define Accounts table model
class Account(db.Model):
    __tablename__ = 'Accounts'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)  # hashed password

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Username and password required"}), 400
    
    username = data['username']
    password = data['password']
    
    user = Account.query.filter_by(username=username).first()
    
    if user and check_password_hash(user.password_hash, password):
        # Generate JWT token
        access_token = create_access_token(identity=user.username)
        return jsonify({"token": access_token}), 200
    else:
        return jsonify({"msg": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)

    hashed_password = generate_password_hash(
    "password",
    method='pbkdf2:sha256',
    salt_length=16
    )

    new_account = Account(
        username="admin2",
        password_hash=hashed_password
    )

    db.session.add(new_account)
    db.session.commit()

