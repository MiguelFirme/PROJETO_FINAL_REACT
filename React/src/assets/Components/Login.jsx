import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // <- Importa o CSS acima

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const res = await fetch(`http://localhost:3001/users?name=${nome}`);
      const users = await res.json();
      if (users.length > 0 && users[0].Senha === senha) {

        localStorage.setItem(
          "usuarioLogado",
          JSON.stringify({ id: users[0].id, nome: users[0].nome }
        ));
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
    <div className="login-wrapper">
      <div className="calendar-icon">
        {/* SVG da logo */}
        <svg width="74" height="74" viewBox="0 0 96 96" fill="none">
          <rect x="18" y="24" width="60" height="54" rx="8" fill="none" stroke="#fff" strokeWidth="4"/>
          <rect x="30" y="16" width="8" height="16" rx="4" fill="#fff"/>
          <rect x="58" y="16" width="8" height="16" rx="4" fill="#fff"/>
          <polyline points="36,57 46,67 62,45" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="titulo_h2">Momentum Eventos</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {erro && <div className="erro-msg">{erro}</div>}
      </form>
      <div className="signup-link">
        <Link to="/signin">Ainda não tem uma conta?</Link>
      </div>
    </div>
  );
}
