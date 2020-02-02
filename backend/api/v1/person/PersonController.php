<?php

namespace person;

class PersonController extends \rest\Rest {

    public function get() {
        try {

            $persona = new PersonService();
            $data = $persona->get();
            $this->setOutputStream($data, self::HTTP_OK);
        } catch (Exception $exc) {
            $this->setOutputStream($data, self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function put() {
        try {
            
        } catch (Exception $exc) {
            $this->setOutputStream($data, self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
