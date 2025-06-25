import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Reserve.com</span>
        <div className="navItems">
          <Link to="/login" className="navLink">Entrar</Link>
          <Link to="/reserva" className="navLink">Reservar</Link>
          <Link to="/pagamento" className="navLink">Pagamento</Link>
          <Link to="/carrinho" className="navLink">Minhas Reservas</Link>
          <Link to="/perfil" className="navLink">Perfil</Link>
        </div>
      </div>
    </div>
  );
}