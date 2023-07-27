<?php
//Cargar todos los paquetes
require_once "vendor/autoload.php";
use Firebase\JWT\JWT;
//class User
class user{
    private $secret_key = 'e0d17975bc9bd57eee132eecb6da6f11048e8a88506cc3bffc7249078cf2a77a';
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $usuario=new UserModel();
        $response=$usuario->all();
        //Si hay respuesta
        if(isset($response) && !empty($response)){
            //Armar el json
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }
    public function get($param){
        
        $usuario=new UserModel();
        $response=$usuario->get($param);
        $json=array(
            'status'=>200,
            'total'=>count($response),
            'results'=>$response
        );
       echo json_encode($json,
        http_response_code($json["status"]));
        
    }
    public function login(){
        
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $usuario=new UserModel();
        $response=$usuario->login($object);
        if(isset($response) && !empty($response) && $response!=false){
            // Datos que desea incluir en el token JWT
            $data = [
                'id' => $response->id,
                'email' => $response->email,
                'rol' => $response->rol,
            ];
            // Generar el token JWT 
            $jwt_token = JWT::encode($data, $this->secret_key,'HS256');
            $json=array(
                'status'=>200,
                'results'=>$jwt_token
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Usuario no valido"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }
    public function create( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $usuario=new UserModel();
        $response=$usuario->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Usuario No creado"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }
    public function autorize(){
        
        try {
            
            $token = null;
            $headers = apache_request_headers();
            if(isset($headers['Authentication'])){
              $matches = array();
              preg_match('/Bearer\s(\S+)/', $headers['Authentication'], $matches);
              if(isset($matches[1])){
                $token = $matches[1];
                return true;
              }
            } 
            return false;
                   
        } catch (Exception $e) {
            return false;
        }
    }
}