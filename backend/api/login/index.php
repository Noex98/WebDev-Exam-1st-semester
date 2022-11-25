<?php declare(strict_types=1);
    include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');

    $req = getJsonBody();
    
    $requestValid = (
        isset($req['email']) &&
        isset($req['password'])
    );

    if(!$requestValid){
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request'
        ]);
    } else {
        $authService = new AuthService();
        $id = $authService->authorize(
            $req['email'],
            $req['password'],
        );

        if(!$id){
            echo json_encode([
                'data' => null,
                'succes' => false,
                'errMessage' => 'Unknown email and password.'
            ]);
        } else {
            if(!session_id()){
                session_start();
            }
            $_SESSION['authToken'] = $id;

            $userService = new UserService();
            echo json_encode([
                'data' => $userService->getUser($id),
                'succes' => true,
                'errMessage' => ''
            ]);
            
        }
    }
