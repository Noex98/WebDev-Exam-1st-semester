<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$req = ApiService::getJsonBody();
ApiService::require_existingParams($req, ['id']);

$userService = new UserService();
$restaurant = $userService->getRestaurant($req['id']);

if (!$restaurant) {
    http_response_code(404);
    exit();
}

echo json_encode($restaurant);