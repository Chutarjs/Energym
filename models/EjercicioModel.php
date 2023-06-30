<?php
class EjercicioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar*/
    /*http://localhost:81/Energym/Ejercicio*/
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM ejercicio where idEjercicio>0;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener */
    /*http://localhost:81/Energym/Ejercicio/#*/
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM Ejercicio e where idEjercicio=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener los servicios de un plan */
    /*http://localhost:81/Energym/Ejercicio/getImagenesEjercicio/# */ 
    public function getImagenesEjercicio($idEjercicio)
    {
        try {
            //Consulta SQL
            $vSQL = "Select ei.imagen from imagenejercicio ei
            where ei.idEjercicio = $idEjercicio;";
            //Establecer conexión
            
            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL($vSQL);
            //Retornar el resultado
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}
