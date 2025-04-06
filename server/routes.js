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
  
  // GET /api/presentes - Lista todos os presentes
  router.get('/presentes', (req, res) => {
      db.all("SELECT * FROM presentes", (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(rows);
      });
  });
  
  // GET /api/reservas - Retorna IDs dos presentes reservados
  router.get('/reservas', (req, res) => {
      db.all("SELECT presente_id FROM reservas", (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          const reservas = rows.map(row => row.presente_id);
          res.json(reservas);
      });
  });
  
  // POST /api/reservar - Faz reserva de um presente
  router.post('/reservar', (req, res) => {
      const { id } = req.body;
      db.run("INSERT INTO reservas (presente_id) VALUES (?)", [id], function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true });
      });
  });
  
  // DELETE /api/reset - Reseta todas as reservas (protegido por senha)
  router.delete('/reset', (req, res) => {
      const authHeader = req.headers.authorization;
  
      const SENHA_VALIDA = "123456"; // ou use hash no futuro
  
      if (authHeader !== SENHA_VALIDA) {
          return res.status(403).json({ error: "Acesso não autorizado" });
      }
  
      db.run("DELETE FROM reservas", (err) => {
          if (err) return res.status(500).json({ error: err.message });
          db.run("VACUUM");
          res.json({ success: true });
      });
  });
  
  module.exports = router;
  
