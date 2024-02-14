import { Routes, Route } from "react-router-dom";

import Preview from "./preview/Preview";
import Category from "./category/Category";

export default function Shop() {
  return (
    <Routes>
      <Route index element={<Preview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
