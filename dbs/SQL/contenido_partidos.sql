CREATE TABLE `partidos` (
  `idpartidos` int(11) NOT NULL AUTO_INCREMENT,
  `Equipo1` varchar(5) NOT NULL,
  `Equipo2` varchar(5) NOT NULL,
  `puntosEquipo1` int(11) DEFAULT NULL,
  `puntosEquipo2` int(11) DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  `Stream` varchar(45) DEFAULT NULL,
  `FInalizado` int(2) DEFAULT NULL,
  PRIMARY KEY (`idpartidos`),
  KEY `fk_partidos_Equipos_idx` (`Equipo2`),
  KEY `fk_partidos_Equipos1_idx` (`Equipo1`),
  CONSTRAINT `fk_partidos_Equipos` FOREIGN KEY (`Equipo2`) REFERENCES `equipos` (`siglasEquipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_partidos_Equipos1` FOREIGN KEY (`Equipo1`) REFERENCES `equipos` (`siglasEquipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

INSERT INTO `partidos` VALUES (1,'TSM','100T',0,0,'2021-05-27 00:00:00','valorant',1),(2,'LQD','V1',0,0,'2021-05-27 00:00:00','valorant',1),(3,'TSM','V1',0,0,'2021-05-27 00:00:00','valorant',1),(4,'TSM','V1',0,0,'2021-05-24 00:00:00','valorant',1),(5,'100T','LQD',2,0,'2021-05-23 00:00:00','valorant',1),(6,'100T','LQD',1,2,'2021-04-23 00:00:00','valorant',1),(8,'TSM','LQD',3,2,'2021-05-31 11:30:00','hiko',1),(11,'TSM','100T',1,2,'2021-05-31 14:30:00','corey',1),(12,'TSM','ENVY',0,0,'2021-06-01 17:30:00','Myth',0),(13,'C9W','ENVY',0,2,'2021-06-02 10:30:00','Hiko',0),(14,'C9','C9W',0,0,'2021-06-02 17:30:00','asunaweeb',0),(15,'TSM','100T',3,2,'2021-06-07 17:30:00','Hiko',1);

