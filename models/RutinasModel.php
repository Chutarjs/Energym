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
            if(!empty($vResultado)){
                //Obtener objeto
                $vResultado = $vResultado[0];
                //---Personas
                $cantPersonas = $this->getCantPersonasRutina($id);
                //Asignar servicios al objeto
                $vResultado->cantPersonas = $cantPersonas;
            }
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
            $EjercicioModel = new EjercicioModel();
            //Consulta sql
			$vSql = "SELECT * FROM rutina where idRutina=$id";
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            if(!empty($vResultado)){
                //Obtener objeto
                $vResultado = $vResultado[0];
                //---Personas
                $ejercicios = $EjercicioModel->getEjerciciosRutina($id); 
                $cantPersonas = $this->getCantPersonasRutina($id);
                //Asignar servicios al objeto
                $vResultado->cantPersonas = $cantPersonas;
                $vResultado->ejercicios = $ejercicios; 
            }
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
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
        try {
            //Consulta SQL
            $vSQL = "SELECT COUNT(DISTINCT idCliente) AS CantidadPersonas
            FROM historialrutina
            WHERE FechaVigencia >= NOW() and idRutina = $idRutina;";
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
