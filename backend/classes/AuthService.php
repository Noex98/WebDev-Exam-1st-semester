<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . "/classes/Database.php");

class AuthService {
    private $mySQL;

    public function __construct(){
        $this->mySQL = new Database;
    }

    function doesUserExist($email): bool {
        $q = "SELECT * FROM users WHERE email = '$email'";
        $res = $this->mySQL->query($q);
        $row = mysqli_num_rows($res);
        return $row < 1 ? false : true;
    }

    function registerUser(
        string $name,
        string $email,
        string $phonenumber,
        string $password
    ): bool {
        $encryptedPassword = password_hash($password, PASSWORD_DEFAULT);

        $q = "CALL RegisterUser('$name', '$email', '$phonenumber', '$encryptedPassword')";
        return !!$this->mySQL->query($q);
    }

    function logout(): void {
        if(!isset($_SESSION)) { 
            session_start(); 
        }
        session_unset();
        session_destroy();
    }

    function authorize(string $email, string $password): int {
        $q = "SELECT * FROM users WHERE email = '$email'";
        $res = $this->mySQL->query($q);
        $user = $res->fetch_object();
        if ($user) {
            $q = "SELECT password FROM userPrivate WHERE id = '$user->id'";
            $res = $this->mySQL->query($q);

            //to do? clean up code. fetch variable instead of object
            $userPassword = $res->fetch_object();
            $loginSucces = password_verify($password, $userPassword->password);
            return $loginSucces ? intval($user->id) : -1;
        } else {
            return -1;
        }
    }

    function authenticate(): int {
        if(!isset($_SESSION)) { 
            session_start(); 
        }
        return isset($_SESSION['authToken']) ? intval($_SESSION['authToken']) : -1;
    }
}