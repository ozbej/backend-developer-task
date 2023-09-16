CREATE TABLE `User` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `username` varchar(255),
  `password` varchar(255)
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
INSERT INTO User VALUES (1, 'Ozbej Golob', 'ozbejgolob', 'test');
INSERT INTO User VALUES (2, 'John Smith', 'jsmith', 'pass');
INSERT INTO User VALUES (3, 'Jane Smith', 'janesmith', 'pass');

/* FOLDER Entity */
INSERT INTO Folder VALUES (1, 'Test folder 1', 1);
INSERT INTO Folder VALUES (2, 'Test folder 2', 1);
