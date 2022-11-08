-- Active: 1664263597767@@mysql70.unoeuro.com@3306@knickering_dk_db

CREATE TABLE userprofile (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    username VARCHAR(100)
);
CREATE TABLE userlogin (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_password VARCHAR(60)
);

CREATE TABLE userSettings (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    darkmode BOOLEAN
);

/*
SELECT * FROM userprofile INNER JOIN userSettings ON userprofile.id = userSettings.id WHERE userprofile.id = '1'
*/