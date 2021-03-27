이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

# 일정관리 웹 어플리케이션 만들기

지금까지 리액트의 기본기부터 시작해서 컴포넌트를 스타일링하는 방법까지 배워 봤다. 이번에는 지금까지 배운 지식을 활용하여 프론트엔드를 공부할 때 많이 구현하는 일정 관리 어플리케이션을 만들어 볼 것이다.

`프로젝트 준비하기` ➡ `UI 구성하기` ➡ `기능 구현하기`의 흐름으로 진행된다.

## 1. 프로젝트 준비하기

### 1-1. 프로젝트 생성 및 필요한 라이브러리 설치

```
$ yarn create react-app todo-app

$ cd todo-app
$ yarn add node-sass classnames react-icons
```

이 프로젝트에서 Sass를 사용할 예정이므로 node-sass를 설치해 줬다. classnames는 나중에 조건부 스타일링을 좀 더 편하게 하기 위해 설치했다. react-icons는 리액트에서 다양하고 예쁜 아이콘을 사용할 수 있는 라이브러리이다. 아이콘 리스트와 사용법은 [여기](https://react-icons.netlify.com/)에서 확인할 수 있다. 이 라이브러리의 장점은 SVG 형태로 이뤄진 아이콘을 리액트 컴포넌트처럼 매우 쉽게 사용할 수 있다는 것이다. 아이콘의 크기나 색상은 props 혹은 CSS 스타일로 변경하여 사용할 수 있다.

### 1-2. Prettier 설정

전에 공부했던 Prettier를 설정하여 코드를 작성할 때 코드 스타일을 깔끔하게 정리할 것이다. 프로젝트 최상위 디렉토리에 .prettierrc 파일을 다음과 같이 생성하자.

> .prettierrc

```
  “singleQuote“: true,
  “semi“: true,
  “useTabs“: false,
  “tabWidth“: 2,
  “trailingComma“: “all“,
  “printWidth“: 80
```

### 1-3. index.css 수정

프로젝트의 글로벌 스타일 파일이 들어 있는 index.css를 조금 수정하자. 기존에 있던 폰트 설정은 지우고 background 속성을 설정하자.

> index.css

```css
body {
    margin: 0,
    padding: 0,
    background: #e9ecef;
}
```

배경색을 회색으로 설정했다.

### 1-4. App 컴포넌트 초기화

이제 기존에 있던 App 컴포넌트의 내용을 모두 삭제한다.

> App.js

```js
import React from "react";

const App = () => {
  return <div>Todo App을 만들자!</div>;
};

export default App;
```

## 2. UI 구성하기

앞으로 만들 컴포넌트를 하나하나 용도별로 소개할 것이다.

1. **TodoTemplate**: 화면을 가운데에 정렬시켜 주며, 앱 타이틀(일정 관리)을 보여준다. `children`으로 내부 JSX를 props로 받아와서 렌더링해 준다.
2. **TodoInsert**: 새로운 항목을 입력하고 추가할 수 있는 컴포넌트이다. state를 통해 인풋의 상태를 관리한다.
3. **TodoListItem**: 각 할 일 항목에 대한 정보를 보여 주는 컴포넌트이다. todo 객체를 props로 받아와서 상태에 따라 다른 스타일의 UI를 보여준다.
4. **TodoList**: todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 `map`을 사용해서 여러 개의 `TodoListItem` 컴포넌트로 변환하여 보여준다.

이렇게 총 네 개의 컴포넌트를 만든다. 이 컴포넌트들은 src 디렉토리에 components라는 디렉토리를 생성하여 그 안에 저장하자. 컴포넌트 파일을 components 디렉토리에 넣는 이유는 기능이나 구조상 필요하기 때문이 아니라 자주 사용되는 관습이기 때문이다.

여기선, 컴포넌트의 기능에 대해 신경 쓰기보다는 모양새를 갖추는 데 집중할 것이다.

### 2-1. TodoTemplate 만들기

src 내에 components 디렉토리를 생성한 뒤 그 안에 TodoTemplate.js와 TodoTemplate.scss 파일을 각각 생성하자. 그 다음에는 자바스크립트 파일을 다음과 같이 작성하자.

> TodoTemplate.js

```js
import React from "react";
import "./TodoTemplate.scss";

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
```

그 후 이를 App.js에서 불러온 후 렌더링하자.

> App.js

```js
import React from "react";
import TodoTemplate from "./components/TodoTemplate";

const App = () => {
  return <TodoTemplate>Todo App을 만들자!</TodoTemplate>;
};

export default App;
```

이 컴포넌트를 작성하는 과정에서 상단에 `import`를 넣지 않고 바로 컴포넌트를 사용하려고 하면, VSCode 에디터에서 자동 완성 기능이 나타날 것이다. 그 이후, jsconfig.json 파일을 만들고 해당 파일을 연 후

```
{
  "compilerOptions": {
    "target": "es6"
  }
}
```

위와 같은 코드를 적어주자. jsconfig.json 파일을 저장하고 나면, 불러오려는 컴포넌트 파일이 열려 있지 않아도 자동 완성을 통해 컴포넌트로 불러와서 사용할 수 있다. 이제 스타일을 작성해 보자.

> TodoTemplate.scss

```css
.TodoTemplate {
  width: 512px;
  /* width가 주어진 상태에서 좌우 중앙 정렬 */
  margin: 6rem auto 0 auto;
  border-radius: 4px;
  overflow: hidden;
}

.app-title {
  background: #22b8cf;
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  background: white;
}
```

<img width="638" alt="스크린샷 2021-03-27 오후 5 22 41" src="https://user-images.githubusercontent.com/61453718/112715025-0bd2f700-8f21-11eb-8b18-554bdeec0173.png">

여기서는 레이아웃을 할 때 flex라는 display 속성을 자주 쓸 텐데, 코드에 있는 주석을 읽으며 작성해보면 각 코드가 어떤 역할을 하는지 충분히 학습할 수 있지만, flex를 더 자세히 알고 싶다면 [Flexbox Foggy](http://flexboxfroggy.com/#ko)라는 사이트를 추천한다. flex를 학습하는데 큰 도움이 될 것이다.

### 2-2. TodoInsert 만들기

이번에는 TodoInsert를 만들 차례이다. components 디렉토리에 TodoInsert.js와 TodoInsert.scss 파일을 생성하자.

> TodoInsert.js

```js
import React from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

const TodoInsert = () => {
  return (
    <form className="TodoInsert">
      <input placeholder="할 일을 입력하세요" />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
```

여기서 처음으로 `react-icons`의 아이콘을 사용했다.

[react-icons](https://react-icons.netlify.com/#/icons/md)에 들어가면 수많은 아이콘과 이름이 함께 나타나는데, 여기서 사용하고 싶은 아이콘을 고른 다음 import 구문을 사용하여 불러온 후 컴포넌트처럼 사용하면 된다.

```js
import { 아이콘 이름 } from 'react-icon/md';
```

이제 이를 App에서 불러와 렌더링해 보자.

> App.js

```js
import React from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
    </TodoTemplate>
  );
};

export default App;
```

<img width="672" alt="스크린샷 2021-03-27 오후 5 30 52" src="https://user-images.githubusercontent.com/61453718/112715162-2f4a7180-8f22-11eb-9b32-0c8ca4162782.png">

이제 이 컴포넌트를 스타일링해 보자.

> TodoInsert.scss

```scss
.TodoInsert {
  display: flex;
  background: #495057;
  input {
    // 기본 스타일 초기화
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: white;
    &::placeholder {
      color: #dee2e6;
    }
    // 버튼을 제외한 영역을 모두 차지하기
    flex: 1;
  }
  button {
    // 기본 스타일 초기화
    background: none;
    outline: none;
    border: none;
    background: #868e96;
    color: white;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &::hover {
      background: #adb5bd;
    }
  }
}
```

<img width="652" alt="스크린샷 2021-03-27 오후 5 33 35" src="https://user-images.githubusercontent.com/61453718/112715251-910adb80-8f22-11eb-852c-9cb74cb51af6.png">

스타일링을 하니 TodoInsert 컴포넌트가 훨씬 아름다워졌다.

### 2-3. TodoListItem과 TodoList 만들기

이제 일정 관리 항목이 보일 TodoListItem과 TodoList를 만들 차례이다.

먼저 TodoListItem 컴포넌트부터 만들어보자. components 디렉토리에 TodoListItem.js와 TodoListItem.scss를 만든 후 TodoListItem.js를 다음과 같이 작성해 보자.

> TodoListItem.js

```js
import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import "./TodoListItem.scss";

const TodoListItem = () => {
  return (
    <div className="TodoListItem">
      <div className="checkbox">
        <MdCheckBoxOutlineBlank />
        <div className="text">할 일</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
```

여기서는 다양한 아이콘을 불러와 사용했다. 아직 `MdCheckBox` 아이콘 컴포넌트는 사용하지 않은 상태인데, 이 아이콘은 나중에 할 일이 완료되었을 때 체크된 상태를 보여주기 위해 사용할 아이콘이다.

이 컴포넌트를 다 작성했으면 TodoList.js 파일과 TodoList.scss 파일을 생성하고 TodoList.js 파일을 다음과 같이 작성해보자.

> TodoList.js

```js
import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = () => {
  return (
    <div className="TodoList">
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </div>
  );
};

export default TodoList;
```

지금은 이 컴포넌트에 TodoListItem을 불러와서 별도의 pros 전달 없이 그대로 여러 번 보여주고 있다. 나중에는 여기에 기능을 추가하고 다양한 데이터를 전달할 것이다.

이제 App에서 렌더링 해주자.

> App.js

```js
import React from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  );
};

export default App;
```

아직 scss 파일에 스타일링이 되어있지 않아 컴파일 에러가 나온다.

이제 스타일링을 해보자.

스타일링할 첫 번째 컴포넌트는 TodoList인데, 필요할 스타일이 그다지 많지 않다.

> TodoList.scss

```scss
.TodoList {
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
}
```

그 다음에는 TodoListItem을 스타일링하자.

> TodoListItem.scss

```scss
.TodoListItem {
  padding: 1rem;
  display: flex;
  align-items: center; // 세로 중앙 정렬
  &:nth-child(even) {
    background: #f8f9fa;
  }
  .checkbox {
    cursor: pointer;
    flex: 1; // 차지할 수 있는 영역 모두 차지
    display: flex;
    align-items: center; // 세로 중앙 정렬
    svg {
      // 아이콘
      font-size: 1.5rem;
    }
    .text {
      margin-left: 0.5rem;
      flex: 1; // 차지할 수 있는 영역 모두 차지
    }
    // 체크되었을 때 보여 줄 스타일
    &.checked {
      svg {
        color: #22b8cf;
      }
      .text {
        color: #abd5bd;
        text-decoration: line-through;
      }
    }
  }
  .remove {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #ff6b6b;
    cursor: pointer;
    &:hover {
      color: #ff8787;
    }
  }

  // 엘리먼트 사이사이에 테두리를 넣어 줌
  & + & {
    border-top: 1px solid #dee2e6;
  }
}
```

<img width="582" alt="스크린샷 2021-03-27 오후 5 49 45" src="https://user-images.githubusercontent.com/61453718/112715644-d3cdb300-8f24-11eb-9805-35d432d9bafc.png">

이제 컴포넌트의 스타일링이 모두 끝났다.

## 3. 기능 구현하기

이제 일정 관리 어플리케이션이 실제로 동작할 수 있도록 기능을 구현해 보자.

### 3-1. App에서 todos 상태 사용하기

나중에 추가할 일정 항목에 대한 상태들은 모두 App 컴포넌트에서 관리한다. App에서 useState를 사용하여 todos라는 상태를 정의하고, todos를 TodoList의 props로 전달해 보자.

> App.js

```js
import React, { useState } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "리액트의 기초 알아보기",
      checked: true,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링해보기",
      checked: true,
    },
    {
      id: 3,
      text: "일정 관리 앱 만들어보기",
      checked: false,
    },
  ]);

  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default App;
```

todos 배열 안에 들어 있는 객체에는 각 항목의 고유 id, 내용, 완료 여부를 알려 주는 값이 포함되어 있다. 이 배열은 TodoList에 props로 전달되는데, TodoList에서 이 값을 받아온 후 TodoListItem으로 변환하여 렌더링하도록 설정해야 한다.

> TodoList.js

```js
import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
```

props로 받아온 todos 배열을 배열 내장 함수 map을 통해 TodoListItem으로 이루어진 배열로 변환하여 렌더링해 줬다. map을 사용하여 컴포넌트로 변환할 때는 key props를 전달해 줘야 한다고 배웠다. 여기서 사용되는 key 값은 각 항목마다 갖고 있는 고유값인 id를 넣어 주자. 그리고 todo 데이터는 통째로 props로 전달해 주자. 여러 종류의 값을 전달해야 하는 경우에는 객체로 통째로 전달하는 편이 나중에 성능 최적화를 할 때 편리하다.

이제 TodoListItem 컴포넌트에서 받아 온 todo 값에 따라 제대로 된 UI를 보여줄 수 있도록 컴포넌트를 수정해 보자. 이 코드에서는 조건부 스타일링을 위해 classnames를 사용한다.

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

const TodoListItem = ({ todo }) => {
  const { text, checked } = todo;

  return (
    <div className="TodoListItem">
      <div className={cn("checkbox", { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};
```

<img width="583" alt="스크린샷 2021-03-27 오후 6 31 23" src="https://user-images.githubusercontent.com/61453718/112716604-a3891300-8f2a-11eb-89b5-e1fd42a3bafd.png">

이제 TodoList 컴포넌트는 App에서 전달해 준 todos 값에 따라 다른 내용을 제대로 보여 준다.

### 3-2. 항목 추가 기능 구현하기

이번에는 일정 항목을 추가하는 기능을 구현해 볼 것이다. 이 기능을 구현하려면, TodoInsert 컴포넌트에서 인풋 상태를 관리하고 App 컴포넌트에는 todos 배열에 새로운 객체를 추가하는 함수를 만들어 줘야 한다.

#### 3-2-1. TodoInsert value 상태 관리하기

TodoInsert 컴포넌트에서 인풋에 입력하는 값을 관리할 수 있도록 useState를 사용하여 value라는 상태를 정의할 것이다. 추가로 인풋에 넣어 줄 onChange 함수도 작성해 줘야 하는데, 이 과정에서 컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라, 한 번 함수를 만들고 재사용할 수 있도록 useCallback Hook을 사용할 것이다.

> TodoInsert.js

```js
import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

const TodoInsert = () => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <form className="TodoInsert">
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
```

이제 인풋에 텍스트를 입력해 보자. 오류가 발생하지 않고 텍스트가 잘 입력될 것이다.

사실 인풋은 value 값과 onChange를 설정하지 않더라도 입력할 수 있다. 그저 리액트 컴포넌트 쪽에서 해당 인풋에 무엇이 입력되어 있는지 추적하지 않을 뿐이다. 이런 경우 현재 state가 잘 업데이트되고 있는지 확인하려면, onChange 함수 안에서 console.log를 찍어 보는 것 외에 어떤 방법이 있을까? 바로 리액트 개발자 도구(React Developer Tools)를 사용하는 방법이 있다.

#### 3-2-2. 리액트 개발자 도구

리액트 개발자 도구는 브라우저에 나타난 리액트 컴포넌트를 심층 분석할 수 있도록 리액트 개발 팀이 만들었으며, 크롬 웹 스토어에서 설치할 수 있다.

설치한 후 크롬 개발자 도구를 열면 개발자 도구 탭에 **React**가 나타난다. 이를 클릭하고, 하단에 나오는 Elements 탭에서 TodoInsert 컴포넌트를 검색한 후 선택하면, 인풋을 수정했을 때 Hooks의 state 부분에도 똑같은 값이 잘 들어가는 것을 확인할 수 있다.

<img width="851" alt="스크린샷 2021-03-27 오후 6 42 55" src="https://user-images.githubusercontent.com/61453718/112716868-3fffe500-8f2c-11eb-8dbc-2f2b174c3f6f.png">

#### 3-2-3. todos 배열에 새 객체 추가하기

이번에는 App 컴포넌트에서 todos 배열에 새 객체를 추가하는 onInsert 함수를 만들어 볼 것이다. 이 함수에서는 새로운 객체를 만들 때마다 id 값에 1씩 더해 줘야 하는데, id값은 useRef를 사용하여 관리할 것이다. 여기서 useState가 아닌 useRef를 사용하여 컴포넌트에서 사용할 변수를 만드는 이유는 무엇일까? id값은 렌더링되는 정보가 아니기 때문이다. 예를 들어, 이 값은 화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가 리렌더링될 필요도 없다. 단순히 새로운 항목을 만들 때 참조되는 값일 뿐이다.

또한, onInsert 함수는 컴포넌트의 성능을 아낄 수 있도록 useCallback으로 감싸 줄 것이다. props로 전달해야 할 함수를 만들 때는 useCallback을 사용하여 함수를 감싸는 것을 습관화하자.

onInsert 함수를 만든 뒤에는 해당 함수를 TodoInsert 컴포넌트의 props로 설정해 주자.

> App.js

```js
import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "리액트의 기초 알아보기",
      checked: true,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링해보기",
      checked: true,
    },
    {
      id: 3,
      text: "일정 관리 앱 만들어보기",
      checked: false,
    },
  ]);

  // 고유값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; // nextId 1씩 더하기
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default App;
```

#### 3-2-4. TodoInsert에서 onSubmit 이벤트 설정하기

지금부터는 버튼을 클릭하면 발생할 이벤트를 설정해 볼 것이다. 방금 App에서 TodoInsert에 넣어 준 onInsert 함수에 현재 useState를 통해 관리하고 있는 value값을 파라미터로 넣어서 호출한다.

> TodoInsert.js

```js
(...)

const TodoInsert = ({ onInsert }) => {
  (...)

  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue(""); // value 값 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시키는데,
      // 이를 방지하기 위해 이 함수를 호출한다.
      e.preventDefault();
  },
  [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      (...)
    </form>
  )
}
```

onSubmit이라는 함수를 만들고, 이를 form의 onSubmit으로 설정했다. 이 함수가 호출되면 props로 받아 온 onInsert 함수에 현재 value 값을 파라미터로 넣어서 호출하고, 현재 value 값을 초기화한다.

추가로 onSubmit 이벤트는 브라우저를 새로고침시킨다. 이때 `e.preventDefault()` 함수를 호출하면 새로고침을 방지할 수 있다.

물론 다음과 같이 onSubmit 대신에 onClick 이벤트로도 충분히 처리할 수 있다.

```js
const onClick = useCallback(() => {
  onInsert(value);
  setValue("");
}, [onInsert, value]);

return (
  <form className=“TodoInsert“>
  <input
    placeholder=“할 일을 입력하세요“
    value={value}
    onChange={onChange}
    />
    <button onClick={onClick}>
      <MdAdd />
    </button>
  </form>
);
```

이렇게 클릭 이벤트만으로도 할 수 있는데 굳이 form과 onSubmit 이벤트를 사용한 이유는 무엇일까? onSubmit 이벤트의 경우 인풋에서 엔터를 눌렀을 때도 발생하기 때문이다. 반면 버튼에서 onClick만 사용했다면, 인풋에서 onKeyPress 이벤트를 통해 엔터를 감지하는 로직을 따로 작성해야 한다. 그렇기 때문에 이번에는 onClick이 아닌 onSubmit으로 새 항목을 추가하도록 처리했다.

<img width="669" alt="스크린샷 2021-03-27 오후 6 58 32" src="https://user-images.githubusercontent.com/61453718/112717204-6e7ebf80-8f2e-11eb-8e2b-bb608252c1a5.png">

이제 일정 항목 추가 기능이 모두 구현되었다.

### 3-3. 지우기 기능 구현하기

이번에는 지우기 기능을 구현해 볼 것이다. 리액트 컴포넌트에서 배열의 불변성을 지키면서 배열 원소를 제거해야 할 경우, 배열 내장 함수인 filter를 사용하면 매우 간편하다.

#### 3-3-1. 배열 내장 함수 filter

filter 함수는 기존의 배열은 그대로 둔 상태에서 특정 조건을 만족하는 원소들만 따로 추출하여 새로운 배열을 만들어 준다.

다음 예제 코드를 확인해 보자.

> filter 사용 예제

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const biggerThanFive = array.filter((number) => number > 5);
// 결과: [6, 7, 8, 9, 10]
```

filter 함수에는 조건을 확인해 주는 함수를 파라미터로 넣어 줘야 한다. 파라미터로 넣는 함수는 true 혹은 false 값을 반환해야 하며, 여기서 true를 반환하는 경우만 새로운 배열에 포함된다.

#### 3-3-2. todos 배열에서 id로 항목 지우기

방금 배운 filter 함수를 사용해서 onRemove 함수를 작성해 보자. App 컴포넌트에 id를 파라미터로 받아와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수이다. 이 함수를 만들고 나서 TodoList의 props로 설정해 주자.

> App.js

```js
import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from ‘./components/TodoTemplate‘;
import TodoInsert from ‘./components/TodoInsert‘;
import TodoList from ‘./components/TodoList‘;

const App = () => {
  (...)

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} />
    </TodoTemplate>
  )
}

export default App;
```

#### 3-3-3. TodoListItem에서 삭제 함수 호출하기

TodoListItem에서 방금 만든 onRemove 함수를 사용하려면 우선 TodoList 컴포넌트를 거쳐야 한다. 다음과 같이 props로 받아 온 onRemove 함수를 TodoListItem에 그대로 전달해 주자.

> TodoList.js

```js
const TodoList = ({ todos, onRemove }) => {
  return (
    <div className=“TodoList“>
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} />
      ))}
    </div>
  );
};
```

이제 삭제 버튼을 누르면 TodoListItem에서 onRemove 함수에 현재 자신이 가진 id를 넣어서 삭제 함수를 호출하도록 설정해 보자.

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

const TodoListItem = ({ todo, onRemove }) => {
  const { id, text, checked } = todo;

  return (
    <div className="TodoListItem">
      <div className={cn("checkbox", { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
```

다 작성했으면, 브라우저를 열어 일정 항목의 우측에 나타나는 빨간색 아이콘을 눌러 보자. 잘 지워질 것이다.

### 3-4. 수정 기능

수정 기능도 방금 만든 삭제 기능과 꽤 비슷하다. onToggle이라는 함수를 App에 만들고, 해당 함수를 TodoList 컴포넌트에게 props로 넣어 주자. 그 다음에는 TodoList를 통해 TodoListItem까지 전달하면 된다.

> App.js

```js
const onToggle = useCallback(
  (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  },
  [todos]
);

return (
  <TodoTemplate>
    <TodoInsert onInsert={onInsert} />
    <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
  </TodoTemplate>
);
```

위 코드에서는 배열 내장 함수 map을 사용하여 특정 id를 갖고 있는 객체의 checked 값을 반전시켜 줬다. 불변성을 유지하면서 특정 배열 원소를 업데이트해야 할 때 이렇게 map을 사용하면 짧은 코드로 쉽게 작성할 수 있다.

자, 여기서 갑자기 왜 map이 사용된 것인지 이해하기 힘들 수도 있다. map 함수는 배열을 전체적으로 새로운 형태로 변환하여 새로운 배열을 생성해야 할 때 사용한다고 배웠다. 지금은 딱 하나의 원소만 수정하는데 왜 map을 사용할까?

onToggle 함수를 보면 `todo.id === id ? ... : ...` 라는 삼항 연산자가 사용된다. 여기서 사용한 코드에 대해 좀 더 자세히 알아보자. todo.id와 현재 파라미터로 사용된 id값이 같을 때는 우리가 정해준 규칙대로 새로운 객체를 생성하지만, id값이 다를 때는 변화를 주지 않고 처음 받아 왔던 상태 그대로 반환한다. 그렇기 때문에 map을 사용하여 만든 배열에서 변화가 필요한 원소만 업데이트되고 나머지는 그대로 남아 있게 되는 것이다.

이어서 TodoListItem도 수정해 보자. 이전에 onRemove를 사용했던 것과 비슷하게 구현하면 된다.

> TodoListItem.js

```js
(...)

const TodoListItem = ({todo, onRemove, onToggle}) => {
  const { id, text, checked } = todo;

  return (
    <div className=“TodoListItem“>
      <div className={cn(‘checkbox‘, { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className=“text“>{text}</div>
      </div>
      <div className=“remove“ onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};
```

#### 3-4-2. TodoListItem에서 토글 함수 호출하기

이제 App에서 만든 onToggle 함수를 TodoListItem에서도 호출할 수 있도록 TodoList를 거쳐 TodoListItem에게 전달할 것이다.

> TodoList.js

```js
import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
```

<img width="602" alt="스크린샷 2021-03-27 오후 8 01 10" src="https://user-images.githubusercontent.com/61453718/112718557-2e700a80-8f37-11eb-9c6f-7a27e8afc985.png">

이제 클릭할 때마다 체크박스가 체크되었다가 해제되었다가 한다.

## 4. 정리

첫 프로젝트를 완성했다. 이 프로젝트는 소규모이기 때문에 따로 컴포넌트 리렌더링 최적화 작업을 하지 않아도 정상적으로 작동한다. 하지만 일정 항목이 몇만개씩 생긴다면 새로운 항목을 추가하거나 기존 항목을 삭제 및 토글할 때 지연이 발생할 수 있다. 클라이언트 자원을 더욱 효율적으로 사용하려면 불필요한 리렌더링을 방지해야 하는데, 이에 관한 내용은 다음 장에서 다룬다.
