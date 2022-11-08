<?php
include_once($_SERVER['DOCUMENT_ROOT'] . "/sqlConfig.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/models/utils.php");

class UserModel{
    private $mySQL;

    public function __construct($mySQLConnection){
        $this->mySQL = $mySQLConnection;
    }

    function getMatches($id){
        $q = "SELECT * FROM preferences WHERE id = '$id'";
        $result = $this->mySQL->query($q);
        $preferences = mysqli_fetch_assoc($result);
        $q = "CALL getPotentialMatches('" . $preferences['heightMin'] . "', '" .  $preferences['heightMax'] . "', '" . $preferences['ageMin'] . "', '" . $preferences['ageMax'] . "', '" . $preferences['gender'] . "')";
        $result = $this->mySQL->query($q);
        
        while ($row = mysqli_fetch_assoc($result)) {
            $row['age'] = calcAge($row['birthday']);
            $matches[] = $row;
        }
        return $matches;
    }


    function getUser($id){
        $q = "SELECT * FROM users  WHERE id = '$id'";
        $res = $this->mySQL->query($q);
        $output = mysqli_fetch_assoc($res);
        $output['age'] = calcAge($output['birthday']);

        $q = "SELECT * FROM preferences  WHERE id = '$id'";
        $res = $this->mySQL->query($q);
        $output['preferences'] = mysqli_fetch_assoc($res);
        return $output;
    }

    function editUserProfile($id, $firstname, $lastname, $birthday, $gender, $height){
        $q = "CALL EditUserProfile( '$id', '$firstname', '$lastname', '$birthday', '$gender', '$height' )";
        $this->mySQL->query($q);
    }

    function setPreferences($id, $heightMin, $heightMax, $ageMin, $ageMax, $gender){
        $q = "CALL `SetPreferences`('$id', '$heightMin', '$heightMax', '$ageMin', '$ageMax', '$gender');";
        $this->mySQL->query($q);
    }
}

$userModel = new UserModel($mySQL);
