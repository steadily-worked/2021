이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

# 이벤트 핸들링

사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것을 이벤트(`event`)라고 한다. 예를 들어, 버튼에 마우스 커서를 올렸을 때는 `onmouseover` 이벤트를 실행하고, 클릭했을 때는 `onclick` 이벤트를 실행한다. `Form` 요소는 값이 바뀔 때 `onchange` 이벤트를 실행한다.

## 리액트의 이벤트 시스템

리액트의 이벤트 시스템은 웹 브라우저의 HTML 이벤트와 인터페이스가 동일하기 때문에 사용법이 꽤 비슷하다. 헌데, 주의해야 할 몇 가지 사항이 있다.

### 이벤트 사용 시 주의사항

1. <b>이벤트 이름은 camelCase로 작성한다.</b>

예를 들어 HTML의 `onclick`은 리액트에서는 `onClick`으로 작성해야 한다. `onkeyup`은 `onKeyUp`으로 작성한다.

2. <b>이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다.</b>

HTML에서 이벤트를 설정할 때는 큰따옴표 안에 실행할 코드를 넣었지만, 리액트에서는 함수 형태의 객체를 전달한다. 앞서 버튼 예제에서도 화살표 함수 문법으로 함수를 만들어 전달했는데, 이렇게 바로 만들어서 전달해도 되고 렌더링 부분 외부에 미리 만들어서 전달해도 된다.

3. <b>DOM 요소에만 이벤트를 설정할 수 있다.</b>

즉 `div`, `button`, `input`, `form`, `span` 등의 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없다.

예를 들어 다음과 같이 `MyComponent`에 `onClick` 값을 설정한다면 `MyComponent`를 클릭할 때 `doSomething` 함수를 실행하는 것이 아니라, 그냥 이름이 `onClick`인 `props`를 `MyComponent`에게 전달해 줄 뿐이다. 

```js
<MyComponent onClick={doSomeThing} />
```

따라서 컴포넌트 자체적으로 이벤트를 설정할 수는 없다. 하지만 전달받은 `props`를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있다.

```js
<div onClick={this.props.onClick}>
  { /* ( ... ) */ }
</div>
```

### 이벤트 종류

리액트에서 지원하는 이벤트 종류는 다음과 같다.

* Clipboard
* Composition
* Keyboard
* Focus
* Form
* Mouse
* Selection
* Touch
* UI
* Wheel
* Media
* Image
* Animation
* Transition

상당히 많다. 이 이벤트를 전부 다루진 않고, 흔히 사용하는 간단한 이벤트들만 다룰 것이다. 

## 이벤트 핸들링 익히기

`컴포넌트 생성 및 불러오기` -> `onChange 이벤트 핸들링하기` -> `임의 메소드 만들기` -> `input 여러 개 다루기` -> `onKeyPress`의 단계로 진행한다.

### 컴포넌트 생성 및 불러오기

#### 컴포넌트 생성

늘 하던 대로 `EventPractice.js` 파일 생성 후 `App.js`에 연결해준다.

### onChange 이벤트 핸들링하기

> EventPractice.js

```js
import React, { Component } from ‘react‘;

class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type=“text“
          name=“message“
          placeholder=“아무거나 입력해 보세요“
          onChange={
            (e) => {
              console.log(e);
            }
          }
        />
      </div>
    );
  }
}

export default EventPractice;
```

이후 실행해보면, input 안에 값을 입력할 때마다 Console에

<img width="333" alt="스크린샷 2021-02-18 오후 1 26 25" src="https://user-images.githubusercontent.com/61453718/108305240-e7cb1a00-71ec-11eb-8f8a-6398f7b5f6c5.png">

다음과 같은 이벤트 객체가 출력된다.

> EventPractice.js > onChange

```js
onChange={
  (e) => {
    console.log(e);
  }
}
```

여기서 콘솔에 기록되는 `e` 객체는 `SynthticEvent`로 웹 브라우저의 네이티브 이벤트를 감싸는 객체이다. 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 된다.

