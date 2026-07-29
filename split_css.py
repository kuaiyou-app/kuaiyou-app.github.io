import os
import re

css_path = "/Users/wenqiurong/develop/gitspace/auto-app/kuaiyou-website/app/globals.css"
styles_dir = "/Users/wenqiurong/develop/gitspace/auto-app/kuaiyou-website/app/styles"
components_dir = "/Users/wenqiurong/develop/gitspace/auto-app/kuaiyou-website/components"
app_dir = "/Users/wenqiurong/develop/gitspace/auto-app/kuaiyou-website/app"

os.makedirs(styles_dir, exist_ok=True)

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

def get_lines(start, end):
    return "".join(lines[start-1:end])

base_css = """/* ── CSS Variables & Reset ── */
:root {
  --background: #050508;
  --foreground: #ededf0;
  --primary: #00f0ff;
  --primary-glow: rgba(0, 240, 255, 0.5);
  --secondary: #00ff41;
  --secondary-glow: rgba(0, 255, 65, 0.4);
  --glass-bg: rgba(20, 20, 25, 0.6);
  --glass-border: rgba(255, 255, 255, 0.1);
  --card-hover-bg: rgba(30, 30, 40, 0.8);

  /* Semantic text colors (extracted from 56+ hardcoded rgba values) */
  --text-primary: rgba(255, 255, 255, 0.82);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.62);
  --text-dim: rgba(255, 255, 255, 0.58);
  --text-faint: rgba(255, 255, 255, 0.55);
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-medium: rgba(255, 255, 255, 0.16);
  --bg-overlay-light: rgba(255, 255, 255, 0.05);
  --bg-overlay-medium: rgba(255, 255, 255, 0.08);
}

* { box-sizing: border-box; padding: 0; margin: 0; }
html { max-width: 100%; overflow-x: clip; }

body {
  color: var(--foreground);
  background: var(--background);
  font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  position: relative;
  max-width: 100%; overflow-x: clip;
}

a { color: inherit; text-decoration: none; transition: color 0.2s ease; }
a:hover { color: var(--primary); }
h1, h2, h3, h4, h5, h6 { font-weight: 700; letter-spacing: -0.02em; }
"""

utilities_css = get_lines(24, 119) + get_lines(174, 184) + get_lines(192, 219) + get_lines(268, 274) + get_lines(663, 676)
backgrounds_css = get_lines(120, 163)

homepage_css = get_lines(223, 267) + get_lines(275, 662)
docs_css = get_lines(680, 844)
navbar_css = get_lines(848, 1052)
footer_css = get_lines(1056, 1127)
skillcard_css = get_lines(1131, 1302)

def replace_rgba(css):
    reps = {
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.82\s*\)": "var(--text-primary)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.78\s*\)": "var(--text-secondary)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.7\s*\)": "var(--text-secondary)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.72\s*\)": "var(--text-secondary)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.74\s*\)": "var(--text-secondary)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.75\s*\)": "var(--text-secondary)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.68\s*\)": "var(--text-secondary)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.62\s*\)": "var(--text-muted)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.6\s*\)": "var(--text-muted)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.58\s*\)": "var(--text-dim)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.55\s*\)": "var(--text-faint)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.1\s*\)": "var(--border-subtle)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.12\s*\)": "var(--border-subtle)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.14\s*\)": "var(--border-subtle)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.15\s*\)": "var(--border-medium)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.16\s*\)": "var(--border-medium)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.18\s*\)": "var(--border-medium)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.2\s*\)": "var(--border-medium)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.05\s*\)": "var(--bg-overlay-light)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.04\s*\)": "var(--bg-overlay-light)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.06\s*\)": "var(--bg-overlay-light)",
        r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.08\s*\)": "var(--bg-overlay-medium)",
    }
    for pat, repl in reps.items():
        css = re.sub(pat, repl, css)
    return css

with open(f"{styles_dir}/base.css", "w", encoding="utf-8") as f: f.write(replace_rgba(base_css))
with open(f"{styles_dir}/utilities.css", "w", encoding="utf-8") as f: f.write(replace_rgba(utilities_css))
with open(f"{styles_dir}/backgrounds.css", "w", encoding="utf-8") as f: f.write(replace_rgba(backgrounds_css))
with open(f"{components_dir}/HomePage.module.css", "w", encoding="utf-8") as f: f.write(replace_rgba(homepage_css))
with open(f"{components_dir}/DocsPage.module.css", "w", encoding="utf-8") as f: f.write(replace_rgba(docs_css))
with open(f"{components_dir}/Navbar.module.css", "w", encoding="utf-8") as f: f.write(replace_rgba(navbar_css))
with open(f"{components_dir}/Footer.module.css", "w", encoding="utf-8") as f: f.write(replace_rgba(footer_css))
with open(f"{components_dir}/SkillCard.module.css", "w", encoding="utf-8") as f: f.write(replace_rgba(skillcard_css))

globals_css_new = """/* Global styles — assembled from modular files.
   Component-specific styles live in *.module.css alongside each component. */
@import './styles/base.css';
@import './styles/utilities.css';
@import './styles/backgrounds.css';
"""
with open(css_path, "w", encoding="utf-8") as f: f.write(globals_css_new)
print("CSS files split and globals updated.")
