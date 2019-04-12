CREATE DATABASE task_tracker;
USE task_tracker;

CREATE TABLE tasks
(
	id int NOT NULL AUTO_INCREMENT,
	task_date varchar(10) NOT NULL,
	task_minutes int NOT NULL,
    task_category varchar(255) NOT NULL,
    task_goal int NOT NULL,
	PRIMARY KEY (id)
);
