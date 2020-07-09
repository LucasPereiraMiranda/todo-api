class WelcomeController {
  async index(req, res) {
    return res.json({
      title: 'bem-vindo a api de listas de tarefas - todolist: )',
      message:
        'crie um usuário na rota /users e se autentique para aproveitar 100% dos recursos providos pela todo-api',
    });
  }
}

export default new WelcomeController();
