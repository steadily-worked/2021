<리액트를 다루는 기술>을 요약하고 동시에 제 나름대로의 생각이 담겨 있는 글입니다.

# Hooks

`Hooks`는 리액트 `v16.8`에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 `useState`, 렌더링 직후 작업을 설정하는 `useEffect` 등의 기능을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해 준다.

`리액트 내장 Hooks 사용하기` ➡ `커스텀 Hooks 만들기`의 흐름으로 진행한다.

`$ yarn create react-app hooks-tutorial`로 새로운 프로젝트를 생성하자.

## 1. useState

`useState`는 가장 기본적인 Hook이며, 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해 준다. 지난번에 이미 사용해 봤는데, 이번에 다시 복습해 볼 것이다. 만약 함수형 컴포넌트에서 상태를 관리해야 한다면 이 Hook을 사용하면 된다.

`useState`를 이용해서 숫자 카운터를 구현해 볼 것이다.

> Counter.js

```js
import React from "react";

const Counter = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};

export default Counter;
```

`useState`는 코드 상단에서 `import` 구문을 통해 불러오고, 다음과 같이 사용한다.

```js
const [value, setValue] = useState(0);
```

`useState` 함수의 파라미터에는 상태의 기본값을 넣어 준다. 현재 0을 넣어 줬는데, 결국 카운터의 기본값을 0으로 설정하겠다는 의미이다. 이 함수가 호출되면 배열을 반환하는데, 그 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수이다. 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링된다. 이제 `App` 컴포넌트에 `Counter` 컴포넌트를 렌더링하자.

<img width="249" alt="스크린샷 2021-02-25 오후 2 23 53" src="https://user-images.githubusercontent.com/61453718/109107450-17da6600-7775-11eb-9d16-3ff1edf8930e.png">

눌렀을 때 잘 바뀐다. 함수형 컴포넌트에서 상태 관리를 하기 위해 컴포넌트 코드를 굳이 클래스 형태로 변환할 필요가 없으므로 편리하다.

### 1-1. useState를 여러 번 사용하기

하나의 `useState` 함수는 하나의 상태 값만 관리할 수 있다. 컴포넌트에서 관리해야 할 상태가 여러 개라면 `useState`를 여러 번 사용하면 된다. 이번에는 값을 입력 시 그대로 아래에 띄워주는 컴포넌트를 작성해 볼 것이다.

> Info.js

```js
import React, { useState } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

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
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

이렇게 작성한 이후 `App` 컴포넌트에 렌더링을 해 주면,

<img width="338" alt="스크린샷 2021-02-25 오후 2 31 37" src="https://user-images.githubusercontent.com/61453718/109108076-2c6b2e00-7776-11eb-8fb1-8bbf32d37cac.png">

위 `input` 값에 작성하는 즉시 `div`에 작성한 내용이 출력된다.

관리할 상태가 여러 개인 경우에도 `useState`로 편하게 관리할 수 있다.

## 2. useEffect

`useEffect`는 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다. 클래스형 컴포넌트의 `componentDidMount`와 `componentDidUpdate`를 합친 형태로 봐도 무방하다.

기존에 만들었던 `Info` 컴포넌트에 `useEffect`를 적용해 보자.

> Info.js

```js
import React, { useState, useEffect } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    console.log("렌더링이 완료되었습니다.");
    console.log({
      name,
      nickname,
    });
  });

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return
      (...)
};

