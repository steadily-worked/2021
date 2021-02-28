<리액트를 다루는 기술>을 요약하고 동시에 제 나름대로의 생각이 담겨 있는 글입니다.

# Redux

리덕스는 가장 많이 사용하는 리액트 상태 관리 라이브러리이다. 리덕스를 사용하면 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜서 더욱 효율적으로 관리할 수 있다. 또한, 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태 값을 전달하거나 업데이트할 수 있다. 리덕스를 이해하기 위해선 우선 Flux라는, 리덕스의 기반이 되는 개념을 알아야 한다. [여기](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/)에서 Flux에 대한 개념을 최대한 쉽게 풀어서 설명하고 있으므로 먼저 보고 오는 것을 추천한다.

리덕스 라이브러리는 전역 상태를 관리할 때 굉장히 효과적이다. 물론 리덕스를 사용하는 것이 유일한 해결책은 아니다. Context API를 통해서도 똑같은 작업을 할 수 있다. 리액트 `v16.3`이 릴리즈되면서 Context API가 개선되기 전에는 사용 방식이 매우 불편했기 때문에 주로 리덕스를 사용해 전역 상태 관리를 해 왔다.

단순히 전역 상태 관리만 한다면 Context API를 사용하는 것만으로도 충분하다. 하지만 리덕스를 사용하면 상태를 더욱 체계적으로 관리할 수 있기 때문에 프로젝트의 규모가 클 경우에는 리덕스를 사용하는 편이 좋다. 코드의 유지 보수성도 높여 주고 작업 효율도 극대화해 주기 때문이다. 추가로 아주 편리한 개발자 도구도 지원하며, 미들웨어라는 기능을 제공하여 비동기 작업을 훨씬 효율적으로 관리할 수 있게 해 주기도 한다.

`핵심 키워드 알아보기` -> `Parcel로 프로젝트 구성하기` -> `토글 스위치와 카운터 구현하기`의 흐름으로 진행한다.

## 1. 개념 미리 정의하기

앞으로 리덕스를 사용하면서 접하게 될 키워드의 개념을 우선 간략하게 알아 볼 것이다. 도중에 잘 이해되지 않는 내용은 나중에 직접 사용해 본 다음 돌아와서 다시 읽으면 더욱 잘 이해될 것이다.

### 1-1. 액션

상태에 어떠한 변화가 필요하면 액션(`action`)이란 것이 발생한다. 이는 하나의 객체로 표현되는데, 액션 객체는 다음과 같은 형식으로 이뤄져 있다.

```js
{
  type: "TOGGLE_VLAUE";
}
```

액션 객체는 `type` 필드를 반드시 갖고 있어야 한다. 이 값을 액션의 이름이라고 생각하면 된다. 그리고 그 외의 값들은 나중에 상태 업데이트를 할 때 참고해야 할 값이며, 작성자 마음대로 넣을 수 있다. 예시 액션을 보자.

```js
{
  type: 'ADD_TODO',
  data: {
    id: 1,
    text: 'Redux 학습'
  }
}

{
  type: 'CHANGE_INPUT',
  text: '안녕하세요'
}
```

### 1-2. 액션 생성 함수

액션 생성 함수(`action creator`)는 액션 객체를 만들어 주는 함수이다.

```js
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

// 화살표 함수 이용
const changeInput = (text) => ({
  type: "CHANGE_INPUT",
  text,
});
```

어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있다. 이러한 일을 방지하기 위해 이를 함수로 만들어서 관리한다.

### 1-3. 리듀서

리듀서(`reducer`)는 변화를 일으키는 함수이다. 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 온다. 그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해 준다.

리듀서는 다음과 같은 형태로 이뤄져 있다.

```js
const initialState = {
  counter: 1,
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}
```

### 1-4. 스토어

프로젝트에 리덕스를 적용하기 위해 스토어(`store`)를 만든다. 한 개의 프로젝트는 단 하나의 스토어만 가질 수 있다. 스토어 안에는 현재 어플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇가지 중요한 내장 함수를 지닌다.

### 1-5. 디스패치

