import { useSelector } from "react-redux";

import { selectCategories } from "../../../redux/categories/selectors";

import PreviewComponent from "../../../components/category/preview/Preview";

export default function Preview() {
  const categories = useSelector(selectCategories);

  return (
    <div className="products-container">
      {Object.entries(categories).map(([title, products]) => (
        <PreviewComponent key={title} title={title} products={products} />
      ))}
    </div>
  );
}
