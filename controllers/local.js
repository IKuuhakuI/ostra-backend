const Local = require('../models/Local');

const createLocal = async (req, res) => {
  const { name, description, location } = req.body;

  try {
    const newLocal = new Local({
      name,
      description,
      location,
    });

    const savedLocal = await newLocal.save();
    res.status(201).json(savedLocal);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar Local');
  }
};

const getLocals = async (req, res) => {
  try {
    const locals = await Local.find().select('-feedbacks');
    res.status(200).json(locals);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar Locals');
  }
};

const getLocalById = async (req, res) => {
  try {
    const local = await Local.findById(req.params.id).populate('feedbacks.user', 'name');
    if (!local) {
      return res.status(404).send('Local não encontrado');
    }
    res.status(200).json(local);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar Local');
  }
};

const addFeedback = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const local = await Local.findById(req.params.id);
    if (!local) {
      return res.status(404).send('Local não encontrado');
    }

    const alreadyReviewed = local.feedbacks.find(
      (feedback) => feedback.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).send('Você já avaliou este local');
    }

    const newFeedback = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    local.feedbacks.push(newFeedback);

    local.calculateAverageRating();

    await local.save();

    res.status(201).json({ message: 'Feedback adicionado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar feedback');
  }
};

module.exports = {
  createLocal,
  getLocals,
  getLocalById,
  addFeedback,
};
