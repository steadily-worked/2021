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

console 객체는 보통 디버깅을 위해 사용한다. 개발하면서 변수에 값이 제대로 들어 있는지 확인하기 위해 사용하고, 에러 발생 시 에러 내용을 콘솔에 표시하기 위해 사용하며, 코드 실행 시간을 알아보려고 할 때도 사용한다. 대표적으로 `console.log` 메소드가 있다. `console.log`는 지금껏 계속 사용했으므로 익숙할 것이다. 다른 로깅 함수도 알아보자.

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

우선, 제일 먼저 실행되는 것은 immediate이다. immediate2는 바로 clearImmediate를 사용해서 취소했으므로 실행되지 않는다. 코드 실행 1초 후에는 interval의 콜백이 실행된다. 코드 실행 1.5초 후에는 timeout의 콜백이 실행될 것이다. interval의 콜백은 1초마다 실행되므로 코드 실행 후 2초가 지났을 때도 콜백이 실행된다. 2.5초가 지났을 때 clearTimeout과 clearInterval이 각각 timeout2와 interval을 취소한다. 따라서 코드 실행 3초 후에는 로그가 아무것도 남지 않는다.

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

> var.js (수정 전)

```js
const odd = "홀수";
const even = "짝수";

module.exports = {
  odd,
  even,
};
```

> var.js

```js
exports.odd = "홀수";
exports.even = "짝수";
```

index.js는 기존과 같다. 편의를 위해 다시 적는다.

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
>
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

이번에는 모듈을 불러오는 `require`에 대해 알아보자. `require`은 함수이고, 함수는 객체이므로 `require`은 객체로서 몇 가지 속성을 갖고 있다. 그중에서 `require.cache`와 `require.main`에 대해 알아보자.

var.js가 있는 곳에 require.js를 만들자.

> require.js

