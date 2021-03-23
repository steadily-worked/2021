이 글은 <리액트를 다루는 기술>을 요약함과 동시에 제 나름대로의 생각을 적은 글입니다.

# 컴포넌트 스타일링

리액트에서 컴포넌트를 스타일링할 때는 다양한 방식을 사용할 수 있다. 여러 방식 중에서 딱히 정해진 방식이란 없다. 회사마다 요구하는 스펙이 다르고, 개발자마다 각자 취향에 따라 선택하기 때문이다. 이번에는 어떤 방식이 있는지 알아보고, 자주 사용하는 방식을 하나하나 사용해 볼 것이다.

- 일반 CSS: 컴포넌트를 스타일링하는 가장 기본적인 방식이다.
- Sass: 자주 사용되는 CSS 전처리기(pre-processor)중 하나로, 확장된 CSS 문법을 사용하여 CSS 코드를 더욱 쉽게 작성할 수 있도록 해 준다.
- CSS Module: 스타일을 작성할 때 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해 주는 옵션이다.
- styled-components: 스타일을 자바스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들 수 있게 해 준다.

`styling-react` 프로젝트를 새로 생성한 뒤

`프로젝트 준비하기` ➡ `일반 CSS 사용하기` ➡ `Sass 사용하기` ➡ `CSS Module 사용하기` ➡ `styled-coomponents 사용하기`의 흐름으로 진행한다.

## 1. 가장 흔한 방식, 일반 CSS

프로젝트는 일반 CSS 방식으로 만들어져 있다. 기존의 CSS 스타일링이 딱히 불편하지 않고 새로운 기술을 배울 필요가 없다고 생각되면, 일반 CSS를 계속 사용해도 상관없다.

실제로도 소규모 프로젝트를 개발하고 있다면 새로운 스타일링 시스템을 적용하는 것이 불필요할 수도 있다. 그런 상황에는 프로젝트에 이미 적용되어 있는 기본 CSS 시스템을 사용하는 것 만으로도 충분하다.

CSS를 작성할 때 가장 중요한 점은 CSS 클래스를 중복되지 않게 만드는 것이다. CSS 클래스가 중복되는 것을 방지하는 여러 가지 방식이 있는데, 그중 하나는 이름을 지을 때 특별한 규칙을 사용하여 짓는 것이고, 또 다른 하나는 CSS Selector를 활용하는 것이다.

### 1-1. 이름 짓는 규칙

프로젝트에 자동 생성된 `App.css`를 읽어보자.

> App.css

```css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

클래스 이름이 **컴포넌트 이름-클래스** 형태로 지어져 있다. (예: `App-header`). 클래스 이름에 컴포넌트 이름을 포함시킴으로써 다른 컴포넌트에서 실수로 중복되는 클래스를 만들어 사용하는 것을 방지할 수 있다. 비슷한 방식으로 **BEM 네이밍**이라는 방식도 있다. BEM 네이밍은 CSS 방법론 중 하나로, 이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식이다. 예를 들어 `.card__title-primary` 처럼 말이다.

### 1-2. CSS Selector

CSS Selector를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있다. 예를 들어 `.App` 안에 들어 있는 `.logo`에 스타일을 적용하고 싶다면 다음과 같이 작성하면 된다.

```css
.app.logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}
```

이러한 방식을 사용하여 기존 `App.css`와 `App.js`의 CSS 클래스 부분을 다시 작성해보자.

```css
.App {
  text-align: center;
}

/* .App 안에 들어 있는 .logo*/
.App .logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

/* .App 안에 들어 있는 header.
header 클래스가 아닌 header 태그 자체에 스타일을 적용하기 때문에 .이 생략됨 */

.App header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

/* .App 안에 들어있는 a 태그 */
.App a {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

그리고 이에 맞춰 컴포넌트의 JSX 부분을 수정해 보자.

- `<header className="App-header">` ➡ `header`
- `<img src={logo} className="App-logo" alt="logo" />` ➡ `<img src={logo} className="logo" alt="logo" />`

이런 식으로 컴포넌트의 최상위 html 요소에는 컴포넌트의 이름으로 클래스 이름을 짓고(`.App`), 그 내부에는 소문자를 입력하거나(`.logo`), `header` 같은 태그를 사용하여 클래스 이름이 불필요한 경우에는 아예 생략할 수도 있다.

## 2. Sass 사용하기

Sass(Syntatically Awesome Style Sheets)(문법적으로 매우 멋진 스타일시트)는 CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해 주고, 스타일 코드의 재활용성을 높여 줄 뿐만 아니라 코드의 가독성을 높여서 유지 보수를 더욱 쉽게 해 준다.

`create-react-app` 구버전에서는 Sass를 사용하려면 추가 작업이 필요했는데, `v2` 버전부터는 별도의 추가 설정 없이 바로 사용할 수 있다.

Sass에서는 두 가지 확장자 `.scss`와 `.sass`를 지원한다. Sass가 처음 나왔을 때는 `.sass` 확장자만 지원되었으나 나중에 개발자들의 요청에 의해 `.scss` 확장자도 지원하게 되었다.

`.scss`의 문법과 `.sass`의 문법은 꽤 다르다. 다음 코드를 한번 확인해 보자.

> .sass

```css
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```

> .scss

```css
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

주요 차이점을 살펴보면, `.sass` 확장자는 중괄호(`{}`)와 세미콜론(`;`)을 사용하지 않는다. 반면 `.scss` 확장자는 기존 CSS를 작성하는 방식과 비교해서 문법이 크게 다르지 않다.

보통 `.scss` 문법이 더 자주 사용되므로 여기서는 `.scss` 확장자를 사용하여 스타일을 작성할 것이다.

새 컴포넌트를 만들어서 Sass를 사용해 보자. 우선 `node-sass`라는 라이브러리를 설치해 줘야 한다. **\$ yarn add node-sass**를 프로젝트 디렉토리에서 실행해 주자.

이후 설치가 완료되면, src 디렉토리에 다음과 같이 `SassComponent.scss` 파일을 작성해 보자.

> SassComponent.scss

```css
/* 변수 사용하기 */

$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

/* 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음) */
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}

