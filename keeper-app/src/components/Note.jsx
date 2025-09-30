import DeleteIcon from "@mui/icons-material/Delete";
import Zoom from "@mui/material/Zoom";

function Note({ title, content, deleteNote }) {
  return (
    <div className="note">
      <h1 className="note-title">{title}</h1>
      <p className="note-content">{content}</p>
      <div>
        <Zoom in={true}>
          <button className="delete-btn" onClick={deleteNote}>
            <DeleteIcon />
          </button>
        </Zoom>
      </div>
    </div>
  );
}

export default Note;
