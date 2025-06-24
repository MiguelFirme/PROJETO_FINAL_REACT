import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reserva.css';

export default function Reserva() {
    const ambientes = [
        { id: 1, imagem: '/Images/espaco_aberto.png', nome: 'Recreativo Futebol', capacidade: 200, preco: 150, descricao: 'Amplo espaço aberto, com quiosques, churrasqueira e um otimo campo de futebol para passar o tempo.' },
        { id: 2, imagem: '/Images/espaco_casamento.png', nome: 'Salão de festas Gourmet', capacidade: 800, preco: 950, descricao: 'O local ideal para grandes eventos e momentos inesquesiveis.' },
        { id: 3, imagem: '/Images/espaco_gourmet.png', nome: 'Espaço Gourmet', capacidade: 150, preco: 100, descricao: 'Espaço gourmet com cozinha equipada, ideal para eventos sociais.' },
        { id: 4, imagem: '/Images/cafeteria.png', nome: 'Espaço Cafeteria Industrial', capacidade: 200, preco: 200, descricao: 'Um amplo espaço, diversas mesas e um ambiente em estilo rustico industrial. Serviços inclusos' }
    ];

    const datasPossiveis = [
        "2024-07-01", "2024-07-02", "2024-07-03", "2024-07-04", "2024-07-05"
    ];

    const [quantidade, setQuantidade] = useState(
        ambientes.reduce((acc, ambiente) => ({ ...acc, [ambiente.id]: 1 }), {})
    );
    const [datasSelecionadas, setDatasSelecionadas] = useState(
        ambientes.reduce((acc, ambiente) => ({ ...acc, [ambiente.id]: "" }), {})
    );
    const [reservas, setReservas] = useState([]);

    const navigate = useNavigate();

    // Buscar reservas do backend
    useEffect(() => {
        fetch('http://localhost:3001/reservations')
            .then(res => res.json())
            .then(data => setReservas(data));
    }, []);

    const alterarQuantidade = (id, valor) => {
        setQuantidade(qtds => ({
            ...qtds,
            [id]: Math.max(1, qtds[id] + valor)
        }));
    };

    const handleDataChange = (id, value) => {
        setDatasSelecionadas(ds => ({
            ...ds,
            [id]: value
        }));
    };

    // Função para saber se a data está reservada para o ambiente
    const isDataReservada = (ambienteId, data) => {
        return reservas.some(
            r => String(r.ambienteId) === String(ambienteId) && r.date === data
        );
    };

    // Função para reservar e redirecionar
    const handleReservar = async (ambienteId) => {
        const dataSelecionada = datasSelecionadas[ambienteId];
        if (!dataSelecionada) {
            alert("Selecione uma data!");
            return;
        }
        if (isDataReservada(ambienteId, dataSelecionada)) {
            alert("Esta data já está reservada para este ambiente!");
            return;
        }
        // Exemplo: userId fixo, troque pelo usuário logado se necessário
        const userId = 1;
        const novaReserva = {
            userId,
            ambienteId,
            date: dataSelecionada,
            description: "Reserva feita pelo sistema"
        };
        await fetch('http://localhost:3001/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaReserva)
        });
        alert("Reserva realizada com sucesso!");
        // Atualiza as reservas
        fetch('http://localhost:3001/reservations')
            .then(res => res.json())
            .then(data => setReservas(data));
        // Redireciona para a página desejada
        navigate('/pagamento'); // Troque para a rota desejada
    };

     const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    return (
        <div className="reserva-container">
            {ambientes.map((ambiente) => (
                <div key={ambiente.id} className="ambiente-card">
                    <h3 className="ambiente-nome">{ambiente.nome}</h3>
                    <img src={ambiente.imagem} alt={ambiente.nome} className="ambiente-imagem" />
                    <p className="ambiente-capacidade">Capacidade: {ambiente.capacidade} pessoas</p>
                    <p className="ambiente-preco">
                        Preço unitário: R$ {ambiente.preco.toFixed(2)}
                    </p>
                    <div style={{ margin: '1px 0', color: '#000' }}>
                        <button onClick={() => alterarQuantidade(ambiente.id, -1)}>-</button>
                        <span style={{ margin: '0 10px' }}>{quantidade[ambiente.id]} Horas</span>
                        <button onClick={() => alterarQuantidade(ambiente.id, 1)}>+</button>
                    </div>
                    <div style={{ margin: '10px 0' }}>
                        <label htmlFor={`data-${ambiente.id}`}>Data: </label>
                        <select
                            id={`data-${ambiente.id}`}
                            value={datasSelecionadas[ambiente.id]}
                            onChange={e => handleDataChange(ambiente.id, e.target.value)}
                        >
                            <option value="">Selecione uma data</option>
                            {datasPossiveis.map(data => (
                                <option
                                    key={data}
                                    value={data}
                                    disabled={isDataReservada(ambiente.id, data)}
                                >
                                    {data} {isDataReservada(ambiente.id, data) ? '(Reservada)' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="ambiente-preco">
                        Total: R$ {(ambiente.preco * quantidade[ambiente.id]).toFixed(2)}
                    </p>
                    <p className="ambiente-descricao">{ambiente.descricao}</p>
                    <button className="reserva-button" onClick={() => handleReservar(ambiente.id)}>Reservar</button>
                </div>
            ))}
        </div>
    );
}