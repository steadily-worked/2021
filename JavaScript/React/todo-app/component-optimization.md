이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

# 컴포넌트 성능 최적화

일전에 학습한 지식을 활용하여 멋진 일정 관리 어플리케이션을 만들어 봤다. 현재까지는 이 어플리케이션을 사용할 때 불편하지 않다. 추가되어 있는 데이터가 매우 적기 때문이다. 그러나 데이터가 무수히 많아지면, 어플리케이션이 느려지는 것을 체감할 수 있다.

`많은 데이터 렌더링하기` ➡ `크롬 개발자 도구를 통한 성능 모니터링` ➡ `React.memo를 통한 컴포넌트 리렌더링 성능 최적화` ➡ `onToggle과 onRemove가 새로워지는 현상 방지하기` ➡ `react-virtualized를 사용한 렌더링 최적화`의 흐름으로 진행한다.

## 11-1. 많은 데이터 렌더링하기

우선 실제로 랙(`lag`)을 경험할 수 있도록 많은 데이터를 렌더링해 보자. 물론 데이터를 하나하나 직접 입력하지 않고 코드를 사용하여 쉽게 추가할 것이다.

> App.js

```js
import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';


function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);
  (...)
};

export default App;
```

데이터를 하나하나 직접 입력할 수는 없으므로 createBulkTodos라는 함수를 만들어서 데이터 2,500개를 자동으로 생성했다.

여기서 주의할 점은 useState의 기본값에 함수를 넣어 줬다는 것이다. 여기서 `useState(createBulkTodos())` 라고 작성하면 리렌더링될 때마다 createBulkTodos 함수가 호출되지만, `useState(createBulkTodos)`처럼 파라미터를 함수 형태로 넣어 주면 컴포넌트가 처음 렌더링될 때만 crateBulkTodos 함수가 실행될 것이다.

이제 코드를 저장하면 데이터 2,500개가 나타날 것이다.

2,500개 데이터가 렌더링 되었다면 항목 중 하나를 체크해 보자. 이전에 비해 확실히 느려진 것이 느껴질 것이다.

## 11-2. 크롬 개발자 도구를 통한 성능 모니터링

성능을 분석해야 할 때는 느려졌다는 느낌만으로 충분하지 않다. 정확히 몇 초가 걸리는지 확인해야 하는데, 크롬 개발자 도구의 **Profiler** 탭을 사용해서 측정하면 된다. 크롬 개발자 도구의 **Profiler** 탭을 열면 녹화 버튼이 나타난다.

<img width="892" alt="스크린샷 2021-04-07 오전 10 48 02" src="https://user-images.githubusercontent.com/61453718/113798745-bb646080-978e-11eb-9977-234c61611969.png">

녹화 버튼을 누르고 항목을 체크한 다음, 변화가 반영되면 Stop 버튼을 누르자. 그러면 다음과 같이 성능 분석 결과가 나타난다.

<img width="892" alt="스크린샷 2021-04-07 오전 10 49 42" src="https://user-images.githubusercontent.com/61453718/113798878-f797c100-978e-11eb-877d-075695f0ac5a.png">

`App` 작업이 실행되는데 0.9ms가 걸렸다고 나타났다. 데이터가 2,500개밖에 안되는데도 불구하고 0.9ms나 걸린다는 것은 성능이 좋지 않다는 의미이다. 이제 이를 최적화하는 방법을 알아볼 것이다.

## 11-3. 느려지는 원인 분석

컴포넌트는 다음과 같은 상황에서 리렌더링이 발생한다.

1. 자신이 전달받은 props가 변경될 때
2. 자신의 state가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. `forceUpdate` 함수가 실행될 때

지금 상황을 분석해 보면, `할 일 1` 항목을 체크할 경우 App 컴포넌트의 state가 변경되면서 App 컴포넌트가 리렌더링된다. 부모 컴포넌트가 리렌더링되었으니 TodoList 컴포넌트가 리렌더링되고 그 안의 무수한 컴포넌트들도 리렌더링된다.

