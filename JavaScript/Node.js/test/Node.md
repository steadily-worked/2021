<Node.js 교과서 개정 2판> 을 요약하고 나름대로의 생각이 담긴 글입니다.

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
'darwin' // 운영체제 플랫폼 정보이다. linux나 win32, freebsd등의 값일 수도 있다.
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

이 정보들의 사용 빈도는 그리 높지 않지만, 일반적으로 운영체제나 실행 환경별로 다른 동작을 하고 싶을 때 사용한다. `process.env`와 `process.nextTick`, `process.exit()`은 중요하니 따로 설명한다.

##### 3-4-6-1. process.env

REPL에 process.env를 입력하면 매우 많은 정보가 출력된다. 자세히 보면 이 정보들이 시스템의 환경 변수임을 알 수 있다. 시스템 환경 변수는 노드에 직접 영향을 미치기도 한다. 대표적인 것으로 `UV_THREADPOOL_SIZE`와 `NODE_OPTIONS`가 있다.

```
NODE_OPTIONS=--max-old-space-size=8192
UV_THREADPOOL_SIZE=8
```

왼쪽이 환경 변수의 이름이고 오른쪽이 값이다. `NODE_OPTIONS`는 노드를 실행할 때의 옵션들을 입력받는 환경 변수이다. `--max-old-space-size=8192`는 노드의 메모리를 8GB까지 사용할 수 있게 한다. 옵션이 다양하게 존재하므로 3.9절에 NODE_OPTIONS에 대한 링크가 있다. `UV_THREADPOOL_SIZE`는 노드에서 기본적으로 사용하는 스레드풀의 스레드 개수를 조절할 수 있게 한다. 3.6.4절에서 자세히 알아본다.

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

process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다. 코드 맨 밑에 Promise를 넣은 것은 resolve된 Promise도 nextTick처럼 다른 콜백들보다 우선시되기 때문이다. 그래서 process.nextTick과 Promise를 마이크로태스크(microtask)라고 따로 구분지어 부른다.

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

##### 3-4-6-3. process.exit(코드)

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

또한, 노드는 여러 가지 강력한 기능을 기본 모듈로 제공한다. 다음 절에서는 노드가 어떤 기능들을 제공하는지 알아볼 것이다.

### 3-5. 노드 내장 모듈 사용하기

노드는 웹 브라우저에서 사용하는 자바스크립트보다 더 많은 기능을 제공한다. 운영체제 정보에도 접근할 수 있고, 클라이언트가 요청한 주소에 대한 정보도 가져올 수 있다. 노드에서 이러한 기능을 하는 모듈을 제공한다.

노드의 모듈은 노드 버전마다 차이가 있다. 따라서 버전과 상관없이 안정적이고 유용한 기능을 지닌 모듈 위주로 살펴볼 예정이다. 공식문서에 모두 나와 있는 내용이지만, 중요하고 자주 사용하는 것들만 추렸다.

#### 3-5-1. os

먼저 os 모듈이다. 웹 브라우저에 사용되는 자바스크립트는 운영체제의 정보를 가져올 수 없지만, 노드는 os 모듈에 정보가 담겨 있어 정보를 가져올 수 있다.

os 모듈의 대표적인 메소드를 알아보자.

> os.js

```js
const os = require("os");

console.log("운영체제 정보---------------------------------");
console.log("os.arch():", os.arch());
console.log("os.platform():", os.platform());
console.log("os.type():", os.type());
console.log("os.uptime():", os.uptime());
console.log("os.hostname():", os.hostname());
console.log("os.release():", os.release());

console.log("경로------------------------------------------");
console.log("os.homedir():", os.homedir());
console.log("os.tmpdir():", os.tmpdir());

console.log("cpu 정보--------------------------------------");
console.log("os.cpus():", os.cpus());
console.log("os.cpus().length:", os.cpus().length);

console.log("메모리 정보-----------------------------------");
console.log("os.freemem():", os.freemem());
console.log("os.totalmem():", os.totalmem());
```

> 콘솔

```
운영체제 정보 ----------------
os.arch(): x64
os.platform(): darwin
os.type(): Darwin
os.uptime(): 729314
os.hostname(): Sangminui-MacBookPro-16.local
os.release(): 20.3.0
경로 -------------------
os.homedir(): /Users/sangminpark
os.tmpdir(): /var/folders/d1/vw40p2ts29s963kgsw_14px40000gn/T
cpu 정보--------------------------------------
os.cpus(): [
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 45022850, nice: 0, sys: 26137930, idle: 221747710, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 1549770, nice: 0, sys: 1469900, idle: 289732560, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 41827380, nice: 0, sys: 19154920, idle: 231773810, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 1536750, nice: 0, sys: 1248890, idle: 289966480, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 34035530, nice: 0, sys: 14132390, idle: 244588000, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 1552750, nice: 0, sys: 1134770, idle: 290064480, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 29904890, nice: 0, sys: 11878410, idle: 250972420, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 1565720, nice: 0, sys: 1049920, idle: 290136230, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 22970930, nice: 0, sys: 8629800, idle: 261154800, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 1536120, nice: 0, sys: 936810, idle: 290278800, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 20211230, nice: 0, sys: 7155420, idle: 265388690, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 1519030, nice: 0, sys: 856270, idle: 290376300, irq: 0 }
  }
]
os.cpus().length: 12
메모리 정보-----------------------------------
os.freemem(): 320937984
os.totalmem(): 17179869184
```

