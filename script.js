// Aguarda o carregamento completo do DOM (estrutura da página)
document.addEventListener('DOMContentLoaded', () => {

    // --- Código para a animação de 'fade-in' ---
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    cards.forEach(card => {
        observer.observe(card);
    });

    // --- Código para renderizar os gráficos interativos ---
    // Renderiza o gráfico de Voos por Companhia Aérea
    async function renderizarGrafico(id, dadosUrl, titulo, xTitle, yTitle) {
        try {
            const response = await fetch(dadosUrl);
            const data = await response.json();

            const plotData = [{
                x: data.labels,
                y: data.values,
                type: 'bar',
                marker: { color: '#00e4ff' }
            }];

            const layout = {
                title: titulo,
                paper_bgcolor: '#1a1b2d',
                plot_bgcolor: '#1a1b2d',
                font: { color: '#f0f2f5' },
                xaxis: { title: xTitle, automargin: true },
                yaxis: { title: yTitle, automargin: true }
            };

            Plotly.newPlot(id, plotData, layout);

        } catch (error) {
            console.error('Erro ao carregar ou renderizar o gráfico:', dadosUrl, error);
        }
    }

    // Chama as funções para renderizar todos os gráficos
    renderizarGrafico(
        'voos-compainha-plot',
        './assets/voos_por_companhia.json',
        'Voos por Companhia Aérea',
        'Companhia Aérea',
        'Número de Voos'
    );

    renderizarGrafico(
        'voo-aeronave-plot',
        './assets/voos_por_aeronave.json',
        'Voos por Aeronave',
        'Tipo de Aeronave',
        'Número de Voos'
    );

    renderizarGrafico(
        'top-10-plot',
        './assets/top_10_atrasos.json',
        'Top 10 Atrasos por Tipo de Aeronave',
        'Tipo de Aeronave',
        'Atraso Médio (min)'
    );

});