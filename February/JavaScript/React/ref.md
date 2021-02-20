이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

# ref

일반 HTML 에서 DOM 요소에 이름을 달 때는 id를 사용한다.

> DOM 요소의 id

```HTML
<div id='my-element'></div>
```

특정 DOM 요소에 어떤 작업을 해야 할 때 이렇게 요소에 id를 달면 CSS에서 특정 id에 특정 스타일을 적용하거나 자바스크립트에서 해당 id를 가진 요소를 찾아서 작업할 수 있다. 여기서 다루는 리액트 프로젝트에 사용하는 `public/index.html` 파일에도 id가 `root`인 div 요소가 있다.

> public/index.html

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="“viewport“"
      content="“width"
      ="device-width,"
      initial-scale="1“"
    />
    <link rel=“shortcut icon“ href=“%PUBLIC_URL%/favicon.ico“>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

그리고 `src/index.js` 파일 중에는 id가 `root`인 요소에 리액트 컴포넌트를 렌더링하라는 코드가 있다.

> src/index.js

```js
(...)
ReactDOM.render(<App />, document.getElementById('root'));
```

이렇게 HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 법이 있다. 바로 `ref`(reference의 줄임말) 개념이다.

> **리액트 컴포넌트 안에서는 id를 사용하면 안 되는가?**
>
> 리액트 컴포넌트 안에서도 id를 사용할 수 있긴 하다. JSX 안에서 DOM에 id를 달면 해당 DOM을 렌더링할 때 그대로 전달된다. 하지만 특수한 경우가 아니라면 사용을 권장하지 않는다. 예를 들어 같은 컴포넌트를 여러 번 사용한다고 가정해 보자. HTML에서 DOM의 id는 유일(unique)해야 하는데, 이런 상황에서는 중복 id를 가진 DOM이 여러 개 생기므로 잘못된 사용이다.
>
> ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하기 때문에 이런 문제가 생기지 않는다.
>
> 대부분은 id를 사용하지 않고도 원하는 기능을 구현할 수 있지만, 다른 라이브러리나 프레임워크와 함께 id를 사용해야 하는 상황이 발생할 수 있다. 이런 상황에서는 컴포넌트를 만들 때마다 id 뒷부분에 추가 텍스트를 붙여서(ex. `button01`, `button02`, `button03`, ...) 중복 id가 발생하는 것을 방지해야 한다.

## ref는 어떤 상황에서 사용해야 할까?

일단 특정 DOM에 작업을 해야 할 때 `ref`를 사용한다는 것은 이미 파악했다. 하지만 대체 **어떤** 자겁을 할 때 `ref`를 사용해야 할까?

정답은 '**DOM을 꼭 직접적으로 건드려야 할 때**'이다. 예를 들어 일반 순수 자바스크립트 및 jQuery로 만든 웹 사이트에서 `input`을 검증할 때는 다음과 같이 특정 id를 가진 `input`에 클래스를 설정해 준다.

