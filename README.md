# 💍 Faire-part numérique — Marie & Clément

Site de mariage statique élégant et interactif, prêt pour GitHub Pages.

## ✨ Fonctionnalités

- Page d'accueil immersive
- Compte à rebours jusqu'au 16 avril 2027
- Histoire du couple
- Chronologie personnalisable
- Galerie photos avec ouverture plein écran et navigation ← →
- Placeholders prêts pour vos photos
- Programme de la journée
- Lieu + Google Maps + copie de l'adresse
- Informations pratiques avec panneaux déroulants
- RSVP qui prépare un e-mail automatiquement
- Ajout du mariage au calendrier via fichier `.ics`
- Petite musique d'ambiance générée localement, activable par le visiteur
- Responsive mobile/tablette/ordinateur
- Animations respectant `prefers-reduced-motion`
- Déploiement GitHub Pages automatisé

## 📸 Où mettre les photos ?

Déposez vos images dans :

```text
assets/images/gallery/
```

Les quatre fichiers prévus sont :

```text
photo-1.jpg
photo-2.jpg
photo-3.jpg
photo-4.jpg
```

Vous pouvez utiliser JPG, PNG ou WebP, mais si vous changez le nom ou l'extension, modifiez aussi `index.html`.

Pour de bonnes performances, utilisez des photos d'environ 1600 à 2000 px de large plutôt que des photos directement sorties d'un appareil de plusieurs dizaines de Mo.

## 📝 Où modifier les textes ?

Tout le contenu éditorial est dans :

```text
index.html
```

Cherchez `À MODIFIER` pour trouver rapidement les zones importantes :

- invitation
- histoire
- chronologie
- galerie
- nom du lieu
- adresse
- informations pratiques

## 📧 Où modifier l'e-mail RSVP ?

Dans :

```text
assets/js/script.js
```

remplacez :

```js
rsvpEmail: "votre-adresse@email.fr",
```

par l'adresse qui doit recevoir les réponses.

### Important

Le RSVP ne stocke pas les réponses sur GitHub : il ouvre la messagerie du visiteur avec un e-mail prérempli. C'est volontaire pour conserver le site entièrement statique.

## 📅 Modifier l'heure du mariage

Dans `assets/js/script.js` :

```js
date: "2027-04-16T14:30:00+02:00",
```

est utilisée pour le compte à rebours.

Les valeurs `start` et `end` servent au fichier calendrier.

## 🎵 Musique

Aucun fichier audio n'est nécessaire. Le site génère une petite mélodie instrumentale via Web Audio après interaction du visiteur.

Si vous préférez votre propre musique, vous pouvez remplacer ce système par un fichier audio dans `assets/audio/`. Évitez l'autoplay forcé : les navigateurs bloquent généralement la lecture automatique avec le son.

## 🌍 Publication GitHub Pages

1. Créez un dépôt GitHub public.
2. Envoyez le contenu de ce dossier à la racine du dépôt.
3. Dans **Settings → Pages**, choisissez **Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Enregistrez.
5. Attendez la publication.

Le workflow `.github/workflows/pages.yml` est également inclus si vous préférez le déploiement par GitHub Actions.

## 🔒 Confidentialité

Le site étant public, ne mettez pas dans le dépôt des informations sensibles, mots de passe ou données personnelles inutiles.

## 🧪 Avant de partager

Testez :

- téléphone Android
- iPhone
- ordinateur
- bouton RSVP
- bouton calendrier
- Google Maps
- galerie
- musique
- tous les liens du menu
- adresse e-mail de réception

## 🎨 Pour changer l'ambiance

Les couleurs sont au début de `assets/css/style.css` :

```css
--ivory
--paper
--ink
--muted
--sage
--sage-dark
--gold
```

Vous pouvez modifier ces variables pour créer une autre palette sans chercher les couleurs dans tout le fichier.
