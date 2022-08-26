import React from "react";

function Footer({ techno }) {
  return (
    <div className={"footer"}>
      <div>Contacter le support : 0 811 85 9486</div>
      <div>
        Créer un ticket :
        <a
          target="_blank"
          href="https://support.xivo.solutions/front/ticket.form.php"
          rel="noreferrer"
        >
          support
        </a>
      </div>
    </div>
  );
}

export default Footer;
