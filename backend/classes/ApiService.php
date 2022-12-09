<?php declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . '/classes/AuthService.php');

class AuthService {

    static function require_login(){
        $authService = new AuthService;
        $id = $authService->authenticate();

        if($id !== -1){
            exit(
                json_encode([
                    'data' => null,
                    'succes' => false,
                    'errMessage' => 'Not logged in'
            ]));
        }
    }

    static function require_existingParams(Array $req, Array $params){
        foreach($params as $param){
            if(!isset($req[$param])){
                exit(
                    json_encode([
                        'data' => null,
                        'succes' => false,
                        'errMessage' => 'Not logged in'
                ]));
            }
        }
    }
}