```js
console.log("require가 가장 위에 오지 않아도 됩니다.");

module.exports = "저를 찾아보세요";

require("./var");

console.log("require.cache입니다.");
console.log(require.cache);
console.log("require.main입니다.");
console.log(require.main === module);
console.log(require.main.feature);
```

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 Node.js % node require
require가 가장 위에 오지 않아도 됩니다.
require.cache입니다.
[Object: null prototype] {
'/Users/sangminpark/Desktop/2021/JavaScript/Node.js/require.js': Module {
id: '.',
path: '/Users/sangminpark/Desktop/2021/JavaScript/Node.js',
exports: '저를 찾아보세요',
parent: null,
filename: '/Users/sangminpark/Desktop/2021/JavaScript/Node.js/require.js',
loaded: false,
children: [ [Module] ],
paths: [
'/Users/sangminpark/Desktop/2021/JavaScript/Node.js/node_modules',
'/Users/sangminpark/Desktop/2021/JavaScript/node_modules',
'/Users/sangminpark/Desktop/2021/node_modules',
'/Users/sangminpark/Desktop/node_modules',
'/Users/sangminpark/node_modules',
'/Users/node_modules',
'/node_modules'
]
},
'/Users/sangminpark/Desktop/2021/JavaScript/Node.js/var.js': Module {
id: '/Users/sangminpark/Desktop/2021/JavaScript/Node.js/var.js',
path: '/Users/sangminpark/Desktop/2021/JavaScript/Node.js',
exports: { odd: '홀수', even: '짝수' },
parent: Module {
id: '.',
path: '/Users/sangminpark/Desktop/2021/JavaScript/Node.js',
exports: '저를 찾아보세요',
parent: null,
filename: '/Users/sangminpark/Desktop/2021/JavaScript/Node.js/require.js',
loaded: false,
children: [Array],
paths: [Array]
},
filename: '/Users/sangminpark/Desktop/2021/JavaScript/Node.js/var.js',
loaded: true,
children: [],
paths: [
'/Users/sangminpark/Desktop/2021/JavaScript/Node.js/node_modules',
'/Users/sangminpark/Desktop/2021/JavaScript/node_modules',
'/Users/sangminpark/Desktop/2021/node_modules',
'/Users/sangminpark/Desktop/node_modules',
'/Users/sangminpark/node_modules',
'/Users/node_modules',
'/node_modules'
]
}
}
require.main입니다.
true
undefined
```

위 예제에서 알아야 할 점은, `require`이 반드시 파일 최상단에 위치할 필요가 없고, `module.exports`도 최하단에 위치할 필요가 없다는 것이다. 아무 곳에서나 사용해도 된다.

`require.cache` 객체에 require.js나 var.js 같은 파일 이름이 속성명으로 들어가 있는 것을 볼 수 있다. 속성값으로는 각 파일의 모듈 객체가 들어 있다. 한번 require한 파일은 require.cache에 저장되므로 다음 번에 require할 때는 새로 불러오지 않고 require.cache에 있는 것이 재사용된다.

만약 새로 require하길 원한다면, require.cache의 속성을 제거하면 된다. 다만, 프로그램의 동작이 꼬일 수 있으므로 권장하지는 않는다. 속성을 자세히 살펴보면 module.exports했던 부분(exports)이나 로딩 여부(loaded), 부모(parent), 자식(children) 모듈 관계를 찾을 수 있다.

require.main은 노드 실행 시 첫 모듈을 가리킨다. 현재 node require로 실행했으므로 require.js가 require.main이 된다. require.main 객체의 모양은 require.cache의 모듈 객체와 같다. 현재 파일이 첫 모듈인지 알아보려면 require.main === module을 해보면 된다. node require로 실행한 경우, var.js에서 require.main === module을 실행하면 false가 반환될 것이다. 첫 모듈의 이름을 알아보려면 require.main.filename으로 확인하면 된다.

모듈을 사용할 때 주의해야 할 점이 있다. 만약 두 모듈 `dep1`과 `dep2`가 있고 이 둘이 서로를 require한다면 어떻게 될까?

> dep1.js

```js
const dep2 = require("./dep2");
console.log("require dep2", dep2);
module.exports = () => {
  console.log("dep2", dep2);
};
```

> dep2.js

```js
const dep1 = require("./dep1");
console.log("require dep1", dep1);
module.exports = () => {
  console.log("dep1", dep1);
};
```

dep-run.js를 만들어서 두 모듈을 실행해보자.

> dep-run.js

```js
const dep1 = require("./dep1");
const dep2 = require("./dep2");
dep1();
dep2();
```

코드가 위에서부터 실행되므로 `require('./dep1')`이 먼저 실행된다. dep1.js에서는 제일 먼저 `require('./dep2');`이 실행되는데, 다시 dep2.js에서는 `require('./dep1');`이 실행된다. 이 과정이 계속 반복되므로 어떻게 될지 궁금할 것이다. 실행해 보자.

> 콘솔

```
$ node dep-run
require dep1 {}
require dep2 [Function (anonymous)]
dep2 [Function (anonymous)]
dep1 {}
(node:29044) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency (Use `node --trace-warnings ...` to show where the warning was created)
```

놀랍게도 dep1의 module.exports가 함수가 아니라 빈 객체로 표시된다. 이러한 현상을 순환 참조(circular dependency)라고 부른다. 이렇게 순환 참조가 있을 경우에는 순환 참조되는 대상을 빈 객체로 만든다. 이때 에러가 발생하지 않고 조용히 빈 객체로 변경되므로 예기치 못한 동작이 발생할 수 있다. 따라서 순환 참조가 발생하지 않도록 구조를 잘 잡는 것이 중요하다.

#### 3-4-5. process

`process` 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다. `process` 객체 안에는 다양한 속성이 있는데, 하나씩 REPL에 따라 입력해보자. 결괏값은 사용자의 컴퓨터마다 차이가 있을 수 있다.

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 Node.js % node
Welcome to Node.js v14.15.5.
Type ".help" for more information.
> process.version
'v14.15.5' // 설치된 노드의 버전이다.
> process.arch
'x64' // 프로세서 아키텍처 정보이다. arm, ia32 등의 값일 수도 있다.
> process.platform
'darwin' // 운영체제 플랫폼 정보입니다. linux나 win32, freebsd등의 값일 수도 있다.
> process.pid
20823 // 현재 프로세스의 아이디이다. 프로세스를 여러 개 가질 때 구분할 수 있다.
> process.uptime()
27.46315772 // 프로세스가 시작된 후 흐른 시간이다. 단위는 초이다.
> process.execPath
'/Users/sangminpark/.nvm/versions/node/v14.15.5/bin/node' // 노드의 경로이다.
> process.cwd()
'/Users/sangminpark/Desktop/2021/JavaScript/Node.js' // 현재 프로세스가 실행되는 위치이다.
> process.cpuUsage()
{ user: 323888, system: 122174 } // 현재 CPU 사용량이다.
```

이 정보들의 사용 빈도는 그리 높지 않지만, 일반적으로 운영체제나 실행 환경별로 다른 동작을 하고 싶을 때 사용한다. `process.env`와 `process.nextTick`, `process.exit()`은 중요하니 따로 설명합니다.

##### 3-4-6-1. process.env

