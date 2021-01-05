// /* JavaScript markdown editor SimpleMDE */
// var simplemde = new SimpleMDE({ element: document.getElementById("MyID") });

/* add Tag by click or press enter, comma, space */
var elements = document.getElementById("element");
var taskSubmit = document.getElementById("btn_add_task");
var taskBox = document.querySelector("#text_task");
var taskList = document.getElementById("list_tasks");
var taskLi = document.querySelectorAll("ul li");

/* Prevent input other than Korean, English and numbers */
taskBox.addEventListener("keyup", removeSpecial);
function removeSpecial(e) {
  e.target.value = e.target.value.replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, "");
}
let checkSame = [];
taskSubmit.addEventListener("click", tagFunction, false);
taskBox.addEventListener("keyup", tagFunction, false);
function tagFunction(e) {
  const keyCode = e.keyCode;
  if (e.keyCode == 13 || e.keyCode == 188 || e.keyCode == 32) {
    const task = taskBox.value.trim().toLowerCase();
    const newLi = doucment.createElement("li");
    const input = document.createElement("input");
    input.type = "hidden";
    input.value = task;
    input.name = "tagList";
    const removeBtn = document.createElement("button");
    const element = newLi.appendChild(document.createTextNode(task));
    if (taskBox.value != "" && checkSame.includes(task) === false) {
      checkSame.push(task);
      e.preventDefault();
      taskList.appendChild(newLi);
      newLi.appendChild(input);
      newLi.appendChild(removeBtn);
      removeBtn.innerHTML = "X";
      taskBox.value = "";
      removeBtn.addEventListener("click", function () {
        removeBtn.parentNode.removeChild(removeBtn);
        newLi.parentNode.removeChild(newLi);
        checkSame.splice(checkSame.indexOf(task), 1);
      });
    } else {
      taskBox.value = "";
      alert("중복된 태그입니다.");
    }
  }
}
