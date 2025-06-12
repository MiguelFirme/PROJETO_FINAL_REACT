import { Link } from "react-router-dom";

export default function Inicial() {
    return (
        <>
        <div>
            <h2 className="titulo_h2">Momentum Eventos</h2>
            <p>
                No Momentum Eventos, cada celebração ganha vida. <br />
                Faça de nossos espaços o cenário perfeito para <br />
                criar memórias especiais.
            </p>
        </div>
        <div>
        <Link to="/login">
            <button>Faça sua reserva aqui!</button>
        </Link>
        </div>
        </>
    );
}
