import React, { useState, useEffect } from 'react';
// Certifique-se de criar e importar o CSS para suas reservas

export default function MinhasReservas() {
    const [reservasDoUsuario, setReservasDoUsuario] = useState([]);
    
    // Este array deve idealmente vir de um local centralizado (API ou Context)
    // Para fins de demonstração, estamos definindo-o aqui, como no seu componente Reserva.
    const todosOsAmbientes = [
        { id: 1, imagem: '/Images/espaco_aberto.png', nome: 'Recreativo Futebol', capacidade: 200, preco: 150, descricao: 'Amplo espaço aberto, com quiosques, churrasqueira e um otimo campo de futebol para passar o tempo.' },
        { id: 2, imagem: '/Images/espaco_casamento.png', nome: 'Salão de festas Gourmet', capacidade: 800, preco: 950, descricao: 'O local ideal para grandes eventos e momentos inesquesiveis.' },
        { id: 3, imagem: '/Images/espaco_gourmet.png', nome: 'Espaço Gourmet', capacidade: 150, preco: 100, descricao: 'Espaço gourmet com cozinha equipada, ideal para eventos sociais.' },
        { id: 4, imagem: '/Images/cafeteria.png', nome: 'Espaço Cafeteria Industrial', capacidade: 200, preco: 200, descricao: 'Um amplo espaço, diversas mesas e um ambiente em estilo rustico industrial. Serviços inclusos' }
    ];

    const fetchReservations = async () => {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuarioLogado || !usuarioLogado.id) {
            console.log("Usuário não logado ou ID ausente.");
            setReservasDoUsuario([]);
            return;
        }

        try {
            const resReservations = await fetch('http://localhost:3001/reservations');
            const allReservations = await resReservations.json();

            const userReservations = allReservations.filter(
                (reserva) => String(reserva.userId) === String(usuarioLogado.id)
            );

            // Enriquece as reservas com os detalhes do ambiente
            const enrichedReservations = userReservations.map(reserva => {
                const ambienteDetalhes = todosOsAmbientes.find(
                    (ambiente) => ambiente.id === reserva.ambienteId
                );
                return { ...reserva, ambienteDetalhes };
            });

            setReservasDoUsuario(enrichedReservations);

        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []); 

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

    const handleEditarReserva = (reservaId) => {
        alert(`Funcionalidade de edição para a reserva ${reservaId} será implementada aqui. Você precisará de um formulário ou modal para isso.`);
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
                                    {/* Se 'quantidade' for armazenado na reserva, exiba aqui */}
                                    <p><strong>Preço Total:</strong> R$ {reserva.ambienteDetalhes.preco.toFixed(2)}</p>
                                </>
                            ) : (
                                <p>Detalhes do ambiente não encontrados.</p>
                            )}
                            <p><strong>Data da Reserva:</strong> {reserva.date}</p>
                            <p><strong>ID da Reserva:</strong> {reserva.id}</p> 

                            <div className="reserva-actions">
                                <button className="btn-editar" onClick={() => handleEditarReserva(reserva.id)}>Editar</button>
                                <button className="btn-excluir" onClick={() => handleDeleteReserva(reserva.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}