디스패치(`dispatch`)는 스토어의 내장 함수 중 하나이다. 디스패치는 **'액션을 발생시키는 것'**이라고 이해하면 된다. 이 함수는 `dispatch(action)`과 같은 형태로 액션 객체를 파라미터로 넣어서 호출한다.

이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 준다.

### 1-6. 구독

구독(`subscribe`)도 스토어의 내장 함수 중 하나이다. `subscribe` 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면, 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출된다.

```js
const listener = () => {
  console.log("상태가 업데이트됨");
};

const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```

## 2. 리액트 없이 쓰는 리덕스

리덕스는 리액트에 종속되는 라이브러리가 아니다. 리액트에서 사용하려고 만들어졌지만실제로 다른 UI 라이브러리/프레임워크와 함께 사용할 수도 있다(ex: `angular-redux`, `ember redux`, `Vue`에서도 사용할 수 있지만, `Vue`에서는 리덕스와 유사한 `vuex`를 주로 사용한다).

리덕스는 바닐라(`vanilla`) 자바스크립트와 함께 사용할 수도 있다. 바닐라 자바스크립트는 라이브러리나 프레임워크 없이 사용하는 순수 자바스크립트 그 자체를 의미한다.

이번에는 바닐라 자바스크립트 환경에서 리덕스를 사용하여 리덕스의 핵심 기능과 작동 원리를 이해해 볼 것이다.

### 2-1. Parcel로 프로젝트 만들기

프로젝트를 구성하기 위해 `Parcel`이라는 도구를 사용할 것이다. 이 도구를 사용하면 아주 쉽고 빠르게 웹 어플리케이션 프로젝트를 구성할 수 있다.

먼저 `$ yarn global add parcel-bundler`을 통해 `parcel-bundler`을 설치하자. 내 맥북의 경우는 `yarn`으로 한 결과 실행이 되지 않아서 `npm`으로 설치했다.
이후

```py
# package.json 파일 생성
npm init -y
```

`package.json` 파일을 생성한 후

> index.html

````html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="index.css" />
  </head>
  <body>
    <div class="toggle"></div>
    <hr />
    <h1>0</h1>
    <button id="increase">+1</button>
    <button id="decrease">-1</button>
    <script src="./index.js"></script>
  </body>
</html>
``` > index.js ```js console.log("hello parcel");
````

이렇게 해준 뒤 `parcel index.html`을 실행하면 개발용 서버가 실행된다. 개발 서버의 주소는 `http://localhost:1234/`이며, 파일을 저장할 때마다 자동으로 새로고침된다. 이후 `npm add redux`로 리덕스 모듈을 설치한다.

### 2-2. 간단한 UI 구성하기

> index.css

```css
.toggle {
  border: 2px solid black;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  box-sizing: border-box;
}

.toggle.active {
  background: yellow;
}
```

<img width="301" alt="스크린샷 2021-02-27 오후 3 47 49" src="https://user-images.githubusercontent.com/61453718/109378101-26f71a80-7913-11eb-8a8a-446d3c29506e.png">

이와 같이 간단한 UI를 구성했다.

### 2-3. DOM 레퍼런스 만들기

이번 프로젝트에서는 UI를 관리할 때 별도의 라이브러리를 사용하지 않기 때문에 DOM을 직접 수정해 줘야 한다. 다음과 같이 자바스크립트 파일 상단에 수정할 DOM 노드를 가리키는 값을 미리 선언해 준다.

> index.js

```js
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");
```

### 2-4. 액션 타입과 액션 생성 함수 정의

프로젝트의 상태에 변화를 일으키는 것을 액션이라고 한다. 먼저 액션에 이름을 정의해 준다. 액션 이름은 문자열 형태로, 주로 대문자로 학성하며 액션 이름은 고유해야 한다. 이름이 중복되면 의도치 않은 결과가 발생할 수 있기 때문이다.

> index.js

```js
(...)

const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
```

다음으로, 이 액션 이름을 사용하여 액션 객체를 만드는 액션 생성 함수를 작성해 준다. 액션 객체는 `type`값을 반드시 갖고 있어야 하며, 그 외에 추후 상태를 업데이트할 때 참고하고 싶은 값은 마음대로 넣을 수 있다.

