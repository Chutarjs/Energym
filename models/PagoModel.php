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
			$vSql = "SELECT * FROM pago where idPago='$id'";
			
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
			$vSql = "SELECT p.idPago, u.id as idCliente, pl.Nombre as idPlan, p.Subtotal, p.Impuesto, p.Extras, p.Total, p.Estado from pago p, usuario u, plan pl
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
	 * Crear pago, crea tambien el historialplan con un trigger
	 * @param $objeto pago
	 * @returns $this->get($idPago) - Objeto pago
	 */
	//
    public function create($objeto) {
        try {
            //Consulta sql
            //Identificador autoincrementable
			$sql = "Insert into Pago (idCliente, idPlan, Estado)". 
                     "Values ('$objeto->idCliente','$objeto->idPlan', 0)";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idPago = $this->enlace->executeSQL_DML_last($sql);
            //Retornar pelicula
            return $this->get($idPago);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function update($objeto) {
        try {
            //Consulta sql
			$vSql = "UPDATE pago SET Estado = 1 Where idPago='$objeto->idPago'";
            
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML( $vSql);

            // Retornar el objeto actualizado
            return $this->get($objeto->idPago);
		} catch ( Exception $e ) {
            return "No se pudo pagar";
		}
    }
}
