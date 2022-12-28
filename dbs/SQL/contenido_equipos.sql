CREATE TABLE `equipos` (
  `siglasEquipo` varchar(5) NOT NULL,
  `nombreEquipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`siglasEquipo`)
) ;

INSERT INTO `equipos` VALUES ('100T','100 Thieves'),('C9','Cloud9'),('C9W','Cloud9White'),('ENVY','Team Envy'),('FNTC','Fanatic'),('Gen.G','Generation Gaming'),('GMBT','Team Gambit'),('IMMT','Immortals'),('LQD','Team Liquid'),('NRG','NRG'),('SEN','Sentinels'),('TI','Time In'),('TSM','Team Solo Mid'),('V1','Version1');

