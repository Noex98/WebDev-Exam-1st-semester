<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . "/classes/Database.php");

class UserService {
    private $mySQL;

    public function __construct(){
        $this->mySQL = new Database;
    }

    function getUser($id){
        $q = "SELECT * FROM users  WHERE id = '$id'";
        $res = $this->mySQL->query($q);
        $output = mysqli_fetch_assoc($res);

        return $output;
    }

}