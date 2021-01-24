const termSubmit = document.getElementById("btn_add_term");
const termList = document.getElementById("list_terms");
const termBox = document.getElementById("text_term");
const termLi = document.querySelectorAll("ul li");

termBox.addEventListener("keyup", removeSpecial);
termSubmit.addEventListener("click", removeSpecial);
function removeSpecial(e) {
  e.target.value = e.target.value.replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, "");
}
const relatedTerm = termBox.value;

termSubmit.addEventListener(
  "click",
  () => {
    addRelatedTerm(termBox.value);
  },
  false
);

termBox.addEventListener("keyup", (e) => {
  const keyCode = e.keyCode;
  if (e.keyCode == 188 || e.keyCode == 32 || e.keyCode == 13) {
    addRelatedTerm(termBox.value);
  }
});

function addRelatedTerm(name) {
  if (!name) {
    return;
  }
  const trimmedTerm = name.trim();
  const liElem = document.createElement("li");
  liElem.innerText = trimmedTerm;

  const removeBtn = document.createElement("button");
  termList.appendChild(liElem);
  liElem.appendChild(removeBtn);
  removeBtn.innerHTML = "X";

  termBox.value = "";
  removeBtn.addEventListener("click", () => {
    removeBtn.parentNode.removeChild(removeBtn);
    liElem.parentNode.removeChild(liElem);
  });
}

// click, keyup 둘 다 'termBox.value != ""' 를 기준으로 실행되게 하고 있는데,
// 별로 좋은 방법이 아닌 듯 하다. 메인 addRelatedTerm 함수에서 termBox.value가 없을 경우
// 가 들어갈 수 있도록 코드를 바꿔야 될 듯 하다.
// main함수에 if를 걸면 안될 것 같은데.. 그러면 코드 자체에서 addRelatedTerm("name") 이런식으로 할 경우
// termBox.value가 없는 상황이기때문에 if문 조건 충족이 되지 않아서 관련용어 추가가 안된다. ㅠ
// 그 다음, 중복이 안되게 하려면 어떻게 해야 할 지도 생각을 해봐야 한다. 각각의 if문에 넣어야 되는가?
