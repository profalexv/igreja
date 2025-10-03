// Script específico para boletim.html
// Função global para redimensionar iframes
window.resizeIframe = function(iframe) {
    if (!iframe) return;
    
    try {
        if (iframe.contentDocument) {
            const body = iframe.contentDocument.body;
            const html = iframe.contentDocument.documentElement;
            
            if (body && html) {
                const calculatedHeight = Math.max(
                    body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight
                );
                iframe.style.height = (calculatedHeight + 20) + 'px';
            }
        }
    } catch (e) {
        // Erro de CORS ou outro problema - manter altura padrão
        console.log('Não foi possível redimensionar iframe:', e.message);
        if (iframe.src.includes('carrossel.html')) {
            iframe.style.height = '500px';
        } else {
            iframe.style.height = '600px';
        }
    }
};

// Inicializar redimensionamento quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Redimensionar todos os iframes após um pequeno delay
    setTimeout(() => {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            resizeIframe(iframe);
        });
    }, 1000);
});