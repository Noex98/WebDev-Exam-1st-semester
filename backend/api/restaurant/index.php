<?php

declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$req = getJsonBody();

$userService = new UserService();

$id = $req['id'];

//menu

$restaurant = $userService->getRestaurant($id);
if ($restaurant) {
    echo json_encode([
        'data' => $restaurant,
        'succes' => true,
        'errMessage' => '',
    ]);
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Invalid request. Restaurant does not exist',
    ]);
}
