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

```ts
const a: number = null; // okay
```

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

```ts
const nameAndHeight: [string, number] = ["박상민", 177, true];
```

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
