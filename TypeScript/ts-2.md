<h1>TypeScript</h1><a href='https://ahnheejong.gitbook.io/ts-for-jsdev'>출처</a>

<h2>2.0 ECMAScript</h2>

> 타입스크립트의 기반이 되는 언어 ECMAScript의 최신 명세에 추가된 여러 유용한 기능들을 살펴본다.


앞서 언급했듯, 타입스크립트는 자바스크립트의 상위집합(superset)이다. <b>모든 자바스크립트 코드는 곧 적법한 타입스크립트 코드이다.</b> 때문에 타입스크립트 프로그래머는 자바스크립트 관련 지식을 십분 활용할 수 있는 한편, 자바스크립트 언어의 한계 또한 안고 가야 한다. 어느 쪽에 초점을 맞추든, 타입스크립트 프로그래밍을 위해서 자바스크립트 언어에 관한 지식은 필수적이다.

<b>타입스크립트는 최신 자바스크립트 표준의 명세를 대부분 지원한다.</b> 최신 자바스크립트 명세에 익숙해지는 과정은 실력 있는 타입스크립트 프로그래머로 나아가기 위한 첫걸음이나 다름 없다. 이 책은 자바스크립트 경험을 가진 독자를 대상으로 한다. 그럼에도 ECMAScript 2015 이후의 표준을 비롯해 상대적으로 최근 들어 추가된 기능에 아직 익숙해지지 않은 독자가 꽤 있을 것이다.

2장에서는 보다 나은 타입스크립트 프로그래머가 되기 위해 알아야 할 최신 자바스크립트 가능 중 특히 자주 쓰일 일부를 소개한다. ES5에서 ES7에 이르기까지의 방대한 변경 사항을 전부 담는 것은 이 책의 목표가 아니므로, <b>이 장에서는 새로운 스펙 중 상대적으로 자주 쓰이는 기능에 대해서만 다룬다.</b>

> 이 장의 코드 예제는 모두 strict mode에서 실행될 것을 가정하고 있다.

이 장에서는 독자가 ECMAScript, TC39 등의 자바스크립트 언어 표준에 관한 기본적인 지식을 갖고 있을 것이라 가정한다.

<h2>2.1 블록 수준 스코프</h2>

ES5까지의 자바스크립트에는 변수 선언을 위해 사용할 수 있는 수단이 var 키워드 뿐이었다. 자바스크립트의 변수 선언은 다른 프로그래밍 언어에 익숙한 이들에게 많은 혼란을 선사하곤 하는데, 가장 큰 두 이유는 바로 <b>함수 수준 스코프</b>와 <b>호이스팅</b>이다.

<h3>함수 수준 스코프</h3>

함수 수준 스코프란, 단어 자체에서 짐작할 수 있듯 모든 변수 선언이 함수 수준에서 이루어짐을 의미한다. 즉, 자바스크립트에서 코드 블록(`{...}`)은 새로운 스코프를 생성하지 않는다.

```js
function foo() {
  var abc = 123;
  if (true) {
    var abc = 456;
  }
  console.log(abc);
}
foo(); // 456
```

블록 수준의 스코핑을 지원하는 언어에서는 `if` 블록 바깥에서 콘솔에 찍어본 `abc` 의 값은 `123` 으로 남아 있을 것이다. 하지만 자바스크립트는 해당 코드를 감싸고 있는 가장 가까운 변수(또는 전역)가 달라질 때에만 새로운 스코프가 생성된다. 따라서 2번 라인과 4번 라인의 `abc` 는 동일한 변수를 가리킨다.

`if` 블록을 새로운 함수로 대체했을 때에는 예상대로의 결과가 나오는 것을 확인할 수 있다.

```js
function foo() {
  var abc = 123;
  function bar() {
    var abc = 456;
  }
  console.log(abc);
}
foo(); // 123
```

<h3>호이스팅</h3>

호이스팅이란 변수의 선언과 초기화가 동시에 이뤄졌을 때, 자바스크립트 인터프리터가 변수의 선언을 함수의 맨 위로 이동시키는 동작을 뜻한다.

```js
function foo() {
  console.log(bar); // undefined
  var bar = 123;
}
```

`bar` 라는 변수를 선언 전에 참조하는 이러한 코드는 많은 언어에서 에러를 일으킬 것이다. 하지만 자바스크립트에서는 이 함수는 정상적으로 실행되며 콘솔엔 `undefined`가 찍힌다. 자바스크립트 엔진이 해당 함수를 아래와 같이 함수 시작점에 선언이 있고 이후에 초기화되는 식으로 해석하기 때문이다.

```js
function foo() {
  var bar;
  console.log(bar); // undefined
  bar = 123;
}
```

<h3>블록 수준 스코프</h3>

자바스크립트의 이 두 독특한 동작 방식은 많은 프로그래머에게 혼란을 미쳐 왔다. ES6는 이러한 혼란을 피할 수 있도록 `let`과 `const`이라는 새로운 변수 선원 키워드를 도입했다. 두 키워드를 사용해 새로운 함수가 만들어 질 때와 더불어 대괄호(`{ ... }`)로 감싼 블록마다 생성되는 <b>블록 수준 스코프</b>의 지배를 받는 <b>블록 수준 변수</b>를 정의할 수 있다.

<h2>2.1.1 let을 이용한 선언</h2>
> let을 이용해 <b>재할당이 가능한 블록 레벨 변수</b>를 선언할 수 있다. 아래 예시 코드를 보자.

