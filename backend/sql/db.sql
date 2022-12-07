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

SELECT * FROM restaurants WHERE id = '0'; DROP TABLE test/*'; */;

UPDATE users SET name = '' WHERE id = '2';