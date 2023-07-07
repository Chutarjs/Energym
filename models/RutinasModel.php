<?php
class RutinaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM rutina where idRutina > 0;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener rutina en especifico*/
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM rutina where idRutina=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /*Obtener detalle de una rutina */
    public function getRutinaDetalle($id)
    {
        try {
            //Consulta SQL
            $vSQL = "SELECT e.Nombre AS Ejercicio, re.Repeticiones, re.Series
            FROM rutinaejercicio re
            INNER JOIN ejercicio e ON re.IdEjercicio = e.idEjercicio
            WHERE re.IdRutina = $id;";
            //Establecer conexión
            
            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL($vSQL);
            //Retornar el resultado
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    
    /*Obtener las rutinas de un usuario */
    public function getRutinaUsuario($idUsuario)
    {
        try {
            //Consulta SQL
            $vSQL = "SELECT r.Nombre AS NombreRutina, r.Descripcion AS DescripcionRutina
            FROM rutina r
            INNER JOIN historialrutina hr ON r.idrutina = hr.idRutina
            WHERE hr.idCliente = $idUsuario;";
            //Establecer conexión
            
            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL($vSQL);
            //Retornar el resultado
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    //
    public function getCantPersonasRutina($idRutina){

    }
}
