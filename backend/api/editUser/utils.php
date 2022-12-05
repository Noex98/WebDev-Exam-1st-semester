<?php  declare(strict_types=1);

function doesParamsExist($req): bool {
    return (!empty($req['key']) && 
        !empty($req['value'])
);
};

function isKeyValid(string $key): bool {
    if (  $key == 'name' | $key == 'email' | $key == 'phoneNumber'
) return true;
}
?>