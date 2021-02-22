<리액트를 다루는 기술>을 요약하고 동시에 제 나름대로의 생각이 담겨 있는 글입니다.

## React의 기본

### render 함수

```
render() { ... }
```

-   `render` 함수가 컴포넌트의 생김새를 정의함.
-   `view`가 어떻게 생겼는지, 그리고 어떻게 작동하는지에 대한 객체를 반환함
-   `render` 함수를 통해 내부의 컴포넌트를 렌더링

## React의 특징

### Virtual DOM

DOM은 객체로 문서 구조를 표현하는 방법을 말한다. DOM 자체는 빠르지만 웹 브라우저의 규모가 커질 경우 `DOM의 변화 -> 다시 CSS를 연산 -> 레이아웃 구성 -> 페이지 리페인트`의 과정에서 로딩되는 데이터가 많아지므로 느려짐. -> 어떻게 할까? 에서 출발함.

#### Virtual DOM의 동작 방식

실제 DOM에 접근하는 대신에, 해당 DOM을 추상화한 자바스크립트 객체를 사용함. 이를 실제 DOM과 비교하여 업데이트 된 점(바뀐 점)만 반영하는 것.

### 라이브러리

React는 프레임워크가 아닌 라이브러리이다. 그리고 `view`에만 초점이 맞춰져 있기 때문에 다른 기능을 직접 구현해야한다. 그리하여...

#### 장점

마음에 드는 라이브러리를 사용할 수 있다. 그리고, 다른 프레임워크나 라이브러리와 혼용이 가능하여 다양하게 활용할 수 있다.

#### 단점

but, 라이브러리를 하나하나 다 배워야 돼서 효율적 활용에 오랜 시간이 걸린다.

## JSX

JSX는 자바스크립트의 확장 문법으로, XML과 매우 비슷하게 생겼다.

```
function App() {
  return (
      <div>
      Hello <b>React</b>
       </div>
  );
}
```

이 JSX 코드는

```
function App() {
  return React.createElement(“div“, null, “Hello “, React.createElement(“b“, null, “react“));
}
```

다음과 같이 변환된다. 딱 봐도 아래보다 위가 훨씬 직관적이지 않은가?

JSX의 장점은

1.  HTML 코드를 그대로 사용할 수 있기 때문에 보기 쉽고 직관적이다.
2.  그렇기 때문에 렌더링 또한 편하게 할 수 있다.

```
function App() {
  return (
    <div>
      <h1>리액트 안녕!</h1>
      <h2>잘 작동하니?</h2>
    </div>
  );
}
```

컴포넌트는 위와 같이 여러 요소에 대해 이를 전부 감싸는 부모 요소가 반드시 필요하다. 이는, **컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙**이 있기 때문이다.

div를 쓰고 싶지 않을 경우, `Fragment`를 사용하면 된다.

```js
import React, { Fragment } from 'react';

function App() {
    return (
        <>
          <h1>리액트 안녕!</h1>
          <h2>잘 작동하니?</h2>
        </>
    )
}

export default App;
```

뿐만 아니라 JSX 안에서는 자바스크립트 표현식 또한 쓸 수 있다. 아래의 결과값은 위와 같다.

```js
import React, { Fragment } from 'react';

function App() {
    const name = '리액트';
    return (
        <>
          <h1>{name} 안녕!</h1>
          <h2>잘 작동하니?</h2>
        </>
    )
}

export default App;
```

내부 자바스크립트 표현식에서 if문을 사용할 수는 없지만, 조건에 따라 다른 내용을 렌더링해야 할 때는 JSX 밖에서 if문을 사용하여 사전에 값을 설정하거나, { } 안에 조건부 연산자를 사용하면 된다.

```js
function App() {
  const name = 'React';
  return (
    <>
      {name === '리액트' ? (
        <h1>리액트입니다.</h1>
      ) : (
          <h2>리액트가 아닙니다.</h2>
        )}
    </>
  );
```

이 경우, '리액트'가 아니므로 `리액트가 아닙니다` 가 출력될 것이다.  
이 때, 아닐 경우 아무것도 렌더링하고 싶지 않다면 : `: (<h2>리액트가 아닙니다.</h2>)` 대신에 `: null` 을 해주면 된다.

근데 이것보다 더 짧게 할 수도 있다.

```js
function App() {
  const name = 'React';
  return (
    <>
      {name === '리액트' && <h1>리액트입니다.</h1>}
    </>
  );
}
```

