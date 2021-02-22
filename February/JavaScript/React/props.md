이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 생각을 적은 글입니다.

# 컴포넌트

리액트를 사용하여 어플리케이션의 인터페이스를 설계할 때 사용자가 볼 수 있는 요소는 여러가지 컴포넌트로 구성되어 있다.

## 컴포넌트의 기능

1.  데이터가 주어졌을 때 이에 맞춰 UI를 만들어 줌
2.  LifeCycle API를 이용하여 컴포넌트가 화면에서 나타날 때, 사라질 때, 변화가 일어날 때 주어진 작업들을 처리할 수 있음
3.  임의 메소드를 만들어 특별한 기능을 붙여줄 수 있음

## 클래스형 컴포넌트

앞서 봤던 App.js의 컴포넌트는 함수형 컴포넌트이며, 코드가 아래와 같은 구조이다.

```js
import React from ‘react‘;
import ‘./App.css‘;

function App() {
  const name = ‘React‘;
  return <div className=“react“>{name}</div>;
}

export default App;
```

컴포넌트의 선언 방식은 함수형 외에도, 클래스형이 있다.

```js
import React, { Component } from 'react';

class App extends Component {
 render() {
    const name = 'react';
    return <div className="react">{name}</div>;
 }
}
```

역할은 함수형과 똑같다. 그러나 클래스형 컴포넌트를 통해서만 이후에 state 및 LifeCycle을 사용할 수 있고, 임의 메소드 또한 정의할 수 있기 때문에 알아둬야 한다.

> ES6 클래스
> 
> ```js
> class Dog {
>   constructor(name) {
>     this.name = name;
>  }
>   say() {
>     console.log(this.name + ": 멍멍"); 
>   }
> }
> 
> const dog = new Dog("흰둥이");
> dog.say(); // 흰둥이: 멍멍
> ```

클래스형 컴포넌트에서는 render 함수가 꼭 있어야 하고, 그 안에서 보여줘야 할 JSX를 반환해야 한다.

### 함수형 컴포넌트의 장점

1.  선언하기가 비교적 쉬움
2.  메모리 자원 사용량이 비교적 덜함
3.  프로젝트 완성, 빌드 후 배포시에 파일의 크기가 비교적 작음

### 단점

1.  state와 LifeCycle API 사용이 불가함 (-> Hooks 도입으로 해결)

Hooks가 도입되면서 리액트 공식 매뉴얼에서 `함수형 컴포넌트 + Hooks` 사용을 권장하지만 클래스형도 꼭 알아둬야 한다.

## 모듈 내보내기(export)

MyComponent.js를 만들어서 새로운 컴포넌트를 작성해보자.

```js
import React from 'react';

const MyComponent = () => {
    return (
        <div>
            my new component
        </div>
    );
};

export default MyComponent;
```

컴포넌트 맨 아래

```js
export default App;
```

이 보이는가? 이 코드는, 다른 파일에서 이 파일을 import할 때, 위에서 선언한 MyComponent 클래스를 불러오도록 설정한다.  
이 코드가 있는 파일에 대해 다른 컴포넌트에서 불러와서 사용하려면,

```js
import React from 'react';
import Component from './MyComponent';

const App = () => {
  return <MyComponent />;
}

export default App;
```

여기서의 2행과 같이 해당 컴포넌트를 직접 import 해오면 된다. 그리고 브라우저에서 확인해보면

