import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAppDispatch } from "../../redux/root-hook";
import { categoryActions } from "../../redux/categories/reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

import Preview from "./preview/Preview";
import Category from "./category/Category";

export default function Shop() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategoriesAndDocuments().then((categories) => {
      dispatch(categoryActions.setCategories(categories));
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Preview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
