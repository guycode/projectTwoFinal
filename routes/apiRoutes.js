var db = require("../models");

module.exports = function (app) {
    // Get all examples

    // GET route for getting all of the tasks
    app.get("/api/tasks", function(req, res) {
      // findAll returns all entries for a table when used with no options
      db.tasks.findAll({}).then(function(dbTasks) {
        // We have access to the tasks as an argument inside of the callback function
        res.json(dbTasks);
      });
    });

    // Create a new task
    app.post("/api/tasks", function (req, res) {
        db.tasks.create(req.body).then(function (dbTask) {
            res.json(dbTask);
        });
    });
    // task_date, task_minutes, task_category, task_goal
    // Delete an example by id
    app.delete("/api/tasks/:id", function (req, res) {
        db.tasks.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbExample) {
            res.json(dbExample);
        });
    });
};