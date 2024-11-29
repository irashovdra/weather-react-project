import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../img/logo.jpg";
import user from "../../img/user.jpg";
import HeaderModal from "./HeaderModal";

const HeaderContainer = styled.div`
  height: 80px;
  flex-shrink: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 82px;
  height: 56px;
  flex-shrink: 0;
`;

const HeaderText = styled.p`
  color: #000;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const LoginBtn = styled.button`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #ffb36c;
  border: none;
  color: #000;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 27px;
  cursor: pointer;
`;

const UserName = styled.span`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-right: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  gap: 42px;
  margin-left: 111px;
  margin-right: 519px;
  @media (max-width: 834px) {
    margin-right: 153px;
  }
`;

const User = styled.img``;

const Header = ({ setIsLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSignUp = () => setIsModalOpen(true);
  const handleModalClose = (name) => {
    setUserName(name);
    setIsModalOpen(false);
    setIsLoggedIn(true); 
  };

  return (
    <>
      <HeaderContainer>
        <Logo src={logo} />
        <TextContainer>
          <HeaderText>Who we are</HeaderText>
          <HeaderText>Contacts</HeaderText>
          <HeaderText>Menu</HeaderText>
        </TextContainer>
        {userName ? (
          <UserName>{userName}</UserName>
        ) : (
          <LoginBtn onClick={handleSignUp}>Sign Up</LoginBtn>
        )}
        <User src={user} />
      </HeaderContainer>
      {isModalOpen && <HeaderModal onClose={handleModalClose} />}
    </>
  );
};

export default Header;
