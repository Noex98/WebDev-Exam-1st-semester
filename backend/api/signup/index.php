<?php

include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
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
    $emailValid = isEmailValid($req['email']);

    if (!$passwordVaild) {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid password. Password must include at least 6 characters and must include at least one number.'
        ]);
    } else if (!$emailValid) {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid email address format.'
        ]);
    } else {
        $success = $authService->registerUser(
            $req['email'],
            $req['password'],
            $req['phonenumber'],
            $req['name'],
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
