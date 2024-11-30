import React from "react";
import styled from "styled-components";
import logo from "../../img/logo 2.png";
import inst from "../../img/svgs/inst.svg";
import face from "../../img/svgs/facebook.svg";
import whatsapp from "../../img/svgs/whatsapp.svg";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer>
          <img src={logo} alt="Logo" />
        </LogoContainer>
        <AddressAndContact>
          <AddressSection>
            <SectionTitle>Address</SectionTitle>
            <AddressList>
              <AddressItem>Svobody str. 35</AddressItem>
              <AddressItem>Kyiv</AddressItem>
              <AddressItem>Ukraine</AddressItem>
            </AddressList>
          </AddressSection>
          <ContactSection>
            <SectionTitle>Contact us</SectionTitle>
            <ContactList>
              <ContactItem>
                <a href="#">
                  <img src={inst} alt="Instagram" />
                </a>
              </ContactItem>
              <ContactItem>
                <a href="#">
                  <img src={face} alt="Facebook" />
                </a>
              </ContactItem>
              <ContactItem>
                <a href="#">
                  <img src={whatsapp} alt="WhatsApp" />
                </a>
              </ContactItem>
            </ContactList>
          </ContactSection>
        </AddressAndContact>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background: #ffb36c;
  padding: 30px 0;

  @media (min-width: 834px) {
    padding: 35px 0;
  }

  @media (min-width: 1440px) {
    padding: 40px 0 64px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: 834px) {
    flex-wrap: nowrap;
  }
`;

const LogoContainer = styled.div`

  flex-shrink: 0;
  margin-left: 50px;
  width: 50px;
  height: 34px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 834px) {
    margin-left: 100px;
    width: 58px;
    height: 40px;
  }

  @media (min-width: 1440px) {
    margin-bottom: 0px;
    margin-left: 150px;
    width: 90px;
    height: 62px;
  }
`;

const AddressAndContact = styled.div`
  display: block;
  @media (min-width: 834px) {
    display: flex;
  }

  @media (min-width: 1440px) {
    display: flex;
  }
`;

const SectionTitle = styled.h2`
  color: #000;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 12px;
  font-weight: 500;

  @media (min-width: 834px) {
    font-size: 14px;
  }

  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;

const AddressSection = styled.div`
  text-align: center;

  @media (min-width: 834px) {
    margin: 0 0 0 100px;
  }

  @media (min-width: 1440px) {
    margin-left: 103px;
  }
`;

const AddressList = styled.ul`
  margin-top: 15px;

  @media (min-width: 1440px) {
    margin-top: 10px;
  }
`;

const AddressItem = styled.li`
  color: #000;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 8px;
  font-weight: 500;

  @media (min-width: 834px) {
    font-size: 10px;
  }

  @media (min-width: 1440px) {
    font-size: 12px;
  }
`;

const ContactSection = styled.div`
  margin: 25px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 834px) {
    margin: 0 0 0 100px;
  }

  @media (min-width: 1440px) {
    margin-left: 103px;
  }
`;

const ContactList = styled.ul`
  display: flex;
  gap: 20px;
  margin-top: 17px;

  @media (min-width: 834px) {
    margin-top: 15px;
  }

  @media (min-width: 1440px) {
    margin-top: 10px;
  }
`;

const ContactItem = styled.li`
  img {
    width: 35px;
    height: 35px;

    @media (min-width: 1440px) {
      width: 40px;
      height: 40px;
    }
  }
`;
