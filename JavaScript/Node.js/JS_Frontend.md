## 2. 알아두어야 할 자바스크립트

자바스크립트는 매년 새로운 버전으로 업데이트된다. 노드도 주기적(6개월마다)으로 버전을 올리며 변경된 자바스크립트 문법을 반영하고 있다. 앞으로의 예제들은 ES2015+ 문법을 사용하므로 2.1에서는 새로운 문법을 간단히 알아보고 2.2에서는 서버와 통신하기 위해 프런트엔드에서 사용하는 자바스크립트 코드를 알아볼 것이다.

### 2-1. ES2015+

2015년 자바스크립트 문법에 매우 큰 변화가 있었다. 바로 ES2015(=ES6)가 등장한 것이다. 2015년을 기점으로 매년 문법 변경 사항이 발표되고 있으며, 새로운 문법 상세(specification)에 대해서도 활발한 논의가 이루어지고 있다. 2020년 현재 ES2020까지 나왔다. 인터넷 익스플로러와 같은 구형 브라우저에서는 최신 문법을 사용할 수 없지만, 요즘에는 babel처럼 구형 브라우저에 맞게 문법을 변환해주는 도구가 널리 쓰이므로 큰 문제가 되지 않는다. 이제는 ES2015 이상의 자바스크립트 문법을 배울 때이다. 다른 언어들의 장점을 본딴 편리한 기능이 많이 추가되었기 때문이다. 노드 6 버전부터 ES2015 문법을 사용할 수 있다. 이 책에서는 ES2015 이상의 자바스크립트를 통틀어 ES2015+라고 표현할 것이다.

**만약 자바스크립트 최신 문법을 알지 못한다면, 이 책을 읽을 때 많은 문제가 있을 수 있다.** 하지만 잘 모르더라도 이 기회에 자바스크립트 문법을 같이 공부하는 것을 추천한다. 실무에서는 대부분 최신 문법을 사용하여 코드를 작성하고 있다. 혹시 자바스크립트 자체를 처음 접했다면, 자바스크립트 기본 문법부터 익혀야 한다. 노드는 자바스크립트 실행기이므로 자바스크립트 문법을 모른다면 실행할 것이 없다.

ES2015+의 문법 변경 사항이 생소한 독자들을 위해 이번 장에서는 이 책에서 사용하는 최신 문법을 간단하게 알아본다. 또한, 프런트엔드 환경에서 브라우저가 제공하는 몇 가지 객체를 사용하니 그에 대해서도 알아볼 것이다.

#### 2-1-1. const, let

보통 자바스크립트를 배울 때는 var로 변수를 선언하는 방법부터 배운다. 하지만 var은 이제 const와 let이 대체합니다. 먼저 const와 let이 공통적으로 가지는 특징인 블록 스코프(범위)에 대해 알아보자.

```js
if (true) {
  var x = 3;
}
console.log(x); // 3

if (true) {
  const y = 3;
}
console.log(y); // Uncaught ReferenceError: y is not defined
```

x는 정상적으로 출력되는데 y는 에러가 발생한다. var을 const로 바꿨을 뿐인데 차이가 발생하는 것이다. var은 함수 스코프를 가지므로 if문의 블록과 관계없이 접근할 수 있다. 하지만 const와 let은 블록 스코프를 가지므로 블록 밖에서는 변수에 접근할 수 없다. 블록의 범위는 if, while, for, function 등에서 볼 수 있는 중괄호({와 } 사이)이다. 함수 스코프 대신 블록 스코프를 사용함으로써 호이스팅 같은 문제도 해결되고 코드 관리도 수월해졌다.

const, let과 var은 스코프 종류가 다르다. 그렇다면 const와 let 간의 차이는 무엇일까? const는 한 번 값을 할당하면 다른 값을 할당할 수 없다. 다른 값을 할당하려고 하면 에러가 발생한다. 또한, 초기화할 때 값을 할당하지 않으면 에러가 발생한다. 따라서 const로 선언한 변수를 상수라고 부르기도 한다.

