CREATE TABLE `User` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `username` varchar(255) UNIQUE,
  `password` varchar(255)
);

CREATE TABLE `Folder` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `user_id` integer
);

CREATE TABLE `Note` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `folder_id` integer,
  `note_visibility_id` integer,
  `note_type_id` integer
);

CREATE TABLE `NoteText` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `body` varchar(255),
  `note_id` integer UNIQUE
);

CREATE TABLE `NoteListItem` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `body` varchar(255),
  `note_id` integer
);

CREATE TABLE `NoteVisibility` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `visibility` varchar(255)
);

CREATE TABLE `NoteType` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(255)
);

ALTER TABLE `Folder` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Note` ADD FOREIGN KEY (`folder_id`) REFERENCES `Folder` (`id`);

ALTER TABLE `NoteText` ADD FOREIGN KEY (`note_id`) REFERENCES `Note` (`id`) ON DELETE CASCADE;

ALTER TABLE `NoteListItem` ADD FOREIGN KEY (`note_id`) REFERENCES `Note` (`id`) ON DELETE CASCADE;

ALTER TABLE `Note` ADD FOREIGN KEY (`note_type_id`) REFERENCES `NoteType` (`id`);

ALTER TABLE `Note` ADD FOREIGN KEY (`note_visibility_id`) REFERENCES `NoteVisibility` (`id`);

/* ------------------------------------------------------------------------------------------------ */
/* ----- SEEDS ----- */

/* USER Entity */
INSERT INTO User VALUES (1, 'Ozbej Golob', 'ozbejgolob', '$2a$10$JB/TiGSI1gTVuviR6Rz3Xe8aIcxpOdw5yl/irfljKjFwWxLPXiZCm');
INSERT INTO User VALUES (2, 'Bran Stark', 'admin', '$2a$10$VSWcoMTx0s1b5pjs3Ja.GusVws4ESB90Jvj489jCFFR9uxtvgcUzW');
INSERT INTO User VALUES (3, 'Sansa Stark', 'dev', '$2a$10$qdxybk7LO9fBmll86xL8p.5AVwqvmbMG9dfbyhFNGVB7AtE.OyHJ.');
INSERT INTO User VALUES (4, 'James Smith', 'jsmith', '$2a$10$IfIyTgEJhUn.bzV5f3Expu3gO8P/TchiuG314Y18.BvebsZwGEfUe');

/* FOLDER Entity */
INSERT INTO Folder VALUES (1, 'College stuff', 1);
INSERT INTO Folder VALUES (2, 'Job stuff', 1);
INSERT INTO Folder VALUES (3, 'Winterfell', 2);
INSERT INTO Folder VALUES (4, 'Horses', 2);
INSERT INTO Folder VALUES (5, 'Joffrey stuff', 3);
INSERT INTO Folder VALUES (6, 'Dresses', 3);
INSERT INTO Folder VALUES (7, 'Vacation notes', 4);
INSERT INTO Folder VALUES (8, 'General notes', 4);

/* NOTE TYPE Entity */
INSERT INTO NoteType VALUES (1, 'text');
INSERT INTO NoteType VALUES (2, 'list');

/* NOTE VISIBILITY Entity */
INSERT INTO NoteVisibility VALUES (1, 'shared');
INSERT INTO NoteVisibility VALUES (2, 'private');

/* NOTE Entity */
INSERT INTO Note VALUES (1, "HPC", 1, 1, 1);
INSERT INTO Note VALUES (2, "Masters thesis", 1, 2, 1);
INSERT INTO Note VALUES (3, "Masters thesis TODO", 1, 2, 2);

/* NOTE TEXT Entity */
INSERT INTO NoteText VALUES (1, "I have to do stuff for HPC", 1);
INSERT INTO NoteText VALUES (2, "According to my mentor, I still have a lot to do", 2);

/* NOTE LIST ITEM Entity */
INSERT INTO NoteListItem VALUES (1, "Research similar works", 3);
INSERT INTO NoteListItem VALUES (2, "Research relevant technologies", 3);
INSERT INTO NoteListItem VALUES (3, "Start writing the application", 3);


