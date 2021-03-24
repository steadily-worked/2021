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

이 문제점은 웹팩에서 Sass를 처리하는 sass-loader의 설정을 커스터마이징하여 해결할 수 있다. `create-react-app`으로 만든 프로젝트는 프로젝트 구조의 복잡도를 낮추기 위해 세부 설정이 모두 숨겨져 있다. 이를 커스터마이징하려면 프로젝트 디렉토리에서 `yarn eject` 명령어를 통해 세부 설정을 밖으로 꺼내 줘야 한다.

`create-react-app`에서는 기본적으로 Git 설정이 되어 있는데, `yarn eject`는 아직 Git에 커밋되지 않은 변화가 있다면 진행되지 않으니, 먼저 커밋해 줘야 한다.

전부 commit을 한 뒤에 `$ yarn eject`를 해 준다.

하고 나면, 이제 프로젝트 디렉토리에 `config`라는 디렉토리가 생성되었을 것이다. 그 내부의 `webpack.config.js`를 열어보자. 그곳에서 `ssasRegex`라는 키워드를 찾아 보자.

> webpack.config.js - sassRegex 찾기

```js
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    },
    'sass-loader'
  ),
  sideEffects: true,
},
```

여기서 `use:`에 있는 `sass-loader` 부분을 지우고, 뒷부분에 `concat`을 통해 커스터마이징된 `sass-loader` 설정을 넣어 준 뒤

```js
  {
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders({
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    }).concat({
      loader: require.resolve("sass-loader"),
      options: {
        additionalData: `@import 'utils';`,
        sassOptions: {
          includePaths: [paths.appSrc + "/styles"],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    }),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
  },
```

설정 파일 저장 후 서버를 다시 껐다 재시작하면 된다. 이제 `utils.scss` 파일을 불러올 때 현재 수정하고 있는 scss 파일 경로가 어디에 위치하더라도 앞부분에 상대 경로를 입력할 필요 없이 styles 디렉토리 기준 절대 경로를 사용하여 불러올 수 있다.

이제 SassComponent.scss에서 import 구문을

```css
@import "utils.scss";
```

이와 같이 수정해주면, 이제부터 `utils.scss`를 사용하는 컴포넌트가 있다면 따로 디렉토리에 직접 접근할 필요 없이 위의 한 줄만 넣어주면 된다.

하지만, 새 파일을 생성할 때마다 utils.scss를 매번 이렇게 포함시키는 것도 귀찮을 수 있을 것이다. 이에 대한 해결 방법 또한 있다. 그럴 때는 `sass-loader`의 `data` 옵션을 설정하면 된다. `data` 옵션을 설정하면 Sass 파일을 불러올 때마다 코드의 맨 윗부분에 특정 코드를 포함시켜 준다.

현재 React 버전에서는 기본적으로 `options`와 `sassOptions`를 따로 분리해서 각각에 적용되는 명령을 넣고 있다. 그리하여, 기본적으로

```js
additinalData: `@import 'utils';`;
```

처리가 되어 있다. 이를 이용하면, 모든 scss 파일에서 `utils.scss`를 자동으로 불러오므로, Sass에서 맨 윗줄에 있는 `import` 구문을 지워도 정상적으로 작동할 것이다.

### 2-3. node_modules에서 라이브러리 불러오기

Sass의 장점 중 하나는 라이브러리를 쉽게 불러와서 사용할 수 있다는 점이다. `yarn`을 통해 설치한 라이브러리를 사용하는 가장 기본적인 방법은 무엇일까? 다음과 같이 상대 경로를 사용하여 `node_modules`까지 들어가서 불러오는 방법이다.

```css
@import "../../../node_modules/library/styles";
```

하지만 이런 구조는 스타일 파일이 깊숙한 디렉토리에 위치할 경우 `../`을 매우 많이 적어야 하므로 번거롭다. 이보다 더 쉬운 방법이 있는데, 바로 물결 문자(`~`)를 사용하는 방법이다.

```css
@import "~library/styles";
```

물결 문자를 사용하면 자동으로 `node_modules`에서 라이브러리 디렉토리를 탐지하여 스타일을 불러올 수 있다.

연습삼아 유용한 Sass 라이브러리 두 가지를 설치하고 사용해 보자. 반응형 디자인을 쉽게 만들어 주는 `include-media`와 매우 편리한 색상 팔레트인 `open-color`를 `yarn` 명령어를 사용해 설치해 보자.

