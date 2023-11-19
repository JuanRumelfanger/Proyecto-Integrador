-- MySQL Script generated by MySQL Workbench
-- Thu Nov  9 16:02:46 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema alpaca-db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `alpaca-db` ;

-- -----------------------------------------------------
-- Schema alpaca-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `alpaca-db` DEFAULT CHARACTER SET utf8mb3 ;
USE `alpaca-db` ;

-- -----------------------------------------------------
-- Table `alpaca-db`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`genre` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`video_game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`video_game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `price` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `release_date` DATE NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`genre_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`genre_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `genre_id` INT NOT NULL,
  `video_game_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `genre_id`
    FOREIGN KEY (`genre_id`)
    REFERENCES `alpaca-db`.`genre` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `video_game_id3`
    FOREIGN KEY (`video_game_id`)
    REFERENCES `alpaca-db`.`video_game` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`platforms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`platforms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `url_logo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `display_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `idx_users_email` (`email` ASC) 
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`user_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_roles_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `alpaca-db`.`roles` (`id`),
  CONSTRAINT `fk_users_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `alpaca-db`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`users_game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`users_game` (
  `id` VARCHAR(45) NOT NULL,
  `users_id` INT NOT NULL,
  `video_game_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_users_has_video_game_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `alpaca-db`.`users` (`id`),
  CONSTRAINT `fk_users_has_video_game_video_game1`
    FOREIGN KEY (`video_game_id`)
    REFERENCES `alpaca-db`.`video_game` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`video_game_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`video_game_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `video_game_id` INT NOT NULL,
  `description` TEXT NOT NULL,
  `images` VARCHAR(255) NOT NULL,
  `size` VARCHAR(255) NOT NULL,
  `requiments` JSON NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_video_games`
    FOREIGN KEY (`video_game_id`)
    REFERENCES `alpaca-db`.`video_game` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `alpaca-db`.`video_game_platform`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alpaca-db`.`video_game_platform` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `video_game_id` INT NOT NULL,
  `platform_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `platform_id`
    FOREIGN KEY (`platform_id`)
    REFERENCES `alpaca-db`.`platforms` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `video_game_id5`
    FOREIGN KEY (`video_game_id`)
    REFERENCES `alpaca-db`.`video_game` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
