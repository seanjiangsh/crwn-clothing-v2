import { Category } from "../../types/common";

import "./Directory.scss";
import CategoryItem from "../category-item/Category-item";

type DirectoryProps = { categories: Array<Category> };

export default function Directory(props: DirectoryProps) {
  const { categories } = props;

  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
    </div>
  );
}
