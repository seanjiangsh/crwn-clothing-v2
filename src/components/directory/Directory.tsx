import { Category } from "../../types/common";

import "./Directory.css";
import DirectoryItem from "./item/Item";

type DirectoryProps = { categories: Array<Category> };

export default function Directory(props: DirectoryProps) {
  const { categories } = props;

  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} {...category} />
      ))}
    </div>
  );
}
