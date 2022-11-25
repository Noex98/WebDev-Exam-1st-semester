-- Active: 1669371901231@@mysql70.unoeuro.com@3306@ahusted_dk_db

DROP TABLE users;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    phoneNumber VARCHAR(50)
)

CALL RegisterUser('$name', '$email', '$phonenumber', '$encryptedPassword');