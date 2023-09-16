CREATE TABLE `User` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
  UNIQUE (username)
);

CREATE TABLE `Folder` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `user_id` integer
);

CREATE TABLE `Note` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `folder_id` integer,
  `note_visibility_id` integer,
  `note_type_id` integer
);

CREATE TABLE `NoteText` (
  `id` integer PRIMARY KEY,
  `body` varchar(255),
  `note_id` integer
);

CREATE TABLE `NoteList` (
  `id` integer PRIMARY KEY,
  `note_id` integer
);

CREATE TABLE `ListItem` (
  `id` integer PRIMARY KEY,
  `body` varchar(255),
  `note_list_id` integer
);

CREATE TABLE `NoteVisibility` (
  `id` integer PRIMARY KEY,
  `visibility` varchar(255)
);

CREATE TABLE `NoteType` (
  `id` integer PRIMARY KEY,
  `type` varchar(255)
);

ALTER TABLE `Folder` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Note` ADD FOREIGN KEY (`folder_id`) REFERENCES `Folder` (`id`);

ALTER TABLE `NoteText` ADD FOREIGN KEY (`note_id`) REFERENCES `Note` (`id`);

ALTER TABLE `NoteList` ADD FOREIGN KEY (`note_id`) REFERENCES `Note` (`id`);

ALTER TABLE `ListItem` ADD FOREIGN KEY (`note_list_id`) REFERENCES `NoteList` (`id`);

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
INSERT INTO Folder VALUES (1, 'Test folder 1', 1);
INSERT INTO Folder VALUES (2, 'Test folder 2', 1);
INSERT INTO Folder VALUES (3, 'Test folder 3', 2);