> index.js

```js
(...)

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });
```

### 2-5. 초깃값 설정

이 프로젝트에서 사용할 초깃값을 정의해 줄 것이다. 초깃값의 형태는 자유이다. 숫자일 수도, 문자열일 수도, 객체일 수도 있다.

> index.js

```js
(...)

const initialState = {
  toggle: false,
  counter: 0
};
```

### 2-6. 리듀서 함수 정의

리듀서는 변화를 일으키는 함수이다. 함수의 파라미터로는 `state`와 `action` 값을 받아 온다.

> index.js

```js
(...)

// state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지를 해 줘야 함
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
```

리듀서 함수가 맨 처음 호출될 때는 `state` 값이 `undefined`이다. 해당 값이 `undefined`로 주어졌을 때는 `initialState`를 기본값으로 설정하기 위해 함수의 파라미터 쪽에 기본값이 설정되어 있다.

리듀서에서는 상태의 불변성을 유지하면서 데이터에 변화를 일으켜 줘야 한다. 이 작업을 할 때 `spread`연산자(`...`)를 사용하면 편하다. 단, 객체의 구조가 복잡해지면(ex. `object.something.inside.value`)`spread` 연산자로 불변성을 관리하며 업데이트하는 것이 굉장히 번거로울 수 있고, 코드의 가독성 또한 나빠지기 때문에 리덕스의 상태는 최대한 깊지 않은 구조로 진행하는 것이 좋다.

객체의 구조가 복잡해지거나 배열도 함께 다루는 경우 `immer` 라이브러리를 사용하면 좀 더 쉽게 리듀서를 작성할 수 있다.

### 2-7. 스토어 만들기

이제 스토어를 만들어 볼 것이다. 스토어를 만들 때는 `createStore` 함수를 사용한다. 이 함수를 사용하려면 코드 상단에 `import` 구문을 넣어 리덕스에서 해당 함수를 불러와야 하고, 함수의 파라미터에는 리듀서 함수를 넣어줘야 한다.

> index.js

```js
import { createStore } from 'redux';

(...)

const store = createStore(reducer);
```

이제 스토어를 생성했으므로, 스토어 내장 함수들을 사용해 줄 차례이다.

### 2-8. render 함수 만들기

`render`라는 함수를 작성해 볼 것이다. 이 함수는 상태가 업데이트될 때마다 호출되며, 리액트의 `render` 함수와는 다르게 이미 `html`을 사용하여 만들어진 UI의 속성을 상태에 따라 변경해 준다.

> index.js

```js
(...)

// 스토어
const store = createStore(reducer);

// render 함수
const render = () => {
  const state = store.getState(); // 현재 상태 불러오기
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.removce("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();
```

### 2-9. 구독하기

이제 스토어의 상태가 바뀔 때마다 방금 만든 `render` 함수가 호출되도록 해 줄 것이다. 이 작업은 스토어의 내장 함수 `subscribe`를 사용해 수행할 수 있다.

`subscribe` 함수의 파라미터로는 함수 형태의 값을 전달해 준다. 이렇게 전달된 함수는 추후 액션이 발생하여 상태가 업데이트될 때마다 호출된다.

> 예시 코드

```js
const listener = () => {
  console.log("상태 업데이트됨");
};
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```

이번 프로젝트에서는 `subscribe` 함수를 직접 사용하지만, 추후 리액트 프로젝트에서 리덕스를 사용할 때는 이 함수를 직접 사용하지 않을 것이다. 왜냐하면, 컴포넌트에서 리덕스 상태를 조회하는 과정에서 `react-redux`라는 라이브러리가 이 작업을 대신 해주기 때문이다.

이제 상태가 업데이트될 때마다 `render` 함수를 호출하도록 코드를 작성해 볼 것이다.

> index.js

```js
(...)
const render = () => {
  const state = store.getState(); // 현재 상태 불러오기
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();
store.subscribe(render); // 상태 업데이트시 마다 render함수 호출
```