`SyntheticEvent` 및 네이티브 이벤트와 달리 이벤트가 끝나고 나면 초기화되므로 정보를 참조할 수 없다. 예를 들어 0.5초 뒤에 `e` 객체를 참조하면 `e` 객체 내부의 모든 값이 비워지게 된다.

만약 비동기적으로 이벤트 객체를 참조할 일이 있다면 `e.persist()` 함수를 호출해 줘야 한다.

예를 들어 `onChange` 이벤트가 발생할 때, 앞으로 변할 인풋 값인 `e.target.value`를 콘솔에 기록해 보자.

> EventPractice.js > onChange

```js
onChange={
  (e) => {
    console.log(e.target.value);
  }
}
```

이렇게 할 경우, 값이 바뀔 때마다 바뀌는 값을 콘솔에 기록한다.

<img width="347" alt="스크린샷 2021-02-18 오후 1 43 23" src="https://user-images.githubusercontent.com/61453718/108306348-472a2980-71ef-11eb-908a-06ffac65a534.png">

#### state에 input 값 담기

생성자 메소드인 `constructor`에서 `state` 초깃값을 설정하고, 이벤트 핸들링 함수 내부에서 `this.setState` 메소드를 호출하여 `state`를 업데이트한다. 그 이후 `input`의 `value` 값을 `state`에 있는 값으로 설정한다.

> EventPractice.js

```js
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: ''
  }
  
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
         type='text'
         name='message'
         placeholder='아무거나 입력해 보세요'
         value={this.state.message}
         onChange={
           (e) => {
             this.setState({
               message: e.target.value
             })
             console.log(e.target.value);
           }
         }
      </div>
    )
  }
}

export default EventPractice;
```

아무 것도 담겨있지 않은 `message`가 들어간 `value`에 `e.target.value`를 업데이트 해준다. 제대로 `e.target.value`에 `message`가 들어갔는지 확인해보기 위해 `console.log(e.target.value)`를 추가했고, 결과적으로

<img width="499" alt="스크린샷 2021-02-18 오후 2 08 42" src="https://user-images.githubusercontent.com/61453718/108308258-d08f2b00-71f2-11eb-9144-65709272d1ac.png">

정상적으로 `state`에 메시지 추가가 되고 있음을 확인할 수 있다.

#### 버튼을 누를 때 comment 값을 공백으로 설정

`state`에 입력한 값이 잘 들어가고 있는지, 그리고 `input`에서 그 값을 제대로 반영하고 있는지 검증해보자.
`input` 요소 코드 아래쪽에 `button`을 만들고, 클릭 이벤트가 발생하면 현재 `comment` 값을 메시지 박스로 띄운 후 `comment` 값을 공백으로 설정한다.

> EventPractice.js

```js
import React, { Component } from ‘react‘;

class EventPractice extends Component {
  state = {
    message: "",
  }
  
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          (...)
        />
        <button onClick={
          () => {
            alert(this.state.message);
            this.setState({
              message: "",
            });
          }
        }>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```

<img width="670" alt="스크린샷 2021-02-18 오후 2 13 08" src="https://user-images.githubusercontent.com/61453718/108308640-6e82f580-71f3-11eb-9c69-374ad4b48cc3.png">

이렇게 `value`를 추가한 후 버튼을 누르면 `state`에 입력한 값이 잘 반영되고 있음을 볼 수 있다.


### 임의 메소드 만들기

이벤트 주의 사항에서 **"이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다"** 고 했다. 그렇기 때문에 이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달해 줬다. 이 방법 대신 함수를 미리 준비해서 전달하는 방법도 있다. 성능상으로는 차이가 거의 없지만, 가독성은 훨씬 높다. ( but 상황에 따라 렌더링 메소드 내부에서 함수를 만드는 것이 더 편할 때도 있다. 컴포넌트 매핑을 할 때 배움 )

앞서 `onChange`와 `onClick`에 전달한 함수를 따로 빼내서 컴포넌트 임의 메소드를 만들어 보자.

> EventPractice.js

