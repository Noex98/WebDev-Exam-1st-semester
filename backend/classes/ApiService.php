<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

class ApiService {

    static function getJsonBody(){
        return json_decode(file_get_contents('php://input'), true);
    }

    static function require_xCsrfToken(){
        if(!isset($_SESSION)) { 
            session_start(); 
        }
        $headers = getallheaders();
        if(
            !isset($headers['x-csrf-token']) ||
            !isset($_SESSION['x-csrf-token']) ||
            $headers['x-csrf-token'] !== $_SESSION['x-csrf-token']
        ){
            http_response_code(400);
            exit('No matching csrf token');
        }
    }

    static function require_authenticated(){
        $authService = new AuthService;
        $id = $authService->authenticate();

        if($id === -1){
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

    static function require_validName(string $name){
        $nameValid = strlen($name) > 1;
        if(!$nameValid){
            http_response_code(400);
            exit('Invalid name format. Name must be at least 2 characters.');
        }
    }

    static function require_validEmail(string $email){
        $emailValid = !!filter_var($email, FILTER_VALIDATE_EMAIL);
        if(!$emailValid){
            http_response_code(400);
            exit('Invalid email address format.');
        }
    }

    static function require_validPassword(string $password){
        $passwordValid = !!preg_match('~[0-9]+~', $password) && strlen($password) > 5;
        if(!$passwordValid){
            http_response_code(400);
            exit('Invalid password. Password must include at least 6 characters and must include at least one number.');
        }
    }

    static function require_validPhoneNUmber(string $phoneNumber, int $digits = 8){
        $phoneNumberValid = !!preg_match('/^[0-9]{' . $digits . '}\z/', $phoneNumber);
        if(!$phoneNumberValid){
            http_response_code(400);
            exit('Invalid phonenumber format. Must be 8 digits.');
        }
    }

}