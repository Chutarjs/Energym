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
            $servicioModel = new ServicioModel();
            //Consulta sql
			$vSql = "SELECT * FROM plan where idPlan=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            if(!empty($vResultado)){
                //Obtener objeto
                $vResultado = $vResultado[0];

                //---Servicios 
                $listadoServicios = $servicioModel->getServicioPlan($id);
                //Asignar servicios al objeto
                $vResultado->servicios = $listadoServicios;
            }
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}
