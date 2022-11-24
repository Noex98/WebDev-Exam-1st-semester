<?php declare(strict_types=1);
    include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');

    $req = getJsonBody();
    
    $requestValid = (
        isset($req['username']) &&
        isset($req['password'])
    );

    if(!$requestValid){
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request'
        ]);
    } else {
        $id = $authModel->authorize(
            $req['username'],
            $req['password'],
        );

        if(!$id){
            echo json_encode([
                'data' => null,
                'succes' => false,
                'errMessage' => 'Invalid user credentials'
            ]);
        } else {
            if(!session_id()){
                session_start();
            }
            $_SESSION['authToken'] = $id;

            
            echo json_encode([
                'data' => $userModel->getUser($id),
                'succes' => true,
                'errMessage' => ''
            ]);
            
            
        }
    }
?>