```js
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: "",
  }
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  
  handleClick(e) {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  }
  
  render() {
    return(
      <div>
        <h1>이벤트 연습</h1>
        <input
         type='text'
         name='message'
         placeholder='아무거나 입력해 보세요'
         value={this.state.message}
         onChange={this.handleChange}
         />
         <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```

함수가 호출될 때 `this`는 호출부에 따라 결정되므로, 클래스의 임의 메소드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메소드와 `this`의 관계가 끊어져 버린다. 이 때문에 임의 메소드가 이벤트로 등록돼도 `this`를 컴포넌트 자신으로 제대로 가리키기 위해서는 메소드를 `this`와 바인딩(`binding`)하는 작업이 필요하다. 만약 바인딩하지 않는 경우라면 `this`가 `undefined`를 가리키게 된다.

현재 `constructor` 함수에서 함수를 바인딩하는 작업이 이뤄지고 있다.


#### Property Initializer Syntax를 이용한 메소드 작성

메소드 바인딩은 생성자 메소드에서 하는 게 정석이다. 하지만 이 작업을 불편하다고 느낄 수도 있다. 새 메소드를 만들 때마다 `constructor`도 수정해야 하기 때문이다. 이 작업을 좀 더 간단하게 하는 방법이 있다. 바로 바벨(`Babel`)의 `transform-class-properties` 문법을 사용해서 화살표 함수 형태로 메소드를 정의하는 것이다.

이 문법을 사용하면 코드가 어떻게 바뀔까?

> EventPractice.js

```js
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: "",
  }
  
  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }
  
  handleClick = (e) => {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  }
  
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
         type='text'
         name='message'
         placeholder='아무거나 입력해 보세요'
         value={this.state.message}
         onChange={this.handleChange}
         />
         <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EvnetPractce;
```

이전에 비해 훨씬 깔끔해지지 않았는가?


#### input 여러 개 다루기

`input`값을 `state`에 넣는 방법을 배웠다. 하지만 `input`이 여러 개일 때는 어떻게 작업할까? 메소드를 여러 개 만들어야 할까? 그것도 해법이 될 순 있지만, 더 쉽게 처리하는 방법이 있다.

바로 `event` 객체를 활용하는 것이다. `e.target.name` 값을 사용하면 된다. `onChange` 이벤트 핸들러에서 `e.target.name`은 해당 인풋의 `name`을 가리킨다. 지금은 `message`이다. 이 값을 사용하여 `state`를 설정하면 쉽게 해결할 수 있다. 코드를 한 번 살펴보자.

`render` 함수에서 `name` 값이 `username`인 `input`을 렌더링해 줬고, `state` 쪽에도 `username`이라는 값을 추가해 줬다. 그리고 `handleChange`도 조금 변경해 줬다.

> EventPractice.js

```js
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    username: "",
    message: "",
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleClick = (e) => {
    alert(this.state.username + ": " + this.state.message);
    this.setState({
      message: "",
    });
  }
  
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
         type='text'
         name='username'
         placeholder='사용자명'
         value={this.state.username}
         onChange={this.handleChange}
         />
        <input
         type='text'
         name='message'
         placeholder='아무거나 입력해 보세요'
         value={this.state.message}
         onChange={this.handleChange}
         />
         <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice
```

결과

<img width="675" alt="스크린샷 2021-02-18 오후 4 35 39" src="https://user-images.githubusercontent.com/61453718/108321324-574e0300-7207-11eb-961e-841f8c6f5a78.png">

`input` 두 개가 정상적으로 출력됐다.

여기선 다음 코드가 핵심이다.

> EventPractice > handleChange

```js
handleChange = (e) => {
  this.setState{(
    [e.target.name]: e.target.value
  });
};
```

객체 안에서 `key`를 `[ ]`로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 `key`값으로 사용된다.

예를 들어 다음과 같은 객체를 만든다고 해 보자.

```js
const name = 'variantKey';
const object = {
  [name]: 'value'
};
```

결과는 다음과 같다.

```js
{
  'variantKey': 'value'
}
```


#### onKeyPress 이벤트 핸들링 

이번에는 키를 눌렀을 때 발생하는 `KeyPress` 이벤트를 처리하는 방법을 알아보자. `comment` 인풋에서 `Enter`를 눌렀을 때 `handleClick` 메소드를 호출하도록 하는 코드를 작성해 보자.

