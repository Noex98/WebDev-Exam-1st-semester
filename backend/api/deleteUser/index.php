<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

$userId = ApiService::require_authenticated();

$userService = new UserService();
$deleteUser = $userService->deleteUser($id);

if (!$deleteUser) {
    http_response_code(500);
    exit('Invalid request. User does not exist');
}