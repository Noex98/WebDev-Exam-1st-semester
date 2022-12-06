<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/api/editUser/utils.php');
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');

$authService = new AuthService;
$userService = new UserService;

$id = $authService->authenticate();
$req = getJsonBody();


$allParamsExist = doesParamsExist($req);
$isKeyValid = isKeyValid($req['key']);

if($id){
    if(!$allParamsExist) {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request: please fill out all params'
        ]);
    }  else {
        $userService->editUser($id, $req['key'], $req['value']);
        echo json_encode([
            'data' => null,
            'succes' => true,
            'errMessage' => '',
        ]);
    }
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Invalid request. User not logged in.',
    ]);
}

/* else if (!$isKeyValid) {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Invalid request: key is not valid, key must be name, email or phoneNumber'
    ]); */