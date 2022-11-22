<?php 
    function doesParamsExist($req){
        return (
            !empty($req['username']) &&
            !empty($req['password']) &&
            !empty($req['firstname']) &&
            !empty($req['lastname']) &&
            !empty($req['height']) &&
            !empty($req['birthday']) &&
            !empty($req['gender'])
        );
    }

    function isUsernameValid($username){
        return strlen($username) >= 4 ? true : false;        
    }

    function isPasswordValid($password){
        if (preg_match('~[0-9]+~', $password) && strlen($password) > 6) {
            return true;
        } else {
            return false;
        }
    }
