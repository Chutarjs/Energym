<?php
class ActividadesGrupalesModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    /*http://localhost:81/Energym/ActividadesGrupales */
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
    /*http://localhost:81/Energym/ActividadesGrupales/# */
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
    /* Obtener todas detalladas */
    /*http://localhost:81/Energym/ActividadesGrupales/getDetalle/1*/
    public function getDetalle()
    {
        try {
            //Consulta sql
			$vSql = "SELECT subquery.idActividadGrupal, subquery.Nombre, subquery.Fecha, subquery.HoraInicio, subquery.HoraFinal, subquery.Cupo, subquery.cantidad_matriculados
            FROM (
                SELECT ag.idActividadGrupal, ag.Nombre, ag.Fecha, ag.HoraInicio, ag.HoraFinal, ag.Cupo, COUNT(agu.idUsuario) AS cantidad_matriculados
                FROM energym.actividadgrupal ag
                LEFT JOIN energym.actgrupalusuario agu ON ag.idActividadGrupal = agu.idActGrupal
                GROUP BY ag.idActividadGrupal, ag.Nombre
            ) AS subquery";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /* Obtener una detallada */
    /*http://localhost:81/Energym/ActividadesGrupales/getDetalleById/1*/
    public function getDetalleById($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT subquery.idActividadGrupal, subquery.Nombre, subquery.Descripcion, subquery.Cupo, subquery.Fecha, subquery.HoraInicio, subquery.HoraFinal, subquery.cantidad_matriculados
            FROM (
                SELECT ag.idActividadGrupal, ag.Nombre, ag.Descripcion, ag.Cupo, ag.Fecha, ag.HoraInicio, ag.HoraFinal, COUNT(agu.idUsuario) AS cantidad_matriculados
                FROM energym.actividadgrupal ag
                LEFT JOIN energym.actgrupalusuario agu ON ag.idActividadGrupal = agu.idActGrupal
                GROUP BY ag.idActividadGrupal, ag.Nombre
            ) AS subquery
            WHERE subquery.idActividadGrupal = $id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

            if(!empty($vResultado)){
                //Obtener objeto
                $vResultado = $vResultado[0];
                //---Personas matriculadas
                $matriculados = $this->getMatriculados($id); 
                //Asignar servicios al objeto
                $vResultado->matriculados = $matriculados; 
            }

			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function getMatriculados($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT agu.idUsuario, u.Nombre AS NombreUsuario, u.Apellidos as Apellido
            FROM energym.actgrupalusuario agu
            JOIN energym.actividadgrupal ag ON ag.idActividadGrupal = agu.idActGrupal
            JOIN energym.usuario u ON u.id = agu.idUsuario
            WHERE ag.idActividadGrupal = $id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /*Obtener las actividades que tengan cupo disponible */
    /*http://localhost:81/Energym/ActividadesGrupales/getActividadesConCupo/1*/
    public function getActividadesConCupo()
    {
        try {
            //Consulta SQL
            $vSQL = "SELECT ag.idActividadGrupal, ag.Nombre AS NombreActividad, ag.Cupo - COUNT(agu.idUsuario) AS CupoDisponible, ag.HoraInicio, ag.HoraFinal
            FROM energym.actividadgrupal ag
            LEFT JOIN energym.actgrupalusuario agu ON ag.idActividadGrupal = agu.idActGrupal
            WHERE CONCAT(ag.Fecha, ' ', ag.HoraInicio) >= NOW()
            GROUP BY ag.idActividadGrupal, ag.Nombre
            HAVING CupoDisponible > 0;";
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
