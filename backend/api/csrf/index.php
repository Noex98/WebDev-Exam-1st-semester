<?php declare(strict_types=1);

if(!isset($_SESSION)) { 
    session_start(); 
}

$token = md5(uniqid(mt_rand() . '', true));
$_SESSION['x-csrf-token'] = $token;
echo $token;