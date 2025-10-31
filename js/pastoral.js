// JavaScript para Ministério Pastoral - Sistema de Abas
// NOTA: Sistema de abas e botão "voltar ao topo" agora são fornecidos por frames.js (FrameUtils)
// Este arquivo foi mantido para funcionalidades específicas (animações, efeitos de hover, etc.)

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SISTEMA DE ABAS (TABS)
    // ============================================
    // SUBSTITUÍDO POR: FrameUtils.initializeTabs() (em frames.js)
    // Mantido aqui temporariamente para compatibilidade
    
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
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Verifica se há hash na URL ao carregar a página
    const hash = window.location.hash.substring(1); // Remove o #
    if (hash && ['pastor', 'anciaos', 'diaconato', 'quemsomos'].includes(hash)) {
        switchTab(hash);
    } else {
        // Se não houver hash válido, ativa a primeira aba (pastor)
        switchTab('pastor');
    }
    
    // Listener para mudanças no hash (botão voltar/avançar do navegador)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && ['pastor', 'anciaos', 'diaconato', 'quemsomos'].includes(hash)) {
            switchTab(hash);
        }
    });
    
    // ========== ANIMAÇÕES DE ENTRADA ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar cards de função
    const functionCards = document.querySelectorAll('.function-card');
    functionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // ========== EFEITOS DE HOVER NOS CARDS ==========
    functionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // ========== SCROLL SUAVE PARA VERSÍCULOS ==========
    const bibleVerses = document.querySelectorAll('.bible-verse');
    bibleVerses.forEach((verse, index) => {
        verse.style.opacity = '0';
        verse.style.transform = 'translateX(-30px)';
        verse.style.transition = `all 0.8s ease ${index * 0.2}s`;
        observer.observe(verse);
    });
    
    // ========== BOTÃO VOLTAR AO TOPO ==========
    // SUBSTITUÍDO POR: FrameUtils.createBackToTopButton() (em frames.js)
    // Comentado pois frames.js já cria o botão automaticamente
    /*
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #5e35b1, #4527a0);
        color: white;
        border: none;
        font-size: 1.2em;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(94, 53, 177, 0.4);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(backToTopButton);
    
    // Mostrar/ocultar botão baseado no scroll
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
    */
    // FIM DO CÓDIGO COMENTADO - Agora usa FrameUtils.createBackToTopButton()
    
    // ========== ESTATÍSTICAS DE CARREGAMENTO ==========
    console.log('⛪ Ministério Pastoral carregado com sucesso!');
    console.log(`✨ ${functionCards.length} cards de funções`);
    console.log(`📖 ${bibleVerses.length} versículos bíblicos`);
    console.log(`🎯 ${tabBtns.length} abas disponíveis`);
});
