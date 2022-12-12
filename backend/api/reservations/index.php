<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

$id = ApiService::require_authenticated();

$userService = new UserService();
echo json_encode($userService->getReservations($id));