<?php declare(strict_types=1);
class Database extends mysqli {
    private $server = "mysql70.unoeuro.com";
    private $username = "ahusted_dk";
    private $password = "243rbtHnydmfa6xgwFpk";
    private $database = "ahusted_dk_db";
    private $port = 3306;

    function __construct(){
        parent::__construct($this->server, $this->username, $this->password, $this->database, $this->port);
        parent::set_charset("utf8mb4");
    }
}