-- Active: 1669113446860@@mysql70.unoeuro.com@3306@ahusted_dk_db

ALTER TABLE resturants MODIFY COLUMN image VARCHAR(500);

UPDATE resturants
SET `description` = 'Madklubben er danmarks bedste klub for mad. Her mødes folk om at spise mad sammen, inde i resturanten og ude i vores hyggelige gårdhave.'
WHERE id = 4;