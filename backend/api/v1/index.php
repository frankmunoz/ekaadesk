<?php

require '.././libs/autoload.php';

//require_once 'dbHandler.php';
//require_once 'passwordHash.php';
//require '.././libs/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

// User id from db - Global Variable
$user_id = NULL;

require_once 'authentication.php';
require_once 'routes.php';


/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields,$request_params) {
    $error = false;
    $error_fields = "";
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["status"] = "error";
        $response["message"] = 'Los siguientes campos son requeridos: ' . substr($error_fields, 0, -2) . ' ';
        echoResponse(200, $response);
        $app->stop();
    }
}


function echoResponse($status_code, $response) {
/*
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
    header('Access-Control-Allow-Methods: GET, PUT, POST');
    header('Content-type:  application/json');
*/
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
}

$app->run();
?>