process 객체와 겹치는 부분도 조금 보인다. 사용자의 컴퓨터 운영체제마다 다 다르다.

- os.arch(): process.arch와 동일하다.
- os.platform(): process.platform과 동일하다.
- os.type(): 운영체제의 종류를 보여준다.
- os.uptime(): 운영체제 부팅 이후 흐른 시간(초)을 보여준다. process.uptime()은 노드의 실행 시간이었다.
- os.hostname(): 컴퓨터의 이름을 보여준다.
- os.release(): 운영체제의 버전을 보여준다.
- os.homedir(): 홈 디렉터리 경로를 보여준다.
- os.tmpdir(): 임시 파일 저장 경로를 보여준다.
- os.cpus(): 컴퓨터의 코어 정보를 보여준다.
- os.freemem(): 사용 가능한 메모리(RAM)를 보여준다.
- os.totalmem(): 전체 메모리 용량을 보여준다.

> Note: 코어 개수 확인하기
>
> os.cpus().length를 하면 코어의 개수가 숫자로 나온다. 하지만 노드에서 싱글 스레드 프로그래밍을 하면 코어가 몇 개이든 상관없이 대부분의 경우 코어를 하나밖에 사용하지 않는다. 하지만 4.5절에 나오는 cluster 모듈을 사용하는 경우에는 코어 개수에 맞춰서 프로세스를 늘릴 수 있다. 이때 cpus() 메서드를 사용할 것이다.

os.constants라는 객체가 있다. 그 안에는 각종 에러와 신호에 대한 정보가 담겨 있다. 에러가 발생했을 때 EADDRINUSE나 ECONNRESET 같은 에러 코드를 함께 보여준다. 이러한 코드들이 os.constants 안에 들어있다. 에러 코드가 너무 많아서 외울 수 없으므로 발생할때마다 검색해 보는 것이 좋다.

os 모듈은 주로 컴퓨터 내부 자원에 빈번하게 접근하는 경우 사용된다. 즉, 일반적인 웹 서비스를 제작할 때는 사용 빈도가 높지 않다. 하지만 운영체제별로 다른 서비스를 제공하고 싶을 때 os 모듈이 유용할 것이다.

#### 3-5-2. path

폴더와 파일의 경로를 쉽게 조작할 수 있도록 도와주는 모듈이다. path 모듈이 필요한 이유 중 하나는 운영체제별로 경로 구분자가 다르기 때문이다. 크게 윈도우 타입과 POSIX 타입으로 구분된다. POSIX는 유닉스 기반의 운영체제들을 의미하며 맥과 리눅스가 속해 있다.

이외에도 파일 경로에서 파일명이나 확장자만 따로 떼어주는 기능을 구현해두어 직접 구현하지 않고도 편리하게 사용할 수 있다.

path 모듈의 속성과 메서드를 알아보자.

- path.sep: 경로의 구분자이다. 윈도는 \, POSIX는 /이다.

- path.delimiter: 환경 변수의 구분자이다. process.env.PATH를 입력하면 여러 개의 경로가 이 구분자로 구분되어 있다. 윈도는 세미콜론(;)이고, POSIX는 콜론(:)이다.

- path.dirname(경로): 파일이 위치한 폴더 경로를 보여준다.

- path.extname(경로): 파일의 확장자를 보여준다.

- path.basename(경로, 확장자): 파일의 이름(확장자 포함)을 표시한다. 파일의 이름만 표시하고 싶다면 basename의 두 번째 인수로 파일의 확장자를 넣으면 된다.

- path.parse(경로): 파일 경로를 root, dir, base, ext, name으로 분리한다.

- path.format(객체): path.parse()한 객체를 파일 경로로 합친다.

- path.normalize(경로): /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환한다.

- path.isAbsolute(경로): 파일의 경로가 절대경로인지 상대경로인지를 true나 false로 알린다.

- path.relative(기준경로, 비교경로): 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알린다.

- path.join(경로, …): 여러 인수를 넣으면 하나의 경로로 합친다. 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리한다.

- path.resolve(경로, …): path.join()과 비슷하지만 차이가 있다. 차이점은 다음에 나오는 Note에서 설명한다.

> Note: join과 resolve의 차이
>
> path.join과 path.resolve 메서드는 비슷해 보이지만 동작 방식이 다르다. /를 만나면 path.resolve는 절대경로로 인식해서 앞의 경로를 무시하고, path.join은 상대경로로 처리한다. 코드로 보면 이해하기 쉽다.
>
> ```js
> path.join("/a", "/b", "c"); /*  결과 : /a/b/c/ */
> path.resolve("/a", "/b", "c"); /*  결과 : /b/c */
> ```

