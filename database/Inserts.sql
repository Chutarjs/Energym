/*Insert Tipo Usuario*/
insert into tipousuario
values(1, "Cliente con acceso a rutinas, planes, ejercicios y actividades grupales", "Cliente");
insert into tipousuario
values(2, "Administrador con acceso a todo", "Administrador");
insert into tipousuario
values(3, "Trabajador de Energym, puede crear rutinas y ver datos administrativos", "Empleado");
/*Select * from TipoUsuario;*/

/*Insert Cliente*/
insert into Usuario values (202220221, "Joel", "Campbell", "joecamp@gmail.com", "123456", 1, '1995-01-01', 30303030, 0, 1, 1, '2023-06-01');
insert into Usuario values (202220222, "Michael", "Barrantes", "michbarra@gmail.com", "123456", 1, '1985-01-01', 30303031, 0, 1, 1, '2023-06-01');
insert into Usuario values (202220223, "Celso", "Borges", "celsinho@gmail.com", "123456", 1, '1989-01-01', 30303032, 0, 1, 1, '2022-01-01');
insert into Usuario values (202220224, "Bryan", "Ruiz", "capitan@gmail.com", "123456", 1, '1987-01-01', 30303033, 0, 0, 1, '2020-06-01');
insert into Usuario values (202220225, "Carlos", "Mora", "moradona@gmail.com", "123456", 1, '2000-01-01', 30303034, 0, 1, 1, '2016-01-01');
insert into Usuario values (202220226, "Aaron", "Suarez", "aaronsua@gmail.com", "123456", 1, '2003-01-01', 30303035, 0, 1, 1, '2018-01-01');
insert into Usuario values (202220227, "Leonel", "Moreira", "osito@gmail.com", "123456", 1, '1995-01-01', 30303036, 0, 1, 1, '2020-01-01');
insert into Usuario values (202220228, "Pablo", "Gabas", "argentina@gmail.com", "123456", 1, '1983-01-01', 30303037, 0, 0, 1, '2005-01-01');
insert into Usuario values (202220229, "Shirley", "Cruz", "capitana@gmail.com", "123456", 2, '1990-01-01', 30303038, 0, 0, 1, '2019-01-01');
insert into Usuario values (202220230, "Kenia", "Rangel", "kenia@gmail.com", "123456", 2, '2003-01-01', 30303039, 0, 1, 1, '2020-01-01');
insert into Usuario values (202220231, "Marcel", "Hernandez", "malo@gmail.com", "123456", 1, '1990-01-01', 30301240, 1, 0, 1, '2020-01-01');

/*Insert Empleado*/
insert into Usuario values (302220221, "Andres", "Carevic", "profe@gmail.com", "123456", 1, '1980-01-01', 31113131, 0, 1, 3, '2023-01-01');
insert into Usuario values (302820222, "Juan Carlos", "Herrera", "juank@gmail.com", "123456", 1, '1985-01-01', 30008031, 0, 1, 3, '2018-01-01');
insert into Usuario values (302420221, "Wardy", "Alfaro", "wardy@gmail.com", "123456", 1, '1980-01-01', 30303410, 0, 1, 3, '2020-06-01');
insert into Usuario values (301220222, "Mario", "Acosta", "marito@gmail.com", "123456", 1, '1985-01-01', 38703031, 0, 1, 3, '2023-01-01');

/*Insert Administrador*/
insert into Usuario values (301110111, "Joseph", "Joseph", "presi@gmail.com", "123456", 1, '1970-01-01', 38634031, 0, 1, 2, '2020-01-01');
Select * from Usuario where id > 0 order by IdTipoUsuario asc;
/*Delete from Usuario where id > 0;*/

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
/*Servicios*/
Insert into Servicio(idservicio, Nombre, Descripcion, Tipo, Precio) values (1, "Gym", "Ejercicios de gym", "Individual", 10000);
Insert into Servicio(idservicio, Nombre, Descripcion, Tipo, Precio) values (2, "Natacion", "Ejercicios de piscinas", "Individual", 15000);
Insert into Servicio(idservicio, Nombre, Descripcion, Tipo, Precio) values (3, "Atletismo", "Ejercicios de atletismo", "Individual", 8000);
Insert into Servicio(idservicio, Nombre, Descripcion, Tipo, Precio) values (4, "Boxeo", "Ejercicios de boxing", "Individual", 12000);
Insert into Servicio(idservicio, Nombre, Descripcion, Tipo, Precio) values (5, "Grupales", "Ejercicios grupales", "Grupal", 3000);
Select * from Servicio where idservicio > 0;

