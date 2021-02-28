이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

# 생명주기 메소드

모든 리액트 컴포넌트에는 라이프사이클(생명 주기)이 존재한다. 컴포넌트의 수명은 페이지에 렌더링되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝난다.

리액트 프로젝트를 진행하다 보면 가끔 컴포넌트를 처음으로 렌더링할 때 어떤 작업을 처리해야 하거나 컴포넌트를 업데이트하기 전후로 어떤 작업을 처리해야 할 수도 있고, 또 불필요한 업데이트를 방지해야 할 수도 있다.

이때는 컴포넌트의 생명주기 메소드를 사용한다. 참고로 생명주기 메소드는 클래스형 컴포넌트에서만 사용할 수 있다. 함수형 컴포넌트에서는 사용할 수 없는데, 대신 `Hooks` 기능을 사용하여 비슷한 작업을 처리할 수 있다. `Hooks`에 대한 내용은 다음 번에 알아본다.

## 1. 생명주기 메소드의 이해

생명주기 메소드의 종류는 총 9가지이다. `Will` 접두사가 붙은 메소드는 어떤 작업을 작동하기 **전**에 실행되는 메소드이고, `Did` 접두사가 붙은 메소드는 어떤 작업을 작동한 **후**에 실행되는 메소드이다.

이 메소드들은 우리가 컴포넌트 클래스에서 덮어 써 선언함으로써 사용할 수 있다.

생명주기는 총 세 가지, 즉 **마운트, 업데이트, 언마운트** 카테고리로 나눈다. 우선 어떤 것들이 있는지 간단히 알아보고, 큰 흐름을 이해한 후 하나씩 살펴보자.

### 1-1. 마운트

DOM이 생성되고 웹 브라우저상에 나타나는 것을 **마운트(`mount`)** 라고 한다. 이때 호출하는 메소드는 다음과 같다:

```
컴포넌트 만들기 -> constructor -> getDerivedStateFromProps -> render -> componentDidMount
```

- `constructor`: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메소드이다.
- `getDerivedStateFromProps`: `props`에 있는 값을 `state`에 넣을 때 사용하는 메소드이다.
- `render`: 우리가 준비한 UI를 렌더링하는 메소드이다.
- `componentDidMount`: 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메소드이다.

### 1-2. 업데이트

컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트한다.

1. `props`가 바뀔 때
2. `state`가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. `this.forceUpdate`로 강제로 렌더링을 트리거할 때

이렇게 컴포넌트를 업데이트할 때는 다음 메소드를 호출한다.

```
업데이트를 발생시키는 요인: props 변경, state 변경, 부모 컴포넌트 리렌더링
⬇
getDerivedStateFromProps
⬇
shouldComponentUpdate
(true 반환 시 render 호출, false 반환 시 여기서 작업 취소)
⬇
render (⬅ forceUpdate)
⬇
getSnapshotBeforeUpdate
(웹 브라우저상의 실제 DOM 변화)
⬇
componentDidUpdate
```

컴포넌트는 다양한 이유로 업데이트될 수 있다:
1. 부모 컴포넌트에서 넘겨주는 `props`가 바뀔 때이다. 컴포넌트에 전달하는 `props`의 값이 바뀌면 컴포넌트 렌더링이 이뤄진다.
2. 컴포넌트 자신이 들고 있는 `state`가 `setState`를 통해 업데이트될 때이다.
3. 부모 컴포넌트가 리렌더링될 때이다. 자신에게 할당된 `props`가 바뀌지 않아도, 또는 자신이 들고 있는 `state`가 바뀌지 않아도, 부모 컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링된다.

