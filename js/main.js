// Script principal do site - Gerenciamento de menus e navegação
console.log('Script main.js carregado');

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM carregado, iniciando sistema');
    const menuToggle = document.getElementById('menu-toggle');
    const menuMobile = document.getElementById('menu-mobile');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenu = document.getElementById('close-menu');
    const menuDesktop = document.getElementById('superior');

    // Clona o menu desktop para o mobile
    function initializeMobileMenu() {
        // Limpa o menu mobile antes de reconstruir
        const existingMenu = menuMobile.querySelector('ul');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menuContent = menuDesktop.querySelector('ul').cloneNode(true);

        // Remove elementos more-menu do menu mobile
        const moreMenuElements = menuContent.querySelectorAll('.more-menu-item, .more-menu-extended-item, .more-menu-super-extended-item');
        moreMenuElements.forEach(element => element.remove());

        // Força TODOS os dropdowns (incluindo aninhados) a iniciar fechados
        const allDropdowns = menuContent.querySelectorAll('.dropdown');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });

        // Força todos os dropdown-menus a ficar com display none
        const allDropdownMenus = menuContent.querySelectorAll('.dropdown-menu');
        allDropdownMenus.forEach(menu => {
            menu.style.display = 'none';
        });

        menuMobile.appendChild(menuContent);

        // Adiciona listeners para TODOS os links de dropdown (incluindo aninhados)
        const allDropdownLinks = menuMobile.querySelectorAll('.dropdown > a');
        allDropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parentDropdown = this.parentElement;
                const dropdownMenu = parentDropdown.querySelector(':scope > .dropdown-menu');
                const isCurrentlyActive = parentDropdown.classList.contains('active');
                
                // Fecha todos os irmãos (mesmo nível)
                const parent = parentDropdown.parentElement;
                const siblings = parent.querySelectorAll(':scope > .dropdown');
                siblings.forEach(sibling => {
                    if (sibling !== parentDropdown) {
                        sibling.classList.remove('active');
                        const siblingMenu = sibling.querySelector(':scope > .dropdown-menu');
                        if (siblingMenu) {
                            siblingMenu.style.display = 'none';
                            // Fecha todos os submenus do irmão
                            const nestedDropdowns = siblingMenu.querySelectorAll('.dropdown');
                            nestedDropdowns.forEach(nested => {
                                nested.classList.remove('active');
                                const nestedMenu = nested.querySelector('.dropdown-menu');
                                if (nestedMenu) {
                                    nestedMenu.style.display = 'none';
                                }
                            });
                        }
                    }
                });
                
                // Toggle do item atual
                if (isCurrentlyActive) {
                    // Fecha este dropdown e todos os seus filhos
                    parentDropdown.classList.remove('active');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                        const childDropdowns = dropdownMenu.querySelectorAll('.dropdown');
                        childDropdowns.forEach(child => {
                            child.classList.remove('active');
                            const childMenu = child.querySelector('.dropdown-menu');
                            if (childMenu) {
                                childMenu.style.display = 'none';
                            }
                        });
                    }
                } else {
                    // Abre apenas este dropdown (filhos permanecem fechados)
                    parentDropdown.classList.add('active');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'block';
                    }
                }
            });
        });
    }

    // Toggle do menu mobile
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menuMobile.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuMobile.classList.contains('active') ? 'hidden' : '';
        
        // Fecha todos os dropdowns quando o menu é fechado
        if (!menuMobile.classList.contains('active')) {
            closeAllDropdowns();
        }
    }

    // Função para fechar todos os dropdowns do menu mobile
    function closeAllDropdowns() {
        const allDropdowns = menuMobile.querySelectorAll('.dropdown.active');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const dropdownMenus = dropdown.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                menu.style.display = 'none';
            });
        });
    }

    // Event Listeners
    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    menuMobile.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dropdown')) {
            toggleMenu();
        }
    });

    // Inicializa o menu mobile
    initializeMobileMenu();

    // Configura monitoramento global do iframe
    setupGlobalIframeMonitoring();

    // Fecha o menu mobile ao redimensionar a tela para desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 769 && menuMobile.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Monitoramento global do iframe para detectar mudanças
