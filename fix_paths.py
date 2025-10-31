#!/usr/bin/env python3
import os
import re
from pathlib import Path

def fix_paths_in_file(filepath):
    """Corrige paths relativos em arquivos HTML dentro de pages/frames/ e pages/tabs/"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Substituir ../css/ por ../../css/
    content = re.sub(r'(href|src)="\.\./css/', r'\1="../../css/', content)
    
    # Substituir ../js/ por ../../js/
    content = re.sub(r'(href|src)="\.\./js/', r'\1="../../js/', content)
    
    # Substituir ../img/ por ../../img/
    content = re.sub(r'(href|src)="\.\./img/', r'\1="../../img/', content)
    
    # Substituir ../fonts/ por ../../fonts/
    content = re.sub(r'(href|src)="\.\./fonts/', r'\1="../../fonts/', content)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    root = Path('/home/alexandre/Documents/GitHub/igreja/pages')
    
    updated_files = []
    
    # Processar todos os arquivos HTML dentro de pages/
    for html_file in root.rglob('*.html'):
        if fix_paths_in_file(html_file):
            updated_files.append(str(html_file))
            print(f"✅ Atualizado: {html_file.relative_to(root.parent)}")
    
    print(f"\n📊 Total de arquivos atualizados: {len(updated_files)}")

if __name__ == '__main__':
    main()
