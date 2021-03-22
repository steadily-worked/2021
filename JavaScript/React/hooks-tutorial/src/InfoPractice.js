import React, { useState, useEffect } from "react";

const InfoPractice = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  // useEffect는 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다
  // 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 봐도 무방하다.

  //   useEffect(() => {
  //     console.log("렌더링 완료");
  //     console.log({
  //       name,
  //       nickname,
  //     });
  //   });

  // 만약 렌더링될 때만 실행하고, 업데이트 시에는 실행하지 않으려면, 함수의 두 번째 파라미터로
  // 비어있는 배열을 넣어주면 된다.
  //   useEffect(() => {
  //     console.log("마운트될 때만 실행됩니다.");
  //   }, []);

  // useEffect를 사용할 때, 특정 값이 변경될 때에만(업데이트 시에만) 호출하고 싶은 경우
  // useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 된다.
  useEffect(() => {
    console.log(name);
  }, [name]);
  // 배열 안에는 useState를 통해 관리하고 있는 상태를 넣어 줘도 되고, props로 전달받은
  // 값을 넣어 줘도 된다.

  // useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에
  // 따라 실행되는 조건이 달라진다.
  // 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 있다면, useEffect에서
  // 뒷정리 함수를 반환해 줘야 한다.

  useEffect(() => {
    console.log("effect");
    console.log(name);
    return () => {
      console.log("cleanup");
      console.log(name);
    };
  });

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름: </b> {name}
        </div>
        <div>
          <b>닉네임: </b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default InfoPractice;

// 관리할 상태가 여러 개인 경우에도 useState로 편하게 관리할 수 있다.

// 기존에는 인풋이 여러 개여서 useState를 여러 번 사옹했는데, useReducer를 사용하면 기존에
// 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고, e.target.name을 참조하여
// setState를 해준 것과 유사한 방식으로 작업을 처리할 수 있다.

import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const InfoPractice = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;
  const onChange = (e) => {
    dispatch(e.target);
  };
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

export default InfoPractice;
