const sequelize = require("sequelize");
const { Category, User, Todo } = require("../../models");

exports.getTodos = async (req, res) => {
  const { done } = req.query;
  try {
    if (done && done != 2) {
      const todos = await Todo.findAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        where: {
          isDone: done == 1 ? true : false,
        },
        attributes: {
          exclude: ["categoryId", "createdAt", "updatedAt"],
        },
      });

      return res.send({
        message: `Todos loaded successfully`,
        data: {
          todos,
        },
      });
    }
    const todos = await Todo.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["categoryId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: `Todos loaded successfully`,
      data: {
        todos,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.addTodos = async (req, res) => {
  try {
    const todos = await Todo.create(req.body);
    if (todos) {
      const todosResult = await Todo.findOne({
        where: {
          id: todos.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: `Todos successfully created`,
        data: {
          todo: todosResult,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await Todo.update(req.body, {
      where: {
        id,
      },
    });

    if (todos) {
      const todosResult = await Todo.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: `Todo with id ${id} successfully edited`,
        data: {
          todo: todosResult,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({
      where: {
        id,
      },
    });

    res.send({
      message: `Todo with id ${id} successfully deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};
