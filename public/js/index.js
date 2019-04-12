// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");

var $task_date = $("#task-date");
var $task_minutes = $("#task-minutes");
var $task_category = $("#task-category");
var $task_goal = $("#task-goal");
var $submitBtn = $("#submit");
var $taskList = $("#task-list");

// Create the date entry in 2019-2-8 format

var date = new Date();
// first month has array index of 0, so add 1
var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
// add the date to the form
$("#task-date").val(today);

// The API object contains methods for each kind of request we'll make
var API = {
    saveTask: function (task) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/tasks",
            data: JSON.stringify(task)
        });
    },
    getTasks: function () {
        return $.ajax({
            url: "api/tasks",
            type: "GET"
        });
    },
    deleteTask: function (id) {
        return $.ajax({
            url: "api/tasks/" + id,
            type: "DELETE"
        });
    }
};


function showChart(){
    $("#view-chart").tab("show");
};

// refreshTasks gets new examples from the db and repopulates the list
var refreshTasks = function () {
    API.getTasks().then(function (data) {
        var $tasks = data.map(function (task) {
            var $a = $("<a>")
                .text(task.id + " " + task.task_date + " " +  task.task_minutes + " " +  task.task_goal)
                .attr("href", "/task/" + task.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": task.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        $taskList.empty();
        $taskList.append($tasks);
        showChart();

    });
};

// handleFormSubmit is called whenever we submit a new task
// Save the new task to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault();

    var task = {
        task_date: $task_date.val(),
        task_minutes: $task_minutes.val().trim(),
        task_category: $task_category.val().trim(),
        task_goal: $task_goal.val().trim()
    };



    if (!(task.task_minutes && task.task_goal)) {
        alert("You must enter an task text and description!");
        return;
    }

    // console.log(task.task_date);

    API.saveTask(task).then(function () {
        refreshTasks();
    });

    // clear the form values
    $task_date.val("");
    $task_minutes.val("");
    $task_category.val("");
    $task_goal.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
        refreshTasks();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$taskList.on("click", ".delete", handleDeleteBtnClick);

// Stopwatch
class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    lap() {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    clear() {
        clearChildren(this.results);
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));