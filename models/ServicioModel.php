<?php
class ServicioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /*Listar todos*/
    /*http://localhost:81/Energym/servicio*/
    public function all()
    {
        try {
            //Consulta sql
            $vSql = "SELECT * from Servicio where idservicio > 0;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    /*Obtener servicio por id*/
    /*http://localhost:81/Energym/servicio/#*/
    public function get($id)
    {
        try {
            //Consulta sql
            $vSql = "SELECT * FROM servicio where idservicio=$id";
            var_dump(password_hash("123456", PASSWORD_DEFAULT));
            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    /*Obtener los servicios de un plan*/
    /*http://localhost:81/Energym/Servicio/getServicioPlan/5*/
    public function getServicioPlan($idPlan)
    {
        try {
            //Consulta SQL
            $vSQL = "SELECT s.idServicio, s.Nombre, s.Descripcion, s.tipo, s.precio FROM plan p, planservicio ps, servicio s where p.idPlan=$idPlan and p.idPlan = ps.idPlan and ps.idServicio = s.idservicio";
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
     * Obtener servicio para mostrar información en Formulario
     * @param $idservicio del servicio
     * @returns $vresultado - Objeto servicio
     */
    //
    public function getForm($idServicio)
    {
        try {
            //Consulta sql
            $vSql = "SELECT * FROM servicio where idservicio=$idServicio";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    /**
     * Crear servicio
     * @param $objeto servicio a insertar
     * @returns $this->get($idServicio) - Objeto servicio
     */
    //
    public function create($objeto)
    {
        try {

            $imagenBinaria = file_get_contents($objeto->imagen[0]);

            // Escape special characters in the binary image
            $imagenBinaria = $this->enlace->escapeString($imagenBinaria);

            //Consulta sql
            //Identificador autoincrementable
            $sql = "Insert into servicio (Nombre, Descripcion, Imagen, Tipo, Precio)" .
                "Values ('$objeto->Nombre','$objeto->Descripcion', '$imagenBinaria', '$objeto->Tipo', '$objeto->Precio')";

            //Ejecutar la consulta
            //Obtener ultimo insert
            $idServicio = $this->enlace->executeSQL_DML_last($sql);

            //Retornar pelicula
            return $this->get($idServicio);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    /**
     *Actualizar Servicio
     */
    public function update($objeto)
    {
        try {

            $imagenBinaria = file_get_contents($objeto->imagen[0]);
            // Escape special characters in the binary image
            $imagenBinaria = $this->enlace->escapeString($imagenBinaria);
            //Consulta sql
            $vSql = "UPDATE servicio SET Nombre ='$objeto->Nombre', Descripcion = '$objeto->Descripcion', Imagen = '$imagenBinaria', Tipo = '$objeto->Tipo', Precio = '$objeto->Precio' Where idServicio=$objeto->idservicio";
            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL_DML($vSql);

            // Retornar el objeto actualizado
            return $this->get($objeto->idservicio);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}
