import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";
import { setCategories } from "../../redux/categories/actions";

import Preview from "./preview/Preview";
import Category from "./category/Category";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    getCategoriesAndDocuments().then((categories) => {
      console.log(categories);
      dispatch(setCategories(categories));
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Preview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
