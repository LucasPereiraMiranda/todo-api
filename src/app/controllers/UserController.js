import User from '../schemas/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exist' });
    }

    const { name, email, birthday } = await User.create(req.body);

    return res.json({ name, email, birthday });
  }

  async update(req, res) {
    const { name, email } = await User.findOne({ email: req.body.email });
    console.log(name, email);
    return res.json(req.body);
  }
}

export default new UserController();
