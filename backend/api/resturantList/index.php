<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$req = getJsonBody();

$allParamsIsSet = (
    isset($req['latitude']) &&
    isset($req['longtitude']) &&
    isset($req['maxDistance']) &&
    isset($req['categories']) &&
    isset($req['searchString']) &&
    isset($req['sortBy'])
);
if ($allParamsIsSet){

    $userService = new UserService();
    $data = $userService->getResturantList(
        floatval($req['latitude']),
        floatval($req['longtitude']),
        floatval($req['maxDistance']),
        $req['categories'],
        $req['searchString'],
        $req['sortBy'],
    );

    //var_dump($data);

    echo json_encode([
        'data' => $data,
        'succes' => true,
        'errMessage' => ''
    ]);
    
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'Invalid request: Must set all variabels'
    ]);
}
