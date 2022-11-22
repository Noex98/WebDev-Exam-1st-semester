<?php declare(strict_types=1);
class Database extends mysqli {
    private $server = "mysql70.unoeuro.com";
    private $username = "knickering_dk";
    private $password = "k59EBbxtdah2g4GcFDpH";
    private $database = "knickering_dk_db";

    function __construct(){
        parent::__construct($this->server, $this->username, $this->password, $this->database);
    }
}