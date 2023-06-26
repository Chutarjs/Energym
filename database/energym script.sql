-- MySQL Script generated by MySQL Workbench
-- Mon Jun 26 16:56:55 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema energym
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema energym
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `energym` DEFAULT CHARACTER SET utf8 ;
USE `energym` ;

-- -----------------------------------------------------
-- Table `energym`.`servicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`servicio` (
  `idservicio` INT(11) NOT NULL,
  `Nombre` VARCHAR(65) NOT NULL,
  `Descripcion` VARCHAR(100) NOT NULL,
  `Imagen` BLOB NULL DEFAULT NULL,
  `Tipo` VARCHAR(15) NOT NULL,
  `Precio` DOUBLE NOT NULL,
  PRIMARY KEY (`idservicio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`actividadgrupal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`actividadgrupal` (
  `idActividadGrupal` INT(11) NOT NULL,
  `idServicio` INT(11) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(500) NULL DEFAULT NULL,
  `Fecha` DATE NOT NULL,
  `HoraInicio` TIME NOT NULL,
  `HoraFinal` TIME NOT NULL,
  `Cupo` INT(11) NOT NULL,
  PRIMARY KEY (`idActividadGrupal`, `idServicio`),
  INDEX `FK_ActGrupales-Servicio_idx` (`idServicio` ASC) ,
  CONSTRAINT `FK_ActGrupales-Servicio`
    FOREIGN KEY (`idServicio`)
    REFERENCES `energym`.`servicio` (`idservicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`tipousuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`tipousuario` (
  `idTipoUsuario` INT(11) NOT NULL,
  `Descripcion` VARCHAR(100) NULL DEFAULT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`usuario` (
  `id` INT(11) NOT NULL,
  `Nombre` VARCHAR(25) NOT NULL,
  `Apellidos` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(60) NOT NULL,
  `Contrasenna` VARCHAR(45) NOT NULL,
  `Genero` INT(11) NOT NULL,
  `Nacimiento` DATE NULL DEFAULT NULL,
  `Telefono` INT(11) NOT NULL,
  `Moroso` TINYINT(4) NOT NULL,
  `Activo` TINYINT(4) NOT NULL,
  `IdTipoUsuario` INT(11) NOT NULL,
  `FechaInscripcion` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Usuario-TipoUsuario` (`IdTipoUsuario` ASC) ,
  CONSTRAINT `FK_Usuario-TipoUsuario`
    FOREIGN KEY (`IdTipoUsuario`)
    REFERENCES `energym`.`tipousuario` (`idTipoUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`actgrupalusuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`actgrupalusuario` (
  `idActGrupal` INT(11) NOT NULL,
  `idUsuario` INT(11) NOT NULL,
  `Estado` TINYINT(4) NOT NULL,
  `Descripcion` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idActGrupal`, `idUsuario`),
  INDEX `FK_ActGrupalUsuario-Usuario_idx` (`idUsuario` ASC) ,
  CONSTRAINT `FK_ActGrupalUsuario-ActGrupal`
    FOREIGN KEY (`idActGrupal`)
    REFERENCES `energym`.`actividadgrupal` (`idActividadGrupal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_ActGrupalUsuario-Usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `energym`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`ejercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`ejercicio` (
  `idEjercicio` INT(11) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(500) NOT NULL,
  `Equipamiento` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idEjercicio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`plan` (
  `idPlan` INT(11) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(100) NOT NULL,
  `Precio` DOUBLE NULL DEFAULT 0,
  PRIMARY KEY (`idPlan`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`historialplan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`historialplan` (
  `idHistorial` INT(11) NOT NULL AUTO_INCREMENT,
  `idPlan` INT(11) NOT NULL,
  `idCliente` INT(11) NOT NULL,
  `FechaVigencia` DATETIME NOT NULL,
  `Descripcion` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idHistorial`, `idPlan`, `idCliente`),
  INDEX `FK_HistorialPlanPlan_idx` (`idPlan` ASC) ,
  INDEX `FK_HistorialPlan-Usuario_idx` (`idCliente` ASC) ,
  CONSTRAINT `FK_HistorialPlan-Usuario`
    FOREIGN KEY (`idCliente`)
    REFERENCES `energym`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_HistorialPlanPlan`
    FOREIGN KEY (`idPlan`)
    REFERENCES `energym`.`plan` (`idPlan`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`rutina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`rutina` (
  `idrutina` INT(11) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `idServicio` INT(11) NOT NULL,
  `Descripcion` VARCHAR(70) NULL DEFAULT NULL,
  PRIMARY KEY (`idrutina`),
  INDEX `FK_RutinaServicio_idx` (`idServicio` ASC) ,
  CONSTRAINT `FK_RutinaServicio`
    FOREIGN KEY (`idServicio`)
    REFERENCES `energym`.`servicio` (`idservicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`historialrutina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`historialrutina` (
  `idRutina` INT(11) NOT NULL,
  `idCliente` INT(11) NOT NULL,
  `FechaVigencia` DATETIME NOT NULL,
  `Decripcion` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idRutina`, `idCliente`),
  INDEX `FK_HistorialRutina-Cliente_idx` (`idCliente` ASC) ,
  CONSTRAINT `FK_HistorialRutina-Cliente`
    FOREIGN KEY (`idCliente`)
    REFERENCES `energym`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_HistorialRutina-Rutina`
    FOREIGN KEY (`idRutina`)
    REFERENCES `energym`.`rutina` (`idrutina`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`imagenejercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`imagenejercicio` (
  `idImagenEjercicio` INT(11) NOT NULL,
  `Imagen` BLOB NOT NULL,
  `Descripcion` VARCHAR(45) NULL DEFAULT NULL,
  `idEjercicio` INT(11) NOT NULL,
  PRIMARY KEY (`idImagenEjercicio`, `idEjercicio`),
  INDEX `FK_ImagenEjercicio-Ejercicio_idx` (`idEjercicio` ASC) ,
  CONSTRAINT `FK_ImagenEjercicio-Ejercicio`
    FOREIGN KEY (`idEjercicio`)
    REFERENCES `energym`.`ejercicio` (`idEjercicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`pago` (
  `idPago` INT(11) NOT NULL AUTO_INCREMENT,
  `idCliente` INT(11) NOT NULL,
  `idPlan` INT(11) NOT NULL,
  `Subtotal` DOUBLE NOT NULL DEFAULT 0,
  `Impuesto` DOUBLE NOT NULL DEFAULT 0,
  `Total` DOUBLE NOT NULL DEFAULT 0,
  `Extras` DOUBLE NOT NULL DEFAULT 0,
  `Fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idPago`),
  INDEX `FK_PagoCliente_idx` (`idCliente` ASC) ,
  INDEX `FK_PagoPlan_idx` (`idPlan` ASC) ,
  CONSTRAINT `FK_PagoCliente`
    FOREIGN KEY (`idCliente`)
    REFERENCES `energym`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_PagoPlan`
    FOREIGN KEY (`idPlan`)
    REFERENCES `energym`.`plan` (`idPlan`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 31
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`planservicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`planservicio` (
  `idPlan` INT(11) NOT NULL,
  `idServicio` INT(11) NOT NULL,
  PRIMARY KEY (`idPlan`, `idServicio`),
  INDEX `FK_PlanServicioServicio_idx` (`idServicio` ASC) ,
  CONSTRAINT `FK_PlanServicioPlan`
    FOREIGN KEY (`idPlan`)
    REFERENCES `energym`.`plan` (`idPlan`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_PlanServicioServicio`
    FOREIGN KEY (`idServicio`)
    REFERENCES `energym`.`servicio` (`idservicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `energym`.`rutinaejercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `energym`.`rutinaejercicio` (
  `IdRutina` INT(11) NOT NULL,
  `IdEjercicio` INT(11) NOT NULL,
  `Repeticiones` INT(11) NOT NULL,
  `Series` INT(11) NOT NULL,
  PRIMARY KEY (`IdRutina`, `IdEjercicio`),
  INDEX `FK_RutinaEjercicio-Ejercicio` (`IdEjercicio` ASC) ,
  CONSTRAINT `FK_RutinaEjercicio-Ejercicio`
    FOREIGN KEY (`IdEjercicio`)
    REFERENCES `energym`.`ejercicio` (`idEjercicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_RutinaEjercicio-Rutina`
    FOREIGN KEY (`IdRutina`)
    REFERENCES `energym`.`rutina` (`idrutina`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `energym`;

DELIMITER $$
USE `energym`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `energym`.`actividadgrupal_AFTER_INSERT`
AFTER INSERT ON `energym`.`actividadgrupal`
FOR EACH ROW
BEGIN
	Insert into actGrupalUsuario values (new.idActividadGrupal, 301110111, 1, "Administrador Registrado");
END$$

USE `energym`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `energym`.`actgrupalusuario_BEFORE_INSERT`
BEFORE INSERT ON `energym`.`actgrupalusuario`
FOR EACH ROW
BEGIN
	if(!((SELECT a.cupo-count(au.idUsuario) FROM actgrupalusuario au, actividadgrupal a WHERE au.idActGrupal = new.idActGrupal and a.idActividadGrupal=au.idActGrupal)>0))
    then
		SIGNAL sqlstate '45001' set message_text = "No queda cupo disponible para la actividad!";
    end if;
    
    if((Select count(ps.idServicio) from PlanServicio ps, HistorialPlan hp, actividadgrupal ag
		where hp.fechavigencia>now() and new.idActGrupal=ag.idActividadGrupal and new.idUsuario = hp.idCliente and ps.idPlan=hp.idPlan and ag.idServicio = ps.idServicio)<=0)
    then
		SIGNAL sqlstate '45002' set message_text = "El plan pagado por el cliente no incluye el servicio de esta actividad grupal!";
    end if;
END$$

USE `energym`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `energym`.`historialrutina_BEFORE_INSERT`
BEFORE INSERT ON `energym`.`historialrutina`
FOR EACH ROW
BEGIN
	if((Select count(ps.idServicio) from PlanServicio ps, HistorialPlan hp, rutina r
		where hp.fechavigencia>now() and r.idRutina = new.idRutina and new.idCliente = hp.idCliente and ps.idPlan=hp.idPlan and r.idServicio = ps.idServicio)<=0)
    then
		SIGNAL sqlstate '45001' set message_text = "El plan pagado por el cliente no incluye el servicio de esta rutina!";
    end if;
    set new.FechaVigencia = date(date_add(now(), interval 1 month));
END$$

USE `energym`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `energym`.`pago_AFTER_INSERT`
AFTER INSERT ON `energym`.`pago`
FOR EACH ROW
BEGIN
     /* Crear Historial Plan*/
    insert into HistorialPlan values (default, new.idPlan, new.idCliente, Date(date_add((new.Fecha), interval 1 month)), CONCAT('El total fue: ', new.Total));
END$$

USE `energym`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `energym`.`pago_BEFORE_INSERT`
BEFORE INSERT ON `energym`.`pago`
FOR EACH ROW
BEGIN
	Declare Subtotal double;
    Declare Impuesto double;
    Declare Total double;
    Declare Extras double;
	/*Asignar montos*/
    Select pl.Precio into @Subtotal from Plan pl where new.idPlan = pl.idPlan;
    set @Impuesto = @Subtotal*0.13;
    if((Select count(pa.idCliente) from Pago pa where pa.idCliente = new.idCliente) <= 0)
    then
		set @extras = 5000;
	else
		set @extras = 0;
	end if;
    set @Total = @Subtotal+@Impuesto+@Extras;
    
    set new.Subtotal = @Subtotal; 
    set new.Impuesto = @Impuesto; 
    set new.Total = @Total; 
    set new.Extras = @Extras;
END$$

USE `energym`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `energym`.`planservicio_AFTER_INSERT`
AFTER INSERT ON `energym`.`planservicio`
FOR EACH ROW
BEGIN
	declare Precio double;
	set @Precio = (Select s.Precio from Servicio s, plan p where new.idPlan = p.idPlan and s.idServicio = new.idServicio);
	if((Select p.Precio from Plan p where new.idPlan=p.idPlan)<=1)then	
		update Plan p set p.Precio = @Precio where p.idPlan = new.idPlan;
	else
		update Plan p set p.Precio = p.Precio+@Precio where p.idPlan = new.idPlan;
    end if;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
