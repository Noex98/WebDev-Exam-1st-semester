<?php declare(strict_types=1);
class Database extends mysqli {
    private static $server = "mysql70.unoeuro.com";
    private static $username = "knickering_dk";
    private static $password = "k59EBbxtdah2g4GcFDpH";
    private static $database = "knickering_dk_db";

    function __construct(){
        parent::__construct($this->server, $this->username, $this->password, $this->database);
    }
}