function setupGlobalIframeMonitoring() {
    const iframe = document.getElementById('janela');
    if (!iframe) return;
    
    console.log('Configurando monitoramento global do iframe');
    
    // Monitora eventos de load (mais confiável)
    iframe.addEventListener('load', () => {
        console.log('Iframe carregou nova página');
        setTimeout(() => {
            adjustIframeHeight(iframe);
            
            // Se for página externa com navegação, inicia monitoramento contínuo
            if (iframe.src.includes('mais.cpb.com.br') || iframe.src.includes('comtextobiblico.com.br')) {
                console.log('Iniciando monitoramento contínuo para página externa');
                startContinuousMonitoring(iframe);
            }
        }, 500);
    });
    
    // Ajuste inicial
    setTimeout(() => adjustIframeHeight(iframe), 1000);
}

let continuousMonitoringInterval;

// Monitoramento contínuo simplificado
function startContinuousMonitoring(iframe) {
    // Para monitoramento anterior se existir
    if (continuousMonitoringInterval) {
        clearInterval(continuousMonitoringInterval);
    }
    
    // Monitora mudanças a cada 2 segundos
    continuousMonitoringInterval = setInterval(() => {
        try {
            // Tenta reajustar altura
            adjustIframeHeight(iframe);
        } catch (e) {
            console.log('Erro no monitoramento contínuo:', e);
        }
    }, 2000);
    
    // Para o monitoramento após 5 minutos para evitar uso excessivo
    setTimeout(() => {
        if (continuousMonitoringInterval) {
            clearInterval(continuousMonitoringInterval);
            console.log('Monitoramento contínuo finalizado após 5 minutos');
        }
    }, 300000);
}

// Função para ajustar altura do iframe ao conteúdo incorporado
function adjustIframeHeight(iframe) {
    const currentSrc = iframe.src;
    console.log('Ajustando iframe para:', currentSrc);
    
    try {
        // Verifica se pode acessar o conteúdo do iframe (mesmo domínio)
        if (iframe.contentDocument || iframe.contentWindow.document) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const body = iframeDoc.body;
            const html = iframeDoc.documentElement;
            
            // Aguarda o carregamento completo
            if (iframeDoc.readyState !== 'complete') {
                console.log('Aguardando carregamento completo...');
                setTimeout(() => adjustIframeHeight(iframe), 100);
                return;
            }
            
            // Calcula a altura total do conteúdo
            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            
            console.log('Altura calculada:', height);
            iframe.style.height = (height + 20) + 'px';
            
        }
    } catch (e) {
        console.log('Erro ao acessar iframe (CORS):', e.message);
        // Para conteúdo externo - páginas com navegação precisam de altura maior
        if (currentSrc.includes('mais.cpb.com.br') || currentSrc.includes('comtextobiblico.com.br')) {
            iframe.style.height = '1200px'; // Altura maior para páginas com navegação
            console.log('Aplicada altura fixa para página externa com navegação');
        } else {
            iframe.style.height = '700px';
            console.log('Aplicada altura fixa padrão');
        }
    }
}

// Verifica se a página precisa de monitoramento (simplificado)
function isExternalPageWithNavigation(url) {
    const needsMonitoring = url.includes('mais.cpb.com.br') || url.includes('comtextobiblico.com.br');
    console.log('URL:', url, 'Precisa monitoramento:', needsMonitoring);
    return needsMonitoring;
}

// Função global para redimensionamento do iframe (chamada pelo onload)
window.resizeIframe = function(iframe) {
    console.log('resizeIframe chamada para:', iframe.src);
    
    // Para páginas externas com navegação, usa altura maior
    if (iframe.src.includes('mais.cpb.com.br') || iframe.src.includes('comtextobiblico.com.br')) {
        console.log('Página externa detectada, aplicando altura fixa');
        iframe.style.height = '1200px';
        
        // Inicia monitoramento para reajustes
        setInterval(function() {
            // Verifica se ainda é a mesma página
            if (iframe.src.includes('mais.cpb.com.br') || iframe.src.includes('comtextobiblico.com.br')) {
                iframe.style.height = '1200px';
            }
        }, 3000);
        
    } else {
        // Para páginas internas, tenta calcular altura real
        try {
            if (iframe.contentDocument) {
                const body = iframe.contentDocument.body;
                const html = iframe.contentDocument.documentElement;
                const height = Math.max(
                    body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight
                );
                iframe.style.height = (height + 20) + 'px';
                console.log('Altura calculada para página interna:', height);
            }
        } catch (e) {
            iframe.style.height = '800px';
            console.log('Usando altura padrão devido a erro:', e.message);
        }
    }
};
