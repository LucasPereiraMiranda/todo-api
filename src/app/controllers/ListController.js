import List from '../schemas/List';
import verifyIfObjectIsEmpty from '../../utils/verifyIfObjectIsEmpty';

class ListController {
  async index(req, res) {
    const documents = await List.find({ createdBy: req.userId });
    return res.json(documents);
  }

  async show(req, res) {
    const list = await List.find({
      createdBy: req.userId,
      _id: req.params.id,
    });

    if (!list) {
      return res.status(400).json({ message: 'list not found' });
    }
    return res.json(list);
  }

  async store(req, res) {
    req.body.createdBy = req.userId;
    try {
      const list = await List.create(req.body);
      return res.json(list);
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Lists does not can have repeated name' });
    }
  }

  async update(req, res) {
    const listDocuments = await List.find({
      createdBy: req.userId,
      _id: req.params.id,
    });

    const isEmpty = verifyIfObjectIsEmpty(listDocuments);
    if (isEmpty) {
      return res.status(400).json({ message: 'list not found' });
    }

    try {
      const listUpdated = await List.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
        .lean()
        .exec();
      return res.json(listUpdated);
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Lists doesnt can have repeated name' });
    }
  }

  async delete(req, res) {
    const listDocuments = await List.find({
      createdBy: req.userId,
      _id: req.params.id,
    });
    const isEmpty = verifyIfObjectIsEmpty(listDocuments);
    if (isEmpty) {
      return res.status(400).json({ message: 'list not found' });
    }

    const listRemoved = await List.findOneAndRemove({
      createdBy: req.userId,
      _id: req.params.id,
    });

    return res.json(listRemoved);
  }
}

export default new ListController();
