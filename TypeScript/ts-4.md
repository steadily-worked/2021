<h1>TypeScript-4 인터페이스와 클래스</h1><a href='https://ahnheejong.gitbook.io/ts-for-jsdev'>출처</a>

<h2>4.0 들어가며</h2>

> 타입스크립트에서 가장 중요하고 자주 쓰이는 두 추상화 수단, 인터페이스와 클래스에 대해 다룬다.

3장에서 다룬 내용만으로도 간단한 프로그램은 큰 어려움 없이 작성할 수 있다. 하지만 프로젝트의 규모가 커짐에 따라 코드를 더 일관적으로 구조화할 수단이 필요하다. 4장에서는 타입스크립트가 코드의 구조화를 위해 제공하는 대표적인 두 가지 수단인 인터페이스와 클래스에 대해 다룬다.

<b>인터페이스</b>(interface)를 통해 값이 따라야 할 제약을 타입으로 표현할 수 있다. 인터페이스 타입을 통해 값의 형태(shape)를, 즉 값이 어떤 멤버를 가져야 하고 각 멤버의 타입은 어때야 하는지를 서술할 수 있다.

<b>클래스</b>(class)를 이용해 객체 지향 프로그래밍 언어와 비슷한 방식으로 코드를 구조화할 수 있다. 타입스크립트의 클래스는 ES6에 추가된 클래스 문법의 확장으로, 접근 제어자 등의 유용한 추가 기능을 제공한다.

<h2>4.1 인터페이스 기초</h2>

> 인터페이스의 기초적인 개념과 용례를 알아본다.

`interface` 키워드를 사용해 값이 특정한 형태(shape)를 갖도록 제약할 수 있다. 인터페이스를 정의하는 기본적인 문법은 객체 타입의 그것과 유사하다.

```ts
interface User {
  name: string;
  height: number;
}
```

또한 객체 타입에서와 비슷하게 인터페이스의 속성을 <b>읽기 전용 속성</b> 또는 <b>선택 속성</b>으로 정의할 수 있다.

```ts
interface User {
  name: string;
  readonly height: number;
  favoriteLanguage?: string;
}
const author: User = { name: "박상민", height: 177 }; // ok
author.height = 183; // error TS2540: Cannot assign to 'height' because it is a constant or a read-only property.
```

<h3>함수 인터페이스</h3>

인터페이스를 이용해 함수 타입을 표현할 수 있다. 함수 타입의 표현을 위해선 호출 시그니처(call signature)를 제공해야 하는데, 함수 타입 정의와 유사한 아래 문법을 사용한다.

```ts
(매개변수1 이름: 매개변수1 타입, 매개변수2 이름: 매개변수2 타입, ...): 반환 타입
```

예를 들어, `User` 타입의 값 `user`를 받아 이름을 반환하는 함수 인터페이스를 다음과 같이 적을 수 있다.

```ts
interface GetUserName {
  (user: User): string;
}
const getUserName: GetUserName = function (user) {
  return user.name;
};
```

이 때 실제 함수 정의와 인터페이스에서의 매개변수 이름은 꼭 같을 필요는 없다. 즉 위 코드에서 아래처럼 매개변수명을 `user`가 아닌 `u`로 바꾸어 써도 매개변수의 타입 순서만 맞는다면 에러는 발생하지 않는다.

```ts
const getUserName: GetUserName = function (u) {
  return u.name;
};
```

<h3>하이브리드 타입</h3>

자바스크립트에서는 jQuery의 `$`와 같이 호출 가능한(callable) 동시에 추가적으로 여러 속성을 갖는 객체가 존재할 수 있다. 이런 객체의 타입을 표현하기 위해 호출 시그니처와 속성 타입 정의를 동시에 적을 수 있다. 타입스크립트 공식 문서의 `Counter` 예제를 살펴보자.

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

위의 `Counter` 타입의 값은 함수로서 호출할 수 있고, 따라서 호출 시그니처를 갖는다. 한편, 이 인터페이스는 추가적으로 `interval`과 `reset`이라는 속성을 가진다. 따라서 인터페이스는 해당 속성의 타입 정보 또한 포함한다.

이렇게 호출 시그니처와 속성 타입을 동시에 갖는 인터페이스를 하이브리드 타입(hybrid type)이라 부른다.

<h3>제너릭 인터페이스</h3>

인터페이스 이름 뒤에 타입 변수 정의를 붙여 제너릭 인터페이스(generic interface)를 정의할 수 있다. 예를 들어, 서버로부터 받은 임의의 응답을 나타내는 `Response` 인터페이스를 아래와 같이 정의할 수 있다.

```ts
interface MyResponse<Data> {
  data: Data;
  status: number;
  ok: boolean;
  /* ... */
}
interface User {
  name: string;
  readonly height: number;
  /* ... */
}
const response: MyResponse<User> = await getUserApiCall(userId);
const user: User = response.data;
user.name; // 타입 시스템은 user.name이 string임을 알 수 있다.
```

