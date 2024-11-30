import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../img/logo.jpg";
import user from "../../img/user.jpg";
import HeaderModal from "./HeaderModal";

const HeaderContainer = styled.div`
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
  z-index: 1000;
`;

const Logo = styled.img`
  width: 82px;
  height: 56px;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #000;

  @media (min-width: 834px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  background: #e6e6e6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  padding: 20px;
  z-index: 999;

  @media (min-width: 834px) {
    display: flex;
    position: static;
    background: none;
    box-shadow: none;
    flex-direction: row;
    padding: 0;
  }
`;

const HeaderText = styled.p`
  color: #000;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0;

  @media (min-width: 834px) {
    margin: 0 15px;
  }
`;

const LoginBtn = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  background: #ffb36c;
  border: none;
  color: #000;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin: 10px 0;

  @media (min-width: 834px) {
    display: block;
    margin-left: 15px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 834px) {
    display: none;
  }
`;

const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const MobileUserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (min-width: 834px) {
    display: none;
  }
`;

const Header = ({ setIsLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignUp = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleModalClose = (name) => {
    setUserName(name);
    setIsModalOpen(false);
    setIsLoggedIn(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <HeaderContainer>
        <Logo src={logo} alt="Logo" />
        <MenuButton onClick={toggleDropdown}>Menu</MenuButton>
        <DropdownMenu $isOpen={isDropdownOpen}>
          <HeaderText>Who we are</HeaderText>
          <HeaderText>Contacts</HeaderText>
          <HeaderText>Menu</HeaderText>

          <MobileUserSection>
            <UserIcon src={user} alt="User" />
            {userName ? <span>{userName}</span> : <LoginBtn onClick={handleSignUp}>Sign Up</LoginBtn>}
          </MobileUserSection>
        </DropdownMenu>

        <UserSection>
          <UserIcon src={user} alt="User" />
          {userName ? <span>{userName}</span> : <LoginBtn onClick={handleSignUp}>Sign Up</LoginBtn>}
        </UserSection>
      </HeaderContainer>
      {isModalOpen && <HeaderModal onClose={handleModalClose} />}
    </>
  );
};

export default Header;