![스크린샷 2021-02-16 오후 1 14 28](https://user-images.githubusercontent.com/61453718/108017701-e79a1580-7058-11eb-91ed-c3bc39b2f75e.png)

제대로 렌더링이 되었음을 확인할 수 있다.

### 직접 컴포넌트를 작성하다보니 알게된 점 🤔

컴포넌트 파일명의 시작은 대문자여야 한다. newComponent.js로 만들고 불러왔을 때 분명히 Complied successfully! 라 떴지만 아무 내용이 없었다. 혹시나 해서 대문자로 바꿔보니 렌더링이 제대로 되었다. 파스칼케이스로 작성하자.

## props

props는 properties를 줄인 표현으로, 컴포넌트 속성을 설정할 때 사용하는 요소이다. `props` 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트(지금으로썬 App 컴포넌트가 부모 컴포넌트임)에서 설정할 수 있음

```js
import React from ‘react‘;

const MyComponent = props => {
return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
};

export default MyComponent;
```

기본적으로는, 이런 방식으로 해당 컴포넌트에서 name이라는 props를 렌더링하도록 설정한다. 이렇게만 하면 이 컴포넌트를 받는 App.js를 통해 렌더링되는건

```
안녕하세요. 제 이름은 입니다.
```

이것이다. 이는 props의 값이 지정되지 않았기 때문이다. 이와같이 props값이 따로 없을 때 보여주는 기본값을 `defaultProps`라고 한다.  
이 값을 따로 설정해줄 수도 있다.

MyComponent.js에서

```js
MyComponent.defaultProps = {
  name: "공백"
};
```

이와 같이 해줄 경우, App.js를 통해 렌더링되는 값은 기본 `defaultProps`를 받아서

```
안녕하세요. 제 이름은 공백입니다.
```

가 나온다.

하여, App.js에서

```js
const App = () => {
  return <MyComponent name="React" />;
};
```

위와 같이 MyComponent에 name을 설정해주면

```
안녕하세요. 제 이름은 React입니다.
```

가 나온다.

### props.children

한편, 리액트 컴포넌트 태그 사이의 내용을 보여주는 props가 있는데, 바로 children이다.

```js
const App = () => {
  return <MyComponent>RRRRReact</MyComponent>; 
}
```

이렇게 컴포넌트 사이의 태그 `RRRRReact`를 넣었다. 이를 보여주고자 한다면 `props.children` 속성을 이용하면 된다.  
Mycomponent.js에서

```js
const MyComponent = props => {
 return (
    <div>
     안녕하세요. 제 이름은 {props.name}입니다. <br />
     children 값은 {props.children}입니다.
    </div>
  )   
}
```

이렇게 props.children을 설정해주면

![스크린샷 2021-02-16 오후 1 46 17](https://user-images.githubusercontent.com/61453718/108019337-5aa58b00-705d-11eb-9da5-f9ca4c0f54c5.png)

`defaultProps`와 `props.children`이 적용된 결과물이 나온다.

### 비구조화 할당 문법

지금까지 `name`이나 `children` 앞에 `props.` 라는 키워드를 붙였다. 매번 앞에 `props.`을 붙여 주긴 귀찮으므로 미리 설정해줄 수 있다.

```js
const MyComponent = props => {
  const { name, children } = props;  // 이렇게 사용할 속성에 대해 props로 변수 지정을 해주고
  return (
    <div>
      안녕하세요. 제 이름은 {name} 입니다. <br /> // name과 children에 대해 값을 설정해줄 수 있다.
      children 값은 {children} 입니다.
    </div>
  );
};
```

화살표 함수의 변수에 props를 지정하고, 다시 함수 내부에서 props를 지정하는 것을 합치면 아래와 같이 훨씬 간편하게 작성할 수 있다.

```js
const MyComponent = ({ name, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다. <br />
      children 값은 {children}입니다.
    </div>
  )
}
```

### propTypes를 통한 props 검증

`propTypes`는, 컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때 사용한다. `defaultProps`을 사용했던 것과 비슷하다.

```js
import PropTypes from 'prop-types';
```

해당 import 구문을 통해 `propTypes`를 불러온 후, MyComponent.js에 다음과 같이 적는다.

```js
...
const MyComponent = ({ name, children }) => {
  return (...);  
}
MyComponent.propTypes = { // 이 부분 추가
  name: PropTypes.string  // 이 부분 추가
};                          // 이 부분 추가
...
```

해당 코드의 경우 `name` 값은 무조건 문자열(`string`) 형태로 전달해야 된다는 것을 의미한다.

```js
import MyComponent from './MyComponent';

const App() = () => {
  return <MyComponent name={3}>RRRRReact</MyComponent> 
}
```

App.js에서 name 값을 문자열이 아닌 숫자로 전달한 후 개발자 도구의 `Console` 탭을 열어보면

![스크린샷 2021-02-16 오후 2 59 15](https://user-images.githubusercontent.com/61453718/108024240-8b8abd80-7067-11eb-855e-041f59ad9129.png)

위와 같은 에러가 떠있을 것이다. 값이 나타나긴 했지만, `Console`에 경고 메시지를 출력하여 개발자에게 `propTypes`가 잘못되었다는 것을 알려준다. 이제 `MyComponent name={3}`을 적당한 문자열 `MyComponent name={"react"}`으로 바꿔주면,

![스크린샷 2021-02-16 오후 3 02 34](https://user-images.githubusercontent.com/61453718/108024499-0358e800-7068-11eb-896b-c258d9ef43aa.png)

에러가 사라졌다.

### isRequired를 사용하여 필수 propTypes 설정

`propTypes`를 지정하지 않았을 때 경고 메시지를 띄워 주는 작업을 하고자 한다. 이는 `propTypes` 를 지정할 때 뒤에 `isRequired`를 붙여주면 된다.

> MyComponent.js

```js
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ name, favoriteNumber, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다. <br />
      children 값은 {children}입니다. <br />
      제가 좋아하는 숫자는 {favoriteNumber}입니다.
    </div>
  );
};

MyComponent.defaultProps = {
  name: "공백"  
}

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
}

export default MyComponent;
```

이렇게 하고 실행해보면, 아직 `favoriteNumber`에 값이 들어가 있지 않기 때문에 Console에 오류가 발생한다.

![스크린샷 2021-02-16 오후 3 20 43](https://user-images.githubusercontent.com/61453718/108025816-8aa75b00-706a-11eb-8389-124bfb247882.png)

이제, App.js에서 `favoriteNumber` 값을 지정해서 전달해주면 된다.

> App.js

```js
import MyComponent from './MyComponent';
const App = () => {
  return <MyComponent name={"React"} favoriteNumber={1}>RRRRReact</MyComponent>; 
}
```

![스크린샷 2021-02-16 오후 3 22 35](https://user-images.githubusercontent.com/61453718/108025975-cd693300-706a-11eb-8119-3bd55086dad6.png)

이제 값이 잘 나온다.

### 다양한 PropTypes 종류

```
* array: 배열
* arrayOf(다른 PropType): 특정 PropType으로 이뤄진 배열을 의미한다. 예를 들어 arrayOf(PropTypes.number)는 숫자로 이뤄진 배열이다.
* bool: true 혹은 false값
* func: 함수
* number: 숫자
* object: 객체
* string: 문자열
* symbol: ES6의 symbol
* node: 렌더링할 수 있는 모든 것(숫자, 문자열, 혹은 JSX 코드. children도 node.PropType이다.)
* instanceOf(클래스): 특정 클래스의 인스턴스(ex: instanceOf(MyClass))
* oneOf(['dog', 'cat']): 주어진 배열 요소 중 값 하나
* oneOfType([React.PropTypes.string, PropTypes.number]): 주어진 배열 안의 종류 중 하나
* objectOf(React.PropTypes.number): 객체의 모든 키 값이 인자로 주어진 PropType인 객체
* shape({ name: PropTypes.string, num: PropTypes.number }): 주어진 스키마를 가진 객체
* any: 아무 종류
```

### 클래스형 컴포넌트에서 props 사용하기

클래스형 컴포넌트에서 `props`를 사용할 때는 `render` 함수에서 `this.props`를 조회하면 된다. 그리고 `defaultProps`와 `propTypes`는 똑같은 방식으로 설정할 수 있다.

> MyComponent.js

```js
import React, { Component } from ‘react‘;
import PropTypes from ‘prop-types‘;

class MyComponent extends Component {
  render() {
    const { name, favoriteNumber, children } = this.props;
    return (
      <div>
        안녕하세요. 제 이름은 {name}입니다. <br />
        children 값은 {children}입니다. <br />
        제가 좋아하는 숫자는 {favoriteNumber}입니다. <br />
      </div>
    );
  }
}

MyComponent.defaultProps = {
  name: ‘기본 이름‘
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
};

export default MyComponent;
```

클래스형 컴포넌트에서 `defaultProps`와 `propTypes`를 설정할 때 `class` 내부에서 지정하는 방법도 있다.

> MyComponent.js

```js
import React, { Component } from ‘react‘;
import PropTypes from ‘prop-types‘;

class MyComponent extends Component {
  static defaultProps = {
    name: "공백"
  };
static propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
  };
render() {
  const { name, favoriteNumber, children } = this.props; // 비구조화 할당
  return ( ... );
  }
}

export default MyComponent;
```

### 궁금한 점 🤔

클래스형 컴포넌트에서는 비구조화 할당을 사용하지 않는가? -> 구글링 결과 사용함. 그치만 단지 여기서 알려주지 않은 것일 뿐이라고 생각한다.  
`defaultProps`와 `propTypes`는 꼭 필요할까? -> 알아본 결과 필수 사항이 아니지만, 협업 시 개발 능률을 높이기 위해서 필요하다.