> Note: 상대경로와 절대경로
>
> 절대경로는 루트 폴더(윈도의 C:\나 POSIX의 /)나 노드 프로세스가 실행되는 위치가 기준이 된다.
> 상대경로는 현재 파일이 기준이 된다. 현재 파일과 같은 경로면 점 하나(.)를, 현재 파일보다 한 단계 상위 경로면 점 두 개(..)를 사용해 표현한다.

가끔 윈도에서 POSIX 스타일 경로를 사용할 때가 있고, 그 반대일 때도 있다. 이러한 경우 윈도에서는 path.posix.sep이나 path.posix.join()과 같이 사용하면 되고, POSIX에서는 path.win32.sep이나 path.win32.join()과 같이 사용하면 된다.

노드는 require.main 파일을 기준으로 상대 경로를 인식한다. 따라서 require.main과는 다른 디렉터리의 파일이 상대 경로를 갖고 있다면 예상과 다르게 동작할 수 있다. 이 문제는 path 모듈을 통해 해결할 수 있다. fs 모듈을 살펴볼 때 한 번 더 짚고 넘어갈 것이다.

path 모듈 이전까지는 중요한 API만 추렸으나, path 모듈은 속성 하나하나가 모두 유용하므로 전부 넣었다. path 모듈은 앞으로 노드 프로그래밍을 하면서 매우 자주 쓰게 될 모듈 중 하나이다.

#### 3-5-3. url

> url.js

```js
const url = require("url");

const { URL } = url;
const myURL = new URL(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);
console.log("new URL():", myURL);
console.log("url.format():", url.format(myURL));
console.log("------------------------------");
const parsedUrl = url.parse(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);
console.log("url.parse():", parsedUrl);
console.log("url.format():", url.format(parsedUrl));
```

- url 모듈 안에 URL 생성자가 있다. 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리된다. 이 방식이 WHATWG의 url이다. WHATWG에만 있는 `username`,`password`, `origin`, `searchParams` 속성이 존재한다.

> 콘솔

```
$ node url
new URL(): URL {
  href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor',
  origin: 'http://www.gilbut.co.kr',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'www.gilbut.co.kr',
  hostname: 'www.gilbut.co.kr',
  port: '',
  pathname: '/book/bookList.aspx',
  search: '?sercate1=001001000',
  searchParams: URLSearchParams { 'sercate1' => '001001000' },
  hash: '#anchor'
}
url.format(): http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor
------------------------------
url.parse(): Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.gilbut.co.kr',
  port: null,
  hostname: 'www.gilbut.co.kr',
  hash: '#anchor',
  search: '?sercate1=001001000',
  query: 'sercate1=001001000',
  pathname: '/book/bookList.aspx',
  path: '/book/bookList.aspx?sercate1=001001000',
  href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
}
url.format(): http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor
```

기존 노드 방식에서는 두 메서드를 주로 사용한다.

- **url.parse(주소)**: 주소를 분해한다. WHATWG 방식과 비교하면 username과 password 대신 auth 속성이 있고, searchParams 대신 query가 있다.

- **url.format(객체)**: WHATWG 방식 url과 기존 노드의 url을 모두 사용할 수 있다. 분해되었던 url 객체를 다시 원래 상태로 조립한다.

WHATWG와 노드의 url은 취향에 따라 사용하면 되지만, 노드의 url 형식을 꼭 사용해야 하는 경우가 있다. host 부분 없이 pathname 부분만 오는 주소인 경우(예시: `/book/bookList.apsx`)에는 WHATWG 방식이 처리할 수 없다. 4장에서 서버를 만들 때는 host 부분 없이 pathname만 오는 주소를 보게 될 것이다.

WHATWG 방식은 search 부분을 searchParams라는 특수한 객체로 반환하므로 유용하다. search 부분은 보통 주소를 통해 데이터를 전달할 때 사용된다. search는 물음표(?)로 시작하고, 그 뒤에 **키=값** 형식으로 데이터를 전달한다. 여러 키가 있을 경우에는 `&`로 구분한다.

`http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript`와 같은 주소에서는 `?page=3&limit=10&category=nodejs&category=javascript` 부분이 search이다.

다음으로 `searchParams` 객체를 알아보자.

> searchParams.js

```js
const { URL } = require("url");

const myURL = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
console.log("searchParams:", myURL.searchParams);
console.log("searchParams.getAll():", myURL.searchParams.getAll("category"));
console.log("searchParams.get():", myURL.searchParams.get("limit"));
console.log("searchParams.has():", myURL.searchParams.has("page"));

console.log("searchParams.keys():", myURL.searchParams.keys());
console.log("searchParams.values():", myURL.searchParams.values());

myURL.searchParams.append("filter", "es3");
myURL.searchParams.append("filter", "es5");
console.log(myURL.searchParams.getAll("filter"));

myURL.searchParams.set("filter", "es6");
console.log(myURL.searchParams.getAll("filter"));

myURL.searchParams.delete("filter");
console.log(myURL.searchParams.getAll("filter"));

console.log("searchParams.toString():", myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
```

> 콘솔

