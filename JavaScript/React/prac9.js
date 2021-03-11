import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 1, text: "눈사람" },
    { id: 1, text: "눈사람" },
    { id: 1, text: "눈사람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5);

  const onChange = (e) => setInputText(e.target.value);

  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText("");
  };

  const namesList = names.map((name) => <li key={name.id}>{name.text}</li>);

  return (
    <>
      <input
        value={inputText}
        onChange={onChange}
        onDoubleClick={() => onRemove(name.id)}
      >
        {name.text}
      </input>
    </>
  );
};

export default IterationSample;