`할 일 1` 항목은 리렌더링되어야 하는 것이 맞지만, `할 일 2`부터 `할 일 2500`까지는 리렌더링을 안해도 되는 상황인데 모두 리렌더링되고 있으므로 이렇게 느린 것이다. 컴포넌트의 개수가 많지 않다면 모든 컴포넌트를 리렌더링해도 느려지지 않는데, 지금처럼 약 2,000개가 넘어가면 성능이 저하된다.

이럴 때는 컴포넌트 리렌더링 성능을 최적화해 주는 작업을 해 줘야 한다. 즉, 리렌더링이 불필요할 때는 리렌더링을 방지해 줘야 하는데, 어떻게 방지하는지 알아보자.

## 11-4. React.memo를 사용하여 컴포넌트 성능 최적화

컴포넌트의 리렌더링을 방지할 때는 7장에서 배운 `shouldComponentUpdate`라는 생명주기를 사용하면 된다. 그런데 함수형 컴포넌트에서는 생명주기 메소드를 사용할 수 없다. 그 대신 `React.memo`라는 함수를 사용한다. 컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화해 줄 수 있다.

`React.memo`의 사용법은 매우 간단하다. 컴포넌트를 만들고 나서 감싸 주기만 하면 된다. TodoListItem 컴포넌트에 다음과 같이 React.memo를 적용해보자.

> TodoListItem.js

```js
(...)

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  (...)
};

export default React.memo(TodoListItem);
```

정말 간단하다. 이제 TodoListItem 컴포넌트는 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 하지 않는다.

## 11-5. onToggle, onRemove 함수가 바뀌지 않게 하기

React.memo를 사용하는 것만으로 컴포넌트 최적화가 끝나지는 않는다. 현재 프로젝트에서는 todos 배열이 업데이트되면 onRemove와 onToggle 함수도 새롭게 바뀌기 때문이다. onRemove와 onToggle 함수는 배열 상태를 업데이트하는 과정에서 최신 상태의 todos를 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어진다. 이렇게 함수가 계속 만들어지는 상황을 방지하는 방법은 두 가지이다. 첫 번째 방법은 useState의 함수형 업데이트 기능을 사용하는 것이고, 두 번째 방법은 useReducer를 사용하는 것이다.

### 11-5-1. useState의 함수형 업데이트

기존에 setTodos 함수를 사용할 때는 새로운 상태를 파라미터로 넣어 줬다. setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣을 수도 있다. 이를 함수형 업데이트라고 부른다.

예시를 보자.

```js
const [number, setNumber] = useState(0);
// prevNumbers는 현재 number 값을 가리킨다.
const onIncrease = useCallback(
  () => setNumber((prevNumber) => prevNumber + 1),
  []
);
```

`setNumber(number+1)`을 업데이트하는 게 아니라, 위 코드처럼 어떻게 업데이트할지 정의해 주는 업데이트 함수를 넣어준다. 그러면 useCallback을 사용할 때 두 번째 파라미터로 넣는 배열에 number를 넣지 않아도 된다.

그럼 이제 onToggle, onRemove 함수에서 useState의 함수형 업데이트를 사용해 보자. 이 과정에서 onInsert 함수도 함께 수정할 것이다.

> App.js

```js
import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
```

setTodos를 사용할 때 그 안에 `todos =>` 만 앞에 넣어주면 된다. 정말 간단하지 않은가??

<img width="268" alt="스크린샷 2021-04-07 오전 11 19 08" src="https://user-images.githubusercontent.com/61453718/113801073-139d6180-9793-11eb-9705-42271141e031.png">

성능 측정 결과 0.9ms에서 0.3ms로 줄었다.

### 11-5-2. useReducer 사용하기

useState의 함수형 업데이트를 사용하는 대신, useReducer를 사용해도 onToggle과 onRemove가 계속 새로워지는 문제를 해결할 수 있다.

코드를 다음과 같이 고쳐보자.

> App.js