```
$ yarn add open-color include-media
```

그 다음에 `utils.scss` 파일을 열고 물결 표시를 사용하여 라이브러리를 불러오자.

> utils.scss

```css
@import "~include-media/dist/include-media";
@import "~open-color/open-color";
```

Sass 라이브러리를 불러올 떄는 `node_modules` 내부 라이브러리 경로 안에 들어 있는 scss 파일을 불러와야 한다. 보통 scss 파일 경로가 어디에 위치하고 있는지를 라이브러리의 공식 매뉴얼에서 알려주지 않을 때가 많으니, 직접 경로로 들어가서 확인해보자.

이제 방금 불러온 `include-media`와 `open-color`를 `SassComponent.scss`에서 사용해 볼 것이다.

> SassComponent.scss

```css
.SassComponent {
  display: flex;
  background: $oc-gray-2;
  @include media('<768px') {
    background: $oc-gray-9;
  }
  (...)
}
```

이 코드는 SassComponent의 배경색을 `open-colors` 팔레트 라이브러리에서 불러온 후 설정하고, 화면 가로 크기가 768px 미만이 되면 배경색을 어둡게 바꿔 준다.

<img width="894" alt="스크린샷 2021-03-23 오후 5 15 14" src="https://user-images.githubusercontent.com/61453718/112114375-5855c400-8bfb-11eb-83cf-11ae8ac26562.png">

768px 이상일 때 `$oc-gray-2`의 배경색을 가지고 있고,

<img width="766" alt="스크린샷 2021-03-23 오후 5 15 36" src="https://user-images.githubusercontent.com/61453718/112114421-6572b300-8bfb-11eb-9970-061ba37cf8c8.png">

768px 미만일 때 `$oc-gray-9`의 배경색을 갖고 있게 된다.

## 3. CSS Module

CSS Module은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, 즉 **파일 이름\_클래스 이름-해시값** 형태로 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해 주는 기술이다. CSS Module을 사용하기 위해 구버전(v1)의 `create-react-app`에서는 웹팩에서 css-loader 설정을 별도로 해줘야 했지만, v2 버전 이상부터는 따로 설정할 필요 없이 `.module.css` 확장자로 파일을 저장하기만 하면 CSS Module이 적용된다.

CSSModule.module.css라는 파일을 `src` 디렉토리에 생성하여 다음과 같이 한번 작성해 보자.

> CSSModule.module.css

```css
/* 자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능 */

.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;
}

/* 글로벌 CSS를 작성하고 싶다면 */
:global .something {
  font-weight: 800;
  color: aqua;
}
```

CSSModule을 사용하면 클래스 이름을 지을 때 그 고유성에 대해 고민하지 않아도 된다. 흔히 사용하는 단어로 이름을 짓는다고 해도 전혀 문제가 되지 않는다. 해당 클래스는 각자가 방금 만든 스타일을 직접 불러온 컴포넌트 내부에서만 작동하기 때문이다.

만약 특정 클래스가 웹 페이지에서 전역적으로 사용되는 경우라면 **:global**을 앞에 입력하여 글로벌 CSS임을 명시해 줄 수 있다.

다 작성했으면, 위 CSS Module을 사용하는 리액트 컴포넌트도 작성해 보자.

> CSSModule.js

```js
import React from "react";
import styles from "./CSSModule.module.css";

const CSSModule = () => {
  return (
    <div className={styles.wrapper}>
      안녕하세요. 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
```

CSS Module이 적용된 스타일 파일을 불러오면 객체를 하나 전달받게 되는데 CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 값이 키-값 형태로 들어 있다. 예를 들어 위 코드에서 `console.log(styles)`를 한다면 다음과 같은 결과가 나타난다.

```js
{
  wrapper: "CSSModule_wrapper_1F2tc";
}
```

각자가 지정한 클래스 이름 앞뒤로 파일 이름과 해시값이 붙었다. 이 고유한 클래스 이름을 사용하려면 클래스를 적용하고 싶은 JSX 엘리먼트에 `className={styles.[클래스 이름]}`의 형태로 전달해주면 된다. `:global`을 사용해 전역적으로 선언한 클래스의 경우 평상시에 해 왔던 것처럼 그냥 문자열로 넣어 준다.