```js
const a = 0;
a = 1; // Uncaught TypeError: Assignment to constant variable.

let b = 0;
b = 1; // 1

const c; // Uncaught SyntaxError: Missing initializer in const declaration
```

#### 2-1-3. 객체 리터럴

객체 리터럴에 편리한 기능이 추가되었다. 다음 코드는 `oldObject` 객체에 동적으로 속성을 추가하고 있다.

```js
var sayNode = function() {
  console.log('Node');
};
var es = 'ES';
var oldObject = {
  say JS: function() {
    console.log("JS");
  },
  sayNode: sayNode,
};

oldObject[es + 6] = 'Fantastic';
oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject.ES6); // Fantastic
```

위 코드는 아래와 같이 다시 쓸 수 있다.

```js
const newObject = {
  sayJS() {
    console.log("JS");
  },
  sayNode,
  [es + 6]: "Fantastic",
};

newObject.sayNode(); // Node
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic
```

`sayJS` 같은 객체의 메소드에 함수를 연결할 때 더는 콜론(:)과 function을 붙이지 않아도 된다.

`sayNode: sayNode` 처럼 속성명과 변수명이 동일한 경우에는 한 번만 써도 되게 바뀌었다. 자바스크립트에서 다음과 같은 경우가 많이 나오는데, 이때 코드의 중복을 피할 수 있어서 편리하다.

```js
{ name: name, age: age } // ES5
{ name, age } // ES6
```

객체의 속성명은 동적으로 생성할 수 있다. 예전 문법에서는 ES6라는 속성명을 만들려면 객체 리터럴(`oldObject`) 바깥에서 [es + 6]를 해야 했다. 하지만 ES2015 문법에서는 객체 리터럴 안에 동적 속성을 선언해도 된다. `newObject` 안에서 [es + 6]가 속성명으로 바로 사용되고 있다.

객체 리터럴에 추가된 문법은 코딩할 때의 편의를 위해 만들어진 것이라는 느낌이 강하다. 익숙해지면 코드의 양을 많이 줄일 수 있다.

### 2-1-5. 구조분해 할당

구조분해 할당을 사용하면 객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있다.

다음은 객체의 속성을 같은 이름의 변수에 대입하는 코드이다.

```js
var candyMachine = {
  status: {
    name: "node",
    count: 5,
  },
  getCandy: function () {
    this.status.count--;
    return this.status.count;
  },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
```

이 코드를 아래와 같이 바꿀 수 있다.

```js
const candyMachine = {
  status: {
    name: "node",
    count: 5,
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  },
};

const {
  getCandy,
  status: { count },
} = candyMachine;
```

