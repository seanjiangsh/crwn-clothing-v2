import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { fetchCategoriesStart } from "../../redux/categories/actions";

import Preview from "./preview/Preview";
import Category from "./category/Category";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Preview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