CSSModule 관련 컴포넌트와 스타일을 모두 작성했다면 App 컴포넌트에서 렌더링해 주자.

> App.js

```js
import React, { Component } from "react";
import CSSModule from "./CSSModule";

class App extends Component {
  render() {
    return (
      <div>
        <CSSModule />
      </div>
    );
  }
}

export default App;
```

<img width="893" alt="스크린샷 2021-03-23 오후 7 38 44" src="https://user-images.githubusercontent.com/61453718/112133789-63b2ea80-8c0f-11eb-9679-3f37c695ef1a.png">

CSS Module이 잘 적용되었고, 임의의 해시값을 가진 클래스가 생성되었음을 볼 수 있다.

CSS Module을 사용한 클래스 이름을 두 개 이상 적용할 때는 다음과 같이 코드를 작성하면 된다.

> CSSModule.module.css

```css
/* 자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능 */

.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;
}

.inverted {
  color: black;
  background: white;
  border: 1px solid black;
}

/* 글로벌 CSS를 작성하고 싶다면 */
:global .something {
  font-weight: 800;
  color: aqua;
}
```

> CSSModule.js

```js
import React from "react";
import styles from "./CSSModule.module.css";

const CSSModule = () => {
  return (
    <div className={`${styles.wrapper} ${styles.inverted}`}>
      안녕하세요. 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
```

이렇게 감싸는 div에 클래스를 2개를 주면, 2개가 동시에 적용되는 것을 볼 수 있다.

결과

<img width="892" alt="스크린샷 2021-03-23 오후 7 49 51" src="https://user-images.githubusercontent.com/61453718/112135261-f1dba080-8c10-11eb-8a9e-aaac5621ec63.png">

wrapper와 inverted 각각에 임의의 해시값이 붙었다.

위 코드에서는 ES6 문법 템플릿 리터럴(Template Literal)을 사용하여 문자열을 합해 주었다. 이 문법을 사용하면 문자열 안에 자바스크립트 레퍼런스를 쉽게 넣어 줄 수 있다.

```js
const name = "리액트";
const message = "제 이름은 `${name}`입니다.";
```

CSS Module 클래스를 여러 개 사용할 때 템플릿 리터럴 문법을 사용하고 싶지 않다면 다음과 같이 작성할 수도 있다.

```js
className={[styles.wrapper, styles.inverted].join(" ")}
```

### 3-1. classnames

classnames는 CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리이다. 또한 CSS Module을 사용할 때 이 라이브러리를 사용하면 여러 클래스를 적용할 때 매우 편리하다.

```
$ yarn add classnames
```

우선 해당 라이브러리를 설치하자. 그 후 classnames의 기본적인 사용법을 한번 훑어보자.

> classnames 간략 사용법

```js
import classNames from "classnames";

classNames("one", "two"); // = 'one two'
classNames("one", { two: true }); // = 'one two'
classNames("one", { two: false }); // = 'one'
classNames("one", ["two", "three"]); // = 'one two three'

const myClass = "hello";
classNames("one", myClass, { myCondition: true }); // = 'one hello myCondition'
```

이런 식으로 여러 가지 종류의 파라미터를 조합해 CSS 클래스를 설정할 수 있기 때문에 컴포넌트에서 조건부로 클래스를 설정할 때 매우 편하다. 예를 들어 props 값에 따라 다른 스타일을 주기가 쉬워진다.

> 예시 코드

```js
const MyComponent = ({ highlighted, theme }) => (
  <div className={classNames("MyComponent", { highlighted }, theme)}>Hello</div>
);
```

이렇게 할 경우, 위 엘리먼트의 클래스에 `highlighted` 값이 true이면 `highlighted` 클래스가 적용되고, false이면 적용되지 않는다. 추가로 theme으로 전달받는 문자열은 내용 그대로 클래스에 적용된다.

이런 라이브러리의 도움을 받지 않는다면 다음과 같은 형식으로 처리해야 할 것이다.

> 예시 코드

```js
const MyComponent = ({ highlighted, theme }) => (
  <div className={`MyComponent ${theme} ${highlighted ? "highlighted" : ""}`}>
    Hello
  </div>
);
```

classnames를 쓰는 것이 가독성이 훨씬 높다.

