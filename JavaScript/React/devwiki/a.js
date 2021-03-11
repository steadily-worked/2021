import React, { useState } from "react";
import "./App.css";

const TermRelated = () => {
  const [relatedTerms, setRelatedTerms] = useState([{ id: "", text: "" }]);
  const [inputTerm, setInputTerm] = useState("");
  const [nextId, setNextId] = useState("");

  const onChange = (e) => setInputTerm(e.target.value);

  const onClick = () => {
    const nextRelatedTerms = relatedTerms.concat({
      id: nextId,
      text: inputTerm,
    });
    if (!nextRelatedTerms) {
      return;
    }
    setNextId(nextId + 1);
    setRelatedTerms(nextRelatedTerms);
    setInputTerm("");
  };

  const onKeyPress = (e) => {
    if (e.charCode === 188 || e.charCode === 13 || e.charCode === 32) {
      onClick();
    }
  };

  const onRemove = (id) => {
    const nextRelatedTerms = relatedTerms.filter(
      (relatedTerms) => relatedTerms.id !== id
    );
    setRelatedTerms(nextRelatedTerms);
  };

  const relatedTermsList = relatedTerms.map((relatedTerm) => (
    <>
      <li key={relatedTerm.id}>
        {relatedTerm.text}
        <button onClick={() => onRemove(relatedTerm.id)}>X</button>
      </li>
    </>
  ));

  return (
    <>
      <input
        value={inputTerm}
        onChange={onChange}
        onKeyPress={onKeyPress}
        maxlength="15"
      />
      <button onClick={onClick}>추가</button>
      <ul id="list_terms">{relatedTermsList}</ul>
    </>
  );
};

export default TermRelated;
