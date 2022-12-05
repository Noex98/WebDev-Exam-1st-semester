<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');

$req = getJsonBody();
$authService = new AuthService();
$userService = new UserService();

$id = $authService->authenticate();

$allParamsExist = (
    isset($req['restaurantId']) &&
    isset($req['date']) &&
    isset($req['time']) &&
    isset($req['comment']) &&
    isset($req['peopleNum'])
);

if($id){
    if ($allParamsExist){

    } else {
        echo json_encode([
            'data' => null,
            'succes' => false,
            'errMessage' => 'Invalid request: Must set all variabels'
        ]);
    }
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Not logged in'
    ]);
}
