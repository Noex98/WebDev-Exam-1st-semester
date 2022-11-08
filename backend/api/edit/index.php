<?php
    include($_SERVER['DOCUMENT_ROOT'] . '/models/UsersModel.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/models/AuthModel.php');
    include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');

    $req = getJsonBody();

    $id = $authModel->authenticate();

    if ($id) {
        $requestValid = (
            isset($req['firstname']) &&
            isset($req['lastname']) &&
            isset($req['height']) &&
            isset($req['birthday']) &&
            isset($req['gender'])
        );

        if (!$requestValid) {
            echo json_encode([
                'data' => null,
                'succes' => false,
                'errMessage' => 'Invalid request'
            ]);
        } else {
            $userModel->editUserProfile(
                $id,
                $req['firstname'],
                $req['lastname'],
                $req['birthday'],
                $req['gender'], 
                $req['height'],
            );
            echo json_encode([
                'data' => null,
                'succes' => true,
                'errMessage' => ''
            ]);
        }
    } else {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'You are not authorized'
        ]);
    }
