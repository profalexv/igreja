/* ═══════════════════════════════════════════════════════════════
   FRAMES.JS - JavaScript Comum para Todos os Frames
   Criado em: 30/OUT/2025
   Objetivo: Consolidar funções JavaScript reutilizáveis entre frames
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// NAMESPACE GLOBAL
// ═══════════════════════════════════════════════════════════════

const FrameUtils = {
    
    // ═══════════════════════════════════════════════════════════════
    // SISTEMA DE ABAS (TABS)
    // ═══════════════════════════════════════════════════════════════
    
    /**
     * Inicializa o sistema de abas
     * @param {Object} options - Opções de configuração
     * @param {string} options.buttonSelector - Seletor dos botões de aba (default: '.tab-btn, .tab-button')
     * @param {string} options.contentSelector - Seletor dos conteúdos de aba (default: '.tab-content')
     * @param {string} options.activeClass - Classe CSS para elementos ativos (default: 'active')
     * @param {string} options.dataAttribute - Atributo data-* usado nos botões (default: 'data-tab')
     * @param {boolean} options.enableHash - Habilitar hash na URL (default: true)
     * @param {boolean} options.scrollToTop - Fazer scroll ao topo ao trocar aba (default: true)
     * @param {string[]} options.validTabs - Array com IDs de abas válidas (opcional)
     */
    initializeTabs: function(options = {}) {
        const config = {
            buttonSelector: options.buttonSelector || '.tab-btn, .tab-button',
            contentSelector: options.contentSelector || '.tab-content',
            activeClass: options.activeClass || 'active',
            dataAttribute: options.dataAttribute || 'data-tab',
            enableHash: options.enableHash !== false,
            scrollToTop: options.scrollToTop !== false,
            validTabs: options.validTabs || null
        };
        
        const tabButtons = document.querySelectorAll(config.buttonSelector);
        const tabContents = document.querySelectorAll(config.contentSelector);
        
        if (tabButtons.length === 0 || tabContents.length === 0) {
            return; // Não há abas nesta página
        }
        
        /**
         * Função para trocar de aba
         */
        function switchTab(tabId) {
            // Validar ID da aba se uma lista foi fornecida
            if (config.validTabs && !config.validTabs.includes(tabId)) {
                return;
            }
            
            // Remove active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove(config.activeClass));
            tabContents.forEach(content => content.classList.remove(config.activeClass));
            
            // Adiciona active no botão e conteúdo selecionado
            const activeButton = document.querySelector(`[${config.dataAttribute}="${tabId}"]`);
            const activeContent = document.getElementById(tabId);
            
            if (activeButton && activeContent) {
                activeButton.classList.add(config.activeClass);
                activeContent.classList.add(config.activeClass);
                
                // Atualiza URL com hash (se habilitado)
                if (config.enableHash) {
                    history.pushState(null, null, `#${tabId}`);
                }
                
                // Scroll suave para o topo (se habilitado)
                if (config.scrollToTop) {
                    FrameUtils.smoothScrollTo(0);
                }
                
                // Dispara evento customizado
                document.dispatchEvent(new CustomEvent('tabChanged', { 
                    detail: { tabId: tabId }
                }));
            }
        }
        
        // Event listeners para os botões de aba
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute(config.dataAttribute);
                const scrollTo = this.getAttribute('data-scroll');
                
                if (tabId) {
                    switchTab(tabId);
                    
                    // Se há um elemento para rolar, faz o scroll após trocar a aba
                    if (scrollTo) {
                        setTimeout(() => {
                            const targetElement = document.getElementById(scrollTo);
                            if (targetElement) {
                                FrameUtils.smoothScrollTo(targetElement, 100);
                            }
                        }, 300); // Delay para aguardar a troca da aba
                    }
                }
            });
        });
        
        // Inicializa a aba correta baseado no hash ou primeira aba
        function initializeFromHash() {
            const hash = window.location.hash.substring(1); // Remove o #
            
            if (hash && document.getElementById(hash)) {
                // Se há um hash válido, ativa essa aba
                switchTab(hash);
            } else {
                // Se não, ativa a primeira aba
                if (tabButtons.length > 0) {
                    const firstTabId = tabButtons[0].getAttribute(config.dataAttribute);
                    if (firstTabId) {
                        switchTab(firstTabId);
                    }
                }
            }
        }
        
        // Inicializa
        initializeFromHash();
        
        // Detecta mudanças no hash (botão voltar/avançar do navegador)
        if (config.enableHash) {
            window.addEventListener('hashchange', initializeFromHash);
        }
        
        console.log(`✅ Sistema de abas inicializado (${tabButtons.length} abas)`);
    },
    
    // ═══════════════════════════════════════════════════════════════
    // BOTÃO VOLTAR AO TOPO
    // ═══════════════════════════════════════════════════════════════
    
    /**
     * Cria e adiciona um botão "Voltar ao Topo"
     * @param {Object} options - Opções de configuração
     * @param {string} options.icon - Ícone HTML (default: '↑')
     * @param {number} options.showAt - Posição Y para mostrar o botão em px (default: 300)
     * @param {string} options.position - 'right' ou 'left' (default: 'right')
     */
    createBackToTopButton: function(options = {}) {
        const config = {
            icon: options.icon || '↑',
            showAt: options.showAt || 300,
            position: options.position || 'right'
        };
        
        // Verifica se já existe um botão
        if (document.getElementById('back-to-top-btn')) {
            return;
        }
        
        // Cria o botão
        const button = document.createElement('button');
        button.id = 'back-to-top-btn';
        button.className = 'back-to-top';
        button.innerHTML = config.icon;
        button.setAttribute('aria-label', 'Voltar ao topo');
        button.title = 'Voltar ao topo';
        
        // Ajusta posição
        if (config.position === 'left') {
            button.style.left = '30px';
            button.style.right = 'auto';
        }
        
        document.body.appendChild(button);
        
        // Mostra/esconde baseado no scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > config.showAt) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
        
        // Scroll ao clicar
        button.addEventListener('click', function() {
            FrameUtils.smoothScrollTo(0);
        });
        
        console.log('✅ Botão "Voltar ao Topo" criado');
    },
    
    // ═══════════════════════════════════════════════════════════════
    // SCROLL SUAVE
    // ═══════════════════════════════════════════════════════════════
    
    /**
     * Faz scroll suave até uma posição ou elemento
     * @param {number|string|HTMLElement} target - Posição Y (número), seletor CSS (string) ou elemento
     * @param {number} offset - Offset em pixels (default: 0)
     */
    smoothScrollTo: function(target, offset = 0) {
        let targetY = 0;
        
        if (typeof target === 'number') {
            // É uma posição Y
            targetY = target;
        } else if (typeof target === 'string') {
            // É um seletor CSS
            const element = document.querySelector(target);
            if (element) {
                targetY = element.offsetTop;
            }
        } else if (target instanceof HTMLElement) {
            // É um elemento HTML
            targetY = target.offsetTop;
        }
        
        window.scrollTo({
            top: targetY + offset,
            behavior: 'smooth'
        });
    },
    
    // ═══════════════════════════════════════════════════════════════
    // INTERSECTION OBSERVER
    // ═══════════════════════════════════════════════════════════════
    
    /**
     * Observa elementos e executa callback quando ficam visíveis
     * @param {string|NodeList} selector - Seletor CSS ou NodeList de elementos
     * @param {Function} callback - Função a executar quando elemento fica visível
     * @param {Object} options - Opções do Intersection Observer
     */
    observeElements: function(selector, callback, options = {}) {
        const config = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -50px 0px',
            once: options.once !== false // Por padrão, observa apenas uma vez
        };
        
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector)
            : selector;
        
        if (elements.length === 0) {
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target, entry);
                    
                    // Se configurado para observar apenas uma vez, para de observar
                    if (config.once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: config.threshold,
            rootMargin: config.rootMargin
        });
        
        elements.forEach(element => observer.observe(element));
        
        console.log(`✅ Observador criado para ${elements.length} elementos`);
        
        return observer;
    },
    
    /**
     * Anima elementos quando ficam visíveis (fade in + slide up)
     * @param {string|NodeList} selector - Seletor CSS ou NodeList de elementos
     * @param {Object} options - Opções de animação
     */
    animateOnScroll: function(selector, options = {}) {
        const config = {
            animation: options.animation || 'fade-in', // 'fade-in', 'slide-up', ou custom
            duration: options.duration || 0.6,
            delay: options.stagger || 0.1, // Delay entre elementos
            threshold: options.threshold || 0.1
        };
        
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector)
            : selector;
        
        // Prepara elementos
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all ${config.duration}s ease ${index * config.delay}s`;
        });
        
        // Observa e anima
        this.observeElements(elements, (element) => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, {
            threshold: config.threshold,
            once: true
        });
    },
    
    // ═══════════════════════════════════════════════════════════════
    // UTILITÁRIOS DE EVENTOS
    // ═══════════════════════════════════════════════════════════════
    
    /**
     * Executa código quando o DOM estiver pronto
     * @param {Function} callback - Função a executar
     */
    ready: function(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    },
    
    /**
     * Debounce - executa função após um delay sem novas chamadas
     * @param {Function} func - Função a executar
     * @param {number} wait - Tempo de espera em ms
     */
    debounce: function(func, wait = 250) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Throttle - limita execução da função a uma vez por período
     * @param {Function} func - Função a executar
     * @param {number} limit - Período limite em ms
     */
    throttle: function(func, limit = 250) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ═══════════════════════════════════════════════════════════════
// INICIALIZAÇÃO AUTOMÁTICA
// ═══════════════════════════════════════════════════════════════

FrameUtils.ready(function() {
    console.log('🎯 FrameUtils carregado e pronto!');
    
    // Auto-inicializar recursos comuns se existirem na página
    
    // 1. Sistema de abas (se houver botões de aba)
    if (document.querySelector('.tab-btn, .tab-button')) {
        FrameUtils.initializeTabs();
    }
    
    // 2. Botão voltar ao topo (sempre criar)
    FrameUtils.createBackToTopButton();
    
    console.log('✅ Recursos comuns inicializados');
});

// Exporta para uso global
window.FrameUtils = FrameUtils;
