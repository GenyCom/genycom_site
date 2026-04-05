# GenyCom — Site Vitrine v2

## Structure du projet

```
genycom/
├── index.html
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   └── main.js
├── img/
│   ├── logo.png              ← Logo couleur (fond clair)
│   ├── logo-white.png        ← Logo blanc (pour le footer)
│   ├── favicon.png           ← Icône onglet navigateur (64×64)
│   ├── og-image.jpg          ← Image réseaux sociaux (1200×630)
│   ├── hero-screen.png       ← Capture d'écran principale (hero)
│   ├── dashboard-main.png    ← Capture tableau de bord complet
│   ├── dashboard-ventes.png  ← Capture module ventes
│   ├── dashboard-achats.png  ← Capture module achats
│   └── dashboard-stock.png   ← Capture module stock
└── README.md
```

> Les fichiers `img/` livrés sont des **placeholders** (images temporaires).
> Remplacez-les simplement par vos vraies captures d'écran en conservant les mêmes noms.

---

## ✉️ Activation du formulaire — EmailJS (GRATUIT)

> **Pourquoi EmailJS ?**
> C'est la seule solution qui envoie les emails DIRECTEMENT dans votre boîte Gmail
> sans serveur, sans PHP, sans configuration complexe. Le plan gratuit permet
> 200 emails/mois — largement suffisant pour un site vitrine.

### Étape 1 — Créer le compte
1. Allez sur **https://www.emailjs.com** → Sign Up (gratuit)
2. Confirmez votre email

### Étape 2 — Connecter Gmail
1. Dashboard EmailJS → **Email Services** → **Add New Service**
2. Choisissez **Gmail**
3. Connectez votre compte **genycomc@gmail.com**
4. Notez le **Service ID** (ex: `service_abc1234`)

### Étape 3 — Créer le template
1. **Email Templates** → **Create New Template**
2. Configurez le template :

   **To Email :** `genycomc@gmail.com`
   
   **Subject :**
   ```
   [GenyCom] Demande de démo — {{from_name}}
   ```
   
   **Body (HTML ou texte) :**
   ```
   Nouvelle demande de démonstration GenyCom :

   👤 Nom       : {{from_name}}
   📧 Email     : {{reply_to}}
   🏢 Société   : {{company}}
   📞 Téléphone : {{phone}}
   🏭 Secteur   : {{sector}}

   💬 Message :
   {{message}}

   ---
   Répondez directement à cet email pour contacter le prospect.
   ```

3. **Reply To :** `{{reply_to}}`
4. Cliquez **Save**
5. Notez le **Template ID** (ex: `template_xyz5678`)

### Étape 4 — Récupérer la Public Key
1. Dashboard → **Account** → **API Keys**
2. Copiez la **Public Key** (ex: `aBcDeFgHiJkLmNoP`)

### Étape 5 — Configurer le site
Ouvrez `js/main.js` et remplacez les 3 lignes :

```javascript
const EMAILJS_PUBLIC_KEY  = 'VOTRE_PUBLIC_KEY';   // ← votre Public Key
const EMAILJS_SERVICE_ID  = 'VOTRE_SERVICE_ID';   // ← ex: service_abc1234
const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';  // ← ex: template_xyz5678
```

### ✅ Test
Remplissez le formulaire → vous recevrez un email dans genycomc@gmail.com.

---

### Sans configuration EmailJS
Sans les clés, le bouton "Envoyer" ouvre automatiquement le client mail du visiteur
avec l'email pré-rempli. Ça fonctionne mais c'est moins fluide.

---

## 📱 WhatsApp
Votre numéro **0665680442** est configuré partout :
- Bouton flottant en bas à droite (visible sur toutes les pages)
- Bouton dans la section hero
- Bloc WhatsApp dans la section contact
- Footer et barre de navigation

Format international utilisé : `213665680442` (Algeria +213, sans le 0)

---

## 🖼️ Remplacer les images

Conservez exactement les mêmes noms de fichier :

| Fichier               | Taille recommandée | Contenu                                |
|-----------------------|--------------------|----------------------------------------|
| `logo.png`            | 220 × 70 px        | Votre logo (fond transparent ou blanc) |
| `logo-white.png`      | 220 × 70 px        | Logo version blanche (footer)          |
| `favicon.png`         | 64 × 64 px         | Initiale "G" ou logo simplifié         |
| `og-image.jpg`        | 1200 × 630 px      | Visuel attractif pour réseaux sociaux  |
| `hero-screen.png`     | 1200 × 700 px      | Capture d'écran principale du logiciel |
| `dashboard-main.png`  | 1100 × 650 px      | Vue complète du tableau de bord        |
| `dashboard-ventes.png`| 900 × 540 px       | Module ventes / facturation            |
| `dashboard-achats.png`| 900 × 540 px       | Module achats / commandes              |
| `dashboard-stock.png` | 900 × 540 px       | Module stock / inventaire              |

---

## 🚀 Déploiement

**Option 1 — Netlify (recommandé, gratuit)**
1. Allez sur https://netlify.com
2. Glissez-déposez le dossier `genycom/`
3. Votre site est en ligne en 30 secondes

**Option 2 — Hébergement classique (FTP)**
Uploadez tous les fichiers à la racine de votre hébergement.

**Option 3 — GitHub Pages**
Push sur GitHub → Settings → Pages → Activer

---

## 🎨 Personnalisation rapide

Toutes les couleurs dans `css/style.css` :
```css
:root {
  --primary: #0B57D0;    /* Bleu principal */
  --accent:  #FF6B35;    /* Orange accent  */
  --whatsapp: #25D366;   /* Vert WhatsApp  */
}
```

---

## 📞 Contact
**genycomc@gmail.com** · WhatsApp +213 665 680 442
