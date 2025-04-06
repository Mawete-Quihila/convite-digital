/*const express = require('express');
const router = express.Router();
const { db } = require('./database');

// Rota para listar presentes
router.get('/presentes', (req, res) => {
    db.all("SELECT * FROM presentes", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;

router.delete('/reset', (req, res) => {
    const authHeader = req.headers.authorization;
    
    // Senha criptografada (use SHA-256 no frontend em produção)
    const SENHA_VALIDA = "hash_da_sua_senha"; 
  
    if (authHeader !== SENHA_VALIDA) {
      return res.status(403).json({ error: "Acesso não autorizado" });
    }
  
    db.run("DELETE FROM reservas", (err) => {
      if (err) return res.status(500).json({ error: err.message });
      db.run("VACUUM"); // Otimiza o banco após reset
      res.json({ success: true });
    });
  });





  const express = require('express');
  const { initializeDatabase, resetReservas } = require('./database');
  const app = express();
  const PORT = 3000;
  
  initializeDatabase();
  
  app.get('/resetar-reservas', (req, res) => {
      resetReservas();
      res.send('Todas as reservas foram resetadas com sucesso.');
  });
  
  app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
  });*/
  const express = require('express');
  const router = express.Router();
  const { db } = require('./database');
  
  // Listar todos os presentes
  router.get('/presentes', (req, res) => {
      db.all("SELECT * FROM presentes", (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(rows);
      });
  });
  
  // Fazer uma reserva
  router.post('/reservar', (req, res) => {
      const { presente_id } = req.body;
  
      if (!presente_id) {
          return res.status(400).json({ error: 'ID do presente é obrigatório.' });
      }
  
      // Verifica se o presente já foi reservado
      db.get("SELECT * FROM reservas WHERE presente_id = ?", [presente_id], (err, row) => {
          if (err) return res.status(500).json({ error: err.message });
  
          if (row) {
              return res.status(409).json({ error: 'Presente já foi reservado.' });
          }
  
          db.run("INSERT INTO reservas (presente_id, nome_convidado) VALUES (?, ?)", [presente_id, "Anônimo"], function (err) {
              if (err) return res.status(500).json({ error: err.message });
              res.json({ success: true, reserva_id: this.lastID });
          });
      });
  });
  
  // Listar presentes já reservados
  router.get('/reservas', (req, res) => {
      db.all("SELECT presente_id FROM reservas", (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(rows);
      });
  });
  
  // Resetar todas as reservas (com autenticação simples via header)
  router.delete('/reset', (req, res) => {
      const authHeader = req.headers.authorization;
      const SENHA_VALIDA = "minha-senha-super-secreta"; // Substitua por uma senha mais segura
  
      if (authHeader !== SENHA_VALIDA) {
          return res.status(403).json({ error: "Acesso não autorizado." });
      }
  
      db.run("DELETE FROM reservas", (err) => {
          if (err) return res.status(500).json({ error: err.message });
  
          db.run("VACUUM"); // Opcional, otimiza o banco
          res.json({ success: true, message: "Reservas resetadas com sucesso." });
      });
  });
  
  module.exports = router;
  
