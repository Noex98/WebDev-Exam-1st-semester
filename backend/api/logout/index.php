<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

ApiService::require_xCsrfToken();
$authService = new AuthService();
$authService->logout();