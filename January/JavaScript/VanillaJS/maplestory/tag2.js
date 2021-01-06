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
taskSubmit.addEventListener("click", removeSpecial);
function removeSpecial(e) {
  e.target.value = e.target.value.replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, "");
}
let checkSame = [];
taskBox.addEventListener("keyup", function (e) {
  const keyCode = e.keyCode;
  if (e.keyCode == 188 || e.keyCode == 32 || e.keyCode == 13) {
    tagFunction();
  }
});
taskSubmit.addEventListener("click", tagFunction, false);
function tagFunction() {
  const task = taskBox.value.trim().toLowerCase();
  const newLi = document.createElement("li");
  const input = document.createElement("input");
  input.type = "hidden";
  input.value = task;
  input.name = "tagList";
  const removeBtn = document.createElement("button");
  const element = newLi.appendChild(document.createTextNode(task));
  if (taskBox.value != "" && checkSame.includes(task) === false) {
    checkSame.push(task);
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
  } else if (checkSame.includes(task) === true) {
    taskBox.value = "";
    alert("중복된 태그입니다.");
  }
}

/* Autocomplete using jQuery*/
$(function () {
  var languages = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme",
  ];

  $("#text_task").autocomplete({
    source: languages,
  });
});