```js
{
  let goOut = true;
  if (true) {
    let goOut = false;
  }
  console.log(goOut); // true
  goOut = false;
  console.log(goOut); // false
}
console.log(goOut); // ReferenceError: goOut is not defined.
```

두 가지 주목할 점이 있다.

- `let`을 이용한 선언은 블록 수준에서 이루어지므로, 대괄호 블록과 `if` 블록 내에서 `goOut` 의 값을 선언하는 행위는 해당 블록 안에서만 의미를 갖는다.
- `var`을 이용한 선언과 마찬가지로, `let` 으로 선언한 변수를 블록 내에서 재할당할 수 있다.

`let`으로 선언한 변수는 엄밀한 의미에서 호이스팅이 되지만, `var`로 선언한 변수와 달리 변수의 정의문이 평가되기 전 해당 변수를 참조할 경우 `ReferenceError`가 발생한다. 이 때 변수 접근이 에러를 발생시키는, 정의문이 평가되기 전까지의 구간을 Temporal Dead Zone이라 한다.

```js
function foo() {
  console.log(a);
  let a = 3;
}
foo(); // ReferenceError: a is not defined
```

또한, `var`과 다르게 어떤 변수명에 대한 `let`을 이용한 선언은 한 블록 내에서만 가능하다.

```js
function ok() {
  var a = 1;
  var a = 2;
  console.log(a);
}
function notOk() {
  let a = 1;
  let a = 2;
  console.log(a);
}
ok(); // 2
notOk(); // SyntaxError: Identifier 'a' has already been declared
```

<h2>2.1.2 const를 이용한 선언</h2>

> const를 이용해 재할당이 불가능한 블록 레벨 변수를 선언할 수 있다.

`const`를 이용해 <b>재할당이 불가능한 블록 레벨 변수</b>를 선언할 수 있다. `const`를 이용해 선언한 변수의 값을 블록 내에서 재할당하려 하면 에러가 발생한다.

```js
function notOk() {
  const a = 1;
  a = 2;
}
notOk(); // TypeError: Assignment to constant variable.
```

`let`과 마찬가지로 `const`으로 선언한 변수 또한 정의문이 평가되기 전 접근될 경우 `ReferenceError`를 발생시킨다.

```js
function foo() {
  console.log(a);
  const a = 3;
}
foo(); // ReferenceError: a is not defined
```

선언 후 재할당이 불가능하단 점에서 짐작할 수 있듯이 `const`를 이용한 선언은 항상 값의 초기화를 수반해야 한다. `var`이나 `let`을 사용할 때처럼 변수를 선언만 해놓은 뒤 그 값을 추후에 초기화하는 것은 불가능하다.

```js
function ok() {
  const a = 3;
  console.log(a);
}
function notOk() {
    const a;
    a - 3;
    console.log(a);
}
ok(); // 3
notOk(); // SyntaxError: Missing initializer in const declaration
```

`const`로 선언한 변수는 <b>재할당이 불가능할 뿐, 불변값이 아니라는 점</b>을 명심해야 한다. 예를 들어, `Object`나 `Array` 타입의 변수를 `const`로 정의 했더라도 그 객체의 내부 상태를 조작하는 다양한 수단은 모두 아무런 문제 없이 실행할 수 있다.

```js
const a = 3;
a = 4; // TypeError: Assignment to constant variable.
const obj = {};
obj.a = 42; // OK
const arr = [];
arr.push(3); // OK
```

`const` 선언으로 막을 수 있는 것은 오로지 블록 내 값의 재할당 뿐이다.

<h2>2.1.3 스코프 베스트 프랙티스</h2>

타입스크립트 코드와 같이 let/const가 사용 가능한 환경에서는 항상 var 대신 let 또는 const를 사용하는 것이 좋다. 특히 둘 중에선 <b>const를 기본적으로 쓰고, 재할당이 반드시 필요한 변수만 let을 이용해 선언하라.</b> 이런 코딩 습관은 코드를 읽는 이들이 특정 변수의 값이 블록 내에서 유지될 것이라 짐작하고 잠재적인 실수를 찾아내는 일을 돕는다.

<h2>2.2 객체와 배열</h2>

객체(`Object`)와 배열(`Array`)은 자바스크립트의 가장 기본적인 자료구조이며, 온갖 용도로 사용된다. 이 장에서는 최신 ECMAScript에 들어온 객체 및 배열 관련 주요 변경사항을 다룬다.

<h2>2.2.1 비구조화 할당</h2>

> 비구조화 할당 문법을 이용해 이전까지 여러 라인에 걸쳐 적어야만 했던 할당을 보다 간결하게 쓸 수 있다.

<h3>배열의 비구조화 할당</h3>

먼저 배열을 보자. 한 배열의 각 원소에 새로운 이름을 붙여야 하는 경우, 기존에는 아래와 같이 코드를 반복해서 적어야 했다.

```js
const arr = [1, 2];
const a = arr[0];
const b = arr[1];
```

비구조화 할당을 지원하는 ES6부터는 위 코드를 아래와 같이 간결하게 쓸 수 있다.

```js
const arr = [1, 2];
const [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
```

만약 좌항 배열이 우항 배열보다 더 큰 `length`를 갖고 있다면, 대응하는 우항 배열의 원소가 없는 좌항 배열의 원소에는 `undefined`가 할당된다.

