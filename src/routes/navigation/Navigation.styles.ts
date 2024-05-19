import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: white;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);
`;

export const LogoContainer = styled(Link)`
  width: 50px;
  padding: 10px;
  text-align: center;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const NavLink = styled(Link)<{ to?: string }>`
  padding: 10px 15px;
  cursor: pointer;
`;

export const OutletContainer = styled.div`
  margin-top: 60px;
  height: calc(100dvh - 60px);
  overflow: auto;
  width: 100%;
`;
