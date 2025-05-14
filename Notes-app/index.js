document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-note');
    const noteField = document.querySelector('.note-input');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const saveButton = document.getElementById('save-note');
    const ul = document.getElementById('notes');

    // Initialize notes from localStorage
    let noteList = JSON.parse(localStorage.getItem('notes')) || [];

    // Load existing notes on page load
    noteList.forEach(note => addNoteDOM(note));

    // Toggle form visibility
    addButton.addEventListener('click', () => {
        noteField.classList.toggle('visibility');
        addButton.textContent = noteField.classList.contains('visibility') ? 
            '╋ Add Note' : 'Close';
    });

    // Save new note
    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        createNoteManager();
    });

    function createNoteManager() {
        if (noteTitle.value.trim() === '' || noteText.value.trim() === '') {
            alert('Please enter both title and content');
            return;
        }

        const note = {
            id: Date.now().toString(),
            title: noteTitle.value.trim(),
            content: noteText.value.trim()
        };

        noteList.push(note);
        updateLocalStorage();
        addNoteDOM(note);

        // Reset form
        noteTitle.value = '';
        noteText.value = '';
        noteField.classList.add('visibility');
        addButton.textContent = '╋ Add Note';
    }

    function addNoteDOM(note) {
        const listItem = document.createElement('li');
        const noteContentDiv = document.createElement('div');
        const noteTitleh3 = document.createElement('h3');
        const text = document.createElement('p');
        const noteActionDiv = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        // Assign Classes
        noteContentDiv.classList.add('note-content');
        noteTitleh3.classList.add('note-title');
        text.classList.add('note-text');
        noteActionDiv.classList.add('note-actions');
        editBtn.classList.add('edit-btn');
        deleteBtn.classList.add('delete-btn');

        // Set content
        noteTitleh3.textContent = note.title;
        text.textContent = note.content;

        // Set button text
        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        // Add event listeners
        deleteBtn.addEventListener('click', () => {
            noteList = noteList.filter(item => item.id !== note.id);
            updateLocalStorage();
            listItem.remove();
        });

        editBtn.addEventListener('click', () => {
            noteTitle.value = note.title;
            noteText.value = note.content;
            noteList = noteList.filter(item => item.id !== note.id);
            updateLocalStorage();
            listItem.remove();
            noteField.classList.remove('visibility');
            addButton.textContent = 'Close';
        });

        // Build DOM structure
        noteContentDiv.append(noteTitleh3, text);
        noteActionDiv.append(editBtn, deleteBtn);
        listItem.append(noteContentDiv, noteActionDiv);
        ul.appendChild(listItem);
    }

    function updateLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(noteList));
    }
});