```js
import React, { useReducer, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}
// todoReducer 함수 안에 switch 문을 이용해 기존에 가졌던 기능을 싹다 몰아넣기.
function todoReducer(todos, action) {
  switch (action.type) {
    case "INSERT": // 새로 추가
      // {type: 'INSERT', todo: {id: 1, text: 'todo', checked: false }}
      return todos.concat(action.todo);
    case "REMOVE": // 제거
      // { type: "REMOVE", id: 1 }
      return todos.filter((todo) => todo.id !== action.id);
    case "TOGGLE": // 토글
      // { type: 'REMOVE', id: 1}
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // setTodos((todos) => todos.concat(todo));
    dispatch({ type: "INSERT", todo });
    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  const onRemove = useCallback((id) => {
    // setTodos((todos) => todos.filter((todo) => todo.id !== id));
    dispatch({ type: "REMOVE", id });
  }, []);

  const onToggle = useCallback((id) => {
    // setTodos((todos) =>
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, checked: !todo.checked } : todo
    //   )
    // );
    dispatch({ type: "TOGGLE", id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
```

useReducer를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어 줘야 한다. 지금은 그 대신 두 번째 파라미터에 undefined를 넣고, 세 번째 파라미터에 초기 상태를 만들어 주는 함수인 createBulkTodos를 넣어 줬는데, 이렇게 하면 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출된다.

useReducer를 사용하는 방법은 기존 코드를 많이 고쳐야 한다는 단점이 있지만, 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있다. 성능상으로는 두 가지 방법이 비슷하기 때문에 어떤 방법을 선택할지는 취향에 따라 결정하면 된다.

## 11-6. 불변성의 중요성

리액트 컴포넌트에서 상태를 업데이트할 때 불변성을 지키는 것은 매우 중요하다. 앞에서 useState를 사용해 만든 onToggle 함수를 다시 확인해 보자.

```js
const onToggle = useCallback((id) => {
  setTodos((todos) =>
    todos.map(
      (todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)
      // todo.id와 같으면 todo를 복사해온 뒤에 기존의 checked 되어있는 것의 부정형으로 checked를 설정. 그러니까 만약 체크가 안되어 있었다면 체크해주고 되어 있었다면 풀어주고. 그리고 todo.id와 다르면 todo 그대로.
    )
  );
}, []);
```

기존 데이터를 수정할 때 직접 수정하지 않고, 새로운 배열을 만든 다음에 새로운 객체를 만들어서 필요한 부분을 교체해 주는 방식으로 구현했다. 업데이트가 필요한 곳에서는 아예 새로운 배열 혹은 새로운 객체를 만들기 때문에, React.memo를 사용했을 때 props가 바뀌었는지 혹은 바뀌지 않았는지를 알아내서 리렌더링 성능을 최적화해 줄 수 있다.

이렇게 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 **'불변성을 지킨다'**고 한다. 다음 예시 코드는 불변성을 어떻게 지키고 있는지 생각해 보자.

> 예시 코드

```js
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킨다.
nextArrayBad[0] = 100;
console.log((array = nextArrayBad)); // 완전히 같은 배열이기 때문에 true

const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사한다.
nextArrayGood[0] = 100;
console.log(array === nextArrayGood); // 다른 배열이기 때문에 false

const object = {
  foo: "bar",
  value: 1,
};

const nextObjectBad = object; // 객체가 복사되지 않고 똑같은 객체를 가리킨다.
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

const nextObjectGood = {
  ...object, // 기존에 있던 내용을 모두 복사해서 넣는다.
  value: object.value + 1, // 새로운 값을 덮어 쓴다.
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false
```

불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못한다. 그러면 React.memo에서 서로 비교하여 최적화하는 것이 불가능해진다.

추가로 전개 연산자(`...` 문법)를 사용하여 객체나 배열 내부의 값을 복사할 때는 얕은 복사(shallow copy)를 하게 된다. 즉, 내부의 값이 완전히 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사된다. 따라서 내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해 줘야 한다. 다음 코드를 읽어보면 쉽게 이해될 것이다.

> 예시 코드

