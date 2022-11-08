<?php
include($_SERVER['DOCUMENT_ROOT'] . '/models/UsersModel.php');
include($_SERVER['DOCUMENT_ROOT'] . '/models/AuthModel.php');

$id = $authModel->authenticate();

if ($id) {

    echo json_encode([
        'data' => $userModel->getMatches($id),
        'succes' => true,
        'errMessage' => ''
    ]);
} else {
    echo json_encode([
        'data' => null,
        'succes' => false,
        'errMessage' => 'You are not authorized'
    ]);
}