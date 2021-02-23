이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

# 컴포넌트 반복

웹 어플리케이션을 만들다 보면 다음과 같이 반복되는 코드를 작성할 때가 있다. 다음 코드를 보자.

> IterationSample.js

```js
import React from "react";

const IterationSample = () => {
  return (
    <ul>
      <li>눈사람</li>
      <li>얼음</li>
      <li>눈</li>
      <li>바람</li>
    </ul>
  );
};

export default IterationSample;
```

코드에서 `<li>...</li>`의 형태가 계속 반복되는 것을 볼 수 있다.

지금은 `li`태그 하나뿐이라 그렇게 문제가 되지는 않을 것 같다. 하지만 코드가 좀 더 복잡하다면 어떨까? 코드의 양은 더더욱 늘어날 것이며, 파일 용량도 쓸데없이 증가할 것이다. 이는 낭비이다. 또 보여 줘야 할 데이터가 유동적이라면 이런 코드로는 절대 관리할 수 없다.

여기서는 리액트 프로젝트에서 반복적인 내용을 효율적으로 보여주고 관리하는 방법을 알아 볼 것이다.

## 자바스크립트 배열의 map() 함수

자바스크립트 배열 객체의 내장 함수인 `map` 함수를 사용하여 반복되는 컴포넌트를 렌더링할 수 있다. `map` 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 반환한 후 그 결과로 새로운 배열을 생성한다.

### 문법

```js
arr.map(callback, [thisArg]);
```

이 함수의 파라미터는 다음과 같다:

    * `Callback`: 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음의 세 가지이다:
        * currentValue: 현재 처리하고 있는 요소
        * index: 현재 처리하고 있는 요소의 index 값
        * array: 현재 처리하고 있는 원본 배열
    * `thisArg`(선택 항목): `callback` 함수 내부에서 사용할 `this` 레퍼런스

### 예제

`map` 함수를 사용하여 배열 `[1, 2, 3, 4, 5]`의 각 요소를 제곱해서 새로운 배열을 생성하자.

```js
var numbers = [1, 2, 3, 4, 5];

var processed = numbers.map(function (num) {
  return num * num;
});

console.log(processed);
```

결과로 `[1, 4, 9, 16, 25]`가 나온다. 각 숫자를 제곱한 값이 배열에 새로 들어간 것이다.

이처럼 `map` 함수는 기존 배열로 새로운 배열을 만드는 역할을 한다. 이 코드를 ES6 문법으로 작성해 보면:

```js
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map((num) => num * num);
console.log(result);
```

`var`대신 `const`를 사용했고, `function(...){...}` 대신 화살표 함수를 사용했다.

## 데이터 배열을 컴포넌트 배열로 변환하기

위에서 기존 배열에 있는 값들을 제곱하여 새로운 배열을 생성했는데, 똑같은 원리로 기존 배열로 컴포넌트로 구성된 배열을 생성할 수도 있다.

### 컴포넌트 수정하기

위에서 배운 map을 활용하여 위의 `Iteration.js` 컴포넌트를 수정해보자.

> IterationSample.js

```js
import React from 'react';

const IterationSample = () => {
  const names = {'눈사람', '얼음', '눈', '바람'};
  const nameList = names.map(name => <li>name</li>);
  return <ul>{nameList}</ul>
};

export default IterationSample
```

문자열로 구성된 배열을 선언한다. 그 배열 값을 사용하여 `<li>...</li>` JSX 코드로 된 배열을 새로 생성한 후 `nameList`에 담는다.

`map` 함수에서 JSX를 작성할 때는 앞서 다룬 에제처럼 DOM 요소를 작성해도 되고, 컴포넌트를 사용해도 된다.

### App 컴포넌트에서 예제 컴포넌트 렌더링

`App` 컴포넌트에서 기존 코드를 지우고, `IterationSample` 컴포넌트를 불러와 렌더링하자.

> App.js

```js
import React from "react";
import IterationSample from "./IterationSample";

const App = () => {
  return <IterationSample />;
};

export default App;
```

<img width="250" alt="스크린샷 2021-02-23 오후 3 08 53" src="https://user-images.githubusercontent.com/61453718/108808047-0c5a3400-75e9-11eb-9c02-8bc3e3362fd3.png">

`li`가 잘 렌더링되었다. 하지만 개발자 도구에서 콘솔을 열어보면

