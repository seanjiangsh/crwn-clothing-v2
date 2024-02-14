import { useContext } from "react";

import { CategoriesContext } from "../../../contexts/categories";

import PreviewComponent from "../../../components/category/preview/Preview";

export default function Preview() {
  const { categories } = useContext(CategoriesContext);

  return (
    <div className="products-container">
      {Object.entries(categories).map(([title, products]) => (
        <PreviewComponent key={title} title={title} products={products} />
      ))}
    </div>
  );
}
