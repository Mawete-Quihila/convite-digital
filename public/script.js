document.addEventListener('DOMContentLoaded', function () {
    // Elementos da DOM
    const paginaInicial = document.getElementById('pagina-inicial');
    const listaPresentes = document.getElementById('lista-presentes');
    const btnListaPresentes = document.getElementById('btn-lista-presentes');
    const btnVoltar = document.getElementById('btn-voltar');
    const containerPresentes = document.getElementById('container-presentes');
    const infoReserva = document.getElementById('info-reserva');
    const API_URL = 'https://convite-digital-api.onrender.com';

    const presentes = [
        { id: 1, nome: "Jogo de pratos fundos e rasos" },
        { id: 2, nome: "Jogo de pratos e copos de sobremesa" },
        { id: 3, nome: "Pirex " },
        { id: 4, nome: "Boleiro de vidro " },
        { id: 5, nome: "Jarra de vidro" },
        { id: 6, nome: "Mexerico e banco" },
        { id: 7, nome: "Conjunto de utensílios de silicone" },
        { id: 8, nome: "Petisqueiras" },
        { id: 9, nome: "Conjunto de Tigelas de vidro" },
        { id: 10, nome: "Conjunto de tigelas de plástico" },
        { id: 11, nome: "Cafeteira " },
        { id: 12, nome: "Potes herméticos" },
        { id: 13, nome: "Jogo de Chávenas" },
        { id: 14, nome: "Jogo de panelas normais" },
        { id: 15, nome: "Travessas para o forno" },
        { id: 16, nome: "Banheiras e Ralador" },
        { id: 17, nome: "Galiteiro" },
        { id: 18, nome: "Escorredor de massa, Fué e Descascador" },
        { id: 19, nome: "Doceira ou Bomboneira" },
        { id: 20, nome: "Porta tempero" },
        { id: 21, nome: "Panela de pressão" },
        { id: 22, nome: "Garrafa térmica " },
        { id: 23, nome: "Caixa de pão" },
        { id: 24, nome: "Caixa de Taças" },
        { id: 25, nome: "Fogareiro" },
        { id: 26, nome: "Copos" },
        { id: 27, nome: "Jogo de Tigelas térmicas" },
        { id: 28, nome: "Avental, Pegas e Pano de louça" },
        { id: 29, nome: "Toalha de mesa e corredor de mesa" },
        { id: 30, nome: "Bases ou jogo americano" },
        { id: 31, nome: "Botija de gás" },
        { id: 32, nome: "Tostadeira" },
        { id: 33, nome: "Liquidificador" },
        { id: 34, nome: "Varinha mágica" },
        { id: 35, nome: "Batedeira" },
        { id: 36, nome: "Processador" },
        { id: 37, nome: "Jarra elétrica" },
        { id: 38, nome: "Fritadeira" },
        { id: 39, nome: "Forno elétrico" },
        { id: 40, nome: "Microondas" },
        { id: 41, nome: "Air Fryer" },
        { id: 42, nome: "Conjunto de toalhas " },
        { id: 43, nome: "Jogo de wc" },
        { id: 44, nome: "Conjunto de tapetes" },
        { id: 45, nome: "Cestos organizadores" },
        { id: 46, nome: "Molas qb e cesto para molas" },
        { id: 47, nome: "Cestos para roupa suja e limpa" },
        { id: 48, nome: "Potes para detergentes" },
        { id: 49, nome: "Cestos organizadores" },
        { id: 50, nome: "Banheira para lavar roupa" },
        { id: 51, nome: "Vassoura (1), Esfregona (1) e Pá (1)" },
        { id: 52, nome: "Tapete para porta da entrada" },
        { id: 53, nome: "Jogo de lençóis" },
        { id: 54, nome: "Vasos" },
        { id: 55, nome: "Colcha" },
        { id: 56, nome: "Manta" },
        { id: 57, nome: "Coberta" },
        { id: 58, nome: "Endredão" },
        { id: 59, nome: "Coberta" },
        { id: 60, nome: "Colcha" }
    ];

    let reservas = [];

    async function carregarReservas() {
        try {
            const response = await fetch(`${API_URL}/api/reservas`);
            const data = await response.json();
            reservas = data.map(r => r.presente_id);
            carregarListaPresentes();
            atualizarInfoReserva();
        } catch (error) {
            console.error('Erro ao carregar reservas:', error);
        }
    }

    async function reservarPresente(id) {
        if (reservas.includes(id)) return;

        try {
            const response = await fetch(`${API_URL}/api/reservar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ presente_id: id, nome_convidado: "Anônimo" })
            });

            if (response.ok) {
                reservas.push(id);
                carregarListaPresentes();
                atualizarInfoReserva();
            } else {
                console.error('Erro ao reservar presente:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao enviar reserva:', error);
        }
    }

    function mostrarPaginaInicial() {
        listaPresentes.classList.add('escondido');
        paginaInicial.classList.remove('escondido');
    }

    function mostrarListaPresentes() {
        paginaInicial.classList.add('escondido');
        listaPresentes.classList.remove('escondido');
        carregarListaPresentes();
        atualizarInfoReserva();
    }

    function carregarListaPresentes() {
        containerPresentes.innerHTML = '';

        presentes.forEach(presente => {
            const item = document.createElement('div');
            item.className = 'item-presente';
            item.dataset.id = presente.id;

            if (reservas.includes(presente.id)) {
                item.classList.add('reservado');
            }

            item.innerHTML = `
                <div class="nome-presente">${presente.nome}</div>
            `;

            item.addEventListener('click', () => reservarPresente(presente.id));
            containerPresentes.appendChild(item);
        });
    }

    function atualizarInfoReserva() {
        const count = reservas.length;
        const total = presentes.length;

        if (count === 0) {
            infoReserva.textContent = "Nenhum presente reservado ainda";
        } else if (count === total) {
            infoReserva.textContent = "Todos os presentes já foram reservados!";
        } else {
            infoReserva.textContent = `${count} de ${total} presentes reservados`;
        }
    }

    // Eventos de clique
    btnListaPresentes.addEventListener('click', mostrarListaPresentes);
    btnVoltar.addEventListener('click', mostrarPaginaInicial);

    // Inicialização
    carregarReservas();
});

/*document.addEventListener('DOMContentLoaded', function () {
    const paginaInicial = document.getElementById('pagina-inicial');
    const listaPresentes = document.getElementById('lista-presentes');
    const btnListaPresentes = document.getElementById('btn-lista-presentes');
    const btnVoltar = document.getElementById('btn-voltar');
    const containerPresentes = document.getElementById('container-presentes');
    const infoReserva = document.getElementById('info-reserva');

    const API_URL = 'https://convite-digital-api.onrender.com/api';

    let presentes = [ { id: 1, nome: "Jogo de pratos fundos e rasos" },
        { id: 2, nome: "Jogo de pratos e copos de sobremesa" },
        { id: 3, nome: "Pirex " },
        { id: 4, nome: "Boleiro de vidro " },
        { id: 5, nome: "Jarra de vidro" },
        { id: 6, nome: "Mexerico e banco" },
        { id: 7, nome: "Conjunto de utensílios de silicone" },
        { id: 8, nome: "Petisqueiras" },
        { id: 9, nome: "Conjunto de Tigelas de vidro" },
        { id: 10, nome: "Conjunto de tigelas de plástico" },
        { id: 11, nome: "Cafeteira " },
        { id: 12, nome: "Potes herméticos" },
        { id: 13, nome: "Jogo de Chávenas" },
        { id: 14, nome: "Jogo de panelas normais" },
        { id: 15, nome: "Travessas para o forno" },
        { id: 16, nome: "Banheiras e Ralador" },
        { id: 17, nome: "Galiteiro" },
        { id: 18, nome: "Escorredor de massa, Fué e Descascador" },
        { id: 19, nome: "Doceira ou Bomboneira" },
        { id: 20, nome: "Porta tempero" },
        { id: 21, nome: "Panela de pressão" },
        { id: 22, nome: "Garrafa térmica " },
        { id: 23, nome: "Caixa de pão" },
        { id: 24, nome: "Caixa de Taças" },
        { id: 25, nome: "Fogareiro" },
        { id: 26, nome: "Copos" },
        { id: 27, nome: "Jogo de Tigelas térmicas" },
        { id: 28, nome: "Avental, Pegas e Pano de louça" },
        { id: 29, nome: "Toalha de mesa e corredor de mesa" },
        { id: 30, nome: "Bases ou jogo americano" },
        { id: 31, nome: "Botija de gás" },
        { id: 32, nome: "Tostadeira" },
        { id: 33, nome: "Liquidificador" },
        { id: 34, nome: "Varinha mágica" },
        { id: 35, nome: "Batedeira" },
        { id: 36, nome: "Processador" },
        { id: 37, nome: "Jarra elétrica" },
        { id: 38, nome: "Fritadeira" },
        { id: 39, nome: "Forno elétrico" },
        { id: 40, nome: "Microondas" },
        { id: 41, nome: "Air Fryer" },
        { id: 42, nome: "Conjunto de toalhas " },
        { id: 43, nome: "Jogo de wc" },
        { id: 44, nome: "Conjunto de tapetes" },
        { id: 45, nome: "Cestos organizadores" },
        { id: 46, nome: "Molas qb e cesto para molas" },
        { id: 47, nome: "Cestos para roupa suja e limpa" },
        { id: 48, nome: "Potes para detergentes" },
        { id: 49, nome: "Cestos organizadores" },
        { id: 50, nome: "Banheira para lavar roupa" },
        { id: 51, nome: "Vassoura (1), Esfregona (1) e Pá (1)" },
        { id: 52, nome: "Tapete para porta da entrada" },
        { id: 53, nome: "Jogo de lençóis" },
        { id: 54, nome: "Vasos" },
        { id: 55, nome: "Colcha" },
        { id: 56, nome: "Manta" },
        { id: 57, nome: "Coberta" },
        { id: 58, nome: "Endredão" },
        { id: 59, nome: "Coberta" },
        { id: 60, nome: "Colcha" }];
    let reservas = [];

    async function carregarPresentes() {
        try {
            const res = await fetch(`${API_URL}/presentes`);
            presentes = await res.json();
        } catch (error) {
            console.error('Erro ao carregar presentes:', error);
        }
    }

    async function carregarReservas() {
        try {
            const res = await fetch(`${API_URL}/reservas`);
            const data = await res.json();
            reservas = data.map(r => r.presente_id);
        } catch (error) {
            console.error('Erro ao carregar reservas:', error);
        }
    }

    async function reservarPresente(id) {
        if (reservas.includes(id)) return;

        try {
            const response = await fetch(`${API_URL}/reservar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ presente_id: id })
            });

            if (response.ok) {
                reservas.push(id);
                carregarListaPresentes();
                atualizarInfoReserva();
            } else {
                const errorText = await response.text();
                console.error('Erro ao reservar presente:', errorText);
            }
        } catch (error) {
            console.error('Erro ao enviar reserva:', error);
        }
    }

    function mostrarPaginaInicial() {
        listaPresentes.classList.add('escondido');
        paginaInicial.classList.remove('escondido');
    }

    function mostrarListaPresentes() {
        paginaInicial.classList.add('escondido');
        listaPresentes.classList.remove('escondido');
        carregarListaPresentes();
        atualizarInfoReserva();
    }

    function carregarListaPresentes() {
        containerPresentes.innerHTML = '';

        presentes.forEach(presente => {
            const item = document.createElement('div');
            item.className = 'item-presente';
            item.dataset.id = presente.id;

            if (reservas.includes(presente.id)) {
                item.classList.add('reservado');
            }

            item.innerHTML = `<div class="nome-presente">${presente.nome}</div>`;

            item.addEventListener('click', () => reservarPresente(presente.id));
            containerPresentes.appendChild(item);
        });
    }

    function atualizarInfoReserva() {
        const count = reservas.length;
        const total = presentes.length;

        if (count === 0) {
            infoReserva.textContent = "Nenhum presente reservado ainda";
        } else if (count === total) {
            infoReserva.textContent = "Todos os presentes já foram reservados!";
        } else {
            infoReserva.textContent = `${count} de ${total} presentes reservados`;
        }
    }

    // Eventos
    btnListaPresentes.addEventListener('click', async () => {
        await carregarPresentes();
        await carregarReservas();
        mostrarListaPresentes();
    });

    btnVoltar.addEventListener('click', mostrarPaginaInicial);

    // Inicialização
    carregarPresentes().then(() => {
        carregarReservas().then(() => {
            atualizarInfoReserva();
        });
    });
});*/