/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*Ejercicios*/
/*Ejercicios de gym*/
Insert into Ejercicio values (1, "Dominadas", "Agarrarte a una barra y impulsar tu cuerpo hacia arriba", "Barra, pesos extras(opcional)");
Insert into Ejercicio values (2, "Salto Vertical", "Sitúa los pies en paralelo a una distancia corta. Dobla ligeramente las rodillas y salta en vertical. Impulsa tus brazos hacia arriba para generar inercia. Al impactar de nuevo en el suelo dobla tobillos, rodillas y cadera para frenar el impacto y recepcionar suavemente.", "Caja");
Insert into Ejercicio values (3, "Remo", "Este ejercicio puedes realizarlo tanto en su variante cardiorrespiratoria, en un equipamiento cardiorrespiratorio (un ergómetro) como en su variante de fuerza o tonificación con una goma, mancuernas o incluso una barra. Este ejercicio favorecerá la tonificación de la parte alta de la espalda.", "Goma, mancuernas o incluso una barra");
Insert into Ejercicio values (4, "Peso Muerto", "Este ejercicio contribuye a la salud de nuestro tren inferior, nuestro core y espalda baja. Se puede realizar inicialmente tirando de una goma, con mancuerna, o posteriormente cuando podamos entrenar con cargas elevadas, sería recomendable realizarlo con una barra olímpica y discos.", "Goma y mancuerna o barra con discos");
Insert into Ejercicio values (5, "Sentadilla", "En las sentadillas partimos de una posición erguida y realizamos una triple flexión (cadera, rodillas y tobillos) Para personas que se están iniciando ¼ de sentadilla es suficiente, a medida que nos vayamos sintiendo más a gusto con este ejercicio, podemos bajar hasta ½ sentadilla (cadera y rodillas a la misma altura), y más adelante hasta una sentadilla profunda, siempre que tengamos una buena salud articular y la flexibilidad adecuada.", "Pesos(opcional)");
/*Ejercicios de natacion*/
Insert into Ejercicio values (6, "Crol", "La manera de llevar a cabo este estilo de natación es alternar los brazos, estirando hacia adelante uno y después el otro. Al mismo tiempo, se ha de llevar la cabeza hacia el brazo contrario al que se estira para poder respirar.", "Piscina y lentes");
Insert into Ejercicio values (7, "Braza", "Para llevar a cabo este ejercicio, es preciso mover los brazos y las piernas de manera simultánea. Los brazos se estiran hacia adelante y vuelven hacia atrás haciendo un círculo; de la misma manera se hará con las piernas. El movimiento te permitirá elevar el pecho y sacar la cabeza para poder respirar.", "Piscina y lentes");
Insert into Ejercicio values (8, "Mariposa", "El estilo mariposa consiste en realizar brazadas con ambos brazos a la vez, al tiempo que se efectúa una ondulación con el torso, la cadera y las rodillas para potenciar el movimiento de las piernas, que van juntas. Por cada ciclo de brazada se realizan dos ciclos de patadas.", "Piscina y lentes");
Insert into Ejercicio values (9, "Espalda", "Estando boca arriba, los brazos se mueven estirados hacia atrás de manera alterna. Las piernas tampoco se quedan quietas, sino que se dan una serie de patadas continuadas", "Piscina y lentes");
Insert into Ejercicio values (10, "Fondos", "Nadar en estilo de crol grandes distancias", "Piscina y lentes");
/*Ejercicios de atletismo*/ 
Insert into Ejercicio values (11, "Carrera Ligera", "Se trata de iniciar siempre con una carrera ligera, de unos 10 a 20 minutos en base a tus necesidades. Se debe partir muy lentamente y acelerar gradualmente, recuerda que estás calentando tus músculos, no es una carrera ni competencia.", "Pista");
Insert into Ejercicio values (12, "Carrera Frecuencia Alta", "La carrera tradicional con las rodillas altas, trabaja en la frecuencia y no en correr velozmente, debes oscilar tus brazos en una manera coordinada con el movimiento de las piernas.", "Pista");
Insert into Ejercicio values (13, "Salto con Patadas Hacia Atrás", "La modalidad de ejecución es la misma del salto, pero los pies se mueven hacia atrás como si estuvieras tocando tus glúteos con los talones mientras corres. En este particular, es importante trabajar en la frecuencia, buscando desarrollar un movimiento fluido.", "Pista");
Insert into Ejercicio values (14, "Saltos Coordinados", "Se trata de concentrarnos en la fase de impulsar la rodilla hacia adelante, formando un ángulo de 90 grados mientras corremos, acompañando el movimiento con el brazo opuesto. Recuerda que debes concentrarte en el movimiento vertical en vez de la velocidad horizontal.", "Pista");
Insert into Ejercicio values (15, "Zancadas", "Las zancadas son pasos largos en los cuales se requiere llevar una pierna hacia adelante, y doblarla a 90° con respecto al suelo, mientras que la rodilla de la pierna de atrás desciende hacia el piso (sin apoyarse en el mismo). En este ejercicio la atención principal se dedica en la posición, más que en la velocidad o frecuencia.", "Pista");
/*Ejercicios de boxeo*/
Insert into Ejercicio values (16, "Flexión con Aplauso", "Al  hacer la flexión os impulsáis hacia arriba y, en el ratito que el cuerpo está en el aire, dais una palmada.", "Nada");
Insert into Ejercicio values (17, "Saltar la Cuerda", "Saltar la cuerda", "Cuerda");
Insert into Ejercicio values (18, "Jab", "Es el golpe directo, seco. El más común.", "Guantes y saco");
Insert into Ejercicio values (19, "Cross", "Igual que el jab, pero el golpe parte de atrás", "Guantes y saco");
Insert into Ejercicio values (20, "Uppercut", "Golpe muy espectacular que va desde abajo a la mandíbula del contrario.", "Guantes y saco(opcional)");
/*delete from ejercicio where idEjercicio>0;*/
Select * from Ejercicio;

