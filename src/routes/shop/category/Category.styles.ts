import styled from "styled-components";

export const CategoryTitle = styled.div`
  font-size: 38px;
  margin: 25px;
  text-align: center;
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  justify-items: center;
  padding: 20px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 15px;
    row-gap: 25px;
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 25px;
  }
`;
