<?php
//class Ejercicio
class ejercicio
{
    //Listar en el API
    public function index()
    {
        //Obtener el listado del Modelo
        $genero = new EjercicioModel();
        $response = $genero->all();
        //Si hay respuesta
        if (isset($response) && !empty($response)) {
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

    public function get($param)
    {
        $genero = new EjercicioModel();

        $response = $genero->get($param);
        if (isset($response) && !empty($response)) {
            // Codificar las imágenes en Base64
            foreach ($response->imagenes as $imagen) {
                $imagen->Imagen = base64_encode($imagen->Imagen);
            }

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

        http_response_code($json["status"]);
        echo json_encode($json);
    }

    public function getEjerciciosRutina($param)
    {

        $genero = new EjercicioModel();
        $response = $genero->getEjerciciosRutina($param);

        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No existe el actor"
            );
        }
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
    public function create( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $genero=new EjercicioModel();
        $response=$genero->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Plan Creado Correctamente!"
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
    public function update(){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $genero=new EjercicioModel();
        $response=$genero->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Plan Actualizado Correctamente!"
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
}
