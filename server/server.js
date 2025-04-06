/*const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./database');

// Crie a instância do router primeiro
const router = express.Router(); // <-- Adicione esta linha

// Depois adicione a rota de reset
router.delete('/reset', async (req, res) => {
    try {
        const db = require('./database').db;
        db.run("DELETE FROM reservas", (err) => {
            if (err) throw err;
            res.json({ success: true, message: "Todas as reservas foram apagadas!" });
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao resetar o banco de dados" });
    }
});

const app = express();
app.use(cors({
    origin: 'https://convite-digital-front.onrender.com'
  }));
const PORT = process.env.PORT || 3000;

// Configurações
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Use o router
app.use('/api', router); // <-- Esta linha deve vir depois de definir as rotas

// Rota fallback para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Inicialização
initializeDatabase();
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});*/

const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./database');
const rotas = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa o banco de dados
initializeDatabase();

// Configura CORS para permitir requisições do front-end
app.use(cors({
    origin: 'https://convite-digital-front.onrender.com' // Substitua pela URL correta do seu front
}));

// Permite trabalhar com JSON
app.use(express.json());

// Rotas da API
app.use('/api', rotas);

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../public')));

// Rota fallback para SPA (se necessário)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
