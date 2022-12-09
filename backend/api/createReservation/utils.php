<?php declare(strict_types=1);

function validatePeopleNum($input){
    return (
        is_numeric($input) &&
        $input == intval($input)
    );
}