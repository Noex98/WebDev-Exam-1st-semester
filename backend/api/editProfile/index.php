<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/api/editProfile/utils.php');

$id = $authService->authenticate();
$req = getJsonBody();

$allParamsExist = doesParamsExist($req);
$isKeyValid = isKeyValid($req['key']);

if($id){
    if($allParamsExist) {
        echo json_encode([
            'data' => $userService->editUser($id),
            'succes' => true,
            'errMessage' => ''
        ]);
    } else {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request: please fill out all params'
        ]);
    };
    if($isKeyValid) {
        echo json_encode([
            'data' => $userService->editUser($id),
            'succes' => true,
            'errMessage' => ''
        ]);
    } else {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request: key is not valid, key must be name, email or phoneNumber'
        ]);
    };
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Not logged in'
    ]);
}

?>