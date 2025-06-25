import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilDeUsuario.css';

export default function PerfilDeUsuario() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const userId = usuarioLogado ? usuarioLogado.id : null;

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetch(`http://localhost:3001/users/${userId}`)
      .then(res => res.json())
      .then(data => setUsuario(data));
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const salvarAlteracoes = async () => {
    await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    alert("Dados atualizados!");
  };

  if (!usuario) return null;

  return (
    <div className="perfil-container">
      <h2 className="perfil-titulo">Meu Perfil</h2>
      <div className="perfil-form">
        <label>
          Nome:
          <input type="text" name="nome" value={usuario.nome} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={usuario.email} onChange={handleChange} />
        </label>
        <label>
          Telefone:
          <input type="text" name="telefone" value={usuario.telefone || ''} onChange={handleChange} />
        </label>
        <label>
          Endereço:
          <input type="text" name="endereco" value={usuario.endereco || ''} onChange={handleChange} />
        </label>
        <button className="btn-salvar" onClick={salvarAlteracoes}>Salvar alterações</button>
      </div>
    </div>
  );
}
