-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: nodelogin
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `App_Acronym` varchar(3) NOT NULL,
  `App_Description` varchar(45) NOT NULL,
  `App_Rnumber` int NOT NULL,
  `App_startDate` datetime NOT NULL,
  `App_endDate` datetime NOT NULL,
  `App_permit_Open` varchar(45) NOT NULL,
  `App_permit_toDoList` varchar(45) NOT NULL,
  `App_permit_Doing` varchar(45) NOT NULL,
  `App_permit_Done` varchar(45) NOT NULL,
  `App_permit_Close` varchar(45) NOT NULL,
  `App_permit_Create` varchar(45) NOT NULL,
  PRIMARY KEY (`App_Acronym`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES ('aaa','test app 3',3,'2022-05-10 00:00:00','2022-05-11 00:00:00','Member','PM','Superadmin','Superadmin','Superadmin','Lead'),('Adm','Admin app',1,'2022-05-10 00:00:00','2022-12-10 00:00:00','Superadmin','Superadmin','Superadmin','Superadmin','Superadmin','Superadmin'),('app','testapp description',1,'2022-10-04 16:00:00','2022-11-04 16:00:00','PM','Member','Member','Lead','Lead','Lead'),('bbb','app test 4',1,'2022-05-10 00:00:00','2022-05-11 00:00:00','Superadmin','Member','Superadmin','Member','Lead','PM');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-12 17:24:08
