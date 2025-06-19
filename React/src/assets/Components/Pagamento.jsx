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
                    <label>
                        <br />
                        Validade:
                        <input type="text" placeholder="Data de validade" />
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
                        <br />
                        Validade:
                        <input type="text" placeholder="Data de validade" />
                    </label>
                </div>
            )}

            {formaPagamento === "pix" && (
            <>
                <div>
                    <img
                        src="/Images/qrcode_pix.png"
                        alt="QR Code Pix"
                        style={{ width: 200, height: 200 }}
                    />
                </div>
                <div>
                    Chave Pix: <br />
                    00020126580014BR.GOV.BCB.PIX01363e6f63a1-f179-430f-9bcd-2b8f5c92d08f52040000530398654040.015802BR5925Miguel Antonio Gregorio F6009SAO PAULO62140510wben3906m56304AD6B
                </div>
            </>
            )}

            {formaPagamento === "boleto" && (
                <div>
                    <p>O boleto será gerado após a confirmação do pedido.</p>
                </div>
            )}
        </div>
    );
}
