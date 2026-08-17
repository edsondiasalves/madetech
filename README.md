# 🚀 MadeTech — Website Oficial do Estúdio de Apps

Site moderno, esteticamente apelativo, responsivo e profissional para a **MadeTech**, estúdio indie de desenvolvimento e publicação de aplicações móveis na Google Play Store.

---

## 📱 Aplicações em Destaque

### 1. Best Gym (Android & iOS)
- **Descrição**: Descoberta e avaliação minuciosa de academias e ginásios próximos.
- **Diferenciais**:
  - Mapa interativo com estado de abertura em tempo real, distância, horários e contactos.
  - Avaliação detalhada em **19 critérios** (limpeza, equipamentos, vestiários, simpatia, aulas, estacionamento, preços, etc.).
  - Notas unificadas da comunidade Best Gym + avaliações verificadas do Google.
  - Rankings por categoria (limpeza, custo-benefício, atendimento, atmosfera).
  - Suporte a chat no app, favoritos e modo Premium opcional sem anúncios.
- **Google Play Placeholder**: `https://play.google.com/store/apps/details?id=com.gymreviewer.app`

### 2. Scrutinium (Android & iOS)
- **Descrição**: Plataforma de opinião pública com a "Pergunta do Dia" e análise demográfica em tempo real.
- **Diferenciais**:
  - Pergunta diária única (votar A ou B) com estatísticas globais ao vivo.
  - Divisão de resultados por demografia: género, faixa etária, escolaridade, continente e orientação política.
  - Votação na pergunta do dia seguinte e sugestão de novos temas pela comunidade.
  - Histórico estatístico ilimitado e modo anónimo/privado por design.
- **Google Play Link**: `https://play.google.com/store/apps/details?id=com.scrutinium.app`

---

## ⚡ Tecnologias & Funcionalidades do Website

- **Arquitetura Estática Leve**: Vite + HTML5 Semântico + CSS3 (CSS Variables, Flexbox/Grid) + JS ES6 puro.
- **Design System MadeTech**: Estética futurista com glassmorphism, gradientes vibrantes (roxo elétrico `#6366f1`, verde lima `#84cc16`, cyan `#06b6d4`), micro-animações e modo escuro/claro.
- **Simuladores Interativos de Telemóvel**:
  - *Best Gym*: Marcadores clicáveis no mapa, filtros por critérios de avaliação e notas dinâmicas.
  - *Scrutinium*: Votação interativa em tempo real (A vs B) com recálculo automático de percentagens e gráficos demográficos.
- **Internacionalização (i18n)**: Alternância em tempo real entre **Português (PT-PT — Principal)**, **Português (PT-BR)** e **Inglês (EN)**.
- **SEO de Alta Performance**: Meta tags Open Graph, Twitter Cards e Schema.org JSON-LD para `Organization` e `SoftwareApplication`.
- **Badges Oficiais**: Google Play Store SVG de alta definição e indicação de App Store.
- **Privacidade & Contacto**: Modais interativos com a Política de Privacidade completa e formulário de contacto.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js (v18+) e npm.

### Passos:
1. Clonar ou navegar para a pasta do projeto:
   ```bash
   cd /home/edson/projects/madetech
   ```
2. Instalar as dependências:
   ```bash
   npm install
   ```
3. Iniciar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Aceder a: `http://localhost:3000`

4. Compilar para produção (Build Estático):
   ```bash
   npm run build
   ```
   Os ficheiros otimizados serão gerados na pasta `dist/`.

---

## 🏗️ Compilar e Executar a App (Best Gym)

O código-fonte da app **Best Gym** vive num repositório separado (`gymreviewer`, em Kotlin Multiplatform: módulos `composeApp`, `auth` e `shared`). Abaixo estão as instruções para compilar, executar e publicar.

### Pré-requisitos
- Android Studio (ou JDK 17) e Android SDK.
- Ficheiro `local.properties` na raiz do projeto com as chaves:
  - `MAPS_API_KEY` — chave da Google Maps.
  - `ADMOB_ANDROID_APP_ID` / `ADMOB_ANDROID_BANNER_AD_UNIT_ID` / `ADMOB_ANDROID_INTERSTITIAL_AD_UNIT_ID` / `ADMOB_ANDROID_NATIVE_AD_UNIT_ID` — AdMob.
- Para assinatura Release: ficheiro `keystore.properties` com `storeFile`, `storePassword`, `keyAlias` e `keyPassword`.

### Compilar e executar
```bash
# A partir da raiz do repositório gymreviewer

# APK de debug (rápido, para desenvolvimento)
./gradlew :composeApp:assembleDebug

# Instalar no dispositivo ligado
./gradlew :composeApp:installDebug

# AAB de release (para publicar na Google Play)
./gradlew :composeApp:bundleRelease

# APK de release
./gradlew :composeApp:assembleRelease
```
Também pode abrir o projeto no Android Studio e executar o módulo **composeApp** num emulador/dispositivo. No iOS, a app é compilada a partir da pasta `iosApp` (Xcode).

---

## 🌐 Publicar Alterações no GitHub Pages (madetech.pt)

O site e as páginas de políticas (Privacidade, Exclusão de Dados, etc.) são servidos a partir da branch **`gh-pages`**, que contém o conteúdo da pasta `dist/` gerada pelo Vite.

### Fluxo de publicação
1. Edite os ficheiros em `public/` (ex.: `public/gymreviewer/privacy-policy.html`, `delete-data.html`, e versões `-pt`).
2. Gere a build estática (copia `public/` para `dist/`):
   ```bash
   npm run build
   ```
3. Confirme que as alterações apareceram em `dist/`.
4. Publique na branch `gh-pages`:
   ```bash
   npm run deploy   # executa gh-pages -d dist
   ```
5. Faça commit e push do código-fonte (branch `main`):
   ```bash
   git add -A
   git commit -m "Descrição da alteração"
   git push origin main
   ```

### Publicação manual (alternativa ao `npm run deploy`)
Se preferir fazer push manual da branch `gh-pages`:
```bash
git fetch origin gh-pages
git worktree add /tmp/gh-deploy -b gh-pages-local FETCH_HEAD
rm -rf /tmp/gh-deploy/gymreviewer
cp -r dist/gymreviewer /tmp/gh-deploy/
git -C /tmp/gh-deploy add -A gymreviewer
git -C /tmp/gh-deploy commit -m "Atualizar políticas"
git -C /tmp/gh-deploy push origin gh-pages-local:gh-pages
git -C /tmp/gh-deploy worktree remove /tmp/gh-deploy
```

> Nota: a autenticação do remoto é via SSH (`git@github.com:edsondiasalves/madetech.git`). O domínio `madetech.pt` é apontado para as GitHub Pages através do ficheiro `public/CNAME`.

---

## 📖 Guia de Deploy

O site foi construído como um conjunto de ficheiros estáticos extremamente leves (JAMstack), podendo ser alojado gratuitamente em várias plataformas:

### 1. Vercel (Recomendado)
```bash
npx vercel
```
Ou ligar o repositório GitHub ao painel da Vercel (Build command: `npm run build`, Output directory: `dist`).

### 2. Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### 3. GitHub Pages
No repositório do GitHub, configure as **GitHub Actions** para publicar a pasta `dist` após a execução de `npm run build`.

---

## 📄 Licença & Propriedade
© 2026 MadeTech. Todos os direitos reservados.