```
searchParams: URLSearchParams {
  'page' => '3',
  'limit' => '10',
  'category' => 'nodejs',
  'category' => 'javascript' }
searchParams.getAll(): [ 'nodejs', 'javascript' ]
searchParams.get(): 10
searchParams.has(): true
searchParams.keys(): URLSearchParams Iterator { 'page', 'limit', 'category', 'category' }
searchParams.values(): URLSearchParams Iterator { '3', '10', 'nodejs', 'javascript' }
[ 'es3', 'es5' ]
[ 'es6' ]
[]
searchParams.toString(): page=3&limit=10&category=nodejs&category=javascript
```

URL 생성자를 통해 `myURL`이라는 주소 객체를 만들었다. myURL 안에는 `searchParams` 객체가 있다. 이 객체는 search 부분을 조작하는 다양한 메소드를 지원한다. 2.2.2의 formData 객체 메소드와 비슷하다.

- getAll(키): 키에 해당하는 모든 값들을 가져온다. category 안에는 nodejs와 javascript라는 두 가지 값이 들어 있다.
- get(키): 키에 해당하는 첫 번째 값만 가져온다.
- has(키): 해당 키가 있는지 없는지를 검사한다.
- keys(): searchParams의 모든 **키**를 반복기(iterator)(ES6문법) 객체로 가져온다.
- values(): searchParams의 모든 **값**을 반복기 객체로 가져온다.
- append(키, 값): 해당 키를 추가한다. 같은 키의 값이 있다면 유지하고 하나 더 추가한다.
- set(키, 값): append와 비슷하지만, 같은 키의 값들을 모두 지우고 새로 추가한다.
- delete(키): 해당 키를 제거한다.
- toString(): 조작한 searchParams 객체를 다시 문자열로 만든다. 이 문자열을 search에 대입하면 주소 객체에 반영된다.

query같은 문자열보다 searchParams가 유용한 이유는 query의 경우 다음에 배우는 querystring 모듈을 한 번 더 사용해야 하기 때문이다.

#### 3-5-4. querystring

WHATWG 방식의 url 대신 기존 노드의 url을 사용할 때, search 부분을 사용하기 쉽게 객체로 만드는 모듈이다.

> querystring.js

```js
const url = require("url");
const querystring = require("querystring");

const parsedUrl = url.parse(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
const query = querystring.parse(parsedUrl.query);
console.log("querystring.parse():", query);
console.log("querystring.stringify():", querystring.stringify(query));
```

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 test % node querystring.js
querystring.parse(): [Object: null prototype] {
  page: '3',
  limit: '10',
  category: [ 'nodejs', 'javascript' ]
}
querystring.stringify(): page=3&limit=10&category=nodejs&category=javascript
```

처음으로 모듈 두 개를 함께 사용했다. 실제 프로젝트에서도 이렇게 모듈 여러 개를 파일 하나에 불러올 수 있다.

- **querystring.parse(쿼리)**: url의 query 부분을 자바스크립트 객체로 분해한다.
- **querystring.stringify(객체)**: 분해된 query 객체를 문자열로 다시 조립한다.

간단하게 객체로 분해되고 문자열로 조립되므로 편리하다.

#### 3-5-5. crypto

다양한 방식의 암호화를 도와주는 모듈이다. 몇 가지 메소드는 익혀두면 실제 서비스에도 적용할 수 있어서 정말 유용하다.

고객의 비밀번호는 반드시 암호화해야 한다. 비밀번호를 암호화하지 않으면 비밀번호를 저장해둔 데이터베이스가 해킹당하는 순간, 고객들의 비밀번호도 고스란히 해커 손에 넘어가고 만다. 물론 데이터베이스가 해킹당하지 않도록 노력해야겠지만, 안전 장치를 이중으로 만들어놓는 것이 좋다.

##### 3-5-5-1. 단방향 암호화

비밀번호는 보통 단방향 암호화 알고리즘을 사용해서 암호화한다. 단방향 암호화란 복호화할 수 없는 암호화 방식을 뜻한다. 복호화는 암호화된 문자열을 원래 문자열로 되돌려놓는 것을 의미한다. 즉, 단방향 암호화는 한 번 암호화하면 원래 문자열을 찾을 수 없다. 복호화할 수 없으므로 암호화라고 표현하는 대신 해시 함수라고 부르기도 한다.

복호화할 수 없는 암호화가 왜 필요한지 의문이 들 수도 있다. 하지만 생각해보면 고객의 비밀번호는 복호화할 필요가 없다. 먼저 고객의 비밀번호를 암호화해서 데이터베이스에 저장한다. 그리고 로그인할 때마다 입력받은 비밀번호를 같은 암호화 알고리즘으로 암호화한 후, 데이터베이스의 비밀번호와 비교하면 된다. 원래 비밀번호는 어디에도 저장되지 않고 암호화된 문자열로만 비교하는 것이다.

단방향 암호화 알고리즘은 주로 해시 기법을 사용한다. 해시 기법이란 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식이다. 예를 들면 `abcdefgh`라는 문자열을 `qvew`로 바꿔버리고, `ijklm`이라는 문자열을 `zvsf`로 바꿔버리는 것이다. 입력 문자열의 길이는 다르지만, 출력 문자열의 길이는 네 자리로 고정되어 있다.

노드에서 해시 함수는 다음과 같이 사용한다.

> hash.js

```js
const crypto = require("crypto");

