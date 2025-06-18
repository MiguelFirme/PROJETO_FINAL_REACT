import './Reserva.css';

export default function Reserva() {
    
    const ambientes = [
        { id: 1, imagem: 'https://via.placeholder.com/300x200', nome: 'Auditório Principal', capacidade: 200, preco: 1500, descricao: 'Auditório com capacidade para 200 pessoas, equipado com sistema de som e projeção.' },
        { id: 2, imagem: 'https://via.placeholder.com/300x200', nome: 'Sala de Reuniões', capacidade: 50, preco: 800, descricao: 'Sala de reuniões para até 50 pessoas, com recursos audiovisuais.' },
        { id: 3, imagem: 'https://via.placeholder.com/300x200', nome: 'Espaço Gourmet', capacidade: 100, preco: 1200, descricao: 'Espaço gourmet com cozinha equipada, ideal para eventos sociais.' },
        { id: 4, imagem: 'https://via.placeholder.com/300x200', nome: 'Jardim Externo', capacidade: 300, preco: 2000, descricao: 'Jardim externo amplo, perfeito para eventos ao ar livre.' }
    ]
    return (
        <div className="reserva-container">
            {ambientes.map((ambiente) => (
                <div key={ambiente.id} className="ambiente-card">
                    <img src={ambiente.imagem} alt={ambiente.nome} className="ambiente-imagem" />
                    <h3 className="ambiente-nome">{ambiente.nome}</h3>
                    <p className="ambiente-capacidade">Capacidade: {ambiente.capacidade} pessoas</p>
                    <p className="ambiente-preco">Preço: R$ {ambiente.preco.toFixed(2)}</p>
                    <p className="ambiente-descricao">{ambiente.descricao}</p>
                    <button className="reserva-button">Reservar</button>

                </div>
            ))}
        </div>
    );
}