from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash


print(generate_password_hash(
    password="password",
    method='pbkdf2:sha256',
    salt_length=16
    )
)