console.log(
  "base64:",
  crypto.createHash("sha512").update("비밀번호").digest("base64")
);
console.log(
  "hex:",
  crypto.createHash("sha512").update("비밀번호").digest("hex")
);
console.log(
  "base64:",
  crypto.createHash("sha512").update("다른 비밀번호").digest("base64")
);
```

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 test % node hash.js
base64: dvfV6nyLRRt3NxKSlTHOkkEGgqW2HRtfu19Ou/psUXvwlebbXCboxIPmDYOFRIpqav2eUTBFuHaZri5x+usy1g==
hex: 76f7d5ea7c8b451b773712929531ce92410682a5b61d1b5fbb5f4ebbfa6c517bf095e6db5c26e8c483e60d8385448a6a6afd9e513045b87699ae2e71faeb32d6
base64: cx49cjC8ctKtMzwJGBY853itZeb6qxzXGvuUJkbWTGn5VXAFbAwXGEOxU2Qksoj+aM2GWPhc1O7mmkyohXMsQw==
```

비밀번호라는 문자열을 해시를 사용해 바꿔봤다.

- **createHash(알고리즘)**: 사용할 해시 알고리즘을 넣는다. `md5`, `sha1`, `sha256`, `sha512` 등이 가능하지만, `md5`와 `sha1`은 이미 취약점이 발견되었다. 현재는 `sha512` 정도로 충분하지만, 나중에 `sha512` 마저도 취약해지면 더 강화된 알고리즘으로 바꿔야 한다.
- **update(문자열)**: 변환할 문자열을 넣는다.
- **digest(인코딩)**: 인코딩할 알고리즘을 넣는다. `base64`,`hex`, `latin1`이 주로 사용되는데, 그중 `base64`가 결과 문자열이 가장 짧아 애용된다. 결과물로 변환된 문자열을 반환한다.

가끔 `nopqrst`라는 문자열이 `qvew`로 변환되어 `abcdefgh`를 넣었을 때와 똑같은 출력 문자열로 바뀔 때도 있다. 이런 상황을 충돌이 발생했다고 표현한다. 해킹용 컴퓨터의 역할은 어떠한 문자열이 같은 출력 문자열을 반환하는지 찾아내는 것이다. 여러 입력 문자열이 같은 출력 문자열로 변환될 수 있으므로 비밀번호를 abcdefgh로 설정했어도 nopqrst로 뚫리는 사태가 발생하게 된다.

해킹용 컴퓨터의 성능이 발달함에 따라 기존 해시 알고리즘들이 위협받고 있지만, 이와 동시에 해시 알고리즘도 더 강력하게 진화하고 있다. 언젠가는 `sha512의` 취약점도 발견될 것이다. 그렇게 된다면 더 강력한 알고리즘인 `sha3`으로 이전하면 된다.

현재는 주로 `pbkdf2`나 `bcrypt`, `scrypt`라는 알고리즘으로 비밀번호를 암호화하고 있다. 그중 노드에서 지원하는 `pbkdf2`에 대해 알아보자. `pbkdf2`는 간단히 말하면 기존 문자열에 `salt`라고 불리는 문자열을 붙인 후 해시 알고리즘을 반복해서 적용하는 것이다.

> pbkdf2.js

```js
const crypto = require("crypto");

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  console.log("salt:", salt);
  crypto.pbkdf2("비밀번호", salt, 100000, 64, "sha512", (err, key) => {
    console.log("password:", key.toString("base64"));
  });
});
```

먼저 `randomBytes()` 메서드로 64바이트 길이의 문자열을 만든다. 이것이 salt가 된다. `pbkdf2()` 메서드에는 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘을 인수로 넣는다. 예시에서는 10만 번 반복해서 적용한다고 했다. 즉, `sha512`로 변환된 결과값을 다시 `sha512`로 변환하는 과정을 10만 번 반복하는 것이다.

너무 많이 반복하는 것은 아닌지 걱정될 수도 있지만, 1초 정도밖에 걸리지 않는다. 이는 컴퓨터의 성능에 좌우되므로 조금 느리다 싶으면 반복 횟수를 낮추고, 너무 빠르다 싶으면 1초 정도가 될 때까지 반복 횟수를 늘린다.

