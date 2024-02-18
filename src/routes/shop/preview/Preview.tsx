import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../../redux/categories/selectors";

import PreviewComponent from "../../../components/category/preview/Preview";

export default function Preview() {
  const categories = useSelector(selectCategoriesMap);

  return (
    <div className="products-container">
      {Object.entries(categories).map(([title, products]) => (
        <PreviewComponent key={title} title={title} products={products} />
      ))}
    </div>
  );
}
