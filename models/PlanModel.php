<?php
class PlanModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar*/
    /*http://localhost:81/Energym/Plan*/
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM plan where idPlan > 0;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener */
    /*http://localhost:81/Energym/Plan/#*/
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM plan p where idPlan=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener los servicios de un plan */
    /*http://localhost:81/Energym/Plan/getServicioPlan/5*/ 
    public function getServicioPlan($idPlan)
    {
        try {
            //Consulta SQL
            $vSQL = "Select s.idServicio, s.Nombre, s.Descripcion, s.tipo, s.precio from Servicio s, PlanServicio ps, Plan p
            where p.idPlan = $idPlan and ps.idPlan = p.idPlan and ps.idServicio = s.idServicio;";
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
