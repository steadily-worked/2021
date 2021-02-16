```js
setTimeout(function() {
console.log('hello world');
}, 1000);

setTimeout(() => {
console.log('hello world')
}), 1000);
```

이 문법이 기존 function을 대체할 수 없는 것은 용도가 다르기 때문이다. 무엇보다 서로 가리키고 있는 this 값이 다르다.

다음 코드를 한번 확인해 보자.

```js
function BlackDog() {
  this.name = '흰둥이';
  return {
    name: '검둥이', // 객체
    bark: function () {
      console.log(this.name + ': 멍멍!');
    },
  };
}

const blackDog = new BlackDog();
blackDog.bark(); // 검둥이: 멍멍!

function WhiteDog() {
  this.name = '흰둥이'; // 인스턴스
  return {
    name: '검둥이',
    bark: () => {
      console.log(this.name + ': 멍멍!');
    },
  };
}

const whiteDog = new WhiteDog();
whiteDog.bark(); // 흰둥이: 멍멍!
```

function()을 사용했을 때는 검둥이가 나타나고, () =>를 사용했을 때는 흰둥이가 나타난다. 일반 함수는 자신이 종속된 객체를 this로 가리키며, 화살표 함수는 자신이 종속된 인스턴스를 가리킨다.

화살표 함수는 값을 연산하여 바로 반환해야 할 때 사용하면 가독성을 높일 수 있다.

```
function twice(value) {
return value \* 2;
}

const triple = (value) => value \* 3;
```

이렇게 따로 { }를 열어 주지 않으면 연산한 값을 그대로 반환한다는 의미이다.
