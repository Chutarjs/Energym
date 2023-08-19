<?php
//class Ejercicio
class pago
{
    //Listar en el API
    public function index()
    {
        //Obtener el listado del Modelo
        $genero = new PagoModel();
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
    /*Obtiene un pago*/
    public function get($param)
    {
        $genero = new PagoModel();

        $response = $genero->get($param);
        if (isset($response) && !empty($response)) {
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
    public function getByCliente($param)
    {

        $genero = new PagoModel();
        $response = $genero->getByCliente($param);

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
    /* Crea un ejercicio */
    public function create()
    {
        $inputJSON = file_get_contents('php://input');
        $object = json_decode($inputJSON);
        $genero = new PagoModel();
        $response = $genero->create($object);
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Pago Realizado Correctamente!"
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
    /* Actualiza un ejercicio */
    public function update()
    {
        $inputJSON = file_get_contents('php://input');
        $object = json_decode($inputJSON);
        $genero = new PagoModel();
        $response = $genero->update($object);
        if (isset($response) && !empty($response)) {
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
}
