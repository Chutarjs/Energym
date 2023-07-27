<?php
/* Mostrar errores */
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', "C:/xampp/htdocs/Energym/php_error_log");

/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

/*--- Requerimientos Clases o librerías*/
require_once "models/MySqlConnect.php";

/***--- Agregar todos los modelos*/
require_once "models/ActividadesGrupalesModel.php";
require_once "models/PlanModel.php";
require_once "models/RutinasModel.php";
require_once "models/UsuariosModel.php";
require_once "models/EjercicioModel.php";
require_once "models/PagoModel.php";
require_once "models/ServicioModel.php";
require_once "models/RolModel.php";
require_once "models/UsuariosModel.php";

/***--- Agregar todos los controladores*/
require_once "controllers/PlanController.php";
require_once "controllers/RutinasController.php";
require_once "controllers/UsuariosController.php";
require_once "controllers/ActividadesGrupalesController.php";
require_once "controllers/EjercicioController.php";
require_once "controllers/PagoController.php";
require_once "controllers/ServicioController.php";
require_once "controllers/UsuariosController.php";

//Enrutador
//RoutesController.php
require_once "controllers/RoutesController.php";

$index = new RoutesController();
$index->index();