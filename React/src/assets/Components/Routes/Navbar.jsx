import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <span style={{padding: '8px'}}><Link to={'/'}>Inicial</Link></span>
            <span style={{padding: '8px'}}><Link to={'login'}>Entrar</Link></span>
            <span style={{padding: '8px'}}><Link to={'reserva'}>Reservar</Link></span>
            <span style={{padding: '8px'}}><Link to={'pagamento'}>Pagamento</Link></span>
            <span style={{padding: '8px'}}><Link to={'carrinho'}>Minhas Reservas</Link></span>
        </div>
    )
}