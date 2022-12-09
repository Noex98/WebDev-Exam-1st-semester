<?php declare(strict_types=1);

if (!session_id()) {
    session_start();
}

$_SESSION['csrf'] = md5(uniqid(mt_rand() . '', true));

echo json_encode([
    'data' => $_SESSION['csrf'],
    'succes' => true,
    'errMessage' => ''
]);