해당 코드는, '리액트'일 경우에만 `리액트입니다.` 를 반환하므로, 아니라면 자연스럽게 아무것도 반환하지 않는다.  
`&&` 연산자로 조건부 렌더링을 할 수 있는 이유는, 리액트에서 `false`는 `null`과 같이 아무것도 렌더링하지 않기 때문이다. but, 값 자체가 falsy한 `0`은 그대로 화면에 렌더링된다.

```js
function App() {
 const name = undefined;
 rerurn name;
}
```

다음과 같은 코드는, `App(…): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.` 와 같은 오류를 발생시킨다. 이런 오류를 발생하게 하지 않는 방법은

1.  값이 undefined일 경우 사용할 값을 지정해주기 (OR(||) 연산자 사용)
    
    ```js
    function App() {
     const name = undefined;
     return name || ‘값이 undefined입니다.‘;
    }
    ```
    
2.  JSX 내부에서 undefined 렌더링하기
    

    ```js
    function App() {
        const name = undefined;
        return <div>{name}</div>;
    }
    ```

name 값이 `undefined`일 때 보여주고 싶은 문구가 있을 경우, 아래와 같이 하면 된다.

```js
function App() {
  const name = undefined;
  return <div>{name || ‘여기에 보여주고 싶은 문구 적기‘}</div>;
}
```

### JSX 인라인 스타일링

리액트에서 DOM 요소에 스타일 적용 시, 카멜케이스(camelCase)로 작성해야 한다. `background-color`는 `backgroundColor`로 작성해야 한다.

```js
function App() {
  const name = 'React';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fonstSize: '48px',
    fontWeight: 'bold',
    padding: 16
  };
  return (
    <div style={style}>{name}</div>
  );
}
```

결과  
![스크린샷 2021-02-15 오후 3 49 29](https://user-images.githubusercontent.com/61453718/107914268-67ff3e80-6fa5-11eb-97df-63e550923944.png)

style 객체 선언 없이 바로 적용하고 싶다면,

```js
function App() {
  const name = 'React';
  return (
    <div
      style={{
        // background-color는 backgroundColor와 같이 -가 사라지고 카멜 표기법으로 작성된다.
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: '48px', // font-size -> fontSize
        fontWeight: 'bold', // font-weight -> fontWeight
        padding: 16 // 단위를 생략하면 px로 지정된다.
      }}
    >
      {name}
    </div>
  );
}

```

이와 같이 하면 된다. 물론, HTML에서처럼 클래스를 부여하고 그것을 불러올 수도 있다.  
App.css에 CSS 코드를 적은 후 App.js에

```js
function App() {
  const name = '리액트';
  return <div className="react">{name}</div>;
}
```

위와 같이 적어주면 된다. class가 아닌 className이다. class로 해도 되긴 하지만, 그럴 경우 개발자도구 Console 탭에

![스크린샷 2021-02-15 오후 3 58 39](https://user-images.githubusercontent.com/61453718/107914886-acd7a500-6fa6-11eb-8e5d-f96808f81a52.png)

이와 같은 오류가 뜬다. 그러니 가능하면 className으로 해주자.

### 꼭 닫아야 하는 태그

HTML에선 `<br>`, `<input>` 등은 꼭 닫아주지 않아도 알아서 인식하지만, JSX에선 아래와 같은 컴파일 오류가 뜨면서 안 된다.

![스크린샷 2021-02-15 오후 4 00 54](https://user-images.githubusercontent.com/61453718/107915042-fde79900-6fa6-11eb-9cdd-1fd21087f528.png)

그러므로, JSX에선 꼭 태그를 닫아줘야 한다. `<input></input>` 혹은 `<input />`의 형태로 해주면 된다.

### 주석

JSX 내부에서 주석을 작성할 때는,

```
{/* 주석의 내용 */}
```

의 형태로 작성해야 한다. 평소 자바스크립트에서 쓰는

```
// 주석의 내용
```

이 주석의 경우 시작 태그를 여러 줄로 작성할 때는 가능하지만, 아무 곳에서나 해당 주석을 쓸 경우 그대로 페이지에 나타나게 되므로 주의하자.

![스크린샷 2021-02-15 오후 4 08 00](https://user-images.githubusercontent.com/61453718/107915525-fc6aa080-6fa7-11eb-81f1-374edd13ea12.png)

주석이 가능한 경우와 불가능한 경우가 사진 하나에 정리되어있다.
