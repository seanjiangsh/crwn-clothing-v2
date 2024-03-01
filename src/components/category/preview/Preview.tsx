import { useMemo } from "react";
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
  const filteredProducts = useMemo(
    () => products.filter((_, i) => i < 4),
    [products],
  );

  return (
    <CategoryPreviewContainer>
      <Title>
        <Link to={title.toLowerCase()}>{title.toUpperCase()}</Link>
      </Title>
      <PreviewContainer>
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </PreviewContainer>
    </CategoryPreviewContainer>
  );
}
