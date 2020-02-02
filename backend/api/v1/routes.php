<?php

$app->get('/correspondencia/', function() use ($app){
  	$params = parseJson($_GET); 
    $correspondencia = new correspondencia\CorrespondenciaController();
    $correspondencia->get($params);
});

$app->get('/correspondencia/:id', function($id) use ($app){
    $response=[];
	if($id){
	    $correspondencia = new correspondencia\CorrespondenciaController();
	    $data = $correspondencia->getById($id);
	    $message = "No se encontró usuario con el id {$id}";
	    if(isset($data['usuario_id'])){
	        $message = "Usuario {$id} encontrado";
	    }

	    $response = [
	        "success"=>true
	        , "message"=>$message
	        , "data"=>$data
	    ];
	}
    echoResponse(200, $response);
});

$app->get('/user/:id', function($id) use ($app) {
    $user = new user\UserController();
    $data = new \stdClass();
    $data->user = $user->getById($id);
    $message = "No se encontró usuario con el id {$id}";
    if(count($data->user)){
        $message = "Usuario {$id} encontrado";
    }

    $response = [
        "success"=>true
        , "message"=>$message
        , "data"=>$data
    ];
    echoResponse(200, $response);
});

$app->post('/correspondencia/', function() use ($app){
    $r = json_decode($app->request->getBody());
    /*$r = json_decode($app->request->getBody());
    $params = parseJson($_POST);
    $correspondencia = new correspondencia\CorrespondenciaController();
    $correspondencia->post($params);*/
    $correspondencia = new correspondencia\CorrespondenciaController();
    $correspondencia->post($r->filing);
});

$app->put('/correspondencia/', function() use ($app){
    $r = json_decode($app->request->getBody());
    /*$r = json_decode($app->request->getBody());
    $params = parseJson($_POST);
    $correspondencia = new correspondencia\CorrespondenciaController();
    $correspondencia->post($params);*/
    $correspondencia = new correspondencia\CorrespondenciaController();
    $correspondencia->put($r->filing);
});

$app->get('/persons/', function() {
    $person = new person\PersonController();
    $person->get();
});


function parseJson($array){
	$object = json_decode(json_encode($array),true);
	foreach ($object as $key => $value) {
		if(isJSON($value)){
			$object[$key] = json_decode($value);
		}
	}
	return (object)$object;
//	return json_encode($object);
}

function isJSON($string){
   return is_string($string) && is_array(json_decode($string, true)) ? true : false;
}

