<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$req = getJsonBody();

$requestValid = (
    !empty($req['latitude']) &&
    !empty($req['longtitude']) &&
    !empty($req['maxDistance'])
);

if ($requestValid){
    $userService = new UserService();
    var_dump($userService->getResturantList(
        floatval($req['latitude']), 
        floatval($req['longtitude']), 
        floatval($req['maxDistance'])
    ));
} else {
    echo "not valid";
}