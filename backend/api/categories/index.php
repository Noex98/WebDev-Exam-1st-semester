<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$userService = new UserService();
echo json_encode($userService->getCategories());