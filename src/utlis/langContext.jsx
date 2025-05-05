import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let LangContext = createContext([]);

export function LangProvider({ children }) {
  let [lang, setLang] = useState({});


  let getApi = async () => {
    let languages = await axios.get(
      "https://develop.sayarti.nl/api/v1/language/en"
    );

    setLang(languages.data.data.keywords);
  };

  useEffect(() => {
    getApi();
  }, []);


  return (
    <LangContext.Provider
      value={{ lang }}
    >
      {children}
    </LangContext.Provider>
  );
}
