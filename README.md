# 🔐 Frank Anconeyra - Fullstack Cloud & Security Researcher

Portfolio profesional interactivo con diseño de terminal hacker.

## 🎨 Características

### Diseño
- **Terminal Interactiva**: Navegación mediante comandos tipo Linux
- **Tema Pink/Orange**: Esquema de colores personalizado
- **Boot Animation**: Secuencia de inicio estilo sistema operativo
- **Efectos Visuales**: Partículas, matrix, glow effects
- **Responsive**: Adaptable a móviles y tablets

### Funcionalidades
- **Comandos Interactivos**: 15+ comandos funcionales
- **3 Modos Matrix**: Clásico, Lluvia, Símbolos
- **Skills con Imágenes**: Logos reales de lenguajes y frameworks
- **CV Descargable**: Botón para descargar PDF
- **GitHub Links**: Todos los proyectos enlazados
- **Iconos DevIcons**: Logos oficiales de tecnologías

## 📁 Estructura

```
repo/
├── index.html              # Página principal
├── styles.css              # Estilos (tema pink/orange)
├── script.js               # Funcionalidad terminal
├── edificacion.jpg         # Foto de perfil
├── cv.anconeyra.pdf        # CV descargable
├── robots.txt              # Directivas crawlers
├── security-policy.html    # Política de seguridad
└── .well-known/
    ├── security.txt        # Contacto seguridad
    └── pgp-key.txt         # Clave PGP
```

## 🎮 Comandos Disponibles

| Comando | Descripción | Alias |
|---------|-------------|-------|
| `./whoami` | Información personal + CV | `whoami`, `about` |
| `./skills.sh` | Habilidades con imágenes | `skills` |
| `./projects.log` | Proyectos con GitHub | `projects` |
| `./contact.gpg` | Contacto | `contact` |
| `help` | Listar comandos | - |
| `clear` | Limpiar terminal | `cls` |
| `history` | Historial | `h` |
| `date` | Fecha/hora | `time` |
| `ls -la` | Listar archivos | `dir` |
| `cat flag.txt` | Easter Egg (CTF) | - |
| `echo [msg]` | Imprimir mensaje | - |
| `neofetch` | Info sistema | - |
| `matrix` | Matrix modo clásico | - |
| `matrix2` | Matrix modo lluvia | - |
| `matrix3` | Matrix modo símbolos | - |
| `sudo` | Easter Egg | - |
| `rm -rf /` | Easter Egg | - |

## 🛠️ Tecnologías

### Lenguajes
Python, JavaScript, TypeScript, Java, PHP, Ruby, Swift, Go, HTML5, CSS3

### Frameworks Backend
NestJS, Laravel, Django, Flask, Spring Boot, Express

### Frameworks Frontend
React, Vue.js, Nuxt.js, Angular, Tailwind, Bootstrap

### Mobile
Flutter, React Native

### Cloud & DevOps
Docker, Kubernetes, AWS, GCP, GitHub Actions

### Bases de Datos
MySQL, PostgreSQL, MongoDB, Firebase, Cassandra

### Security Tools
Nmap, Burp Suite, Metasploit, OWASP ZAP, SQLmap, Wireshark, Ghidra

## 🚀 Implementación

### ⚠️ IMPORTANTE: Usar Servidor Local

Los navegadores bloquean la apertura de PDFs cuando se usa `file://`. **Debes usar un servidor web local**.

#### Opción 1: Python (Recomendado)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Accede a: `http://localhost:8000`

#### Opción 2: Node.js
```bash
npx http-server -p 8000
```
Accede a: `http://localhost:8000`

#### Opción 3: VS Code Live Server
1. Instala extensión "Live Server"
2. Click derecho en `index.html` → "Open with Live Server"

#### Opción 4: GitHub Pages

1. Sube archivos a `anconeyra.github.io`
2. Settings → Pages → Deploy from branch
3. Sitio disponible en `https://anconeyra.github.io`

### Personalización

1. **Foto**: Coloca tu foto en `edificacion.jpg` (250x250px)
2. **CV**: Reemplaza `cv.anconeyra.pdf` con tu CV real
3. **GitHub**: Actualiza enlaces de proyectos
4. **Contacto**: Edita emails y redes en `index.html`
5. **PGP**: Genera clave en `.well-known/pgp-key.txt`

## 🎨 Colores

```css
--primary-pink: #ff6b6b
--primary-orange: #ffa500
--bg-primary: #0a0a0f
--bg-terminal: #1a1a2e
```

## 👤 Información

**Nombre:** Frank Anconeyra  
**Rol:** Fullstack Cloud & Security Researcher  
**Ubicación:** Perú 🇵🇪  
**Idiomas:** ES (Nativo), EN (B1)  
**Formación:** TECSUP ✅  
**Estado:** Disponible freelance

### Contacto

- **Email Institucional:** frank.anconeyra@tecsup.edu.pe
- **Email Personal:** anconeyrafsuyo@gmail.com
- **Teléfono:** +51 917 394 464
- **GitHub:** github.com/nynaroot
- **LinkedIn:** linkedin.com/in/frank-anconeyra

## 🔐 Seguridad

El sitio incluye:
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- HTTPS forzado
- Sin trackers
- security.txt

## 📝 Comandos Especiales

### Matrix Effects
```bash
matrix    # Modo clásico (pink/orange)
matrix2   # Modo lluvia (verde)
matrix3   # Modo símbolos (emoji)
```

### Easter Eggs
```bash
cat flag.txt    # CTF flag secreta
sudo            # Mensaje divertido
rm -rf /        # Respuesta hacker
```

## 📄 Licencia

MIT License - Uso educativo y personal.

## 👤 Autor

**Frank Anconeyra** - Fullstack Cloud & Security Researcher

---

*"Rompiendo cosas para construirlas más fuertes."* 🔐

*"Security by Design."* 🛡️