> 일반 HTML 예제 코드(http://jsbin.com/qawucezuci/edit)

```html
<html>
<head>
  <meta charset=“utf-8“>
  <meta name=“viewport“ content=“width=device-width“>
  <title>Example</title>
  <style>
    .success {
      background-color: green;
    }

<span class="co32">.failure</span><span class="co36"> {</span>
  background-color<span class="co36">: </span><span class="co32">red</span><span class="co36">;</span>
}

</style>
  <script>
    function validate() {
      var input = document.getElementById(‘password‘);
      input.className = “;
      if(input.value === ‘0000‘) {
        input.className = ‘success‘;
      } else {
        input.className = ‘failure‘;
      }
    }
  </script>
</head>
<body>
  <input type=“password“ id=“password“></input>
  <button onclick=“validate()“>Validate</button>
</body>
</html>
```

하지만 리액트에서 이런 작업은 굳이 DOM에 접근하지 않아도 `state`로 구현할 수 있다. 잘 이해되지 않을 수 있는데, 앞으로 작성할 예제 코드를 확인해 보면 감이 올 것이다. 리액트 컴포넌트에서 `state`를 사용해서 제시한 기능을 한 번 구현해 볼 것이다.

여기선 클래스형 컴포넌트에서 `ref`를 사용하는 방법을 알아볼 것이다. 함수형 컴포넌트에서 `ref`를 사용하려면 `Hooks`를 사용해야 하기 때문에 이주 `Hooks`를 배우면서 알아 볼 것이다.

`ValidationSample 컴포넌트 만들기` -> `input에 ref 달기` -> `버튼을 누를 때마다 input에 포커스 주기` 의 흐름으로 진행한다.

> ValidationSample.css

```css
.success {
  background-color: lightgreen;
}
.failure {
  background-color: lightcoral;
}
```

> ValidationSample.js

```js
import React, { Component } from "react";
import "./ValidationSample.css";

class ValidationSample extends Component {
  state = {
    password: "",
    clicked: false,
    validated: false,
  };

  handleChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === "0000",
    });
  };

  render() {
    return (
      <div>
        <input
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.clicked
              ? this.state.validated
                ? "success"
                : "failure"
              : ""
          }
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;
```

`input`에서는 `onChange` 이벤트가 발생하면 `handleChange`를 호출하여 `state`의 `password` 값을 업데이트하게 했다. `button`에는 `onClick` 이벤트가 발생하면 `handleButtonClick`을 호출하여 `clicked` 값을 참으로 설정했고, `validated` 값을 검증 결과로 설정했다.

`input`의 `className` 값은 버튼을 누르기 전에는 비어 있는 문자열을 전달하며, 버튼을 누른 후에는 검증 결과에 따라 `success`값 또는 `failure` 값을 설정한다. 그리고 이 값에 따라 `input` 색상이 초록색 또는 빨간색으로 나타난다.

### App 컴포넌트에서 예제 컴포넌트 렌더링

`App` 컴포넌트에서 `ValidationSample` 컴포넌트를 불러와 렌더링해 보자. 그 과정에서 `App` 컴포넌트를 함수형 컴포넌트에서 클래스형 컴포넌트로 전환해 줘야 한다. 추후 `App` 컴포넌트에서 `ref`를 사용할 것이기 때문에 이렇게 미리 클래스형 컴포넌트로 작성을 해줄 것이다.

> App.js

```js
import React, { Component } from "react";
import ValidationSample from "./ValidationSample";

class App extends Component {
  render() {
    return <ValidationSample />;
  }
}

export default App;
```

<img width="243" alt="스크린샷 2021-02-20 오후 6 10 01" src="https://user-images.githubusercontent.com/61453718/108590423-dcbbe980-73a6-11eb-93aa-915f00df5dab.png">

이러한 결과가 나온다.

### DOM을 꼭 사용해야 하는 상황

앞 예제에서는 `state`를 사용하여 우리에게 필요한 기능을 구현했지만, 가끔 `state`만으로 해결할 수 없는 기능이 있다.

- 특정 `input`에 포커스 주기
- 스크롤 박스 조작하기
- `Canvas` 요소에 그림 그리기 등

이 때엔 어쩔 수 없이 DOM에 직접적으로 접근해야 하는데, 이를 위해 바로 `ref`를 사용한다.

## ref 사용

`ref`를 사용하는 방법은 크게 두 가지가 있다.

### 콜백 함수를 통한 ref 설정

`ref`를 만드는 가장 기본적인 방법은 콜백 함수를 사용하는 것이다. `ref`를 달고자 하는 요소에 `ref`라는 콜백 함수를 `props`로 전달해 주면 된다. 이 콜백 함수는 `ref` 값을 파라미터로 전달받는다. 그리고 함수 내부에서 파라미터로 받은 `ref`를 컴포넌트의 멤버 변수로 설정해 준다.

> 콜백 함수 사용 예시

```js
<input
  ref={(ref) => {
    this.input = ref;
  }}
/>
```

이렇게 하면 앞으로 `this.input`은 `input` 요소의 DOM을 가리킨다. `ref`의 이름은 원하는 것으로 자유롭게 지정할 수 있다. DOM 타입과 관계없이 `this.superman = ref`처럼 마음대로 지정한다.

### createRef를 통한 ref 설정

`ref`를 만드는 또 다른 방법은 리액트에 내장되어 있는 `createRef`라는 함수를 사용하는 것이다. 이 함수를 사용해서 만들면 더 적은 코드로 쉽게 사용할 수 있다. 이 기능은 리액트 `v16.3`부터 도입되었다. 그 이전 버전에선 작동하지 않는다.

> createRef 사용 예시

```js
import React, { Component } from "react";

class RefSample extends Component {
  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}

export default RefSample;
```

`createRef`를 사용하여 `ref`를 만들려면 우선 컴포넌트 내부에서 멤버 변수로 `React.createRef()`를 담아줘야 한다. 그리고 해당 멤버 변수를 `ref`를 달고자 하는 요소에 `ref props`로 넣어주면 `ref` 설정이 완료된다.

설정한 뒤 나중에 `ref`를 설정해 준 DOM에 접근하려면 `this.input.current`를 조회하면 된다. 콜백 함수를 사용할 때와 다른 점은 이렇게 뒷부분에 `.current`를 넣어 줘야 한다는 것이다.

지금까지 콜백 함수 혹은 `createRef`를 사용하여 `ref`를 만드는 방법을 배웠다. 앞으로 두 가지 중에 편한 방법을 사용하면 된다. 주로 전자를 사용하는 방식으로 `ref`를 다뤄 볼 것이다.

<img width="232" alt="스크린샷 2021-02-20 오후 7 01 14" src="https://user-images.githubusercontent.com/61453718/108591824-0298bc80-73ae-11eb-8d4d-1d21e313ffc7.png">

이 사진을 보면, 버튼을 누르고 난 후에 포커스가 버튼으로 넘어가면서 왼쪽 `input`의 요소의 텍스트 커서가 더이상 보이지 않는다.

버튼을 한 번 눌렀을 때, 포커스가 다시 `input`쪽으로 자동으로 넘어가도록 코드를 작성해 보자.

#### input에 ref 달기

콜백 함수를 사용해서 `ValidationSample` 컴포넌트에도 `ref`를 달아 보자.

> ValidationSample.js의 input 요소

```js
(...)
    <input
    ref={(ref) => this.input = ref}
    (...)
    />
```

#### 버튼 onClick 이벤트 코드 수정

버튼에서 `onClick` 이벤트가 발생할 때 `input`에 포커스를 주도록 코드를 수정해 보자. 이제 `this.input`이 컴포넌트 내부의 `input` 요소를 가리키고 있으니, 일반 DOM을 다루듯이 코드를 작성하면 된다.

> ValidationSample.js - handleButtonClick 메소드

```js
handleButtonClick = () => {
  this.setState({
    clicked: true,
    validated: this.state.password === "0000",
  });
  this.input.focus();
};
```

<img width="225" alt="스크린샷 2021-02-20 오후 7 06 14" src="https://user-images.githubusercontent.com/61453718/108591959-b69a4780-73ae-11eb-8e9b-18e6621c733f.png">

이제 위와 같은 형태로, 버튼을 누른 후 곧바로 포커스가 `input`으로 가도록 구현되었다.

### 컴포넌트에 ref 달기

리액트에서는 컴포넌트에도 `ref`를 달 수 있다. 이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 쓴다. 컴포넌트에 `ref`를 다는 방법은 DOM에 `ref`를 다는 방법과 같다.

#### 사용법

```js
<MyComponent
  ref={(ref) => {
    this.myComponent = ref;
  }}
/>
```

이렇게 하면 `MyComponent` 내부의 메소드 및 멤버 변수에도 접근할 수 있다. 즉 내부의 `ref`에도 접근할 수 있다. (ex. `myComponent.handleClick`, `myComponent.input` 등)

이번에는 스크롤 박스가 있는 컴포넌트를 하나 만들고, 스크롤바를 아래로 내리는 작업을 부모 컴포넌트에서 실행해 볼 것이다.

`ScrollBox 컴포넌트 만들기` -> `컴포넌트에 ref 달기` -> `ref를 이용하여 컴포넌트 내부 메소드 호출하기`의 흐름으로 진행한다.

#### 컴포넌트 초기 설정

먼저 `ScrollBox`라는 컴포넌트 파일을 만들 것이다. JSX의 인라인 스타일링 문법으로 스크롤 박스를 만들자. 그 다음 최상위 DOM에 `ref`를 달아 주자.

> ScrollBox.js

```js
import React, { Component } from "react";

class ScrollBox extends Component {
  render() {
    const style = {
      border: "1px solid black",
      hdight: "300px",
      width: "300px",
      overflow: "auto",
      position: "relative",
    };
    const innerStyle = {
      width: "100%",
      height: "650px",
      background: "linear-gradient(white, black)",
    };
    return (
      <div
        style={style}
        ref={(ref) => {
          this.box = ref;
        }}
      >
        <div style={innerStyle} />
      </div>
    );
  }
}

export default ScrollBox;
```

#### App 컴포넌트에서 스크롤 박스 컴포넌트 렌더링

기존 `ValidationSample`을 지우고, 방금 만든 `ScrollBox` 컴포넌트를 렌더링해 주자.

> App.js

```js
import React, { Component } from 'react';
import ScrollBox from './ScrollBox';

class App extends Component {
  render() {
    return (
      <ScrollBox />;
    );
  }
}

export default App;
```

스크롤 박스가 잘 렌더링되어 있다.

<img width="295" alt="스크린샷 2021-02-20 오후 8 00 51" src="https://user-images.githubusercontent.com/61453718/108593352-72ab4080-73b6-11eb-9106-e03e074e2cad.png">

#### 컴포넌트에 메소드 생성

컴포넌트에 스크롤바를 맨 아래쪽으로 내리는 메소드를 만들어 보자. 자바스크립트로 스크롤바를 내릴 때는 DOM 노드가 가진 다음 값들을 사용한다.

- scrollTop: 세로 스크롤바 위치(0~350)
- scrollHeight: 스크롤이 있는 박스 안의 div 높이(650)
- clientHeight: 스크롤이 있는 박스의 높이(300)

스크롤바를 맨 아래쪽으로 내리려면 `scrollHeight`에서 `clientHeight` 높이를 빼면 된다.

> ScrollBox.js

```js
import React, { Component } from "react";

class ScrollBox extends Component {
  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    /* const scrollHeight = this.box.scrollHeight
    const clientHeight = this.box.clientHeight 와 같은 의미. 비구조화 할당한 것.*/
    this.box.scrollTop = scrollHeight - clientHeight;
  }
  render() {
      (...)
  }
}

export default ScrollBox;
```

`scrollBottom` 메소드의 첫 번째 줄에서는 ES6의 비구조화 할당 문법을 사용했다.

이렇게 만든 메소드는 부모 컴포넌트인 `App` 컴포넌트에서 `ScrollBox`에 `ref`를 달면 사용할 수 있다.

#### 컴포넌트에 ref 달고 내부 메소드 사용

`App` 컴포넌트에서 `ref`를 달고 버튼을 만들어 누르면, `ScrollBox` 컴포넌트의 `scrollToBottom` 메소드를 실행하도록 코드를 작성해 보자.

> App.js

```js
import React, { Component } from ‘react‘;
import ScrollBox from ‘./ScrollBox‘;

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref) => this.scrollBox = ref} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;
```

<img width="327" alt="스크린샷 2021-02-20 오후 7 59 41" src="https://user-images.githubusercontent.com/61453718/108593280-2cee7800-73b6-11eb-8e4c-9396096f14f4.png">

이 상태에서, 이제 버튼을 누르면

<img width="344" alt="스크린샷 2021-02-20 오후 7 59 55" src="https://user-images.githubusercontent.com/61453718/108593290-3546b300-73b6-11eb-85f1-a5bda0284299.png">

맨 아래로 내려가게 된다.

## 정리

컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 `ref`를 사용한다. 먼저 `ref`를 사용하지 않고도 원하는 기능을 구현할 수 있는지 반드시 고려한 후에 활용하자.

이 시점에서 오해할 수 있는 부분이 있는데, 서로 다른 컴포넌트끼리 데이터를 교류할 때 `ref`를 사용한다면 이는 잘못 사용된 것이다. 물론 할 수는 있다. 컴포넌트에 `ref`를 달고 다른 컴포넌트로 전달하고 ...... 다른 컴포넌트에서 `ref`로 전달받은 컴포넌트의 메소드를 실행하고 ...... 하지만 이 방법은 리액트 사상에 어긋난 설계이다. 앱 규모가 커지면 마치 스파게티처럼 구조가 꼬여버려서 유지보수가 불가능해진다. 컴포넌트끼리 데이터를 교류할 때는 언제나 데이터를 부모 ↔ 자식 흐름으로 교류해야 한다. 나중에 `Redux` 혹은 `Context API`를 사용하여 효율적으로 교류하는 방법을 배울 것이다.

아직 함수형 컴포넌트에서 `ref`를 사용하는 것은 배우지 않았다. 함수형 컴포넌트에서는 `useRef`라는 `Hook` 함수를 사용한다. 사용법은 이 장에서 배운 `React.createRef`와 유사하다. 나중에 `Hooks`를 배울 때 자세히 알아볼 것이다.
