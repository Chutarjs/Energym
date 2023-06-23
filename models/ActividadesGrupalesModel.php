<?php
class ActividadesGrupalesModel
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
			$vSql = "SELECT * FROM actividadgrupal where idActividadGrupal > 0;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener por id*/
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM actividadgrupal where idActividadGrupal = $id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener las actividades que tengan cupo disponible */
    public function getActividadesConCupo()
    {
        try {
            //Consulta SQL -- hay que hacerla
            $vSQL = "Select r.idrutina, r.nombre, u.nombre, h.FechaVigencia from rutina r, historialrutina h, usuario u
            where r.idRutina = h.idRutina and u.id = h.idCliente";
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
