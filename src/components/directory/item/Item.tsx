import { useNavigate } from "react-router-dom";

import { DirectoryItemContainer, BackgroundImage, Body } from "./Item.styles";

type DirectoryItemProps = {
  title: string;
  imageUrl: string;
  route: string;
};
export default function DirectoryItem(props: DirectoryItemProps) {
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
