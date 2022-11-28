-- Active: 1669113446860@@mysql70.unoeuro.com@3306@ahusted_dk_db

ALTER TABLE resturants ADD COLUMN price INT AFTER phoneNumber;

ALTER TABLE resturants DROP COLUMN price;