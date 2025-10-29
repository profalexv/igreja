// JavaScript para MIPES - Ministério Pessoal
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ANIMAÇÕES DE SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos os elementos com data-animate
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ========== NAVEGAÇÃO SUAVE ==========
    const navLinks = document.querySelectorAll('.mipes-nav .nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove destaque de todos os links
                navLinks.forEach(l => l.style.background = '');
                navLinks.forEach(l => l.style.color = '');
                
                // Adiciona destaque ao link clicado
                this.style.background = 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)';
                this.style.color = 'white';
                
                // Scroll suave para a seção
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Adiciona efeito de destaque temporário na seção
                targetSection.style.transition = 'all 0.5s ease';
                targetSection.style.transform = 'scale(1.02)';
                
                setTimeout(() => {
                    targetSection.style.transform = 'scale(1)';
                }, 500);
            }
        });
    });

    // ========== HIGHLIGHT CARDS - EFEITO HOVER ==========
    const highlightCards = document.querySelectorAll('.highlight-card');
    
    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Adiciona efeito de "elevação" aos cards vizinhos
            highlightCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Restaura todos os cards
            highlightCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            });
        });
    });

    // ========== CONTADOR ANIMADO PARA BADGES ==========
    const badges = document.querySelectorAll('.card-badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.1) rotate(2deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) scale(1) rotate(0deg)';
        });
    });

    // ========== INDICADOR DE SEÇÃO ATIVA NO SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove destaque de todos os links
                navLinks.forEach(link => {
                    link.style.background = '';
                    link.style.color = '';
                });
                
                // Adiciona destaque ao link da seção atual
                const activeLink = document.querySelector(`.mipes-nav .nav-item[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.style.background = 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)';
                    activeLink.style.color = 'white';
                }
            }
        });
    }
    
    // Executa ao carregar e ao fazer scroll
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll();

    // ========== EFEITO DE LEITURA PROGRESSIVA ==========
    const quotes = document.querySelectorAll('.quote-section, .bible-verse');
    
    quotes.forEach(quote => {
        quote.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 40px rgba(30, 136, 229, 0.2)';
        });
        
        quote.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
        });
    });

    // ========== COPIAR VERSÍCULOS BÍBLICOS ==========
    const bibleVerses = document.querySelectorAll('.bible-verse');
    
    bibleVerses.forEach(verse => {
        verse.style.cursor = 'pointer';
        verse.title = 'Clique para copiar o versículo';
        
        verse.addEventListener('click', function() {
            const verseText = this.querySelector('p').textContent;
            const verseRef = this.querySelector('cite').textContent;
            const fullText = `${verseText}\n${verseRef}`;
            
            // Copiar para o clipboard
            navigator.clipboard.writeText(fullText).then(() => {
                // Feedback visual
                const originalBg = this.style.background;
                this.style.background = 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)';
                
                // Criar mensagem temporária
                const message = document.createElement('div');
                message.textContent = '✓ Versículo copiado!';
                message.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #43a047;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 10px;
                    box-shadow: 0 8px 25px rgba(67, 160, 71, 0.4);
                    font-weight: 600;
                    z-index: 1000;
                    animation: slideIn 0.3s ease;
                `;
                
                document.body.appendChild(message);
                
                // Remover mensagem após 2 segundos
                setTimeout(() => {
                    message.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        message.remove();
                    }, 300);
                }, 2000);
                
                // Restaurar background original
                setTimeout(() => {
                    this.style.background = originalBg;
                }, 1000);
            });
        });
    });

    // ========== ANIMAÇÃO INICIAL DO HEADER ==========
    const header = document.querySelector('.mipes-header');
    if (header) {
        setTimeout(() => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                header.style.transition = 'all 1s ease';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }, 100);
    }

    // ========== BOTÃO DE VOLTAR AO TOPO ==========
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2em;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(30, 136, 229, 0.4);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.pointerEvents = 'auto';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.pointerEvents = 'none';
        }
    });
    
    // Scroll ao topo ao clicar
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });

    // ========== ESTATÍSTICAS DE LEITURA ==========
    console.log('📖 MIPES - Ministério Pessoal carregado com sucesso!');
    console.log(`✨ ${animatedElements.length} elementos animados`);
    console.log(`📚 ${bibleVerses.length} versículos bíblicos disponíveis`);
    console.log(`🎯 ${highlightCards.length} cards em destaque`);
});

// Adicionar estilos de animação para as mensagens
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SISTEMA DE ABAS (TABS)
// ============================================

// Função para trocar de aba
function switchTab(tabName) {
    // Remove classe active de todos os botões e conteúdos
    const allTabBtns = document.querySelectorAll('.tab-btn');
    const allTabContents = document.querySelectorAll('.tab-content');
    
    allTabBtns.forEach(btn => btn.classList.remove('active'));
    allTabContents.forEach(content => content.classList.remove('active'));
    
    // Adiciona classe active ao botão e conteúdo selecionados
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(tabName);
    
    if (activeBtn && activeContent) {
        activeBtn.classList.add('active');
        activeContent.classList.add('active');
        
        // Scroll suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Atualiza URL com hash
        history.pushState(null, null, `#${tabName}`);
    }
}

// Event listeners para os botões de aba
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Verifica se há hash na URL ao carregar a página
    const hash = window.location.hash.substring(1); // Remove o #
    if (hash) {
        switchTab(hash);
    } else {
        // Se não houver hash, ativa a primeira aba (evangelismo)
        switchTab('evangelismo');
    }
    
    // Listener para mudanças no hash (botão voltar/avançar do navegador)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchTab(hash);
        }
    });
});
