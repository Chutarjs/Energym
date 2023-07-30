<?php
//class Servicio
class servicio
{
    //Listar en el API
    public function index()
    {
        //Obtener el listado del Modelo
        $genero = new ServicioModel();
        $response = $genero->all();
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
    /* Se obtiene un servicio */
    public function get($param)
    {

        $genero = new ServicioModel();
        $response = $genero->get($param);

        if (isset($response) && !empty($response)) {
            foreach ($response as $respuesta) {
                $respuesta->Imagen = base64_encode($respuesta->Imagen);
            }

            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No existe el servicio"
            );
        }
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
    /* Se obtienen los servicios de un plan */
    public function getServicioPlan($id)
    {
        $genero = new ServicioModel();
        $response = $genero->getServicioPlan($id);
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

    //GET Obtener con formato para formulario
    public function getForm($idServicio)
    {
        //Instancia del modelo     
        $servicio = new ServicioModel();
        $json = array(
            'status' => 400,
            'results' => "Solicitud sin identificador"
        );
        //Verificar párametro
        if (isset($idServicio) && !empty($idServicio) && $idServicio !== 'undefined' && $idServicio !== 'null') {
            //Acción del modelo a ejecutar
            $response = $servicio->getForm($idServicio);
            //codificar la imagen
            $response = $response[0];
            $response->Imagen = base64_encode($response->Imagen);
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

    /* Se crea un servicio */
    public function create()
    {
        $inputJSON = file_get_contents('php://input');
        $object = json_decode($inputJSON);
        $genero = new ServicioModel();
        $response = $genero->create($object);
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Servicio Creado Correctamente!"
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

    /* Se actualiza el servicio */
    public function update()
    {
        $inputJSON = file_get_contents('php://input');
        $object = json_decode($inputJSON);
        $genero = new ServicioModel();
        $response = $genero->update($object);
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Servicio Actualizado Correctamente!"
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
