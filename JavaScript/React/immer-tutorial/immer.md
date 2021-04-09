이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

# immer를 사용하여 더 쉽게 불변성 유지하기

11장에선, 컴포넌트 업데이트 성능을 어떻게 최적회해야 하는지, 불변성을 유지하면서 상태를 업데이트하는 것이 왜 중요한지 배웠다. 전개 연산자와 배열의 내장 함수를 사용하면 간단하게 배열 혹은 객체를 복사하고 새로운 값을 덮어쓸 수 있다. 하지만 객체의 구조가 엄청나게 깊어지면 불변성을 유지하면서 이를 업데이트하는 것이 매우 힘들다.

> 예시 코드

```js
const object = {
  somewhere: {
    deep: {
      inside: 3,
      array: [1, 2, 3, 4],
    },
    bar: 2,
  },
  foo: 1,
};

// somewhere.deep.inside의 값을 4로 바꾸기

let nextObject = {
  ...object,
  somewhere: {
    ...object.somewhere,
    deep: {
      ...object.somewhere.deep,
      inside: 4,
    },
  },
};

// somewhere.deep.array에 5 추가하기
let nextObject = {
  ...object,
  somewhere: {
    ...object.somewhere,
    deep: {
      ...object.somewhere.deep,
      array: object.somewhere.deep.array.concat(5),
    },
  },
};
```

값 하나를 업데이트하기 위해 코드를 열 줄 정도 작성해야 한다. 이렇게 전개 연산자를 자주 사용한 것은 기존에 갖고 있던 다른 값은 유지하면서 원하는 값을 새로 지정하기 위해서이다.

간혹 실제 프로젝트에서도 이렇게 복잡한 상태를 다룰 때가 있는데, 그럴 때마다 전개 연산자를 여러 번 사용하는 것은 꽤 번거로운 작업이다. 가독성 또한 좋지 않다.

이러한 상황에 **immer**라는 라이브러리를 사용하면, 구조가 복잡한 객체도 매우 쉽고 짧은 코드를 사용하여 불변성을 유지하면서 업데이트해줄 수 있다.

`immer를 설치하고, 사용법 알아보기` ➡ `immer를 사용하여 간단한 프로젝트 만들어 보기` 의 흐름으로 진행한다.

## 12-1. immer를 설치하고 사용법 알아보기

### 12-1-1. 프로젝트 준비

이 절에서는 immer 사용법을 익혀보자. 간단한 리액트 프로젝트를 새로 생성하고, yarn을 통해 immer를 설치해주자.

### 12-1-2. immer를 사용하지 않고 불변성 유지

먼저 immer를 사용하지 않고 불변성을 유지하면서 값을 업데이트하는 컴포넌트를 작성해 보자.

> App.js

```js
import React, { useRef, useCallback, useState } from "react";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", usename: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  // input 수정을 위한 함수
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: [value],
      });
    },
    [form]
  );

  // form 등록을 위한 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      // array에 새 항목 등록
      setData({
        ...data,
        array: data.array.concat(info),
      });

      // form 초기화
      setForm({
        name: "",
        username: "",
      });
      nextId.current += 1;
    },
    [data, form.name, form.username]
  );

  // 항목을 삭제하는 함수

  const onRemove = useCallback(
    (id) => {
      setData({
        ...data,
        array: data.array.filter((info) => info.id !== id),
      });
    },
    [data]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
```

폼에서 아이디 / 이름을 입력하면 하단 리스트에 추가되고, 리스트 항목을 클릭하면 삭제되는 간단한 컴포넌트를 만들었다. 이렇게 전개 연산자와 배열 내장 함수를 사용하여 불변성을 유지하는 것은 어렵지 않지만, 상태가 복잡해진다면 조금 귀찮은 작업이 될 수도 있다.

<img width="358" alt="스크린샷 2021-04-09 오후 1 09 31" src="https://user-images.githubusercontent.com/61453718/114127168-d4a71180-9934-11eb-8a0f-0d264793d0f7.png">

### 12-1-3. immer 사용법

immer를 사용하면 불변성을 유지하는 작업을 매우 간단하게 처리할 수 있다. 이 라이브러리의 사용법은 다음과 같다.

> 예시 코드

```js
import produce from "immer";
const nextState = produce(originalState, (draft) => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

produce라는 함수는 두 가지 파라미터를 받는다. 첫 번째 파라미터는 수정하고 싶은 상태이고, 두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수이다.

두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해 준다.

이 라이브러리의 핵심은 **'불변성에 신경쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해 주는 것'** 이다. 단순히 깊은 곳에 위치하는 값을 바꾸는 것 외에 배열을 처리할 때도 매우 쉽고 편하다.

다음 코드는 좀 더 복잡한 데이터를 불변성을 유지하면서 업데이트하는 예시이다.

> 예시 코드

```js
import produce from "immer";

const originalState = [
  {
    id: 1,
    todo: "전개 연산자와 배열 내장 함수로 불변성 유지하기",
    checked: true,
  },
  {
    id: 2,
    todo: "immer로 불변성 유지하기",
    checked: false,
  },
];

const nextState = produce(originalState, (draft) => {
  // id가 2인 항목의 checked 값을 true로 설정
  const todo = draft.find((t) => t.id === 2); // id로 항목 찾기
  todo.checked = true;
  // 혹은 draft[1].checked = true;

  // 배열에 새로운 데이터 추가
  draft.push({
    id: 3,
    todo: "일정 관리 앱에 immer 적용하기",
    checked: false,
  });

  // id = 1인 항목을 제거하기
  draft.splice(
    draft.findIndex((t) => t.id === 1),
    1
  );
});
```

### 12-1-4. App 컴포넌트에 immer 적용하기

방금 만든 App 컴포넌트에 immer를 적용하여 더 깔끔한 코드로 상태를 업데이트해보자. App.js를 다음과 같이 수정해보자.

> App.js

```js
import React, { useRef, useCallback, useState } from "react";
import produce from "immer";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", usename: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  // input 수정을 위한 함수
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      // ...form,
      // [name]: [value],
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);

  // form 등록을 위한 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      // array에 새 항목 등록
      setData(
        // ...data,
        // array: data.array.concat(info),
        produce((draft) => {
          draft.array.push(info);
        })
      );

      // form 초기화
      setForm({
        name: "",
        username: "",
      });
      nextId.current += 1;
    },
    [form.name, form.username]
  );

  // 항목을 삭제하는 함수

  const onRemove = useCallback(
    (id) => {
      setData(
        produce(data, (draft) => {
          draft.array.splice(
            draft.array.findIndex((info) => info.id === id),
            1
          );
        })
      );
    },
    [data]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
```

코드를 다 작성했다면, 이전과 똑같이 제대로 작동하는지 확인해 보자. 잘 작동하는가? Immer를 사용하여 컴포넌트 상태를 작성할 때는 객체 안에 있는 값을 직접 수정하거나, 배열에 직접적인 변화를 일으키는 push, splice 등의 함수를 사용해도 무방하다. 그렇기 때문에 불변성 유지에 익숙하지 않아도 자바스크립트에 익숙하다면 컴포넌트 상태에 원하는 변화를 쉽게 반영시킬 수 있다. immer를 사용한다고 해서 무조건 코드가 간결해지지는 않는다. onRemmove의 경우에는 배열 내장 함수 filter를 사용하는 것이 코드가 더 깔끔하므로, 굳이 immer를 적용할 필요가 없다. immer는 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분하다.
