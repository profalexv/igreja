let atual = 0;
let carrosselInterval;

function mostrarImagem(n) {
    const imgs = document.querySelectorAll('.carrossel-img');
    atual = (n + imgs.length) % imgs.length;
    imgs.forEach((img, i) => img.classList.toggle('ativa', i === atual));
}

function mudarImagem(delta) {
    mostrarImagem(atual + delta);
}

// Funções do popup
function openPopup(imgSrc) {
    const popup = document.getElementById('imagePopup');
    const popupImg = document.getElementById('popupImg');
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

function navegarPopup(direcao) {
    const imagens = document.querySelectorAll('.carrossel-img');
    const totalImagens = imagens.length;
    
    // Calcular o novo índice
    let novoIndex = direcao === 'anterior' ? atual - 1 : atual + 1;
    
    // Garantir navegação circular
    if (novoIndex < 0) {
        novoIndex = totalImagens - 1;
    } else if (novoIndex >= totalImagens) {
        novoIndex = 0;
    }

    // Atualizar a imagem atual no carrossel
    imagens.forEach((img, i) => {
        img.classList.remove('ativa');
        if (i === novoIndex) {
            img.classList.add('ativa');
        }
    });

    // Atualizar o popup
    const popupImg = document.getElementById('popupImg');
    popupImg.src = imagens[novoIndex].src;

    // Atualizar o índice atual
    atual = novoIndex;
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

// Inicializar o carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar o temporizador para troca automática de imagem a cada 4 segundos
    carrosselInterval = setInterval(() => {
        mudarImagem(1);
    }, 4000);
});
