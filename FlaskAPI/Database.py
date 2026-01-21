from sqlalchemy import create_engine, text
import re
from pathlib import Path
import os

DB_FILE = "database.db"
SQL_FILE = "FlaskAPI/Library.sql"

DATABASE_URL = f"sqlite:///{DB_FILE}"

engine = create_engine(
    DATABASE_URL,
    echo=True,          
    future=True
)

def execute_query(query):
    with engine.connect() as connection:
        result = connection.execute(
            text(query)
        )
        for row in result:
            print(row)

def newuser(username:str, password:str):
    user_unsafe = bool(re.match(r'^[A-Za-z0-9_]+$', username))
    pass_unsafe = bool(re.match(r'^[A-Za-z0-9_]+$', password))

    

sql_text = Path(SQL_FILE).read_text()


with engine.begin() as connection:
    for command in sql_text.split(';'):
        connection.exec_driver_sql(command + ';')