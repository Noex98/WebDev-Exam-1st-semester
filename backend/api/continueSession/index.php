<?php declare(strict_types=1);

    include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

    $authService = new AuthService;
    $userService = new UserService;

    $id = $authService->authenticate();

    if($id !== -1){
        echo json_encode([
            'data' => $userService->getUser($id),
            'succes' => true,
            'errMessage' => ''
        ]);
    } else {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Not logged in'
        ]);
    }