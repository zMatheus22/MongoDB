const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  click: { type: Number, default: 0 },
});

module.exports = mongoose.model("Link", linkSchema);

// Salvar dados no Banco de Dados
/*
  let link = new Link({
    title:"Matheus",
    description:"Strada",
    url:"https://twitter.com/matheus_strada", 
    click:0
  })
  
  link.save().then(doc =>{
    console.log(doc);
  }).catch(err =>{
    console.log(err);
  })
  */
