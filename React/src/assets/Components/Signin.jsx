import { Link } from 'react-router-dom';
 
export default function Signin() {
    
    
    return (
        <>
        <div>
            <h2 className="titulo_h2">Momentum Eventos</h2>
            <p>
             teste tela de login
            </p>
        </div>
        <div>
            <Link to="/login"><button>Cadastrar</button></Link>
        </div>
        <div>
        <Link to="/login">
            Já tem uma conta?
        </Link>            
        </div>
        </>
    );
}