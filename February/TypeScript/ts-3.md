<h1>TypeScript</h1><a href='https://ahnheejong.gitbook.io/ts-for-jsdev'>출처</a>

<h2>3.0 타입스크립트 기초 문법</h2>

<h3>타입 표기 (Type Annotation)</h3>

타입스크립트 코드에서 어떤 변수 또는 값의 타입을 표시하기 위해 <b>타입 표기</b>를 사용한다. 타입 표기는 식별자 또는 값 뒤에 콜론(`:`)을 붙여 `value: type`의 형태로 표기한다.

```ts
const areYouCool: boolean = true;
const answer: number = 42;
const typescript: string = "great";
const greetings: string = `
Hello, Readers!
Welcome to TypeScript.
`;
const hasType: Object = {
  TypeScript: true,
  JavaScript: false,
};
```

<h3>예제 코드의 실행 환경</h3>

1장에서 언급했듯, 기본 코드 베이스 이식의 용이성은 타입스크립트의 언어 디자인의 큰 목표 중 하나다. 그 목표를 달성하기 위한 핵심 장치가 바로 <b>점진적 타이핑</b>이다.

점진적 타이핑이란 말 그대로 <b>점진적으로 타입 안정성을 키워가는 것을 허용하는 타입 시스템</b>이다. 즉 일단 프로그래밍 일부에만 정적 타입 검사를 시행하고 나머지 부분은 추후 타입 정보를 추가하는 식의 접근이 가능한 것이다. 이러한 점진적 타이핑의 일환으로, 타입스크립트 컴파일러는 타입 시스템의 엄격한 정도를 선택하기 위한 다양한 옵션을 제공한다.

특별히 따로 언급하지 않는 한, 이 책은 <b>모든 예제 코드에서 `--strict` 컴파일러 플래그가 켜진 환경을 가정한다.</b> 구체적으로 어떤 플래그들이 켜지며 그 외에도 어떤 옵션이 있는지는 8장에서 다룬다. 현재로서는 이 플래그가 켜진 환경에서 상대적으로 엄격한 타입 검사가 수행된다는 것을 인지하는 정도로 충분하다.

타입스크립트는 (이후 6장에서 다룰) 타입 추론을 지원한다. 즉, 프로그래머가 명시적으로 타입 정보를 적지 않아도 컴파일러가 이미 알고 있는 정보와 주변 맥락을 기반으로 타입을 추론할 수 있다. 하지만 본 책의 예제 코드는 <b>타입 추론에 최소한도로만 의존한다.</b> 즉 추론할 수 있는 타입 정보도 명시적으로 적어 주는 것을 선호한다.

이 두 가지 결정은 <b>더 명시적인 코드 작성을 강제</b>한다는 공통점을 갖고 있다. 점진적 타이핑과 타입 추론, 둘 모두 실사용시 큰 편리함을 주는 타입스크립트의 장점이다. 하지만 이 책은 입문서인만큼 간결함을 다소 희생하더라도 더 명시적인 쪽을 택하는 것이 독자의 혼란을 줄일 수 있으리라 판단해 그런 결정을 내렸다.

<h2>3.1 기본 타입</h2>

> 타입스크립트가 제공하는 기본 타입을 살펴본다. 이후 다룰 모든 타입은 이 기본 타입들로부터 파생된다.

<h3>불리언</h3>

자바스크립트의 `boolean`에 대응하는, 참 또는 거짓을 나타내는 타입이다.

```ts
const isTypeScriptAwesome: boolean = true;
const doesJavaScriptHasTypes: boolean = false;
```

<h3>숫자</h3>

숫자를 나타내는 타입이다. 자바스크립트에서는 정수, 부동 소수점 등의 구분이 따로 없고 모든 수가 <a href="https://ko.wikipedia.org/wiki/IEEE_754" target="_blank">IEEE754</a> 표준을 따르는 부동소수점이고, 타입스크립트의 `number` 타입도 마찬가지다.

```ts
const yourScore: number = 100;
const ieee754IsAwesome: number = 0.1 + 0.2; // 0.30000000000000004
```

<h3>문자열</h3>

문자열을 나타내는 타입이다. ES6 템플릿 리터럴 역시 `string` 타입의 값이다.

```ts
const authorName: string = "안희종";
const toReaders: string = `
책을 읽어주셔서 감사합니다.
도움이 되었으면 좋겠습니다.
`;
```

<h3>null / undefined</h3>

`null` 타입과 `undefined` 타입은 각각 `null`과 `undefined`라는 하나의 값만을 갖는다. 이 두 값을 자기 자신의 타입, 그리고 아래에서 언급될 `void` 타입 이외의 타입에 할당하려 하면 타입 에러(`TS2322: Type 'null' is not assignable to type 'number'` 등)가 발생한다.

```ts
const nullValue: null = null;
const undefinedValue: undefined = undefined;
const numberValue: number = null; // TS2322: Type 'null' is not assignable to type 'number'
```

> 타입스크립트에서, 원래 `null`과 `undefined`는 기본적으로 모든 타입의 서브타입이다. 즉 아무런 설정이 없다면 아래와 같은 식의 할당이 허용된다.

> ```ts
> const a: number = null; // okay
> ```

