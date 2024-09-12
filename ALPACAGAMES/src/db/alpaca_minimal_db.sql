CREATE DATABASE  IF NOT EXISTS `alpaca-db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `alpaca-db`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: alpaca-db
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (5,'Carreras'),(6,'Disparos'),(7,'Pelea'),(8,'Deportes');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_list`
--

DROP TABLE IF EXISTS `genre_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genre_id` int NOT NULL,
  `video_game_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_genre_has_video_game_video_game1_idx` (`video_game_id`),
  KEY `fk_genre_has_video_game_genre1_idx` (`genre_id`),
  CONSTRAINT `genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `video_game_id3` FOREIGN KEY (`video_game_id`) REFERENCES `video_game` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_list`
--

LOCK TABLES `genre_list` WRITE;
/*!40000 ALTER TABLE `genre_list` DISABLE KEYS */;
INSERT INTO `genre_list` VALUES (7,5,11),(8,6,12),(9,6,13),(10,7,14),(11,8,15);
/*!40000 ALTER TABLE `genre_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platforms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (6,'PlayStation 4'),(7,'Xbox One'),(8,'PC');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `user_id` int NOT NUll,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_id_idx` (`user_id`),
  KEY `fk_roles_id_idx` (`role_id`),
  CONSTRAINT `fk_roles_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `country` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `registration_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_game`
--

DROP TABLE IF EXISTS `users_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `video_game_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_has_video_game_video_game1_idx` (`video_game_id`),
  KEY `fk_users_has_video_game_users1_idx` (`users_id`),
  CONSTRAINT `fk_users_has_video_game_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_users_has_video_game_video_game1` FOREIGN KEY (`video_game_id`) REFERENCES `video_game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_game`
--

LOCK TABLES `users_game` WRITE;
/*!40000 ALTER TABLE `users_game` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_game`
--

DROP TABLE IF EXISTS `video_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `release_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_game`
--

LOCK TABLES `video_game` WRITE;
/*!40000 ALTER TABLE `video_game` DISABLE KEYS */;
INSERT INTO `video_game` VALUES (11,1000.00,'Mario Kart','2023-11-01','2023-11-13 18:12:11','2023-11-13 18:12:11'),(12,100.00,'Valorant','2023-11-01','2023-11-13 18:15:24','2023-11-13 18:15:24'),(13,1050.00,'Overwatch','2023-09-06','2023-11-13 18:18:42','2023-11-13 18:18:42'),(14,1500.00,'X-Men','2023-08-02','2023-11-13 18:21:41','2023-11-13 18:21:41'),(15,100.00,'Street Fighter','2023-08-02','2023-11-18 03:04:20','2023-11-18 03:04:20');
/*!40000 ALTER TABLE `video_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_game_details`
--

DROP TABLE IF EXISTS `video_game_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_game_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_game_id` int NOT NULL,
  `description` text NOT NULL,
  `images` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `requiments` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_video_games_idx` (`video_game_id`),
  CONSTRAINT `fk_video_games` FOREIGN KEY (`video_game_id`) REFERENCES `video_game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_game_details`
--

LOCK TABLES `video_game_details` WRITE;
/*!40000 ALTER TABLE `video_game_details` DISABLE KEYS */;
INSERT INTO `video_game_details` VALUES (5,11,'Es un juego de carreras','images-1699899130976.png','28GB','{\"os\": \"Windows\", \"storage\": \"30GB\"}'),(6,12,'Riot Games entertaiment','images-1699899324794.png','24GB','{\"os\": \"Windows\", \"storage\": \"30GB\"}'),(7,13,'Excelente juego frenetico de disparos','images-1699899522793.png','30GB','{\"os\": \"Windows\", \"storage\": \"28GB\"}'),(8,14,'Juego de mutantes xD','images-1699899701118.png','150GB','{\"os\": \"Windows\", \"storage\": \"100GB\"}'),(9,15,'Juego de peleas legendario','images-1700276660815.png','150GB','{\"os\": \"Windows\", \"storage\": \"30GB\"}');
/*!40000 ALTER TABLE `video_game_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_game_platform`
--

DROP TABLE IF EXISTS `video_game_platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_game_platform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_game_id` int NOT NULL,
  `platform_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_platform_idx` (`platform_id`),
  KEY `id_product_idx` (`video_game_id`),
  CONSTRAINT `platform_id` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `video_game_id5` FOREIGN KEY (`video_game_id`) REFERENCES `video_game` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_game_platform`
--

LOCK TABLES `video_game_platform` WRITE;
/*!40000 ALTER TABLE `video_game_platform` DISABLE KEYS */;
INSERT INTO `video_game_platform` VALUES (20,11,6),(21,11,7),(22,12,6),(23,12,8),(24,13,6),(25,13,7),(26,13,8),(27,14,6),(28,14,7),(29,14,8),(30,15,6),(31,15,8);
/*!40000 ALTER TABLE `video_game_platform` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-25 20:58:36