```js
const [c, d] = [1];
console.log(d); // undefined
```

<h3>객체의 비구조화 할당</h3>

비슷한 문법을 객체에도 적용가능하다.

```js
const obj = { a: 1, b: 2 };
const a = obj.a;
const b = obj.b;
```

비구조화 할당을 이용해 위의 코드를 아래와 같이 적을 수 있다.

```js
const obj = { a: 1, b: 2 };
const { a, b } = obj;
console.log(a); // 1
console.lob(b); // 2
```

마찬가지로 없는 속성을 참조할 시 `undefined`가 할당되며, 기본값을 넣어줄 수도 있다.

```js
const { c, d, e = 3 } = { c: 1 };
console.log(d); // undefined
console.log(e); // 3
```

또한 객체의 경우, 우항과 다른 변수명을 사용하고 싶은 경우 아래와 같이 콜론(`:`)을 사용해 새로운 변수에 새로운 이름을 줄 수 있다.

```js
const { a: newA } = { a: 1 };
console.log(newA); // 1
```

비구조화 할당은 함수 인자에서도 사용 가능하다.

```js
function useless({ a, b }) {
  console.log(a, b);
}
useless({ a: 1, b: 2 }); // 1 2
```

<h2>2.2.2 나머지 연산자와 전개 연산자</h2>

<h3>나머지 연산자(rest operator)</h3>

비구조화 할당을 사용하되, <b>배열의 일부 부분 배열을 다른 변수에 할당하고자 할 때</b> 나머지 연산자를 사용할 수 있다.

```js
const [a, ...restArr] = [1, 2, 3, 4];
console.log(restArr); // [2, 3, 4];
```

나머지 연산자는 함수 인자에서도 사용할 수 있다.

```js
function normalFunc(p1, p2, ...rest) {
  console.log(rest);
}
normalFunc(1, 2, 3, 4); // [3, 4]
```

<h3>전개 연산자 (spread operator)</h3>

<b>여러 개의 변수가 들어갈 자리에 한 배열의 원소들을 분포시키고자 할 때</b>에 전개 연산자를 사용할 수 있다. 나머지 연산자가 여러 원소를 하나의 배열로 묶어주는 역할을 한다면, 전개 연산자는 하나의 배열을 여러 원소들로 풀어주는 역할을 한다. 둘은 일종의 함수-역함수 관계에 있고, 이런 맥락에서 같은 기호(`...`)의 사용을 이해할 수 있다.

```js
function logThings(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
}
const arr = [1, 2, 3];
logThings(...[1, 2, 3]);
```

배열 뿐만이 아닌 객체에 대해서도 비슷하게 나머지/전개 연산자를 추가하는 `proposal-object-rest-spread` 프로포절이 스테이지 4까지 완료되었다.

```js
const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a : 3, b : 4 }
const n = { x, y, ...z };
n; // { x : 1, y : 2, a : 3, b : 4 };
```

<h2>2.2.3 객체 리터럴 변경사항</h2>

> 최신 ECMAScript에서의 객체 리터럴 변경사항에 대해 다룬다.

<h3>트레일링 콤마(trailing comma)</h3>

ES5로부터는 객체 내에서의 트레일링 콤마 사용이 허용된다.

```js
const objWithTrailingComma = {
  a: 1,
  b: 1,
};
```

트레일링 콤마가 허용되면 원소의 순서를 재배열하거나 이후 새로운 원소를 추가할 때에 보다 깔끔한 변경사항을 가질 수 있다. 이는 git을 비롯한 버전 관리 시스템의 사용에 큰 도움이 된다.

<h3>단축 속성명 (shorthand property name)</h3>

ES6부터는 이미 존재하는 어떤 변수의 변수명을 속성 이름으로, 변수의 값을 속성 값으로 사용해 객체 리터럴을 생성할 때 보다 간결한 문법을 사용할 수 있다.

```js
const [a, b] = [1, 2];
const obj = { a: a, b: b };
const obj2 = { a, b }; // same as { a: a, b: b }
```

<h3>단축 메소드명 (shorthand method name)</h3>

또한 ES6에서는 객체 메소드를 정의하기 위한 보다 간결한 문법이 추가되었다.

```js
// old
const objWithFunction = {
  f: function () {
    console.log(1);
  },
};
objWithFunction.f(); // 1

// new (ES6~ )
const objWithFunction2 = {
  f() {
    console.log(1);
  },
};
objWithFunction2.f(); // 1
```

<h3>계산된 속성 이름(computed property name)</h3>

마지막으로, ES6부터 계산된 속성 이름을 사용할 수 있다. 객체 리터럴에서 키를 중괄호(`[]`)로 감쌀 경우 해당 표현식이 계산된 값을 속성 이름으로 사용한다. 이 때 중괄호 안에는 모든 표현식이 들어갈 수 있다.

```js
const name = "sangmin";
const obj = { [name]: "park" };
console.log(obj); // { sangmin: 'park' }
const obj3 = { ["ab" + "c"]: 3 };
console.log(obj3); // {abc: 3}
```

<h2>2.3 함수</h2>

> 최신 ECMAScript 명세에서 자바스크립트 함수에 어떤 변경점이 있었는지 알아본다.

