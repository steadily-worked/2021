import React, { useState } from "react";
import "./App.css";

const TermRelated = () => {
  const [relatedTerms, setRelatedTerms] = useState([]);
  const [inputTerm, setInputTerm] = useState("");
  const [id, setId] = useState(1);

  const onChange = (e) => {
    const lastIdx = e.target.value.length - 1;
    if (e.target.value[lastIdx] === ",") return;
    setInputTerm(e.target.value);
  };
  const onClick = () => {
    for (let i = 0; i < relatedTerms.length; i++) {
      if (relatedTerms[i].text === trimmedInputTerm) {
        setInputTerm("");
        alert("중복");
        return;
      }
    }
    const termsArray = relatedTerms.concat({
      id: id,
      text: inputTerm.trim().replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, ""),
    });
    setRelatedTerms(termsArray);
    setId(id + 1);
    setInputTerm("");
  };

  const trimmedInputTerm = inputTerm
    .trim()
    .replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, "");

  const onKeyUp = (e) => {
    // console.log({ trimmedInputTerm, keyCode: e.keyCode });
    if (
      (e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32) &&
      trimmedInputTerm
    ) {
      onClick();
    }
  };

  const onRemove = (id) => {
    const termsArray = relatedTerms.filter(
      (relatedTerms) => relatedTerms.id !== id
    );
    setRelatedTerms(termsArray);
  };
  const relatedTermsList = relatedTerms.map((relatedTerms) => (
    <li key={relatedTerms.id}>
      {relatedTerms.text}
      <button onClick={() => onRemove(relatedTerms.id)}>X</button>
    </li>
  ));

  return (
    <>
      <input
        value={inputTerm}
        onChange={onChange}
        onKeyUp={onKeyUp}
        maxLength="15"
      />
      <button onClick={onClick}>추가</button>
      <ul id="list_terms">{relatedTermsList}</ul>
    </>
  );
};

export default TermRelated;
