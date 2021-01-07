# DOM(Document Object Model)

- 간단한 웹페이지를 만들었을 경우, HTML 파일을 브라우저에서 읽게 됨. 브라우저가 각 태그그 분석 후 노드로 변환 (HTML Tag -> JavaScript Node)

- Node: EventTarget이라는 오브젝트를 상속. document도 Node를 상속하기 때문에, 즉 document 또한 Node이기 때문에, 또 Node는 EventTarget이므로 document에서도 이벤트 발생 가능

- 즉 모든 요소에서 이벤트가 발생할 수 있다는 것이다. Element 안에도 어떤 태그를 쓰냐에 따라 HTMLDivElement, HTMLInputElement 등 여러 Element가 있을 수 있다. 상속의 관계를 나타내는 것임

- JavaScript에서 HTML 각 줄을 하나하나 읽으면서 Node로 변환함. DOM의 트리로 변환해서 브라우저가 이해할 수 있도록 자신들만의 오브젝트 트리로 만들어 나가는 것임.

- addEventListener: EventTarget에서 지원해주는 API임

- EventTarget에 대한 API 3가지

* addEventListener(): 이벤트 리스너 등록
* removeEventListener(): 이벤트 리스너 제거
* dispatchEvent(): 이벤트 듣기

모든 Node가 eventTarget이기 때문에 가능한 것임

- Node에 대한 또 다른 Method

* Node.appendChild(childNode): child 요소 추가
* Node.cloneNode(): Node 복사
* Node.childNodes(): Node 안에 있는 모든 자식 Node들을 받아오기
  등등..

## CSSOM(CSS Object Model)

- html의 요소는 DOM으로 변환했는데, 그럼 CSS는 어디로 가는가?: 이에 대한 대답이 CSSOM임
- DOM(HTML) + CSS(external, embedded, inline, user-agent stylesheet 등) = CSSOM (compute styles based on CSS cascading rules)

- DOM + SSOM = Render Tree

* 성능 보장 렌더링 순서(Critical rendering path)

- 브라우저에서 URL을 입력하게 되면,

```
requests/response -> loading -> scripting -> rendering -> layout -> painting
```

순으로 진행된다.

1. 브라우저가 서버에게 HTML 파일을 요청 (requests/response)
2. 서버에세 받아서 로딩 (loading)
3. HTML을 한 줄 한 줄씩 읽어서 DOM으로 변환 (scripting)
4. 변환한 후에 윈도우에 표기하기 위해 준비 (rendering)
5. 각 위치에 얼마나 크게 표기될 것인지 계산 (layout)
6. 그림을 그림 (painting)

scripting까지를 Construction 파트, rendering부터 painting까지를 Operation파트로 나눈다.

Construction: DOM > CSSOM > Render Tree 만듦
Operation: layout > paint > composition
