<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
//class Plan
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
}
