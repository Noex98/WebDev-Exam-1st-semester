<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/ApiService.php');

$req = ApiService::getJsonBody();
$id = ApiService::require_authenticated();
ApiService::require_xCsrfToken();

ApiService::require_existingParams($req, [
    'key',
    'value'
]);

switch ($req['key']) {
    case 'name':
        ApiService::require_validName($req['value']);
        break;
    case 'email':
        ApiService::require_validEmail($req['value']);
        break;
    case 'phoneNumber':
        ApiService::require_validPhoneNUmber($req['value']);
        break;
    default:
        http_response_code(400);
        exit('Invalid request: Key isnt valid');
}

$userService = new UserService;
echo json_encode($userService->editUser($id, $req['key'], $req['value']));
