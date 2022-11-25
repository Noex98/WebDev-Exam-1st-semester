<?php
function doesParamsExist($req)
{
    return (!empty($req['name']) &&
        !empty($req['phonenumber']) &&
        !empty($req['email']) &&
        !empty($req['password'])
    );
}

//logik her - tjek på email er valid??

function isEmailValid($email)
{
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return true;
    } else {
        return false;
    }
}

function isPasswordValid($password)
{
    if (preg_match('~[0-9]+~', $password) && strlen($password) > 6) {
        return true;
    } else {
        return false;
    }
}
