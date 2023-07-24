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
    /*Obtiene un ejercicio*/ 
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
    /*Obtiene los ejercicios de una rutina */
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
    //GET Obtener con formato para formulario
    public function getForm($idEjercicio){   
        //Instancia del modelo     
        $ejercicio=new EjercicioModel();
        $json=array(
            'status'=>400,
            'results'=>"Solicitud sin identificador"
        );
        //Verificar párametro
        if(isset($idEjercicio) && !empty($idEjercicio) && $idEjercicio!=='undefined' && $idEjercicio!=='null'){
            //Acción del modelo a ejecutar
            $response=$ejercicio->getForm($idEjercicio);
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
    /* Crea un ejercicio */
    public function create( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $genero=new EjercicioModel();
        $response=$genero->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Ejercicio Creado Correctamente!"
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
    /* Actualiza un ejercicio */
    public function update(){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $genero=new EjercicioModel();
        $response=$genero->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Ejercicio Actualizado Correctamente!"
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
