<?php declare(strict_types=1);

// https://stackoverflow.com/questions/19271381/correctly-determine-if-date-string-is-a-valid-date-in-that-format
function validateDate($date, $format = 'Y-m-d'){
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) === $date;
}

//https://stackoverflow.com/questions/3964972/validate-that-input-is-in-this-time-format-hhmm
function validateTime($input){
    return !!preg_match("/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/", $input);
}

function validatePeopleNum($input){
    return (
        is_numeric($input) &&
        $input == intval($input)
    );
}