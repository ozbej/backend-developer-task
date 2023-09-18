"use strict";
let connection = require("../../config/db.config");

const Note = function (note) {
  this.id = note.id;
  this.name = note.name;
  this.folder_id = note.folder_id;
  this.note_visibility_id = note.note_visibility_id;
  this.note_type_id = note.note_type_id;
};

const NoteText = function (noteText) {
  this.id = noteText.id;
  this.body = noteText.body;
  this.note_id = noteText.note_id;
};

const NoteListItem = function (noteListItem) {
  this.id = noteListItem.id;
  this.body = noteListItem.body;
  this.note_id = noteListItem.note_id;
};

Note.create = function (newNote, result) {
  connection.query("INSERT INTO Note SET ?", newNote, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

NoteText.create = function (newNoteText, result) {
  connection.query(
    "INSERT INTO NoteText SET ?",
    newNoteText,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    }
  );
};

NoteListItem.create = function (newNoteListItem, result) {
  connection.query(
    "INSERT INTO NoteListItem SET ?",
    newNoteListItem,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    }
  );
};

Note.findAll = function (sort, filter, result) {
  const query = `
    SELECT
        n.id AS id,
        n.name AS name,
        n.folder_id AS folder_id,
        f.user_id AS user_id,
        nv.visibility AS note_visibility,
        ntype.type AS note_type,
        ntext.body AS body,
        nl.body AS list_items
    FROM
        Note n
    LEFT JOIN
        NoteText ntext ON n.id = ntext.note_id
    LEFT JOIN
        NoteListItem nl ON n.id = nl.note_id
    LEFT JOIN
        NoteVisibility nv ON n.note_visibility_id = nv.id
    LEFT JOIN
        NoteType ntype ON n.note_type_id = ntype.id
    LEFT JOIN
        Folder f ON n.folder_id = f.id
    ${filter ? `WHERE ${filter}` : ""}
    ${sort ? `ORDER BY ${sort}` : ""};`;
  console.log(query);
  connection.query(query, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

NoteText.findAll = function (result) {
  connection.query("SELECT * FROM NoteText", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

NoteListItem.findAll = function (result) {
  connection.query("SELECT * FROM NoteListItem", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Note.update = function (id, note, result) {
  connection.query(
    "UPDATE Note SET name=?,folder_id=?,note_visibility_id=?,note_type_id=? WHERE id = ?",
    [note.name, note.folder_id, note.note_visibility_id, note.note_type_id, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

NoteText.update = function (id, text, result) {
  connection.query(
    "UPDATE NoteText SET body=?,note_id=? WHERE id = ?",
    [text.body, text.note_id, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

NoteListItem.update = function (id, listItem, result) {
  connection.query(
    "UPDATE NoteListItem SET body=?,note_id=? WHERE id = ?",
    [listItem.body, listItem.note_id, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Note.delete = function (id, result) {
  connection.query("DELETE FROM Note WHERE id = ?", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = { Note, NoteText, NoteListItem };
