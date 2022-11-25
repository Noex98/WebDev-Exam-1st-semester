<?php 
    include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

    $authService = new AuthService();
    $authService->logout();

    echo json_encode([
        'data' => null,
        'succes' => true,
        'errMessage' => ''
    ]);
?>