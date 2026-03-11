from __future__ import annotations

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


I18N: dict[str, dict] = {
    "pt": {
        "meta": {
            "langName": "Português",
            "title": "Portfólio | Pedro Sena",
            "description": "Portfólio bilingue (PT/EN) com foco em dados e backend em Python.",
        },
        "nav": {"home": "Início", "about": "Sobre", "projects": "Projetos", "skills": "Skills", "contact": "Contato"},
        "hero": {
            "kicker": "Space • Glassmorphism • Alta performance",
            "titleA": "Olá, eu sou",
            "titleB": "Pedro Sena",
            "subtitle": "Estudante de ADS na Anhanguera, com foco em Python, dados e backend.",
            "ctaPrimary": "Ver projetos",
            "ctaSecondary": "Contato",
        },
        "about": {
            "title": "Sobre",
            "p1": "Sou estudante de Análise e Desenvolvimento de Sistemas (ADS) na Anhanguera. Gosto de construir soluções limpas, rápidas e bem desenhadas — do dado ao deploy.",
            "p2": "Aqui você encontra meus projetos, stack e um jeito fácil de entrar em contato.",
            "codeTitle": "Snippet (Python)",
        },
        "projects": {
            "title": "Projetos em destaque",
            "stock": {
                "title": "Sistema de Estoque",
                "desc": "CRUD, controle de itens, movimentações e relatórios. Estrutura preparada para evoluir para API/DB.",
                "tag1": "Backend",
                "tag2": "CRUD",
            },
            "dashboard": {
                "title": "Dashboard de Dados com Pandas",
                "desc": "Pipeline de dados, limpeza, métricas e visualizações com foco em performance e reprodutibilidade.",
                "tag1": "Dados",
                "tag2": "Pandas",
            },
        },
        "skills": {
            "title": "Stack",
            "subtitle": "Tecnologias que orbitam o meu dia a dia.",
        },
        "contact": {
            "title": "Contato",
            "subtitle": "Vamos construir algo juntos.",
            "name": "Nome",
            "email": "E-mail",
            "message": "Mensagem",
            "send": "Enviar",
            "sending": "Enviando…",
            "sent": "Mensagem enviada!",
            "error": "Não foi possível enviar. Verifique os campos e tente novamente.",
        },
        "footer": {"madeWith": "Feito com Flask + CSS + JS"},
    },
    "en": {
        "meta": {
            "langName": "English",
            "title": "Portfolio | Pedro Sena",
            "description": "Bilingual (PT/EN) portfolio focused on data and Python backend.",
        },
        "nav": {"home": "Home", "about": "About", "projects": "Projects", "skills": "Stack", "contact": "Contact"},
        "hero": {
            "kicker": "Space • Glassmorphism • High performance",
            "titleA": "Hi, I'm",
            "titleB": "Pedro Sena",
            "subtitle": "ADS student at Anhanguera, focused on Python, data, and backend.",
            "ctaPrimary": "View projects",
            "ctaSecondary": "Contact",
        },
        "about": {
            "title": "About",
            "p1": "I'm an Analysis and Systems Development (ADS) student at Anhanguera. I enjoy building clean, fast, well-designed solutions — from data to deploy.",
            "p2": "Here you'll find my projects, stack, and an easy way to reach out.",
            "codeTitle": "Snippet (Python)",
        },
        "projects": {
            "title": "Featured projects",
            "stock": {
                "title": "Inventory System",
                "desc": "CRUD, item tracking, movements, and reports. Structured to evolve into API/DB.",
                "tag1": "Backend",
                "tag2": "CRUD",
            },
            "dashboard": {
                "title": "Data Dashboard with Pandas",
                "desc": "Data pipeline, cleaning, metrics, and visuals with performance and reproducibility in mind.",
                "tag1": "Data",
                "tag2": "Pandas",
            },
        },
        "skills": {
            "title": "Stack",
            "subtitle": "Technologies orbiting my daily work.",
        },
        "contact": {
            "title": "Contact",
            "subtitle": "Let’s build something together.",
            "name": "Name",
            "email": "Email",
            "message": "Message",
            "send": "Send",
            "sending": "Sending…",
            "sent": "Message sent!",
            "error": "Could not send. Check the fields and try again.",
        },
        "footer": {"madeWith": "Built with Flask + CSS + JS"},
    },
}


@app.get("/")
def index():
    lang = request.args.get("lang", "pt").lower()
    if lang not in I18N:
        lang = "pt"
    return render_template("index.html", default_lang=lang, available_langs=list(I18N.keys()))


@app.get("/api/i18n/<lang>.json")
def i18n(lang: str):
    lang = (lang or "pt").lower()
    payload = I18N.get(lang) or I18N["pt"]
    return jsonify(payload)


import os

if __name__ == "__main__":
    # O Render fornece a porta na variável de ambiente PORT
    port = int(os.environ.get("PORT", 5000))
    # '0.0.0.0' é essencial para que o servidor seja acessível externamente
    app.run(host='0.0.0.0', port=port)
