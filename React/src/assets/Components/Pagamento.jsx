import React, { useState } from "react";
import "./Pagamento.css";

export default function Pagamento() {
    const [formaPagamento, setFormaPagamento] = useState("");

    const handleFormaPagamentoChange = (event) => {
        setFormaPagamento(event.target.value);
    };

    return (
        <div className="pagamento-container">
            <h2>Escolha a forma de pagamento</h2>

            <div className="opcoes-pagamento">
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
            </div>

            <div className="campos-pagamento">
                {(formaPagamento === "credito" || formaPagamento === "debito") && (
                    <div>
                        <label>
                            Número do cartão:
                            <input type="text" placeholder="Digite o número do cartão" />
                        </label>
                        <label>
                            Validade:
                            <input type="text" placeholder="MM/AA" />
                        </label>
                    </div>
                )}

                {formaPagamento === "pix" && (
                    <>
                        <div className="pix-section">
                            <img
                                src="/Images/qrcode_pix.png"
                                alt="QR Code Pix"
                                className="pix-qr"
                            />
                            <div className="pix-chave">
                                Chave Pix:<br />
                                <code>
                                    00020126580014BR.GOV.BCB.PIX01363e6f63a1-f179...
                                </code>
                            </div>
                        </div>
                    </>
                )}

                {formaPagamento === "boleto" && (
                    <div className="paragrafo">
                        <p>O boleto será gerado após a confirmação do pedido.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
