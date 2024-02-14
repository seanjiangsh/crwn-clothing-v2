import { Category } from "../../../types/common";

import "./Item.css";

export default function DirectoryItem(props: Category) {
  const { id, title, imageUrl } = props;

  return (
    <div key={id} className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}
