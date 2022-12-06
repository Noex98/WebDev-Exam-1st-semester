<?php

declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

$req = getJsonBody();

$userService = new UserService();
$authService = new AuthService();

$userId = $authService->authenticate();
$reservationId = $req['id'];


if ($userId) {
    $userService->deleteReservation($reservationId);
    echo json_encode([
        'data' => null,
        'succes' => true,
        'errMessage' => '',
    ]);
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'not logged in'
    ]);
}
