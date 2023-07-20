<?php
class ServicioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    
    /*Listar*/
    /*http://localhost:81/Energym/servicio*/
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * from Servicio where idservicio > 0;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener */
    /*http://localhost:81/Energym/servicio/#*/
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM servicio where idservicio=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /*Obtener los servicios de un plan */
    /*http://localhost:81/Energym/Servicio/getServicioPlan/5*/ 
    public function getServicioPlan($idPlan)
    {
        try {
            //Consulta SQL
            $vSQL = "SELECT s.idServicio, s.Nombre, s.Descripcion, s.tipo, s.precio FROM plan p, planservicio ps, servicio s where p.idPlan=$idPlan and p.idPlan = ps.idPlan and ps.idServicio = s.idservicio";
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
