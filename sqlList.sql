CREATE DATABASE reg_vehiculos;
SHOW DATABASES;
USE reg_vehiculos;

CREATE TABLE marca(
    id_marca INT NOT NULL AUTO_INCREMENT,
    nombre_marca VARCHAR(15) NOT NULL,
    estado ENUM ('S','N') NOT NULL DEFAULT 'N',
    descripcion VARCHAR(50),
    PRIMARY KEY (id_marca)
);


CREATE TABLE linea(
    id_linea INT NOT NULL AUTO_INCREMENT,
    nombre_linea VARCHAR(15) NOT NULL UNIQUE,
    estado ENUM ('S','N') NOT NULL DEFAULT 'N',
    descripcion VARCHAR(50),
    id_marca INTEGER NOT NULL,
    CONSTRAINT `pk_id_linea` PRIMARY KEY(id_linea),
    CONSTRAINT `fk_id_marca` FOREIGN KEY(id_marca) REFERENCES marca(id_marca)    
);

CREATE TABLE vehiculo(
    numero_placa VARCHAR(6) NOT NULL UNIQUE,
    modelo INT (10) NOT NULL,
    fecha_ven_seguro DATE NOT NULL,
    fecha_ven_tecmecanica DATE NOT NULL,
    id_linea INTEGER NOT NULL,
    CONSTRAINT `pk_numero_placa` PRIMARY KEY(numero_placa),
    CONSTRAINT `fk_id_linea` FOREIGN KEY(id_linea) REFERENCES linea(id_linea)    
);

SHOW TABLES;

ALTER TABLE personas DROP INDEX nombre_linea;

INSERT INTO marca (nombre_marca,estado,descripcion) VALUES ('Chevrolet',"S","Marca EEUU, popular, no segura");
INSERT INTO linea (nombre_linea,estado,descripcion,id_marca) VALUES ('RANGER',"S","5 pasajeros camioneta carga",3);
INSERT INTO vehiculo (numero_placa,modelo,fecha_ven_seguro,fecha_ven_tecmecanica,id_linea) VALUES ('CLO098',2003,'2022-05-12','2022-10-06',1);
