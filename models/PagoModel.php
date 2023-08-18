<?php
class PagoModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar*/
    /*http://localhost:81/Energym/Pago*/
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM pago where idPago > 0;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener */
    /*http://localhost:81/Energym/Pago/#*/
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM pago where idPago=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener por cliente*/
    /*http://localhost:81/Energym/Pago/getByCliente/#*/
    public function getByCliente($idCliente)
    {
        try {
            //Consulta sql
			$vSql = "SELECT p.idPago, u.id, pl.Nombre, p.Subtotal, p.Impuesto, p.Extras, p.Total, p.Estado from pago p, usuario u, plan pl
            where p.idCliente= $idCliente and u.id = $idCliente and p.idPlan = pl.idPlan";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL($vSql);

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
			$sql = "Insert into Plan (Nombre, Descripcion)". 
                     "Values ('$objeto->Nombre','$objeto->Descripcion')";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idPlan = $this->enlace->executeSQL_DML_last($sql);
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
            return $this->get($idPlan);
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
            return $this->get($objeto->idPlan);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}
