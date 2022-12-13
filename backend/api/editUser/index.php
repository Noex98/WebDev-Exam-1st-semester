<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/api/editUser/utils.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

$req = ApiService::getJsonBody();
$id = ApiService::require_authenticated();

ApiService::require_existingParams($req, [
    'key',
    'value'
]);

$isKeyValid = isKeyValid($req['key']);

if(!$isKeyValid) {
    http_response_code(400);
    exit('Invalid request: Key isnt valid');
}

$userService = new UserService;
echo json_encode($userService->editUser($id, $req['key'], $req['value']));
