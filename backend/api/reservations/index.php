<?php

declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$req = getJsonBody();
//$userId = $authService->authenticate();
$userId = 2;

$userService = new UserService();
$reservations = $userService->getReservations($userId);
echo json_encode([
    'data' => $reservations,
    'succes' => true,
    'errMessage' => '',
]);