싱글 스레드 프로그래밍을 할 때 1초 동안 블로킹이 되는 것은 아닌지 걱정할 수도 있다. 다행히 `crypto.randomBytes`와 `crypto.pbkdf2` 메서드는 내부적으로 스레드풀을 사용해 멀티 스레딩으로 동작한다. 이러한 메서드들이 몇 개 있는데 3.6.4에서 알아볼 것이다.

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 test % node pbkdf2.js
salt: 8qIuZKpVeA2uh2gMTzbhQD+/fluJ+2TzposYPqO7tuWT88feU3lYbZoIx3olbfBHjsVy30v6fw0p7v1GnthjNA==
password: nqvJKiE9soL8+omzjvKQjgPFyOIs3NA9ybkk8zhWqaR9u+xOugoa9IVQ2saDY/C0oQeU49ADaUlIeh2PlZVvMQ==
```

randomBytes이므로 매번 실행할 때마다 결과가 달라진다. 따라서 salt를 잘 보관하고 있어야 비밀번호도 찾을 수 있다.

`pbkdf2`는 간단하지만 `bcrypt`나 `scrypt`보다 취약하므로 나중에 더 나은 보안이 필요하면 `bcrypt`나 `scrypt` 방식을 사용하면 된다. 여기선 추후에 회원의 비밀번호를 암호화할 때 `bcrypt` 방식을 사용한다.

##### 3-5-5-2. 양방향 암호화

이번에는 양방향 대칭형 암호화를 알아보자. 암호화된 문자열을 복호화할 수 있으며, 키(열쇠)라는 것이 사용된다. 대칭형 암호화에서 암호를 복호화하려면 암호화할 때 사용한 키와 같은 키를 사용해야 한다.

다음은 노드로 양방향 암호화하는 방법이다. 하지만 다음 코드를 완벽하게 이해하려면 암호학을 추가로 공부해야 한다.

> cipher.js

```js
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = "abcdefghijklmnopqrstuvwxyz123456";
const iv = "1234567890123456";
const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update("암호화할 문장", "utf8", "base64");
result += cipher.final("base64");
console.log("암호화:", result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, "base64", "utf8");
result2 += decipher.final("utf8");
console.log("복호화:", result2);
```

- **crypto.createCipheriv(알고리즘, 키, iv)**: 암호화 알고리즘과 키, iv를 넣는다. 암호화 알고리즘은 aes-256-cbc를 사용했으며, 다른 알고리즘을 사용해도 된다. aes-256-cbc 알고리즘의 경우 키는 32바이트여야 하고, iv는 16바이트여야 한다. iv는 암호화할 때 사용하는 초기화 벡터를 의미하지만, 여기서 설명하기에는 내용이 많으므로 AES 암호화에 대해 따로 공부하는 것이 좋다. 사용 가능한 알고리즘 목록은 `crypto.getCiphers()`를 호출하면 볼 수 있다.

- **cipher.update(문자열, 인코딩, 출력 인코딩)**: 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣는다. 보통 문자열은 `utf8` 인코딩을, 암호는 `base64`를 많이 사용한다.

- **cipher.final(출력 인코딩)**: 출력 결과물의 인코딩을 넣으면 암호화가 완료된다.

- **crypto.createDecipheriv(알고리즘, 키, iv)**: 복호화할 때 사용한다. 암호화할 때 사용했던 알고리즘과 키, iv를 그대로 넣어야 한다.

- **decipher.update(문자열, 인코딩, 출력 인코딩)**: 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣는다. `createCipheriv`의 `update()`에서 utf8, base64순으로 넣었다면 `createDecipheriv`의 `update()`에서는 base64, utf8순으로 넣으면 된다.

- **decipher.final(출력 인코딩)**: 복호화 결과물의 인코딩을 넣는다.

> 콘솔

```
$ node cipher
암호화: iiopeG2GsYlk6ccoBoFvEH2EBDMWv1kK9bNuDjYxiN0=
복호화: 암호화할 문장
```

원래 문장으로 제대로 복호화되었다.

지금까지 배운 메서드 이외에도 crypto 모듈은 양방향 비대칭형 암호화, HMAC 등과 같은 다양한 암호화를 제공하고 있으니 암호화가 필요하면 모듈이 어떤 메서드들을 지원하는지 확인해보면 좋다. [노드 공식 문서](https://nodejs.org/api/crypto.html)에서 확인할 수 있다. 좀 더 간단하게 암호화를 하고 싶다면 npm 패키지인 [crypto-js](https://www.npmjs.com/package/crypto-js)를 추천한다.

#### 3-5-6. util

util이라는 이름처럼 각종 편의 기능을 모아둔 모듈이다. 계속해서 API가 추가되고 있으며, 가끔 deprecated되어 사라지는 경우도 있다.

> Note: deprecated란?
>
> deprecated는 프로그래밍 용어로, ‘중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될’ 것이라는 뜻이다. 새로운 기능이 나와서 기존 기능보다 더 좋을 때, 기존 기능을 deprecated 처리하곤 한다. 이전 사용자를 위해 기능을 제거하지는 않지만 곧 없앨 예정이므로 더 이상 사용하지 말라는 의미이다.

> utl.js

```js
const util = require("util");
const crypto = require("crypto");

const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, "dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!");
dontUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString("base64"));
  })
  .catch((error) => {
    console.error(error);
  });