이 코드의 문법 또한 유효한 문법이다. `candyMachine` 객체 안의 속성을 찾아서 변수와 매칭한다. count처럼 여러 단계 안의 속성도 찾을 수 있다. `getCandy`와 count`변수가 초기화된 것이다. 다만, 구조분해 할당을 사용하면 함수의 this가 달라질 수 있다.`getCandy` 함수를 사용해 보자. 달라진 this를 원래대로 바꿔주려면 bind함수를 따로 사용해야 한다.

배열에 대한 구조분해 할당 문법도 존재한다.

```js
var array = ["nodejs", {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];
```

array란 배열의 첫 번째, 두 번째 요소와 네 번째 요소를 변수에 대입하는 코드이다.

다음과 같이 바꿀 수 있다.

```js
const array = ["nodejs", {}, 10, true];
const [node, obj, bool] = array;
```

어색해 보이지만, 나름대로의 규칙이 있다. node, obj, bool의 위치를 보면 node는 배열의 첫 번째 요소, obj는 두 번째 요소, bool은 네 번째 요소라는 것을 알 수 있다. obj와 bool 사이의 요소인 10에는 변수명을 지어주지 않았으므로 10은 무시한다.

구조분해 할당 문법도 코드 줄 수를 상당히 줄여주므로 유용하다. 특히 노드는 모듈 시스템을 사용하므로 이러한 방식을 자주 쓴다. 모듈 시스템은 3.3에서 알아본다.

#### 2-1-6. 클래스

클래스 문법도 추가되었다. 하지만 다른 언어처럼 클래스 기반으로 동작하는 것이 아니라 여전히 프로토타입 기반으로 동작한다. 프로토타입 기반 문법을 보기 좋게 클래스로 바꾼 것이라고 이해하면 된다.

다음은 프로토타입 상속 예제 코드이다.

```js
var Human = function (type) {
  this.type = type || "human";
};

Human.isHuman = function (human) {
  return human instanceof Human;
};

Human.prototype.breathe = function () {
  alert("h-a-a-a-m");
};

var Zero = function (type, firstName, lastName) {
  Human.apply(this, arguments);
  this.firstName = firstName;
  this.lastName = lastName;
};

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero; // 상속하는 부분
Zero.prototype.sayName = function () {
  alert(this.firstName + " " + this.lastName);
};

var oldZero = new Zero("human", "Zero", "Cho");
Human.isHuman(oldZero); // true
```

Human 생성자 함수가 있고, 그 함수를 Zero 생성자 함수가 상속한다. Zero 생성자 함수를 보면 상속받기 위한 코드가 상당히 난해하다는 것을 알 수 있다. `Human.apply`와 `Object.create` 부분이 상속받는 부분이다.

위 코드를 클래스 기반으로 바꿔보자.

```js
class Human {
  constructor(type = "human") {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    alert("h-a-a-a-m");
  }
}
class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  sayName() {
    super.breathe();
    alert(`${this.firstName}${this.lastName}`);
  }
}

const newZero = new Zero("human", "Zero", "Cho");
Human.isHuman(newZero); // true
```

전반적으로 class 안으로 그룹화된 것을 볼 수 있다. 생성자 함수는 constructor 안으로 들어갔고, `Human.isHuman` 같은 클래스 함수는 static 키워드로 전환되었다. 프로토타입 함수들도 모두 class 블록 안에 포함되어 어떤 함수가 어떤 클래스 소속인지 보기 쉽다. 상속도 간단해져서 extends 키워드로 쉽게 상속 가능하다. 다만, 이렇게 클래스 문법으로 바뀌었더라도 자바스크립트는 프로토타입 기반으로 동작한다는 것을 명심해야 한다.

#### 2-1-7. 프로미스

자바스크립트와 노드에서는 주로 비동기를 접한다. 특히 이벤트 리스너를 사용할 때 콜백 함수를 자주 사용한다. ES2015부터는 자바스크립트와 노드의 API들이 콜백 대신 프로미스(Promise) 기반으로 재구성되며, 악명 높은 콜백 지옥 현상을 극복했다는 평가를 받고 있따. 프로미스는 반드시 알아둬야 하는 객체이므로 여기뿐만 아니라 다른 자료들을 참고해서라도 반드시 숙지해야 한다.

프로미스는 다음과 같은 규칙이 있다. 먼저 프로미스 객체를 생성해야 한다.

```js
const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    reject("실패");
  }
});
// 다른 코드가 들어갈 수 있음
promise
  .then((message) => {
    console.log(message); // 성공(resolve)한 경우 실행
  })
  .catch((error) => {
    console.error(error); // 실패(eject)한 경우 실행
  })
  .finally(() => {
    // 끝나고 무조건 실행
    console.log("무조건");
  });
