import React from "react";
import Modal from "react-modal";
import closeImg from "../../assets/Fechar.svg";

export function CreateAccountSuccessModal({ onRequestClose, isOpen }) {
  return (
    <Modal
      className="react-modal-content"
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
    >
      <button onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Botão de fechr" />
      </button>

      <h3>Cadastro realizado com sucesso!</h3>
      <p>Entre com o seu e-mail e senha</p>
    </Modal>
  );
}
