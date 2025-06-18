import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const res = await fetch(`http://localhost:3001/users?email=${nome}`);
      const users = await res.json();
      if (users.length > 0 && users[0].senha === senha) {
        alert("Login realizado com sucesso!");
        navigate("/reserva");
      } else {
        setErro("Usuário ou senha incorretos!");
      }
    } catch {
      setErro("Erro ao conectar com o servidor.");
    }
  };    
    
    return (
        <>
        <div>
            <h2 className="titulo_h2">Momentum Eventos</h2>
            <p>
             teste tela de login
            </p>
        </div>       
        
        <form onSubmit={handleLogin}>
            <input
              type="name"
              placeholder="Digite seu nome de usuário"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            /> <br />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
            {erro && <p style={{color: 'red'}}>{erro}</p>}
        </form>

        <div>
        <Link to="/signin">
            Ainda não tem uma conta?
        </Link>            
        </div>
        </>
    );
}