함수 인터페이스의 정의에도 제너릭을 사용할 수 있다. 이 경우 타입 변수는 매개변수의 앞에 적는다.

```ts
interface GetData {
  <Data>(response: MyResponse<Data>): Data;
}
```

<h3>타입 별칭과의 차이</h3>

타입에 새로운 이름을 붙이는 수단이라는 점에서 인터페이스와 앞서 살펴본 타입 별칭은 비슷한 점이 많다. 하지만 두 개념 사이엔 다음과 같은 차이점이 있다.

- 타입 별칭을 이용해서 기본 타입, 배열과 튜플, 유니온 타입 등에 새로운 이름을 붙일 수 있다.(`type UUID = string`). 인터페이스로는 해당 타입을 표현하는 것이 불가능하다.
- 타입 별칭은 실제로는 새 타입을 생성하지 않는다. 따라서 `type User = { name: string; }` 타입과 관련된 타입 에러가 발생했을 시 에러 메시지는 `User` 대신 `{ name: string; }`를 보여준다. 한편 인터페이스는 실제로 새 타입을 생성하고, `interface User { name: string; }`과 관련된 에러 메시지에는 `User`가 등장한다.
- 인터페이스는 곧 다룰 `extends` 키워드를 이용해 확장할 수 있는 반면, 타입 별칭의 경우는 그런 수단을 제공하지 않는다.

이런 차이점 때문에 타입스크립트 공식 문서는 가능한 경우 항상 타입 별칭보다 인터페이스를 사용할 것을 권장한다. <b>기본적으로 인터페이스로 표현할 수 있는 모든 타입은 인터페이스로 표현하고, 기본 타입에 새로운 이름을 붙이고 싶거나 유니온 타입을 명명하고 싶은 경우 등 인터페이스의 능력 밖인 부분에서만 타입 별칭을 사용하라.</b>

<h2>4.2 색인 가능 타입</h2>

> 동적인 색인을 표현하는 색인 가능 타입에 대해 다룬다.

앞서 다룬 예시들은 모두 코드 작성 시점에 속성 이름이 알려져 있었다. 하지만 <b>코드의 실행 시점에서만 알 수 있는 이름의 동적 속성을 갖는 타입</b>은 어떻게 표시해야 할까?

```ts
const users: = [
    { name: "박상민", height: 177, favoriteLanguage: "TypeScript" },
    { name: "Stranger", height: 42 }
];
interface NameHeightMap {
    // ??
}
const nameHeightMap: NameHeightMap = {};
users.map(user => {
    nameHeightMap[user.name] = user.height;
});
console.log(userHeightMap) // { "박상민": 177, "Stranger": 42 }
```

위 코드의 `nameHeightMap`은 <b>임의의 유저 목록</b>을 받아 유저의 이름을 키로, 유저의 신장을 값으로 갖는 매핑이다. 이 때 이 객체의 키들은 임의의 유저 이름이므로 코드를 작성하는 시점에서는 모든 가능한 키를 나열하는 것이 불가능하다. 예를 들어 위 타입을 아래와 같이 정의한다고 해 보자.

```ts
interface NameHeightMap {
  박상민: number;
  Stranger: number;
}
```

이 경우 이후 `users` 값에 `{ name: 'newface', height: 777 }` 등의 유저가 추가되는 경우를 제대로 처리하지 못할 것이다. 또한 실제로는 `users`와 같은 정보를 실행 시간에 서버로부터 얻어오는 등의 경우가 많은데, 이런 경우 역시 커버할 수 없다. 이럴 때 필요한 것이 바로 <b>색인 가능 타입</b>(indexable type)이다.

<h3>색인 시그니쳐</h3>

색인 가능 타입을 이용해 색인 가능한(indexable) 객체의 타입을 정의할 수 있다. 색인 가능 타입을 정의하기 위해서는 색인에 접근할 때 사용하는 기호인 대괄호(`[]`)를 이용해 객체의 색인 시그니쳐(index signature)를 적어줘야 한다.

예를 들어 위의 `NameHeightMap` 인터페이스는 색인 가능 타입을 사용해 아래와 같이 적을 수 있다.

```ts
interface NameHeightMap {
  [userName: string]: number | undefined;
}
```

위 정의는 다음과 같이 읽는다.

- `NameHeightMap` 타입의 값을
- 임의의 `string` 타입 값 `userName`으로 색인한 값(`[userName: string]` -> 인덱스 시그니처)
- 즉 `nameHeightMap[userName]`은 `number` 또는 `undefined` 타입의 값이다. (`: number | undefined`)

위 예제에선 색인된 값이 `number`가 아닌 `number | undefined` 타입을 가지는 것에 유의하라. `nameHeightMap`이 모든 문자열을 키로 갖고 있다는 보장이 없으므로 `nameHeightMap['없는 유저']` 따위의 값은 `undefined`일 수 있기 때문이다.

이 경우 색인된 값을 `number` 타입의 값으로 사용하고 싶다면 먼저 `undefined`인지 여부를 체크해줘야 한다.

