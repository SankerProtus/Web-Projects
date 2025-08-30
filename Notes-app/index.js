document.addEventListener("DOMContentLoaded", () => {
  // Constants
  const STORAGE_KEY = "notes";
  const MAX_TITLE_LENGTH = 100;
  const MAX_CONTENT_LENGTH = 5000;
  
  // DOM Elements
  const addButton = document.getElementById("add-note");
  const noteTitle = document.getElementById("note-title");
  const noteContent = document.getElementById("note-text");
  const saveButton = document.getElementById("save-note");
  const cancelButton = document.getElementById("cancel-note");
  const noteField = document.querySelector(".note-input");
  const ul = document.getElementById("notes");
  const searchInput = document.getElementById("search-input");
  const titleCount = document.getElementById("title-count");
  const contentCount = document.getElementById("content-count");

  // State
  let storeNotes = loadNotesFromStorage();
  let editingNoteId = null;

  // Initialize app
  init();

  function init() {
    loadExistingNotes();
    setupEventListeners();
  }

  function setupEventListeners() {
    addButton.addEventListener("click", handleAddButtonClick);
    saveButton.addEventListener("click", handleSaveButtonClick);
    
    // Cancel button
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        noteField.classList.remove("visibility");
        clearForm();
        addButton.innerHTML = '<span class="icon">╋</span> Add Note';
      });
    }
    
    if (searchInput) {
      searchInput.addEventListener("input", debounce(handleSearch, 300));
    }
    
    // Keyboard shortcuts
    document.addEventListener("keydown", handleKeyboardShortcuts);
    
    // Auto-save functionality
    noteTitle.addEventListener("input", debounce(handleAutoSave, 1000));
    noteContent.addEventListener("input", debounce(handleAutoSave, 1000));
    
    // Character counting
    noteTitle.addEventListener("input", updateCharacterCount);
    noteContent.addEventListener("input", updateCharacterCount);
  }

  // LOCAL STORAGE with error handling
  function loadNotesFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading notes from storage:", error);
      showNotification("Error loading saved notes", "error");
      return [];
    }
  }

  function loadExistingNotes() {
    ul.innerHTML = "";
    const filteredNotes = searchInput ? 
      storeNotes.filter(note => matchesSearch(note, searchInput.value)) : 
      storeNotes;
    
    if (filteredNotes.length === 0) {
      showEmptyState();
    } else {
      filteredNotes.forEach(note => updateDOM(note));
    }
  }

  function handleAddButtonClick() {
    noteField.classList.toggle("visibility");
    addButton.innerHTML = noteField.classList.contains("visibility")
      ? '<span class="icon">╋</span> Add Note'
      : '<span class="icon">✕</span> Close';
    
    if (!noteField.classList.contains("visibility")) {
      noteTitle.focus();
      clearForm();
    }
  }

  function handleSaveButtonClick(e) {
    e.preventDefault();
    
    if (editingNoteId) {
      updateExistingNote();
    } else {
      createNewNote();
    }
  }

  function handleSearch(e) {
    loadExistingNotes();
  }

  function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (!noteField.classList.contains("visibility")) {
        handleSaveButtonClick(e);
      }
    }
    
    // Escape to close form
    if (e.key === 'Escape' && !noteField.classList.contains("visibility")) {
      handleAddButtonClick();
    }
  }

  function handleAutoSave() {
    if (editingNoteId && validateInput(false)) {
      // Auto-save logic can be implemented here
      console.log("Auto-saving...");
    }
  }

  function createNewNote() {
    if (!validateInput()) return;

    const noteObject = {
      id: Date.now(),
      title: sanitizeInput(noteTitle.value.trim()),
      text: sanitizeInput(noteContent.value.trim()),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    storeNotes.unshift(noteObject); // Add to beginning
    updateLocalStorage();
    updateDOM(noteObject);
    clearForm();
    closeForm();
    showNotification("Note created successfully!", "success");
  }

  function updateExistingNote() {
    if (!validateInput()) return;

    const noteIndex = storeNotes.findIndex(note => note.id === editingNoteId);
    if (noteIndex !== -1) {
      storeNotes[noteIndex] = {
        ...storeNotes[noteIndex],
        title: sanitizeInput(noteTitle.value.trim()),
        text: sanitizeInput(noteContent.value.trim()),
        lastModified: new Date().toISOString()
      };
      
      updateLocalStorage();
      loadExistingNotes();
      clearForm();
      closeForm();
      editingNoteId = null;
      showNotification("Note updated successfully!", "success");
    }
  }

  function validateInput(showAlert = true) {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (!content) {
      if (showAlert) showNotification("Please provide the content.", "error");
      noteContent.focus();
      return false;
    }
    
    if (!title) {
      if (showAlert) showNotification("Please provide a title for your note.", "error");
      noteTitle.focus();
      return false;
    }

    if (title.length > MAX_TITLE_LENGTH) {
      if (showAlert) showNotification(`Title must be less than ${MAX_TITLE_LENGTH} characters.`, "error");
      noteTitle.focus();
      return false;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      if (showAlert) showNotification(`Content must be less than ${MAX_CONTENT_LENGTH} characters.`, "error");
      noteContent.focus();
      return false;
    }

    return true;
  }

  function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function updateDOM(note) {
    const li = document.createElement("li");
    const contentDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const timestampDiv = document.createElement("div");
    const noteAction = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    // Assign Classes
    li.classList.add("new-note");
    li.setAttribute("data-note-id", note.id);
    contentDiv.classList.add("note-content");
    h3.classList.add("note-title");
    p.classList.add("note-text");
    timestampDiv.classList.add("note-timestamp");
    noteAction.classList.add("note-actions");
    editButton.classList.add("edit-btn", "btn");
    deleteButton.classList.add("delete-btn", "btn");

    // Set Content
    h3.innerHTML = note.title;
    p.innerHTML = note.text.replace(/\n/g, '<br>');
    
    // Format timestamps
    const createdDate = new Date(note.createdAt).toLocaleDateString();
    const modifiedDate = note.lastModified ? new Date(note.lastModified).toLocaleDateString() : createdDate;
    timestampDiv.innerHTML = `
      <small>Created: ${createdDate}</small>
      ${note.lastModified && note.lastModified !== note.createdAt ? 
        `<small>Modified: ${modifiedDate}</small>` : ''}
    `;
    
    editButton.innerHTML = '<i class="icon">✏️</i> Edit';
    deleteButton.innerHTML = '<i class="icon">🗑️</i> Delete';

    contentDiv.append(h3, p, timestampDiv);
    noteAction.append(editButton, deleteButton);
    li.append(contentDiv, noteAction);
    ul.appendChild(li);

    // Event listeners with improved UX
    editButton.addEventListener("click", () => handleEditNote(note));
    deleteButton.addEventListener("click", () => handleDeleteNote(note, li));
  }

  function handleEditNote(note) {
    editingNoteId = note.id;
    noteTitle.value = note.title;
    noteContent.value = note.text;
    noteField.classList.remove("visibility");
    addButton.innerHTML = '<span class="icon">✕</span> Close';
    noteTitle.focus();
    saveButton.textContent = "Update Note";
  }

  function handleDeleteNote(note, noteElement) {
    if (showConfirmDialog("Are you sure you want to delete this note?")) {
      storeNotes = storeNotes.filter((item) => item.id !== note.id);
      updateLocalStorage();
      noteElement.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => {
        noteElement.remove();
        if (storeNotes.length === 0) {
          showEmptyState();
        }
      }, 300);
      showNotification("Note deleted successfully!", "success");
    }
  }

  function updateLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storeNotes));
    } catch (error) {
      console.error("Error saving notes to storage:", error);
      showNotification("Error saving notes. Storage might be full.", "error");
    }
  }

  function clearForm() {
    noteTitle.value = "";
    noteContent.value = "";
    saveButton.textContent = "Save Note";
    editingNoteId = null;
  }

  function closeForm() {
    noteField.classList.add("visibility");
    addButton.innerHTML = '<span class="icon">╋</span> Add Note';
  }

  function showEmptyState() {
    ul.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>No notes yet</h3>
        <p>Create your first note to get started!</p>
      </div>
    `;
  }

  function matchesSearch(note, searchTerm) {
    const term = searchTerm.toLowerCase();
    return note.title.toLowerCase().includes(term) || 
           note.text.toLowerCase().includes(term);
  }

  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement("div");
    notification.classList.add("notification", `notification-${type}`);
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.remove()">✕</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  function showConfirmDialog(message) {
    // Simple implementation - can be enhanced with custom modal
    return confirm(message);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function updateCharacterCount() {
    if (titleCount) {
      titleCount.textContent = `${noteTitle.value.length}/${MAX_TITLE_LENGTH}`;
    }
    if (contentCount) {
      contentCount.textContent = `${noteContent.value.length}/${MAX_CONTENT_LENGTH}`;
    }
  }
});
