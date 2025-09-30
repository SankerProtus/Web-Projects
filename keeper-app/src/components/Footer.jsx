const today = new Date();
const year = today.getFullYear();

function Footer() {
    return (
        <footer>
            <p>Copyright &copy; {year}</p>
        </footer>
    )
}

export default Footer;