- `getDerivedStateFromProps`: 이 메소드는 마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출된다. `props`의 변화에 따라 `state` 값에도 변화를 주고 싶을 때 사용한다.
- `shouldComponentUpdate`: 컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메소드이다. 이 메소드에서는 `true` 혹은 `false` 값을 반환해야 하며, `true`를 반환하면 다음 생명주기 메소드를 계속 실행하고, `false`를 반환하면 작업을 중지한다. 즉, 컴포넌트가 리렌더링되지 않는다. 만약 특정 함수에서 `this.forceUpdate()` 함수를 호출한다면 이 과정을 생략하고 바로 `render` 함수를 호출한다.
- `render`: 컴포넌트를 리렌더링한다.
- `getSnapshotBeforeUpdate`: 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메소드이다.
- `componentDidUpdate`: 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메소드이다.

### 1-3. 언마운트

마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트(`unmount`)라고 한다.

```
언마운트하기
⬇
componentWillUnmount
```

- `componentWillUnmount`: 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메소드이다.

## 2. 생명주기 메소드 살펴보기

앞에서 소개한 생명주기 메소드를 하나씩 자세히 살펴보자.

### 2-1. render() 함수

`render() { ... }`

이 메소드는 매우 익숙하지 않은가? 알다시피 이 메소드는 컴포넌트 모양새를 정의한다. 그렇기에 컴포넌트에서 가장 중요한 메소드라고 볼 수 있다. 생명주기 메소드 중 유일한 필수 메소드이기도 하다.

이 메소드 안에서 `this.props`와 `this.state`에 접근할 수 있으며, 리액트 요소를 반환한다. 요소는 `div`같은 태그가 될 수도 있고, 따로 선언한 컴포넌트가 될 수도 있다. 아무것도 보여주고 싶지 않다면 `null` 값이나 `false` 값을 반환하도록 하자.

그리고 다음 상황에 주의하자. 이 메소드 안에서는 이벤트 설정이 아닌 곳에서 `setState`를 사용하면 안 되며, 브라우저의 DOM에 접근해서도 안 된다. DOM 정보를 가져오거나 `state`에 변화를 줄 때는 `componentDidMount`에서 처리해야 한다.

### 2-2. constructor 메소드

`constructor(props) { ... }`

이것은 컴포넌트의 생성자 메소드로 컴포넌트를 만들 때 처음으로 실행된다. 이 메소드에서는 초기 `state`를 정할 수 있다.

### 2-3. getDerivedFromProps 메소드

이것은 리액트 `v16.3` 이후에 새로 만든 생명주기 메소드이다. `props`로 받아 온 값을 `state`에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될 때와 업데이트될 때 호출된다.

```js
static getDerivedFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) { // 조건에 따라 특정 값 동기화
        return { value: nextProps.value };
    }
    return null; // state를 변경할 필요가 없다면 null을 반환
}
```

### 2-4. componentDidMount 메소드

`componentDidMount() { ... }`

이것은 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행한다. 이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, `setTimeout`, `setInterval`, 네트워크 요청 같은 비동기 작업을 처리하면 된다.

### 2-5. shouldComponentUpdate 메소드

`shouldComponentUpdate(nextProps, nextState) { ... }`

이것은 `props` 또는 `state`를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메소드이다. 이 메소드에서는 반드시 `true` 또는 `false` 값을 반환해야 한다. 컴포넌트를 만들 때 이 메소드를 따로 생성하지 않으면 기본적으로 언제나 `true`를 반환한다. 이 메소드가 `false` 값을 반환한다면 업데이트 과정은 여기서 중지된다.

이 메소드 안에서 현재 `props`와 `state`는 `this.props`와 `this.state`로 접근하고, 새로 설정될 `props` 또는 `state`는 `nextProps`와 `nextState`로 접근할 수 있다.

프로젝트 성능을 최적화할 때, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는 `false` 값을 반환하게 한다. 컴포넌트를 최적화하는 부분은 앞으로 리액트를 공부하면서 더 자세히 알아볼 것이다.

### 2-6. getSnapshotBeforeUpdate 메소드