```

- **util.deprecate**: 함수가 deprecated 처리 되었음을 알린다. 첫 번째 인수로 넣은 함수를 사용했을 때 경고 메시지가 출력된다. 두 번째 인수로 경고 메시지 내용을 넣으면 된다. 함수가 조만간 사라지거나 변경될 때 알려줄 수 있어 유용하다.

- **util.promisify**: 콜백 패턴을 프로미스 패턴으로 바꾼다. 바꿀 함수를 인수로 제공하면 된다. 이렇게 바꿔두면 async/await 패턴까지 사용할 수 있어 좋다. 3.5.5.1의 randomBytes와 비교해보자. 프로미스를 콜백으로 바꾸는 `util.callbackify`도 있지만 자주 사용되지는 않는다.

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 test % node util
3
(node:39217) DeprecationWarning: dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!
(Use `node --trace-deprecation ...` to show where the warning was created)
RaLqtSBpx4v18cu6VkRvAG0pvv+exu49apx5aObHN6efHkvtRZ7fQVnqyCLzYoDhPWq9JeNcr8ZFAcqNrOqdyg==
```

#### 3-5-7. worker_threads

노드에서 멀티 스레드 방식으로 작업하는 방법을 소개한다. `worker_threads` 모듈로 가능하다.

> worker_thread.js

```js
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // 부모일 때
  const worker = new Worker(__filename);
  worker.on("message", (message) => console.log("from worker", message));
  worker.on("exit", () => console.log("worker exit"));
  worker.postMessage("ping");
} else {
  // 워커일 때
  parentPort.on("message", (value) => {
    console.log("from parent", value);
    parentPort.postMessage("pong");
    parentPort.close();
  });
}
```

`isMainThread`를 통해 현재 코드가 메인 스레드(기존에 동작하던 싱글 스레드를 메인 스레드 또는 부모 스레드라고 부른다)에서 실행되는지, 아니면 우리가 생성한 워커 스레드에서 실행되는지 구분된다. 메인 스레드에서는 new Worker를 통해 현재 파일(`\_\_filename`)을 워커 스레드에서 실행시키고 있다. 물론 현재 파일의 else 부분만 워커 스레드에서 실행된다.

부모에서는 워커 생성 후 `worker.postMessage`로 워커에 데이터를 보낼 수 있다. 워커는 `parentPort.on('message')` 이벤트 리스너로 부모로부터 메시지를 받고, `parentPort.postMessage`로 부모에게 메시지를 보낸다. 부모는 `worker.on('message')`로 메시지를 받는다. 참고로 메시지를 한 번만 받고 싶다면 `once('message')`를 사용하면 된다.

워커에서 on 메서드를 사용할 때는 직접 워커를 종료해야 한다는 점에 주의하자. `parentPort.close()`를 하면 부모와의 연결이 종료된다. 종료될 때는 `worker.on('exit')`이 실행된다.

실제로 실행해보면 다음과 같다.

> 콘솔

```
$ node worker_threads
from parent ping
from worker pong
worker exit
```

아직까지는 워커 스레드를 사용해 복잡한 작업은 하지 않았다. 이번에는 여러 개의 워커 스레드에 데이터를 넘겨보자다. postMessage로 데이터를 보내는 방법과는 다른 방법이다.

> worker_data.js

```js
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  // 부모일 때
  const threads = new Set();
  threads.add(
    new Worker(__filename, {
      workerData: { start: 1 },
    })
  );
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    })
  );
  for (let worker of threads) {
    worker.on("message", (message) => console.log("from worker", message));
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log("job done");
      }
    });
  }
} else {
  // 워커일 때
  const data = workerData;
  parentPort.postMessage(data.start + 100);
}
```

new Worker를 호출할 때 두 번째 인수의 workerData 속성으로 원하는 데이터를 보낼 수 있다. 워커에서는 workerData로 부모로부터 데이터를 받는다. 현재 두 개의 워커가 돌아가고 있으며, 각각 부모로부터 숫자를 받아서 100을 더해 돌려준다. 돌려주는 순간 워커가 종료되어 `worker.on('exit')`이 실행된다. 워커 두 개가 모두 종료되면 job done이 로깅된다.

> 콘솔

```
from worker 101
from worker 102
job done
```

이번에는 좀 더 실전적인 예제로 소수의 개수를 구하는 작업을 워커 스레드를 통해 해보자. 소수를 찾는 작업은 연산이 많이 들어가는 대표적인 작업이다.

먼저 워커 스레드를 사용하지 않는 예제이다.

> prime.js

```js
const min = 2;
const max = 10000000;
const primes = [];

function generatePrimes(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

console.time("prime");
generatePrimes(min, max);
console.timeEnd("prime");
console.log(primes.length);
```

2부터 1,000만까지의 숫자 중에 소수가 모두 몇 개 있는지를 알아내는 코드이다. 코드를 실행해보자.

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 test % node prime.js
prime: 10.507s
664579
```

사용자의 컴퓨터 성능에 따라 다르지만 상당한 시간이 소요된다. 이번에는 워커 스레드를 사용하여 여러 개의 스레드들이 문제를 나눠서 풀도록 해 보자. 미리 말하지만 멀티 스레딩은 상당히 어렵다. 코드양도 많아진다.

> prime-worker.js

```js
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  let end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

