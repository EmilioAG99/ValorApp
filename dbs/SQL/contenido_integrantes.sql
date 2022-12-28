CREATE TABLE `integrantes` (
  `idIntegrantes` int(11) NOT NULL AUTO_INCREMENT,
  `integrante` varchar(45) DEFAULT NULL,
  `Equipo` varchar(5) NOT NULL,
  `mainAgent` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idIntegrantes`),
  KEY `fk_Integrantes_Equipos1_idx` (`Equipo`),
  CONSTRAINT `fk_Integrantes_Equipos1` FOREIGN KEY (`Equipo`) REFERENCES `equipos` (`siglasEquipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;
INSERT INTO `integrantes` VALUES (1,'Subroza','TSM','Skye'),(2,'Wardell','TSM','Jett'),(3,'Hazed','TSM','Sage'),(4,'Brax','TSM','Cypher'),(5,'Drone','TSM','Sova'),(6,'Hiko','100T','Sova'),(7,'Ethan','100T','Sage'),(8,'Asuna','100T','Phoenix'),(9,'Nitro','100T','Omen'),(10,'Steel','100T','Killjoy'),(13,'Mummay','ENVY','Astra'),(14,'Crashies','ENVY','Sova'),(15,'Victor','ENVY','Phoenix'),(16,'FNs','ENVY','Cypher'),(17,'Kaboose','ENVY','Raze'),(18,'Katsumi','C9W','Astra'),(19,'JazzyK1ns','C9W','Jett'),(20,'Alexis','C9W','Cypher'),(21,'Mel','C9W','Killjoy'),(22,'AnnieDro','C9W','Sova'),(23,'Mitch','C9','Killjoy'),(24,'Leaf','C9','Reyna'),(25,'Floppy','C9','Astra'),(26,'Poiz','C9','Jett'),(27,'Xeta','C9','Breach'),(28,'penny','V1','Jett'),(29,'Effys','V1','Sova'),(30,'Vanity','V1','Astra'),(31,'Wippie','V1','Viper'),(32,'Zellsis','V1','Killjoy'),(33,'Scream','LQD','Sage'),(34,'L1nk','LQD','Brimstone'),(35,'Soulcas','LQD','Sova'),(36,'Jamppi','LQD','Jett'),(37,'Kryptix','LQD','Killjoy');
