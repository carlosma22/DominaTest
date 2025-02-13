CREATE DATABASE IF NOT EXISTS Domina;

USE Domina;

CREATE TABLE Users (
	id INT NOT NULL AUTO_INCREMENT,
	document VARCHAR(20) NOT NULL,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	email VARCHAR(30) NOT NULL,
	password VARCHAR(100) NOT NULL,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt DATETIME NULL,
	CONSTRAINT Users_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;
CREATE UNIQUE INDEX UsersDocument_IDX USING BTREE ON Users (document);
CREATE UNIQUE INDEX UsersEmail_IDX USING BTREE ON Users (email);


CREATE TABLE Status (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt DATETIME NULL,
	CONSTRAINT Status_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;


CREATE TABLE UserTasks (
	id INT NOT NULL AUTO_INCREMENT,
	task VARCHAR(50) NOT NULL,
	userId INT NOT NULL,	
	statusId INT NOT NULL,
	description TEXT,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt DATETIME NULL,
	CONSTRAINT UserTasks_PK PRIMARY KEY (id),
	CONSTRAINT UserTasksUserId_FK FOREIGN KEY (userId) REFERENCES Users (id),
	CONSTRAINT UserTasksStatusId_FK FOREIGN KEY (statusId) REFERENCES Status (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;

INSERT INTO Status (name) VALUES ('PENDING'), ('IN PROGRESS'), ('COMPLETED'), ('CANCELED');