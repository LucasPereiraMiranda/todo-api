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
    // busca o usuario com o id autenticado na aplicacao
    const user = await User.findById({ _id: req.userId });

    // verifica se o email e diferente igual ao atual
    if (req.body.email === user.mail) {
      return res.status(400).json({ error: 'not is possible change email' });
    }

    const match = await user.checkPassword(req.body.oldPassword);
    console.log(req.body.oldPassword);
    console.log(match);
    if (req.body.oldPassword && !match) {
      res.status(401).json({ error: 'password does not match' });
    }

    console.log('cheguei');
    // atualize o usuario
    const { _id, name, birthday, email } = await User.findByIdAndUpdate(
      req.userId,
      {
        name: req.body.name,
        email: req.body.email,
        birthday: req.body.birthday,
        password: req.body.newPassword,
      },
      {
        new: true,
      }
    )
      .lean()
      .exec();
    console.log();
    console.log();
    console.log();
    console.log(_id);
    console.log(name);
    console.log(birthday);
    console.log(email);
    console.log();
    console.log();
    console.log();
    return res.json({
      _id,
      name,
      email,
      birthday,
    });
  }
}

export default new UserController();
