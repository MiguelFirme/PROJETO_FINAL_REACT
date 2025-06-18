import React, { useState } from "react";

export default function Pagamento() {
    const [formaPagamento, setFormaPagamento] = useState("");

    const handleFormaPagamentoChange = (event) => {
        setFormaPagamento(event.target.value);
    };

    return (
        <div>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="credito"
                    onChange={handleFormaPagamentoChange}
                />
                Cartão de crédito
            </label>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="debito"
                    onChange={handleFormaPagamentoChange}
                />
                Cartão de débito
            </label>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="pix"
                    onChange={handleFormaPagamentoChange}
                />
                Pix
            </label>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="boleto"
                    onChange={handleFormaPagamentoChange}
                />
                Boleto
            </label>

            {formaPagamento === "credito" && (
                <div>
                    <label>
                        Número do cartão:
                        <input type="text" placeholder="Digite o número do cartão" />
                    </label>
                </div>
            )}

            {formaPagamento === "debito" && (
                <div>
                    <label>
                        Número do cartão:
                        <input type="text" placeholder="Digite o número do cartão" />
                    </label>
                    <label>
                        Validade:
                        <input type="text" placeholder="Data de validade" />
                    </label>
                </div>
            )}

            {formaPagamento === "pix" && (
                <div>
                    <label>
                        Chave Pix:
                        <input type="text" placeholder="Digite sua chave Pix" />
                    </label>
                </div>
            )}

            {formaPagamento === "boleto" && (
                <div>
                    <p>O boleto será gerado após a confirmação do pedido.</p>
                </div>
            )}
        </div>
    );
}
