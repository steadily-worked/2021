import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function CustomHooksPractice(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}

// Info 컴포넌트에서 사용하기까지

import React, { useReducer } from "react";
import CustomHooksPractice from "./CustomHooksPractice";

const Info = () => {
  const [state, onChange] = CustomHooksPractice({
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <b>이름: </b> {name}
      </div>
      <div>
        <b>닉네임: </b> {nickname}
      </div>
    </div>
  );
};

export default Info;

// render 함수와 Info 컴포넌트 내 여러 코드가 사라지고 제일 아래 CustomHooksPractice Hook을
// 불러온 코드로 변경되었다.