> 하지만 이런 동작은 버그를 양산하기 쉽다. 때문에 타입스크립트 2.0에 `null`과 `undefined` 값을 다른 타입에 할당하는 것을 막는 `--strictNullChecks` 플래그가 추가되었다.
>
> 앞서 언급했듯 이 책의 모든 코드 예제는 `--strict` 플래그가 켜진 환경을 가정하고 있으며, `--strictNullChecks` 플래그는 `--strict` 플래그에 포함된다. 실 프로젝트에서도 해당 플래그를 켜는 것을 추천한다.

<h3>특별한 타입</h3>

자바스크립트에서 직접적으로 대응되는 값은 없지만 타입스크립트가 제공하는 특수한 타입이 몇 가지 있다.

<h4>any</h4>

`any` 타입은 모든 타입과 호환 가능하다. 즉, 모든 값의 타입을 `any`로 지정할 수 있고, `any` 타입의 변수에는 모든 값을 할당할 수 있다.

```ts
let bool: any = true;
bool = 3;
bool = "whatever";
bool = {};
```

또한 `any` 타입 값의 메소드를 호출할 시에도 타입 검사가 아예 수행되지 않는다. 이 때 해당하는 값이 실제로 존재하지 않는다면 타입 검사는 통과하되 런타임 에러가 발생할 것이다.

```ts
bool.nonExistingMethod();
bool.whatever(false);
```

`any` 타입은 타입스크립트 타입 시스템의 비상 탈출구(escape hatch)이다. `any`는 타입 정의를 제공하지 않는 라이브러리, 일단 무시하고 넘어가고 이후에 정확히 적고 싶은 부분 또는 코드 작성 시점에 형태를 알 수 없는 값 등의 타입 표기에 유용하다. 하지만 `any`를 남용하면 타입 안정성에 구멍이 뚫린 코드가 되어 타입스크립트를 사용하는 의의가 사라지므로 꼭 필요한 경우에만 사용해야 한다.

<h4>void</h4>

`void`는 `null`과 `undefined` 만을 값으로 가질 수 있는 타입이다. 아무런 값도 반환하지 않는 함수의 반환 타입을 표시할 때 사용한다.

```ts
function nothing(): void {}
```

<h4>never</h4>

`never`는 아무런 값도 가질 수 없는 타입이다. 아무런 값도 가질 수 없는 타입은 과연 어떤 쓸모가 있을까? 아래 함수를 보자.