REPL에 process.env를 입력하면 매우 많은 정보가 출력된다. 자세히 보면 이 정보들이 시스템의 환경 변수임을 알 수 있다. 시스템 환경 변수는 노드에 직접 영향을 미치기도 한다. 대표적인 것으로 `UV_THREADPOOL_SIZE`와 `NODE_OPTIONS`가 있다.

```
NODE_OPTIONS=--max-old-space-size=8192
UV_THREADPOOL_SIZE=8
```

왼쪽이 환경 변수의 이름이고 오른쪽이 값이다. `NODE_OPTIONS`는 노드를 실행할 때의 옵션들을 입력받는 환경 변수이다. `--max-old-space-size=8192`는 노드의 메모리를 8GB까지 사용할 수 있게 합니다. 옵션이 다양하게 존재하므로 3.9절에 NODE_OPTIONS에 대한 링크가 있다. `UV_THREADPOOL_SIZE`는 노드에서 기본적으로 사용하는 스레드풀의 스레드 개수를 조절할 수 있게 합니다. 3.6.4절에서 자세히 알아본다.

시스템 환경 변수 외에도 각자가 임의로 환경 변수를 저장할 수 있다. `process.env`는 서비스의 중요한 키를 저장하는 공간으로도 사용된다. 서버나 데이터베이스의 비밀번호와 각종 API 키를 코드에 직접 입력하는 것은 위험하다. 혹여 서비스가 해킹을 당해 코드가 유출되었을 때는 비밀번호가 코드에 남아 있어 추가 피해가 발생할 수 있다.

따라서 중요한 비밀번호는 다음과 같이 process.env의 속성으로 대체한다.

```
const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;
```

이제 `process.env`에 직접 SECRET_ID와 SECRET_CODE를 넣으면 된다. 넣는 방법은 운영체제마다 차이가 있다. 하지만 한 번에 모든 운영체제에 동일하게 넣을 수 있는 방법이 있다. 6.2절에서 dotenv를 사용할 때 배운다.

##### 3-4-6-2. process.nextTick(콜백)

이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리하도록 만든다.

> nextTick.js

```js
setImmediate(() => {
  console.log("immediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => console.log("promise"));
```

process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다. 코드 맨 밑에 Promise를 넣은 것은 resolve된 Promise도 nextTick처럼 다른 콜백들보다 우선시되기 때문입니다. 그래서 process.nextTick과 Promise를 마이크로태스크(microtask)라고 따로 구분지어 부른다.

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 Node.js % node nextTick
nextTick
promise
timeout
immediate
```

> **🚫 Warning 마이크로태스크의 재귀 호출**
>
> process.nextTick으로 받은 콜백 함수나 resolve된 Promise는 다른 이벤트 루프에서 대기하는 콜백 함수보다도 먼저 실행된다. 그래서 비동기 처리를 할 때 setImmediate보다 process.nextTick을 더 선호하는 개발자도 있다. 하지만 이런 마이크로태스크를 재귀 호출하게 되면 이벤트 루프는 다른 콜백 함수보다 마이크로태스크를 우선하여 처리하므로 콜백 함수들이 실행되지 않을 수도 있다.

#### 3-4-6-3. process.exit(코드)

실행중인 노드 프로세스를 종료한다. 서버 환경에서 이 함수를 사용하면 서버가 멈추므로 특수한 경우를 제외하고는 서버에서 잘 사용하지 않는다. 하지만 서버 외의 독립적인 프로그램에서는 수동으로 노드를 멈추기 위해 사용한다.

setInterval로 반복되고 있는 코드를 process.exit()으로 멈춰 보자.

> exit.js

```js
let i = 1;
setInterval(() => {
  if (i === 5) {
    console.log("종료");
    process.exit();
  }
  console.log(i);
  i += 1;
}, 1000);
```

1부터 4까지 표시한 뒤, i가 5가 되었을 때 종료하도록 했다.

> 콘솔

```
$ node exit
1
2
3
4
종료
```

process.exit 메서드는 인수로 코드 번호를 줄 수 있다. 인수를 주지 않거나 0을 주면 정상 종료를 뜻하고, 1을 주면 비정상 종료를 뜻한다. 만약 에러가 발생해서 종료하는 경우에는 1을 넣으면 된다.

지금까지 자주 쓰이는 내장 객체를 알아봤다. 타이머와 콘솔, 프로세스, 모듈은 기본적인 기능이지만 앞으로도 계속 사용된다.

또한, 노드는 여러 가지 강력한 기능을 기본 모듈로 제공합니다. 다음 절에서는 노드가 어떤 기능들을 제공하는지 알아볼 것이다.