```

`new Promise`로 프로미스를 생성할 수 있으며, 그 내부에 resolve와 reject를 매개변수로 갖는 콜백 함수를 넣는다. 이렇게 만든 promise 변수에 then과 catch 메소드를 붙일 수 있다. 프로미스 내부에서 resolve가 호출되면 then이 실행되고, reject가 호출되면 catch가 실행된다. finally 부분은 성공/실패 여부와 상관없이 실행된다.

resolve와 reject에 넣어준 인수는 각각 then과 catch의 매개변수에서 받을 수 있다. 즉 `resolve('성공')`이 호출되면 then의 message가 '성공'이 된다. 만약 `reject('실패')`가 호출되면 catch의 error가 '실패'가 되는 것이다. condition 변수를 false로 바꿔보면 catch에서 에러가 로깅된다.

프로미스를 쉽게 설명하자면, 실행은 바로 하되 결괏값은 나중에 받는 객체이다. 결괏값은 실행이 완료된 후 then이나 catch 메소드를 통해 받는다. 위 예제에서는 new Promise와 promise, then 사이에 다른 코드가 들어갈 수도 있다. new Promise는 바로 실행되지만, 결괏값은 then을 붙였을 때 받게 된다.

then이나 catch에서 다시 다른 then이나 catch를 붙일 수 있다. 이전 then의 return 값을 다음 then의 매개변수로 넘긴다. 프로미스를 return한 경우에는 프로미스가 수행된 후 다음 then이나 catch가 호출된다.

```js
promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(message3);
  });
  .catch((error) => {
    console.log(error);
  });
```

처음 then에서 message를 resolve하면 다음 then에서 message2로 받을 수 있다. 여기서 다시 message2를 resolve한 것을 다음 then에서 message3으로 받았다. 단 then에서 new Promise를 return해야 다음 then에서 받을 수 있다는 것을 기억해야 한다.

이것을 활용해서 콜백을 프로미스로 바꿀 수 있다. 다음은 콜백을 쓰는 패턴 중 하나이다. 이를 프로미스로 바꿔보자.

```js
function findAndSaveUser(Users) {
  Users.findOne({}, (err, user) => {
    // 첫번째 콜백
    if (err) {
      return console.error(err);
    }
    user.name = "zero";
    user.save((err) => {
      // 두번째 콜백
      if (err) {
        return console.error(err);
      }
      Users.findOne({ gender: "m" }, (err, user) => {
        // 생략
      });
    });
  });
}
```

콜백 함수가 세 번 중첩되어 있다. 콜백 함수가 나올 때마다 코드의 깊이가 깊어진다. 각 콜백 함수마다 에러도 따로 처리해줘야 한다. 이 코드를 다음과 같이 바꿀 수 있다.

```js
function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = "zero";
      return user.save();
    })
    .then((user) => {
      return Users.findOne({ gender: "m" });
    })
    .then((user) => {
      // 생략
    })
    .catch((err) => {
      console.error(err);
    });
}
```

코드의 깊이가 세 단계 이상 깊어지지 않는다. 위 코드에서 `then` 메소드들은 순차적으로 실행된다. 콜백에서 매번 따로 처리해야 했던 에러도 마지막 catch에서 한 번에 처리할 수 있다. 하지만 모든 콜백 함수를 위와 같이 바꿀 수 있는 것은 아니다. 메소드가 프로미스 방식을 지원해야 한다.

예제의 코드는 findOne과 save 메소드가 내부적으로 프로미스 객체를 갖고 있다고 가정했기에 가능하다. (`new Promise`가 함수 내부에 구현되어 있어야 한다). 지원하지 않는 경우 콜백 함수를 프로미스로 바꿀 수 있는 방법은 3.5.6에 나와 있다.

프로미스 여러 개를 한 번에 실행할 수 있는 방법이 있다. 기존의 콜백 패턴이었다면 콜백을 여러 번 중첩해서 사용해야 했을 것이다. 하지만 `Promise.all`을 활용하면 간단히 할 수 있다.

```js
const promise1 = Promise.resolve("성공1");
const promise2 = Promise.resolve("성공2");
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result); // ['성공1', '성공2'];
  })
  .catch((error) => {
    console.error(error);
  });
