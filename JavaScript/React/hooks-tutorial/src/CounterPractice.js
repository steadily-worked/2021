import React, { useReducer } from "react";

function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const CounterPractice = () => {
  // const [value, setValue] = useState(0);
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

export default CounterPractice;

// useState는 가장 기본적인 Hook이며, 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해 준다.
// 지난번에 이미 사용해 봤는데, 이번에 다시 복습해 볼 것이다. 만약 함수형 컴포넌트에서 상태를 관리해야 한다면
// 이 Hook을 사용하면 된다.

// useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때
// 사용하는 Hook이다. 리듀서(reducer)라는 개념은 이후 Redux를 배울 때 더 자세히 알아볼 것이다.

// 리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션값을 전달받아 새로운 상태를 반환하는 함수이다.
// 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜 줘야 한다.
