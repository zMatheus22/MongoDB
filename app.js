const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const linkRouter = require("./routes/linkRoute");
const path = require("path");

/* mongoose -> uma forma de connectar (Adicionar IP do Banco de Dados MongoDB)
mongoose.connect('mongodb://0.0.0.0:0/links', (error, db)=>{
    console.log(error);
    console.log(db);
})
*/

/* mongoose -> segunda forma de connectar (Adicionar IP do Banco de Dados MongoDB)
mongoose.connect('mongodb://0.0.0.0:0/links').then(db =>{
    console.log(db);
}).catch(error => {
    console.log(error);
})
*/

// mongoose -> terceira forma de connectar (Adicionar IP do Banco de Dados MongoDB)
mongoose.connect("mongodb://127.0.0.1:27017/newlinks");

const db = mongoose.connection;

db.on("error", () => {
  console.log("Hove um Erro na execução");
});
db.on("open", () => {
  console.log("Banco aberto!");
});
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

app.use("/", linkRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
