<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

$req = getJsonBody();
$userService = new UserService();
$authService = new AuthService();
$userId = $authService->authenticate();

if ($userId !== -1) {
    if (isset($req['id'])) {
        $userService->deleteReservation($req['id']);
        echo json_encode([
            'data' => null,
            'succes' => true,
            'errMessage' => '',
        ]);
    } else {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request. Id not set'
        ]);
    }
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'User not logged in',
    ]);
}
