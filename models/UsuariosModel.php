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

			//Consulta sql
			$vSql = "SELECT * FROM usuario where id=$id";
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			if ($vResultado) {
				$vResultado = $vResultado[0];
				$rol = $rolM->getRolUser($id);
				$vResultado->rol = $rol;
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
			$vSql = "SELECT * from usuario where Email='$objeto->email'";

			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			if (is_object($vResultado[0])) {
				$user = $vResultado[0];
				if (password_verify($objeto->Contrasenna, $user->Contrasenna)) {
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
			if (isset($objeto->Contrasenna) && $objeto->Contrasenna != null) {
				$crypt = password_hash($objeto->Contrasenna, PASSWORD_BCRYPT);
				$objeto->Contrasenna = $crypt;
			}
			$currentDate = date('Y-m-d');
			//Consulta sql            
			$vSql = "Insert into usuario (id, Nombre, Apellidos, Email, Contrasenna, Genero, Nacimiento, Telefono, Moroso, Activo, IdTipoUsuario, FechaInscripcion)" .
				" Values ('$objeto->id','$objeto->Nombre','$objeto->Apellidos', '$objeto->Email', '$objeto->Contrasenna', '$objeto->Genero', '$objeto->Nacimiento', '$objeto->Telefono', 
			'0', '1', '$objeto->idTipoUsuario', '$currentDate')";

			//Ejecutar la consulta
			$vResultado = $this->enlace->executeSQL_DML_last($vSql);
			// Retornar el objeto creado
			return $this->get($vResultado);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
}
