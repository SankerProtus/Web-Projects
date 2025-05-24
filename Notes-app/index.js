document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-note");
  const noteTitle = document.getElementById("note-title");
  const noteContent = document.getElementById("note-text");
  const saveButton = document.getElementById("save-note");
  const noteField = document.querySelector(".note-input");
  const ul = document.getElementById("notes");

  // LOCAL STORAGE
  let storeNotes = JSON.parse(localStorage.getItem("notes")) || [];

//   Load existing notes
  storeNotes.forEach((note) => {
    updateDOM(note);
  });

//   Add notes
  addButton.addEventListener("click", () => {
    addButton.innerText = noteField.classList.contains("visibility")
      ? "╋ Add Note"
      : "Close";
  });

//   Save notes
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    createNotesManager();
  });

  function createNotesManager() {
    if (noteContent.value === "") {
      alert("Please provide the content.");
      softReset();
      return;
    } else if (noteTitle.value === "") {
      alert("Please provide a title for your notes.");
      softReset();
      return;
    }

    const noteObject = {
      id: Date.now(),
      title: noteTitle.value.trim(),
      text: noteContent.value.trim(),
    };

    storeNotes.push(noteObject);
    updateLocalStorage();
    updateDOM(noteObject);
    // Reset form
    hardReset();
  }

  function updateDOM(note) {
    const li = document.createElement("li");
    const contentDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const noteAction = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    // Assign Classes
    li.classList.add("new-note");
    contentDiv.classList.add("note-content");
    h3.classList.add("note-title");
    p.classList.add("note-text");
    noteAction.classList.add("note-actions");
    editButton.classList.add("edit-btn");
    deleteButton.classList.add("delete-btn");

    // Set Content
    h3.innerText = note.title;
    p.innerText = note.text;
    editButton.innerText = "Edit";
    deleteButton.innerText = "Delete";

    contentDiv.append(h3, p);
    noteAction.append(editButton, deleteButton);
    li.append(contentDiv, noteAction);
    ul.appendChild(li);

    editButton.addEventListener("click", () => {
      noteTitle.focus();
      noteTitle.value = note.title;
      noteContent.value = note.text;
      storeNotes = storeNotes.filter((item) => item.id !== note.id);
      updateLocalStorage();
      li.remove();
      noteField.classList.remove("visibility");
      addButton.innerText = "Close";
    });

    deleteButton.addEventListener("click", () => {
      storeNotes = storeNotes.filter((item) => item.id !== note.id);
      updateLocalStorage();
      li.remove();
    });
  }

  function updateLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(storeNotes));
  }

  function softReset() {
    noteTitle.value = "";
    noteContent.value = "";
  }

  function hardReset() {
    softReset();
    noteField.classList.add("visibility");
    addButton.innerText = "╋ Add Note";
  }
});