if (isMainThread) {
  const max = 10000000;
  const threadCount = 8;
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  console.time("prime");
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(
      new Worker(__filename, { workerData: { start: wStart, range } })
    );
    start += range;
  }
  threads.add(
    new Worker(__filename, {
      workerData: { start, range: range + ((max - min + 1) % threadCount) },
    })
  );
  for (let worker of threads) {
    worker.on("error", (err) => {
      throw err;
    });
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd("prime");
        console.log(primes.length);
      }
    });
    worker.on("message", (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
```

여덟 개의 스레드가 일을 나눠서 처리하게 했다. 멀티 스레딩을 할 때는 일을 나눠서 처리하도록 하는 게 제일 어렵다. 어떠한 일은 공유하고 있는 데이터가 많아 일을 나누기가 어렵다. 다행히 소수의 개수를 구하는 작업은 정해진 범위(2부터 1,000만)를 스레드들이 일정하게 나눠서 수행할 수 있다.

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 test % node prime-worker.js
prime: 1.640s
664579
```

속도가 6배 정도 빨라졌다. 워커 스레드를 여덟 개 사용했다고 해서 여덟 배 빨라지는 것은 아니다. 스레드를 생성하고 스레드 사이에서 통신하는 데 상당한 비용이 발생하므로, 이 점을 고려해서 멀티 스레딩을 해야 한다. 잘못하면 멀티 스레딩을 할 때 싱글 스레딩보다 더 느려지는 현상도 발생할 수 있다.

다음 절에서는 다른 프로세스를 만들어 작업하는 방법을 알아볼 것이다.

#### 3-5-8. child_process

노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈이다. 이 모듈을 통해 다른 언어의 코드(예를 들면, 파이썬)를 실행하고 결괏값을 받을 수 있다. 이름이 `child_process`(자식 프로세스)인 이유는 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고, 노드 프로세스에 결과를 알려주기 때문이다.

먼저 명령 프롬프트의 명령어인 dir을 노드를 통해 실행해보자.

> exec.js

```js
const exec = require("child_process").exec;

var process = exec("ls");

process.stdout.on("data", function (data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on("data", function (data) {
  console.error(data.toString());
}); // 실행 에러
```

exec의 첫 번째 인수로 명령어를 넣는다. 실행하면 현재 폴더의 파일 목록들이 표시될 것이다.

결과는 stdout(표준출력)과 stderr(표준에러)에 붙여둔 data 이벤트 리스너에 버퍼 형태로 전달된다. 성공적인 결과는 표준출력에서, 실패한 결과는 표준에러에서 표시된다. 버퍼는 3.6.2절에서 자세히 알아본다.

> 콘솔

```
$ node exec
(현재 폴더의 파일 목록 표시)
```

이번에는 파이썬 프로그램을 실행해보자. 실습하려면 파이썬 3가 설치되어 있어야 한다.

> test.py

```py
print('hello python')
```

> spawn.js

```js
const spawn = require("child_process").spawn;

var process = spawn("python", ["test.py"]);

process.stdout.on("data", function (data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on("data", function (data) {
  console.error(data.toString());
}); // 실행 에러
```

파이썬 코드를 실행하는 명령어인 `python test.py`를 노드의 spawn을 통해 실행한다. spawn의 첫 번째 인수로 명령어를, 두 번째 인수로 옵션 배열을 넣으면 된다. 결과는 exec과 마찬가지로 stdout, stderr의 데이터로 나온다.

> 콘솔

```
sangminpark@Sangminui-MacBookPro-16 test % node spawn.js
hello python
```

exec과 spawn의 차이가 궁금할 것이다. exec은 셸을 실행해서 명령어를 수행하고, spawn은 새로운 프로세스를 띄우면서 명령어를 실행한다. spawn에서도 세 번째 인수로 `{ shell: true }`를 제공하면 exec처럼 셸을 실행해서 명령어를 수행한다. 셸을 실행하는지 마는지에 따라 수행할 수 있는 명령어에 차이가 있다.

#### 3-5-9. 기타 모듈들

이 책에서 언급하지 않은 모듈들이 많다. 여기서는 각 모듈의 이름과 용도만 간단히 소개하고 넘어간다. 자세한 사항을 알고 싶다면 공식 문서를 참조하면 된다. 실험적인 모듈들은 제외했고, 여기에 언급되지 않은 모듈들은 추후에 나온다.

- **assert**: 값을 비교하여 프로그램이 제대로 동작하는지 테스트하는데 사용한다.
- **dns**: 도메인 이름에 대한 IP 주소를 얻어내는 데 사용한다.
- **net**: HTTP보다 로우 레벨인 TCP나 IPC 통신을 할 때 사용한다.
- **string_decoder**: 버퍼 데이터를 문자열로 바꾸는 데 사용한다.
- **tls**: TLS와 SSL에 관련된 작업을 할 때 사용한다.
- **tty**: 터미널과 관련된 작업을 할 때 사용한다.
- **dgram**: UDP와 관련된 작업을 할 때 사용한다.
- **v8**: V8 엔진에 직접 접근할 때 사용한다.
- **vm**: 가상 머진에 직접 접근할 때 사용한다.

지금까지 기본적인 모듈들을 알아봤다. 다음 절에서는 fs 모듈과 함께 동기 메서드와 비동기 메서드를 알아보고 버퍼와 스트림을 배워볼 것이다.
