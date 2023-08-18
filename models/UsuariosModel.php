<?php
class UsuariosModel
{
	public $enlace;
	public function __construct()
	{

		$this->enlace = new MySqlConnect();
	}
	public function all()
	{
		try {
			//Consulta sql
			$vSql = "SELECT * FROM usuario;";

			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function get($id)
	{
		try {
			$rolM = new RolModel();
			$planM = new PlanModel();
			//Consulta sql
			$vSql = "SELECT * FROM usuario where id=$id";
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			if ($vResultado) {
				$vResultado = $vResultado[0];

				$rol = $rolM->getRolUser($id);
				$vResultado->rol = $rol;

				$plan = $planM->getByCliente($id);
				$vResultado->plan = $plan;
				// Retornar el objeto
				return $vResultado;
			} else {
				return null;
			}
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function login($objeto)
	{
		try {
			$vSql = "SELECT * from usuario where Email='$objeto->Email'";

			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			if (is_object($vResultado[0])) {
				$user = $vResultado[0];
				if (password_verify($objeto->Password, $user->Contrasenna)) {
					return $this->get($user->id);
				}
			} else {
				return false;
			}
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function create($objeto)
	{
		try {
			if (isset($objeto->Password) && $objeto->Password != null) {
				$crypt = password_hash($objeto->Password, PASSWORD_DEFAULT);
				$objeto->Password = $crypt;
			}
			$currentDate = date('Y-m-d');
			if ($objeto->Tipo != null) {
				//Consulta sql            
				$vSql = "Insert into usuario (id, Nombre, Apellidos, Email, Contrasenna, Genero, Nacimiento, Telefono, Moroso, Activo, IdTipoUsuario, FechaInscripcion)" .
					" Values ('$objeto->id','$objeto->Nombre','$objeto->Apellidos', '$objeto->Email', '$objeto->Password', '$objeto->Genero', '$objeto->Nacimiento', '$objeto->Telefono', 
		'0', '1', '$objeto->Tipo', '$currentDate')";
			} else {
				//Consulta sql            
				$vSql = "Insert into usuario (id, Nombre, Apellidos, Email, Contrasenna, Genero, Nacimiento, Telefono, Moroso, Activo, IdTipoUsuario, FechaInscripcion)" .
					" Values ('$objeto->id','$objeto->Nombre','$objeto->Apellidos', '$objeto->Email', '$objeto->Password', '$objeto->Genero', '$objeto->Nacimiento', '$objeto->Telefono', 
		'0', '1', '1', '$currentDate')";
			}

			//Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML_last($vSql);
			// Retornar el objeto creado
			return $this->get($vResultado);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	public function update($objeto)
	{
		try {
			if (isset($objeto->Password) && $objeto->Password != null) {
				$crypt = password_hash($objeto->Password, PASSWORD_DEFAULT);
				$objeto->Password = $crypt;
			}
				//Consulta sql            
				$vSql = "UPDATE usuario set Nombre = '$objeto->Nombre', Apellidos = '$objeto->Apellidos', Email = '$objeto->Email', 
				Contrasenna = '$objeto->Password', Genero = '$objeto->Genero', Telefono = '$objeto->Telefono' where id = 'objeto->id';";

			//Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML_last($vSql);
			// Retornar el objeto creado
			return $this->get($vResultado);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
}
