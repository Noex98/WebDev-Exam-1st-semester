<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

$userService = new UserService();
$authService = new AuthService();

$id = $authService->authenticate();

//menu

if ($id) {
    $deleteUser = $userService->deleteUser($id);
    if ($deleteUser) {
        echo json_encode([
            'data' => null,
            'succes' => true,
            'errMessage' => '',
        ]);
    } else {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request. User does not exist',
        ]);
    }
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Invalid request. User not logged in.',
    ]);
}
