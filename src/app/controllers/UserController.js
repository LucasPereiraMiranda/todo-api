import User from '../schemas/User';
import File from '../schemas/File';

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
    if (req.body.email !== user.email) {
      return res.status(400).json({ error: 'not is possible change email' });
    }

    const match = await user.checkPassword(req.body.oldPassword);

    if (!match) {
      return res.status(401).json({ error: 'password does not match' });
    }

    // atualize o usuario
    const { _id, name, email, birthday } = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return res.json({
      _id,
      name,
      email,
      birthday,
    });
  }

  async show(req, res) {
    const { _id, name, email, birthday, avatar_id } = await User.findById({
      _id: req.userId,
    });
    try {
      // avatar pode ser undefined (quando no temos um padrao)
      // nessa situação, devemos enviar um avatar padrão
      const { url, name: file_name, path } = await File.findById({
        _id: avatar_id,
      });
      return res.json({
        user: {
          _id,
          name,
          email,
          birthday,
        },
        avatar: {
          file_name,
          path,
          url,
        },
      });
    } catch (err) {
      const url = 'https://gravatar.com/avatar/?d=mm';
      const file_name = 'default photo by gravatar';
      const path = 'www.gravatar.com/';
      return res.json({
        user: {
          _id,
          name,
          email,
          birthday,
        },
        avatar: {
          file_name,
          path,
          url,
        },
      });
    }
  }
}

export default new UserController();
