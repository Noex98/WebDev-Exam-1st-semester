<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

$req = ApiService::getJsonBody();

ApiService::require_existingParams($req, [
    'email',
    'password'
]);

$authService = new AuthService();
$id = $authService->authorize(
    $req['email'],
    $req['password'],
);

if($id == -1){
    http_response_code(401);
    exit('Unknown email and/or password.');
}

if(!isset($_SESSION)) { 
    session_start(); 
}
$_SESSION['authToken'] = $id;

$userService = new UserService();
echo json_encode($userService->getUser($id));