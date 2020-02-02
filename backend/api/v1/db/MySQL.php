<?php

namespace db;

//require_once '../dbConnect.php';

class MySQL {

    protected $conn = null;
    public $lastId;

    public function __construct() {
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    public function execute($query, $params = null) {
        $result = array();
        $query = $this->conn->query($query, $params) or die($this->conn->error . __LINE__);
        while ($row = $query->fetch_assoc()) {
            $result[] = $row;
        }
        return $result;
    }    

    public function query($query, $params = null) {
        $result = array();
        return $this->conn->query($query, $params) or die($this->conn->error . __LINE__);
    }

    public function insertId(){
        return $this->conn->insert_id;
    }
}
