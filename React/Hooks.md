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
