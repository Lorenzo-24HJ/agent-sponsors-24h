# Agent Sponsors – 24h Jogging de Liège 2026

Agent IA de prospection et qualification de sponsors.

---

## Déploiement sur Vercel (5 minutes)

### Étape 1 – Mettre le projet sur GitHub

1. Va sur **github.com** et connecte-toi
2. Clique **"New repository"** (bouton vert)
3. Nom : `agent-sponsors-24h` → clique **"Create repository"**
4. Sur la page suivante, clique **"uploading an existing file"**
5. Glisse-dépose TOUS les fichiers de ce dossier (en respectant la structure)
6. Clique **"Commit changes"**

### Étape 2 – Déployer sur Vercel

1. Va sur **vercel.com** et connecte-toi avec GitHub
2. Clique **"Add New Project"**
3. Sélectionne ton repo `agent-sponsors-24h`
4. Clique **"Deploy"** (sans rien changer)

### Étape 3 – Ajouter ta clé API

1. Dans Vercel, va dans ton projet → **Settings** → **Environment Variables**
2. Ajoute :
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : ta clé API (commence par `sk-ant-...`)
3. Clique **Save**
4. Va dans **Deployments** → clique les **3 points** → **Redeploy**

### C'est prêt !

Vercel te donne une URL du type :
`https://agent-sponsors-24h.vercel.app`

Tu peux la partager avec Jean-François et toute l'équipe.

---

## Structure du projet

```
agent-sponsors-24h/
├── api/
│   └── chat.js          ← Backend sécurisé (clé API côté serveur)
├── public/
│   └── index.html       ← Interface de l'agent
├── package.json
├── vercel.json
└── README.md
```

---

## Obtenir une clé API Anthropic

1. Va sur **console.anthropic.com**
2. Crée un compte
3. Menu **"API Keys"** → **"Create Key"**
4. Copie la clé (commence par `sk-ant-...`)

L'usage est payant à la consommation : environ 0,01€ par échange avec l'agent.
