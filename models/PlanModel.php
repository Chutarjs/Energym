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

    /**
	 * Obtener plan para mostrar información en Formulario
	 * @param $idPlan del plan
	 * @returns $vresultado - Objeto plan
	 */
	//
    public function getForm($idPlan)
    {
        try {
            
            $servicioM=new ServicioModel();
            //Consulta sql
			$vSql = "SELECT * FROM Plan where idPlan=$idPlan";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            $vResultado = $vResultado[0];

            //Lista de servicios del plan
            $servicios=$servicioM->getServicioPlan($idPlan);
            //Array con el id de los generos
            if(!empty($servicios)){
                $servicios = array_column($servicios, 'idPlan');
            }else{
               $servicios=[]; 
            }
            //Propiedad que se va a agregar al objeto
            $vResultado->servicios=$servicios;
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /**
	 * Obtener los planes que pertenecen a un servicio
	 * @param $idServicio del Servicio
	 * @returns $vresultado - Objeto plan
	 */
	//
    public function getbyServicio($idServicio)
    {
       try {
            //Consulta sql
			$vSql = "SELECT p.idPlan, p.Nombre, p.Descripcion, p.Precio".
            " FROM Plan p, planservicio ps, Servicio s".
            " where p.idPlan = ps.idPlan".
            " and ps.idServicio=$idServicio".
            " and s.idServicio=$idServicio";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /**
	 * Crear plan
	 * @param $objeto plan a insertar
	 * @returns $this->get($idPlan) - Objeto plan
	 */
	//
    public function create($objeto) {
        try {
            //Consulta sql
            //Identificador autoincrementable
            
			$sql = "Insert into Plan (idPlan, Nombre, Descripcion)". 
                     "Values ('$objeto->idPlan','$objeto->Nombre','$objeto->Descripcion')";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idPlan = $this->enlace->executeSQL_DML_last($sql);
            //--- Servicios ---
            //Crear elementos a insertar en servicios
            foreach( $objeto->servicios as $servicio){
                $dataServicios[]=array($idPlan,$servicio);
            }
            /* $dataServicios=array(
                array(1,7),
                array(1,8)
                ); */
                
                foreach($dataGenres as $row){
                    
                    $valores=implode(',', $row);
                    $sql = "INSERT INTO movie_genre(movie_id,genre_id) VALUES(".$valores.");";
                    $vResultado = $this->enlace->executeSQL_DML($sql);
                }
            //--- Actores ---
            //Crear elementos a insertar en actores
            //--- Actores ---
            //Crear elementos a insertar en actores
            //Opcion 1
            foreach ($objeto->actors as $row) {
                $dataActores[] = array($idMovie, $row->actor_id, $row->role);
            }

            foreach ($dataActores as $row) {
                $sql = "INSERT INTO movie_cast(movie_id,actor_id,role) VALUES($row[0], $row[1], '$row[2]')";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            }

            //Opcion 2
            /*  foreach ($objeto->actors as $row) {
                $sql = "INSERT INTO movie_cast(movie_id,actor_id,role) VALUES(($idMovie, $row->actor_id,$row->role)";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            } */
            //Retornar pelicula
            return $this->get($idMovie);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function update($objeto) {
        try {
            //Consulta sql
			$vSql = "Update Plan SET Nombre ='$objeto->Nombre', Descripcion = '$objeto->Descripcion' Where idPlan=$objeto->idPlan";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
			// Retornar el objeto actualizado
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}
