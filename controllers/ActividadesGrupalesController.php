<?php
//class Plan
class ActividadesGrupales{
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $genero=new ActividadesGrupalesModel();
        $response=$genero->all();
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
    /*Obtiene una*/ 
    public function get($param){
        
        $genero=new ActividadesGrupalesModel();
        $response=$genero->get($param);
        $json=array(
            'status'=>200,
            'total'=>count($response),
            'results'=>$response
        );
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el actor"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
        
    }

     /*Obtiene todas detalladas*/ 
    public function getDetalle(){
        $genero=new ActividadesGrupalesModel();
        $response=$genero->getDetalle();
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

     /*Obtiene una detallada*/ 
    public function getDetalleById($id){
        $genero=new ActividadesGrupalesModel();
        $response=$genero->getDetalleById($id);
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
     /*Obtiene matriculados en una*/ 
    public function getMatriculados($id){
        $genero=new ActividadesGrupalesModel();
        $response=$genero->getMatriculados($id);
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
     /*Obtiene las que estan con cupo*/ 
    public function getActividadesConCupo(){
        $genero=new ActividadesGrupalesModel();
        $response=$genero->getActividadesConCupo();
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
}