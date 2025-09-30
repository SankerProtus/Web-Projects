import NoteAddIcon from '@mui/icons-material/NoteAdd';

function Header() {
    return (
        <header>
            <NoteAddIcon 
                sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '3rem',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
                }}
            />
            <h1>Keeper App</h1>
        </header>
    )
}

export default Header;