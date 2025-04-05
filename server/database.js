const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(DB_PATH);

// Funções para inicializar e interagir com o banco
function initializeDatabase() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS presentes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS reservas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            presente_id INTEGER NOT NULL,
            nome_convidado TEXT NOT NULL,
            data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (presente_id) REFERENCES presentes(id)
        )`);
    });
}

function resetReservas() {
    db.run(`DELETE FROM reservas`, (err) => {
        if (err) {
            console.error('Erro ao resetar reservas:', err.message);
        } else {
            console.log('Todas as reservas foram resetadas com sucesso.');
        }
    });
}


module.exports = {
    db,
    initializeDatabase,
    resetReservas
};

