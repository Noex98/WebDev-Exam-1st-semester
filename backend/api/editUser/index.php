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
    if($allParamsExist) {
        if($isKeyValid) {
            echo json_encode([
                'data' => $userService->editUser($id, $req['key'], $req['value']),
                'succes' => true,
                'errMessage' => ''
            ]);
        } else {
            echo json_encode([
                'data' => null,
                'succes' => false,
                'errMessage' => 'Invalid request: Key isnt valid'
            ]);
        }
    } else {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request: please fill out all params'
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