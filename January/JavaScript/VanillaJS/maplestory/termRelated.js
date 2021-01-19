const termSubmit = document.getElementById("btn_add_term");
const termBox = document.getElementById("text_term");
const termList = document.getElementById("list_terms");
const termLi = document.querySelectorAll("ul li");

termBox.addEventListener("keyup", removeSpecial);
termSubmit.addEventListener("click", removeSpecial);
function removeSpecial(e) {
  e.target.value = e.target.value.replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, "");
}
const relatedTerm = termBox.value;

termSubmit.addEventListener("click", addRelatedTerm, false);

termBox.addEventListener("keyup", function (e) {
  const keyCode = e.keyCode;
  if (e.keyCode == 188 || e.keyCode == 32 || e.keyCode == 13) {
    addRelatedTerm();
  }
});

function addRelatedTerm(name) {
  const trimmedTerm = relatedTerm.trim();
  const liElem = document.createElement("li");
  liElem.innerText = trimmedTerm;

  const removeBtn = document.createElement("button");

  termList.appendChild(liElem);
  liElem.appendChild(removeBtn);
  removeBtn.innerHTML = "X";
  termBox.value = "";
}

// addRelatedTerm 인자받기
// 함수 밖에서 값을 가져오고 + 함수를 통해 그것을 관련용어화 하기

// 파라미터 name을 addRelatedTerm 함수에서 어떻게 사용할까?