<img width="347" alt="스크린샷 2021-02-23 오후 3 09 49" src="https://user-images.githubusercontent.com/61453718/108808100-2dbb2000-75e9-11eb-863c-cd1a39b04487.png">

`"key" prop`이 없다는 경고 메시지를 표시했다. `key`란 무엇일까?

## key

리액트에서 `key`는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내고자 사용한다. 예를 들어 유동적인 데이터를 다룰 때는 원소를 새로 생성할 수도, 제거할 수도, 수정할 수도 있다. `key`가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다. 하지만 `key`가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있다.

### key 설정

`key`값을 설정할 때는 `map` 함수의 인자로 전달되는 함수 내부에서 컴포넌트 `props`를 설정하듯이 설정하면 된다. `key`값은 언제나 유일해야 한다. 따라서 데이터가 가진 고윳값을 `key`값으로 설정해야 한다.

예를 들어 다음과 같이 게시판의 게시물을 렌더링한다면 `게시물 번호`를 `key`값으로 설정해야 한다.

```js
const articleList = articles.map((article) => (
  <Article title={article.title} writer={article.writer} key={article.id} />
));
```

하지만 앞서 만들었던 예제 컴포넌트에는 이러한 고유 번호가 없다. 이 때는 `map` 함수에 전달되는 콜백 함수의 인수인 `index` 값을 사용하면 된다.

예제 컴포넌트를 다음과 같이 수정해 보자.

> IterationSample.js

```js
import React from "react";

const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  const namesList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{namesList}</ul>;
};

export default IterationSample;
```

이렇게 할 경우 개발자 도구에서 더 이상 경고 메시지를 표시하지 않는다. 고유한 값이 없을 떄만 `index` 값을 `key`로 사용해야 한다. `index`를 `key`로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못한다.

## 응용

지금까지의 개념을 활용하여 고정된 배열을 렌더링하는 것이 아닌, 동적인 배열을 렌더링하는 것을 구현해 볼 것이다. 그리고 `index` 값을 `key`로 사용하면 리렌더링이 비효율적이라고 배웠는데, 이러한 상황에 어떻게 고윳값을 만들 수 있는지도 알아 볼 것이다.

`초기 상태 설정` -> `데이터 추가 기능 구현` -> `데이터 제거 기능 구현` 의 흐름으로 진행된다.

### 1. 초기 상태 설정하기

`IterationSample` 컴포넌트에서 `useState`를 사용하여 상태를 설정할 것이다. 세 가지를 사용할 텐데 하나는 데이터 배열이고, 다른 하나는 텍스트를 입력할 수 있는 `input`의 상태이다. 그럼 마지막 하나는 뭘까? 그것은 데이터 배열에서 새로운 항목을 추가할 때 사용할 고유 id를 위한 상태이다.

배열을 설정할 때, 조금 전에는 단순히 문자열로 이루어진 배열을 만들었지만, 이번에는 객체 형태로 이루어진 배열을 만들 것이다. 해당 객체에는 문자열과 고유 id값이 있다.

> IterationSample.js

```js
import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id
  const namesList = names.map((name) => <li key={name.id}>{name.text}</li>);
  return <ul>{namesList}</ul>;
};

export default IterationSample;
```

이번에는 이렇게 `map` 함수르 사용할 때 `key` 값을 `index` 대신 `name.id` 값으로 지정해 줬다.브라우저에 똑같은 결과가 나타난다.

### 2. 데이터 추가 기능 구현하기

이제 새로운 이름을 등록할 수 있는 기능을 구현해 보자.

우선 `ul` 태그 상단에 `input`과 `button`을 렌더링하고, `input`의 상태를 관리해 보자.

> IterationSample.js

```js
import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

  const onChange = (e) => setInputText(e.target.value);

  const namesList = names.map((name) => <li key={name.id}>{name.text}</li>);
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button>추가</button>
      <ul>{namesList}</ul>;
    </>
  );
};

export default IterationSample;
```

그 다음에는 버튼을 클릭했을 때 호출할 `onClick` 함수를 선언하여 버튼의 `onClick` 이벤트로 설정해 보자.

`onClick` 함수에서는 배열의 내장 함수 `concat`을 사용하여 새로운 항목을 추가한 배열을 만들고, `setNames`를 통해 상태를 업데이트 해준다.

> IterationSample.js

