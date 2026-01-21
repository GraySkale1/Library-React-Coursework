PRAGMA foreign_keys = OFF;

DELETE FROM Access_Tokens;
DELETE FROM Lent_Books;
DELETE FROM Audit_Logs;
DELETE FROM Accounts;
DELETE FROM Account_type;
DELETE FROM Books;

DELETE FROM sqlite_sequence;

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Account_type (
    typeID INTEGER PRIMARY KEY AUTOINCREMENT,
    type_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Accounts (
    username TEXT PRIMARY KEY,
    pass_hash TEXT NOT NULL,
    typeID INTEGER NOT NULL,
    FOREIGN KEY (typeID) REFERENCES Account_type(typeID)
);

CREATE TABLE IF NOT EXISTS Access_Tokens (
    tokenID INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    DOC TEXT NOT NULL,
    token_data TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES Accounts(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Lent_Books (
    bookID INTEGER PRIMARY KEY,
    account TEXT NOT NULL,
    lent_date TEXT NOT NULL,
    return_date TEXT NOT NULL,
    FOREIGN KEY (account) REFERENCES Accounts(username) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Audit_Logs (
    logID INTEGER PRIMARY KEY AUTOINCREMENT,
    account TEXT NOT NULL,
    action TEXT NOT NULL,
    DOL TEXT NOT NULL,
    FOREIGN KEY (account) REFERENCES Accounts(username) ON DELETE CASCADE
);


-- Seed admin account type
INSERT INTO Account_type (type_name)
VALUES ('admin');

-- Seed admin account (references Account_type safely)
INSERT INTO Accounts (username, pass_hash, typeID)
SELECT
    'admin',
    'password',
    typeID
FROM Account_type
WHERE type_name = 'admin';