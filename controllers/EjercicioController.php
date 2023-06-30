<?php
//class Plan
class ejercicio{
    //Listar en el API
    public function index(){
        //Obtener el listado del Modelo
        $genero=new EjercicioModel();
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
    public function get($param){
        
        $genero=new EjercicioModel();
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
    public function getImagenesEjercicio($id){
        $genero = new EjercicioModel();
        $response = $genero->getImagenesEjercicio($id);
        
        // Si hay respuesta
        if(isset($response) && !empty($response)){
            // Crear un array para almacenar las imágenes en base64
            $images = array();
    
            foreach($response as $row){
                // Obtener los datos de la imagen BLOB
                $imageData = $row->imagen;
                
                // Convertir los datos BLOB a base64
                $base64Image = base64_encode($imageData);
                
                // Agregar la imagen codificada al array
                $images[] = $base64Image;
            }
            
            // Armar el JSON con las imágenes codificadas en base64
            $json = array(
                'status' => 200,
                'results' => $images
            );
        }else{
            $json = array(
                'status' => 400,
                'results' => "No hay registros"
            );
        }
        
        
        if(isset($json['results'])){
            foreach($json['results'] as $image){ 
                echo '<img height="80" width="80" src="data:image/jpeg;base64,'.$image.'"/>';
            }
        }
    }   
}