<?php 
    function getJsonBody(){

        return json_decode(file_get_contents('php://input'), true);
        /*
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

        if ($contentType === "application/json") {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);

            if(! is_array($decoded)) {
                return false;
            } else {
                return $decoded;
            }
        } */
    }
?>