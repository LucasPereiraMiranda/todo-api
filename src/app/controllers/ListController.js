import List from '../schemas/List';

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
      return res.status.json({ message: 'list not found' });
    }

    return res.json(list);
  }

  async store(req, res) {
    req.body.createdBy = req.userId;
    try {
      const list = await List.create(req.body);
      return res.json(list);
    } catch (err) {
      return res.status(400).json({ error: 'Lists doesnt can have self name' });
    }
  }

  async update(req, res) {
    const listDocuments = await List.find({
      createdBy: req.userId,
      _id: req.params.id,
    });

    if (!listDocuments) {
      return res.status.json({ message: 'list not found' });
    }

    try {
      const list = await List.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      return res.json(list);
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Lists doesnt can have self name' });
    }
  }

  async delete(req, res) {
    const list = await List.find({
      createdBy: req.userId,
      _id: req.params.id,
    });

    if (!list) {
      return res.status.json({ message: 'list not found' });
    }

    const removed = await List.findOneAndRemove({
      createdBy: req.userId,
      _id: req.params.id,
    });

    return res.json(removed);
  }
}

export default new ListController();
