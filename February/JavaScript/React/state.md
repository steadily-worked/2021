이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

## state

`props`는 읽기 전용이라 컴포넌트 자체에서 바꿀 수 없고, 바꾸려면 부모 컴포넌트에서 바꿔줘야 한다.  
`MyComponent`에서 `{name}` 값을 직접 바꿔줄 수 없는 것을 예시로 들 수 있다.  
이와 다르게 리액트에서 `state`는, 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다.

`state` 또한 클래스형 컴포넌트가 갖고 있는 `state`와, 함수형 컴포넌트에서 `useState` 함수를 통해 사용하는 `state` 이렇게 두 가지가 있다.

### 클래스형 컴포넌트의 state

```js
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    // props의 초깃값 설정하기
    this.state = {
      number: 0,
    };
  }
  render() {
    const { number } = this.state; // state를 조회할 때는 this.state로 조회함
    return (
      <div>
        <h1>{number}</h1>
        <button
          // onClick을 통해 버튼이 클릭됐을 때 호출할 함수를 저장함
          onClick={() => {
            // this.setState를 사용하여 state에 새로운 값을 넣을 수 있다.
            this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
```

이 예시 코드를 보자. 여기에서

1.  컴포넌트에 `state`를 설정할 때는 다음과 같이 `constructor` 메소드를 작성해서 설정한다.

```js
constructor(props) {
  super(props);
  // state의 초깃값 설정하기
  this.state = {
    number: 0 
  };
}
```

이는 컴포넌트의 생성자 메소드이다. 클래스형 컴포넌트에서 `constructor`를 작성할 때는 반드시 `super(props)`를 호출해 줘야 한다. 이 함수가 호출되면 현재 클래스형 컴포넌트가 상속하고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출해 준다.

그 다음에는, `this.state` 값에 초깃값을 설정해 줬다. 컴포넌트의 `state`는 객체 형식이어야 한다.

2.  render() 함수

```js
  render() {
    const { number } = this.state; // state를 조회할 때는 this.state로 조회함
    return (
      <div>
        <h1>{number}</h1>
        <button
          // onClick을 통해 버튼이 클릭됐을 때 호출할 함수를 저장함
          onClick={() => {
            // this.setState를 사용하여 state에 새로운 값을 넣을 수 있다.
            this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
```

`render()` 함수에서 현재 `state`를 조회할 때는 `this.state`를 조회하면 된다. 그리고 button 안에 `onClick`이라는 값을 `props`로 넣어 주었는데, 이는 버튼이 클릭될 때 호출시킬 함수를 설정할 수 있게 해 준다. 이를 이벤트 설정이라고 하는데, 이는 뒤에서 알아본다.

이벤트로 설정할 함수를 넣어 줄 땐, 화살표 함수 문법을 사용하여 넣어 줘야 한다. 함수 내부에선 `this.setState`라는 함수를 사용했다. 이 함수가 `state` 값을 바꿀 수 있게 해 준다.

이후 App.js에서 기존 `MyComponent`를 없애 주고, `Counter`를 불러 온다.

> App.js

```js
..
import Counter from './Counter';

const App = () => {
  return <Counter />; 
}

export default App;
```

이렇게 할 경우,

