<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . "/classes/Database.php");

class UserService {
    private $mySQL;

    public function __construct(){
        $this->mySQL = new Database;
    }

    function getUser(int $id){
        $q = "SELECT * FROM users WHERE id = '$id'";
        $res = $this->mySQL->query($q);
        $output = mysqli_fetch_assoc($res);

        return $output;
    }


    function editUser(int $id, $key, $value){
        $q = "UPDATE users SET $key = '$value' WHERE id = '$id'";
        $res = $this->mySQL->query($q);
        return $res ? true : false;
    }

    /**
     * @param float latitude The users latitude
     * @param float longtitude The users longtitude
     * @param float maxDistance The maximum distance between user & restaurant allowed in results, - in kilometers
     */

    function getRestaurantList(
        float $latitude,
        float $longtitude,
        float $maxDistance,
        array $categories,
        string $searchString,
        string $sortBy
    ) {

        // Triangulation stuff is from: https://stackoverflow.com/questions/2234204/find-nearest-latitude-longitude-with-an-sql-query
        $q = "SELECT DISTINCT restaurants.*,
        (
           6371 *
           acos(cos(radians($latitude)) *
           cos(radians(latitude)) *
           cos(radians(longtitude) -
           radians($longtitude)) +
           sin(radians($latitude)) *
           sin(radians(latitude )))
        ) AS distance
        FROM restaurants " .

            (!!$categories ?
                "JOIN restaurantCategories ON restaurants.id = restaurantCategories.restaurantId
                JOIN categories ON categories.id = restaurantCategories.categoryId
                WHERE categoryId IN (" . implode(",", array_map('intval', $categories)) . ") "
                : " "
            ) .
            "HAVING distance < $maxDistance " .
            (!!strlen($searchString) ? "AND name LIKE '%$searchString%' " : "") .
            "ORDER BY $sortBy ASC;";

        $res = $this->mySQL->query($q);
        $output = [];

        if ($res) {
            while ($row = mysqli_fetch_assoc($res)) {
                $output[] = $row;
            }
        }

        return $output;
    }

    function getCategories(){
        $q = 'SELECT * FROM categories';
        $res = $this->mySQL->query($q);
        $categories = [];
        while ($row = mysqli_fetch_array($res)) {
            $categories[] = $row;
        }
        return $categories;
    }

    function getRestaurant($id){
        $q = "SELECT * FROM restaurants WHERE id = '$id';";
        $res = $this->mySQL->query($q);
        $restaurant = mysqli_fetch_assoc($res);
        if (!$restaurant) {
            return false;
        }
        $q = "SELECT * from menuItems where resturantId = '$id';";
        $res = $this->mySQL->query($q);
        $menuItems = [];
        while ($row = mysqli_fetch_array($res)) {
            $menuItems[] = $row;
        }
        $restaurant["menuItems"] = $menuItems;
        return $restaurant;
    }


    function deleteUser($id){
        $q = "DELETE FROM users WHERE id='$id';";
        $res = $this->mySQL->query($q);
        if (!$res) {
            return false;
        }
        $q = "DELETE FROM userPrivate WHERE id='$id';";
        $res = $this->mySQL->query($q);
        if (!$res) {
            return false;
        }
        return $res;
    }

    function getReservations($userId){
        $q = "SELECT
        reservations.id,
        reservations.restaurantId,
        reservations.time,
        reservations.peopleNum,
        reservations.date,
        reservations.comment,
        reservations.status,
        restaurants.name AS restaurantName,
        restaurants.image AS image
        FROM reservations
        JOIN restaurants
        ON reservations.RestaurantId = restaurants.id 
        WHERE reservations.userId = '$userId';";
        $res = $this->mySQL->query($q);
        $reservations = [];
        while ($row = mysqli_fetch_assoc($res)) {
            $reservations[] = $row;
        }
        return $reservations;
    }


    function deleteReservation($id){
        $q = "DELETE FROM reservations WHERE id = '$id';";
        $this->mySQL->query($q);
    }

    function createReservation($id, $restaurantId, $comment, $peopleNum, $time, $date){
        $q = "INSERT INTO reservations ( userId, restaurantId, comment, peopleNum, status, time, date)
        VALUES ('$id', '$restaurantId', '$comment', '$peopleNum', 'accepted', '$time', '$date');";
        $res = $this->mySQL->query($q);
        return $res ? true : false;
    }
}