이것은 리액트 `v16.3` 이후 만든 메소드이다. 이 메소드는 `render`에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출된다. 이 메소드에서 반환하는 값은 `componentDidUpdate`에서 세 번째 파라미터인 `snapshot` 값으로 전달받을 수 있는데, 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용된다. (예: 스크롤바 위치 유지)

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.array !== this.state.array) {
        const { scrollTop, scrollHeight } = this.list;
        return { scrollTop, scrollHeight };
    }
}
```

### 2-7. componentDidUpdate 메소드

`componentDidUpdate(prevProps, prevState, snapshot) { ... }`

이것은 리렌더링을 완료한 후 실행한다. 업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방하다. 여기서는 `prevProps` 또는 `prevState`를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다. 또 `getSnapshotBeforeUpdate`에서 반환한 값이 있다면 여기서 `snapshot` 값을 전달받을 수 있다.

### 2-8. componentWillUnmount 메소드

`componentWillUnmount() { ... }`

이것은 컴포넌트를 DOM에서 제거할 때 실행한다. `componentDidMount`에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 한다.

### 2-9. componentDidCatch 메소드

`componentDidCatch` 메소드는 리액트 `v16`에서 새롭게 도입되었으며, 컴포넌트 렌더링 도중에 에러가 발생했을 때 어플리케이션이 먹통이 되지 않고 오류 UI를 보여줄 수 있게 해 준다. 사용 방법은 다음과 같다.

```js
componentDidCatch(error, info) {
    this.setState({
        error: true
    });
    console.log({ error, info });
}
```

여기서 `error`는 파라미터에 어떤 에러가 발생했는지 알려 주며, `info` 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 준다. 앞의 코드에서는 그저 `console.log`만 했지만, 나중에 실제로 오류가 발생하면 서버 API를 호출하여 따로 수집할 수도 있다.

그러나 이 메소드를 사용할 때는 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고 자신의 `this.props.children`으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다는 점을 알아 둬야 한다. 이 메소드를 사용하는 방법은 이후 `에러 잡아내기`에서 알아 볼 것이다.

## 3. 생명주기 메소드 사용하기

`2`에서 본 생명주기 메소드를 직접 사용해 보자.

이번에는 `생명주기 메소드 만들기` ➡ `App에 렌더링하기` ➡ `버튼 누르고 콘솔 창 관찰하기`의 흐름으로 진행한다.

### 3-1. 생명주기 메소드 만들기

> LifeCycleSample.js

```js
import React, { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null; // ref를 설정할 부분

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    console.log("ComponentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않는다.
    return nextState.number % 10 !== 4;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트되기 직전 색상: ", snapshot);
    }
  }

  render() {
    console.log("render");
    const style = {
      color: this.props.color,
    };
    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
```

이 컴포넌트는 각 생명주기 메소드를 실행할 때마다 콘솔 디버거(`debugger`)에 기록하고, 부모 컴포넌트에서 `props`로 색상을 받아 버튼을 누르면 `state.number` 값을 1씩 더한다.

`getDerivedStateFromProps`는 부모에게서 받은 `color` 값을 `state`에 동기화하고 있다. 그리고 `getSnapshotBeforeUpdate`는 DOM에 변화가 일어나기 직전의 색상 속성을 `snapshot` 값으로 반환하여 이것을 `componentDidUpdate`에서 조회할 수 있게 했다.

추가로 `shouldComponentUpdate` 메소드에서 `state.number` 값의 마지막 자리 수가 4이면(예: 4, 14, 24, 34) 리렌더링을 취소하도록 설정했다.

### 3-2. App 컴포넌트에 렌더링하기

> App.js

```js
import React, { Component } from "react";
import "./App.css";
import LifeCycleSample from "./LifeCycleSample";

// 랜덤 색상을 생성한다.
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color} />
      </div>
    );
  }
}

