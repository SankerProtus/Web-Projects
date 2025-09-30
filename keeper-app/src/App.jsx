import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import CreateNote from "./components/CreateNote";
import Footer from "./components/Footer";
import Note from "./components/Note";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef(null);

  // Function to start/restart the 2-minute timer
  function startAutoCollapseTimer() {
    // Clear existing timer if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Start new timer for 2 minutes (120000 milliseconds)
    timerRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 120000); // 2 minutes
  }

  // Function to clear the timer
  function clearAutoCollapseTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  // Custom setIsExpanded function that manages the timer
  function handleSetIsExpanded(value) {
    setIsExpanded(value);
    
    if (value === true) {
      startAutoCollapseTimer();
    } else {
      clearAutoCollapseTimer();
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCurrentNote((prev) => ({ ...prev, [name]: value }));
    
    // Reset timer on user activity if form is expanded
    if (isExpanded) {
      startAutoCollapseTimer();
    }
  }

  function submitNote(e) {
    e.preventDefault();
    if (currentNote.title.trim() === "" && currentNote.content.trim() === "")
      return;

    setNotes((prev) => [...prev, { id: uuidv4(), ...currentNote }]);

    // Reset Form
    setCurrentNote({ title: "", content: "" });
    
    // Restart the auto-collapse timer after adding a note
    if (isExpanded) {
      startAutoCollapseTimer();
    }
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      clearAutoCollapseTimer();
    };
  }, []);

  function createNote(note) {
    return (
      <Note
        key={note.id}
        title={note.title}
        content={note.content}
        deleteNote={() => deleteNote(note.id)}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <Header />
        <CreateNote
          currentNote={currentNote}
          handleChange={handleChange}
          submitNote={submitNote}
          isExpanded={isExpanded}
          setIsExpanded={handleSetIsExpanded}
        />
        <div className="notes-container">{notes.map(createNote)}</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
