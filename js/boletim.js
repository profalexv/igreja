let atual = 0;
let carrosselInterval;

// Variável para rastrear se o usuário já rolou a página
let usuarioRolou = false;

// Função para controlar a visibilidade dos botões flutuantes
function toggleNavigationButtons() {
    if (window.innerWidth > 900) return; // Não executa em telas grandes

    const agendaBtn = document.querySelector('.agenda-btn');
    const topoBtn = document.querySelector('.topo-btn');
    const agendaContainer = document.querySelector('.agenda-container');

    if (!agendaBtn || !topoBtn || !agendaContainer) return;

    const rect = agendaContainer.getBoundingClientRect();
    const isAgendaVisible = rect.top < 150; // Agenda começa a aparecer

    // Controla visibilidade dos botões
    agendaBtn.classList.toggle('hidden', isAgendaVisible);
    topoBtn.classList.toggle('hidden', !isAgendaVisible);
}

// Função para rolar até o topo
function scrollToTopo() {
    const carrossel = document.querySelector('.carrossel');
    if (carrossel) {
        carrossel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Adicionar listener para detectar quando o usuário rola a página
window.addEventListener('scroll', () => {
    usuarioRolou = true;
    toggleNavigationButtons();
});

// Também verificar quando a janela é redimensionada
window.addEventListener('resize', toggleNavigationButtons);

function mostrarImagem(n) {
    const imgs = document.querySelectorAll('.carrossel-img');
    atual = (n + imgs.length) % imgs.length;
    imgs.forEach((img, i) => img.classList.toggle('ativa', i === atual));

    // Se estiver em tela pequena e o usuário já rolou a página antes
    if (window.innerWidth <= 900 && usuarioRolou) {
        const agendaContainer = document.querySelector('.agenda-container');
        if (agendaContainer) {
            const rect = agendaContainer.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // Só rola se o usuário já tiver rolado além do carrossel
            if (scrollY > viewportHeight / 2) {
                sideDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
}

function mudarImagem(delta) {
    mostrarImagem(atual + delta);
}

// Funções do popup
function openPopup(imgSrc) {
    const popup = document.getElementById('imagePopup');
    const popupImg = document.getElementById('popupImg');
    const imagens = Array.from(document.querySelectorAll('.carrossel-img'));

    // Encontrar o índice da imagem clicada usando o atual URL pathname
    const urlClicada = new URL(imgSrc).pathname;
    const index = imagens.findIndex(img => new URL(img.src).pathname === urlClicada);

    // Se encontrou a imagem, atualizar o índice
    if (index !== -1) {
        imagemAtualPopup = index;
        atual = index;
    } else {
        // Se não encontrou, usar o índice atual
        imagemAtualPopup = atual;
    }

    console.log('Abrindo popup:', {
        indiceEncontrado: index,
        imagemAtualPopup,
        atual,
        totalImagens: imagens.length
    });

    popupImg.src = imgSrc;
    popup.style.display = 'block';
    document.body.classList.add('popup-open');
    // Parar o carrossel quando o popup estiver aberto
    clearInterval(carrosselInterval);
}

function closePopup() {
    const popup = document.getElementById('imagePopup');
    const shareButtons = popup.querySelector('.share-buttons');
    const shareToggle = popup.querySelector('.share-toggle');

    popup.style.display = 'none';
    document.body.classList.remove('popup-open');
    shareButtons.classList.remove('show');
    shareToggle.classList.remove('active');

    // Reiniciar o carrossel quando fechar o popup
    carrosselInterval = setInterval(() => mudarImagem(1), 4000);
}

let imagemAtualPopup = 0;

function navegarPopup(direcao) {
    const imagens = Array.from(document.querySelectorAll('.carrossel-img'));
    if (!imagens.length) return;

    const popupImg = document.getElementById('popupImg');

    // Encontrar o índice atual baseado em imagemAtualPopup
    let novoIndex = imagemAtualPopup;

    // Navegar para próxima/anterior
    if (direcao === 'anterior') {
        novoIndex = novoIndex <= 0 ? imagens.length - 1 : novoIndex - 1;
    } else {
        novoIndex = novoIndex >= imagens.length - 1 ? 0 : novoIndex + 1;
    }

    console.log('Navegação:', {
        direcao,
        indexAnterior: imagemAtualPopup,
        novoIndex,
        totalImagens: imagens.length
    });

    // Atualizar imagem e índices
    if (imagens[novoIndex]) {
        popupImg.src = imagens[novoIndex].src;
        imagens.forEach(img => img.classList.remove('ativa'));
        imagens[novoIndex].classList.add('ativa');
        atual = novoIndex;
        imagemAtualPopup = novoIndex;
    }
}

function toggleShareButtons() {
    const popup = document.getElementById('imagePopup');
    const shareButtons = popup.querySelector('.share-buttons');
    const shareToggle = popup.querySelector('.share-toggle');

    shareButtons.classList.toggle('show');
    shareToggle.classList.toggle('active');
}

function compartilharFacebook() {
    const url = document.getElementById('popupImg').src;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function compartilharInstagram() {
    alert('Salve a imagem e compartilhe no Instagram');
}

function compartilharWhatsapp() {
    const url = document.getElementById('popupImg').src;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
}

function copiarLink() {
    const url = document.getElementById('popupImg').src;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar link:', err);
    });
}

function scrollToAgenda() {
    const agendaContainer = document.querySelector('.agenda-container');
    if (agendaContainer) {
        agendaContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Atualizar a variável usuarioRolou para verdadeiro
        usuarioRolou = true;
    }
}

// Inicializar o carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar o temporizador para troca automática de imagem a cada 4 segundos
    carrosselInterval = setInterval(() => {
        mudarImagem(1);
    }, 4000);

    // Verificar a posição inicial dos botões de navegação
    toggleNavigationButtons();
});
