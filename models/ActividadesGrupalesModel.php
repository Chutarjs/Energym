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
    public function all()
    {
        try {
            //Consulta sql
            $vSql = "SELECT * FROM actividadgrupal where idActividadGrupal > 0;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
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
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
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
                LEFT JOIN energym.actgrupalusuario agu ON ag.idActividadGrupal = agu.idActGrupal AND agu.estado = 1
                GROUP BY ag.idActividadGrupal, ag.Nombre
            ) AS subquery;
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
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
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            if (!empty($vResultado)) {
                //Obtener objeto
                $vResultado = $vResultado[0];
                //---Personas matriculadas
                $matriculados = $this->getMatriculados($id);
                //Asignar servicios al objeto
                $vResultado->matriculados = $matriculados;
            }

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
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
            WHERE ag.idActividadGrupal = $id
            AND agu.Estado = 1;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
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
    /**
     * Obtener ejercicio para mostrar información en Formulario
     * @param $idActividad de la actividad
     * @returns $vresultado - Objeto actividad
     */
    //
    public function getForm($idActividad)
    {
        try {

            //Consulta sql
            $vSql = "SELECT * FROM ActividadGrupal where idActividadGrupal=$idActividad";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    /**
     * Crear actividad
     * @param $objeto actividad a insertar
     * @returns $this->get($idActividad) - Objeto actividad
     */
    //
    public function create($objeto)
    {
        try {
            //Consulta sql
            //Identificador autoincrementable
            $sql = "INSERT INTO actividadgrupal (idServicio, Nombre, Descripcion, Fecha, HoraInicio, HoraFinal, Cupo) " .
                "VALUES ('5', '$objeto->Nombre','$objeto->Descripcion', '$objeto->Fecha', '$objeto->HoraInicio', '$objeto->HoraFinal', '$objeto->Cupo')";

            //Ejecutar la consulta
            //Obtener el último insert
            $idActividad = $this->enlace->executeSQL_DML_last($sql);

            //Retornar el ejercicio
            return $this->get($idActividad);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function update($objeto)
    {
        try {
            //Consulta sql
            $vSql = "UPDATE actividadgrupal SET Nombre ='$objeto->Nombre', Descripcion = '$objeto->Descripcion', 
                    Fecha = '$objeto->Fecha', HoraInicio = '$objeto->HoraInicio', HoraFinal = '$objeto->HoraFinal', 
                    Cupo = '$objeto->Cupo' Where idActividadGrupal=$objeto->idActividadGrupal";

            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL_DML($vSql);

            // Retornar el objeto actualizado
            return $this->get($objeto->idActividadGrupal);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    //matricularse a una
    public function matricular($objeto)
    {
        try {
            $UsuariosModel = new UsuariosModel();
            $user = $UsuariosModel->get($objeto->idUsuario);

            foreach ($user->plan->servicios as $servicio) {
                if ($servicio->idServicio == 5) {

                    //si ya esta matriculado devuelve un mensaje
                    $existingSql = "SELECT COUNT(*) as count FROM actgrupalusuario WHERE idActGrupal = '$objeto->idActividadGrupal' AND idUsuario = '$objeto->idUsuario' AND Estado=1";
                    $existingResult = $this->enlace->executeSQL($existingSql);
                    if ($existingResult[0]->count != 0) {
                        return "El usuario ya está matriculado";
                    }

                    // Verificar si ya existe una entrada en la tabla
                    $existingSql = "SELECT COUNT(*) as count FROM actgrupalusuario WHERE idActGrupal = '$objeto->idActividadGrupal' AND idUsuario = '$objeto->idUsuario'";
                    $existingResult = $this->enlace->executeSQL($existingSql);
                    if ($existingResult == 0) {
                        // Si no existe, realizar la inserción
                        $insertSql = "INSERT INTO actgrupalusuario VALUES ('$objeto->idActividadGrupal', '$objeto->idUsuario', 1, 'Matriculado Exitosamente')";
                        $insertResult = $this->enlace->executeSQL_DML_last($insertSql);

                        return "Matriculado Correctamente";
                    } else {
                        $vSql = "UPDATE actgrupalusuario set Estado=1 where idActGrupal='$objeto->idActividadGrupal' and idUsuario='$objeto->idUsuario'";
                        $insertResult = $this->enlace->executeSQL_DML($vSql);
                        return "Matriculado de nuevo en esta actividad grupal";
                    }
                } else {
                    return "No se pudo matricular, el plan pagado por el cliente no incluye actividades grupales";
                }
            }

            return "No se pudo matricular";
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function desmatricular($objeto)
    {
        try {
            // Verificar la fecha y hora de inicio
            $fechaHoraInicio = strtotime($objeto->Fecha . ' ' . $objeto->HoraInicio);
            $limiteCancelacion = time() + 12 * 3600; // 12 horas en segundos
    
            if ($fechaHoraInicio >= time() && $fechaHoraInicio > $limiteCancelacion) {
                // Realizar el UPDATE para desmatricular
                $updateSql = "UPDATE actgrupalusuario SET Estado = 0 WHERE idActGrupal = '$objeto->idActividadGrupal' AND idUsuario = '$objeto->idUsuario'";
                $updateResult = $this->enlace->executeSQL_DML($updateSql, [$objeto->idActividadGrupal, $objeto->idUsuario]);
    
                return "Desmatriculado Correctamente";
            } else {
                return "No se puede cancelar la reserva, la actividad ya ha comenzado o el límite de cancelación ha sido superado.";
            }
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getMatriculadas($idUsuario)
    {
        try {

            //Consulta sql
            $vSql = "SELECT
            ag.idActividadGrupal, ag.Nombre, ag.Fecha, ag.HoraInicio, ag.HoraFinal
            FROM
            actividadgrupal ag
            INNER JOIN
            actgrupalusuario agU ON ag.idActividadGrupal = agU.idActGrupal
            WHERE
            agU.idUsuario = '$idUsuario' -- el ID del usuario deseado
            AND agU.Estado = 1 -- Consideramos que 1 es el estado de matriculado
            GROUP BY
            ag.idActividadGrupal, ag.Nombre, ag.Fecha, ag.HoraInicio, ag.HoraFinal;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getHistorial($idUsuario)
    {
        try {

            //Consulta sql
            $vSql = "SELECT
            ag.idActividadGrupal, ag.Nombre, ag.Fecha, ag.HoraInicio, ag.HoraFinal, ag.Cupo, agU.Estado
            FROM
            actividadgrupal ag
            INNER JOIN
            actgrupalusuario agU ON ag.idActividadGrupal = agU.idActGrupal
            WHERE
            agU.idUsuario = '$idUsuario' -- el ID del usuario deseado
            GROUP BY
            ag.idActividadGrupal, ag.Nombre, ag.Fecha, ag.HoraInicio, ag.HoraFinal, ag.Cupo, agU.Estado;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}
