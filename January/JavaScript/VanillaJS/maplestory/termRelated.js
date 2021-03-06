const termSubmit = document.getElementById("btn_add_term");
const termList = document.getElementById("list_terms");
const termBox = document.getElementById("text_term");
const termLi = document.querySelectorAll("ul li");

termBox.addEventListener("keyup", removeSpecial);
termSubmit.addEventListener("click", removeSpecial);
function removeSpecial(e) {
  e.target.value = e.target.value.replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, "");
}

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
  const item = document.querySelectorAll("#list_terms > li");
  for (let i = 0; i < item.length; i++) {
    if (item[i].innerText === name) {
      alert("good");
    } else {
      alert("중복입니다.");
      termBox.value = "";
    }
  }
  termBox.value = "";
  removeBtn.addEventListener("click", () => {
    removeBtn.parentNode.removeChild(removeBtn);
    liElem.parentNode.removeChild(liElem);
  });
}

function validateTerm(name) {
  if (termList.children.includes(name) === false) {
    return;
  }
}
// 그 다음, 중복이 안되게 하려면 어떻게 해야 할 지도 생각을 해봐야 한다. 각각의 if문에 넣어야 되는가?