```js
const todos = [
  { id: 1, checked: true },
  { id: 2, checked: true },
];
const nextTodos = [...todos];

nextTodos[0].checked = false;
console.log(todos[0] === nextTodos[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true이다.

nextTodos[0] = {
  ...nextTodos[0],
  checked: false,
};
console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 줬으므로 false
```

만약 객체 안에 있는 객체라면 불변성을 지키면서 새 값을 할당해야 하므로 다음과 같이 해줘야 한다.

> 예시 코드

```js
const nextComplexObject = {
  ...complexObject,
  objectInside: {
    ...complexObject.objectInside,
    enabled: false,
  },
};
console.log(complexObject === nextComplexObject); // false
console.log(complexObject.objectInside === nextComplexObject.objectInside); // false
```

배열 혹은 객체의 구조가 정말 복잡해진다면 이렇게 불변성을 유지하면서 업데이트하는 것도 까다로워진다. 이렇게 복잡한 상황일 경우 immer라는 라이브러리의 도움을 받으면 정말 편하게 작업할 수 있는데, 이는 다음 장에서 알아본다.

## 11-7. TodoList 컴포넌트 최적화하기

리스트에 관련된 컴포넌트를 최적화할 때는 리스트 내부에서 사용하는 컴포넌트도 최적화해야 하고, 리스트로 사용되는 컴포넌트 자체도 최적화해 주는 것이 좋다.

TodoList 컴포넌트를 다음과 같이 수정해보자.

> TodoList.js

```js
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (...);
};

export default React.memo(TodoList);
```

위 최적화 코드는 현재 프로젝트 성능에 전혀 영향을 주지 않는다. 왜냐하면, TodoList 컴포넌트의 부모 컴포넌트인 App 컴포넌트가 리렌더링되는 유일한 이유가 todos 배열이 업데이트될 때이기 때문이다. 즉, 지금 TodoList 컴포넌트는 불필요한 리렌더링이 발생하지 않는다. 하지만 App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트될 때는 TodoList 컴포넌트가 불필요한 리렌더링을 할 수도 있을 것이다. 그렇기 때문에 지금 React.memo를 사용해서 미리 최적화해 준 것이다.

리스트 관련 컴포넌트를 작성할 때는 리스트 아이템과 리스트, 이 두 가지 컴포넌트를 최적화해 주는 것을 잊지 말자. 그러나 내부 데이터가 100개를 넘지 않거나 업데이트가 자주 발생하지 않는다면, 이런 최적화 작업을 반드시 해 줄 필요는 없다.

## 11-8. react-virtualized를 사용한 렌더링 최적화

지금까지 리액트 컴포넌트 리렌더링 성능을 최적화하는 방법을 알아봤다. 리렌더링 성능을 최적화할 때는 필요할 때만 리렌더링하도록 설정해 주었는데, 이번에는 또 다른 렌더링 성능 최적화 방법을 알아볼 것이다. 일정 관리 애플리케이션에 초기 데이터가 2,500개 등록되어 있는데, 실제 화면에 나오는 항목은 아홉 개뿐이다. 나머지는 스크롤해야만 볼 수 있다.

현재 컴포넌트가 맨 처음 렌더링될 때 2,500개 컴포넌트 중 2,491개 컴포넌트는 스크롤하기 전에는 보이지 않음에도 불구하고 렌더링이 이뤄진다. 꽤 비효율적이다. 그리고 나중에 todos 배열에 변동이 생길 때도 TodoList 컴포넌트 내부의 map 함수에서 배열의 처음부터 끝까지 컴포넌트로 변환해 주는데, 이 중에서 2,491개는 보이지 않으므로 시스템 자원 낭비이다.

이번 절에서 배울 react-virtualized를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있다. 그리고 만약 스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스럽게 렌더링시킨다. 이 라이브러리를 사용하면 낭비되는 자원을 아주 쉽게 아낄 수 있다.

### 11-8-1. 최적화 준비

우선 yarn을 이용하여 설치해 주자.

```
yarn add react-virtualized
```

