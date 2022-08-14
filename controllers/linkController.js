const Link = require("../models/Link");

//Resposta do Banco de Dados, ele vai mandar para a 'url', a que foi 'digitada' na (/'url').
const redirect = async (req, res, next) => {
  let title = req.params.title;
  try {
    let doc = await Link.findOneAndUpdate({ title }, { $inc: { click: 1 } });
    if (doc) {
      res.redirect(doc.url);
    } else {
      next();
    }
  } catch (error) {
    res.send(error);
  }
};

// Adicionar link no Banco (method:'post')
const addLink = async (req, res) => {
  let link = new Link(req.body);

  try {
    let documen = await link.save();
    // res.send("Link adicionado com sucesso!");
    res.redirect("/");
  } catch (error) {
    res.render("add", { error, body: req.body });
  }
};

// Lista dos links no Banco
const allLinks = async (req, res) => {
  try {
    let docs = await Link.find({});
    res.render("all", { links: docs });
  } catch (err) {
    console.log(err);
  }
};

//Deleta um poste (Link) do Banco
const deleteLink = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  try {
    await Link.findByIdAndDelete(id);
    // res.send(id);
    res.redirect("/");
  } catch (err) {
    res.status(404).send(err);
  }
};

const loadLink = async (req, res) => {
  let id = req.params.id;

  try {
    let docs = await Link.findById(id);
    res.render("edit", { error: false, body: docs });
  } catch (error) {
    console.log(error);
  }
};

const editLink = async (req, res) => {
  let link = {};
  link.title = req.body.title;
  link.description = req.body.description;
  link.url = req.body.url;

  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  try {
    await Link.updateOne({ _id: id }, link);
    res.redirect("/");
  } catch (error) {
    res.render("edit", { error, body: req.body });
  }
};

module.exports = {
  redirect,
  addLink,
  allLinks,
  deleteLink,
  loadLink,
  editLink,
};
