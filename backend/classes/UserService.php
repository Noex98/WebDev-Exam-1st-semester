<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . "/classes/Database.php");

class UserService {
    private $mySQL;

    public function __construct(){
        $this->mySQL = new Database;
    }

    function getUser($userId){
        $q = "SELECT * FROM users WHERE id = '$userId'";
        $res = $this->mySQL->query($q);
        $output = mysqli_fetch_assoc($res);

        return $output;
    }

    function editUser($userId, $key, $value){

        $SAFE_key = $this->mySQL->real_escape_string($key);
        $SAFE_value = $this->mySQL->real_escape_string($value);

        $q = "UPDATE users SET $SAFE_key = '$SAFE_value' WHERE id = '$userId'";
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
        $SAFE_latitude = (float) $latitude;
        $SAFE_longtitude = (float) $longtitude;
        $SAFE_maxDistance = (float) $maxDistance;
        $SAFE_categories = $categories; //TBD
        $SAFE_searchString = $this->mySQL->real_escape_string($searchString);
        $SAFE_sortBy = $this->mySQL->real_escape_string($sortBy);

        // Triangulation stuff is from: https://stackoverflow.com/questions/2234204/find-nearest-latitude-longitude-with-an-sql-query
        $q = "SELECT DISTINCT restaurants.*,
        (
           6371 *
           acos(cos(radians($SAFE_latitude)) *
           cos(radians(latitude)) *
           cos(radians(longtitude) -
           radians($SAFE_longtitude)) +
           sin(radians($SAFE_latitude)) *
           sin(radians(latitude )))
        ) AS distance
        FROM restaurants " .

            (!!$categories ?
                "JOIN restaurantCategories ON restaurants.id = restaurantCategories.restaurantId
                JOIN categories ON categories.id = restaurantCategories.categoryId
                WHERE categoryId IN (" . implode(",", array_map('intval', $categories)) . ") "
                : " "
            ) .
            "HAVING distance < $SAFE_maxDistance " .
            (!!strlen($searchString) ? "AND name LIKE '%$SAFE_searchString%' " : "") .
            "ORDER BY $SAFE_sortBy ASC;";

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

    function getRestaurant($restaurantId){

        $SAFE_restaurantId = (int) $restaurantId;

        $q = "SELECT * FROM restaurants WHERE id = '$SAFE_restaurantId';";
        $res = $this->mySQL->query($q);
        $restaurant = mysqli_fetch_assoc($res);
        if (!$restaurant) {
            return false;
        }
        $q = "SELECT * from menuItems where resturantId = '$SAFE_restaurantId';";
        $res = $this->mySQL->query($q);
        $menuItems = [];
        while ($row = mysqli_fetch_array($res)) {
            $menuItems[] = $row;
        }
        $restaurant["menuItems"] = $menuItems;
        return $restaurant;
    }


    function deleteUser($userId){
        $q = "DELETE FROM users WHERE id='$userId';";
        $res = $this->mySQL->query($q);
        if (!$res) {
            return false;
        }
        $q = "DELETE FROM userPrivate WHERE id='$userId';";
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


    function deleteReservation($userId, $reservationId){

        $SAFE_reservationId = (int) $reservationId;

        $q = "DELETE FROM reservations WHERE id = '$SAFE_reservationId' AND userId = '$userId';";
        $this->mySQL->query($q);
    }

    function createReservation($id, $restaurantId, $comment, $peopleNum, $time, $date){
        
        $SAFE_restaurantId = (int) $restaurantId;
        $SAFE_comment = $this->mySQL->real_escape_string($comment);
        $SAFE_peopleNum = (int) $peopleNum;
        $SAFE_time = $this->mySQL->real_escape_string($time);
        $SAFE_date = $this->mySQL->real_escape_string($date);

        $q = 
        "INSERT INTO reservations 
            ( userId, restaurantId, comment, peopleNum, status, time, date)
        VALUES 
            ('$id', '$SAFE_restaurantId', '$SAFE_comment', '$SAFE_peopleNum', 'accepted', '$SAFE_time', '$SAFE_date');";

        $res = $this->mySQL->query($q);
        return $res ? true : false;
    }
}
