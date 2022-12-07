<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$userService = new UserService();
$categories = $userService->getCategories();

echo json_encode([
    'data' => $categories,
    'succes' => true,
    'errMessage' => '',
]);
