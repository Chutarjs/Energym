<?php
$routesArray=explode("/",$_SERVER['REQUEST_URI']);
// Dejar solo los que tienen valores
$routesArray=array_filter($routesArray);
print_r($routesArray);
//http://localhost:81/Energym/

//Sin solicitud al API
if(count($routesArray)==1){
    $json=array(
        'status'=>404,
        'result'=>'Not found'
    );
    echo json_encode($json,
    http_response_code($json["status"]));
    return;
}

//Solicitud al API
//http://localhost:81/nombreProyecto/controlador/accion/parametro
if(count($routesArray)>1 && isset($_SERVER['REQUEST_METHOD'])){
    $controller=$routesArray[2];
    $action="index";
    try {
        $response=new $controller();
        if(count($routesArray)<=3){
            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    $action="index";
                    break;
                case 'POST':
                    $action="create";
                    break;
                case 'PUT': case'PATCH':
                    $action="update";
                    break;
                case 'DELETE':
                        $action="delete";
                        break;
                default:
                    $action="index";
                    break;
            }   
            if(count($routesArray)==3){
                $param=$routesArray[3];
                switch ($_SERVER['REQUEST_METHOD']) {
                    case 'GET':
                        $action="get";
                        $response->$action($param);
                        break;
                    case 'POST':
                        $action=$routesArray[3];
                        $response->$action();
                        break;
                    default:
                        $action="index";
                        $response->$action();
                        break;
                }   
                
               
            }else{
                $response->$action();
            }       
        }
        
        if(count($routesArray)==4){
            $action=$routesArray[3];
            $param=$routesArray[4];
            $response->$action($param);
        }
    } catch (\Throwable $th) {
        $json=array(
            'status'=>404,
            'result'=>$th
        );
        echo json_encode($json,
        http_response_code($json["status"]));
    }
}