.SassComponent {
  display: flex;
  .box {
    /* 일반 CSS에서는 .SassComponent .box와 마찬가지 */
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &.red {
      /* .red 클래스가 .box와 함께 사용되었을 때 */
      background: $red;
      @include square(1);
    }
    &.orange {
      background: $orange;
      @include square(2);
    }
    &.yellow {
      background: $yellow;
      @include square(3);
    }
    &.green {
      background: $green;
      @include square(4);
    }
    &.blue {
      background: $blue;
      @include square(5);
    }
    &.indigo {
      background: $indigo;
      @include square(6);
    }
    &.violet {
      background: $violet;
      @include square(7);
    }
    &:hover {
      /* .box에 마우스를 올렸을 때 */
      background: black;
    }
  }
}
```

그리고 이 Sass 스타일시트를 사용하는 `SassComponent.js` 컴포넌트 파일도 src에 만들자.

> SassComponent.js

```js
import React from "react";
import "./SassComponent.scss";

const SassComponent = () => {
  return (
    <div className="SassComponent">
      <div className="box red" />
      <div className="box orange" />
      <div className="box yellow" />
      <div className="box green" />
      <div className="box blue" />
      <div className="box indigo" />
      <div className="box violet" />
    </div>
  );
};

export default SassComponent;
```

그리고 이 컴포넌트를 App 컴포넌트에서 보여 주면,

<img width="896" alt="스크린샷 2021-03-23 오후 2 12 14" src="https://user-images.githubusercontent.com/61453718/112096521-c68d8d00-8be1-11eb-8d39-081414649ccb.png">

이러한 화면이 나타난다. red부터 violet까지 `@include square(n)`에서 각 파트별로 n을 다르게 줬기 때문에 이러한 결과가 나온 것이다.

그리고 각 사각형에 마우스를 올리면

<img width="897" alt="스크린샷 2021-03-23 오후 2 49 36" src="https://user-images.githubusercontent.com/61453718/112099504-fee39a00-8be6-11eb-8fbf-6bdf746eb67f.png">

이렇게 검게(서서히) 변한다.

### 2-1. utils 함수 분리하기

여러 파일에서 사용될 수 있는 Sass 변수 및 믹스인은 다른 파일로 따로 분리하여 작성한 뒤 필요한 곳에서 쉽게 불러와 사용할 수 있다.

src 디렉토리에 styles라는 디렉토리를 생성하고, 그 안에 utils.scss 파일을 만든 뒤 기존 `SassComponent.scss`에 작성했던 변수와 믹스인을 잘라내서 이동시키자.

> src/styles/utils.scss

```css
/* 변수 사용하기 */
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

/* 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음) */
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}
```

이제 utils.scss 파일에서 선언한 변수와 믹스인을 SassComponent.scss에서 사용해 볼 것이다. 다른 scss 파일을 불러올 때는 `@import` 구문을 사용한다.

> SassComponent.scss

```css
@import './styles/utils';
.SassComponent {
    display: flex;
    .box {
        background: red; /* 일반 CSS에서는 .SassComponent .box와 마찬가지 */
        cursor: pointer;
        transition: all 0.3s ease-in;
        (...)
    }
}
```

이제 utils.scss 파일을 분리하기 전의 결과와 같은 결과가 나타남을 확인할 수 있다.

### 2-3. sass-loader 설정 커스터마이징하기

이 작업은 Sass를 사용할 때 반드시 해야 하는 것은 아니지만, 해 두면 유용하다. 예를 들어 방금 SassComponent에서 utils를 불러올 때 `@import './styles/utils';` 형태로 불러왔는데, 만약 프로젝트에 디렉토리를 많이 만들어서 구조가 깊어졌다면 (예: `src/component/somefeature/ThisComponent.scss`) 해당 파일에서는 다음과 같이 상위 폴더로 한참 거슬러 올라가야 한다는 단점이 있다.

```css
@import "../../../styles/utils";
```

이 문제점은 웹팩에서 Sass를 처리하는 sass-loader의 설정을 커스터마이징하여 해결할 수 있다. `create-react-app`으로 만든 프로젝트는 프로젝트 구조의 복잡도를 나줓기 위해 세부 설정이 모두 숨겨져 있다. 이를 커스터마이징하려면 프로젝트 디렉토리에서 `yarn eject` 명령어를 통해 세부 설정을 밖으로 꺼내 줘야 한다.

`create-react-app`에서는 기본적으로 Git 설정이 되어 있는데, `yarn eject`는 아직 Git에 커밋되지 않은 변화가 있다면 진행되지 않으니, 먼저 커밋해 줘야 한다.
