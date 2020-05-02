import List from '../schemas/List';

class ListController {
  async index(req, res) {
    const documents = await List.find({ createdBy: req.userId });
    return res.json(documents);
  }

  async store(req, res) {
    req.body.createdBy = req.userId;
    try {
      const list = await List.create(req.body);
      return res.json(list);
    } catch (err) {
      return res.status(400).json({ error: 'Should have only one list name' });
    }
  }

  // async update(req, res) {}
}

export default new ListController();
