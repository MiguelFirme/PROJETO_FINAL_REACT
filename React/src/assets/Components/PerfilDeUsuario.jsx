import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PerfilDeUsuario() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Recupera usuário logado do localStorage
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

  const excluirConta = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir sua conta?");
    if (confirmar) {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE'
      });
      localStorage.clear();
      navigate('/login');
    }
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto', position: 'relative' }}>
      {/* Botão de excluir conta */}
      <button
        onClick={excluirConta}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: 'red',
          color: 'white',
          border: 'none',
          padding: '0.5rem',
          cursor: 'pointer'
        }}
      >
        Excluir conta
      </button>

      <h2>Meu Perfil</h2>

      <label>Nome:</label>
      <input name="name" value={usuario.name || ''} onChange={handleChange} /><br />

      <label>Email:</label>
      <input name="email" value={usuario.email || ''} onChange={handleChange} /><br />

      <label>Senha:</label>
      <input type="password" name="Senha" value={usuario.Senha || ''} onChange={handleChange} /><br />

      <label>Telefone:</label>
      <input name="telefone" value={usuario.telefone || ''} onChange={handleChange} /><br />

      <label>Idade:</label>
      <input name="Idade" value={usuario.Idade || ''} onChange={handleChange} /><br />

      <button onClick={salvarAlteracoes} style={{ marginTop: '1rem' }}>
        Salvar Alterações
      </button>
    </div>
  );
}