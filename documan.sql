-- MySQL dump 10.16  Distrib 10.1.30-MariaDB, for osx10.6 (i386)
--
-- Host: localhost    Database: documan
-- ------------------------------------------------------
-- Server version	10.1.30-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consecutive`
--

DROP TABLE IF EXISTS `consecutive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consecutive` (
  `yearmonth_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`yearmonth_id`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consecutive`
--

LOCK TABLES `consecutive` WRITE;
/*!40000 ALTER TABLE `consecutive` DISABLE KEYS */;
INSERT INTO `consecutive` VALUES (201912,1),(201912,2),(201912,3),(201912,4),(201912,5),(201912,6),(201912,7),(201912,8),(201912,9),(201912,10),(201912,11),(201912,12),(201912,13),(201912,14),(201912,15),(201912,16),(201912,17),(201912,18);
/*!40000 ALTER TABLE `consecutive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `correspondencia`
--

DROP TABLE IF EXISTS `correspondencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `correspondencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `remitente` varchar(60) NOT NULL,
  `destinatario` varchar(60) NOT NULL,
  `fecha_entrega` datetime NOT NULL,
  `fecha_radicacion` datetime NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `consecutivo` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `correspondencia`
--

LOCK TABLES `correspondencia` WRITE;
/*!40000 ALTER TABLE `correspondencia` DISABLE KEYS */;
INSERT INTO `correspondencia` VALUES (1,187,'Munoz','Francisco','2019-12-31 09:53:28','2019-12-24 05:00:00','2019-12-31 14:53:28',''),(2,187,'M','Francisco','2019-12-31 09:54:05','2020-01-01 10:00:00','2019-12-31 14:54:05','WFPCO-20191200002'),(3,187,'Mojica','Pepe','2019-12-31 09:55:55','2019-12-27 01:00:00','2019-12-31 14:55:55','WFPCO-20191200003');
/*!40000 ALTER TABLE `correspondencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers_auth`
--

DROP TABLE IF EXISTS `customers_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers_auth` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers_auth`
--

LOCK TABLES `customers_auth` WRITE;
/*!40000 ALTER TABLE `customers_auth` DISABLE KEYS */;
INSERT INTO `customers_auth` VALUES (169,'Swadesh Behera','swadesh@gmail.com','1234567890','$2a$10$4110749a5dea342ebae12uwJhYc/uHmEl1OyMBO3NTnxlq7SYghyi','4092 Furth Circle','Singapore','2014-09-01 04:21:20'),(170,'Ipsita Sahoo','ipsita@gmail.com','1111111111','$2a$10$d84ffcf46967db4e1718buENHT7GVpcC7FfbSqCLUJDkKPg4RcgV2','2, rue du Commerce','NYC','2014-09-01 04:30:58'),(171,'Trisha Tamanna Priyadarsini','trisha@gmail.com','2222222222','$2a$10$c9b32f5baa3315554bffcuWfjiXNhO1Rn4hVxMXyJHJaesNHL9U/O','C/ Moralzarzal, 86','Burlingame','2014-09-01 04:32:03'),(172,'Sai Rimsha','rimsha@gmail.com','3333333333','$2a$10$477f7567571278c17ebdees5xCunwKISQaG8zkKhvfE5dYem5sTey','897 Long Airport Avenue','Madrid','2014-09-01 06:34:21'),(173,'Satwik Mohanty','satwik@gmail.com','4444444444','$2a$10$2b957be577db7727fed13O2QmHMd9LoEUjioYe.zkXP5lqBumI6Dy','Lyonerstr. 34','San Francisco\n','2014-09-01 06:36:02'),(174,'Tapaswini Sahoo','linky@gmail.com','5555555555','$2a$10$b2f3694f56fdb5b5c9ebeulMJTSx2Iv6ayQR0GUAcDsn0Jdn4c1we','ul. Filtrowa 68','Warszawa','2014-09-01 06:44:54'),(175,'Manas Ranjan Subudhi','manas@gmail.com','6666666666','$2a$10$03ab40438bbddb67d4f13Odrzs6Rwr92xKEYDbOO7IXO8YvBaOmlq','5677 Strong St.','Stavern\n','2014-09-01 06:45:08'),(178,'AngularCode Administrator','admin@angularcode.com','0000000000','$2a$10$72442f3d7ad44bcf1432cuAAZAURj9dtXhEMBQXMn9C8SpnZjmK1S','C/1052, Bangalore','','2014-09-01 07:00:26'),(187,'Frank','ingeniero.frank@gmail.com','321654','$2a$10$4110749a5dea342ebae12uwJhYc/uHmEl1OyMBO3NTnxlq7SYghyi','22 Acacia Avenue','','2017-09-14 01:46:46'),(189,'Francisco Mu?É¬±oz','francisco.munoz@wfp.org','3219881507','$2a$10$03b682c65a6be5f7b5e02OkncchMcXAowDgUiDNGt41KndhULLOMu','Calle 66A 17-67','','2017-10-03 18:22:37'),(190,'pepe','pepe@grillo.com','789','$2a$10$62c3e570fa66bb7865e51uzkZcp5NaQL2KFLHS1VF9PR4N7DLt76a','564','','2019-08-21 03:19:14'),(191,'Fernando Sanchez','fernando.sanchez@wfp.org','3800','$2a$10$33acc36ee9d9fd153f612OSdOTP/bsswhdplkr0JdDpBAs/2mzUrG','oficina','','2019-08-21 03:21:12'),(192,'Marlen Sabogal','marlen.sabogal@wfp.org','---','$2a$10$5a8e6a155f84dd776c0d5uH3KO7bKrMAMvB8DIsmbKCq6fQQA/716','---','','2019-08-21 03:48:07');
/*!40000 ALTER TABLE `customers_auth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-02 15:05:26
