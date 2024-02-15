import { Link } from "react-router-dom";

import { Product } from "../../../types/common";
import ProductCard from "../../product/card/Product-card";
import {
  CategoryPreviewContainer,
  Title,
  PreviewContainer,
} from "./Preview.styles";

type PreviewProps = { title: string; products: Array<Product> };
export default function Preview(props: PreviewProps) {
  const { title, products } = props;

  return (
    <CategoryPreviewContainer>
      <Title>
        <Link to={title}>{title.toUpperCase()}</Link>
      </Title>
      <PreviewContainer>
        {products
          .filter((_, i) => i < 4)
          .map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
      </PreviewContainer>
    </CategoryPreviewContainer>
  );
}
