<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace filing;

/**
 * Description of FilingService
 *
 * @author francisco.munoz
 */
class FilingService extends \db\MySQL{

    public function get() {
        $query = "SELECT * FROM persona";
        return $this->execute($query);
    }

}