자바스크립트의 함수는 일급 객체다. 함수를 다른 함수의 인자로 넘길 수도 있고, 함수가 함수를 리턴하기도 하는 등 함수가 다른 문자열, 숫자 등의 값과 동일하게 취급된다. 때문에 함수는 자바스크립트 프로그래밍에서 가장 핵심적인 역할을 차지한다.

<h2>2.3.1 기본 매개변수</h2>

> ES6 기본 매개변수 문법을 사용해 매개변수의 기본값을 간결하게 표현할 수 있다.

자바스크립트 함수는 매개변수의 수를 느슨하게 체크한다. 예를 들어, 3개의 매개변수를 기대하는 함수에 1개 혹은 2개만 주어졌을 때, 런타임 에러를 내는 대신 나머지 매개변수로 `undefined` 값이 들어온 것과 동일하게 함수를 실행한다.

```js
function looseCheck(a, b, c) {
  console.log([a, b, c]);
}
looseCheck(1, 2, 3); // [1, 2, 3]
looseCheck(1, 2); // [1, 2, undefined]
looseCheck(1); // [1, undefined, undefined]
```

이러한 함수의 특성 상 모든 매개변수가 넘겨졌는지 검사하고 싶거나, 기본값을 채워주고 싶은 경우 해당 처리를 프로그래머가 매번 수동으로 해와야 했다.

```js
function tightCheck(a, b, c) {
  if (
    typeof a === "undefined" ||
    typeof b === "undefined" ||
    typeof c === "undefined"
  ) {
    throw new Error("Not all parameters are specified.");
  }
  console.log([a, b, c]);
}
tightCheck(1, 2, 3); // [1, 2, 3]
tightCheck(1, 2); // Error: Not all parameters are specified.
function useDefault(_a, _b, _c) {
  const a = typeof _a === "undefined" ? 1 : _a;
  const b = typeof _b === "undefined" ? 1 : _b;
  const c = typeof _c === "undefined" ? 1 : _c;
  console.log([a, b, c]);
}
useDefault(1, 2, 3); // [1, 2, 3]
useDefault(1, 2); // [1, 2, 1]
```

이러한 수고를 덜기 위해 ES6에는 기본 매개변수 문법이 추가되었다. 이 문법은 위의 `useDefault` 함수와 거의 동일한 일을 하는 문법 설탕이다. 매개변수 뒤에 `= (기본값)` 을 덧붙여 해당 매개변수의 기본값을 설정할 수 있다.

```js
function useDefaultES6(a = 1, b = 2, c = 3) {
  console.log([a, b, c]);
}
useDefault(1, 2, 3); // [1, 2, 3]
useDefault(1, 2); // [1, 2, 3]
useDefault(1, undefined, 4); // [1, 2, 4];
```

<h2>2.3.2 화살표 함수</h2>

> 화살표 함수는 자바스크립트 함수 내부에서 this가 야기하는 혼란을 줄여준다.

기본적으로 자바스크립트 함수 내부에서 참조된 `this` 키워드의 값은 함수가 정의되는 시점이 아닌 실행되는 시점에 결정된다. 동일한 내부 구조를 가진 함수가 동일한 블록 내에서 실행 되더라도 어떤 방식으로 호출되냐에 따라 함수 내에서의 `this` 값은 달라질 수 있다.

```js
function getName() {
  console.log(this.name);
}
const a = {
  name: "javascript",
  getName: getName,
};
function getNames() {
  a.getName(); // 'javascript'
  getName(); // TypeError: Cannot read property 'name' of undefined
}
```

이러한 `this`의 동작은 자주 혼란을 야기한다.

ES6에 추가된 화살표 함수(arrow function) 문법을 사용하면 함수 내의 `this`가 실행 시점이 아닌 정의 시점에 결정되는 함수를 정의할 수 있다. 화살표 함수 내에서의 모든 `this` 참조는 해당 함수가 정의되는 시점에서 함수를 둘러싼 문맥의 `this` 값으로 고정된다. 화살표 함수는 `(인자) => (함수 본문)` 의 문법으로 정의한다.

```js
const obj = {
  a: 1,
  normalFunc: function () {
    console.log(this);
  },
  arrowFunc: () => {
    console.log(this);
  },
};
const { normalFunc, arrowFunc } = obj;
obj.normalFunc();
// {
//     a: 1,
//     normalFunc: [Function: normalFunc],
//     arrowFunc: [Function: arrowFunc]
// }
normalFunc(); // undefined
obj.arrowFunc(); // (global object)
arrowFunc(); // (global object)
```

만약 인자가 하나일 경우, 화살표 함수의 인자를 둘러싼 괄호를 생략할 수 있다.

```js
const a = (args) => {
  console.log(args);
};
console.log(a);
```

함수 본문이 한 줄의 표현식으로 이루어졌을 시, 본문을 감싸는 대괄호를 생략할 수 있다. 이 때 해당 표현식의 값이 함수의 반환값이 된다.

```js
const isOdd = (n) => n % 2 === 1;
console.log(isOdd(3)); // true
```

`this`의 동작 이외에도 화살표 함수는 `function` 키워드를 이용해 선언한 함수와 다음의 차이점을 갖는다.

- 생성자로 사용할 수 없다.
- 함수 내에 `arguments` 바인딩이 존재하지 않는다.
- `prototype` 프로퍼티를 갖고 있지 않다.

<h2>2.4 템플릿 리터럴</h2>