덧붙여, CSS Module과 함께 사용하면 CSS Module 사용이 훨씬 쉬워진다. classnames에 내장되어 있는 bind 함수를 사용하면 클래스를 넣어 줄 때마다 `styles.[클래스 이름]` 형태를 사용할 필요가 없다. 사전에 미리 styles에서 받아 온 뒤에 사용하게끔 설정해 두고 `cx('클래스 이름', '클래스 이름 2')` 형태로 사용할 수 있다.

다음 코드는 각자가 만든 CSSModule 컴포넌트에 classnames의 bind 함수를 적용한 예이다.

> CSSModule.js

```js
import React from "react";
import classNames from "classnames/bind";
import styles from "./CSSModule.module.css";

const cx = classNames.bind(styles); // 미리 styles에서 클래스를 받아오도록 설정하고

const CSSModule = () => {
  return (
    <div className={cx("wrapper", "inverted")}>
      안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
```

CSS Module을 사용할 때 클래스를 여러 개 설정하거나, 또는 조건부로 클래스를 설정할 때 classnames의 bind를 사용하면 훨씬 편하게 작성할 수 있다.

### 3-2. Sass와 함께 사용하기

Sass를 사용할 때도 파일 이름 뒤에 `.module.scss` 확장자를 사용해 주면 CSS Module로 사용할 수 있다. CSSModule.module.css 파일의 이름을 CSSModule.module.scss로 변경해 보자. 스타일 코드도 이에 따라 조금 수정해 보자.

> CSSModule.module.scss

```css
/* 자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 마음대로 사용 가능 */

.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;
  &.inverted {
    /* inverted가 .wrapper와 함께 사용되었을 때만 적용 */
    color: black;
    background: white;
    border: 1px solid black;
  }
}

:global {
  // :global {}로 감싸기
  .something {
    font-weight: 800;
    color: aqua;
  }
  /* 여기에 다른 클래스를 만들 수도 있다. */
}
```

그러고 나서 CSSModule.js 상단에서도 .css 파일 대신 .scss 파일을 불러오자.

> CSSModule.js

```js
(...)
import CSSModule from './CSSModule.module.scss';

const cx = classNames.bind(styles);
(...)
```

이전과 똑같은 화면이 나올 것이다.

### 3-3. CSS Module이 아닌 파일에서 CSS Module 사용하기

CSS Module에서 글로벌 클래스를 정의할 때 `:global`을 사용했던 것처럼 CSS Module이 아닌 일반 `.css`/`.scss` 파일에서도 `:local`을 사용하여 CSS Module을 정의할 수 있다.

```css
:local .wrapper {
  /* 스타일 */
}
:local {
  .wrapper {
    /* 스타일 */
  }
}
```

## 4. styled-components

