import { useState, useEffect } from 'react';
import './Carrinho.css';

const ambientes = [
    { id: 1, imagem: '/Images/espaco_aberto.png', nome: 'Recreativo Futebol', capacidade: 200, preco: 150, descricao: 'Amplo espaço aberto, com quiosques, churrasqueira e um otimo campo de futebol para passar o tempo.' },
    { id: 2, imagem: '/Images/espaco_casamento.png', nome: 'Salão de festas Gourmet', capacidade: 800, preco: 950, descricao: 'O local ideal para grandes eventos e momentos inesquesiveis.' },
    { id: 3, imagem: '/Images/espaco_gourmet.png', nome: 'Espaço Gourmet', capacidade: 150, preco: 100, descricao: 'Espaço gourmet com cozinha equipada, ideal para eventos sociais.' },
    { id: 4, imagem: '/Images/cafeteria.png', nome: 'Espaço Cafeteria Industrial', capacidade: 200, preco: 200, descricao: 'Um amplo espaço, diversas mesas e um ambiente em estilo rustico industrial. Serviços inclusos' }
];

const datasPossiveis = [
    "2024-07-01", "2024-07-02", "2024-07-03", "2024-07-04", "2024-07-05",
    "2024-08-10", "2024-08-15"
];

export default function MinhasReservas() {
    const [reservas, setReservas] = useState([]);
    const [editando, setEditando] = useState(null);
    const [novaData, setNovaData] = useState('');

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuario?.id) return setReservas([]);
        fetch('http://localhost:3001/reservations')
            .then(res => res.json())
            .then(data => setReservas(
                data.filter(r => String(r.userId) === String(usuario.id))
                    .map(r => ({ ...r, ambiente: ambientes.find(a => a.id === r.ambienteId) }))
            ))
            .catch(console.error);
    }, []);

    const isDataReservada = (ambienteId, data, excludeId = null) =>
        reservas.some(r => String(r.ambienteId) === String(ambienteId) && r.date === data && r.id !== excludeId);

    const excluirReserva = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta reserva?")) return;
        try {
            const res = await fetch(`http://localhost:3001/reservations/${id}`, { method: 'DELETE' });
            if (res.ok) setReservas(rs => rs.filter(r => r.id !== id));
            else alert("Erro ao excluir reserva.");
        } catch { alert("Erro ao conectar com o servidor."); }
    };

    const salvarEdicao = async () => {
        if (!editando || !novaData) return alert("Selecione uma nova data!");
        if (isDataReservada(editando.ambienteId, novaData, editando.id))
            return alert("Esta data já está reservada para este ambiente!");
        const atualizada = { ...editando, date: novaData };
        try {
            const res = await fetch(`http://localhost:3001/reservations/${editando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(atualizada)
            });
            if (res.ok) {
                setReservas(rs => rs.map(r => r.id === editando.id ? atualizada : r));
                setEditando(null); setNovaData("");
            } else alert("Erro ao atualizar reserva.");
        } catch { alert("Erro ao conectar com o servidor."); }
    };

    return (
        <div className="minhas-reservas-container">
            <h2 className="titulo_h2">Minhas Reservas</h2>
            {reservas.length === 0 ? (
                <p>Você não tem nenhuma reserva no momento.</p>
            ) : (
                <div className="reservas-grid">
                    {reservas.map(reserva => (
                        <div key={reserva.id} className="reserva-card">
                            {reserva.ambiente ? (
                                <>
                                    <h3 className="reserva-ambiente-nome">{reserva.ambiente.nome}</h3>
                                    <img src={reserva.ambiente.imagem} alt={reserva.ambiente.nome} className="reserva-imagem" />
                                    <p><strong>Descrição:</strong> {reserva.ambiente.descricao}</p>
                                    <p><strong>Capacidade:</strong> {reserva.ambiente.capacidade} pessoas</p>
                                    <p><strong>Preço Unitário:</strong> R$ {reserva.ambiente.preco.toFixed(2)}</p>
                                    <p><strong>Preço Total:</strong> R$ {reserva.ambiente.preco.toFixed(2)}</p>
                                </>
                            ) : <p>Detalhes do ambiente não encontrados.</p>}
                            <p><strong>Data da Reserva:</strong> {reserva.date}</p>
                            <p><strong>ID da Reserva:</strong> {reserva.id}</p>
                            <div className="reserva-actions">
                                {editando?.id === reserva.id ? (
                                    <div className="edicao-inline">
                                        <label htmlFor={`novaData-${reserva.id}`}>Nova Data:</label>
                                        <select
                                            id={`novaData-${reserva.id}`}
                                            value={novaData}
                                            onChange={e => setNovaData(e.target.value)}
                                        >
                                            <option value="">Selecione uma nova data</option>
                                            {datasPossiveis.map(data => (
                                                <option
                                                    key={data}
                                                    value={data}
                                                    disabled={isDataReservada(reserva.ambienteId, data, reserva.id)}
                                                >
                                                    {data} {isDataReservada(reserva.ambienteId, data, reserva.id) ? '(Reservada)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <button className="btn-salvar-inline" onClick={salvarEdicao}>Salvar</button>
                                        <button className="btn-cancelar-inline" onClick={() => { setEditando(null); setNovaData(""); }}>Cancelar</button>
                                    </div>
                                ) : (
                                    <>
                                        <button className="btn-editar" onClick={() => { setEditando(reserva); setNovaData(reserva.date); }}>Editar</button>
                                        <button className="btn-excluir" onClick={() => excluirReserva(reserva.id)}>Excluir</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
