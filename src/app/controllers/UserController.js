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
    const { email, oldPassword } = await User.findOne({
      email: req.body.email,
    });

    // busca o usuario com o id autenticado na aplicacao
    const user = await User.findById({ _id: req.userId });

    // verifica se o email e diferente do que
    // ja existia, se sim, verifique se ja ha um usuario com esse email
    if (email !== user.mail) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(400)
          .json({ error: 'User with this email already exists' });
      }
    }

    if (!(await user.checkPassword(oldPassword)) && oldPassword) {
      res.status(401).json({ error: 'password does not match' });
    }

    // atualize o usuario
    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
