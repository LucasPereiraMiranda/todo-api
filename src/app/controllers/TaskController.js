import Task from '../schemas/Task';
import List from '../schemas/List';
import verifyIfObjectIsEmpty from '../../utils/verifyIfObjectIsEmpty';

class TaskController {
  async store(req, res) {
    const lists = await List.find({ _id: req.params.listId });

    const isEmpty = verifyIfObjectIsEmpty(lists);

    if (isEmpty) {
      return res.status(400).json({ message: 'List id does not exists' });
    }

    req.body.createdBy = req.userId;
    req.body.list = req.params.listId;

    try {
      const task = await Task.create(req.body);
      return res.json(task);
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Tasks does not can have repit name' });
    }
  }

  async update(req, res) {
    const tasks = await Task.find({
      _id: req.params.taskId,
      createdBy: req.userId,
      list: req.params.listId,
    });

    const isEmpty = verifyIfObjectIsEmpty(tasks);

    if (isEmpty) {
      return res.status(400).json({ message: 'task not found' });
    }

    req.body.createdBy = req.userId;
    req.body.list = req.params.listId;

    try {
      const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
        new: true,
      })
        .lean()
        .exec();
      return res.json(task);
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Task does not can have self name' });
    }
  }

  async delete(req, res) {
    const tasks = await Task.find({
      _id: req.params.taskId,
      list: req.params.listId,
      createdBy: req.userId,
    });

    const isEmpty = verifyIfObjectIsEmpty(tasks);

    if (isEmpty) {
      return res.status(400).json({ message: 'task not found' });
    }

    const removed = await Task.findOneAndRemove({
      createdBy: req.userId,
      _id: req.params.taskId,
    });

    return res.json(removed);
  }

  async index(req, res) {
    const tasks = await Task.find({
      createdBy: req.userId,
      list: req.params.listId,
    });
    return res.json(tasks);
  }
}

export default new TaskController();
