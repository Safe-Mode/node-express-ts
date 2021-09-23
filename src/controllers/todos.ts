import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random(), text);

  TODOS.push(newTodo);

  res
      .status(201)
      .json({
        message: 'The Todo has been created.',
        createdTodo: newTodo
      });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res
      .status(201)
      .json({ TODOS });
};

export const updateTodo: RequestHandler = (req, res, next) => {
  const reqTodo = TODOS.find((todo) => (todo.id === +req.params.id));

  if (!reqTodo) {
    throw new Error('Could not find Todo!');
  }

  reqTodo.text = req.body.text;

  res.json({
    message: 'The Todo has been updated!',
    updatedTodo: reqTodo
  });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoIndex = TODOS.findIndex((todo) => (todo.id === +req.params.id));

  if (todoIndex === -1) {
    throw new Error('Could not find Todo!');
  }

  TODOS.splice(todoIndex, 1);
  res.json('The Todo has been deleted!');
};
