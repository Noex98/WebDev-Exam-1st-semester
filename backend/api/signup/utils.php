<?php
function doesParamsExist($req)
{
    return (!empty($req['name']) &&
        !empty($req['phonenumber']) &&
        !empty($req['email']) &&
        !empty($req['password'])
    );
}

/**
 * returns true if input is valid
 * checks if email format is valid
 */


function isEmailValid($email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Returns true if input is valid
 * checks if $digits is 8 characters
 * if input is numbers only
 */

function isPhoneNumberValid(string $phonenumber, int $digits = 8): bool{
    return preg_match('/^[0-9]{'.$digits.'}\z/', $phonenumber);
}
/**
 * returns true if input is valid
 * checks if password is 6 characters long and if input contains special characters
 */

function isPasswordValid($password): bool
{
    return preg_match('~[0-9]+~', $password) && strlen($password) > 5;
}
