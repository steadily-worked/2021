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
/* Prevent duplicate tags */
var checkSame = [];
/* click */
$("#text_task").keyup(function (e) {
  var keyCode = e.keyCode;
  if (e.keyCode == 13 || e.keyCode == 188 || e.keyCode == 32) {
    var task = taskBox.value.trim().toLowerCase();
    var newLi = document.createElement("li");
    var input = document.createElement("input");
    input.type = "hidden";
    input.value = task;
    input.name = "tagList";
    var removeBtn = document.createElement("button");
    var element = newLi.appendChild(document.createTextNode(task));
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
    } else {
      taskBox.value = "";
      alert("중복된 태그입니다.");
    }
  }
});

taskSubmit.addEventListener("click", clickFunction, false);
function clickFunction(e) {
  var keyCode = e.keyCode;
  var task = taskBox.value.trim().toLowerCase();
  var newLi = document.createElement("li");
  var removeBtn = document.createElement("button");
  var element = newLi.appendChild(document.createTextNode(task));
  if (taskBox.value != "" && checkSame.includes(task) == false) {
    checkSame.push(task);
    e.preventDefault();
    taskList.appendChild(newLi);
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
// filter로 value가 task면 splice하거나,
// indexOf(value)로 index를 찾은 후에 그 index를 splice해도 됨.

// /* keyup */
// document.addEventListener('keyup', keyupFunction, false);
// function keyupFunction(e) {
//     var keyCode = e.keyCode;
//     var task = taskBox.value.trim().toLowerCase();
//     var newLi = document.createElement('li');
//     var removeBtn = document.createElement('button');
//     var element = newLi.appendChild(document.createTextNode(task));
//     if ((taskBox.value != "") && (checkSame.includes(task) == false) && (keyCode === 188 || keyCode === 13 || keyCode === 32))  {
//         checkSame.push(task);
//         e.preventDefault();
//         taskList.appendChild(newLi);
//         newLi.appendChild(removeBtn);
//         removeBtn.innerHTML = "X";
//         taskBox.value = '';
//         removeBtn.addEventListener('click', function() {
//             removeBtn.parentNode.removeChild(removeBtn);
//             newLi.parentNode.removeChild(newLi);
//         })} else {
//             taskBox.value='';
//             alert('중복된 태그입니다.');
//         };
// }

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

// 중복 태그 방지만 하면 끝