export default Info;
```

이제 값을 입력하면서 콘솔을 보면

<img width="674" alt="스크린샷 2021-02-25 오후 2 35 42" src="https://user-images.githubusercontent.com/61453718/109108366-c03cfa00-7776-11eb-8a51-bc44464b8b1d.png">

이처럼 발생한 이벤트에 대해 렌더링이 완료되었음을 출력하고 있다.

### 2-1. 마운트될 때만 실행하고 싶을 때

`useEffect`에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 대만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 된다.

> Info.js - useEffect

```js
useEffect(() => {
  console.log("마운트될 때만 실행됩니다.");
}, []);
```

이렇게 한 후 다시 브라우저를 열어서 수정을 해 보면, 처음 컴포넌트가 나타날 때에만 콘솔에 `마운트될 때에만 실행됩니다`라는 문구가 나타나고, 그 이후엔 업데이트를 하더라도 아무 문구가 나타나지 않는다.

<img width="553" alt="스크린샷 2021-02-25 오후 2 55 21" src="https://user-images.githubusercontent.com/61453718/109109901-7dc8ec80-7779-11eb-8ad7-dcd9ba91da9d.png">

### 2-2. 특정 값이 업데이트될 때에만 실행하고 싶을 때

`useEffect`를 사용할 때, 특정 값이 변경될 때에만 호출하고 싶은 경우도 있을 수 있다. 클래스형 컴포넌트라면 다음과 같이 작성할 것이다.

```js
componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
        doSomething();
    }
}
```

이 코드는 `props` 안에 들어 있는 `value` 값이 바뀔 때만 특정 작업을 수행한다. 이러한 작업을 `useEffect`에서 해야 한다면, 어떻게 해야 할까?

바로, `useEffect`의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 된다.

> Info.js - useEffect

```js
useEffect(() => {
  console.log(name);
}, [name]);
```

배열 안에는 `useState`를 통해 관리하고 있는 상태를 넣어 줘도 되고, `props`로 전달받은 값을 넣어 줘도 된다.

### 2-3. 뒷정리하기

`useEffect`는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.

컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 `useEffect`에서 뒷정리(`cleanup`) 함수를 반환해 줘야 한다.

> Info.js - useEffect

```js
useEffect(() => {
    console.log(‘effect‘);
    console.log(name);
    return () => {
      console.log(‘cleanup‘);
      console.log(name);
    };
  });
```

이제 `App` 컴포넌트에서 `Info` 컴포넌트의 가시성을 바꿀 수 있게 해 보자. 이번에도 `useState`를 이용해서 상태관리를 한다.

> App.js

```js
import React, { useState } from "react";
// import Counter from "./Counter";
import Info from "./Info";

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "숨기기" : "보이기"}
      </button>
      <hr />
      {visible && <Info />}
    </div>
  );
};

export default App;
```

이제 보이기를 누르면 `effect`, 숨기기를 하면 뒷정리 함수에 따라 `cleanup`이 출력된다.

<img width="501" alt="스크린샷 2021-02-25 오후 4 13 42" src="https://user-images.githubusercontent.com/61453718/109116796-6f340280-7784-11eb-9d83-cb039124dbf3.png">

렌더링될 때마다 뒷정리 함수가 계속 나타난다. 그 후 뒷정리 함수가 호출될 때는 업데이트되기 직전의 값을 보여 준다.

오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 `useEffect` 함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 된다.

> Info.js - useEffect

```js
useEffect(() => {
  console.log("effect");
  console.log(name);
  return () => {
    console.log("cleanup");
    console.log(name);
  };
}, []);
```

## 3. useReducer

`useReducer`는 `useState`보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook이다. 리듀서(`reducer`)라는 개념은 이후 `Redux`를 배울 때 더 자세히 알아 볼 것이다.

리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(`action`)값을 전달받아 새로운 상태를 반환하는 함수이다. 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜 줘야 한다.

```js
function reducer(state, action) {
  return { ... }; // 불변성을 지키면서 업데이트한 새로운 상태를 반환한다.
}
```

액션 값은 주로 다음과 같은 형태로 이뤄져 있다.

```js
{
  type: 'INCREMENT',
  // 다른 값들이 필요하다면 추가로 들어감
}
```

이후에 다룰 `Redux`에서 사용하는 액션 객체에는 어떤 액션인지 알려 주는 `type` 필드가 꼭 있어야 하지만, `useReducer`에서 사용하는 액션 객체는 반드시 `type`을 지니고 있을 필요가 없다. 심지어 객체가 아니라 문자열이나 숫자여도 상관없다.

### 3-1. 카운터 구현하기

먼저 `useReducer`를 사용하여 기존의 `Counter` 컴포넌트를 다시 구현해 보자.

> Counter.js

```js
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

