window.onload = init;

function init() {

    /* The notes will be an array of objects in this format: */
    /* notes[i] = {task: value, date: value, time: value} */
    var notes = [];

    /* Checks for saved notes in local storage and presents them if they exist */
    var notesStr = window.localStorage.getItem("savedNotes");
    if (notesStr != null) {
        notes = JSON.parse(notesStr);
        drawNotes();
    }

    /* Reads saved data */
    function drawNotes() {
        for (var i = 0; i < notes.length; i++) {
            var task = notes[i].ntask;
            var date = notes[i].ndate;
            var time = notes[i].ntime;

            /* Draws saved notes */
            createNote(task, date, time);
        }
    }

    /* Creates note element */
    function createNote(task, date, time) {
        var newLi = document.createElement("li");
        var xLi = document.createElement("p");
        var taskLi = document.createElement("p");
        var dateLi = document.createElement("p");
        var timeLi = document.createElement("p");

        xLi.className = "btnRemove glyphicon glyphicon-remove";
        taskLi.className = "clipTask";
        dateLi.className = "clipDate";
        timeLi.className = "clipTime";

        taskLi.innerHTML = task;
        dateLi.innerHTML = date;
        timeLi.innerHTML = time;

        /* When delete button is clicked */
        xLi.addEventListener("click", handlerRemove);

        newLi.appendChild(xLi);
        newLi.appendChild(taskLi);
        newLi.appendChild(dateLi);
        newLi.appendChild(timeLi);

        /* Adds new note into the notes list */
        insertNote(newLi);
    }

    /* Draws the new note to the top of the list */
    function insertNote(newLi) {
        var ul = document.getElementById("noteList");
        newLi.className = "fadeIn";
        ul.insertBefore(newLi, ul.firstChild);
    };

    /* When add button is clicked */
    form.onsubmit = function (e) {
        e.preventDefault();
        /* Adds new note with data recieved from the form */
        addNote();
    };

    function addNote() {

        /* Form data */
        var frm = document.forms.form.elements;
        var formTask = frm.txtTask;
        var formDate = frm.txtDate;
        var formTime = frm.txtTime;

        /* Form validation */
        if (formTask.value == "" || formDate.value == "" || formTime.value == "") {
            /* Even though its not necessary to check if input fields are empty do to 'required' attribute' on iput fields */
            alert("Missing data, please fill all the input fields");
        } else if (!checkDate(formDate.value)) {
            formDate.className = "err";
            document.querySelector(".errDate").style.display = "block";
            formDate.addEventListener("change", function () {
                formDate.classList.remove("err");
                document.querySelector(".errDate").style.display = "none";
            })
        } else if (!checkTime(formTime.value)) {
            formTime.className = "err";
            document.querySelector(".errTime").style.display = "block";
            formDate.addEventListener("change", function () {
                formDate.classList.remove("err");
                document.querySelector(".errTime").style.display = "none";
            })
        } else {
            createNote(formTask.value, formDate.value, formTime.value);

            /* Updates local storage when a note is added */
            notes.splice(0, 0, {
                ntask: formTask.value,
                ndate: formDate.value,
                ntime: formTime.value
            });

            notesStr = JSON.stringify(notes);
            window.localStorage.setItem("savedNotes", notesStr);

            /* Cleans form after submit */
            formTask.value = "";
            formDate.value = "";
            formTime.value = "";

            formDate.className = "err";
            document.querySelector(".errDate").style.display = "none";
            formDate.classList.remove("err");
            document.querySelector(".errTime").style.display = "none";
            formTime.classList.remove("err");
        }
    }

    /* Deletes a note */
    function handlerRemove() {
        /* Gets clicked <li> => (note element) data */
        /* father = array of elements in <li> */
        var father = event.target.parentNode.childNodes;
        /* var f0 = father[0].innerHTML => remove button */
        var f1 = father[1].innerHTML; /* task content */
        var f2 = father[2].innerHTML; /* date content */
        var f3 = father[3].innerHTML; /* time content */

        for (var i = 0; i < notes.length; i++) {
            if (f1 == notes[i].ntask && f2 == notes[i].ndate && f3 == notes[i].ntime) {
                /* Deletes note and updates local storage */
                notes.splice(i, 1);
                notesStr = JSON.stringify(notes);
                window.localStorage.setItem("savedNotes", notesStr);
            }
        }

        var deleteLi = event.target.parentNode;
        deleteLi.className = "fadeOut";

        /* Delay note delete from screen so fade-out transition will show */
        setTimeout(function () {
            deleteLi.parentNode.removeChild(deleteLi);
        }, 1500);
    }

    /* Checks if the date is entered in a correct dd/mm/yyyy format and valid */
    function checkDate(date) {
        var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        var flag = (regex.test(date));
        return flag;
    }

    /* Checks if the time is entered in a correct HH:MM format and valid */
    function checkTime(time) {
        var regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g;
        var flag = (regex.test(time));
        return flag;
    }
}