<?php
//class Plan
class servicio{
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $genero=new ServicioModel();
        $response=$genero->all();
        //Si hay respuesta
        if (isset($response) && !empty($response)) {

            foreach ($response as $respuesta) {
                $respuesta->Imagen = base64_encode($respuesta->Imagen);
            }
            //Armar el json
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No hay registros"
            );
        }
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
    public function get($param){
        
        $genero=new ServicioModel();
        $response=$genero->get($param);

        if(isset($response) && !empty($response)){
            foreach ($response as $respuesta) {
                $respuesta->Imagen = base64_encode($respuesta->Imagen);
            }

            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el servicio"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
        
    }  
    public function getServicioPlan($id){
        $genero=new ServicioModel();
        $response=$genero->getServicioPlan($id);
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