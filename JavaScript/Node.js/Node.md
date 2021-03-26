## 3. 노드 기능

이 장에서는 노드와 처음으로 상호작용을 해보고, 노드로 자바스크립트 파일을 실행하는 방법을 알아볼 것이다. 또한, 노드가 기본적으로 제공하는 객체와 모듈 사용법도 알아볼 것이다. 모듈을 사용하면서 중요한 개념인 버퍼와 스트림, 동기와 비동기, 이벤트, 예외 처리에 대해서도 알아볼 것이다. 한 번에 외우려고 하지 말고 잊어버릴 때마다 다시 보면 된다.

### 3-1. REPL 사용하기

자바스크립트는 스크립트 언어이므로 미리 컴파일을 하지 않아도 즉석에서 코드를 실행할 수 있다. 이전 장에서는 브라우저 콘솔 탭에서 자바스크립트 코드를 입력해봤을 것이다. 노드도 비슷한 콘솔을 제공하는데, 입력한 코드를 읽고(Read), 해석하고(Eval), 결과물을 반환하고(Print), 종료할 때까지 반복한다(Loop)라고 해서 `REPL`(Read Eval Print Loop)이라고 부른다.

노드의 REPL을 직접 사용해보자.

```
$ node
>
```

프롬프트가 > 모양으로 바뀌었다면 자바스크립트 코드를 입력할 수 있다. 간단한 문자열을 출력해보자.

> 콘솔

```
> const str = 'Hello world, hello node';
undefined
> console.log(str);
Hello world, hello node
undefined
>
```

위와 같이 출력되었다면 성공이다. 각자가 입력한 코드를 REPL이 읽고(Read), 해석한(Eval) 뒤 바로 결과물을 출력헀다(Print). 그리고 종료되기 전까지 각자의 입력을 기다린다(Loop). REPL을 종료하려면 `.exit`을 입력하면 된다.

REPL은 한두 줄짜리 코드를 테스트해보는 용도로는 좋지만 여러 줄의 코드를 실행하기에는 불편하다. 긴 코드인 경우에는 코드를 자바스크립트 파일로 만든 후 파일을 통째로 실행하는 것이 좋다. 이제 JS 파일을 만들어 실행해보자.

### 3-2. JS 파일 실행하기

REPL에 직접 코드를 입력하는 대신 자바스크립트 파일을 만들어 실행할 것이다. 다음과 같은 자바스크립트 파일을 만들어보자.

> helloWorld.js

```js
helloWorld = () => {
  console.log("hello world");
  helloNode();
};

helloNode = () => {
  console.log("hello Node");
};

helloWorld();
```

콘솔에서 `node [자바스크립트 파일 경로]`로 실행한다. 확장자(`.js`)는 생략해도 된다. REPL에서 입력하는 것이 아니므로 주의하자. REPL이 아니라 콘솔에서 입력해야 한다.

> 콘솔

```
$ node helloWorld
hello world
hello Node
```

### 3-3. 모듈로 만들기

노드는 코드를 모듈로 만들 수 있다는 점에서 브라우저의 자바스크립트와 다르다. **모듈**이란 특정한 기능을 하는 함수나 변수들의 집합이다. 예를 들면 수학에 관련된 코드들만 모아서 모듈을 하나 만들 수 있다. 모듈은 자체로도 하나의 프로그램이면서 다른 프로그램의 부품으로도 사용할 수 있다.

모듈로 만들어두면 여러 프로그램에 해당 모듈을 재사용할 수 있다. 자바스크립트에서 코드를 재사용하기 위해 함수로 만드는 것과 비슷하다.

보통 파일 하나가 모듈 하나가 된다. 파일별로 코드를 모듈화할 수 있어 관리하기 편하다.

> **브라우저의 모듈**
>
> 2015년 자바스크립트에도 `import/export`라는 모듈 개념이 도입되었지만, 브라우저에는 구현되지 않아서 사용할 수 없었다. 크롬 60 버전부터 드디어 브라우저에서도 모듈을 사용할 수 있게 되었다. 앞으로 더 많은 브라우저가 모듈 시스템을 지원할 것으로 보인다.

실제로 모듈을 만들어보자. 모듈을 만들 때는 모듈이 될 파일과 모듈을 불러와서 사용할 파일이 필요하다.

var.js와 func.js, index.js를 같은 폴더에 만들자. 먼저 var.js를 작성한다.

