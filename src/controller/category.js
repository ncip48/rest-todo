const sequelize = require("sequelize");
const { Category, User, Todo } = require("../../models");

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Todo,
          as: "todos",
          attributes: {
            exclude: ["id", "categoryId", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["workerId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: `Category loaded successfully`,
      data: {
        categories,
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

exports.getCategoryTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.query;

    if (done && done != 2) {
      const todos = await Todo.findAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["categoryId", "createdAt", "updatedAt"],
            },
          },
        ],
        where: {
          categoryId: id,
          isDone: done,
        },
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["categoryId", "createdAt", "updatedAt"],
        },
      });

      const category = await Category.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["categoryId", "createdAt", "updatedAt"],
        },
      });

      return res.send({
        message: `Category with id ${id} loaded successfully`,
        data: {
          todos,
          category,
        },
      });
    }

    const todos = await Todo.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["categoryId", "createdAt", "updatedAt"],
          },
        },
      ],
      where: {
        categoryId: id,
      },
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["categoryId", "createdAt", "updatedAt"],
      },
    });

    const category = await Category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["categoryId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: `Category with id ${id} loaded successfully`,
      data: {
        todos,
        category,
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