```ts
const h = nameHeightMap["박상민"]; // 이 시점에서 h의 타입은 number | undefined
if (h !== undefined) {
  // 이 시점에서 h의 타입은 number
  console.log(h.toString()); // ok
}
```

<h3>색인과 타입</h3>

색인의 타입으로는 <b>문자열 또는 숫자</b>만 사용할 수 있다. 이 때 주의해야 할 점은 만약 문자열 색인과 숫자 색인이 모두 존재하는 경우, <b>숫자로 색인된 값의 타입은 문자열로 색인된 값 타입의 서브타입이어야 한다</b>는 것이다.

즉, 아래 예제에서 `B`는 `A`의 서브타입이어야 한다.

```ts
interface Mixed<A, B> {
  [stringIndex: string]: A;
  [numberIndex: number]: B;
}
```

이 때 "`B`가 `A`의 서브타입이다"는 말의 의미는 "`B`타입의 모든 값은 `A`타입에도 속한다." 정도로 이해할 수 있다. 예를 들어, 모든 정수를 나타내는 타입 `Int`와 모든 숫자를 나타내는 타입 `Num`이 존재한다고 하자. 모든 정수는 숫자이므로(즉 `Int` 타입의 모든 값을 `Num` 타입의 값으로도 사용할 수 있으므로) `Int`는 `Num`의 서브타입이다.

이러한 제약이 존재하는 이유는 <b>자바스크립트 색인의 동작 방식</b> 때문이다. 자바스크립트 코드에서 객체의 색인에 접근할 때, 내부적으로는 색인의 `toString()` 메소드를 호출해 문자열로 변형된 값을 색인으로 사용한다. 예를 들어 `1.toString() === "1"` 이므로 `obj[1]` 이라고 적은 코드는 실제로는 `obj['1']`와 동일하다.

이 때, 만약 다음 `ErrorProne` 타입과 같이 숫자로 색인 된 값의 타입(`boolean`)이 문자열로 색인 된 타입(`number`)의 서브타입이 아닌 경우가 허용된다고 가정해보자.

```ts
interface ErrorProne {
  [str: string]: number;
  [num: number]: boolean;
}
let errorProne: ErrorProne = {
  abc: 3,
  3: true,
};
errorProne[3];
```

가장 아래 줄을 보면, `3`이라는 색인은 숫자 타입이므로 타입 시스템은 `errorProne[3]`의 타입이 `boolean`일 것이라 추측할 것이다. 하지만 위에서 언급한 색인의 동작 방식에 의해 실제로 해당 값은 `errorProne['3']`과 같고, 이는 문자열로 접근한 `number` 타입의 값이다. 타입 시스템이 알고 있는 정보(`boolean`)와 실제 상황(`number`)이 달라지는 것이다.

따라서 타입스크립트는 이런 코드를 작성하는 것을 허용하지 않고,

```ts
error TS2413: Numeric index type 'boolean' is not assignable to string index type 'number'.
```

와 같은 에러를 발생시킨다. 숫자 색인으로 접근한 타입 `boolean`을 문자열 색인으로 접근한 타입 `number`에 할당할 수 없다는 의미다.

비슷한 이유로, 문자열 색인 시그니처가 존재한다면 그 외 모든 속성의 값 타입은 문자열 색인으로 접근한 값의 타입의 서브타입이어야 한다. 모든 속성 접근은 (`user.name === user['name']` 이므로) 결국 문자열 색인 접근의 특수한 케이스이기 때문이다. 아래와 같은 선언은 타입 에러를 발생시킨다.

```ts
interface User {
  [randomProp: string]: number;
  name: string;
}
```

<h3>읽기 전용 색인</h3>

색인 역시 읽기 전용으로 선언할 수 있다. 객체 타입, 인터페이스에서의 `readonly`의 동작과 마찬가지로 `readonly`로 선언된 색인의 값은 재할당이 불가능하다.

```ts
interface ReadonlyNameHeightMap {
  readonly [name: string]: height;
}
const m: ReadonlyNameHeightMap = { 박상민: 177 };
m["박상민"] = 178; // error TS2542: Index signature in type 'ReadonlyNameHeightMap' only permits reading.
```

<h3>색인 가능 타입의 사용예</h3>

색인 가능 타입을 사용하는 가장 간단하면서도 유용한 인터페이스 중 하나로 `Array` 인터페이스를 꼽을 수 있다. 만약 색인 가능 타입이 없이 `T` 타입의 원소를 갖는 `Array` 인터페이스를 작성한다면 대략 아래와 같은 식으로 모든 색인에 대한 타입을 일일이 정의해야 할 것이다.

```ts
interface Array<T> {
    length: number;
    0?: T;
    1?: T;
    /* ... */
    Number.MAX_FACE_INTEGER?: T;
    /* 메소드 정의 */
}
```

인덱스 타입을 이용하면 위 코드를 다음처럼 간결하게 대체할 수 있다.

```ts
interface Array<T> {
    length: number;
    [index: number]?: T;
    /* 메소드 정의 */
}
```
