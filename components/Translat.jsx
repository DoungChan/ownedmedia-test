"use client";
import { useEffect } from "react";
import { useRef } from "react";
const Translate = () => {
   const googleTranslateElementRef = useRef(null);

   const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
         {
            pageLanguage: "en",
            includedLanguages: "ja",
            autoDisplay: false,
         },
         googleTranslateElementRef.current
      );
   };

   useEffect(() => {
      const addScript = document.createElement("script");
      addScript.setAttribute(
         "src",
         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
   }, []);

   return (
      <>
         <div ref={googleTranslateElementRef}> Translate</div>
      </>
   );
};

export default Translate;
