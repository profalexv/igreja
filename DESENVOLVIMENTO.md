# 🎨 Guia de Desenvolvimento - Site Igreja Adventista de Mafra

## 📁 Estrutura do Projeto

```
├── index.html              # Página principal
├── pages/                  # Páginas do site
│   ├── semanal.html       # Programação semanal
│   └── frames/            # Páginas em iframe
├── styles/                # Estilos CSS e Sass
│   ├── sass/              # Arquivos SCSS (fonte)
│   │   ├── main.scss      # Arquivo principal
│   │   ├── utils/         # Variáveis e mixins
│   │   ├── base/          # Reset CSS e tipografia
│   │   ├── layout/        # Layout e header
│   │   ├── components/    # Componentes reutilizáveis
│   │   └── pages/         # Estilos específicos
│   └── css/               # CSS compilado
├── js/                    # JavaScript
├── img/                   # Imagens
└── fonts/                 # Fontes personalizadas
```

## 🚀 Ambiente de Desenvolvimento

### **Tecnologias Utilizadas:**
- **HTML5** - Estrutura das páginas
- **CSS3/Sass** - Estilos e design responsivo
- **JavaScript** - Interatividade

### **Ferramentas Configuradas:**
- **Qualquer editor de código** (VS Code, Sublime, Atom, etc.)
- **Sass** para compilação de estilos
- **Git** para versionamento
- **Browser** com DevTools para debug

## 🛠️ Como Desenvolver

### **1. Compilar Sass:**
```bash
# Compilar uma vez
sass styles/sass/main.scss styles/css/main.css

# Watch mode (recompila automaticamente)
sass --watch styles/sass:styles/css

# Produção (minificado)
sass styles/sass/main.scss styles/css/main.css --style=compressed
```

### **2. Servidor Local:**
**Opção 1 - VS Code Live Server:**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Escolha "Open with Live Server"

**Opção 2 - Browser direto:**
- Abra `index.html` diretamente no browser
- Para funcionalidades que precisam de servidor, use a Opção 3

**Opção 3 - Node.js:**
```bash
npx http-server . -p 8000
# Acesse: http://localhost:8000
```

## 📝 Padrões de Código

### **HTML:**
- Indentação: 4 espaços
- Sempre fechar tags
- Usar semântica HTML5
- Comentários em português

### **CSS/Sass:**
- Usar variáveis em `styles/sass/utils/_variables.scss`
- Mixins em `styles/sass/utils/_mixins.scss`
- BEM methodology para classes CSS
- Mobile-first approach

### **JavaScript:**
- Indentação: 4 espaços
- Comentários em português
- Usar const/let ao invés de var
- Funções bem documentadas

## 🎨 Sistema de Cores

```scss
// Cores principais da igreja
$primary-color: #8B2635;     // Vermelho principal
$secondary-color: #C19B7C;   // Bege secundário
$accent-color: #E6C25C;      // Amarelo destaque
$success-color: #2D5A3D;     // Verde sucesso
$text-dark: #2C3E50;         // Texto escuro
$text-light: #7F8C8D;       // Texto claro
$bg-main: #F8F9FA;           // Fundo principal
```

## 📱 Responsividade

### **Breakpoints:**
```scss
$breakpoint-sm: 576px;   // Mobile
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 992px;   // Desktop
$breakpoint-xl: 1200px;  // Desktop large
```

### **Mixins de Responsividade:**
```scss
@include mobile { /* estilos mobile */ }
@include tablet { /* estilos tablet */ }
@include desktop { /* estilos desktop */ }
```

## 🔧 Comandos Úteis

### **Git:**
```bash
git status              # Ver status
git add .               # Adicionar arquivos
git commit -m "msg"     # Commit
git push                # Enviar para GitHub
```

### **Sass:**
```bash
# Compilar uma vez
sass styles/sass/main.scss styles/css/main.css

# Watch mode (automático)
sass --watch styles/sass:styles/css

# Produção (minificado)
sass styles/sass/main.scss styles/css/main.css --style=compressed
```

### **Servidor Local (opcional):**
```bash
# Com Node.js
npx http-server . -p 8000

# Com Python (se disponível)
python3 -m http.server 8000

# Ou apenas abra index.html no browser
```

## 📚 Estrutura de Componentes

### **Cards:**
```html
<div class="card">
    <h3>Título</h3>
    <p>Conteúdo</p>
</div>
```

### **Grid de Layout:**
```scss
.container {
    @include grid-3-cols;  // Grid 3 colunas
    @include mobile {
        @include grid-1-col;  // 1 coluna no mobile
    }
}
```

## 🐛 Troubleshooting

### **CSS não atualiza:**
1. Verificar se Sass Watch está rodando
2. Limpar cache do browser (`Ctrl+F5`)
3. Verificar erros no terminal

### **Sass não compila:**
1. Verificar se Sass está instalado: `sass --version`
2. Instalar se necessário: `npm install -g sass`
3. Verificar sintaxe SCSS
4. Confirmar que variáveis estão definidas

### **Servidor não inicia:**
1. Use a extensão Live Server do VS Code
2. Ou abra o index.html diretamente no browser
3. Para desenvolvimento avançado, use `npx http-server`

## 📈 Deploy

### **Para GitHub Pages:**
1. Commit e push das alterações
2. Verificar que `main.css` está atualizado
3. GitHub Pages irá servir automaticamente

### **Arquivos Essenciais para Deploy:**
- `index.html`
- `styles/css/main.css` (CSS compilado)
- `js/`
- `img/`
- `fonts/`
- `pages/`

## ✅ Checklist de Desenvolvimento

### **Antes de cada commit:**
- [ ] Compilar Sass para produção
- [ ] Testar em diferentes tamanhos de tela
- [ ] Verificar se todas as imagens carregam
- [ ] Validar HTML
- [ ] Testar navegação entre páginas
- [ ] Verificar console do browser para erros

### **Antes do deploy:**
- [ ] CSS minificado gerado
- [ ] Todas as dependências incluídas
- [ ] Links funcionais
- [ ] Performance otimizada
- [ ] Compatibilidade mobile testada

---

**🎉 Ambiente configurado para desenvolvimento web focado no projeto da Igreja Adventista de Mafra!**