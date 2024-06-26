import styled from "styled-components";

export const BackgroundImage = styled.div<{ imageurl: string }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
`;

export const Body = styled.div`
  width: 130px;
  height: 100px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 3px;
  background-color: white;
  opacity: 0.7;
  position: absolute;
  h2 {
    font-weight: bold;
    margin: 0 6px 0;
    font-size: 22px;
    color: #4a4a4a;
    text-transform: uppercase;
  }
  p {
    font-weight: lighter;
    font-size: 16px;
    margin: 0;
    padding-bottom: 5px;
  }
`;

export const DirectoryItemContainer = styled.div`
  min-width: 30%;
  height: calc((100dvh - 120px) / 2);
  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.5),
    0 6px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin: 10px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
    ${Body} {
      opacity: 0.9;
    }
  }
  &:first-child {
    margin-right: 7.5px;
  }
  &:last-child {
    margin-left: 7.5px;
  }
  @media screen and (max-width: 400px) {
    height: 200px;
  }
`;
