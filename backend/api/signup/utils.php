<?php 
    function doesParamsExist($req){
        return (
            !empty($req['name']) &&
            !empty($req['phonenumber']) &&
            !empty($req['email']) &&
            !empty($req['password']) 
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