ES6에는 문자열 관련 다양한 편의 기능을 제공하는 템플릿 리터럴이 추가되었다. 템플릿 리터럴은 문자열과 비슷하되, 따옴표나 쌍따옴표가 아닌 백틱으로 감싸진다. 상대적으로 덜 흔한 용례인 태그된 템플릿(tagged template)은 여기선 다루지 않는다.

<h2>2.4.1 멀티라인 문자열</h2>
> 템플릿 리터럴을 이용해 여러 줄에 걸친 문자열을 손쉽게 표현할 수 있다.

이전 버전의 자바스크립트는 멀티라인 문자열을 손쉽게 생성할 수 있는 수단을 제공하지 않았다. 따라서 프로그래머가 직접 문자열을 더하기 연산자를 이용해 연결하거나, 배열의 `Array.prototype.join` 함수 등을 이용하는 식의 접근이 필요했다.

템플릿 리터럴은 여러 라인에 걸쳐 정의할 수 있으며, 해당 문자열은 문자열 내의 공백 및 줄바꿈을 모두 보존한다.

```js
const a = `
First line
Second line
`;
console.log(a); // First line
// Second line
```

이 때 <b>공백도 보존된다</b>는 점에 주의해야 한다. 들여쓰기를 맞추기 위해 문자열 내에서 공백을 넣을 시 그 공백은 문자열에 포함된다.

```js
const a = `First line
           Second line`;
console.log(a);
// First line
//             Second line
```

<h2>2.4.2 문자열 치환</h2>
> 템플릿 리터럴은 문자열의 일부를 특정 값으로 치환할 수 있는 수단을 제공한다.

매우 흔하게 요구되는 사항임에도 불구하고 이전 버전의 자바스크립트에는 문자열 포매팅을 위한 이렇다할 기능이 없었다. 때문에 문자열 포매팅을 위해선 주로 `Array.prototype.join` 메소드를 사용하거나 문자열을 더하는 방식이 사용되었다.

```js
const name = "Park Sangmin";
function greetingWithConcat(name) {
  console.log("Hello, " + name + "!");
}
function greetingsWithArrayJoin(name) {
  const greetings = ["Hello, ", name, "!"];
  console.log(greetings.join(""));
}
```

템플릿 리터럴의 가장 유용한 사용예 중 하나가 바로 문자열 포매팅이다. 템플릿 리터럴 문법을 사용하면 문자열의 특정 부분을 자바스크립트 값으로 런타임에 손쉽게 치환할 수 있다. 템플릿 리터럴 내에서 `${value}`로 참조된 부분은 런타임에 자바스크립트 값 `value`로 대체된다.

```js
function beforeES6(firstName, lastName) {
  console.log("My name is " + firstName + " " + lastName + "!");
}
function sinceES6(firstName, lastName) {
  console.log(`My name is ${firstName} ${lastName}!`);
}
beforeES6("Sangmin", "Park"); // My name is Sangmin Park!
sinceES6("Sangmin", "Park"); // My name is Sangmin Park!
```

<h2>2.5 원소 순회</h2>
> 최신 ECMAScript 명세에 추가된 원소 순회 수단에 대해 알아본다.

어떤 컬렉션(collection)의 원소들을 순회하고 싶다는 요구사항은 굉장히 흔하다. 자연히 자바스크립트도 순회를 위한 다양한 방법을 제공한다.

예를 들어, 아래와 같은 배열의 원소를 순회하며 그 이름을 찍고 싶은 상황을 생각해보자.

```js
const langs = ["TypeScript", "JavaScript", "Python"];
```

먼저 C 스타일로 초기 조건, 조건문, 증가문을 이용해 순회하는 다음과 같은 방법이 존재한다.

```js
for (let i = 0; i < langs.length; i++) {
  console.log(langs[i]);
}
```

`for-in`을 이용한 살짝 다른 버전의 반복도 가능하다.

```js
for (const index in langs) {
  console.log(langs[index]);
}
```

최신 ECMAScript에는 이런 고전적인 방법 말고도 순회를 위한 다양한 방법이 추가되었다. 어떤 방법이 추가되었고, 기존의 접근에 비해 어떤 강점을 갖는지 살펴보자.

<h2>2.5.1 forEach 메소드</h2>

ES5로부터 `Array.prototype.forEach` 메소드가 추가되었다. 이 메소드는 배열의 원소를 인자로 받는 콜백 함수를 인자로 받아, 배열 내의 각 원소에 대해 해당 콜백을 실행한다.

```js
langs.forEach((lang) => {
  console.log(lang);
});
```

`forEach` 메소드는 간결하지만, 반복문 중간에 `break` 혹은 `return` 등을 사용해 <b>실행 흐름을 제어할 수 없다</b>는 단점을 갖고 있다.

<h2>2.5.2 for-of 문법</h2>

ES6에는 어떤 컬렉션(collection)의 각 요소를 순회하며 특정 작업을 반복 수행하기 위한 `for-of` 문법이 추가되었다.

```js
const languages = ["JavaScript", "TypeScript", "Python"];
for (const lang of languages) {
  if (!lang.includes("Script")) {
    break;
  }
  console.log(lang);
}
// JavaScript
// TypeScript
```

비슷하게 생겼지만, `for-of` 문법은 기존의 `for-in` 문법과 비교했을 때 아래와 같은 차이점을 갖고 있다.

