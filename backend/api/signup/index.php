<?php
include($_SERVER['DOCUMENT_ROOT'] . '/models/AuthModel.php');
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/api/signup/utils.php');

$req = getJsonBody();

$allParamsExist = doesParamsExist($req);

if (!$allParamsExist) {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Invalid request: Must fill all fields'
    ]);
} else {
    $passwordVaild = isPasswordValid($req['password']);
    $usernameValid = isUsernameValid($req['username']);

    if (!$passwordVaild) {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid password'
        ]);
    } else if (!$usernameValid) {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid username'
        ]);
    } else {
        $success = $authModel->registerUser(
            $req['username'],
            $req['password'],
            $req['firstname'],
            $req['lastname'],
            $req['height'],
            $req['birthday'],
            $req['gender'],
        );
        if ($success) {
            echo json_encode([
                'data' => null,
                'succes' => true,
                'errMessage' => ''
            ]);
        } else {
            echo json_encode([
                'data' => null,
                'succes' => false,
                'errMessage' => 'User already exists'
            ]);
        }
    }
}
