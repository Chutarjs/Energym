<?php
class RolModel{
    public $enlace;
    public function __construct() {
        
        $this->enlace=new MySqlConnect();
       
    }
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM tipousuario;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function get($id){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM tipousuario where idTipoUsuario=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function getRolUser($idUser){
        try {
            //Consulta sql
			$vSql = "SELECT r.idTipoUsuario, r.Nombre
            FROM tipousuario r, usuario u 
            where r.id=u.rol_id and u.id=$idUser";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
	
}