> var.js

```js
const odd = "홀수";
const even = "짝수";

module.exports = {
  odd,
  even,
};
```

var.js에 변수 두 개를 선언했다. 그리고 `module.exports`에 변수들을 담은 객체를 대입한다. 이제 이 파일은 모듈로서 기능한다. 변수들을 모아둔 모듈이 되는 것이다. 다른 파일에서 이 파일을 불러오면 `module.exports`에 대입된 값을 사용할 수 있다.

이번에는 var.js를 참조하는 func.js를 작성하자.

> func.js

```js
const { odd, even } = require("./var");

checkOddOrEven = (num) => {
  if (num % 2) {
    return odd;
  }
  return even;
};

module.exports = checkOddOrEven;
```

require 함수 안에 불러올 모듈의 경로를 적는다. 위 예제에서는 같은 폴더 안에 파일을 만들었지만, 다른 폴더 안에 있는 파일도 모듈로 사용할 수 있다. require 함수의 인수로 제공하는 경로만 잘 지정하면 된다. 파일 경로에서 js나 json 같은 확장자는 생략할 수 있다.

예제 코드에서 require 함수로 var.js에 있던 값들을 불러오고 있다. var.js의 `module.exports`에 담겨 있던 객체를 불러와 func.js에서 사용하는 모습이다.

var.js에서 변수를 불러온 뒤, 숫자의 홀짝을 판별하는 함수를 선언했다. 그리고 다시 `module.exports`에 함수를 대입했다. 이렇게 다른 모듈(var.js)을 사용하는 파일을 다시 모듈(func.js)로 만들 수 있다. 또한, `module.exports`에는 객체만 대입해야 하는 것이 아니라 함수나 변수를 대입해도 된다.

마지막으로 index.js를 작성하자.

> index.js

```js
const { odd, even } = require("./var");
const checkNumber = require("./func");

checkStringOddOrEven = (str) => {
  if (str.length % 2) {
    // 홀수면
    return odd;
  }
  return even;
};

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
```

index.js는 var.js와 func.js를 모두 참조한다. 모듈 하나가 여러 개의 모듈을 사용할 수 있는 것이다. 또한, var.js가 func.js와 index.js에 두 번 쓰이는 것처럼, 모듈 하나가 여러 개의 모듈에 사용될 수도 있다.

모듈로부터 값을 불러올 때 변수 이름을 다르게 지정할 수도 있다. func.js의 `checkOddOrEven`이 `checkNumber`라는 이름으로 사용되고 있다.

index.js를 실행해보면, 결과는 다음과 같다.

> 콘솔

```
$ node index
짝수
홀수
```

이렇게 여러 파일에 걸쳐 재사용되는 함수나 변수를 모듈로 만들어주면 편리하다. 그러나 모듈이 많아지고 모듈 간의 관계가 얽히게 되면 구조를 파악하기 어렵다는 단점도 있다. 노드에서는 대부분의 파일이 다른 파일을 모듈로 사용하고 있으므로 모듈을 만들고 사용하는 방법을 꼭 알아둬야 한다.

> Note: ES6 모듈
>
> ES6이 도입되면서 자바스크립트도 자체 모듈 시스템 문법이 생겼다. 이 문법은 노드의 모듈 시스템과 조금 다르다. 본문의 func.js를 ES6 모듈 스타일로 바꿔 볼 것이다.
>
> **func.mjs**
>
> ```js
> import { odd, even } from "./var";
>
> checkOddOrEven = (num) => {
>   if (num % 2) {
>     return odd;
>   }
>   return even;
> };
>
> export default checkOddOrEven;
> ```
>
> `require`와 `module.exports`가 `import`, `export default`로 바뀌었다. 상당한 부분에서 차이가 있으므로 단순히 글자만 바꿔서는 제대로 동작하지 않을 수 있다. 다행히 위에서는 require를 import로, module.exports를 export default로 바꾸기만 하면 된다.
>
> 노드에서도 9 버전부터 ES6의 모듈 시스템을 사용할 수 있다. 하지만 파일의 확장자를 mjs로 지정해야 하는 제한이 있다. mjs 확장자 대신 js 확장자를 사용하면서 ES6 모듈을 사용하려면 이후 배울 `package.json`에 `type: "module"` 속성을 넣으면 된다.

