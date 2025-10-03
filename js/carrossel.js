// Script específico para carrossel.html
let atual = 0;
let carrosselInterval;

// Função auxiliar para mostrar notificações elegantes
function mostrarNotificacao(mensagem) {
    // Remove notificação anterior se existir
    const notificacaoExistente = document.querySelector('.notificacao-toast');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }

    // Cria nova notificação
    const toast = document.createElement('div');
    toast.className = 'notificacao-toast';
    toast.textContent = mensagem;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Anima entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove após 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Funções do carrossel
function mostrarImagem(n) {
    const imgs = document.querySelectorAll('.carrossel-img');
    atual = (n + imgs.length) % imgs.length;
    imgs.forEach((img, i) => img.classList.toggle('ativa', i === atual));
    
    // Atualizar imagens de preview
    atualizarPreviews();
}

function atualizarPreviews() {
    const imgs = document.querySelectorAll('.carrossel-img');
    const totalImagens = imgs.length;
    
    if (totalImagens === 0) return;
    
    // Calcular índices da imagem anterior e seguinte
    const indiceAnterior = (atual - 1 + totalImagens) % totalImagens;
    const indiceSeguinte = (atual + 1) % totalImagens;
    
    // Atualizar preview anterior
    const previewAnterior = document.querySelector('.carrossel-preview.prev .carrossel-img-preview');
    if (previewAnterior && imgs[indiceAnterior]) {
        previewAnterior.src = imgs[indiceAnterior].src;
        previewAnterior.alt = imgs[indiceAnterior].alt;
    }
    
    // Atualizar preview seguinte
    const previewSeguinte = document.querySelector('.carrossel-preview.next .carrossel-img-preview');
    if (previewSeguinte && imgs[indiceSeguinte]) {
        previewSeguinte.src = imgs[indiceSeguinte].src;
        previewSeguinte.alt = imgs[indiceSeguinte].alt;
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
    // Criar notificação mais profissional
    if (navigator.share) {
        navigator.share({
            title: 'Compartilhar no Instagram',
            text: 'Salve a imagem e compartilhe no Instagram'
        }).catch(() => {
            // Fallback se o share nativo falhar
            mostrarNotificacao('Salve a imagem e compartilhe no Instagram');
        });
    } else {
        mostrarNotificacao('Salve a imagem e compartilhe no Instagram');
    }
}

function compartilharWhatsapp() {
    const url = document.getElementById('popupImg').src;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
}

function copiarLink() {
    const linkAtual = window.location.href;
    
    navigator.clipboard.writeText(linkAtual).then(() => {
        mostrarNotificacao('Link copiado para a área de transferência!');
    }).catch(() => {
        // Fallback para navegadores que não suportam clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = linkAtual;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            mostrarNotificacao('Link copiado para a área de transferência!');
        } catch (err) {
            mostrarNotificacao('Não foi possível copiar o link');
        }
        document.body.removeChild(textArea);
    });
}

// Inicializar o carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar previews
    atualizarPreviews();
    
    // Adicionar eventos de clique nas imagens de preview
    const previewAnterior = document.querySelector('.carrossel-preview.prev');
    const previewSeguinte = document.querySelector('.carrossel-preview.next');
    
    if (previewAnterior) {
        previewAnterior.addEventListener('click', () => mudarImagem(-1));
    }
    
    if (previewSeguinte) {
        previewSeguinte.addEventListener('click', () => mudarImagem(1));
    }
    
    // Iniciar o temporizador para troca automática de imagem a cada 4 segundos
    carrosselInterval = setInterval(() => {
        mudarImagem(1);
    }, 4000);
});
