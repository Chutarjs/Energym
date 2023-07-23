<?php
class EjercicioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar*/
    /*http://localhost:81/Energym/Ejercicio*/
    public function all()
    {
        try {
            //Consulta sql
            $vSql = "SELECT * FROM ejercicio where idEjercicio>0;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    /*Obtener */
    /*http://localhost:81/Energym/Ejercicio/#*/
    public function get($id)
    {
        try {
            //Consulta sql
            $vSql = "SELECT * FROM Ejercicio where idEjercicio=$id";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Recorrer el resultado y agregar las imágenes al ejercicio
            if(!empty($vResultado)){
                //Obtener objeto
                $vResultado = $vResultado[0];
                //---imagenes
                $imagenes = $this->getImagenesEjercicio($id);
                //Asignar servicios al objeto
                $vResultado->imagenes = $imagenes; 
            }
            return $vResultado;

        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    // Obtiene los ejercicios de una rutina
    public function getEjerciciosRutina($id)
    {
        try {
            // Consulta SQL
            $vSql = "SELECT e.IdEjercicio, e.Nombre AS Ejercicio, e.Descripcion, e.Equipamiento, re.Repeticiones, re.Series
            FROM rutinaejercicio re
            INNER JOIN ejercicio e ON re.IdEjercicio = e.idEjercicio 
            WHERE re.IdRutina = $id";

            // Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Recorrer los resultados y agregar las imágenes a cada ejercicio
            foreach ($vResultado as $ejercicio) {
                $idEjercicio = $ejercicio->IdEjercicio;
                $ejercicio->imagenes = $this->getImagenesEjercicio($idEjercicio);
            }

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    /*Obtener las imagenes de los ejercicios de una rutina */
    /*http://localhost:81/Energym/Ejercicio/getImagenesEjercicio/# */
    public function getImagenesEjercicio($idEjercicio)
    {
        try {
            //Consulta SQL
            $vSQL = "SELECT ei.Imagen AS Imagen
            FROM rutinaejercicio re
            INNER JOIN ejercicio e ON re.IdEjercicio = e.idEjercicio 
            INNER JOIN imagenEjercicio ei ON e.idEjercicio = ei.idEjercicio
            WHERE re.IdEjercicio = $idEjercicio;";
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
	 * Crear ejercicio
	 * @param $objeto plan a insertar
	 * @returns $this->get($idEjercicio) - Objeto ejercicio
	 */
	//
    public function create($objeto) {
        try {
            var_dump($objeto);
            //Consulta sql
            //Identificador autoincrementable
			$sql = "Insert into Ejercicio (Nombre, Descripcion, Equipamiento)". 
                     "Values ('$objeto->Nombre','$objeto->Descripcion', '$objeto->Equipamiento')";
			
            //Ejecutar la consulta
            //Obtener ultimo insert
			$idEjercicio = $this->enlace->executeSQL_DML_last($sql);
            //--- Imagenes ---
            foreach ($objeto->imagenes as $imagen) {
                $sql = "INSERT INTO imagenejercicio (idEjercicio, Imagen) VALUES ('$idEjercicio', '$imagen');";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            }

            //Retornar pelicula
            return $this->get($idEjercicio);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function update($objeto) {
        try {
            var_dump($objeto);
            $vSql = "DELETE from imagenejercicio where idEjercicio = $objeto->idEjercicio;";
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
            //Consulta sql
			$vSql = "UPDATE Ejercicio SET Nombre ='$objeto->Nombre', Descripcion = '$objeto->Descripcion', Equipamiento = '$objeto->Equipamiento' Where idEjercicio=$objeto->idEjercicio";
            //Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML( $vSql);
            
            //--- Imagenes ---
            foreach ($objeto->imagenes as $imagen) {
                $sql = "INSERT INTO imagenejercicio (idEjercicio, Imagen) VALUES ('$objeto->idEjercicio', '$imagen');";
                $vResultado = $this->enlace->executeSQL_DML($sql);
            }

            // Retornar el objeto actualizado
            return $this->get($objeto->idPlan);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}