방금 썼던 require 함수나 module 객체는 따로 선언하지 않았음에도 사용할 수 있었다. 이것이 어떻게 가능할까? 바로 노드에서 기본적으로 제공하는 내장 객체이기 때문이다. 이제 내장 객체를 자세히 알아보자.

### 3-4. 노드 내장 객체 알아보기

노드에서는 기본적인 내장 객체와 내장 모듈(3.5 참조)을 제공한다. 따로 설치하지 않아도 바로 사용할 수 있으며, 브라우저의 `window` 객체와 비슷하다고 보면 된다.

이번에는 노드 프로그래밍을 할 때 많이 쓰이는 내장 객체를 알아 볼 것이다.

#### 3-4-1. global

먼저 global 객체이다. 브라우저의 window와 같은 전역 객체이다. 전역 객체이므로 모든 파일에서 접근할 수 있다. 또한, window.open 메소드를 그냥 open으로 호출할 수 있는 것처럼 global도 생략할 수 있다. 이전 절에서 사용했던 require 함수도 global.require에서 global이 생략된 것이다. 노드 콘솔에 로그를 기록하는 console 객체도 원래는 global.console이다.

global 객체 내부에는 매우 많은 속성이 들어 있다. 이 절에서 배울 내용들이 global 객체 안에 있다. 내부를 보려면 REPL을 이용해야 한다.

> Note: 노드의 window, document 객체
>
> 노드에 DOM이나 BOM이 없으므로 window와 document 객체는 노드에서 사용할 수 없다. 노드에서 window 또는 document를 사용하면 에러가 발생한다.

노드 버전에 따라 콘솔 내용이 다를 수 있다. 내용이 너무 많아 줄였지만, global 객체 안에는 수십 가지의 속성이 담겨 있다. 모두 알 필요는 없으므로, 자주 사용하는 속성들만 알아 볼 것이다.

전역 객체라는 점을 이용하여 파일 간에 데이터를 공유할 때 사용하기도 한다. globalA.js와 globalB.js를 같은 폴더에 생성하자.

> globalA.js

```js
module.exports = () => global.message;
```

> globalB.js

```js
const A = require("./globalA");

global.mesage = "안녕하세요";
console.log(A());
```

globalA 모듈의 함수는 global.message 값을 반환한다. globalB.js에서는 global 객체에 속성명이 message인 값을 대입하고 globalA 모듈의 함수를 호출한다. 콘솔 결과는 globalB에서 넣은 `global.message` 값을 globalA에서도 접근할 수 있음을 보여준다.

> 콘솔

```
$ node globalB
안녕하세요
```

> 🚫Warning: global 객체의 남용
>
> global 객체의 속성에 값을 대입하여 파일 간에 데이터를 공유할 수 있지만, 이를 남용하지 말 것. 프로그램의 규모가 커질수록 어떤 파일에서 global 객체에 값을 대입했는지 찾기 힘들어져 유지 보수에 어려움을 겪게 되기 때문이다. 다른 파일의 값을 사용하고 싶다면 모듈 형식으로 만들어서 명시적으로 값을 불러와 사용하는 것이 좋다.

#### 3-4-2. console

지금까지 사용했던 console도 노드에서는 window 대신 global 객체 안에 들어 있으며, 브라우저에서의 console과 거의 비슷하다.

console 객체는 보통 디버깅을 위해 사용한다. 개발하면서 변수에 값이 제대로 들어 있는지 확인하기 위해 사용하고, 에러 발생 시 에러 내용을 콘솔에 표사하기 위해 사용하며, 코드 실행 시간을 알아보려고 할 때도 사용한다. 대표적으로 `console.log` 메소드가 있다. `console.log`는 지금껏 계속 사용했으므로 익숙할 것이다. 다른 로깅 함수도 알아보자.

> console.js

```js
const string = "abc";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};

console.time("전체 시간");
console.log("평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다");
console.log(string, number, boolean);
console.error("에러 메시지는 console.error에 담아주세요");

console.table([
  { name: "sangmin", birth: 1996 },
  { name: "hero", birth: 1988 },
]);

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time("시간 측정");
for (let i = 0; i < 100000; i++) {}
console.timeEnd("시간 측정");

function b() {
  console.trace("에러 위치 추적");
}
function a() {
  b();
}
a();
console.timeEnd("전체 시간");
```