```ts
function alwaysThrow(): ??? {
    throw new Error(`I'm a wicked function!`);
}
```

의미상으로 `never` 타입은 - 그 이름이 암시하듯 - 절대 존재할 수 없는 값을 암시한다. 따라서 `never` 타입의 변수에는 `null`, `undefined`를 포함해 어떤 값도 할당할 수 없다. 위의 `alwaysThrow` 함수는 항상 에러를 `throw` 하므로 어떤 값도 반환하지 않는다. 이 때, 이런 함수의 반환 타입을 `never` 타입을 사용해 나타낼 수 있다.

```ts
function alwaysThrow(): never {
  throw new Error(`I'm a wicked function!`);
}
```

<h2>3.2 배열과 튜플</h2>

> 순서가 있는 원소의 모음(collection)을 나타내는 가장 간단하면서도 유용한 자료구조인 배열, 그리고 그 사촌 튜플을 나타내는 타입에 대해 다룬다.

<h3>배열</h3>

배열 타입은 자바스크립트 `Array` 값의 타입을 나타내는데 쓰인다. 원소 타입 뒤에 대괄호(`[]`)를 붙여 표현한다.

```ts
const pibonacci: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const myFavoriteBeers: String[] = [
  "Imperial Stout",
  "India Pale Ale",
  "Weizenbock",
];
```

배열 타입을 표현하는 또다른 방식이 있다.

```ts
const pibonacci: Array<number> = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const myFavoriteBeers: Array<string> = [
  "Imperial Stout",
  "India Pale Ale",
  "Weizenbock",
];
```

이 문법의 의미는 3.6절에서 <b>제너릭</b>을 소개하며 좀 더 자세히 알아본다.

<h3>튜플</h3>

튜플 타입을 이용해 원소의 수와 각 원소의 타입이 정확히 지정된 배열의 타입을 정의할 수 있다.

```ts
const nameAndHeight: [string, number] = ["박상민", 177];
```

<b>튜플 타입 변수는 정확히 명시된 개수 만큼의 원소만을 가질 수 있다.</b> 만약 타입 정의보다 더 많은, 혹은 더 적은 원소를 갖는 배열을 할당한다면 에러를 낸다.

```ts
const invalidNameAndHeight: [string, number] = ["박상민", 177, 42];
// error TS2322: Type '[string, number, boolean]' is not assignable to type '[string, number]'.
// Types of property 'length' are incompatible.
// Type '3' is not assignable to type '2'.
```

다만 튜플 타입의 값을 `Array` 프로토타입의 메소드를 통해 조작하는 것은 금지되지 않는다는 점에 유의해야 한다. 예를 들어 아래와 같은 코드는 에러를 내지 않는다.

```ts
const validNameAndHeight: [string, number] = ["박상민", 177];
validNameAndHeight.push(42); // no error
```

> 타입스크립트 2.6 이하 버전에서는 튜플 타입은 정확한 원소 개수를 보장하지 않는다. 예를 들어 다음과 같은 코드가 허용되었다.
>
> ```ts
> const nameAndHeight: [string, number] = ["박상민", 177, true];
> ```
>
> 이러한 동작 방식은 대부분의 실사용례에서 도움이 되지 않는다고 판단되어 2.7 버전부터는 현재와 같이 동작하도록 바뀌었다.

<h2>3.3 객체</h2>

> 자바스크립트에서 가장 일반적이고 널리 사용되는 자료 구조인 객체의 타입에 대해 다룬다.

<h3>객체 타입</h3>

자바스크립트의 오브젝트 리터럴을 정의하듯 중괄호(`{}`)를 이용해 객체 타입(object type)을 표현할 수 있다.

```ts
const user: { name: string; height: number } = { name: "박상민", height: 177 };
```

이 때 객체 타입 정의는 오브젝트 리터럴과 다음과 같은 차이점을 갖는다.

- 콜론(`:`)의 우변에는 값 대신 해당 속성의 타입이 들어간다.
- 구분자로 콤마(`,`)뿐만 아니라 세미콜론(`;`)을 사용할 수 있다.

<h3>선택 속성</h3>

함수의 선택 매개변수와 비슷하게 속성명 뒤에 물음표(`?`)를 붙여 해당 속성이 존재하지 않을 수도 있음을 표현할 수 있다.

```ts
const userWithUnknownHeight: { name: string; height?: number } = {
  name: "박상민",
};
```

<h3>읽기 전용 속성</h3>

속성명 앞에 `readonly` 키워드를 붙여 해당 속성의 재할당을 막을 수 있다. `readonly` 키워드가 붙은 속성은 `const` 키워드를 이용한 변수의 정의와 비슷하게 동작한다.

```ts
const user: {
  readonly name: string;
  height: number;
} = { name: "박상민", height: 177 };
user.name = "상민박"; // error TS2540: Cannot assign to 'name' because it is a constant or a read-only property.
```

<h2>3.4 타입 별칭</h2>

> 타입 별칭(type alias)을 이용해 이미 존재하는 타입에 다른 이름을 붙여 복잡한 타입을 간단하게 쓸 수 있다. 또한, 프로그래머의 의도를 보다 명확하게 나타낼 수 있다.

<h3>타입 별칭 정의</h3>

타입 별칭은 다음과 같이 정의한다.

```ts
type newType = Type;
```

별칭을 갖게 될 타입(위에서는 `Type`)의 자리엔 기본 타입을 포함한 모든 타입이 올 수 있다.

```ts
type UUID = string;
type Height = number;
type AnotherUUID = UUID;
type Animals = Animal[];
type User = {
  name: string;
  height: number;
};
```

이 때 별칭은 단순히 새로운 이름을 붙일 뿐이고, 실제로 새로운 타입이 생성되는 것은 아니라는 점에 유의하라. 예를 들어, 아래와 같은 코드의 에러 메시지에는 `UUID` 대신 `string`이 사용된다.

```ts
type UUID = string;
function getUser(uuid: UUID) {
  // uuid: string;이 되어야 함.
  /* 함수 본문 */
}
getUser(7); // error TS2345: Argument of type '7' is not assignable to parameter of type 'string'.
```

<h2>3.5 함수</h2>

> 자바스크립트 프로그램에서 가장 핵심적인 역할을 차지하는 함수 타입이 타입스크립트에서는 어떻게 표현되는지 다룬다.

<h3>함수의 타입</h3>

함수의 타입을 결정하기 위해서는 다음 두 가지 정보가 필요하다.

- 매개변수(parameter)의 타입
- 반환값(return value)의 타입 (반환 타입)

매개변수의 경우, 변수의 타입을 표기할 때와 마찬가지로 매개변수 뒤에 콜론(`:`)을 붙이고 타입을 적는다. (`param1: number`)

반환 타입은 매개변수 목록을 닫는 괄호(`)`)와 함수 본문을 여는 대괄호(`{`) 사이에 콜론을 붙이고 표기한다.(`function (): number { ... }`)

예를 들어 <b>두 숫자를 받아 그 합을 반환</b>하는 함수는 다음과 같이 타입 표기한다.

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

만약 함수가 아무런 값도 반환하지 않고 종료된다면 반환 타입으로 `void`를 사용한다.

```ts
function logGreetings(name: string): void {
  console.log(`Hello, ${name}!`);
}
```

`void` 반환 타입을 갖는 함수가 `undefined`나 `null` 이외의 값을 반환하면 타입 에러가 발생한다. `void`가 아닌 반환 타입을 갖는 함수가 아무 값도 반환하지 않는 경우도 마찬가지다.

```ts
function notReallyVoid(): void {
  return 1;
}
// error TS2322: Type '1' is not assignable to type 'void'.

function actuallyVoid(): number {}
// error TS2355: A function whose declared type is neither 'void' nor 'any'  must return a value.
```

---

<h3>함수 값의 타입 표기</h3>

함수 타입의 값에 타입 표기를 붙이기 위해서는 화살표 함수 정의 문법과 비슷한 문법을 사용한다.

```ts
(...매개변수 나열) => 반환 타입
```

매개변수가 없는 함수의 경우 매개변수를 생략해 아래와 같이 적는다.

```ts
() => 반환 타입
```

예시를 들어보면 아래와 같다. 화살표 함수 문법을 사용한 함수 또한 비슷하게 정의 가능하다.

```ts
const yetAnotherSum: (a: number, b: number) => number = sum;
const onePlusOne: () => number = () => 2;
const arrowSum: (a: number, b: number) => number = (a, b) => a + b;
```

타입 별칭 또한 사용 가능하다.

```ts
type sumFunction = (a: number, b: number) => number;
const definitelySum: sumFunction = (a, b) => a + b;
```

---

<h3>기본 매개변수</h3>

ES6와 마찬가지로, 타입스크립트에서도 기본 매개변수 문법을 사용할 수 있다. 이 때 기본값은

```ts
매개변수명: 타입 = 기본값;
```

의 형태로 표기한다.

```ts
function greetings(name: string = "stranger"): void {
  console.log(`Hello, ${name}`);
}
greetings("Sangmin"); // Hello, Sangmin!
greetings(); // Hello, stranger!
```

---

<h3>선택 매개변수</h3>

많은 프로그래밍 언어는 함수 정의에 명시된 매개변수의 수보다 많거나 적은 수의 인자가 들어온 경우 에러를 뱉는다. 한편, 자바스크립트는 더 들어온 인자는 버리고, 덜 들어온 인자는 `undefined`가 들어온 것과 동일하게 취급한 후 어떻게든 함수를 실행하려 시도한다.

이런 언어의 특성 및 기존 사용례를 포용하면서 타입 안정성을 확보하기 위해 타입스크립트는 <b>선택 매개변수</b>를 지원한다. 함수의 매개변수 이름 뒤에 물음표(`?`) 기호를 붙여 해당 매개변수가 생략될 수 있음을 명시할 수 있다.
예를 들어, `optional?`:`number`로 선언된 선택 매개변수 `optional`를 함수 본문에서 `number`타입 값으로 사용하려면 해당 값이 `undefined`가 아닌지를 먼저 검사해야 한다.

```ts
function fetchVideo(url: string, subtitleLanguage?: string) {
  const option = { url };
  if (subtitleLanguage) {
    option.subtitleLanguage = true;
  }
  /* ... */
}
fetchVideo("https://example.com", "ko"); // okay
fetchVideo("https://example.com"); // also okay
```

이 때 매개변수 정의 순서에서 선택 매개변수 이후에 필수 매개변수를 두는 것은 허용되지 않는다.

```ts
function invalidFetchVideo(subtitleUrl?: string, url: string) {
  /* ... */
}
// error TS1016: A required parameter cannot follow an optional parameter.
```

이러한 제약이 존재하는 이유는 만약 필수 매개변수가 선택 매개변수 뒤에 있을 시, 인자가 어떤 매개변수의 값인지 구분할 수 없기 때문이다. 예를 들어 위의 두 함수를 아래와 같이 호출하는 경우를 생각해보자.

```ts
fetchVideo("https://example.com");
invalidFetchVideo("https://example.com");
```

이 때 첫 번째 호출의 경우 인자가 `url` 매개변수의 값이라는 것이 명백하다. 한편 두 번째 호출에서는 `'https://example.com'`이라는 값이 선택매개변수인 `subtitleUrl`의 값으로 쓰인건지, 또는 `url`의 값으로 쓰인건지 모호하다. 따라서 타입스크립트는 이런 식의 함수 정의를 만나면 오류를 발생시킨다.

---

<h3>함수 오버로딩</h3>

자바스크립트에서는 한 함수가 여러 쌍의 매개변수-반환 타입 쌍을 갖는 경우가 매우 흔하다. 이런 함수의 타입을 정의할 수 있게 하고자 타입스크립트는 함수 오버로딩(function overloading)을 지원한다.

타입스크립트의 함수 오버로딩을 다음과 같은 특징을 갖는다.

- 함수는 <b>하나 이상의 타입 시그니처</b>를 가질 수 있다.
- 함수는 <b>단 하나의 구현</b>을 가질 수 있다.

즉, 오버로딩을 통해서 여러 형태의 함수 타입을 정의할 수 있지만, 실제 구현은 한 번만 가능하므로 여러 경우에 대한 분기는 함수 본문 내에서 이뤄져야 한다.

예를 들어 다음 함수들을 보자.

```ts
function doubleString(str: string): string {
  return `${str}${str}`;
}
function doubleNumber(num: number): number {
  return num * 2;
}
function doubleBooleanArray(arr: boolean[]): boolean[] {
  return arr.concat(arr);
}
```

이 함수들은 각각 문자열, 숫자, 그리고 불리언의 배열을 받아 두 배로 만드는 함수다. 이 때 '두 배'가 의미하는 건 타입에 따라 다르고, 세 함수는 인풋 타입에 따라 다른 타입의 값을 반환한다. 이 세 함수를 함수 오버로딩을 사용해서 하나의 `double`이라는 함수로 합쳐보자.

먼저 각 경우의 타입 시그니처를 정의한다. 타입 시그니처는 함수 정의와 동일하되, 본문이 생략된 형태다.

```ts
function double(str: string): string;
function double(num: number): number;
function double(arr: boolean[]): boolean[];
```

그 후엔 함수의 본문을 구현한다.

```ts
function double(arg) {
  if (typeof arg === "string") {
    return `${arg}${arg}`;
  } else if (typeof arg === "number") {
    return arg * 2;
  } else if (Array.isArray(arg)) {
    return arg.concat(arg);
  }
}
```

이렇게 오버로딩을 통해 정의된 `double` 함수는 호출하는 인자의 타입에 따라 반환 타입이 달라진다.

```ts
const num = double(3); // number
const str = doouble("ab"); // string
const arr = double([true, false]); // boolean[]
```

---

<h3>This 타입</h3>

앞서 2장에서 언급했지만, 자바스크립트 함수 내부에서의 `this` 값은 함수가 정의되는 시점이 아닌 <b>실행되는 시점</b>에 결정된다. 이런 특성은 함수 내부에서 `this`의 타입을 추론하는 일을 매우 어렵게 만든다. 타입스크립트는 이런 어려움을 해결하기 위해 함수 내에서의 `this` 타입을 명시할 수 있는 수단을 제공한다.

함수의 `this` 타입을 명시하기 위해선 함수의 타입 시그니처에서 매개변수 가장 앞에 `this`를 추가해야 한다. 이 때 `this` 타입은 타입 시스템을 위해서만 존재하는 일종의 가짜 타입이다. 즉, `this` 매개변수를 추가한다고 해도 함수가 받는 인자 수와 같은 실제 동작은 변하지 않는다.

```ts
interface HTMLElement {
  tagName: string;
  /* ... */
}
interface Handler {
  (this: HTMLElement, event: Event, callback: () => void): void;
}
let cb = any;
// 실제 함수 매개변수에는 this가 나타나지 않음
const onClick: Handler = function (event, cb) {
  // this는 HTMLElement 타입
  console.log(this.tagName);
  cb();
};
```

만약 `this`의 타입을 `void`로 명시한다면 함수 내부에서 `this`에 접근하는 일 자체를 막을 수 있다.

```ts
interface NoThis {
  (this: void): void;
}
const noThis: NoThis = function () {
  console.log(this.a); // Property 'a' does not exist on type 'void'.
};
```

<h2>3.6 제너릭</h2>

> 제너릭을 이용해 여러 타입에 대해 동일한 규칙을 갖고 동작하는 타입을 손쉽고 우아하게 정의할 수 있다.

<h3>동기부여</h3>

다음의 자바스크립트 함수를 생각해보자. 인자로 넘겨지는 배열은 항상 같은 타입의 값으로 이루어져 있다고 가정한다.

```ts
function getFirstElem(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("getFirstElemOrNull: Argument is not array!");
  }
  if (arr.length === 0) {
    throw new Error("getFirstElemOrNull: Argument is an empty array!");
  }
  return arr[0] ? arr[0] : null;
}
```

배열을 받아 첫 번째 원소가 있을 시 그 원소를 리턴하는 매우 간단한 함수다. 문자열의 배열을 인자로 호출하면 문자열 타입의 값을, 숫자의 배열을 인자로 호출하면 숫자 타입의 값을 반환할 것이다. 이 함수의 타입을 어떻게 정의할 수 있을까?

만약 `getFirstElem` 이 문자열과 숫자 두 타입만을 지원한다면 함수 오버로딩을 이용해 다음과 같이 쓸 수 있다.

```ts
function getFirstElem(arr: string[]): string;
function getFirstElem(arr: number[]): number;
function getFirstElem(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("getFirstElemOrNull: Argument is not array!");
  }
  if (arr.length === 0) {
    throw new Error("getFirstElemOrNull: Argument is an empty array!");
  }
  return arr[0] ? arr[0] : null;
}
```

하지만 이 함수가 <b>임의의 타입 값을 원소로 갖는 배열</b>에 대해 동작하도록 만들려면 어떻게 해야 할까? 존재할 수 있는 모든 타입에 대해 오버로딩을 적는 건 (가능한 타입의 수가 무한하므로) 불가능하다. 인자와 반환 타입을 any로 정의한다면 동작은 가능하겠지만, 타입 정보를 모두 잃게 되므로 좋은 방법이 아니다.

우리가 원하는 기능은 다음과 같다. <b>여러 타입에 대해 동작하는 함수를 정의하되, 해당 함수를 정의할 때는 알 수 없고 사용할 때에만 알 수 있는 타입 정보를 사용하고 싶다.</b> 제너릭은 바로 그러한 기능을 제공한다.

<h3>타입 변수</h3>

함수를 호출하는 시점이 돼야만 알 수 있는 값을 함수 내부에서 사용하기 위해서는 그 값을 담아둘 매개변수가 필요하다. 마찬가지로, <b>요소를 사용하는 시점에서만 알 수 있는 타입을 담아두기 위해서는 타입 변수(type variable)가 필요하다.</b> 타입 변수와 타입의 관계는 매개변수와 인자 값의 관계와 비슷하다.

|           | 함수                           | 제너릭                                 |
| --------- | ------------------------------ | -------------------------------------- |
| 정의 시점 | 매개변수 `a: number`           | 타입변수 `<T>`                         |
| 정의 예시 | `function (a: number) { ... }` | `type MyArray<T> = T[]`                |
| 사용 시   | 실제 값(`3`, `42` 등) 사용     | 실제 타입(`number`, `string` 등) 사용  |
| 사용 예시 | `a(3); a(42);`                 | `type MyNumberArray = MyArray<number>` |

타입 변수는 부등호(`<`,`>`)로 변수명을 감싸 정의한다. 이렇게 정의한 타입 변수를 요소의 타입 정의(예를 들어 함수의 인자 및 반환 타입)에 사용할 수 있다. 부등호 기호 안에 정의된 타입 변수의 실제 타입은 실제 값이 넘어오는 시점에 결정된다.

컨벤션 상 타입스크립트의 타입 변수는 대문자로 시작하며 PascalCase 명명법을 사용한다.

<h3>제너릭 함수</h3>

타입 변수를 이용해 위의 `getFirstElem` 함수를 다음과 같이 제너릭 함수로 정의할 수 있다.

```ts
function getFirstElem<T>(arr: T[]): T {
  /* ... */
}
```

위의 타입 정의는 다음과 같이 읽을 수 있다.

> <b>임의의 타입</b> `T`에 대해, `getFirstElem`은 `T` 타입 값의 배열 `arr`를 인자로 받아 `T` 타입 값을 반환하는 함수이다.

보다 일반적으로는 다음과 같은 꼴이 된다. 이 때 인자 타입과 반환 타입을 표현할 때 타입 변수를 사용할 수 있다.

```ts
function 함수명<타입 변수>(인자 타입): 반환 타입 {
  /* 함수 본문 */
}
```

함수를 호출할 때에는 정의에서 매개변수가 있던 자리에 인자를 넣어준다. 마찬가지로, 제너릭 함수를 호출할 때에는 정의에서 타입 변수가 있던 자리에 타입 인자를 넣어준다.

```ts
const languages: string[] = ["TypeScript", "JavaScript"];
const language = getFirstElem<string>(languages); // 이 때 language의 타입은 문자열임
```

<h3>제너릭 타입 별칭</h3>

타입 별칭 정의에도 제너릭을 사용할 수 있다. 이 때 타입 변수 정의는 별칭 이름 다음에 붙여 쓴다.

```ts
type MyArray<T> = T[];
const drinks: MyArray<string> = ["Coffee", "Milk", "Beer"];
```

<h3>제너릭의 사용처</h3>

타입 변수와 제너릭의 핵심은 <b>여러 타입에 대해 동작하는 요소를 정의하되, 해당 요소를 사용할 때가 되어야 알 수 있는 타입 정보를 정의에 사용하는 것</b>이다. 이러한 개념이 적용되는 범위는 함수와 타입 별칭에 국한되지 않는다. 제너릭을 이용해 추후 다룰 인터페이스, 클래스 등 다양한 타입의 표현력을 높일 수 있다. 4장에서 추후 해당 주제를 다룰 때에 좀 더 자세히 다룬다.

<h2>3.7 유니온 타입</h2>

> 유니온 타입을 이용해 "여러 경우 중 하나"인 타입을 표현할 수 있다.

<h3>동기부여</h3>

아래 함수를 한 번 살펴보자.

```ts
function square(value: number, returnString: boolean = false): ??? {
  const squared = value * value;
  if (returnString) {
    return squared.toString();
  }
  return squared;
}
```

함수 `square`는 숫자 타입 인자를 하나 받고, 불리언 타입 인자를 하나 더 받아 그 값에 따라 문자열 또는 숫자 타입의 값을 반환한다. 이 함수의 반환 타입은 어떻게 표현할 수 있을까? 일단 이 경우 반환 타입이 <b>인자의 타입이 아닌 값에 의존한다.</b> 따라서 제너릭으로는 표현하기 까다롭다 짐작할 수 있다.

오버로딩을 이용하면 아래와 같이 표현은 가능하다. 하지만 하나의 타입을 제외하고 모든 부분이 똑같은데도 여러 번 써야 해 비효율적이다. 게다가 오버로딩으로 함수를 정의한다 한들, 반환값을 할당하는 변수의 타입을 정의하기 어렵다는 문제가 남는다.

```ts
function square(value: number, returnString: boolean): number;
function square(value: number, returnString: boolean): string;
function square(value, returnString = false) {
  const squared = value * value;
  if (returnString) {
    return squared.toString();
  }
  return squared;
}
const mystery: ??? = square(randomNumbmer, randomBoolean);
```

<b>어떤 타입이 가질 수 있는 경우의 수를 나열</b>할 때 사용하는 <b>유니온 타입</b>으로 이 함수의 반환 타입을 표현할 수 있다.

<h3>문법</h3>

유니온 타입은 가능한 모든 타입을 파이프(`|`) 기호로 이어서 표현한다. "`A` 또는 `B` 타입일 수 있는 타입"을 `A | B`로 쓰는 식이다. `square` 함수의 타입은 아래와 같이 적을 수 있다.

```ts
function square(value: number, returnString: boolean = false): string | number {
  const squared = value * value;
  if (returnString) {
    return squared.toString();
  }
  return squared;
}
const stringOrNumber: string | number = square(randomNumber, randomBoolean);
```

타입 별칭 문법을 사용해 유니온 타입에 이름을 붙일 수 있다. 자주 사용되는 타입, 또는 인라인으로 작성하기에 너무 복잡한 타입의 경우 이 방식을 추천한다.

```ts
type SquaredType = string | number;
function square(value: number, returnOnString: boolean = false): SquaredType {
  const squared = value * value;
  if (returnString) {
    return squared.toString();
  }
  return squared;
}
```

유니온 타입이 가질 수 있는 타입의 수가 꼭 2개일 필요는 없다. 몇 개든 이어가며 정의할 수 있다.

```ts
type Whatever = number | string | boolean;
```

<h2>3.8 인터섹션 타입</h2>

> 인터섹션 타입을 이용해 "여러 경우에 모두 해당"하는 타입을 표현할 수 있다.

<h3>동기부여</h3>

예를 들어, 프로그래머를 나타내는 타입과 값을 다음과 같이 정의했다고 하자.

```ts
type Programmer = { favoriteLanguages: string };
const programmer: Programmer = { favoriteLanguages: "TypeScript" };
```

그리고 맥주를 좋아하는 사람의 타입과 값을 다음과 같이 정의했다.

```ts
type BeerLover = { favoriteBeer: String };
const beerLover: BeerLover = { favoriteBeer: "Imperial Stout" };
```

그렇다면, <b>맥주를 좋아하는 프로그래머의 타입</b>은 어떻게 나타낼 수 있을까? 물론 모든 필드를 다 적어 새로운 타입을 정의하는 식의 단순한 접근도 가능하다.

```ts
type BeerLovingProgrammer = { favoriteLanguages: string; favoriteBeer: string };
const ParkSnagmin = (BeerLovingProgrammer = {
  favoriteLanguages: "TypeScript",
  favoriteBeer: "Imperial Stout",
});
```

하지만 이런 접근 코드는 복사-붙여넣기와 동일하게 변화에 취약하다는 단점을 갖는다. 예를 들어 추후 `Programmer` 타입에 문자열 타입 `textEditor` 속성이 추가된다면, 프로그래머를 나타내는 모든 타입을 찾아 해당 속성을 추가해야 한다. 귀찮은 것은 차치하더라도, 이 과정에서 어딘가 빼먹을 가능성이 높다.

이런 비효율을 피하고 변화에 유연하게 대응하기 위해선 <b>이미 존재하는 여러 타입을 모두 만족하는 타입</b>을 표현하기 위한 수단이 필요하다. <b>인터넥션 타입</b>은 바로 그걸 가능케 한다.

<h3>문법</h3>

여러 타입을 앰퍼샌드(`&`) 기호로 이어서 인터섹션 타입을 나타낼 수 있다.

```ts
type BeerLovingProgrammer = Programmer & BeerLover;
```

`A & B` 타입의 값은 `A` 타입에도, `B` 타입에도 할당 가능해야 한다. 만약 `A`와 `B` 모두 객체 타입이라면 `A & B` 타입의 객체는 `A`와 `B` 타입 각각에 정의된 속성 모두를 가져야 한다.

이 때 어떤 값도 만족하지 않는 인터섹션 타입이 생길 수도 있다는 점에 유의하라.

```ts
type Infeasible = string & number;
```

문자열인 <b>동시에</b> 숫자인 값은 존재하지 않으므로, 위 `Infeasible` 타입은 실제로는 어떤 값도 가질 수 없다.

인터섹션 타입 역시 몇 개든 이어가며 정의할 수 있다.

```ts
type Awesome = Programmer & BeerLover & CatLover;
```

<h2>열거형</h2>

> 유한한 경우의 수를 갖는 값의 집합을 표현하기 위해 사용하는 열거형(enum) 타입에 대해 배운다.

<h3>숫자 열거형</h3>

숫자 열거형은 `number` 타 값에 기반한 열거형이다. 만약 열거형을 정의하며 멤버의 값을 초기화하지 않을 경우, 해당 멤버의 값은 `0`부터 순차적으로 증가하는 숫자 값을 갖는다. 예를 들어 아래 두 예제는 동일하게 동작한다.

```ts
enum Direction {
  East,
  West,
  South,
  North,
}
enum ExplicitDirection {
  East = 0,
  West = 1,
  South = 2,
  North = 3,
}
```

이렇게 정의한 열거형의 멤버에는 객체의 속성에 접근하는 것과 동일한 방식으로 접근할 수 있다. 어떤 열거형 `Enum`의 모든 멤버는 `Enum` 타입을 갖는다.

```ts
const south: Direction = Direction.south;
console.log(south); // 2
```

<h3>멤버 값 초기화</h3>

`0`부터 시작되는 자동 초기화에 의존하는 대신, 각 멤버의 값을 직접 초기화할 수 있다.

```ts
enum InitializedDirection {
  East = 2,
  West = 4,
  South = 8,
  North = 16,
}
```

만약 초기화되지 않은 멤버가 섞여있다면, 그 멤버의 값은 이전에 초기화된 멤버의 값으로부터 순차적으로 증가해서 결정된다.

```ts
enum InitializedDirection2 {
  East = 3,
  West /* 4 */,
  South = 7,
  North =  /* 8 */,
}
```

<h3>문자열 열거형(String Enum)</h3>

`number` 타입 값 대신 `string` 타입 값을 사용해서 멤버 값을 초기화하는 것도 가능하다.

```ts
enum Direction {
  East = "EAST",
  West = "WEST",
  South = "SOUTH",
  North = "NORTH",
}
```

문자열 열거형은 숫자 열거형과 다음 부분을 제외하고는 많은 부분이 동일하다.

- 문자열을 '자동 증가'시킨다는 개념은 성립하지 않는다. 따라서 문자열 멤버 이후로 정의된 모든 멤버는 명시적으로 초기화돼야 한다.
- 숫자 열거형과 달리, 문자열 열거형이 컴파일된 자바스크립트 코드에는 값 → 키의 역방향 매핑(reverse mapping)이 존재하지 않는다.

> 한 열거형에서 숫자 멤버와 문자열 멤버를 모두 사용하는 식의 이형 열거형(Heterogeneous Enum)도 문법 상 허용은 된다. 하지만 이형 열거형을 사용해 큰 이득을 얻을 수 있는 경우는 드물고, 대부분의 경우 혼란을 불러 올 수 있어 권장되지 않는다.

<h3>상수 멤버와 계산된 멤버</h3>

지금까지 다룬 열거형의 멤버는 모두 명시적이든, 암시적이든 컴파일 타입에 알 수 있는 상수값으로 초기화 되었다. 이런 열거형 멤버를 상수 멤버(constant member)라 부른다.

한편, 런타임에 결정되는 값을 열거형의 멤버값으로 사용할 수도 있다. 이런 멤버를 계산된 멤버(computed member)라고 부른다. 계산된 멤버의 값은 실제로 코드를 실행시켜봐야만 알 수 있으므로, 계산된 멤버 뒤에 오는 멤버는 반드시 초기화되어야 한다는 점에 유의하라.

```ts
function getAnswer() {
  return 42;
}
enum SpecialNumbers {
  Answer = getAnswer(),
  Mystery, // error TS1061: Enum member must have initializer.
}
```

<h3>런타임에서의 열거형</h3>

기본적으로 아래와 같은 타입스크립트 코드에서의 열거형 정의 및 접근은

```ts
enum Direction {
  East,
  West,
  South,
  North,
}
const east: Direction = Direction.East;
```

아래와 같은 자바스크립트 코드로 컴파일 된다.

```js
var Direction;
(function (Direction) {
  Direction[(Direction["East"] = 0)] = "East";
  Direction[(Direction["West"] = 1)] = "West";
  Direction[(Direction["South"] = 2)] = "South";
  Direction[(Direction["North"] = 3)] = "North";
})(Direction || (Direction = {}));
var east = Direction.East;
```

이 코드를 보면 두 가지 일이 일어나고 있음을 확인할 수 있다.

- 식별자에 키 → 값으로의 매핑이 정의된다. (`Direction['EAST'] = 0)
- 식별자에 값 → 키로의 역방향 매핑이 정의된다. (`Direction[Direction['East'] = 0] = 'East')

> 문자열 열거형의 경우 앞서 언급한대로 역방향 매핑이 존재하지 않는다. 아래의 문자열 열거형은
>
> ```ts
> enum Direction {
>   East = "EAST",
>   West = "WEST",
>   South = "SOUTH",
>   North = "NORTH",
> }
> ```
>
> 아래 자바스크립트 코드로 컴파일된다.
>
> ```js
> var Direction;
> (function (Direction) {
>   Direction["East"] = "EAST";
>   Direction["West"] = "WEST";
>   Direction["South"] = "SOUTH";
>   Direction["North"] = "NORTH";
> });
> ```

컴파일된 코드로부터 열거형 멤버에 접근할 때 실제로 코드가 실행될 때에도 객체 속성 접근이 발생함을 알 수 있다. 이 오버헤드는 대부분의 경우 무시 가능할 수준이다. 그럼에도 성능 향상을 꾀하고 싶다면 `const` 열거형을 사용할 수 있다.

모든 멤버가 컴파일 시간에 알려진 상수값인 열거형의 경우 `enum` 키워드 대신 `const enum` 키워드를 이용해 정의할 수 있다. 이렇게 정의한 열거형의 구조는 컴파일 과정에서 완전히 사라지고, 멤버의 값은 상수값으로 대체된다. 아래의 예제를 보자.

```ts
const enum ConstEnum {
  A,
  B = 2,
  C = B * 2,
  D = -C,
}
console.log(ConstEnum.A);
```

위 코드는 아래 자바스크립트 코드로 컴파일된다.

```js
console.log(0 /* A */);
```

주석을 제외하고는 열거형의 원래 구조에 대한 어떠한 정보도 남아있지 않고, 상수값으로 대체되어 있음을 확인할 수 있다.

<h3>유니온 열거형</h3>

열거형의 모든 멤버가 아래의 경우 중 하나에 해당하는 열거형을 유니온 열거형(union enum)이라 부른다.

- 암시적으로 초기화 된 값 (값이 표기되지 않음)
- 문자열 리터럴
- 숫자 리터럴

예를 들어 아래 `ShapeKind` 열거형은 유니온 열거형이다.

```ts
enum ShapeKind {
  Circle,
  Triangle = 3,
  Square,
}
```

유니온 열거형의 멤버는 값인 동시에 타입이 된다. 따라서 예를 들어 아래와 같은 코드를 작성할 수 있다.

```ts
type Circle = {
  kind: ShapeKind.Circle;
  radius: number;
};
type Triangle = {
  kind: ShapeKind.Triangle;
  maxAngle: number;
};
type Square = {
  kind: ShapeKind.square;
  maxLength: number;
};
type Shape = Circle | Triangle | Square;
```

또한 컴파일러는 유니온 열거형의 특징으로부터 컴파일 타임에 추가적인 검사를 시행할 수 있다. 이에 대해서는 추후 타입 좁히기(type narrowing)에 대해 다룰 때 함께 다룬다.

<h3>유니온 타입을 이용한 열거형 표현</h3>

타입스크립트는 숫자, 문자열 그리고 불리언 값을 타입으로 사용하는 리터럴 타입(literal type)을 지원한다. 리터럴 타입을 이용해 단 하나의 값만을 갖는 타입을 정의할 수 있다.

```ts
const answer: 42 = 42;
const wrognAnswer: 42 = 24; // error TS2322: Type '24' is not assignable to type '42'.
```

이 때 리터럴 타입과 유니온 타입을 조합해 열거형과 유사한 타입을 만들 수 있다.

```ts
type Direction = "EAST" | "WEST" | "SOUTH" | "NORTH";
const east: Direction = "EAST";
const center: Direction = "CENTER"; // error TS2322: Type '"CENTER"' is not assignable to type 'Direction'.
```