> EventPractice.js

```js
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    username: "",
    message: "",
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleClick = (e) => {
    alert(this.state.username + ": " + this.state.message);
    this.setState({
      message: "",
    });
  }
  
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }
  
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
         type='text'
         name='username'
         placeholder='사용자명'
         value={this.state.username}
         onChange={this.handleChange}
         />
        <input
         type='text'
         name='message'
         placeholder='아무거나 입력해 보세요'
         value={this.state.message}
         onChange={this.handleChange}
         onKeyPress={this.handleKeyPress}
         />
         <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice
```

실행화면에서 각각에 임의의 값을 적고 엔터를 누르면

<img width="412" alt="스크린샷 2021-02-18 오후 4 41 32" src="https://user-images.githubusercontent.com/61453718/108321923-29b58980-7208-11eb-9d2f-3212a67472a8.png">

다음과 같은 결과가 나온다.


### 함수형 컴포넌트로 구현해 보기

> EventPractice.js

```js
import React, { useState } from 'react';

const EventPractice = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeMessage = (e) => setMessage(e.target.value);
  const onClick = () => {
    alert(username + ': ' + message);
    setUsername('');
    setMessage('');
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 보세요"
        value={message}
        onChange={onChangeMessage}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;
```

해당 코드 역시 클래스형 컴포넌트와 같은 기능이 잘 작동된다.

위 코드에서는 `e.target.name`을 활용하지 않고 `onChange` 관련 함수 두 개를 따로 만들어 줬다. `input`이 두 개밖에 없다면 이런 코드도 나쁘진 않으나, `input`의 개수가 많아질 것 같으면 `e.target.name`을 활용하는 것이 더 좋을 수도 있다.

이번에는 `useState`를 통해 사용하는 상태에 문자열이 아닌 객체를 넣어볼 것이다.

> EventPractice.js

```js
import React, { useState } from 'react';

const EventPractice = () => {
  const [form, setForm] = useState({
    username: '',
    message: '',
  });
  
  const { username, message } = form;
  const onChange = (e) => {
    const nextForm = {
      ...form, // 기존의 form 내용을 이 자리에 복사한 뒤
      [e.target.name]: e.target.value // 원하는 값을 덮어 씌우기
    };
    setForm(nextForm);
  };
  
  const onClick = () => {
    alert(username + ": " + message);
    setForm({
      username: '',
      message: '',
    });
  };
  const onKeyPress = (e) => {
   if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
       type='text'
       name='username'
       placeholder='사용자명'
       value={username}
       onChange={onChange}
       />
       <input
        type='text'
        name='username'
        placeholder='아무거나 입력해 보세요'
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
        />
        <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;
```

이 경우에도 원래의 기능이 잘 작동된다.

`e.target.name` 값을 활용하려면, 위와 같이 `useState`를 쓸 때 `input` 값들이 들어 있는 `form` 객체를 사용해주면 된다.

## 정리

리액트에서 이벤트를 다루는 것은, 순수 자바스크립트 또는 jQuery를 이용한 웹 어플리케이션에서 이벤트를 다루는 것과 비슷하다. 리액트의 장점 중 하나는 자바스크립트에 익숙하다면 쉽게 활용할 수 있다는 것이다. 따라서 기존 `HTML DOM Event`를 알고 있다면 리액트의 컴포넌트 이벤트도 쉽게 다룰 수 있을 것이다.

이번엔 클래스형 컴포넌트로도 구현해 보고 함수형 컴포넌트로도 구현해 봤다. 클래스형 컴포넌트로 할 수 있는 대부분의 작업은 함수형 컴포넌트로도 구현할 수 있다.

또한, 함수형 컴포넌트에서 여러 개의 `input` 상태를 관리하기 위해 `useState`에서 `form` 객체를 사용하는 방법도 배워봤다. 나중에 배울 `useReducer`와 커스텀 `Hooks`를 사용하면 이 작업을 훨씬 편하게 할 수도 있다.