![스크린샷 2021-02-17 오후 2 07 13](https://user-images.githubusercontent.com/61453718/108158996-72e2dc00-7129-11eb-8c6a-a6eb33d936b7.png)

버튼을 클릭할 때마다 숫자가 증가한다.

`this.setState`는, 인자로 전달된 객체 안에 들어있는 값만 바꿔 주므로 인자로 전달되지 않은 객체는 아무런 영향을 받지 않는다.

`state`를 `constructor`에서 꺼내서 쓸 수도 있는데,

> Counter.js

```js
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0,
  };
  render() {
    const { number } = this.state; // state를 조회할 때는 this.state로 조회한다.
    return (...);
  }
}

export default Counter;
```

이렇게 컴포넌트 내에서 바로 state의 초깃값을 지정해주면, `constructor`를 지정하지 않아도 된다.

```js
constructor(props) {
  super(props);
  // state의 초깃값 설정하기
  this.state = {
    number: 0 
  };
}
```

이 생성자 내에서 따로 `this.state`를 설정해주는 것에 비해 간편하지 않은가?

#### this.setState에 객체 대신 함수 인자 전달하기

> Counter.js - button onClick

```js
onClick = {() => {
  this.setState({ number: number + 1 });
  this.setState({ number: this.state.number + 1 });
}}
```

이렇게 작성할 경우, `this.setState`를 두 번 씀에도 불구하고 이전과 같이 1씩만 증가한다. 이는, `this.setState`의 사용이 `state`값을 곧바로 바꾸는 것은 아니기 때문이다.

이럴 때는, `this.setState`를 사용할 때 객체 대신 함수를 인자로 넣어주면 된다.

```js
this.setState((prevState, props) => {
  return {
    // 업데이트하고 싶은 내용
  }
})
```

여기서 `prevState`는 기존 상태이고, `props`는 현재 지니고 있는 `props`를 가리킨다. 만약 업데이트하는 과정에서 `props`가 필요하지 않다면 생략해도 된다.

```js
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값:{fixedNumber}</h2>
        <button
          // onClick을 통해 버튼이 클릭됐을 때 호출할 함수를 저장함
          onClick={() => {
            this.setState((prevState) => {
              return {
                number: prevState.number + 1
              };
            });
            this.setState(prevState => ({
              number: prevState.number + 1
            }));
          }}
        >
          +1
        </button>
      </div>
    );
```

위와 같은 형태로 작성해주면 된다. `onClick` 내에 있는 두 `this.setState`는 동일한 기능인데, 이는 화살표 함수에서 값을 바로 반환하고 싶은 경우 코드블록 `{ }`을 생략할 수 있기 때문이다.

```js
const sum = (a, b) => {
  return a + b;
}
```

은,

`const sum = (a, b) => a + b;`와 같이 간단하게 나타낼 수 있다.

#### this.setState가 끝난 후 특정 작업 실행하기

`setState`의 두 번째 파라미터로 콜백 함수를 등록하여, 값 업데이트 이후 특정 작업을 실행할 수 있다.

> Counter.js - button

```js
<button
  // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정합니다.
  onClick={() => {
    this.setState(
      {
        number: number + 1
      },
      () => {
        console.log(‘방금 setState가 호출되었습니다.’);
        console.log(this.state);
      }
    );
  }}
>
  +1
</button>
```

`this.setState` 이후 화살표 함수를 통해 `console.log`를 실행하게 되고, 이렇게 하면

![스크린샷 2021-02-17 오후 3 15 49](https://user-images.githubusercontent.com/61453718/108163857-079e0780-7133-11eb-806c-fbd111b0e00c.png)

이렇게, 버튼을 누를 때마다 콘솔 탭에 찍히게 된다.

### 함수형 컴포넌트에서 useState 사용하기

리액트 16.8 이후 버전부터 `useState`라는 함수를 사용해서 함수형 컴포넌트에서도 `state`를 사용할 수 있게 되었다.  
지난 글에서 적었던 대로, 이 과정에서 `Hooks`라는 것을 사용해야 가능하다.

#### 배열 비구조화 할당

이전에 배웠던 객체 비구조화 할당과 비슷하다. **배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해 주는 문법이다.**

```js
const array = [1, 2];
const one = array[0];
const two = array[1];
```

`array` 안에 있는 값을 `one`과 `two`에 담아 주는 코드인데, 위 코드는 배열 비구조화 할당을 통해

```js
const array = [1, 2];
const [one, two] = array;
```

이렇게 하면 훨씬 깔끔해진다. `one`과 `two`라는 변수를 설정함과 동시에 `array[0]`과 `array[1]`에 각각 해당 변수를 할당해주는 것이다.

### useState 사용하기

비구조화 할당을 통해 useState를 구현하기 위해 새롭게 Say.js 파일을 만든다.

> Say.js

```js
import React, { useState } from 'react';

const Say = () => {
  const [message, setMessage] = useState('');
  const onClickEnter = () => setMessage('안녕하세요!');
  const onClickLeave = () => setMessage('안녕히 가세요!');
  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
    </div>
  );
};

export default Say;
```

`useState` 함수의 인자에는 상태의 초기 값을 넣어준다. 아무것도 설정하지 않았을 경우 초기에 나타나는 값이 없다.  
클래스형에서는 `state` 초깃값은 객체 형태를 넣어줘야 한다고 했으나, `useState`에서는 반드시 객체가 아니어도 된다. 값의 형태는 자유이다.

함수를 호출하면 배열이 반환되는데, 배열의 첫째 원소(`message`)는 현재 상태이고 두 번째 원소(`setMessage`)는 상태를 바꿔 주는 함수이다. 이 `setMessage` 함수를 세터(`setter`) 함수라고 부른다. 그리고, 꼭 `message`와 `setMessage`라는 이름일 필요도 없다. 배열 비구조화 할당을 통해 원하는 이름을 지어줄 수 있다. 하지만 당연히 해당 함수가 무슨 기능을 하는 지를 확실히 알게 해줄 수 있는 직관적인 이름을 사용하는 게 좋지 않을까?

> App.js

```js
import React, { useState } from 'react';
import Say from './Say';

const App = () => {
  return <Say />; 
};

export default App;
```

이렇게 App.js에서 `Say` 컴포넌트를 불러온 경우

![스크린샷 2021-02-17 오후 3 32 29](https://user-images.githubusercontent.com/61453718/108165097-5b115500-7135-11eb-9dad-27f05c39410a.png)

`입장`을 눌렀을 때 `안녕하세요!`가 나오고, `퇴장`을 눌렀을 때 `안녕히 가세요!`가 나온다.

### 한 컴포넌트에서 useState 여러 번 사용하기

그냥 새로운 배열 비구조화 할당을 해준 뒤에 `return` 안에 적절한 형태로 집어넣으면 된다.

> Say.js

```js
import React, { useState } from 'react';

const Say = () => {
  const [message, setMessage] = useState('');
  const onClickEnter = () => setMessage('안녕하세요!');
  const onClickLeave = () => setMessage('안녕히 가세요!');

  const [color, setColor] = useState('black');
  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>
      <button style={{ color: 'red' }} onClick={() => setColor('red')}>
        빨간색으로 바꾸기
      </button>
      <button style={{ color: 'green' }} onClick={() => setColor('green')}>
        초록색으로 바꾸기
      </button>
      <button style={{ color: 'blue' }} onClick={() => setColor('blue')}>
        파란색으로 바꾸기
      </button>
    </div>
  );
};

export default Say;
```

결과

![스크린샷 2021-02-17 오후 2 07 13](https://user-images.githubusercontent.com/61453718/108158996-72e2dc00-7129-11eb-8c6a-a6eb33d936b7.png)

이 경우에는, `color`라고 배열 명칭을 지정해줬기 때문에 색깔이 바뀌는 게 아니다. 초기 원소가 `black`으로 설정이 되어 있고, `setColor`라는 함수를 통해 색깔이 바뀌도록 명령을 줬기 때문이다.

### 궁금한 점 🤔

`함수를 호출하면 배열이 반환되는데, 배열의 첫째 원소(message)는 현재 상태이고 두 번째 원소(setMessage)는 상태를 바꿔 주는 함수이다.`라고 했는데, 이렇게 `useState`를 사용할 땐 배열 비구조화 할당에 무조건 첫 번째가 원소가 현재 상태이고 두 번째 원소가 상태를 바꿔주는 함수인가?

#### 알게된 점

이 궁금증을 해결하기 위해 `const onClickEnter = () => setMessage('안녕하세요!');` 에서 `setMessage`를 첫 번째 원소인 `message`로, 그리고 `<h1>{message}</h1>` 에서 `message`를 두 번째 원소인 `setMessage`로 바꾸고 버튼을 눌러봤다. 그 결과

![스크린샷 2021-02-17 오후 3 49 20](https://user-images.githubusercontent.com/61453718/108166561-b5abb080-7137-11eb-9df7-09117203ddcb.png)

위와 같은 오류가 나면서 제대로 작동하지 않았다. 이를 통해, 두 번째 원소에 `현재 상태를 바꿔 주는 함수가 꼭 들어가야 한다`라는 사실을 알게 되었다.

### state 사용 시 주의 사항

`state` 값을 바꿔야 할 땐, `setState` 혹은 `useState`를 통해 전달받은 `setter` 함수를 사용해야 한다.  
다음의 코드는 모두 잘못된 코드이다.

> 클래스형 컴포넌트

```js
this.state.number = this.state.nmumber + 1;
this.state.array = this.array.push(2);
this.state.object.value = 5;
```

> 함수형 컴포넌트

```js
const [object, setObject] = useState({ a: 1, b: 1 });
object.b = 2;
```

그렇다면 배열, 객체를 업데이트해야 할 때는 어떻게 해야 할까? 이 상황에선

1.  배열이나 객체 사본을 만든 후 그 값을 업데이트한다.
2.  이후 그 사본의 상태를 `setState` 혹은 `setter` 함수를 통해 업데이트한다.

아래와 같이 하면 된다.

```js
// 객체 다루기
const object = { a: 1, b: 2, c: 3 };
const nextObject = { ...Object, b: 2 }; // 사본을 만들어서 b 값만 덮어 쓰기

// 배열 다루기
const array = [
  { id: 1, value: true },
  { id: 2, value: true },
  { id: 3, value: false },
];
let nextArray = array.concat({ id: 4 }); // 새 항목 추가
nextArray.filter(item => item.id !== 2); // id가 2인 항목 제거
nextArray.map(item => (item.id === 1 ? { ...item, value: false } : item)); // id가 1인 항목의 value를 false로 설정
```

객체에 대한 사본을 만들 때는 `spread` 연산자라 불리는 `...`을 사용하여 처리하고, 배열에 대한 사본을 만들 때는 배열의 내장 함수들을 활용한다. 이후 다 자세히 배울 내용들이다.

### 정리

`state`를 다루기 위해 클래스형 컴포넌트의 `state`와 함수형 컴포넌트의 `useState`에 대해 배웠다. 앞으로 새로운 컴포넌트를 만들 때는 `useState`를 사용하는 것을 권장한다. 이로써 코드가 더 간결해질 뿐만 아니라, 리액트 개발 팀이 함수형 컴포넌트와 `Hooks`를 사용하는 것이 주요 컴포넌트 개발 방식이 될 것이라고 공지했기 때문이다.
