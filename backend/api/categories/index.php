<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

ApiService::require_xCsrfToken();

$userService = new UserService();
echo json_encode($userService->getCategories());