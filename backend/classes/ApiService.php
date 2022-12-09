<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

class ApiService {

    static function getJsonBody(){
        return json_decode(file_get_contents('php://input'), true);
    }

    static function require_authenticated(){
        $authService = new AuthService;
        $id = $authService->authenticate();

        if($id == -1){
            http_response_code(401);
            exit('Must be logged in to acces this resource');
        }

        return $id;
    }

    static function require_existingParams($req, Array $params){
        foreach($params as $param){
            if(!$req || !isset($req[$param])){
                http_response_code(400);
                exit('Invalid request: Must set all variabels, expecting: ' . implode(", ", array_map(null, $params)));
            }
        }
    }

    static function require_validTime(string $input){
        $timeIsValid = !!preg_match("/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/", $input);
        if(!$timeIsValid){
            http_response_code(400);
            exit('Time format is invalid: accepted time format is HH:MM');
        }
    }

    static function require_validDate(string $date){
        $d = DateTime::createFromFormat('Y-m-d', $date);
        $dateIsValid = $d && $d->format('Y-m-d') === $date;
        if(!$dateIsValid){
            http_response_code(400);
            exit('Date is invalid: accepted format is YYYY-MM-DD');
        }
    }

}