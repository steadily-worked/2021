<h1>TypeScript</h1><a href='https://ahnheejong.gitbook.io/ts-for-jsdev'>출처</a>

<h2>2.0 ECMAScript</h2>
- 타입스크립트의 기반이 되는 언어 ECMAScript의 최신 명세에 추가된 여러 유용한 기능들을 살펴본다.

---

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
- let을 이용해 <b>재할당이 가능한 블록 레벨 변수</b>를 선언할 수 있다. 아래 예시 코드를 보자.

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
- const를 이용해 재할당이 불가능한 블록 레벨 변수를 선언할 수 있다.

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
- 비구조화 할당 문법을 이용해 이전까지 여러 라인에 걸쳐 적어야만 했던 할당을 보다 간결하게 쓸 수 있다.

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
- 최신 ECMAScript에서의 객체 리터럴 변경사항에 대해 다룬다.

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
- 최신 ECMAScript 명세에서 자바스크립트 함수에 어떤 변경점이 있었는지 알아본다.

자바스크립트의 함수는 일급 객체다. 함수를 다른 함수의 인자로 넘길 수도 있고, 함수가 함수를 리턴하기도 하는 등 함수가 다른 문자열, 숫자 등의 값과 동일하게 취급된다. 때문에 함수는 자바스크립트 프로그래밍에서 가장 핵심적인 역할을 차지한다.

<h2>2.3.1 기본 매개변수</h2>
- ES6 기본 매개변수 문법을 사용해 매개변수의 기본값을 간결하게 표현할 수 있다.

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
