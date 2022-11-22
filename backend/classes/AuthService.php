<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . "/classes/Database.php");

class AuthService {
    private $mySQL;

    public function __construct(){
        $this->mySQL = new Database;
    }

    function registerUser(
        $username,
        $password,
        $firstname,
        $lastname,
        $height,
        $birthday,
        $gender
    ){

        $encryptedPassword = password_hash($password, PASSWORD_DEFAULT);

        $q = "SELECT * FROM userLogin WHERE username = '$username'";
        $res = $this->mySQL->query($q);
        $row = mysqli_num_rows($res);
        if ($row < 1) {
            $q = "CALL RegisterUser('$username', '$encryptedPassword', '$firstname', '$lastname', '$height', '$birthday', '$gender')";
            $this->mySQL->query($q);
            return true;
        } else {
            return false;
        }
    }

    function logout(){
        session_unset();
        session_destroy();
        session_write_close();
        setcookie(session_name(), '', 0, '/');
        session_regenerate_id(true);
    }

    function authorize($username, $password){
        $q = "SELECT * FROM userLogin WHERE username = '$username'";
        $res = $this->mySQL->query($q);
        $user = $res->fetch_object();

        if ($user) {
            $loginSucces = password_verify($password, $user->password);
            return $loginSucces ? $user->id : false;
        } else {
            return false;
        }
    }

    function authenticate(){
        if (!session_id()) {
            session_start();
        }
        return isset($_SESSION['authToken']) ? $_SESSION['authToken'] : false;
    }
}