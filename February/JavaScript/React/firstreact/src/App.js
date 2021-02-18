import React from 'react';
// import Counter from './Counter';
// import Say from './Say';
import EventPractice from './EventPractice';
import './App.css';

// // 함수형 컴포넌트
// function App() {
//   const name = 'React';
//   return (
//     <>
//       <div className="react">
//         {name}
//       </div>
//     </>
//   );
// }

// // 클래스형 컴포넌트
// class App extends Component {
//   render() {
//     const name = 'react';
//     return <div className='react'>{name}</div>
//   }
// }

// const App = () => {
//   return <Counter />;
// };

const App = () => {
  return <EventPractice />;
};

// App이라는 컴포넌트를 만들어 준다. function 키워드를 사용하여 컴포넌트를 만들었는데, 이러한 컴포넌트를 함수형 컴포넌트라고 부른다.
// 프로젝트에서 컴포넌트를 렌더링하면(렌더링: '보여준다') 함수에서 반환하고 있는 내용을 나타낸다.
// 함수의 반환내용을 보면 마치 HTML을 작성한 것 같은데, 이 코드는 HTML은 아니고 JSX라고 부른다.

export default App;
