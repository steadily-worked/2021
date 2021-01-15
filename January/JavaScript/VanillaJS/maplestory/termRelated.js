const taskSubmit = document.getElementById("btn_add_task");
const taskBox = document.querySelector("#text_task");
const taskList = document.getElementById("list_tasks");
const taskLi = document.querySelectorAll("ul li");

taskBox.addEventListener("keyup", removeSpecial);
taskSubmit.addEventListener("click", removeSpecial);
function removeSpecial(e) {
  e.target.value = e.target.value.replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, "");
}

const taskValue = taskBox.value;
const preventDuplicate = taskBox.value.trim().toLowerCase();

taskSubmit.addEventListener("click", addTag, false);

taskBox.addEventListener("keyup", function (e) {
  const keyCode = e.keyCode;
  if (e.keyCode == 188 || e.keyCode == 32 || e.keyCode == 13) {
    addTag(preventDuplicate);
  }
});
let checkSame = [];

function addTag(preventDuplicate) {
  const newLi = document.createElement("li");
  const removeBtn = document.createElement("button");

  const element = newLi.appendChild(document.createTextNode(preventDuplicate));
  if (taskBox.value != "" && checkSame.includes(preventDuplicate) === false) {
    checkSame.push(preventDuplicate);
    taskList.appendChild(newLi);
    newLi.appendChild(removeBtn);
    newLi.value = preventDuplicate;
    removeBtn.innerHTML = "X";
    taskBox.value = "";
    removeBtn.addEventListener("click", function () {
      removeBtn.parentNode.removeChild(removeBtn);
      newLi.parentNode.removeChild(newLi);
      checkSame.splice(checkSame.indexOf(task), 1);
    });
  } else if (checkSame.includes(preventDuplicate) === true) {
    taskBox.value = "";
    alert("중복된 태그입니다.");
  }
}

// addTag로 인자받기
// 함수 밖에서 값을 가져오고 + 함수를 통해 그것을 관련용어화 하기
