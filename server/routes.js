const express = require('express');
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
  });