```

`Promise.resolve`는 즉시 resolve하는 프로미스를 만드는 방법이다. 비슷한 것으로 즉시 reject하는 Promise.reject도 있다. 프로미스가 여러 개 있을 때 `Promise.all`에 넣으면 모두 resolve될 때까지 기다렸다가 then으로 넘어간다. result 매개변수에 각각의 프로미스 결괏값이 배열로 들어 있다. Promise 중 하나라도 reject가 되면 catch로 넘어간다.

#### 2-1-8. async/await

노드 7.6 버전부터 지원되는 기능이다. ES2017에서 추가되었으며, 알아두면 정말 편리한 기능이다. 특히 노드처럼 비동기 위주로 프로그래밍을 해야 할 때 도움이 많이 된다.

프로미스가 콜백 지옥을 해결했다지만, 여전히 코드가 장황하다. then과 catch가 계속 반복되기 때문이다. async/await 문법은 프로미스를 사용한 코드를 한 번 더 깔끔하게 줄인다.

2-1-7의 프로미스 코드를 다시 보자.

```js
function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = "zero";
      return user.save();
    })
    .then((user) => {
      return Users.findOne({ gender: "m" });
    })
    .then((user) => {
      // 생략
    })
    .catch((err) => {
      console.error(err);
    });
}
```

콜백과 다르게 코드의 깊이가 깊어지지는 않지만, 코드는 여전히 길다. async/await 문법을 사용하면 다음과 같이 바꿀 수 있다. async function이라는 것이 추가되었다.

```js
async fucntion findAndSaveUser(Users) {
  let user = await.Users.findOne({});
  user.name = 'zero';
  user = await user.save();
  user = await Users.findOne({gender: 'm'});
  // 생략
}
```

놀라울 정도로 코드가 짧아졌다. 함수 선언부를 일반 함수 대신 `async function`으로 교체한 후, 프로미스 앞에 await을 붙였다. 이제 함수는 해당 프로미스가 resolve될 때까지 기다린 뒤 다음 로직으로 넘어간다. 예를 들면 `await Users.findOne({})`이 resolve될 때까지 기다린 다음에 user 변수를 초기화하는 것이다.

위 코드는 에러를 처리하는 부분(프로미스가 reject된 경우)이 없으므로 다음과 같은 추가 작업이 필요하다.

```js
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({});
    user.name = "zero";
    user = await user.save();
    user = await Users.findOne({ gender: "m" });
    // 생략
  } catch (error) {
    console.log(error);
  }
}
```

## 2-2. 프론트엔드 자바스크립트

이 절에서는 여기에 나오는 예제들의 프론트엔드에 사용되는 기능들을 설명한다. HTML에서 script 태그 안에 작성하는 부분이다. 여기에선 프론트엔드를 깊게 다루지 않지만, 예제 코드의 이해를 돕기 위해 몇 가지를 소개한다.

### 2-2-1. Ajax

AJAX(Asnychronous Javascript And XML)는 비동기적 웹서비스를 개발할 때 사용하는 기법이다. 이름에 XML이 들어 있지만 꼭 XML을 사용해야 하는 것은 아니며, 요즘에는 JSON을 많이 사용한다. 쉽게 말해 페이지 이동 없이 서버에 요청을 보내고 응답을 받는 기술이다. 요청과 응답은 4.1에 설명되어 있다. 웹 사이트 중에서 페이지 전환 없이 새로운 데이터를 불러오는 사이트는 대부분 Ajax 기술을 사용하고 있다고 보면 된다.

보통 Ajax 요청은 jQuery나 axios 같은 라이브러리를 이용해서 보낸다. 브라우저에서 기본적으로 XMLHttpRequest 객체를 제공하긴 하지만, 사용 방법이 복잡하고 서버에서는 사용할 수 없으므로 여기서는 전반적으로 axios를 사용할 것이다.

프론트엔드에서 사용하려면 HTML 파일을 하나 만들고 그 안에 script 태그를 추가해야 한다. 두 번째 script 태그 안에 앞으로 나오는 프론엔드 예제 코드를 넣으면 된다.

> front.html

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  // 여기에 예제 코드 넣기
</script>
```

먼저 요청의 한 종류인 GET 요청을 보내보겠다. 요청의 종류는 4.2에서 REST API를 다루며 살펴본다.

`axios.get` 함수의 인수로 요청을 보낼 주소를 넣으면 된다.

```js
axios
  .get("https://www.naer.com")
  .then((result) => {
    console.log(result);
    console.log(result.data); // {}
  })
  .catch((error) => {
    console.error(error);
  });
```

