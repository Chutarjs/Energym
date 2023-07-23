<?php
//class Actividad
class ActividadesGrupales
{
    //Listar en el API
    public function index()
    {
        //Obtener el listado del Modelo
        $genero = new ActividadesGrupalesModel();
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
    /*Obtiene una*/
    public function get($param)
    {

        $genero = new ActividadesGrupalesModel();
        $response = $genero->get($param);
        $json = array(
            'status' => 200,
            'total' => count($response),
            'results' => $response
        );
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

    /*Obtiene todas detalladas*/
    public function getDetalle()
    {
        $genero = new ActividadesGrupalesModel();
        $response = $genero->getDetalle();
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

    /*Obtiene una detallada*/
    public function getDetalleById($id)
    {
        $genero = new ActividadesGrupalesModel();
        $response = $genero->getDetalleById($id);
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
    /*Obtiene matriculados en una*/
    public function getMatriculados($id)
    {
        $genero = new ActividadesGrupalesModel();
        $response = $genero->getMatriculados($id);
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
    /*Obtiene las que estan con cupo*/
    public function getActividadesConCupo()
    {
        $genero = new ActividadesGrupalesModel();
        $response = $genero->getActividadesConCupo();
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
    public function getForm($idActividad)
    {
        //Instancia del modelo     
        $actividad = new ActividadesGrupalesModel();
        $json = array(
            'status' => 400,
            'results' => "Solicitud sin identificador"
        );
        //Verificar párametro
        if (isset($idActividad) && !empty($idActividad) && $idActividad !== 'undefined' && $idActividad !== 'null') {
            //Acción del modelo a ejecutar
            $response = $actividad->getForm($idActividad);
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

    public function create()
    {
        $inputJSON = file_get_contents('php://input');
        $object = json_decode($inputJSON);
        $genero = new ActividadesGrupalesModel();
        $response = $genero->create($object);
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Actividad Creado Correctamente!"
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
    public function update()
    {
        $inputJSON = file_get_contents('php://input');
        $object = json_decode($inputJSON);
        $genero = new ActividadesGrupalesModel();
        $response = $genero->update($object);
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Actividad Actualizado Correctamente!"
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
