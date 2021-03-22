// useRef Hook은 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해 준다.
// Average 컴포넌트에서 등록 버튼을 눌렀을 때 포커스가 인풋쪽으로 넘어가도록 코드 작성을
// 해 볼 것이다.

import React, { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균 계산 중...");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const AverageSampleUsinguseRef = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallbck(
    (e) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber("");
      inputEl.current.focus(); // 마지막에 인풋에 포커스가 넘어가도록 하는 명령
    },
    [number, list]
  ); // nubmer 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list, [list]));

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => {
          <li key={index}>{value}</li>;
        })}
      </ul>
      <div>
        <b>평균값: </b> {avg}
      </div>
    </div>
  );
};

export default AverageSampleUsinguseRef;
