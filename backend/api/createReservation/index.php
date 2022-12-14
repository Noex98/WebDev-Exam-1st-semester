<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/api/createReservation/utils.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

$req = ApiService::getJsonBody();
$id = ApiService::require_authenticated();
ApiService::require_xCsrfToken();
ApiService::require_existingParams($req, [
    'restaurantId',
    'date',
    'time',
    'comment',
    'peopleNum'
]);

ApiService::require_validTime($req['time']);
ApiService::require_validDate($req['date']);

$peopleNumValid = validatePeopleNum(($req['peopleNum']));
if (!$peopleNumValid){
    http_response_code(400);
    exit('People ammount format is invalid');
}

$userService = new UserService();
$succes = $userService->createReservation(
    $id,
    $req['restaurantId'],
    $req['comment'],
    $req['peopleNum'],
    $req['time'],
    $req['date']
);

if(!$succes){
    http_response_code(500);
}