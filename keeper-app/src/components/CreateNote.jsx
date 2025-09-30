import { useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";

export default function CreateNote({
  submitNote,
  currentNote,
  handleChange,
  isExpanded,
  setIsExpanded,
}) {
  const titleInputRef = useRef(null);

  // Focus on title input when form expands
  useEffect(() => {
    if (isExpanded && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div>
      <form onSubmit={submitNote}>
        {isExpanded && (
          <input
            ref={titleInputRef}
            name="title"
            placeholder="Title"
            value={currentNote.title}
            onChange={handleChange}
          />
        )}

        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          value={currentNote.content}
          onChange={handleChange}
          onClick={() => setIsExpanded(true)}
        />
        <Zoom in={isExpanded}>
          <button type="submit">
            <AddIcon />
          </button>
        </Zoom>
      </form>
    </div>
  );
}
