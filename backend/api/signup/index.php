<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/api/signup/utils.php');

$req = ApiService::getJsonBody();
ApiService::require_xCsrfToken();

$allParamsExist = doesParamsExist($req);

ApiService::require_existingParams($req, [
    'name',
    'phoneNumber',
    'email',
    'password'
]);

ApiService::require_validEmail($req['email']);
ApiService::require_validPassword($req['password']);
ApiService::require_validName($req['name']);
ApiService::require_validPhoneNUmber($req['phoneNumber']);

$authService = new AuthService();
$userExist = $authService->doesUserExist($req['email']);

if($userExist){
    http_response_code(400);
    exit('User already exists');
}

$success = $authService->registerUser(
    $req['name'],
    $req['email'],
    $req['phoneNumber'],
    $req['password'],
);

if (!$success) {
    http_response_code(500);
    exit('An unknown error occured');
}