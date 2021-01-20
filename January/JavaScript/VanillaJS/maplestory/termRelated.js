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
  function () {
    if (termBox.value != "") {
      addRelatedTerm(termBox.value);
    }
  },
  false
);

termBox.addEventListener("keyup", function (e) {
  const keyCode = e.keyCode;
  if (
    (e.keyCode == 188 || e.keyCode == 32 || e.keyCode == 13) &&
    termBox.value != ""
  ) {
    addRelatedTerm(termBox.value);
  }
});

function addRelatedTerm(name) {
  const trimmedTerm = name.trim();
  const liElem = document.createElement("li");
  liElem.innerText = trimmedTerm;

  const removeBtn = document.createElement("button");

  termList.appendChild(liElem);
  liElem.appendChild(removeBtn);
  removeBtn.innerHTML = "X";
  termBox.value = "";
}
// click, keyup 둘 다 'termBox.value != ""' 를 기준으로 실행되게 하고 있는데,
// 별로 좋은 방법이 아닌 듯 하다. 메인 addRelatedTerm 함수에서 termBox.value가 없을 경우
// 가 들어갈 수 있도록 코드를 바꿔야 될 듯 하다.

// 값이 공백일 때 추가하게 하기
