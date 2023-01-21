import { useState, createContext, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.js"; 

export const CategoriesContext = createContext({
	categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setcategoriesMap] = useState({});
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setcategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, []);

	const value = { categoriesMap };

	return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider> 
}