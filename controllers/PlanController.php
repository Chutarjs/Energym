<?php
//class Plan
class plan{
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $genero=new PlanModel();
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
        http_response_code($json["status"]));
    }
    public function get($param){
        
        $genero=new PlanModel();
        $response=$genero->get($param);

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
    //GET Obtener con formato para formulario
    public function getForm($idPlan){   
        //Instancia del modelo     
        $plan=new PlanModel();
        $json=array(
            'status'=>400,
            'results'=>"Solicitud sin identificador"
        );
        //Verificar párametro
        if(isset($idPlan) && !empty($idPlan) && $idPlan!=='undefined' && $idPlan!=='null'){
            //Acción del modelo a ejecutar
            $response=$plan->getForm($idPlan);
            //Verificar respuesta
            if(isset($response) && !empty($response)){
                //Armar el json
                $json=array(
                    'status'=>200,
                    'results'=>$response
                );
            }else{
                $json=array(
                    'status'=>400,
                    'results'=>"No existe el recurso solicitado"
                );
            }
           
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode($json,
            http_response_code($json["status"])
        ); 
    }
     
    public function create( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $genero=new PlanModel();
        $response=$genero->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'total'=>count($response),
                'results'=>$response[0]
            );
        }else{
            $json=array(
                'status'=>400,
                'total'=>0,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }
    public function update(){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $genero=new PlanModel();
        $response=$genero->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'total'=>count($response),
                'results'=>$response[0]
            );
        }else{
            $json=array(
                'status'=>400,
                'total'=>0,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }
    
}