컴포넌트 스타일링의 또 다른 패러다임은 자바스크립트 파일 안에 스타일을 선언하는 방식이다. 이 방식을 `CSS-in-JS`라고 부르는데, 이와 관련돤 라이브러리는 정말 많다. 라이브러리의 종류는 [여기](https://github.com/MicheleBertoli/css-in-js)에서 확인할 수 있다.

이번에는 `CSS-in-JS` 라이브러리 중에서 개발자들이 가장 선호하는 `styled-components`를 알아볼 것이다.

> styled-components를 대체할 수 있는 라이브러리로는 현재 emotion이 대표적이다. 작동 방식은 styled-components와 꽤 비슷하다.

```
$ yarn add styled-components
```

이 라이브러리를 통해 예제 컴포넌트를 한번 만들어 볼 것이다. `styled-components`를 사용하면 자바스크립트 파일 하나에 스타일까지 작성할 수 있기 때문에 `.css` 또는 `.scss` 확장자를 가진 스타일 파일을 따로 만들지 않아도 된다는 큰 이점이 있다.

`src` 디렉토리에 StyledComponent.js 파일 생성을 한 뒤 다음 예제 코드를 적는다.

> StyledComponent.js

```js
import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해준다. */
  ${(props) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;
```

이후 `App` 컴포넌트에서 렌더링하면

<img width="377" alt="스크린샷 2021-03-23 오후 9 20 16" src="https://user-images.githubusercontent.com/61453718/112145345-9368ef00-8c1d-11eb-85bc-0e60ee9806b1.png">

다음의 두 가지 버튼이 나타난다.

`styled-components`와 일반 `classNames`를 사용하는 CSS/Sass를 비교했을 때, 가장 큰 장점은 props 값으로 전달해 주는 값을 쉽게 스타일에 적용할 수 있다는 것이다.

아직은 styled-components가 어떤 원리로 작동하는지 잘 모르지만, 앞으로 이어지는 절에서 원리와 사용법을 하나하나 알아볼 것이다.

### 4-1. Tagged 템플릿 리터럴

앞에서 작성한 코드를 확인해 보면, 스타일을 작성할 때 `를 사용하여 만든 문자열에 스타일 정보를 넣어 줬다. 여기서 사용한 문법을 Tagged 템플릿 리터럴이라고 부른다. CSS Module을 배울 때 나온 일반 템플릿 리터럴과 다른 점은 템플릿 안에 자바스크립트 객체나 함수를 전달할 때 온전히 추출할 수 있다는 것이다.

예를 들어 다음 코드의 실행 결과를 확인해 보자.

```js
hello ${{foo: ‘bar‘ }} ${() => ‘world‘}!
```

결과: "hello [object Object] () => 'world'!"

템플릿에 객체를 넣거나 함수를 넣으면 형태를 잃어 버리게 된다. 객체는 `[Object object]`로 변환되고, 함수는 함수 내용이 그대로 문자열화되어 나타난다.

만약 다음과 같은 함수를 작성하고 나서 해당 함수 뒤에 템플릿 리터럴을 넣어 준다면, 템플릿 안에 넣은 값을 온전히 추출할 수 있다.

```js
function tagged(...) {
  console.log(args);
};

tagged(hello ${{ foo: ‘bar‘ }} ${() => 'world'}!`);
```

Tagged 템플릿 리터럴을 사용하면 이렇게 템플릿 사이사이에 들어가는 자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있다. `styled-components`는 이러한 속성을 사용하여 `styled-components`로 만든 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있도록 해 준다.

### 4-2. 스타일링된 엘리먼트 만들기

`styled-components`를 사용하여 스타일링된 엘리먼트를 만들 때는 컴포넌트 파일의 상단에서 styled를 불러오고, `styled.태그명`을 사용하여 구현한다.

> 예시 코드

```js
import styled from "styled-components";

const MyComponent = styled.div`
  font-size: 2rem;
`;
```

이렇게 `styled.div` 뒤에 Tagged 템플릿 리터럴 문법을 통해 스타일을 넣어주면, 해당 스타일이 적용된 div로 이루어진 리액트 컴포넌트가 탄생한다. 그래서 나중에 `<MyComponent>Hello</MyComponent>`와 같은 형태로 사용할 수 있다.

div가 아닌 `button`이나 `input`에 스타일링을 하고 싶다면 `styled.button` 혹은 `styled.input`과 같은 형태로 뒤에 태그명을 넣어 주면 된다.

하지만 사용해야 할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링해 주고 싶다면 다음과 같은 형태로 구현할 수 있다.

> 예시 코드

```js
// 태그의 타입을 styled 함수의 인자로 전달
const MyInput = styled("input")`
  background: gray;
`;

// 아예 컴포넌트 형식의 값을 넣어 줌
const StyledLink = styled(Link)`
  color: blue;
`;
```


> 여기서 사용된 Link 컴포넌트는 나중에 리액트 라우터를 배울 때 사용할 컴포넌트이다. 이런 식으로 컴포넌트를 styled의 파라미터에 넣는 경우에는 해당 컴포넌트에 className props를 최상위 DOM의 className 값으로 설정하는 작업이 내부적으로 되어 있어야 한다. 다음 예시 코드를 확인해 보자.
> 
> 예시 코드
>
> ```js
> const Sample = ({ className }) => {
>   return <div className={className}>Sample</div>;
> };
>
> const StyledSample = styled(Sample)`
>   font-size: 2rem;
> `;
> ```

### 4-3. 스타일에서 props 조회하기

styled-components를 사용하면 스타일 쪽에서 컴포넌트에게 전달된 props 값을 참조할 수 있다. 이전에 작성했던 Box 컴포넌트를 다시 보자.

> StyledComponents.js - Box 컴포넌트

```js
const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
`;
```

이 코드를 보면 background 값에 props를 조회해서 props.color의 값을 사용하게 했다. 그리고 color 값이 주어지지 않았을 때는 blue를 기본 색상으로 설정했다.

이렇게 만들어진 코드는 JSX에서 사용될 때 다음과 같이 color 값을 props로 넣어 줄 수 있다.

```js
<Box color="black">(...)</Box>
```

### 4-4. props에 따른 조건부 스타일링

일반 CSS 클래스를 사용하여 조건부 스타일링을 해야 할 때는 className을 사용하여 조건부 스타일링을 해 왔는데, styled-components에서는 조건부 스타일링을 간단하게 props로도 처리할 수 있다.

앞에서 작성한 Button 컴포넌트를 다시 한 번 확인해 보자.

```js
import styled, { css } from "styled-components";
// 단순 변수의 형태가 아니라 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우에는 css를 불러와야 한다.
(...)
const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해준다. */
  ${(props) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;
```

이렇게 만든 컴포넌트는 다음과 같이 props를 사용하여 서로 다른 스타일을 적용할 수 있다.

```js
<Button>안녕하세요</Button>
<Button inverted={true}>테두리만</Button>
```

스타일 코드 여러 줄을 props에 따라 넣어 줘야 할 때는 CSS를 styled-components에서 불러와야 한다. CSS를 사용하지 않고 다음과 같이 바로 문자열을 넣어도 작동하긴 한다.

```js
${(props) =>
  props.inverted &&
  `background: none;
    border: 2px solid white;
    color: white;
    &:hover {
      background: white;
      color: black;
    }
  `};
```

이렇게 했을 때는 해당 내용이 그저 문자열로만 취급되기 때문에 VSCode 확장 프로그램에서 신택스 하이라이팅이 제대로 이뤄지지 않는다는 단점이 따른다. 그리고 더욱 치명적인 단점은 Tagged 템플릿 리터럴이 아니기 때문에 함수를 받아 사용하지 못해 해당 부분에서는 props 값을 사용하지 못한다는 것이다. 만약 조건부 스타일링을 할 때 넣는 여러 줄의 코드에서 props를 참조하지 않는다면 굳이 CSS를 불러와서 사용하지 않아도 상관없다. 하지만 props를 참조한다면 반드시 CSS로 감싸 줘서 Tagged 템플릿 리터럴을 사용해 줘야 한다.

### 4-5. 반응형 디자인

이번에는 styled-components를 사용할 때 반응형 디자인을 어떻게 하는지 보자. 브라우저의 가로 크기에 따라 다른 스타일을 적용하기 위해서는 일반 CSS를 사용할 때와 똑같이 media 쿼리(query)를 사용하면 된다. 조금 전 작성한 Box 컴포넌트를 다음과 같이 수정해 보자.

> StyledComponents.js - Box

```js
const Box = styled.div`
  /* props로 넣어 준 값을 직접 전달해 줄 수 있다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
  /* 기본적으로는 가로 크기 1024px에 가운데 정렬을 하고
  가로 크기가 작아짐에 따라 크기를 줄이고
  768px 미만이 되면 꽉 채운다. */
  width: 1024px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
```

일반 CSS에서 할 때랑 큰 차이가 없다. 그런데 이러한 작업을 여러 컴포넌트에서 반복해야 한다면 조금 귀찮을 수도 있다. 그럴 때는 이 작업을 함수화하여 간편하게 사용할 수 있다. styled-components 매뉴얼에서 제공하는 유틸 함수를 따라 사용해 보자.

```js
import React from "react";
import styled, { css } from "styled-components";

const sizes = {
  desktop: 1024,
  tablet: 768,
};

// 위에 있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어 준다.
// 참고: https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const Box = styled.div`
  /* props로 넣어 준 값을 직접 전달해 줄 수 있다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`};
`;
```

media를 한번 선언하고 나니까, 이를 사용할 때 스타일 쪽의 코드가 훨씬 간단해졌다. 지금은 media를 StyledComponent.js에서 만들어 줬지만, 실제로 사용한다면 아예 다른 파일로 모듈화한 뒤 여기저기서 불러와 사용하는 방식이 훨씬 편할 것이다.

## 5. 정리

여기선 다양한 리액트 컴포넌트 스타일링을 배워 봤다. 모두 쓸모 있는 기술들이다. 이러한 방식들 중 무엇을 사용할지 선택하는 것은 각자의 몫이다.
