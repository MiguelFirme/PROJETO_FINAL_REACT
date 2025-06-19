import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
export default function Signin() {

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleSingin = async (e) => {
        e.preventDefault();
        setErro("");
        try {
            const res = await fetch(`http://localhost:3001/users?name=${nome}`);
            const users = await res.json();
            if (users.length > 0) {
                alert("Usuário já cadastrado!");
            } else {
                await fetch('http://localhost:3001/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Nome: nome, Senha: senha })
                });
            }
        } catch {
            setErro("Erro ao conectar com o servidor.");
        }
    }
    
    
    return (
        <>
        <div>
            <h2 className="titulo_h2">Momentum Eventos</h2>
            <p>
             teste tela de login
            </p>
        </div>
        <form onSubmit={handleSingin}>
            <input
                type="text"
                placeholder="Digite seu Nome de Usuário"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
            /> <br />
            <input
                type="password"
                placeholder="Digite sua Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
            />
            <button type="submit">Cadastrar</button>
            {erro && <p style={{color: 'red'}}>{erro}</p>}
        </form>
        <div>
        <Link to="/login">
            Já tem uma conta?
        </Link>            
        </div>
        </>
    );
}