const Counter = () => {
  // const [value, setValue] = useState(0);
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>+1</button>
    </div>
  );
};

export default Counter;
```

`useReducer`의 첫 번째 파라미터에는 리듀서 함수(`reducer`)를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값(`value: 0`)을 넣어 준다. 이 Hook을 사용하면 `state` 값과 `dispatch` 함수를 받아 오는데, 여기서 `state`는 현재 가리키고 있는 상태이고 `dispatch`는 액션을 발생시키는 함수이다. `dispatch(action)`과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조이다.

`useReducer`를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직(switch문에 따라 +1, -1 값 조정)을 컴포넌트 바깥으로 빼낼 수 있다는 것이다.

`App`에서 렌더링해주고 브라우저에서 `+1/-1`을 눌러 보자.

<img width="247" alt="스크린샷 2021-02-28 오후 3 14 31" src="https://user-images.githubusercontent.com/61453718/109409620-ab12d600-79d7-11eb-87b2-65e3a8858e37.png">

잘 구현된 것을 볼 수 있다.

### 3-2. 인풋 상태 관리하기

이번엔 `useReducer`를 사용해서 `Info` 컴포넌트에서 인풋 상태를 관리해 볼 것이다. 기존에는 인풋이 여러 개여서 `useState`를 여러 번 사용했었는데, `useReducer`를 사용하면 기존에 클래스형 컴포넌트에서 `input` 태그에 `name` 값을 할당하고 `e.target.name`을 참조하여 `setState`를 해 준 것과 유사한 방식으로 작업을 처리할 수 있다. 기존에 `useState`와 `useEffect`를 써서 작성했던 컴포넌트를 `useReducer`를 통해 아래와 같이 수정해 보자.

> Info.js

```js
import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Info = () => {
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
        <input name="name" value={name} onChange={onChamge} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

`useReducer`에서 액션은 그 어떤 값도 사용할 수 있다. 그래서 이번에는 이벤트 객체가 지니고 있는 `e.target` 값 자체를 액션 값으로 사용했다. 이런 식으로 인풋을 관리하면 아무리 인풋의 개수가 많아져도 코드를 짧고 깔끔하게 유지할 수 있다.

<img width="336" alt="스크린샷 2021-02-28 오후 3 24 16" src="https://user-images.githubusercontent.com/61453718/109409807-072a2a00-79d9-11eb-8e2b-65f02a3d6bfb.png">

`App`에서 `Info`를 렌더링한 후 구동 결과 `useReducer`를 활용하여 한층 직관적인 형태로 구현되었다.

## 4. useMemo

`useMemo`를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다. 먼저 리스트에 숫자를 추가하면 추가된 숫자들의 평균을 보여 주는 함수형 컴포넌트를 작성해 보자.

> Average.js

```js
import React, { useState } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b>
        {getAverage(list)}
      </div>
    </div>
  );
};

export default Average;
```

이후 `App`에서 해당 컴포넌트를 렌더링하면

<img width="501" alt="스크린샷 2021-02-28 오후 4 15 13" src="https://user-images.githubusercontent.com/61453718/109410708-24aec200-79e0-11eb-8855-238732e7b490.png">

평균값이 바로바로 잘 출력된다. 그런데, 숫자를 등록할 때뿐만 아니라 인풋 내용이 수정될 때도 우리가 만든 `getAverage` 함수가 호출되는 것을 확인할 수 있다. 인풋 내용이 바뀔 때는 평균값을 다시 계산할 필요가 없는데, 이렇게 렌더링할 때마다 계산하는 것은 낭비이다.

`useMemo` Hook을 이용하면 이러한 작업을 최적화할 수 있다. 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식이다.

> Averge.js

```js
import React, { useState, useMemo } from 'react';
(...)
const Average = () => {
  (...)
  const avg = useMemo(() => getAverage(list), [list]);
  return (
    (...)
    <div>
      <b>평균값: </b>{avg}
    </div>
    (...)
  );
};
```

<img width="498" alt="스크린샷 2021-02-28 오후 4 20 45" src="https://user-images.githubusercontent.com/61453718/109410799-eb2a8680-79e0-11eb-9910-41b8c8dd5523.png">

이제 `list` 배열의 내용이 아닌 `getAverage` 함수가 호출된다.

## 5. useCallback

`useCallback`은 `useMemo`와 상당히 비슷한 함수이다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데, 이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.

`Average.js`를 보자. `onChange`와 `onInsert`라는 함수를 선언해 주었는데, 이렇게 선언하면 컴포넌트가 리렌더링될 때마다 이 함수들이 새로 생성된다. 대부분의 경우 이러한 방식은 문제가 없지만, 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화해 주는 것이 좋다.

`useCallback`을 사용하여 최적화해 보자.

> Average.js

```js
import React, { useState, useMemo, useCallback } from 'react';

const getAverge = number => {
  (...)
}

const Average = () => {
  (...)
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber("");
    },
    [number, list]
  ); // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list, [list]);
  return (
    (...)
  );
};

export default Average;
```

`useCallback`의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고(`(e) => {}`), 두 번째 파라미터에는 배열을 넣으면 된다(`}, []);`) 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 한다. (`[number, list]`: number 혹은 list가 바뀌었을 떄만 함수 생성)

`onChange`처럼 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한 번만 함수가 생성되며, `onInsert`처럼 배열 안에 `number`와 `list`를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때마다 함수가 생성된다.

함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 줘야 한다. 예를 들어 `onChange`의 경우 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 배열이 비어 있어도 상관없지만, `onInsert`는 기존의 `number`와 `list`를 조회해서 `nextList`를 생성하기 때문에 배열 안에 `number`와 `list`를 꼭 넣어 줘야 한다.

참고로 다음의 두 코드는 완전히 똑같은 코드이다. `useCallback`은 결국 `useMemo`로 함수를 반환하는 상황에서 더 편하게 사용할 수 있는 Hook이다. 숫자, 문자열, 객체처럼 일반 값을 사용하려면 `useMemo`를 사용하고, 함수를 재사용하려면 `useCallback`을 사용하자.

> 예시 코드

```js
useCallback(() => {
  console.log('hello world!');
}. []);

useMemo(() => {
  const fn = () => {
    console.log('hello world!');
  };
  return fn;
}. []);
```

## 6. useRef

`useRef` Hook은 함수형 컴포넌트에서 `ref`를 쉽게 사용할 수 있도록 해 준다. `Average` 컴포넌트에서 <b>등록</b>버튼을 눌렀을 때 포커스가 인풋 쪽으로 넘어가도록 코드를 작성해 볼 것이다.

> Average.js

```js
import React, { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber("");
      inputEl.current.focus();
    },
    [number, list]
  ); // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
```

`useRef`를 사용하여 `ref`를 설정하면, `useRef`를 통해 만든 객체 안의 `current` 값이 실제 엘리먼트를 가리킨다.

<img width="278" alt="스크린샷 2021-02-28 오후 4 41 46" src="https://user-images.githubusercontent.com/61453718/109411221-da2f4480-79e3-11eb-9b0c-aedf64357b62.png">

결과를 보면, 등록 버튼을 누른 후 커서가 자동으로 인풋 박스 내에 위치하게 된다.

### 6-1. 로컬 변수 사용하기

추가로 컴포넌트 로컬 변수를 사용해야 할 때도 `useRef`를 활용할 수 있다. 여기서 로컬 변수란 렌더링과 상관없이 바뀔 수 있는 값을 의미한다. 클래스 형태로 작성된 컴포넌트의 경우에는 로컬 변수를 사용해야 할 때 다음과 같이 작성할 수 있다.

> 예시 코드

```js
import React, { Component } from "react";

class MyComponent extends Component {
  id = 1;
  setId = (n) => {
    this.id = n;
  };
  printId = () => {
    console.log(this.id);
  };
  render() {
    return <div>MyComponent</div>;
  }
}

export default MyComponent;
```

이러한 코드를 함수형 컴포넌트로 작성한다면 다음과 같이 할 수 있다.

> 에시 코드

```js
import React, { useRef } from "react";

const RefSample = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  };
  const printId = () => {
    console.log(id.current);
  };
  return <div>refsample</div>;
};

export default RefSample;
```

이렇게 `ref` 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의해야 한다. 렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성하자.

## 7. 커스텀 Hooks 만들기

여러 컴포넌트에서 비슷한 기능을 공유할 경우, 이를 각자만의 Hook으로 작성하여 로직을 재사용할 수 있다.

기존에 `Info` 컴포넌트에서 여러 개의 인풋을 관리하기 위해 `useReducer`로 작성했던 로직을 `useInputs`라는 Hook으로 따로 분리해 보자.

> useInput.js

```js
import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

그리고 이 Hook을 `Info` 컴포넌트에서 사용해 보자.

> Info.js

```js
import React, { useReducer } from "react";
import useInputs from "./useInputs";

// function reducer(state, action) {
//   return {
//     ...state,
//     [action.name]: action.value,
//   };
// }

const Info = () => {
  // const [state, dispatch] = useReducer(reducer, {
  //   name: "",
  //   nickname: "",
  // });
  // const { name, nickname } = state;
  // const onChange = (e) => {
  //   dispatch(e.target);
  // };

  const [state, onChange] = useInputs({
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;
  return (
    (...)
  );
};
```

`reducer` 함수와 `Info` 컴포넌트 내 여러 코드가 사라지고 제일 아래 `useInputs` Hook을 불러온 코드로 변경되었다. 훨씬 깔끔해지지 않았는가?

## 8. 다른 Hooks

이번에 커스텀 Hooks를 만들어서 사용했던 것처럼, 다른 개발자가 만든 Hooks도 라이브러리로 설치하여 사용할 수 있다.

다른 개발자가 만든 다양한 Hooks 리스트는 다음 링크에서 확인할 수 있다:

- https://nikgraf.github.io/react-hooks/
- https://github.com/rehooks/awesome-react-hooks

## 9. 정리

리액트에서 Hooks 패턴을 사용하면 클래스형 컴포넌트를 작성하지 않고도 대부분의 기능을 구현할 수 있다. 이러한 기능이 리액트에 릴리즈되었다고 해서 기존의 `setState`를 사용하는 방식이 잘못된 것은 아니다. 물론 `useState` 혹은 `useReducer`를 통해 구현할 수 있더라도 말이다.

리액트 매뉴얼에 따르면, 기존의 클래스형 컴포넌트는 앞으로도 계속해서 지원될 예정이다. 그렇기 때문에 만약 유지 보수하고 있는 프로젝트에서 클래스형 컴포넌트를 사용하고 있다면, 이를 굳이 함수형 컴포넌트와 Hooks를 사용하는 형태로 전환할 필요는 없다. 다만, 매뉴얼에서는 새로 작성하는 컴포넌트의 경우 함수형 컴포넌트와 Hooks를 사용할 것을 권장하고 있다. 앞으로 각자 프로젝트를 개발할 때는 함수형 컴포넌트의 사용을 첫 번째 옵션으로 두고, 꼭 필요한 상황에서만 클래스형 컴포넌트를 구현하자.
