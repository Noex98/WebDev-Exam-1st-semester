<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

$authService = new AuthService();
$userService = new UserService();

$userId = $authService->authenticate();

if($id){
    $reservations = $userService->getReservations($userId);
    echo json_encode([
        'data' => $reservations,
        'succes' => true,
        'errMessage' => '',
    ]);
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Not logged in',
    ]);
}