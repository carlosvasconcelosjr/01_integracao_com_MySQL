//Requisição dos módulos
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

//Configurar o express para pegar o body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json()); //para capturar o body no formato Json

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//
app.use(express.static("public"));

// Rotas -----------------------------------------------------------------
app.get("/", (req, res) => {
  res.render("home");
});

// Rota para cadastrar contato
app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro/", (req, res) => {
  const nome = req.body.nome;
  const nick_name = req.body.nick_name;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const senha = req.body.senha;

  const sql = `INSERT INTO pessoas(nome, nick_name, email, telefone, senha) VALUES ('${nome}','${nick_name}', '${email}', '${telefone}', '${senha}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cadastro/");
    }
  });
});

// Rota para listar contato
app.get("/contatos", (req, res) => {
  const sql = "SELECT * FROM pessoas";
  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    } else {
      const contatos = data;
      console.log(contatos);

      res.render("contatos", { contatos });
    }
  });
});

// Rota para consultar de forma filtrada um contato
app.get("/consultar-contato/", (req, res) => {
  const cod = req.query.cod;

  const sql = `SELECT * FROM pessoas WHERE cod = ${cod}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    } else {
      const contato = data[0];
      console.log(contato);

      res.render("contato", { contato });
    }
  });
});

// Rota para consultar e selecionar um contato para edição
app.get("/contato-edicao/", (req, res) => {
  const cod = req.query.cod;

  const sql = `SELECT * FROM pessoas WHERE cod = ${cod}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    } else {
      const contato = data[0];
      console.log(contato);

      res.render("contato-edite", { contato });
    }
  });
});

// Rota para atualização da edição do contato
app.post("/contato-atualizacao/", (req, res) => {
  const cod = req.body.cod;
  const nome = req.body.nome;
  const nick_name = req.body.nick_name;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const senha = req.body.senha;

  const sql = `UPDATE pessoas SET nome = '${nome}', nick_name = '${nick_name}', email = '${email}', telefone = '${telefone}', senha = '${senha}' WHERE cod = ${cod} `;

  console.log(sql);

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    } else {
      const contato = data[0];
      console.log(contato);

      res.redirect("/");
    }
  });
});

// Rota para excluir um contato
app.post("/contato-exclusao/", (req, res) => {
  const cod = req.body.cod;

  const sql = `DELETE FROM pessoas WHERE cod = ${cod} `;

  console.log(sql);

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    } else {
      const contato = data[0];
      console.log(contato);

      res.redirect("/");
    }
  });
});
//-------------------------------------------------------------------------

// Conexão com o banco
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "suasenha",
  database: "contatos",
});

// Execução da conecxão
// Será necessário estabelecer a conexão a cada interação com o banco
conn.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Conexão estabelecida com sucesso! Servidor na porta: 7770");
    app.listen(7770);
  }
});