### 2-10. 액션 발생시키기

액션을 발생시키는 것을 디스패치라고 한다. 디스패치를 할 땐 스토어의 내장 함수 `dispatch`를 사용한다. 파라미터는 액션 객체를 넣어 주면 된다.

다음과 같이 각 DOM 요소에 클릭 이벤트를 설정하자. 이벤트 함수 내부에서는 `dispatch` 함수를 사용하여 액션을 스토어에게 전달해 줄 것이다.

> index.js

```js
(...)

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  stire.dispatch(decrease());
};
```

<img width="268" alt="스크린샷 2021-02-27 오후 8 13 51" src="https://user-images.githubusercontent.com/61453718/109385593-51a79a00-7938-11eb-8d03-c9fa2f5ff806.png">

위의 과정이 잘 이뤄졌다면, 이미지와 같이 두 가지가 잘 이뤄져야 한다:

1. 원을 클릭했을 때 색상이 바뀜
2. `+1`과 `-1`을 눌렀을 때 위의 숫자가 변함

## 3. 리덕스의 세 가지 규칙

### 3-1. 단일 스토어

하나의 어플리케이션 안에는 하나의 스토어가 들어 있다. 사실 여러 개의 스토어를 사용하는 것이 완전히 불가능하지는 않다. 특정 업데이트가 너무 빈번하게 일어나거나 어플리케이션의 특정 부분을 완전히 분리시킬 때 여러 개의 스토어를 만들 수도 있지만, 상태 관리가 복잡해질 수 있으므로 권장하지 않는다.

### 3-2. 읽기 전용 상태

리덕스 상태는 읽기 전용이다. 기존에 리액트에서 `setState`를 사용하여 `state`를 업데이트할 때도 객체나 배열을 업데이트하는 과정에서 불변성을 지켜 주기 위해 `spread` 연산자를 사용하거나 `immer`와 같은 불변성 관리 라이브러리를 사용했었는데, 리덕스도 마찬가지이다. 상태를 업데이트할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해 줘야 한다.

리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(`swallow equality`)검사를 하기 때문이다. 객체의 변화를 감지할 때 객체의 깊숙한 안쪽까지 비교하는 것이 아니라 겉핥기 식으로 비교하여 좋은 성능을 유지할 수 있는 것이다.

### 3-3. 리듀서는 순수한 함수

변화를 일으키는 리듀서 함수는 순수한 함수여야 한다. 순수한 함수는 다음 조건을 만족한다:

```
1. 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다.
2. 파라미터 외의 값에는 의존하면 안 된다.
3. 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환한다.
4. 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반한해야 한다.
```

리듀서를 작성할 때는 위 네 가지 사항을 주의해야 한다. 예를 들어 리듀서 함수 내부에서 랜덤 값을 만들거나, `Date` 함수를 사용하여 현재 시간을 가져오거나, 네트워크 요청을 한다면, 파라미터가 같아도 다른 결과를 만들어 낼 수 있기 때문에 사용하면 안 된다. 이러한 작업은 리듀서 함수 바깥에서 처리해 줘야 한다. 액션을 만드는 과정에서 처리해도 되고, 추후 배울 리덕스 미들웨어에서 처리해도 된다. 주로 네트워크 요청과 같은 비동기 작업은 미들웨어를 통해 관리한다.

## 4. 정리

지금까지 리덕스 라이브러리가 어떤 방식으로 작동하는지를 알아봤다. 다음 번에는, 리액트 프로젝트에서 리덕스를 사용하는 방법을 알아볼 텐데, 리덕스 코드를 작성하는 흐름은 이번에 했던 것과 매우 유사하다. 먼저 `액션 타입과 액션 생성 함수를 작성`하고, 이어서 `리듀서를 작성`하고, `스토어`를 만든다. 이번 프로젝트에서는 함수에서 스토어를 구독하는 작업을 직접 해 봤지만, 다음 번에는 `react-redux`라는 라이브러리를 사용하여 스토어의 상태가 업데이트될 때마다 컴포넌트를 리렌더링시켜 줄 것이다.
