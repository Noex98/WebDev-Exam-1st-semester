<?php

declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$req = getJsonBody();

$userService = new UserService();

$id = $req['id'];

$restaurant = $userService->getRestaurant($id);
echo json_encode([
    'data' => $restaurant,
    'succes' => true,
    'errMessage' => '',
]);