이제 본격적으로 react-virtualized를 사용하여 최적화해 보자! react-virtualized에서 제공하는 List 컴포넌트를 사용하여 TodoList 컴포넌트의 성능을 최적화할 것이다.

최적화를 수행하려면 사전에 먼저 해야 하는 작업이 있는데, 바로 각 항목의 실제 크기를 px 단위로 알아내는 것이다. 이 값은 우리가 작성한 CSS를 확인해서 직접 계산해도 되지만, 이보다 훨씬 더 편리하게 알아낼 수 있다. 크롬 개발자 도구의 좌측 상단에 있는 아이콘을 눌러서 크기를 알고 싶은 항목에 커서를 대 보자.

<img width="895" alt="스크린샷 2021-04-07 오후 1 01 54" src="https://user-images.githubusercontent.com/61453718/113808658-70077d80-97a1-11eb-9ca9-9d3952e28af7.png">

각 항목의 크기는 가로 512px, 세로 57px이다. 크기를 알아낼 때 두 번쨰 항목을 확인해야 하는데, 두 번째 항목부터 테두리가 포함되어 있기 때문이다. (첫 번째 항목은 테두리가 없으므로 56px이다.)

### 11-8-2. TodoList 수정

크기를 알아냈다면 이제 TodoList 컴포넌트를 다음과 같이 수정해 주자.

> TodoList.js

```js
import React, { useCallback } from "react";
import { List } from "react-virtualized";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );

  return (
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: "none" }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};

export default React.memo(TodoList);
```

List 컴포넌트를 사용하기 위해 rowRenderer라는 함수를 새로 작성해 줬다. 이 함수는 react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하며, 이 함수를 List 컴포넌트의 props로 설정해 줘야 한다. 이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아 와서 사용한다.

List 컴포넌트를 사용할 때는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때 사용해야 하는 함수, 그리고 배열을 props로 넣어 줘야 한다. 그러면 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화해 준다.

### 11-8-3. TodoListItem 수정

TodoList를 저장하고 나면 스타일이 깨져서 나타날 텐데 TodoListItem 컴포넌트를 다음과 같이 수정하면 해결된다.

> TodoListItem.js

```js
import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import cn from "classnames";
import "./TodoListItem.scss";

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;

  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        <div
          className={cn("checkbox", { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default React.memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo
);
```

render 함수에서 기존에 보여 주던 내용을 div로 한 번 감싸고, 해당 div에는 TodoListItem-virtualized라는 className을 설정하고, props로 받아 온 style을 적용시켜 줬다.

여기서 TodoListItem-virtualized라는 클래스를 만든 것은 컴포넌트 사이사이에 테두리를 제대로 쳐 주고, 홀수 번째 / 짝수 번째 항목에 다른 배경 색상을 설정하기 위해서이다.

그다음에는 TodoListItem의 스타일 파일에서 최하단에 있던 `& + &`을 사용하여, TodoListItem 사이사이에 테두리를 설정했던 코드와 `&:nth-child(even)`을 사용하여 다른 배경 색상을 주는 코드를 지우고, 코드 최상단에 다음의 코드를 삽입해 주자.

> TodoListItem.scss

```scss
.TodoListItem-virtualized {
  & + & {
    border-top: 1px solid #dee2e6;
  }
  &:nth-child(even) {
    background: #f8f9fa;
  }
}

(...)
```

## 11-9. 정리

이 장에서는 리액트 애플리케이션에 많은 데이터를 렌더링하는 리스트를 만들어 지연을 유발해 보고, 이를 해결하는 방법을 알아봤다. 리액트 컴포넌트의 렌더링은 기본적으로 빠르기 때문에 컴포넌트를 개발할 때 최적화 작업에 대해 너무 큰 스트레스를 받거나 모든 컴포넌트에 일일이 React.memo를 작성할 필요는 없다. 단, 리스트와 관련된 컴포넌트를 만들 때 보여 줄 항목이 100개 이상이고 업데이트가 자주 발생한다면, 이 장에서 학습한 방식을 사용하여 꼭 최적화하길 바란다.