- console.time(레이블): console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정한다.
- console.log(내용): 평범한 로그를 콘솔에 표시한다. `console.log(내용, 내용, ...)` 처럼 여러 내용을 동시에 표시할 수도 있다.
- console.error(에러 내용): 에러를 콘솔에 표시한다.
- console.table(배열): 배열에 요소로 객체 리터럴을 넣으면, 객체의 속성들이 테이블 형식으로 표현된다.
- console.dir(객체, 옵션): 객체를 콘솔에 표시할 때 사용한다. 첫 번째 인수로 표시할 객체를 넣고, 두 번째 인수로 옵션을 넣는다. 옵션의 colors를 true로 하면 콘솔에 색이 추가되어 보기가 한결 편해진다. depth는 객체 안의 객체를 몇 단계까지 보여줄지를 결정한다. 기본값은 2이다.
- console.trace(레이블): 에러가 어디서 발생하는지 추적할 수 있게 한다. 일반적으로 에러 발생 시 에러 위치를 알려주므로 자주 사용하지는 않지만, 위치가 나오지 않는다면 사용할 만 하다.

코드를 실행하면 콘솔에는 다음과 같이 표시된다. 단, `console.time`의 시간이나 `console.trace`의 경로는 사용자의 컴퓨터 환경에 따라 다를 수 있다.

> 콘솔

```
$ node console
평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다
abc 1 true
에러 메시지는 console.error에 담아주세요
┌─────────┬───────────┬───────┐
│ (index) │   name    │ birth │
├─────────┼───────────┼───────┤
│    0    │ 'sangmin' │ 1996  │
│    1    │  'hero'   │ 1988  │
└─────────┴───────────┴───────┘
{ outside: { inside: { key: 'value' } } }
{ outside: { inside: [Object] } }
시간 측정: 3.666ms
Trace: 에러 위치 추적
    at b (/Users/sangminpark/Desktop/2021/JavaScript/Node.js/console.js:30:11)
    at a (/Users/sangminpark/Desktop/2021/JavaScript/Node.js/console.js:33:3)
    at Object.<anonymous> (/Users/sangminpark/Desktop/2021/JavaScript/Node.js/console.js:35:1)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
전체 시간: 19.517ms
```

편리한 디버깅을 위해 console 객체에는 지금도 새로운 메소드들이 추가되고 있다. 실제로는 console.js에서 소개한 메소드보다 더 다양한 메소드가 있다.

#### 3-4-3. 타이머

타이머 기능을 제공하는 함수인 `setTimeout`, `setInterval`, `setImmediate`는 노드에서 window 대신 global 객체 안에 들어있다. `setTimeout`과 `setInterval`은 웹 브라우저에서도 자주 사용되므로 익숙할 것이다.

- setTimeout(콜백 함수, 밀리초): 주어진 밀리초(1/1000초) 이후에 콜백 함수를 실행한다.
- setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수를 반복 실행한다.
- setImmediate(콜백 함수): 콜백 함수를 즉시 실행한다.

이 타이머 함수들은 모두 아이디를 반환한다. 아이디를 사용하여 타이머를 취소할 수 있다.

- clearTimeout(아이디): setTimeout을 취소한다.
- clearInterval(아이디): setInterval을 취소한다.
- clearImmediate(아이디): setImmediate를 취소한다.

다음은 위 메소드들을 사용한 코드이다. 코드의 실행 순서를 예측해보자.

> timer.js

```js
const timeout = setTimeout(() => {
  console.log("1.5초 후 실행");
}, 1500);

const interval = setInterval(() => {
  console.log("1초마다 실행");
}, 1000);

const timeout2 = setTimeout(() => {
  console.log("실행되지 않습니다");
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log("즉시 실행");
});

const immediate2 = setImmediate(() => {
  console.log("실행되지 않습니다");
});

clearImmediate(immediate2);
```

우선, 제일 먼저 실행되는 것은 immediate이다. immediate2는 바로 clearImmediate를 사용해서 취소했으므로 실행되지 않는다. 코드 실행 1초 후에는 interval의 콜백이 실행된다. 코드 실행 1.5초 후에는 timeout의 콜백이 실행될 것이다. iterval의 콜백은 1초마다 실행되므로 코드 실행 후 2초가 지났을 때도 콜백이 실행된다. 2.5초가 지났을 때 clearTimeout과 clearInterval이 각각 timeout2와 interval을 취소한다. 따라서 코드 실행 3초 후에는 로그가 아무것도 남지 않는다.