`axios.get`도 내부에 new Promise가 들어 있으므로 then과 catch를 사용할 수 있다. `result.data`에는 서버로부터 보낸 데이터가 들어있다. 이는 개발자 도구 Console에서 확인할 수 있다.

프로미스이므로 `async/await` 방식으로 변경할 수 있다. 익명 함수라서 즉시 실행을 위해 코드를 소괄호로 감싸서 호출했다.

```js
(async () => {
  try {
    const result = await axios.get("https://naver.com");
    console.log(result);
    console.log(result.data); // {}
  } catch (error) {
    console.error(error);
  }
})();
```

이번에는 POST 방식의 요청을 보내볼 것이다. POST 요청에서는 데이터를 서버로 보낼 수 있다.

```js
(async () => {
  try {
    const result = await axios.post("https://sangminpark.me", {
      name: "steadily-worked",
      birth: 1996,
    });
    console.log(result);
    console.log(result.data); // {}
  } catch (error) {
    console.error(error);
  }
})();
```

전체적인 구조는 비슷한데 두 번째 인수로 데이터를 넣어 보내는 것이 다르다. GET 요청이면 `axios.get`을, POST 요청이면 `axios.post`를 사용한다.

다음으로 서버에 폼 데이터를 보내는 경우를 알아볼 것이다.

### 2-2-2. FormData

HTML form 태그의 데이터를 동적으로 제어할 수 있는 기능이다. 주로 Ajax와 함께 사용된다.

먼저 FormData 생성자로 formData 객체를 만든다. 다음 코드를 한 줄씩 Console 탭에 입력해보자.

```js
const formData = new FormData();
formData.append("name", "steadily-worked");
formData.append("item", "orange");
formData.append("item", "melon");
formData.has("item"); // true
formData.has("money"); // false;
formData.get("item"); // orange
formData.getAll("item"); // ['orange', 'melon'];
formData.append("test", ["hi", "zero"]);
formData.get("test"); // hi, zero
formData.delete("test");
formData.get("test"); // null
formData.set("item", "apple");
formData.getAll("item"); // ['apple'];
```

생성된 객체의 append 메소드로 키-값 형식의 데이터를 저장할 수 있다. append 메소드를 여러 번 사용해서 키 하나에 여러 개의 값을 추가해도 된다. has 메소드는 주어진 키에 해당하는 값이 있는지 여부를 알린다. get 메소드는 주어진 키에 해당하는 값 하나를 가져오고, getAll 메소드는 해당하는 모든 값을 가져온다. delete 메소드는 현재 키를 제거하는 메소드고, set은 현재 키를 수정하는 메소드이다.

이제 axios로 폼 데이터를 서버에 보내면 된다.

```js
(async () => {
  try {
    const formData = new FormData();
    formData.append("name", "steadily-worked");
    formData.append("birth", 1996);
    const result = await axios.post(
      "https://www.zerocho.com/api/post/formdata",
      formData
    );
    console.log(result);
    console.log(result.data);
  } catch (error) {
    console.error(error);
  }
})();
```

두 번째 인수에 데이터를 넣어 보낸다. 현재 설정된 주소는 실제로 동작하는 주소라서 결괏값을 받을 수 있다.

### 2-2-3. encodeURIComponent, decodeURIComponent

Ajax 요청을 보낼 때, `http://localhost:4000/search/노드`처럼 주소에 한글에 들어있는 경우가 있다. 서버 종류에 따라 다르지만 서버가 한글 주소를 이해하지 못하는 경우가 있는데, 이럴 때는 window 객체의 메소드인 `encodeURIComponent` 메소드를 사용한다. 노드에서도 사용할 수 있다.

한글 주소 부분만 `encodeURIComponent` 메소드로 감싼다.

