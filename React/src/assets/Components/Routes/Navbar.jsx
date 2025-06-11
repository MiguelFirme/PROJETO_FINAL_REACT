import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <span style={{padding: '8px'}}><Link to={'/'}>Inicial</Link></span>
            <span style={{padding: '8px'}}><Link to={'Login'}>Entrar</Link></span>

        </div>
    )
}