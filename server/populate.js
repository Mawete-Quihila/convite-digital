const { db } = require('./database');

const presentes = [
    "Jogo de pratos fundos e rasos",
    "Jogo de pratos e copos de sobremesa",
    "Pirex",
    "Boleiro de vidro",
    "Jarra de vidro",
    "Mexerico e banco",
    "Conjunto de utensílios de silicone",
    "Petisqueiras",
    "Conjunto de Tigelas de vidro",
    "Conjunto de tigelas de plástico",
    "Cafeteira",
    "Potes herméticos",
    "Jogo de Chávenas",
    "Jogo de panelas normais",
    "Travessas para o forno",
    "Banheiras e Ralador",
    "Galiteiro",
    "Escorredor de massa, Fué e Descascador",
    "Doceira ou Bomboneira",
    "Porta tempero",
    "Panela de pressão",
    "Garrafa térmica",
    "Caixa de pão",
    "Caixa de Taças",
    "Fogareiro",
    "Copos",
    "Jogo de Tigelas térmicas",
    "Avental, Pegas e Pano de louça",
    "Toalha de mesa e corredor de mesa",
    "Bases ou jogo americano",
    "Botija de gás",
    "Tostadeira",
    "Liquidificador",
    "Varinha mágica",
    "Batedeira",
    "Processador",
    "Jarra elétrica",
    "Fritadeira",
    "Forno elétrico",
    "Microondas",
    "Air Fryer",
    "Conjunto de toalhas",
    "Jogo de wc",
    "Conjunto de tapetes",
    "Cestos organizadores",
    "Molas qb e cesto para molas",
    "Cestos para roupa suja e limpa",
    "Potes para detergentes",
    "Cestos organizadores",
    "Banheira para lavar roupa",
    "Vassoura (1), Esfregona (1) e Pá (1)",
    "Tapete para porta da entrada",
    "Jogo de lençóis",
    "Vasos",
    "Colcha",
    "Manta",
    "Coberta",
    "Endredão",
    "Coberta",
    "Colcha"
];

db.serialize(() => {
    const stmt = db.prepare("INSERT INTO presentes (nome) VALUES (?)");

    presentes.forEach(nome => {
        stmt.run(nome);
    });

    stmt.finalize(() => {
        console.log("✅ Presentes inseridos com sucesso!");
        db.close();
    });
});