- 순회 순서가 항상 같을 것이 보장된다.
- `for (const elem in arr) { ... }` 의 `elem` 에는 <b>원소의 키에 해당하는 문자열</b>이 바인딩 된다. 한편, `for (const elem of arr) { ... }` 의 `elem`에는 <b>원소의 실제 값</b>이 바인딩 된다.
  - 예를 들어, `arr`가 함수의 배열(`[ () => 42, () => true ]`)이라면,
    `for-in`의 `elem`에는 각 함수의 인덱스 문자열(`"0"`, `"1"`)이 바인딩 된다.
    `for-of`의 `elem`에는 실제 함수값(`() => 42`, `() => true`)이 바인딩 된다.

또한 `forEach`와 달리 `break` / `continue` 등의 키워드로 실행 흐름을 제어할 수 있다.

주의할 점은 임의의 `Object` 인스턴스에 대해 `for-of`를 사용 가능한 것은 아니라는 것이다.

```js
const obj = { a: 1 };
for (const elem of obj) {
  console.log(elem);
}
// TypeError: obj is not iterable
```

에러 메시지를 보면 짐작할 수 있듯이, `for-of` 문법은 이터러블(`iterable`) 프로토콜을 구현한(즉, 순회 가능한) 객체에 대해서만 사용할 수 있다. 이터러블 프로토콜을 구현한 객체란 이터레이터를 원소로 갖는다. 이 용어들이 어떤 의미를 갖는지 차례로 살펴보자.

<h2>2.5.3 이터레이터 프로토콜</h2>

객체가 특정 조건을 만족하는 `next()` 메소드를 가질 때, 이러한 객체를 이터레이터(반복자, Iterator)라 부른다. 이 때, `next()` 메소드는 해당 객체의 요소들을 어떤 방식과 어떤 순서로 순회할지를 정의하며, 호출 될 때마다 아래 두 가지 값을 담은 객체를 반환해야 한다.

- 순회가 끝났는지를 나타내는 불리언 값인 `done`
- (`done === false` 일시) 이번 원소의 값인 `value`

아래 코드는 객체를 받아 객체의 요소를 순회하기 위한 이터레이터를 생성하고, 실제로 해당 이터레이터를 순회하는 간단한 예시다.

```js
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true };
    },
  };
}
const iter = makeIterator([1, 2, 3]);
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
iter.next(); // { value: 3, done: false }
iter.next(); // {done: true}
```

<h2>2.5.4 이터러블 프로토콜</h2>

어떤 객체가 `Symbol.iterator`의 키의 값으로 메소드를 갖고, 해당 메소드를 실행했을 때 이터레이터 인스턴스가 반환될 때 그 객체가 <b>이터러블 프로토콜을 구현한다</b>, 또는 <b>순회 가능하다</b>고 한다. `Symbol.iterator`는 ES6에 추가된 `Symbol` 타입의 값으로, 그 중에서도 표준에 정의되어 있는 특수한 심볼이다.

예를 들어, 다음과 같이 순회 가능한 객체 `iterableObj`를 정의할 수 있다.

```js
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true };
    },
  };
}
const iterableObj = {
  [Symbol.iterator]() {
    return makeIterator([1, 2, 3]);
  },
};
```

순회 가능한 객체에 대해서는 `for-of` 문법이 사용 가능하다. 이 때 `for-of` 반복문은 내부적으로 이터레이터의 `next()`를 실행해 `done === true`인 경우 반복을 중단한다. `done === false`인 경우, `for (const elem of iterable)` 문의 변수 `elem`에 `value`를 할당하고, 함수 본문을 실행한다.

```js
for (const elem of iterableObj) {
  console.log(elem);
}
// 1
// 2
// 3
```

또한, 순회 가능한 객체에 대해 전개 연산자를 사용할 수 있다. 이 때 전개 연산자는 해당 순회 가능한 객체의 이터레이터가 리턴한 `value`들의 나열로 대체된다.

```js
console.log(...iterableObj); // [1, 2, 3]
```

`Array`, `Map`, `Set` 등의 표준 객체는 모두 이터러블 프로토콜을 구현한다. 그 덕분에 프로그래머는 서로 전혀 다른 형태의 객체들을 일관적인 문법을 사용해 순회할 수 있다. <b>이터러블 프로토콜은 프로그래머에게 임의의 객체에 대해 해당 객체를 어떻게 순회할지를 명시하고, 동일한 문법으로 여러 객체를 순회할 수 있는 수단을 제공한다.</b>

<h2>2.6 비동기 처리</h2>

자바스크립트는 싱글 스레드 기반의 프로그래밍 언어다. 이러한 한계와 더불어 유저 인터페이스와 매우 밀접하게 엮인 언어로 시작했다는 특징 때문에, 동기 처리를 이용한 프로그래밍 패턴은 자바스크립트에서 실질적으로 사용 불가능하다. 네트워크 요청이 응답을 받을 때까지 싱글 스레드를 점유하고, 그 동안은 브라우저가 유저의 마우스, 키보드에 전혀 반응하지 않는다고 생각해보라!

이런 제약 때문에 비싼 작업을 비동기로 처리하는 것이 자바스크립트에선 매우 흔한 패턴이다. 수 년 전까지만 해도 자바스크립트 코드에서는 그런 비동기 작업이 끝난 후, 그 결과에 따라 추가적인 처리를 하기 위해 비동기 서브루틴에게 콜백 함수를 넘기는 패턴이 자주 쓰였다. 다음 코드 예시는 네트워크에서 문서를 받아온 뒤, 해당 문서를 작성한 유저의 다른 글들을 가져오는 가상의 코드 예시이다.

