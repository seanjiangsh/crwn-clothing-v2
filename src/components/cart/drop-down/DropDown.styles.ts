import styled from "styled-components";
import {
  BaseButton,
  GoogleButton,
  InvertedButton,
} from "../../button/Button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  max-height: 60dvh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: white;
  top: 60px;
  right: 10px;
  z-index: 5;
  ${BaseButton},
  ${GoogleButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-bottom: 10px;
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;
