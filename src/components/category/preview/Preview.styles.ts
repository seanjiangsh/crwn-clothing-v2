import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  @media screen and (max-width: 800px) {
    align-items: center;
  }
`;

export const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  padding: 20px;
  width: fit-content;
  @media screen and (max-width: 800px) {
    padding: 0;
  }
`;

export const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  padding: 20px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 25px;
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 25px;
  }
`;
