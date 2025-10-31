#!/usr/bin/env python3
import os
import re
from pathlib import Path

# Mapeamento: arquivo -> novo caminho
# frames/ mantém: boletim.html, carrossel.html
# pages/tabs/ recebe: ng.html, pastoral.html, profs.html, deptos.html, ministerio.html, mipes.html

TABS_FILES = ['ng.html', 'pastoral.html', 'profs.html', 'deptos.html', 'ministerio.html', 'mipes.html']
FRAMES_FILES = ['boletim.html', 'carrossel.html']

def update_html_file(filepath):
    """Atualiza referências em arquivos HTML"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Atualizar referências para arquivos que foram para pages/tabs/
    for tab_file in TABS_FILES:
        # frames/arquivo.html -> pages/tabs/arquivo.html
        content = re.sub(
            rf'(href|src)="frames/{tab_file}',
            rf'\1="pages/tabs/{tab_file}',
            content
        )
        # ../frames/arquivo.html -> ../tabs/arquivo.html (para arquivos dentro de pages/)
        content = re.sub(
            rf'(href|src)="\.\./frames/{tab_file}',
            rf'\1="../tabs/{tab_file}',
            content
        )
    
    # Atualizar referências para arquivos que ficaram em pages/frames/
    for frame_file in FRAMES_FILES:
        # frames/arquivo.html -> pages/frames/arquivo.html (do index.html)
        content = re.sub(
            rf'(["\'])frames/{frame_file}',
            rf'\1pages/frames/{frame_file}',
            content
        )
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def update_css_file(filepath):
    """Atualiza referências em arquivos CSS"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Atualizar URLs em CSS (backgrounds, imports, etc)
    # ../frames/ -> ../pages/frames/ ou ../pages/tabs/
    for tab_file in TABS_FILES:
        content = re.sub(
            rf'url\(["\']?\.\./frames/{tab_file}',
            rf'url("../pages/tabs/{tab_file}',
            content
        )
    
    for frame_file in FRAMES_FILES:
        content = re.sub(
            rf'url\(["\']?\.\./frames/{frame_file}',
            rf'url("../pages/frames/{frame_file}',
            content
        )
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def update_js_file(filepath):
    """Atualiza referências em arquivos JavaScript"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Atualizar strings com paths
    for tab_file in TABS_FILES:
        # 'frames/arquivo.html' ou "frames/arquivo.html"
        content = re.sub(
            rf'(["\'])frames/{tab_file}',
            rf'\1pages/tabs/{tab_file}',
            content
        )
        # '../frames/arquivo.html'
        content = re.sub(
            rf'(["\'])\.\./frames/{tab_file}',
            rf'\1../tabs/{tab_file}',
            content
        )
    
    for frame_file in FRAMES_FILES:
        content = re.sub(
            rf'(["\'])frames/{frame_file}',
            rf'\1pages/frames/{frame_file}',
            content
        )
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    root = Path('/home/alexandre/Documents/GitHub/igreja')
    
    updated_files = []
    
    # Processar todos os arquivos HTML
    for html_file in root.rglob('*.html'):
        if update_html_file(html_file):
            updated_files.append(str(html_file))
            print(f"✅ Atualizado: {html_file.relative_to(root)}")
    
    # Processar todos os arquivos CSS
    for css_file in root.rglob('*.css'):
        if update_css_file(css_file):
            updated_files.append(str(css_file))
            print(f"✅ Atualizado: {css_file.relative_to(root)}")
    
    # Processar todos os arquivos JS
    for js_file in root.rglob('*.js'):
        if update_js_file(js_file):
            updated_files.append(str(js_file))
            print(f"✅ Atualizado: {js_file.relative_to(root)}")
    
    print(f"\n📊 Total de arquivos atualizados: {len(updated_files)}")
    
    if not updated_files:
        print("ℹ️  Nenhuma atualização necessária")

if __name__ == '__main__':
    main()
