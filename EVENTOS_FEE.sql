CREATE DATABASE EVENTOS_FP_FEE;
USE EVENTOS_FP_FEE;

CREATE TABLE TIPOS
(ID_TIPO INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
NOMBRE VARCHAR(45) NOT NULL,
DESCRIPCION VARCHAR(200)
);
insert into TIPOS ( NOMBRE, DESCRIPCION)
		   values ( "Vinos", "Catas de vinos.");
insert into TIPOS ( NOMBRE, DESCRIPCION)
		   values ("Cervezas", "Catas de cerveza.");
insert into TIPOS ( NOMBRE, DESCRIPCION)
		   values ("Cócteles", "Catas de cócteles.");
CREATE TABLE PERFILES
(ID_PERFIL INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
NOMBRE VARCHAR(45) NOT NULL
);

insert into perfiles values(1,'ADMON'), (2,'CLIENTE');

CREATE TABLE USUARIOS
(ID_USUARIO INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(45) NOT NULL UNIQUE,
PASSWORD VARCHAR(250) NOT NULL,
NOMBRE VARCHAR(50),
APELLIDOS VARCHAR(100),
ENABLED INT NOT NULL DEFAULT 1,
FECHA_REGISTRO DATE,
ID_PERFIL INT NOT NULL,
foreign key(ID_PERFIL) REFERENCES PERFILES(ID_PERFIL)
);

insert into usuarios values
(1, 'ramon@fp.com', '12345', 'Ramon', 'Santaolaya Lopez',1,  '2024-03-15', 1),
(2, 'eva@fp.com', '12345', 'Eva', 'Goma Papel',1,  '2025-01-15', 2),
(3, 'carlos@fp.com', '12345', 'Carlos', 'Panadero Estupendo',1,  '2025-03-15', 2),
(4, 'sara@fp.com', '12345', 'Sara', 'Madera',1,  '2025-04-10', 2);


CREATE TABLE EVENTOS
(ID_EVENTO INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(50) not null,
DESCRIPCION VARCHAR(200),
FECHA_INICIO DATE,
UNIDAD_DURACION ENUM('HORAS', 'DIAS'),
DURACION INT,
DIRECCION VARCHAR(100),
AFORO_MAXIMO INT,
ESTADO ENUM('ACTIVO', 'TERMINADO' ,'CANCELADO') default 'ACTIVO',
DESTACADO ENUM('S', 'N'),
PRECIO DOUBLE,
ID_TIPO INT NOT NULL,
FECHA_ALTA DATE,
FOREIGN KEY(ID_TIPO) REFERENCES TIPOS(ID_TIPO)
);

insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Cata vinos Bodega Los Reyes",
             "Experiencia groumet en la bodega Los Reyes", 
             "2025-04-12","HORAS", 
             2,
             "Bodega de los reyes, calle de los reyes, 3", 
             30, 
             "ACTIVO", 
             "S", 
             28, 
             1, 
             "2025-05-19");
             
insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Vinos y quesos italianos premium ",
             "Just Italia te ofrece un plan insuperable, relación calidad precio, una cata como si estuvieras en Italia, con 5 vinos, y una tabla con la mejor selección de 4 de los mejores quesos italianos.", 
             "2025-04-12",
             "HORAS", 
             2,
             "Just Italia, Calle de Castelló, 113", 
             30, 
             "ACTIVO", 
             "S", 
             28, 
             1, 
             "2025-05-19");
             

INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Cata de Vinos Premium Tomasin",
			"Cata dirigida por un profesional, ideal para grupos o parejas, con una duración de 2,5 horas.",
			"2025-07-05",
			"HORAS",
			2.5,
			"Calle Príncipe de Vergara, 211",
			12,
			"ACTIVO",
			"S",
			35,
			1,
			"2025-05-19");

             
INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Cata de Vinos con Maridaje Gourmet",
			"Curso de iniciación con maridaje gourmet en un restaurante de 5 estrellas, dirigido por un sommelier exclusivo. Incluye la cata de 6 a 8 vinos.",
			"2025-06-10", 
			"HORAS", 
            2,
			"Hotel Torre de Madrid, Plaza de España",
			16, 
			"ACTIVO",
			"N",
			66, 
			1,
			"2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Curso de Iniciación a la Cata de Vinos",
			"Curso práctico para aprender a catar vinos, ideal para principiantes, organizado por Gourmet Madrid.",
			"2025-06-15",
			"HORAS",
			2,
			"Calle Vallehermoso, 36, Madrid",
			20,
			"ACTIVO",
			"N",
			30,
			1,
			"2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Catas Temáticas Semanales",
			"Catas con diferentes temáticas como vinos de Madrid, catas maridadas o catas a ciegas por Madrid & Darracott.",
			"2025-06-20", "HORAS", 2,
			"Calle del Conde de Romanones, 2, Madrid",
			25, 
			"ACTIVO", 
			"N", 
			30,
			1,
			"2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Escuela Española de Cata",
			"Cursos presenciales, online y semipresenciales para convertirse en sommelier o mejorar habilidades de cata.",
			"2025-06-22",
			"HORAS",
			3,
			"Calle Francisco Silvela, 70, Madrid",
			18,
			"ACTIVO",
			"S",
			45,
			1,
			"2025-05-19"); 


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Enoteca Barolo",
			"Curso avanzado en 4 sesiones para profundizar en varietales y regiones vinícolas.",
			"2025-07-01",
			"HORAS",
			6,
			"Calle Príncipe de Vergara, 211, Madrid",
			15,
			"ACTIVO",
			"N",
			75,
			1,
			"2025-05-19");
            
            
insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Cata de vinos con un experto enólogo",
             "Disfruta y aprende sobre el vino en este curso de iniciación a la cata con el experto Jesús Flores Téllez, reconocido enólogo, sumiller y Premio Nacional de Gastronomía. ", 
             "2025-04-12",
             "HORAS", 
             3,
             "Aula Española del Vino Simancas, 5- C", 
             30, 
             "ACTIVO", 
             "N", 
             28, 
             1, 
             "2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Curso de Cata de Vinos – Vinology",
			"Eventos y cursos de cata para empresas y particulares en espacios únicos de Madrid.",
			"2025-07-10",
			"HORAS",
			2,
			"Vinology Madrid",
			20,
			"ACTIVO",
			"N",
			40,
			1, 
			"2025-05-19");


insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Mundo de la cerveza en este taller con cata",
             "Entre Cepas te propone experimentar y compartir unas sensaciones que quizá hayas notado alguna vez en los bares, pero que seguramente nunca te has parado a pensar en ellas.", 
             "2025-04-12",
             "HORAS", 
             4,
             "FITENI I Calle López de Hoyos, 42", 
             30, 
             "ACTIVO", 
             "S", 
             28, 
             2, 
             "2025-05-19");
             
insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Cervezas artesanas y quesos eco",
             "Si eres de los que no puede pasar sin una buena cerveza bien fresca, conocerás las cervezas artesanas. ¿Aún no?", 
             "2025-04-12",
             "HORAS", 
             2,
             "C/ Francisco Silvela, 25", 
             30, 
             "ACTIVO", 
             "S", 
             28, 
             2, 
             "2025-05-19");
             
insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Caníbal fábrica de cerveza con cata",
             "Sumérgete en el proceso cervecero, desde la magia de la elaboración hasta la cata de sus últimas creaciones.", 
             "2025-04-12",
             "HORAS", 
             3,
             "Julián Camarillo 19", 
             30, 
             "ACTIVO", 
             "S", 
             28, 
             2, 
             "2025-05-19");
             
INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Cervezas Artesanas en Fábrica Maravillas",
			 "Disfruta de una experiencia sensorial con seis estilos diferentes de cervezas artesanas en pleno centro de Madrid.",
			 "2025-06-08",
			 "HORAS",
			 2,
			 "Calle Valverde 29, Madrid",
			 20,
			 "ACTIVO",
			 "N",
			 20,
			 2,
			 "2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Taller y Cata en Cervezas La Virgen",
			 "Recorre la fábrica de Cervezas La Virgen y aprende sobre sus procesos mientras pruebas sus referencias clásicas y de temporada.",
			 "2025-07-15",
			 "HORAS",
			 3,
			 "Av. de la Industria 18, Las Rozas",
			 40,
			 "ACTIVO",
			 "N",
			 25,
			 2,
			 "2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Cata Sensorial de IPAs Internacionales",
			 "Sumérgete en el mundo del lúpulo con una selección exclusiva de IPAs americanas, belgas e inglesas en un entorno íntimo y guiado.",
			 "2025-06-20",
			 "HORAS",
			 2,
			 "Calle de Embajadores 35, Madrid",
			 15,
			 "ACTIVO",
			 "N",
			 32,
			 2,
			 "2025-05-19");



INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Ruta Cervecera por Lavapiés",
			 "Descubre los mejores bares cerveceros del barrio de Lavapiés en una ruta con guía y degustaciones en cada parada.",
			 "2025-06-28",
			 "HORAS",
			 4,
			 "Inicio en Plaza de Lavapiés",
			 25,
			 "ACTIVO",
			 "N",
			 30,
			 2,
			 "2025-05-19");



INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Maridaje de Cervezas y Quesos Artesanales",
			"Explora cómo diferentes estilos de cerveza se combinan a la perfección con quesos nacionales e internacionales.",
			"2025-07-05",
			"HORAS",
			2,
			"Calle Ponzano 10, Madrid",
			18,
			"ACTIVO",
			"N",
			35,
			2,
			"2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Cata de Cervezas Ácidas y Sours",
			 "Una experiencia para los más atrevidos: descubre el mundo de las cervezas ácidas, con explicación sobre fermentaciones mixtas y espontáneas.",
			 "2025-08-10",
			 "HORAS",
			 2,
			 "Calle Manuela Malasaña 16, Madrid",
			 20,
			 "ACTIVO",
			 "N",
			 27,
			 2,
			 "2025-05-19");



INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA) 
			VALUES ("Beer & Jazz Night: Cata con Música en Vivo",
			 "Una noche única de maridaje entre cerveza artesanal y jazz en directo. Incluye 4 estilos de cerveza y aperitivos.",
			 "2025-07-19",
			 "HORAS",
			 3,
			 "Sala Tempo Club, C/ Duque de Osuna 8, Madrid",
			 50,
			 "ACTIVO",
			 "S",
			 38,
			 2,
			 "2025-05-19");










insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Taller de gin-tonic",
             "Camuflado en los bajos de un edificio de la Dreta de l’Eixample se encuentra el local de Cocktail Shop.", 
             "2025-04-12",
             "HORAS", 
             2,
             "Roger de Llúria, 46 Bajos", 
             30, 
             "ACTIVO", 
             "S", 
             28, 
             3, 
             "2025-05-19");
             
insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Masterclass coctelería, crea y disfruta",
             "La magia del Jardinet es de sobra conocida. Su decoración y su atmósfera evocan un oasis en mitad de la ciudad, que resalta sobre lo cotidiano.", 
             "2025-04-12",
             "HORAS", 
             3,
             "Carrer Mozart, 4", 
             30, 
             "ACTIVO", 
             "S", 
             28, 
             3, 
             "2025-05-19");
             
             
             
             
             
INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA)
			VALUES ("Cata sensorial de cócteles artesanales",
			"Explora los sentidos con una experiencia sensorial guiada por expertos mixólogos en el corazón del Born. Incluye degustación y maridaje.", 
			"2025-06-08", 
			"HORAS", 
			2, 
			"Passeig del Born, 20", 
			25, 
			"ACTIVO", 
			"S", 
			35, 
			3, 
			"2025-05-19");

insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Taller de vermuts y aperitivos creativos",
			"Un taller práctico para aprender a preparar vermuts caseros y combinarlos con pequeños aperitivos. Ideal para amantes del vermut.", 
			"2025-06-15", 
			"HORAS", 
			2, 
			"Plaça de la Vila de Gràcia, 12", 
			20, 
			"ACTIVO", 
			"N", 
			22, 
			3, 
			"2025-05-19");


insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Noches de mixología en la azotea",
			"Un evento exclusivo en una terraza con vistas, donde se aprenden técnicas de mixología avanzada mientras se disfruta de música en vivo.", 
			"2025-06-21", 
			"HORAS", 
			3, 
			"Gran Via de les Corts Catalanes, 670", 
			40, 
			"ACTIVO", 
			"N", 
			45, 
			3, 
			"2025-05-19");


insert into EVENTOS (nombre, DESCRIPCION,FECHA_INICIO,UNIDAD_DURACION,DURACION,DIRECCION,AFORO_MAXIMO,ESTADO,DESTACADO,PRECIO,ID_TIPO,FECHA_ALTA) 
			 values ("Ruta de cócteles por el Raval",
			"Una experiencia urbana en la que se recorren diferentes bares del barrio del Raval, probando un cóctel exclusivo en cada parada.", 
			"2025-06-28", 
			"HORAS", 
			4, 
			"Carrer de Joaquín Costa, 33", 
			15, 
			"ACTIVO", 
			"N", 
			30, 
			3, 
			"2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA)
			VALUES ("Cócteles clásicos reinventados",
			"Descubre cómo reinterpretar los grandes clásicos de la coctelería con ingredientes locales y técnicas modernas. Degustación incluida.", 
			"2025-07-03", 
			"HORAS", 
			2, 
			"Rambla de Catalunya, 82", 
			30, 
			"ACTIVO", 
			"N", 
			32, 
			3, 
			"2025-05-19");

INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA)
			VALUES ("Taller de coctelería tiki y tropical",
			"Sumérgete en el mundo de los cócteles tiki con esta experiencia colorida, exótica y divertida. Incluye elaboración y cata de 3 cócteles.", 
			"2025-07-10", 
			"HORAS", 
			3, 
			"Carrer de Blai, 25", 
			20, 
			"ACTIVO", 
			"N", 
			29, 
			3, 
			"2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA)
			VALUES ("Cata maridaje de cócteles y chocolates",

			"Una combinación inesperada: cócteles artesanales maridados con chocolates gourmet. Una experiencia sensorial guiada por especialistas.", 
			"2025-07-17", 
			"HORAS", 
			2, 
			"Carrer d'Enric Granados, 11", 
			18, 
			"ACTIVO", 
			"N", 
			38, 
			3, 
			"2025-05-19");


INSERT INTO EVENTOS (nombre, DESCRIPCION, FECHA_INICIO, UNIDAD_DURACION, DURACION, DIRECCION, AFORO_MAXIMO, ESTADO, DESTACADO, PRECIO, ID_TIPO, FECHA_ALTA)
			VALUES ("Coctelería con botánicos locales",
			"Aprende a preparar cócteles infusionados con hierbas y botánicos del Mediterráneo. Taller práctico con degustación.", 
			"2025-07-24", 
			"HORAS", 
			2, 
			"Parc de la Ciutadella, zona picnic", 
			25, 
			"ACTIVO", 
			"N", 
			26, 
			3, 
			"2025-05-19");


CREATE TABLE RESERVAS
(ID_RESERVA INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
ID_USUARIO INT NOT NULL,
ID_EVENTO INT NOT NULL,
PRECIO_VENTA DOUBLE,
OBSERVACIONES VARCHAR(200),
CANTIDAD INT not null default 1,
FOREIGN KEY(ID_USUARIO) REFERENCES USUARIOS(ID_USUARIO),
FOREIGN KEY(ID_EVENTO) REFERENCES EVENTOS(ID_EVENTO),
unique(id_usuario,id_evento),
CHECK(CANTIDAD BETWEEN 1 AND 10)
);

INSERT INTO RESERVAS (ID_RESERVA, ID_USUARIO, ID_EVENTO, PRECIO_VENTA, OBSERVACIONES, CANTIDAD)
VALUES 
(1, 2, 1, 20.5, 'Reserva para cata vinos Bodega los reyes', 2),  
(2, 2, 2, 15.0, 'Reserva para cata de vinos y quesos italianos premium', 1),  
(3, 2, 3, 30.0, 'Reserva para cata de vinos con un experto enólogo', 3);


