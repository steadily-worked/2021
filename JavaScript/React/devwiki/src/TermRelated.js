import React, { useState } from "react";
import "./App.css";

const TermRelated = () => {
  const [relatedTerms, setRelatedTerms] = useState([]);
  const [inputTerm, setInputTerm] = useState("");
  const [nextId, setNextId] = useState(0);

  const onChange = (e) => setInputTerm(e.target.value);

  const onClick = () => {
    const trimmedInputTerm = inputTerm
      .trim()
      .replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, "");
    if (!trimmedInputTerm) {
      return;
    }
    const nextRelatedTerms = relatedTerms.concat({
      id: nextId,
      text: trimmedInputTerm,
    });

    setNextId(nextId + 1);
    setRelatedTerms(nextRelatedTerms);
    setInputTerm("");
  };

  const onKeyPress = (e) => {
    if (
      (e.charCode === 188 || e.charCode === 13 || e.charCode === 32) &&
      e.target.value
    ) {
      onClick();
    }
  };

  const onRemove = (id) => {
    const nextRelatedTerms = relatedTerms.filter(
      (relatedTerms) => relatedTerms.id !== id
    );
    setRelatedTerms(nextRelatedTerms);
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
        onKeyPress={onKeyPress}
        maxLength="15"
      />
      <button onClick={onClick}>추가</button>
      <ul id="list_terms">{relatedTermsList}</ul>
    </>
  );
};

export default TermRelated;
