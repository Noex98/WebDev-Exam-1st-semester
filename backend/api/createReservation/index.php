<?php declare(strict_types=1);
include($_SERVER['DOCUMENT_ROOT'] . '/classes/UserService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');
include($_SERVER['DOCUMENT_ROOT'] . '/utils/getJsonBody.php');
include($_SERVER['DOCUMENT_ROOT'] . '/api/createReservation/utils.php');

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

if($id !== -1){
    if ($allParamsExist){
        $timeValid = validateTime($req['time']);
        $dateValid = validateDate($req['date']);
        $peopleNumValid = validatePeopleNum(($req['peopleNum']));

        if(!$timeValid){
            echo json_encode([
                'data' => null,
                'succes' => false,
                'errMessage' => 'time format is invalid: accepted time format is HH:MM'
            ]);
        } else if (!$dateValid){
            echo json_encode([
                'data' => null,
                'succes' => false,
                'errMessage' => 'date is invalid'
            ]);

        } else if (!$peopleNumValid){
            echo json_encode([
                'data' => null,
                'succes' => false,
                'errMessage' => 'People ammount format is invalid'
            ]);
        } else {

            $succes = $userService->createReservation(
                $id,
                $req['restaurantId'],
                $req['comment'],
                $req['peopleNum'],
                $req['time'],
                $req['date']
            );

            if ($succes){
                echo json_encode([
                    'data' => null,
                    'succes' => true,
                    'errMessage' => ''
                ]);
            } else {
                echo json_encode([
                    'data' => null,
                    'succes' => false,
                    'errMessage' => 'Error'
                ]);
            }
        }
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
