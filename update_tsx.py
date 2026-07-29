import os
import re

global_classes = {
    'glass-panel', 'btn', 'btn-primary', 'btn-secondary', 'btn-ghost', 
    'sr-only', 'code-font', 'gradient-text', 'animate-fade-in', 
    'page-shell', 'skip-link', 'glow-right'
}

def update_tsx(file_path, css_module_name):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if "import styles from" not in content:
        # Insert after the last import statement
        imports = list(re.finditer(r'^import .*?;', content, re.MULTILINE))
        if imports:
            last_import = imports[-1]
            idx = last_import.end()
            content = content[:idx] + f'\nimport styles from "{css_module_name}";' + content[idx:]
        else:
            content = f'import styles from "{css_module_name}";\n' + content

    def replace_class(match):
        class_string = match.group(1)
        classes = class_string.split()
        new_classes = []
        has_local = False
        for c in classes:
            if c in global_classes or (c.startswith("btn-") and c in global_classes):
                new_classes.append(c)
            elif '{' in c or '}' in c or '$' in c:
                new_classes.append(c) # skip dynamic template literals if accidentally caught
            else:
                new_classes.append(f"${{styles['{c}']}}")
                has_local = True

        if not has_local:
            return f'className="{class_string}"'
        
        if len(new_classes) == 1 and new_classes[0].startswith("${styles"):
            return f'className={new_classes[0][2:-1]}'
        
        return f'className={{`{" ".join(new_classes)}`}}'

    content = re.sub(r'className="([^"]+)"', replace_class, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

base_dir = "/Users/wenqiurong/develop/gitspace/auto-app/kuaiyou-website"
mappings = [
    (f"{base_dir}/components/Navbar.tsx", "./Navbar.module.css"),
    (f"{base_dir}/components/Footer.tsx", "./Footer.module.css"),
    (f"{base_dir}/components/HomePage.tsx", "./HomePage.module.css"),
    (f"{base_dir}/components/DocsPage.tsx", "./DocsPage.module.css"),
    (f"{base_dir}/components/SkillCard.tsx", "./SkillCard.module.css"),
    (f"{base_dir}/components/SkillsExplorer.tsx", "./HomePage.module.css"),
    (f"{base_dir}/components/CodeBlock.tsx", "./DocsPage.module.css"),
    (f"{base_dir}/app/not-found.tsx", "@/components/SkillCard.module.css"),
]

for file_path, module_name in mappings:
    if os.path.exists(file_path):
        update_tsx(file_path, module_name)
        print(f"Updated {file_path}")
    else:
        print(f"File not found: {file_path}")
