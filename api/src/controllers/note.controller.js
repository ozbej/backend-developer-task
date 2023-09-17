const { Note, NoteText, NoteListItem } = require("../models/note.model");

const noteTypeMap = new Map([
  ["text", 1],
  ["list", 2],
]);

const noteVisibilityMap = new Map([
  ["shared", 1],
  ["private", 2],
]);

function filterNotes(notes) {
  const mergedItems = [];
  const mergedItemsMap = {};

  for (const item of notes) {
    if (!mergedItemsMap[item.id]) {
      // If the item with this ID is not already in mergedItems, add it.
      mergedItemsMap[item.id] = mergedItems.length;
      mergedItems.push({ ...item });

      if (item.note_type === "text") {
        delete mergedItems[mergedItemsMap[item.id]].list_items;
      } else if (item.note_type === "list") {
        delete mergedItems[mergedItemsMap[item.id]].body;
        mergedItems[mergedItemsMap[item.id]].list_items = item.list_items
          ? [item.list_items]
          : [];
      }
    } else {
      // If the item with this ID already exists, update the list_items array.
      if (item.note_type === "list" && item.list_items) {
        mergedItems[mergedItemsMap[item.id]].list_items.push(item.list_items);
      }
    }
  }

  return mergedItems;
}

exports.createText = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    if (
      !req.body.name ||
      !req.body.folder_id ||
      !req.body.note_visibility ||
      !req.body.note_type ||
      !req.body.body ||
      Object.keys(req.body).length !== 5
    ) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide all required fields" });
    }

    const newNote = new Note({
      name: req.body.name,
      folder_id: req.body.folder_id,
      note_visibility_id: noteVisibilityMap.get(req.body.note_visibility),
      note_type_id: noteTypeMap.get(req.body.note_type),
    });
    Note.create(newNote, function (err, noteId) {
      if (err) res.send(err);
      else {
        const newNoteText = new NoteText({
          body: req.body.body,
          note_id: noteId,
        });
        NoteText.create(newNoteText, function (err, noteTextId) {
          if (err) res.send(err);
          else res.json({ id: noteId });
        });
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.createList = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    if (
      !req.body.name ||
      !req.body.folder_id ||
      !req.body.note_visibility ||
      !req.body.note_type ||
      !req.body.list_items ||
      Object.keys(req.body).length !== 5
    ) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide all required fields" });
    }

    const newNote = new Note({
      name: req.body.name,
      folder_id: req.body.folder_id,
      note_visibility_id: noteVisibilityMap.get(req.body.note_visibility),
      note_type_id: noteTypeMap.get(req.body.note_type),
    });
    Note.create(newNote, function (err, noteId) {
      if (err) res.send(err);
      else {
        req.body.list_items.forEach((item) => {
          const newNoteText = new NoteListItem({
            body: item,
            note_id: noteId,
          });
          NoteListItem.create(newNoteText, function (err, noteListItemId) {
            if (err) return res.send(err);
          });
        });
        res.json({ id: noteId });
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.findAll = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    let sortString = "";
    let filterString = "";

    // Sort by visibility
    if (req.query.sortVisibility) {
      if (
        req.query.sortVisibility !== "ASC" &&
        req.query.sortVisibility !== "DESC"
      )
        return res.status(400).json({
          error: true,
          message: "Invalid sortVisibility parameter value",
        });

      sortString = `note_visibility ${req.query.sortVisibility}`;
    }

    // Sort by heading
    if (req.query.sortHeading) {
      if (req.query.sortHeading !== "ASC" && req.query.sortHeading !== "DESC")
        return res.status(400).json({
          error: true,
          message: "Invalid sortHeading parameter value",
        });

      if (sortString.length !== 0) sortString += ",";
      sortString += `name ${req.query.sortHeading}`;
    }

    // Filter by folder_id
    if (req.query.filterFolder) {
      if (isNaN(req.query.filterFolder))
        return res.status(400).json({
          error: true,
          message: "filterFolder value must be a number",
        });
      filterString += `folder_id = ${req.query.filterFolder}`;
    }

    // Filter by visibility
    if (req.query.filterVisibility) {
      if (!noteVisibilityMap.has(req.query.filterVisibility))
        return res.status(400).json({
          error: true,
          message: "Invalid filterVisibility parameter value",
        });

      if (filterString.length !== 0) filterString += " AND ";
      filterString += `nv.visibility = '${req.query.filterVisibility}'`;
    }

    // Filter by note text
    if (req.query.filterNoteText) {
      if (filterString.length !== 0) filterString += " AND ";
      filterString += `(ntext.body LIKE '%${req.query.filterNoteText}%' OR nl.body LIKE '%${req.query.filterNoteText}%')`;
    }

    Note.findAll(
      sortString.length > 0 ? sortString : undefined,
      filterString.length > 0 ? filterString : undefined,
      function (err, notes) {
        if (err) res.send(err);
        else {
          res.send(filterNotes(notes));
        }
      }
    );
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.update = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    if (
      !req.body.name ||
      !req.body.folder_id ||
      !req.body.note_visibility ||
      !req.body.note_type ||
      Object.keys(req.body).length !== 5
    )
      return res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });

    const newNote = new Note({
      name: req.body.name,
      folder_id: req.body.folder_id,
      note_visibility_id: noteVisibilityMap.get(req.body.note_visibility),
      note_type_id: noteTypeMap.get(req.body.note_type),
    });
    Note.update(req.params.id, newNote, function (err, note) {
      if (err) res.send(err);
      else res.json({ error: false, message: "Note successfully updated" });
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.delete = function (req, res) {
  try {
    Note.delete(req.params.id, function (err, note) {
      if (err) res.send(err);
      else res.json({ error: false, message: "Note successfully deleted" });
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
