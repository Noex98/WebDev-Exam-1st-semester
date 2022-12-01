-- Active: 1669113446860@@mysql70.unoeuro.com@3306@ahusted_dk_db

SELECT 
    restaurants.*, categories.name as categoryName
FROM 
    restaurants
JOIN restaurantCategories ON restaurants.id = restaurantCategories.restaurantId
JOIN categories ON categories.id = restaurantCategories.categoryId
;


SELECT DISTINCT restaurants.* ,
(
    6371 *
    acos(cos(radians(56.162939)) *
    cos(radians(56.162939)) *
    cos(radians(10.203921) -
    radians(10.203921)) +
    sin(radians(56.162939)) *
    sin(radians(56.162939 )))
) AS distance
FROM restaurants
HAVING distance < 100
ORDER BY distance ASC
;