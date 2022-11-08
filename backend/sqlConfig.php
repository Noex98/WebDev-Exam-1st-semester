<?php 
    $server = "mysql70.unoeuro.com";
    $username = "knickering_dk";
    $password = "k59EBbxtdah2g4GcFDpH";
    $database = "knickering_dk_db";

    $mySQL = new mysqli($server, $username, $password, $database);

    if(!$mySQL) {
        die("Could not connect to the MySQL server: " . mysqli_connect_error());
    };
?>