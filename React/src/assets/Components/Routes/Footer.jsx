import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Sobre nós</li>
          <li className="fListItem">Contato</li>
          <li className="fListItem">Blog</li>
          <li className="fListItem">Política de privacidade</li>
          <li className="fListItem">Termos de uso</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Ambientes</li>
          <li className="fListItem">Eventos</li>
          <li className="fListItem">Promoções</li>
          <li className="fListItem">Clientes</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Ajuda</li>
          <li className="fListItem">Central de suporte</li>
          <li className="fListItem">Fale conosco</li>
          <li className="fListItem">Relatar problema</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Trabalhe conosco</li>
          <li className="fListItem">Parcerias</li>
          <li className="fListItem">Investidores</li>
          <li className="fListItem">Responsabilidade social</li>
        </ul>
      </div>
      <div className="fText">© 2025 Momentum Eventos — Imagens feitas com IA.</div>
    </footer>
  );
};

export default Footer;
