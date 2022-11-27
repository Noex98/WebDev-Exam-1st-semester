<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . "/classes/Database.php");

class AuthService {
    private $mySQL;

    public function __construct(){
        $this->mySQL = new Database;
    }

    function registerUser(
        string $name,
        string $email,
        string $phonenumber,
        string $password
    ): bool {
        $encryptedPassword = password_hash($password, PASSWORD_DEFAULT);

        $q = "SELECT * FROM users WHERE email = '$email'";
        $res = $this->mySQL->query($q);
        $row = mysqli_num_rows($res);
        if ($row < 1) {
            $q = "CALL RegisterUser('$name', '$email', '$phonenumber', '$encryptedPassword')";
            $this->mySQL->query($q);
            return true;
        } else {
            return false;
        }
    }

    function logout(): void {
        session_unset();
        session_destroy();
        session_write_close();
        setcookie(session_name(), '', 0, '/');
        session_regenerate_id(true);
    }

    function authorize(string $email, string $password): int | false {
        $q = "SELECT * FROM users WHERE email = '$email'";
        $res = $this->mySQL->query($q);
        $user = $res->fetch_object();
        if ($user) {
            $q = "SELECT password FROM userPrivate WHERE id = '$user->id'";
            $res = $this->mySQL->query($q);

            //to do? clean up code. fetch variable instead of object
            $userPassword = $res->fetch_object();
            $loginSucces = password_verify($password, $userPassword->password);
            return $loginSucces ? $user->id : false;
        } else {
            return false;
        }
    }

    function authenticate(): int | false {
        if (!session_id()) {
            session_start();
        }
        return isset($_SESSION['authToken']) ? $_SESSION['authToken'] : false;
    }
}