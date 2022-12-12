<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

$authService = new AuthService;
$id = $authService->authenticate();

if($id === -1){
    http_response_code(401);
    exit('Session not authenticated');
}

$userService = new UserService;
$data = $userService->getUser($id);
echo json_encode($data);