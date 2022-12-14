<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$req = ApiService::getJsonBody();
$userId = ApiService::require_authenticated();
ApiService::require_xCsrfToken();
ApiService::require_existingParams($req, ['id']);

$userService = new UserService();
$userService->deleteReservation($userId, $req['id']);