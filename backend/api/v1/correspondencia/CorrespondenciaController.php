<?php

namespace correspondencia;

class CorrespondenciaController extends \rest\Rest {
    private $correspondencia;

    function __construct() {
        $this->correspondencia = new CorrespondenciaService();
    }

    public function get($params) {
        try {
            $data = $this->correspondencia->get($params);
            $response = array("success" => "true", "data" => $data, "totalPages" => round(count($data)/10), "totalRows" => count($data));

            $this->setOutputStream($response, self::HTTP_OK);
        } catch (Exception $exc) {
            $this->setOutputStream($data, self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getById($id) {
        try {
            return $this->correspondencia->getById($id);
        } catch (Exception $exc) {
            $this->setOutputStream($exc->getMessage(), self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function post($params) {
        try {
            session_start();
            $params->user_id = $_SESSION['uid'];
            $data = $this->correspondencia->post($params);
            $params->id = $data;
            $response = array("success" => "true", "data" => $params, );

            $this->setOutputStream($response, self::HTTP_OK);
        } catch (Exception $exc) {
            $this->setOutputStream($data, self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function put($params) {
        try {
            $data = $this->correspondencia->put($params);
            $response = array("success" => "true", "data" => $params, );

            $this->setOutputStream($response, self::HTTP_OK);
        } catch (Exception $exc) {
            $this->setOutputStream($data, self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