```js
fetchDocument(url, function (err, document) {
  if (err) {
    console.log(err);
  } else {
    fetchAuthor(document, function (err, author) {
      if (err) {
        console.log(err);
      } else {
        fetchPostsFromAuthor(author.id, function (err, posts) {
          if (err) {
            console.log(err);
          } else {
            /* do something with posts */
          }
        });
      }
    });
  }
});
```

위 코드에서 볼 수 있듯이 콜백을 사용해 비동기 작업을 처리하면 비동기로 처리하는 작업의 단계가 깊어짐에 따라 들여쓰기 또한 급격히 깊어진다. 이런 코드는 미관상으로도 좋지 않을 뿐더러, 프로그래머가 비동기로 일어나는 일련의 작업 흐름을 따라가기 매우 힘들게 한다. 이런 불편을 해소하고자, 최신 ECMAScript에는 이러한 콜백을 이용한 접근보다 개선된 비동기 처리 패턴이 추가되었다.

<h2>2.6.1 프로미스</h2>

콜백 헬의 대안으로 가장 먼저 제안된 API는 프로미스(`Promise`)다. 프로미스는 비동기로 처리될 수 있는 연산에 사용되며, 생성자의 인자로 `resolve`와 `reject`, 두 핸들러를 인자로 받는 함수를 받는다. 프로그래머는 함수 본문에서 (비동기로 작동할 수 있는) 특정 로직을 실행하고 그 결과에 따라 `resolve` 또는 `reject`를 호출할 수 있다.

```js
function getRandomPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      const destiny = Math.random();
      if (destiny > 0.5) {
        resolve();
      } else {
        reject();
      }
    });
  });
}
```

<h3>then 과 catch 메소드</h3>

프로미스 인스턴스는 아래 두 개의 메소드를 갖는다.

- `resolve()`의 호출을 받은 경우, 즉 해당 비동기 작업이 완료된 경우의 핸들러인 `then()`
- `reject()`의 호출을 받은 경우, 즉 해당 비동기 작업이 거부된 경우의 핸들러인 `catch()`

각 핸들러는 `resolve()` 혹은 `reject()`에 넘겨진 인자를 그대로 받는다. 프로미스가 완료되거나 거부되는 것을 처리되었다(settled)고 하는데, 한 프로미스는 최대 한 번만 처리될 수 있다. 즉 이미 완료 혹은 거부가 일어난 후의 또다른 `resolve()` 또는 `reject()` 호출은 무의미하다.

아래 예시에서는 웹에서의 네트워크 요청을 위한 Fetch API의 사용을 예로 살펴본다. 모던 브라우저에 내장되어 있는 `fetch()` 함수는 네트워크 요청을 만들기 위한 여러 정보를 인자로 받아 네트워크 요청을 실행하고, 그 요청에 연결된 프로미스를 리턴한다.

네트워크 요청이 성공적으로 끝난 경우, 이 프로미스는 내부적으로 서버가 넘긴 응답을 인자로 `resolve()`를 호출한다. 이 응답은 `then()` 핸들러에서 접근할 수 있다.

```js
fetch("http://example.com").then((respose) => {
  const { ok, status } = response;
  console.log(ok, status); // true, 200
});
```

만약 네트워크 요청을 보내는 과정에서 오류가 발생했을 경우, 이 프로미스는 내부적으로 던져진 에러를 인자로 `reject()`를 호출한다. 이 응답은 `catch()` 핸들러에서 접근할 수 있다.

```js
fetch("https://this-is-invalid-url.really").catch((err) => {
  const { message } = err;
  console.log(message); // Failed to fetch
});
```

`then` 핸들러는 실제로는 두 개의 콜백을 인자로 받는다. 그 두 번째 콜백은 에러가 발생했을 때에 실행되며 여러 객체를 인자로 받는다. 즉 위 코드는 아래와 같이 다시 쓸 수 있다.

```js
fetch("https://this-is-invalid-url.really").then(null, (err) => {
  const { message } = err;
  console.log(message); // Failed to fetch
});
```

<h3>프로미스 체인</h3>

`then`과 `catch` 두 메소드는 호출된 경우 또다시 프로미스를 반환한다. 때문에 프로미스는 연쇄될 수 있다(chainable). 이 때, 프로미스 체인의 다음 프로미스는 이번 프로미스가 반환한 값으로 `resolve`를 호출한다.

```js
fetch("http://example.com")
  .then((response) => {
    const { status } = response;
    return status;
  })
  .then((status) => {
    console.log(`The request has status ${status}!`); // The request has status 200!
  });
```

종합하면, 프로미스가 지원되는 환경이라면 앞서 살펴봤던 콜백 헬 예제를 다음과 같이 고쳐 쓸 수 있다.

```js
function errorHandler(err) {
  if (err) {
    console.log(err);
  }
}
fetchDocument(url)
.then(document => fetchAuthor(document), errorHandler)
.then(author => fetchPostsFromAuthor(author), errorHandler)
.then(posts => /* do something with posts */, errorHandler);
```

<h3>정리</h3>

콜백을 이용한 접근에 비해 갖는 장점을 금세 확인할 수 있을 것이다.

