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
            
            $ejercicioM=new EjercicioModel();
            //Consulta sql
			$vSql = "SELECT * FROM Rutina where idRutina=$idRutina";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            $vResultado = $vResultado[0];

            //Lista de servicios del rutina
            $ejercicios=$ejercicioM->getEjerciciosRutina($idRutina);
            //Array con el id de los ejercicios
            if(!empty($ejercicios)){
                $ejercicios = array_column($ejercicios, 'idRutina');
            }else{
               $ejercicios=[]; 
            }
            //Propiedad que se va a agregar al objeto
            $vResultado->ejercicios=$ejercicios;
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
			$sql = "Insert into Rutina (Nombre, idServicio, Descripcion)". 
                     "Values ('$objeto->Nombre', '$objeto->idServicio', '$objeto->Descripcion')";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idRutina = $this->enlace->executeSQL_DML_last($sql);
            //--- Ejercicios ---
            //Crear elementos a insertar en rutinaejercicio
            foreach( $objeto->ejercicios as $ejercicio){
                $dataEjercicios[]=array($idRutina,$ejercicio->idEjercicio, $ejercicio->reps, $ejercicio->series);
            }
            foreach($dataEjercicios as $row){        
                $valores=implode(',', $row);
                $sql = "INSERT INTO rutinaejercicio VALUES(".$valores.");";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            }
            //Retornar rutina
            return $this->get($idRutina);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function update($objeto) {
        try {
            $vSql = "DELETE from rutinaejercicio where IdRutina = $objeto->idRutina;";
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
            //Consulta sql
			$vSql = "UPDATE rutina SET Nombre ='$objeto->Nombre', idServicio = '$objeto->idServicio', Descripcion = '$objeto->Descripcion' Where idrutina=$objeto->idRutina";
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
            //--- Ejercicios ---
            //Crear elementos a insertar en rutinaejercicio
            foreach( $objeto->ejercicios as $ejercicio){
                $dataEjercicios[]=array($objeto->idRutina,$ejercicio->idEjercicio, $ejercicio->reps, $ejercicio->series);
            }
            foreach($dataEjercicios as $row){        
                $valores=implode(',', $row);
                $sql = "INSERT INTO rutinaejercicio VALUES(".$valores.");";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            }

            // Retornar el objeto actualizado
            return $this->get($objeto->idRutina);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}
