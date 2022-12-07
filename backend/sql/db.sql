-- Active: 1669113446860@@mysql70.unoeuro.com@3306@ahusted_dk_db

SELECT 
    restaurants.*, categories.name as categoryName
FROM 
    restaurants
JOIN restaurantCategories ON restaurants.id = restaurantCategories.restaurantId
JOIN categories ON categories.id = restaurantCategories.categoryId
;


SELECT restaurants.id, 
        restaurants.name,
        restaurants.email,
        restaurants.image,
        restaurants.phoneNumber,
        restaurants.price,
        restaurants.openTime,
        restaurants.closeTime,
        restaurants.description,
        restaurants.address,
        menuItems.title AS menuItemTitle,
        menuItems.description AS menuItemDescrition,
        menuItems.price AS menuItemPrice
        FROM restaurants
        INNER JOIN `menuItems`
        ON menuItems.`resturantId` = restaurants.id 
        WHERE restaurants.id = 3;

CREATE TABLE test (
    id INT
);
UPDATE users SET name = '' WHERE id = '2';

/*
INSERT INTO restaurants 
    (name, email, image, phoneNumber, price, openTime, closeTime, description, latitude, longtitude, adress)
VALUES
    (test, test, test, 1, 4, '17:00:00', '21:00:00')
*/