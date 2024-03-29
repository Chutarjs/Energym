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
    public function all()
    {
        try {
            //Consulta sql
            $vSql = "SELECT * FROM plan where idPlan > 0;";
            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
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
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) {
                //Obtener objeto
                $vResultado = $vResultado[0];

                //---Servicios 
                $listadoServicios = $servicioModel->getServicioPlan($id);
                //Asignar servicios al objeto
                $vResultado->servicios = $listadoServicios;
            }
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    /*Obtener */
    /*http://localhost:81/Energym/Plan/getHistorial/#*/
    public function getHistorial()
    {
        try {
            //Consulta sql
            $vSql = "SELECT hp.idHistorial, hp.idPlan, hp.idCliente, hp.FechaVigencia, hp.Descripcion, u.Nombre, u.Apellidos FROM historialplan hp, Usuario u where hp.idPlan>0 and hp.idCliente = u.id;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    /*Obtener por cliente*/
    /*http://localhost:81/Energym/Plan/getByCliente/#*/
    public function getByCliente($idCliente)
    {
        try {
            $servicioModel = new ServicioModel();
            //Consulta sql
            $vSql = "select p.idPlan, p.Nombre, p.Descripcion, p.Precio from plan p, historialplan hp 
                    where hp.idCliente = $idCliente and hp.idPlan=p.idPlan and hp.FechaVigencia>=now();";

            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL($vSql);
            if (!empty($vResultado)) {
                //Obtener objeto
                $vResultado = $vResultado[0];
                //---Servicios 
                $listadoServicios = $servicioModel->getServicioPlan($vResultado->idPlan);
                //Asignar servicios al objeto
                $vResultado->servicios = $listadoServicios;
            }
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
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

            $servicioModel = new ServicioModel();
            //Consulta sql
            $vSql = "SELECT * FROM plan where idPlan=$idPlan";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) {
                //Obtener objeto
                $vResultado = $vResultado[0];

                //---Servicios 
                $listadoServicios = $servicioModel->getServicioPlan($idPlan);
                //Asignar servicios al objeto
                $vResultado->servicios = $listadoServicios;
            }
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
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
            $vSql = "SELECT p.idPlan, p.Nombre, p.Descripcion, p.Precio" .
                " FROM Plan p, planservicio ps, Servicio s" .
                " where p.idPlan = ps.idPlan" .
                " and ps.idServicio=$idServicio" .
                " and s.idServicio=$idServicio";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    /**
     * Crear plan
     * @param $objeto plan a insertar
     * @returns $this->get($idPlan) - Objeto plan
     */
    //
    public function create($objeto)
    {
        try {
            //Consulta sql
            //Identificador autoincrementable
            $sql = "Insert into Plan (Nombre, Descripcion)" .
                "Values ('$objeto->Nombre','$objeto->Descripcion')";

            //Ejecutar la consulta
            //Obtener ultimo insert
            $idPlan = $this->enlace->executeSQL_DML_last($sql);
            //--- Servicios ---
            //Crear elementos a insertar en servicios
            foreach ($objeto->servicios as $servicio) {
                $dataServicios[] = array($idPlan, $servicio);
            }
            foreach ($dataServicios as $row) {

                $valores = implode(',', $row);
                $sql = "INSERT INTO planservicio VALUES(" . $valores . ");";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            }
            //Retornar pelicula
            return $this->get($idPlan);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function update($objeto)
    {
        try {
            $vSql = "DELETE from planservicio where idplan = $objeto->idPlan;";
            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL_DML($vSql);
            //Consulta sql
            $vSql = "UPDATE plan SET Nombre ='$objeto->Nombre', Descripcion = '$objeto->Descripcion', Precio = 0 Where idPlan=$objeto->idPlan";
            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL_DML($vSql);

            foreach ($objeto->servicios as $servicio) {
                $dataServicios[] = array($objeto->idPlan, $servicio);
            }
            foreach ($dataServicios as $row) {
                $valores = implode(',', $row);
                $sql = "INSERT INTO planservicio VALUES(" . $valores . ");";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            }

            // Retornar el objeto actualizado
            return $this->get($objeto->idPlan);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    //Matricular un usuario en un plan
    public function matricular($objeto)
    {
        try {
            //Consulta sql
            $vSql = "SELECT count(*) from historialplan Where FechaVigencia>Now() and idCliente = '$objeto->id';";
            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL($vSql);

            if ($vResultado[0]->{"count(*)"} != 0) {
                return "Ya posee un plan matriculado";
            } else {
                //Consulta sql
                $vSql = "SELECT count(*) from pago Where idCliente = '$objeto->id' and Estado = 0;";
                //Ejecutar la consulta
                $vResultado = $this->enlace->executeSQL($vSql);
                if ($vResultado[0]->{"count(*)"} != 0) {
                    return "EL cliente posee un pago pendiente";
                }else{
                    //Consulta sql
                    $vSql = "SELECT count(*) from historialplan Where FechaVigencia>Now() and idCliente = '$objeto->id' and idPlan = '$objeto->idPlan';";
                    //Ejecutar la consulta
                    $vResultado = $this->enlace->executeSQL($vSql);
                    if($vResultado[0]->{"count(*)"} != 0){
                        return "El cliente ya posee esta plan matriculado";
                    }else{
                        $vSql = "INSERT into pago (idCliente, idPlan, Fecha, Estado) values ('$objeto->id', '$objeto->idPlan', NOW(), 0);";
                        //Ejecutar la consulta
                        $vResultado = $this->enlace->executeSQL_DML($vSql);
                        return "Matriculado Correctamente";
                    }
                }
            }
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    //Matricular un usuario en un plan
    public function desmatricular($objeto)
    {
        try {
            //Consulta sql
            $vSql = "SELECT count(*) from pago Where Estado = 0 and idCliente = '$objeto->id';";
            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL($vSql);

            if ($vResultado[0]->{"count(*)"} != 0) {
                return "El cliente posee un pago pendiente";
            } else {
                $vSql = "UPDATE historialplan set FechaVigencia = Now() where idCliente = '$objeto->id' and idPlan = '$objeto->idPlan' and FechaVigencia>now()";
                //Ejecutar la consulta
                $vResultado = $this->enlace->executeSQL_DML($vSql);
            }
            // Retornar el objeto actualizado
            return "Desmatriculado Correctamente";
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}
