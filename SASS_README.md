# 🎨 Sistema Sass - Igreja Adventista de Mafra

## 📁 Estrutura de Arquivos

```
styles/
├── sass/                    # Arquivos SCSS (fonte)
│   ├── main.scss           # Arquivo principal
│   ├── utils/              # Utilitários
│   │   ├── _variables.scss # Variáveis globais
│   │   └── _mixins.scss    # Mixins reutilizáveis
│   ├── base/               # Estilos base
│   │   └── _reset.scss     # Reset CSS e tipografia
│   ├── layout/             # Layout components
│   │   └── _header.scss    # Header e navegação
│   ├── components/         # Componentes reutilizáveis
│   │   └── _cards.scss     # Cards e elementos similares
│   └── pages/              # Estilos específicos de páginas
│       ├── _home.scss      # Página inicial
│       ├── _boletim.scss   # Página de boletim
│       └── _iframe-pages.scss # Páginas em iframe
└── css/                    # CSS compilado (gerado automaticamente)
    ├── main.css           # CSS final compilado
    └── main.css.map       # Source map para debug
```

## 🚀 Como Usar

### 1. Compilação Manual
```bash
# Compilar uma vez
sass styles/sass/main.scss styles/css/main.css --style=expanded --source-map

# Compilar minificado para produção
sass styles/sass/main.scss styles/css/main.min.css --style=compressed --no-source-map
```

### 2. Tasks do VS Code
Pressione `Ctrl+Shift+P` e digite "Tasks":

- **`Sass: Compilar`** - Compila o SCSS uma vez
- **`Sass: Watch`** - Monitora alterações e compila automaticamente
- **`Sass: Compilar Produção`** - Gera CSS minificado
- **`Desenvolvimento Completo`** - Inicia watch + servidor local
- **`Abrir Site Localmente`** - Servidor HTTP em localhost:8000

### 3. Desenvolvimento Recomendado
1. Execute a task **"Desenvolvimento Completo"**
2. Acesse `http://localhost:8000`
3. Edite arquivos `.scss` na pasta `styles/sass/`
4. O CSS será recompilado automaticamente
5. Recarregue a página para ver as alterações

## 🎯 Variáveis Principais

### Cores
```scss
$primary-color: #8B2635;     // Vermelho principal
$secondary-color: #C19B7C;   // Bege secundário
$accent-color: #E6C25C;      // Amarelo destaque
$success-color: #2D5A3D;     // Verde sucesso
$text-dark: #2C3E50;         // Texto escuro
$text-light: #7F8C8D;       // Texto claro
$bg-main: #F8F9FA;           // Fundo principal
```

### Espaçamentos
```scss
$spacing-xs: 0.25rem;   // 4px
$spacing-sm: 0.5rem;    // 8px
$spacing-md: 0.75rem;   // 12px
$spacing-lg: 1rem;      // 16px
$spacing-xl: 1.5rem;    // 24px
$spacing-2xl: 2rem;     // 32px
$spacing-3xl: 3rem;     // 48px
```

### Breakpoints
```scss
$breakpoint-sm: 576px;   // Mobile
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 992px;   // Desktop
$breakpoint-xl: 1200px;  // Desktop large
```

## 🛠️ Mixins Úteis

### Responsividade
```scss
.exemplo {
  @include mobile {
    // Estilos para mobile
  }
  
  @include tablet {
    // Estilos para tablet
  }
  
  @include desktop {
    // Estilos para desktop
  }
}
```

### Componentes
```scss
.card {
  @include card-base;        // Card básico
  @include card-shadow;      // Sombra suave
}

.botao {
  @include button-primary;   // Botão principal
  @include button-secondary; // Botão secundário
}
```

### Grid
```scss
.container {
  @include grid-2-cols;  // Grid 2 colunas
  @include grid-3-cols;  // Grid 3 colunas
  @include grid-4-cols;  // Grid 4 colunas
}
```

## 📝 Boas Práticas

1. **Sempre edite arquivos `.scss`**, nunca o CSS compilado
2. **Use variáveis** para cores, espaçamentos e breakpoints
3. **Organize por responsabilidade**: utils → base → layout → components → pages
4. **Teste no servidor local** antes de fazer commit
5. **Use mixins** para evitar repetição de código

## 🔧 Troubleshooting

### Sass não está instalado
```bash
# Ubuntu/Debian
sudo apt install sass

# macOS
brew install sass/sass/sass

# Windows (Chocolatey)
choco install sass
```

### Arquivo CSS não atualiza
1. Verifique se o Sass Watch está rodando
2. Verifique se há erros no terminal
3. Force recompilação: `Ctrl+Shift+P` → "Sass: Compilar"

### Errors de compilação
- Verifique sintaxe SCSS
- Certifique-se que variáveis estão definidas
- Veja o terminal para mensagens de erro detalhadas

## 📚 Recursos

- [Sass Documentation](https://sass-lang.com/documentation)
- [VS Code Sass Extension](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)