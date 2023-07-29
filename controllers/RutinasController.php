<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
//class Rutina
class Rutinas
{
    //Listar en el API
    public function index()
    {
        //Obtener el listado del Modelo
        $genero = new RutinaModel();
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
    /* Se obtiene una rutina por id */
    public function get($param)
    {

        $genero = new RutinaModel();
        $response = $genero->get($param);

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

    /* Se obtiene una rutina detallada */
    public function getRutinaDetalle($id)
    {
        $genero = new RutinaModel();
        $response = $genero->getRutinaDetalle($id);
        if (isset($response) && !empty($response)) {
            // Codificar las imágenes en Base64
            foreach ($response->ejercicios as $ejercicio) {
                foreach ($ejercicio->imagenes as $imagen) {
                    $imagen->Imagen = base64_encode($imagen->Imagen);
                }
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

    /* Se obtiene la rutina asignada a un usuario */
    public function getRutinaUsuario($id)
    {
        $genero = new RutinaModel();
        $response = $genero->getRutinaUsuario($id);
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
            $json['results'],
            http_response_code($json["status"])
        );
    }
    //GET Obtener con formato para formulario
    public function getForm($idRutina)
    {
        //Instancia del modelo     
        $rutina = new RutinaModel();
        $json = array(
            'status' => 400,
            'results' => "Solicitud sin identificador"
        );
        //Verificar párametro
        if (isset($idRutina) && !empty($idRutina) && $idRutina !== 'undefined' && $idRutina !== 'null') {
            //Acción del modelo a ejecutar
            $response = $rutina->getForm($idRutina);
            // Codificar las imágenes en Base64
            foreach ($response->ejercicios as $ejercicio) {
                foreach ($ejercicio->imagenes as $imagen) {
                    $imagen->Imagen = base64_encode($imagen->Imagen);
                }
            }
            //Verificar respuesta
            if (isset($response) && !empty($response)) {
                //Armar el json
                $json = array(
                    'status' => 200,
                    'results' => $response
                );
            } else {
                $json = array(
                    'status' => 400,
                    'results' => "No existe el recurso solicitado"
                );
            }
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
    /* Se crea una rutina */
    public function create()
    {
        $inputJSON = file_get_contents('php://input');
        $object = json_decode($inputJSON);
        $genero = new RutinaModel();
        $response = $genero->create($object);
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Rutina Creado Correctamente!"
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
    /* Se actualiza una rutina */
    public function update()
    {
        $inputJSON = file_get_contents('php://input');
        $object = json_decode($inputJSON);
        $genero = new RutinaModel();
        $response = $genero->update($object);
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Rutina Actualizado Correctamente!"
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
}
