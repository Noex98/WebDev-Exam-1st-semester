<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
$authService = new AuthService();
$authService->logout();