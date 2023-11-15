$(document).ready(function () {
    // Faz uma requisição AJAX para obter o número total de usuários
    $.ajax({
        url: 'dados.php',
        type: 'GET',
        data: { tipo: 'totalUsuarios' },
        success: function (response) {
            console.log(response); 
            $('#numeroTotalUsuarios').text(response);
        }
    });

    // Faz uma requisição AJAX para obter a contagem de usuários ativos e inativos
    $.ajax({
        url: 'dados.php',
        type: 'GET',
        data: { tipo: 'statusUsuarios' },
        success: function (response) {
            console.log(response);  // Adicionando esta linha para visualizar a resposta
            criarGraficoStatus(response);
        }
    });

    // Faz uma requisição AJAX para obter a distribuição das ferramentas
    $.ajax({
        url: 'dados.php',
        type: 'GET',
        data: { tipo: 'ferramentasUsuarios' },
        success: function (response) {
            console.log(response);  // Adicionando esta linha para visualizar a resposta
            criarGraficoFerramentas(response);
        }
    });
});

function criarGraficoStatus(dados) {
    console.log('Dados Status:', dados);

    try {
        var parsedData = JSON.parse(dados);
        console.log('Dados Status (parsed):', parsedData);
    } catch (error) {
        console.error('Erro ao fazer o parse dos dados:', error);
    }

    var ctx = document.getElementById('graficoStatus').getContext('2d');
    var grafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Ativos', 'Inativos'],
            datasets: [{
                data: [parsedData.Ativos, parsedData.Inativos],
                backgroundColor: ['#28a745', '#dc3545'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function criarGraficoFerramentas(dados) {
    var labels = dados.map(function(item) {
        return item.ferramenta;
    });

    var valores = dados.map(function(item) {
        return item.quantidade;
    });

    var ctx = document.getElementById('graficoFerramentas').getContext('2d');
    var grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade de Usuários',
                data: valores,
                backgroundColor: ['#007bff', '#28a745', '#ffc107'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
                xAxes: [{
                    barPercentage: 0.4,
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
}