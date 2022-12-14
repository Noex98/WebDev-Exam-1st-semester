<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');

$req = ApiService::getJsonBody();
ApiService::require_xCsrfToken();

ApiService::require_existingParams($req, [
    'latitude',
    'longtitude',
    'maxDistance',
    'categories',
    'searchString',
    'sortBy'
]);

$userService = new UserService();
$data = $userService->getRestaurantList(
    floatval($req['latitude']),
    floatval($req['longtitude']),
    floatval($req['maxDistance']),
    $req['categories'],
    $req['searchString'],
    $req['sortBy'],
);

echo json_encode($data);