```js
(async () => {
  try {
    const result = await axios.get(
      `https://www.zerocho.com/api/search/${encodeURIComponent("노드")}`
    );
    console.log(result);
    console.log(result.data); // {}
  } catch (error) {
    console.error(error);
  }
})();
```

노드라는 한글 주소가 %EB%85%B8%EB%93%9C라는 문자열로 변환되었다.

받는 쪽에서는 `decodeURIComponent`를 사용하면 된다. 역시 브라우저뿐만 아니라 노드에서도 사용할 수 있다.

```js
decodeURIComponent("%EB%85%B8%EB%93%9C"); // 노드
```

한글이 다시 원래 상태로 복구되었다. 이후에 나오는 예제에서 `encodeURIComponent`와 `decodeURIComponent`를 쓰는 경우를 보게 될텐데, 한글을 처리하기 위한 것이라고 생각하면 된다.

### 2-2-4. 데이터 속성과 dataset

노드를 웹 서버로 사용하는 경우, 클라이언트(프론트엔드)와 빈번하게 데이터를 주고받게 된다. 이때 서버에서 보내준 데이터를 프론트엔드 어디에 넣어야 할지 고민하게 된다.

프론트엔드에 데이터를 내려보낼 때 첫 번째로 고려해야 할 점은 보안이다. 클라이언트를 믿지 말라는 말이 있을 정도로 프론트엔드에 민감한 데이터를 내려보내는 것은 실수이다. 비밀번호 같은 건 특히 절대 내려보내면 안 된다.

보안과 무관한 데이터들은 자유롭게 프론트엔드로 보내도 된다. 자바스크립트 변수에 저장해도 되지만 HTML5에도 HTML에 관련된 데이터를 저장하는 공식적인 방법이 있다. 바로 데이터 속성(data attribute)이다.

```html
<ul>
  <li data-id="1" data-user-job="programmer">steadily</li>
  <li data-id="2" data-user-job="designer">steadily2</li>
  <li data-id="2" data-user-job="programmer">steadily3</li>
  <li data-id="2" data-user-job="ceo">steadily4</li>
</ul>
<script>
  console.log(document.querySelector("li").dataset);
  // {id: '1', userJob: 'programmer'}
</script>
```

위와 같이 HTML 태그의 속성으로 `data-`로 시작하는 것들을 넣는다. 이들이 데이터 속성이다. 여기서는 `data-id`와 `data-user-job`을 주었다. 화면에 나타나지는 않지만 웹 어플리케이션 구동에 필요한 데이터들이다. 나중에 이 데이터들을 사용해 서버에 요청을 보내게 된다.

데이터 속성의 장점은 자바스크립트로 쉽게 접근할 수 있다는 점이다. script 태그를 보면 dataset 속성을 통해 첫 번째 li 태그의 데이터 속성에 접근하고 있다. 단, 데이터 속성 이름이 조금씩 변형되었다. 앞의 `data-` 접두어는 사라지고 `-` 뒤에 위치한 글자는 대문자가 된다. `data-id`는 `id`, `data-user-job`은 `userJob`이 되는 것이다.

반대로 dataset에 데이터를 넣어도 HTML 태그에 반영된다. `dataset.monthSalary = 10000;`을 넣으면 `data-month-salary="10000"`이라는 속성이 생긴다.

나중에 실습 시 데이터 속성을 자주 쓰게 되므로 기억해두자.

## 2-3. 함께 보면 좋은 자료

- ES2015 설명: https://developer.mozilla.org/ko/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla

- ES 상세 후보군: https://github.com/tc39/proposals

- ES2015+ 브라우저/서버 호환 여부: http://kangax.github.io/compat-table/es6/

- 브라우저별 기능 지원 여부 확인: https://caniuse.com/

- 노드 버전별 ECMAScript 스펙: http://node.green

- AJAX 설명: https://developer.mozilla.org/ko/docs/Web/Guide/AJAX

- axios: https://github.com/axios/axios

- FormData 설명: https://developer.mozilla.org/ko/docs/Web/API/FormData

- ESLint 툴: https://eslint.org/

- 에어비앤비 코딩 스타일: https://github.com/airbnb/javascript

- 저자의 블로그 ES2015+: https://zerocho.com/category/EcmaScript

- 모던 자바스크립트 튜토리얼: https://ko.javascript.info/