> Note: setImmediate(콜백)과 setTimeout(콜백, 0)
>
> setImmediate(콜백)과 setTimeout(콜백, 0)에 담긴 콜백 함수는 이벤트 루프를 거친 뒤 즉시 실행된다. 둘의 차이점은 무엇일까? 특수한 경우에 setImmediate는 setTimeout(콜백, 0)보다 먼저 실행된다. 파일 시스템 접근, 네트워킹같은 I/O 작업의 콜백 함수 안에서 타이머를 호출하는 경우이다. 하지만 setImmediate가 항상 setTimeout(콜백, 0)보다 먼저 호출되지는 않는다는 사실만 알아두자. 헷갈리지 않도록 setTimeout(콜백, 0)은 사용하지 않는 것을 권장한다.

#### 3-4-4. **filename, **dirname

노드에서는 파일 사이에 모듈 관계가 있는 경우가 많으므로 때로는 현재의 파일 경로나 파일명을 알아야 한다. 노드는 `__filename`, `__dirname`이라는 키워드로 경로에 대한 정보를 제공한다. 파일에 `__filename`과 `__dirname`을 넣어두면 실행 시 현재 파일명과 현재 파일 경로로 바뀐다.

> filename.js

```js
console.log(__filename);
console.log(__dirname);
```

> 콘솔

```
$ node filename.js
/Users/sangminpark/Desktop/2021/JavaScript/Node.js/timer.js
/Users/sangminpark/Desktop/2021/JavaScript/Node.js
```

경로는 각자의 경로로 나올 것이다. 또한, 윈도우가 아니라면 \대신 /로 폴더 경로가 구분될 수 있다. 이렇게 얻은 정보를 사용해서 경로 처리를 할 수도 있다. 하지만 경로가 문자열로 변환되기도 하고, \나 /같은 경로 구분자 문제도 있으므로 보통은 이를 해결해주는 path 모듈(3.5.2)과 함께 쓴다.

#### 3-4-5. module, exports, require

지금까지는 모듈을 만들 때 `module.exports`만 사용했는데, module 객체 말고 exports 객체로도 모듈을 만들 수 있다.

3.3의 var.js를 다음과 같이 수정해도 index.js에서는 동일하게 불러올 수 있다.

> var.js

```js
exports.odd = "홀수";
exports.even = "짝수";
```

> 콘솔

```
$ node index
짝수
홀수
```

`module.exports`로 한 번에 대입하는 대신, 각각의 변수를 exports 객체에 하나씩 넣었다. 동일하게 동작하는 이유는 `module.exports`와 exports가 같은 객체를 참조하기 때문이다. 실제로 `console.log(module.exports === exports)`를 하면 true가 나온다. 따라서 exports 객체에 add 함수를 넣으면 `module.exports`에도 add 함수가 들어간다.

> **🚫Warning: exports 객체 사용 시**
>
> exports 객체를 사용할 때는 `module.exports`와의 참조 관계가 깨지지 않도록 주의해야 한다. `module.exports`에는 어떤 값이든 대입해도 되지만, exports에는 반드시 객체처럼 속성명과 속성값을 대입해야 한다. exports에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더이상 모듈로 기능하지 않는다.
> exports를 사용할 때는 객체만 사용할 수 있으므로 func.js와 같이 `module.exports`에 함수를 대입한 경우에는 exports로 바꿀 수 없다.
> exports와 `module.exports`에는 참조 관계가 있으므로 한 모듈에 exports 객체와 `module.exports`를 동시에 사용하지 않는 것이 좋다.

> Note: 노드에서 this는 무엇일까?
>
> 노드에서 this를 사용할 때 주의해야 할 점이 있다.
>
> this.js
>
> ```js
> console.log(this);
> console.log(this === module.exports);
> console.log(this === exports);
> whatIsThis = () => {
>   console.log("function", this === exports, this === global);
> };
> whatIsThis();
> ```
>
> 콘솔
>
> ```
> $ node this
> {}
> true
> true
> function false true
> ```
>
> 다른 부분은 브라우저의 자바스크립트와 동일하지만 최상위 스코프에 존재하는 this는 `module.exports`(또는 exports 객체)를 가리킨다. 또한, 함수 선언문 내부의 this는 global 객체를 가리킨다.
