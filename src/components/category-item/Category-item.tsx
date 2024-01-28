import { Category } from "../../types/common";

import "./Category-item.scss";

export default function CategoryItem(props: Category) {
  const { id, title, imageUrl } = props;

  return (
    <div key={id} className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}
