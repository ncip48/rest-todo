const express = require("express");
const router = express.Router();

const { getCategory, getCategoryTodos } = require("../controller/category");

const {
  getTodos,
  addTodos,
  updateTodos,
  deleteTodo,
} = require("../controller/todo");

// const { authenticated } = require("../middleware/authentication");

router.get("/categories", getCategory).get("/category/:id", getCategoryTodos);
router
  .get("/todos", getTodos)
  .post("/todos", addTodos)
  .patch("/todos/:id", updateTodos)
  .delete("/todos/:id", deleteTodo);

module.exports = router;