/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*Actividades Grupales*/
Insert into actividadgrupal values (1, 5, "Yoga", "Es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.", '2023-09-29', '09:00:00', '10:00:00', 30);
Insert into actividadgrupal values (2, 5, "Zumba", "Es una disciplina deportiva que se imparte en clases dirigidas en la que se realizan ejercicios aeróbicos al ritmo de música latina (merengue, samba, reggaeton, cumbia y salsa) con la finalidad de perder peso de forma divertida y mejorar el estado de ánimo de los deportistas.", '2023-09-16', '13:00:00', '14:00:00', 31);
Insert into actividadgrupal values (3, 5, "Defensa Personal", "Consiste en desarrollar habilidades que nos ayuden a protegernos ante una agresión inminente. En ellas, no se depende únicamente de la fuerza, sino que cobran protagonismo la velocidad, la agilidad en los movimientos y la capacidad para anticiparse a las acciones del agresor.", '2023-09-17', '08:00:00', '09:00:00', 15);
Insert into actividadgrupal values (4, 5, "Caminata", "Caminar, y en general, la práctica habitual de ejercicio físico puede ayudar a prevenir la osteoporosis, el riesgo de parada cardíaca y determinados cánceres. Otras ventajas son obvias e inmediatas. Mejorará tu capacidad de concentración. Disminuirán los efectos del estrés.", '2023-09-18', '08:30:00', '09:30:00', 50);
Insert into actividadgrupal values (5, 5, "Gimnasia Embarazadas", "Se busca fortalecer los musculos de cara al parto, ademas de ser relajante", '2023-09-23', '10:00:00', '11:00:00', 10);
Select * from actividadgrupal;
SELECT COUNT(au.idActGrupal) FROM actgrupalusuario au, actividadgrupal a WHERE au.idActGrupal = 1;
/*Delete from actividadgrupal where idActividadGrupal > 0;*/
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*Rutina*/
Insert into Rutina values (1, "Rutina de Gimnasio 1", 1, "Rutina con equipamiento del gym");
Insert into RutinaEjercicio values (1, 1, 15, 3);
Insert into RutinaEjercicio values (1, 2, 30, 3);
Insert into RutinaEjercicio values (1, 3, 20, 3);
Insert into RutinaEjercicio values (1, 4, 15, 3);
Insert into RutinaEjercicio values (1, 5, 40, 3);

Insert into Rutina values (2, "Rutina de Natacion 1", 2, "Rutina con equipamiento de natacion");
Insert into RutinaEjercicio values (2, 6, 5, 3);
Insert into RutinaEjercicio values (2, 7, 5, 3);
Insert into RutinaEjercicio values (2, 8, 5, 3);
Insert into RutinaEjercicio values (2, 9, 5, 3);
Insert into RutinaEjercicio values (2, 10, 5, 3);

Insert into Rutina values (3, "Rutina de Atletismo 1", 3, "Rutina con equipamiento de atletismo");
Insert into RutinaEjercicio values (3, 11, 5, 3);
Insert into RutinaEjercicio values (3, 12, 5, 3);
Insert into RutinaEjercicio values (3, 13, 40, 3);
Insert into RutinaEjercicio values (3, 14, 40, 3);
Insert into RutinaEjercicio values (3, 15, 40, 3);

Insert into Rutina values (4, "Rutina de Boxeo", 4, "Rutina con equipamiento de boxeo");
Insert into RutinaEjercicio values (4, 16, 40, 3);
Insert into RutinaEjercicio values (4, 17, 100, 3);
Insert into RutinaEjercicio values (4, 18, 40, 3);
Insert into RutinaEjercicio values (4, 19, 40, 3);
Insert into RutinaEjercicio values (4, 20, 40, 3);
Select r.idRutina, e.Nombre, re.Repeticiones, re.Series, r.idServicio from rutina r, rutinaejercicio re, ejercicio e where e.idEjercicio=re.idEjercicio and re.IdRutina=r.IdRutina;

/*Planes*/
Insert into Plan values(1, "Plan de GYM", "Solo gimnasio", 10000);
insert into PlanServicio values(1, 1);
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*Plan Cliente*/
/*Hay un trigger que hace que cada vez que el cliente paga un plan se le asigna automaticamente en la tabla historial plan*/
Insert into pago(idPago, idCliente, idPlan, Fecha) values (default, 202220221, 1, now()); 
select * from pago;
select * from historialplan;

/*-----------------------------------------------------------------------------------------------------------------------------------------...*/
/*Rutina asignada*/
insert into historialrutina values(1, 202220222, DATE(DATE_ADD(now(), INTERVAL 1 MONTH)), "Rutina Asignada a Joel");