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

     /**
	 * Obtener rutina para mostrar información en Formulario
	 * @param $idRutina del rutina
	 * @returns $vresultado - Objeto rutina
	 */
	//
    public function getForm($idRutina)
    {
        try {
            
            $servicioM=new ServicioModel();
            //Consulta sql
			$vSql = "SELECT * FROM Rutina where idRutina=$idRutina";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            $vResultado = $vResultado[0];

            //Lista de servicios del rutina
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
	 * Crear rutina
	 * @param $objeto rutina a insertar
	 * @returns $this->get($idRutina) - Objeto rutina
	 */
	//
    public function create($objeto) {
        try {
            //Consulta sql
            //Identificador autoincrementable
			$sql = "Insert into Rutina (Nombre, Descripcion)". 
                     "Values ('$objeto->Nombre','$objeto->Descripcion')";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idRutina = $this->enlace->executeSQL_DML_last($sql);
            //--- Servicios ---
            //Crear elementos a insertar en servicios
            foreach( $objeto->servicios as $servicio){
                $dataServicios[]=array($idPlan,$servicio);
            }
                foreach($dataServicios as $row){
                    
                    $valores=implode(',', $row);
                    $sql = "INSERT INTO planservicio VALUES(".$valores.");";
                    $vResultado = $this->enlace->executeSQL_DML($sql);
                }
            //Retornar pelicula
            return $this->get($idRutina);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function update($objeto) {
        try {
            var_dump($objeto);
            $vSql = "DELETE from planservicio where idplan = $objeto->idPlan;";
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
            //Consulta sql
			$vSql = "UPDATE plan SET Nombre ='$objeto->Nombre', Descripcion = '$objeto->Descripcion', Precio = 0 Where idPlan=$objeto->idPlan";
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
            
            foreach( $objeto->servicios as $servicio){
                $dataServicios[]=array($objeto->idPlan,$servicio);
            }
                foreach($dataServicios as $row){
                    $valores=implode(',', $row);
                    $sql = "INSERT INTO planservicio VALUES(".$valores.");";
                    $vResultado = $this->enlace->executeSQL_DML($sql);
                }

            // Retornar el objeto actualizado
            return $this->get($objeto->idRutina);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}
