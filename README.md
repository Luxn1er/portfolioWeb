# 🚀 Portfólio LUNILUXX — Bilingue PT/EN

Web app de portfólio em Flask com design **Space/Glassmorphism** em tons de roxo, preto e azul profundo. Totalmente responsivo e otimizado para performance.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?logo=flask&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Funcionalidades

- **Design Space/Glassmorphism** — Paleta dark purple (#0B0B15, #7B2CBF) com efeitos de blur e bordas semi-transparentes
- **Sistema Solar Animado** — 6 ícones (Python, Pandas, SQL, Docker, Flask, Git) orbitando sua foto de perfil com CSS `@keyframes`
- **i18n PT/EN** — Alternância de idioma sem recarregar a página via API `/api/i18n/<lang>.json`
- **Scroll suave + Intersection Observer** — Animações de entrada nas seções
- **Typing effect** — Snippet Python animado na seção "Sobre"
- **Formulário de contato** — Validação JS + integração EmailJS
- **Projetos em destaque** — Sistema de Estoque e Dashboard de Salários com preview de imagens

---

## 📁 Estrutura do Projeto

```
.
├── app.py                 # Servidor Flask + rotas + i18n
├── requirements.txt
├── README.md
├── templates/
│   └── index.html         # Frontend único
└── static/
    ├── css/
    │   └── style.css      # Estilos Space/Glass
    ├── js/
    │   └── script.js      # i18n, animações, EmailJS
    └── img/               # Fotos de perfil e previews dos projetos
        ├── Gemini_Generated_Image_k2e4yek2e4yek2e4.png
        ├── estoque-dashboard.png
        ├── estoque-movimentacao.png
        └── dashboard-salarios.png
```

---

## 🛠️ Tech Stack

| Camada      | Tecnologia                     |
|-------------|--------------------------------|
| Backend     | Python 3.10+, Flask            |
| Frontend    | HTML5, CSS3, JavaScript (vanilla) |
| Fontes      | Inter, JetBrains Mono          |
| Ícones      | Font Awesome 6                 |
| Contato     | EmailJS (opcional)             |

---

## 🚀 Como Rodar

### 1. Clone o repositório

```bash
git clone https://github.com/Luxn1er/portfolio.git
cd portfolio
```

### 2. Crie e ative o ambiente virtual

**Windows (PowerShell):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**Linux/macOS:**
```bash
python -m venv .venv
source .venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Inicie o servidor

```bash
python app.py
```

Acesse: **http://127.0.0.1:5000**

---

## 🌐 API

| Método | Rota                    | Descrição              |
|--------|-------------------------|------------------------|
| GET    | `/`                     | Página principal       |
| GET    | `/api/i18n/pt.json`     | Traduções em português |
| GET    | `/api/i18n/en.json`     | Traduções em inglês    |

---

## 📧 Configurar EmailJS

1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure Service e Template
3. Edite `static/js/script.js` e substitua:

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
```

---

## 📸 Foto de Perfil

- Coloque sua imagem em `static/img/` (ex: `profile.png`)
- Ajuste o caminho em `static/css/style.css` na classe `.avatar`:

```css
.avatar {
  background: url("../img/sua-foto.png") center/cover no-repeat;
}
```

---

## 📤 Publicar no GitHub

1. Crie um repositório **vazio** em [github.com/new](https://github.com/new) (ex: nome `portfolio`)
2. Na pasta do projeto:

```powershell
git remote add origin https://github.com/Luxn1er/portfolio.git
git push -u origin master
```

(Se o remote já existir, use `git push -u origin master`.)

---

## 👤 Autor

**Pedro Juan Moreira Sena**  
Estudante de ADS na Anhanguera | Full Stack Developer & Data Analyst

- [GitHub](https://github.com/Luxn1er)
- [LinkedIn](https://www.linkedin.com/in/pedro-juan-moreira-sena-482b78171)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
