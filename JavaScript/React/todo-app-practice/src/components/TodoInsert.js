import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(""); // value 값 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시키는데,
      // 이를 방지하기 위해 이 함수를 호출한다.
      e.preventDefault();
    },
    [onInsert, value]
  );
  // onClick으로 해도 되는데 onSubmit을 사용한 이유: submit의 경우에는
  // 엔터키를 눌러도 똑같이 이벤트 실행이 되는데, onClick의 경우 onKeyPress 이벤트를
  //  추가로 설정해줘야 하기 때문이다.
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
