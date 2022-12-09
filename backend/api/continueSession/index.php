<?php declare(strict_types=1);

include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

$id = ApiService::require_authenticated();

$userService = new UserService;
$data = $userService->getUser($id);
echo json_encode($data);