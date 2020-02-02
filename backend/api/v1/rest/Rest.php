<?php

namespace rest;

class Rest {

    const HTTP_OK = 200;
    const HTTP_NO_CONTENT = 204;
    const HTTP_NOT_FOUND = 404;
    const HTTP_INTERNAL_SERVER_ERROR = 500;

    private $outputStream;

    public function getOuputStream() {
        return $this->outputStream;
    }

    public function setOutputStream($response, $statusCode = HTTP_INTERNAL_SERVER_ERROR) {
        $app = \Slim\Slim::getInstance();

        // Http response code
        $app->status($statusCode);

        // setting response content type to json
        $app->contentType('application/json');

        echo json_encode($response);
    }

}
