import React, { useState, useEffect } from 'react';
import './Carrinho.css';

export default function MinhasReservas() {
    const [reservasDoUsuario, setReservasDoUsuario] = useState([]);
    const [reservaEditando, setReservaEditando] = useState(null); 
    const [novaData, setNovaData] = useState('');

    const todosOsAmbientes = [
        { id: 1, imagem: '/Images/espaco_aberto.png', nome: 'Recreativo Futebol', capacidade: 200, preco: 150, descricao: 'Amplo espaço aberto, com quiosques, churrasqueira e um otimo campo de futebol para passar o tempo.' },
        { id: 2, imagem: '/Images/espaco_casamento.png', nome: 'Salão de festas Gourmet', capacidade: 800, preco: 950, descricao: 'O local ideal para grandes eventos e momentos inesquesiveis.' },
        { id: 3, imagem: '/Images/espaco_gourmet.png', nome: 'Espaço Gourmet', capacidade: 150, preco: 100, descricao: 'Espaço gourmet com cozinha equipada, ideal para eventos sociais.' },
        { id: 4, imagem: '/Images/cafeteria.png', nome: 'Espaço Cafeteria Industrial', capacidade: 200, preco: 200, descricao: 'Um amplo espaço, diversas mesas e um ambiente em estilo rustico industrial. Serviços inclusos' }
    ];

    const datasPossiveis = [
        "2024-07-01", "2024-07-02", "2024-07-03", "2024-07-04", "2024-07-05",
        "2024-08-10", "2024-08-15"
    ];

    const fetchReservations = async () => {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        console.log("1. Usuário Logado lido do LocalStorage:", usuarioLogado); 
        
        if (!usuarioLogado || !usuarioLogado.id) {
            console.log("2. Usuário não logado ou ID ausente. Limpando reservas."); 
            setReservasDoUsuario([]);
            return;
        }
        console.log("3. ID do usuário logado para filtragem:", usuarioLogado.id); 

        try {
            const resReservations = await fetch('http://localhost:3001/reservations');
            const allReservations = await resReservations.json();
            console.log("4. Todas as reservas recebidas do JSON Server:", allReservations); 

            const userReservations = allReservations.filter(
                (reserva) => String(reserva.userId) === String(usuarioLogado.id)
            );
            console.log("5. Reservas FILTRADAS para o usuário logado:", userReservations); 

            const enrichedReservations = userReservations.map(reserva => {
                const ambienteDetalhes = todosOsAmbientes.find(
                    (ambiente) => ambiente.id === reserva.ambienteId
                );
                return { ...reserva, ambienteDetalhes };
            });

            setReservasDoUsuario(enrichedReservations);
            console.log("6. Reservas enriquecidas e setadas no estado:", enrichedReservations); 

        } catch (error) {
            console.error("Erro ao buscar reservas:", error); 
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []); 

    const isDataReservada = (ambienteId, data, excludeReservaId = null) => {
        return reservasDoUsuario.some(
            r => String(r.ambienteId) === String(ambienteId) && 
                 r.date === data &&
                 r.id !== excludeReservaId
        );
    };

    const handleDeleteReserva = async (reservaId) => {
        if (window.confirm("Tem certeza que deseja excluir esta reserva?")) {
            try {
                const res = await fetch(`http://localhost:3001/reservations/${reservaId}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    setReservasDoUsuario(prevReservas =>
                        prevReservas.filter(reserva => reserva.id !== reservaId)
                    );
                    alert("Reserva excluída com sucesso!");
                } else {
                    alert("Erro ao excluir reserva.");
                }
            } catch (error) {
                console.error("Erro ao excluir reserva:", error);
                alert("Erro ao conectar com o servidor.");
            }
        }
    };

    const handleEditarReserva = (reserva) => {
        setReservaEditando(reserva);
        setNovaData(reserva.date);
    };

    const handleSalvarEdicao = async () => {
        if (!reservaEditando) return;

        if (!novaData) {
            alert("Selecione uma nova data para a reserva!");
            return;
        }

        if (isDataReservada(reservaEditando.ambienteId, novaData, reservaEditando.id)) {
            alert("Esta data já está reservada para este ambiente!");
            return;
        }

        const reservaAtualizada = {
            ...reservaEditando,
            date: novaData
        };

        try {
            const res = await fetch(`http://localhost:3001/reservations/${reservaEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservaAtualizada)
            });

            if (res.ok) {
                setReservasDoUsuario(prevReservas =>
                    prevReservas.map(res => 
                        res.id === reservaEditando.id ? reservaAtualizada : res
                    )
                );
                alert("Reserva atualizada com sucesso!");
                setReservaEditando(null);
                setNovaData("");
            } else {
                alert("Erro ao atualizar reserva.");
            }
        } catch (error) {
            console.error("Erro ao atualizar reserva:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    const handleCancelarEdicao = () => {
        setReservaEditando(null);
        setNovaData("");
    };

    return (
        <div className="minhas-reservas-container">
            <h2 className="titulo_h2">Minhas Reservas</h2>

            {reservasDoUsuario.length === 0 ? (
                <p>Você não tem nenhuma reserva no momento.</p>
            ) : (
                <div className="reservas-grid">
                    {reservasDoUsuario.map((reserva) => (
                        <div key={reserva.id} className="reserva-card">
                            {reserva.ambienteDetalhes ? (
                                <>
                                    <h3 className="reserva-ambiente-nome">{reserva.ambienteDetalhes.nome}</h3>
                                    <img src={reserva.ambienteDetalhes.imagem} alt={reserva.ambienteDetalhes.nome} className="reserva-imagem" />
                                    <p><strong>Descrição:</strong> {reserva.ambienteDetalhes.descricao}</p>
                                    <p><strong>Capacidade:</strong> {reserva.ambienteDetalhes.capacidade} pessoas</p>
                                    <p><strong>Preço Unitário:</strong> R$ {reserva.ambienteDetalhes.preco.toFixed(2)}</p>
                                    <p><strong>Preço Total:</strong> R$ {reserva.ambienteDetalhes.preco.toFixed(2)}</p>
                                </>
                            ) : (
                                <p>Detalhes do ambiente não encontrados.</p>
                            )}
                            <p><strong>Data da Reserva:</strong> {reserva.date}</p>
                            <p><strong>ID da Reserva:</strong> {reserva.id}</p> 

                            <div className="reserva-actions">
                                {/* Verifica se esta é a reserva que está sendo editada */}
                                {reservaEditando && reservaEditando.id === reserva.id ? (
                                    // Se sim, mostra o formulário de edição dentro do card
                                    <div className="edicao-inline">
                                        <label htmlFor={`novaData-${reserva.id}`}>Nova Data:</label>
                                        <select
                                            id={`novaData-${reserva.id}`} // ID único para cada select
                                            value={novaData}
                                            onChange={(e) => setNovaData(e.target.value)}
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
                                        <button className="btn-salvar-inline" onClick={handleSalvarEdicao}>Salvar</button>
                                        <button className="btn-cancelar-inline" onClick={handleCancelarEdicao}>Cancelar</button>
                                    </div>
                                ) : (
                                    // Caso contrário, mostra os botões normais
                                    <>
                                        <button className="btn-editar" onClick={() => handleEditarReserva(reserva)}>Editar</button>
                                        <button className="btn-excluir" onClick={() => handleDeleteReserva(reserva.id)}>Excluir</button>
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