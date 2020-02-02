<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace correspondencia;

/**
 * Description of FilingService
 *
 * @author francisco.munoz
 */
class CorrespondenciaService extends \db\MySQL{

    public function get($params) {
    	//print_r($params);

    	$where = " WHERE 1 = 1 ";
    	$orderBy = "";
    	$condicion=[];
    	if(property_exists($params,"search")){
			foreach ($params->search as $key => $value) {
				$condicion[]=$key." LIKE '%".$value."%'";
			}
		}
		if(count($condicion)){
			$where .= "AND ".implode(" AND ", $condicion);
		}
		$orderBy = " ORDER BY 1 DESC";
		$order = "DESC";
    	if(property_exists($params->sort,"reverse")){
    		$order = $params->sort->predicate?"DESC":"ASC";
    	}
    	if(property_exists($params->sort,"predicate")){
			$orderBy = " ORDER BY ".$params->sort->predicate;
		}
        $query = "SELECT 
        			C.id
					, C.usuario_id
                    , C.remitente
                    , C.destinatario
                    , C.fecha_entrega
                    , C.fecha_radicacion
                    , C.fecha_creacion
                    , C.consecutivo
                    , P.name AS usuario
        -- *, CONCAT('WFPCO-',YEAR(fecha_radicacion),LPAD(MONTH(fecha_radicacion),2,'0'),LPAD(id,5,'0')) AS consecutivo 
                FROM
                	correspondencia C
                    JOIN customers_auth P ON C.usuario_id = P.uid ".$where.$orderBy;
        return $this->execute($query);
    }

    public function getById($id) {
        try {
            $query = "
                SELECT
                    C.usuario_id
                    , C.remitente
                    , C.destinatario
                    , C.fecha_entrega
                    , C.fecha_radicacion
                    , C.fecha_creacion
                    , C.consecutivo
                FROM
                    correspondencia C
                WHERE
                    C.id = {$id}
            ";
            return $this->execute($query)[0];
        } catch (Exception $exc) {
            return $exc->getMessage();
        }
    }    

    public function post($params) {
    	$params->consecutivo = $this->buildConsecutive();
        $query = "
        	INSERT INTO 
        		correspondencia (
        			usuario_id
        			, remitente
        			, destinatario
        			, fecha_entrega
        			, fecha_radicacion
        			, fecha_creacion
        			, consecutivo )
        	VALUES(
        		'".$params->user_id."'
        		,'".$params->remitente."'
        		,'".$params->destinatario."'
        		,NOW()
        		,'".$params->fecha_radicacion."'
        		,NOW()
        		,'".$params->consecutivo."'
        	)";
        $this->query($query);
        return $this->insertId();
    }

    public function put($params) {
    	$params->consecutivo = $this->buildConsecutive();
        $query = "
        		UPDATE 
        			correspondencia 
        		SET
        			remitente = '".$params->remitente."'
        			, destinatario = '".$params->destinatario."'
        			, fecha_radicacion = '".$params->fecha_radicacion."'
        		WHERE 
        			id = ".$params->id;
        return $this->query($query);
    }

    private function buildConsecutive(){
        $id = $this->insertConsecutive();
        $queryMax = "
            SELECT 
                CONCAT('WFPCO-'
                ,YEAR(NOW())
                ,LPAD(MONTH(NOW()),2,'0')
                -- ,LPAD(CASE WHEN MAX( id ) IS NULL THEN 0 ELSE MAX( id ) END+1,5,'0')
                ,LPAD(MAX(".$id."),5,'0')
                ) AS consecutive 
            FROM 
                correspondencia
        ";
        return  $this->execute($queryMax)[0]['consecutive'];
    }
    private function insertConsecutive(){
         $query = "
            INSERT INTO 
                consecutive (
                    yearmonth_id
                    , id
                )
            VALUES(
                CONCAT(YEAR(NOW()),MONTH(NOW()))
                , NULL
            )";
        $this->query($query);
        return $this->insertId();
    }
}