- 들여쓰기의 깊이가 단계의 수에 비해 늘어나지 않는다.
- 코드의 흐름이 보다 한 눈에 들어온다.
- 성공한 경우의 핸들러와 에러가 발생한 경우의 핸들러 중 한 쪽만 실행된다는 것이 보장되므로 `if-else` 문을 사용하지 않고 훨씬 깔끔한 코드를 작성할 수 있다.

<h2>2.6.2 Async / Await</h2>

프로미스는 콜백을 이용한 사용 패턴의 문제 중 상당 부분을 해소했지만, 완벽한 해결책은 아니었다. ECMAScript 2017에 추가된 `Async` / `Await` 문법은 비동기 코드를 마치 동기 코드처럼 쓸 수 있게 해준다.

`Async` / `Await`을 지원하는 환경에서는 함수 선언 앞에 `async` 키워드를 덧붙여 비동기 함수(async function)를 정의할 수 있다. `async` 함수가 반환하는 값은 암시적으로 프로미스로 감싸진다.

```js
async function returnTheAnswer() {
  return 42;
}
const implicitlyReturnedPromise = returnTheAnswer();
console.log(implicitlyReturnedPromise instanceof Promise); // true
implicitlyReturnedPromise.then((answer) => console.log(answer)); // 42
```

비동기 함수 내에서는 표현식 앞에 `answer` 키워드를 사용할 수 있다. 이때 `await` 키워드가 붙은 해당 표현식 `expr`은 다음과 같은 값을 갖는다.

- 뒤따르는 값이 프로미스가 아닐 시, `expr`은 그 값을 그대로 갖는다.
- 뒤따르는 값이 프로미스일 시, 해당 프로미스가 처리될 때까지 실행을 중지한다. 만약 프로미스가 완료될 경우 `expr`은 `resolve()`의 인자로 사용된 값을 갖는다. 만약 그 프로미스가 거부될 시, `expr`은 오류를 그대로 위로 던진다.

`Async` / `Await`을 이용하면 `then` 또는 `catch` 호출 없이도, 마치 동기 코드를 작성하듯 프로미스를 처리할 수 있다.

```js
async function asyncExample() {
  const a = await new Promise((resolve) => resolve(42));
  const b = await 42;
  let c;
  try {
    c = await new Promise((_, reject) => reject("Error on await"));
  } catch (e) {
    console.log(e);
  }
  console.log(`a: ${a}, b: ${b}, c: ${c}`);
}
asyncExample();
// Error on await
// a: 42, b: 42, c: undefined
```

이때 이 코드는 비동기 루틴을 포함하고 있음에도 불구하고 코드가 작성된 순서대로, 위에서부터 아래로 순차적으로 실행된다. 예를 들어, 첫 번째 프로미스를 3초가 지나서 처리되도록 해보면 어떨까?

```js
async function asyncExample2() {
  const a = await new Promise((resolve) => {
    setTimeout(() => resolve(42), 3000);
  });
  const b = await 42;
  let c;
  try {
    c = await new Promise((_, reject) => reject("Error on await"));
  } catch (e) {
    console.log(e);
  }
  console.log(`a: ${a}, b: ${b}, c: ${c}`);
}
asyncExample2();
// Error on await
// a: 42, b: 42, c: undefined
```

3초가 지나야만 성공하는 첫 프로미스가 실행된 후에 코드가 진행됐음을 로그의 `a값`이 `42`로 찍힌 것으로부터 확인할 수 있다. 따라서 앞서 언급한 콜백 헬 예제 다음과 같이 작성할 수 있게 된다.

```js
try {
  const document = await fetchDocument(url);
  const author = await fetchAuthor(document);
  const posts = await fetchPostsFromAuthor(author);
  /* do something with posts */
} catch (err) {
  console.log(err);
}
```

핸들러로 한 단계 더 들어가던 코드가 사라지고, 별도의 핸들러 없이 오류 처리도 `try-catch` 블록으로 처리하여 훨씬 읽기 쉬운 코드가 되었다. 이처럼 `Async` / `Await` 문법을 이용해 '이 작업을 먼저 진행한 후 그게 끝나면 이 다음 작업을 진행한다' 라는 식의 사람의 마음 속 동작 방식을 그대로 코드로 옮길 수 있다.

<h2>2.7 맺으며</h2>

이상 최신 ECMAScript 표준에 추가된 주요 기능 중 일부를 살펴보았다. 자바스크립트는 늘어나는 인기와 사용자 수에 걸맞고 빠른 속도로 개선되고 있다. 그리고 자바스크립트의 상위집합으로서, <b>타입스크립트는 최신 ECMAScript 표준에 포함된 기능을 (그리고 아직 프러포절 단계인 기능 일부까지도) 발빠르게 지원한다.</b> 덕분에 타입스크립트 사용자들은 추가적인 노력 없이도 예전보다 훨씬 나은 개발 환경을 누릴 수 있다.

비록 타입스크립트는 엄밀히는 자바스크립트와 다른 언어이지만, 그 뿌리가 되는 언어인 자바스크립트에 대한 숙련도는 타입스크립트를 이용한 프로그래밍의 생산성과 직결된다. 2장에서 다룬 여러 기능은 책을 통틀어, 그리고 그 이후에 타입스크립트로 프로그래밍을 하면서도 자주 만나게 될 것이다. 다음 장부터는 본격적으로 타입스크립트 고유의 영역에 대해 다뤄본다. 가장 먼저 논의할 내용은 자바스크립트와 차별화되는 타입스크립트의 기초 문법이다.
