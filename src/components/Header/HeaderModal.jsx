import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  border-radius: 25px;
  background: #fff;
  width: 600px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    width: 293px;
    height: 454px;
    padding: 15px;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;

  @media (max-width: 600px) {
    height: 100%;
  }
`;

const ModalTitle = styled.h1`
  color: #000;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const ModalLabel = styled.label`
  color: #000;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const ModalInput = styled.input`
  width: 440px;
  height: 50px;
  border-radius: 10px;
  background: #e4e4e4;
  margin-bottom: 20px;
  padding: 0 10px;
  border: none;

  @media (max-width: 600px) {
    width: 260px;
    height: 40px;
    font-size: 14px;
  }
`;

const ModalBtn = styled.button`
  display: inline-flex;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #ffb36c;
  color: #000;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;

  @media (max-width: 600px) {
    padding: 8px 20px;
    font-size: 12px;
  }
`;

const ModalText = styled.p`
  color: #000;
  font-family: Montserrat, sans-serif;
  font-size: 10px;
  font-weight: 500;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 9px;
  }
`;

const HeaderModal = ({ onClose }) => {
  const [name, setName] = useState("");

  const handleSignUp = () => {
    if (name.trim()) {
      onClose(name);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <ModalContainer>
          <ModalTitle>Sign Up</ModalTitle>
          <ModalLabel>Username:</ModalLabel>
          <ModalInput
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ModalLabel>E-Mail:</ModalLabel>
          <ModalInput type="email" placeholder="E-Mail" />
          <ModalLabel>Password:</ModalLabel>
          <ModalInput type="password" placeholder="Password" />
          <ModalBtn onClick={handleSignUp}>Sign Up</ModalBtn>
          <ModalText>Already have an account? Log In</ModalText>
        </ModalContainer>
      </Modal>
    </Overlay>
  );
};

export default HeaderModal;
