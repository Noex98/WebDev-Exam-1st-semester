-- Active: 1669113446860@@mysql70.unoeuro.com@3306@ahusted_dk_db

SELECT 
*, 
(
   6371 *
   acos(cos(radians(56.162939)) * 
   cos(radians(latitude)) * 
   cos(radians(longtitude) - 
   radians(10.203921)) + 
   sin(radians(56.162939)) * 
   sin(radians(latitude )))
) AS distance 
FROM resturants 
HAVING distance < 28 

ORDER BY distance LIMIT 0, 20;