```js
import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

  const onChange = (e) => setInputText(e.target.value);

  const onClick = () => {
    const nextNames = names.concat({
      id: nextId, // nextId 값을 id로 설정하고
      text: inputText,
    });
    setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
    setNames(nextNames); // names 값을 업데이트한다.
    setInputText(""); // inputText를 비운다.
  };

  const namesList = names.map((name) => <li key={name.id}>{name.text}</li>);
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{namesList}</ul>;
    </>
  );
};

export default IterationSample;
```

배열에 새 항목을 추가할 때 배열의 `push`함수를 사용하지 않고 `concat`을 사용했다. `push` 함수는 기존 배열 자체를 변경해 주는 반면, `concat`은 새로운 배열을 만들어 준다는 차이점이 있다.

리액트에서 상태를 업데이트할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 한다. 이를 불변성 유지라고 하는데, 불변성 유지를 해줘야 나중에 리액트 컴포넌트의 성능을 최적화할 수 있다. 이에 대한 자세한 내용은 추후에 알아볼 것이다.

`onClick` 함수에서 새로운 항목을 추가할 때 객체의 `id` 값은 `nextId`를 사용하도록 하고, 클릭될 때마다 값이 1씩 올라가도록 구현했다. 추가로 `button`이 클릭될 때 기존의 `input` 내용을 비우는 것도 구현해 줬다.

<img width="253" alt="스크린샷 2021-02-23 오후 4 05 35" src="https://user-images.githubusercontent.com/61453718/108811658-f9e3f880-75f0-11eb-834c-cf307745a73a.png">

이제 `input`에 값을 적고 버튼을 누르면 `li`로 추가가 된다.

### 3. 데이터 제거 기능 구현하기

이번에는 각 항목을 더블클릭했을 때 해당 항목이 화면에서 사라지는 기능을 구현해 볼 것이다. 이번에도 마찬가지로 불변성을 유지하면서 업데이트해 줘야 한다. 불변성을 유지하면서 배열의 특정 항목을 지울 때는 배열의 내장 함수 `filter`를 사용한다.

`filter` 함수를 사용하면 배열에서 특정 조건을 만족하는 원소들만 쉽게 분류할 수 있다.
사용 예시를 보자.

```js
const numbers = [1, 2, 3, 4, 5, 6];
cosnt biggetThanThree = nubmers.filter(number => number > 3);
// 결과: [4, 5, 6]
```

`filter` 함수의 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어 주면 쉽게 분류할 수 있다.

이 `filter` 함수를 응용하여 특정 배열에서 특정 원소만 제외시킬 수도 있다. 예를 들어 위 코드에서 본 `numbers` 배열에서 `[3]`만 없애고 싶다면 다음과 같이 하면 된다.

```js
const numbers = [1, 2, 3, 4, 5, 6];
const deleteThree = numbers.filter((number) => number !== 3);
// 결과: [1, 2, 4, 5, 6]
```

이제 `filter` 함수를 사용하여 `IterationSample` 컴포넌트의 항목 제거 기능을 구현해 볼 것이다. HTML 요소를 더블클릭할 때 사용하는 이벤트 이름은 `onDoubleClick`이다. `onRemove`라는 함수를 만들어서 각 `li` 요소에 이벤트 등록을 해 주자.

> IterationSample.js

```js
...
const onRemove = id => {
    const nextNames = names.filter(name => name.id !== id);
    setNames(nextNames);
};
const namesList = names.map(name => {
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
});
...
```

<img width="260" alt="스크린샷 2021-02-23 오후 4 15 31" src="https://user-images.githubusercontent.com/61453718/108812377-5bf12d80-75f2-11eb-8af3-d218dec0d50c.png">

더블클릭했을 때 제거가 잘 된다.

## 정리

이번에는 반복되는 데이터를 렌더링하는 방법을 배우고, 이를 응용하여 유동적인 배열을 다뤄 봤다. 컴포넌트 배열을 렌더링할 때는 `key`값 설정에 항상 주의해야 한다. 또 `key`값은 언제나 유일해야 한다. `key`값이 중복된다면 렌더링 과정에서 오류가 발생한다.

상태 안에서 배열을 변형할 때는 배열에 직접 접근해서 수정하는 게 아니라 `concat`, `filter` 등의 내장 함수를 사용하여 새로운 배열을 만든 후 이를 새로운 상태로 설정해 줘야 한다는 점을 명심하자. 앞으로 더욱 다양한 배열 및 객체 업데이트 방법들을 계속 배워 나갈 것이다.
