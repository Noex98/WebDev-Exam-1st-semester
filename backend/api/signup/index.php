<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/api/signup/utils.php');

$req = ApiService::getJsonBody();

$allParamsExist = doesParamsExist($req);

ApiService::require_existingParams($req, [
    'name',
    'phoneNumber',
    'email',
    'password'
]);

$passwordVaild = isPasswordValid($req['password']);
$emailValid = isEmailValid($req['email']);
$phoneNumberValid = isPhoneNumberValid($req['phoneNumber']);
$nameValid = isNameValid($req['name']);

if (!$passwordVaild) {
    http_response_code(400);
    exit('Invalid password. Password must include at least 6 characters and must include at least one number.');
} else if (!$emailValid) {
    http_response_code(400);
    exit('Invalid email address format.');
} else if (!$phoneNumberValid) {
    http_response_code(400);
    exit('Invalid phonenumber format. Must be 8 digits.');
} else if (!$nameValid) {
    http_response_code(400);
    exit('Invalid name format. Name cannot contain numbers or special characters and must be at least 2 characters.');
}

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