export default App;
```

`getRandomColor` 함수는 `state`의 `color` 값을 랜덤 색상으로 설정한다. `16777215`를 `hex`로 표현하면 `ffffff`가 되므로 해당 코드는 `000000`부터 `ffffff`값을 반환한다.

버튼을 렌더링하고, 누를 때마다 `handleClick` 메소드가 호출되게 이벤트를 설정하며, 불러온 `LifeCycleSample` 컴포넌트에 `color` 값을 `props`로 설정한다.

<img width="498" alt="스크린샷 2021-02-24 오후 4 45 15" src="https://user-images.githubusercontent.com/61453718/108965060-aee4e680-76bf-11eb-999d-6630db463e06.png">

그 결과, `랜덤 색상`을 누를 때마다 숫자의 색깔이 변하고, 위에서 정한 생명주기 메소드들이 호출되었음을 콘솔에서 확인할 수 있다.

위에서 끝 자리가 4일 때는 업데이트하지 않도록 설정했었는데,

<img width="348" alt="스크린샷 2021-02-24 오후 4 48 39" src="https://user-images.githubusercontent.com/61453718/108965398-29156b00-76c0-11eb-9187-6a660dc58d67.png">

여기서 보다시피 `4`일 경우 `componentDidUpdate`가 이뤄지지 않았음을 확인할 수 있다.

### 3-3. 에러 잡아내기

`LifeCycleSample` 컴포넌트의 `render` 함수에서 의도적으로 에러를 한 번 발생시켜 보겠다. `render` 함수에서의 에러는 주로 존재하지 않는 함수를 사용하려고 하거나, 존재하지 않는 객체의 값을 조회하려고 할 때 발생한다.

> LifeCycleSample.js

```js
...
render() {
  console.log('render');
  const style = {
  color: this.props.color,
};
return (
  <div>
    {this.props.missing.value }
  ...
  </div>
}
```

this.props.missing.value: 존재하지 않는 props인 missing 객체의 value 조회 후 렌더하는 명령을 추가한다. 이렇게 하면 당연히 에러가 발생한다.

<img width="544" alt="스크린샷 2021-02-24 오후 4 55 58" src="https://user-images.githubusercontent.com/61453718/108966149-2e26ea00-76c1-11eb-8ce8-60395ea92488.png">

우측 상단 `X`를 눌러 지우면 아무 것도 없는 흰 화면만 나타난다. 이럴 경우 에러가 발생했다고 사용자에게 인지시켜 줘야 한다.

> ErrorBoundary.js

```js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };
  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
    console.log({ error, info });
  }
  render() {
    if (this.state.error) return <div>에러가 발생했습니다!</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;
```

에러가 발생하면 `componentDidCatch` 메소드가 호출되며, 이 메소드는 `this.state.error` 값을 `true`로 업데이트해 준다. 그리고 `render` 함수는 `this.state.error` 값이 `true`라면 에러가 발생했음을 알려주는 문구를 보여 준다.

이후에 다시 실행해보면, 똑같이 에러 문구가 나오겠지만 우측 상단 `X`를 누를 경우

<img width="261" alt="스크린샷 2021-02-24 오후 5 23 49" src="https://user-images.githubusercontent.com/61453718/108969468-10f41a80-76c5-11eb-8d1c-2a2e119378e6.png">

이러한 문구가 뜰 것이다.

## 4. 정리

<img width="472" alt="스크린샷 2021-02-24 오후 5 24 31" src="https://user-images.githubusercontent.com/61453718/108969868-29643500-76c5-11eb-983c-854e15ca203f.png">

생명주기 메소드는 컴포넌트 상태에 변화가 있을 때마다 실행하는 메소드이다. 이 메소드들은 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 유용하다. 추가로 컴포넌트 업데이트의 성능을 개선할 때는 `shouldComponentUpdate`가 중요하게 사용된다.

`shouldComponentUpdate`를 사용하여 컴포넌트의 업데이트 성능을 개선하는 내용은 이후에 다뤄 볼 것이다.
