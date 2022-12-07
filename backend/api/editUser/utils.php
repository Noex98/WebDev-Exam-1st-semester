<?php  declare(strict_types=1);
function doesParamsExist($req): bool {
    return (
        !empty($req['key']) && 
        !empty($req['value'])
    );
};

function isKeyValid(string $key): bool {
    return !!($key == 'name' | $key == 'email' | $key == 'phoneNumber');
}

?>