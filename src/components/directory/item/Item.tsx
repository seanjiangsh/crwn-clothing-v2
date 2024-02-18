import { useNavigate } from "react-router-dom";

import { DirectoryCategory } from "../Directory";

import { DirectoryItemContainer, BackgroundImage, Body } from "./Item.styles";

export default function DirectoryItem(props: DirectoryCategory) {
  const { title, imageUrl, route } = props;
  const navigate = useNavigate();

  const onClick = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onClick}>
      <BackgroundImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
