# Prompt : accès Podcasts, pastilles auteurs, encart du livre, infos Brevo

À coller dans **Claude Code sur le Mac, ouvert dans le dossier du site** (le code du site n'est pas sur GitHub). Modèle : **Sonnet** (`/model sonnet`), suffisant pour ces changements et moins coûteux.

Avant de lancer : mettre dans le dossier du projet, par exemple dans `_a-integrer/`, les photos de Florence de Massol et de Jean-Marc Pasquet, et le PDF de la couverture du livre.

---

Tu travailles sur le site de **La revue Travailliste** (Sanity Studio pour les contenus, newsletter reliée à Brevo). Le lancement est **jeudi 29 octobre** : changements simples, sûrs, dans le style existant (rouge `#C90419`, Newsreader pour les titres, Barlow Semi Condensed pour le texte).

## Règles

- Commence par lire le projet (config Sanity, schémas, structure du Studio, composants des articles et de la colonne de droite) et dis-moi en 5 lignes comment il est organisé.
- Travaille sur une branche. **Ne déploie rien et ne pousse rien sans mon accord.** Lance le build et le lint avant de me montrer le résultat.
- Ne m'affiche jamais une clé ou un secret : donne seulement le nom de la variable.
- Préfère les fonctionnalités existantes aux nouveaux développements. Si une tâche est plus longue que prévu, arrête-toi et dis-moi pourquoi.
- Montre-moi le résultat en local, avec une capture ordinateur et une capture mobile pour chaque changement visible.

## 1. Rubrique Podcasts invisible pour les nouveaux administrateurs

Jean-Marc (jean-marc.pasquet@orange.fr) et deux autres administrateurs ne voient pas la rubrique « Podcasts » dans le Studio.

- Cherche la cause dans le code : structure du Studio filtrée selon le rôle (`currentUser.roles`), schéma masqué, plugin, actions de document.
- Si c'est dans le code : corrige pour que tous les membres du projet voient et modifient les Podcasts.
- Si c'est le rôle dans sanity.io/manage : dis-moi exactement quel rôle donner, à qui, et où cliquer. Je le ferai moi-même.
- Récupère le fichier audio du podcast du N°01 (requête GROQ sur le document, URL de l'asset) et télécharge-le dans `_exports/podcast-n01.<ext>`. C'est pour la vidéo du lancement.

## 2. Pastille de l'auteur sur les articles

Une petite pastille ronde avec la photo et le nom de l'auteur, sur les cartes d'articles et en tête de chaque article.

- Si le schéma a déjà des auteurs, utilise-les. Sinon, ajoute le minimum : un type `auteur` (nom, photo) et une référence `auteur` dans les articles.
- Crée les deux auteurs avec leurs photos (`_a-integrer/`) : **Florence de Massol** et **Jean-Marc Pasquet**. Rattache-les aux articles du dossier de lancement ; demande-moi quel article revient à qui si ce n'est pas évident.
- Sans auteur renseigné, rien ne s'affiche (pas de pastille vide).

## 3. Encart du livre à la place de l'encart newsletter en bas à droite

L'encart d'inscription à la newsletter en bas à droite fait doublon avec celui de l'en-tête. Remplace-le par un encart pour le livre de Jean-Marc :

- Couverture : extrais la première page du PDF en image web (WebP ou PNG optimisé).
- Titre : *Pour un travaillisme français*. Auteur : Jean-Marc Pasquet. Éditeur : L'Harmattan.
- Texte : « Dans un plaidoyer pour des règles lisibles, des droits équilibrés par des devoirs et une action publique reconnectée à la vie concrète de celles et ceux qui font tourner le pays, Jean-Marc Pasquet dessine les contours d'une politique de la décence ordinaire. »
- Bouton « Commander maintenant » vers https://www.editions-harmattan.fr/catalogue/livre/pour-un-travaillisme-francais/86832 (nouvel onglet, `rel="noopener"`).
- Si c'est simple, rends l'encart modifiable dans le Studio (image, texte, lien), dans un document de réglages existant de préférence, pour qu'ils puissent le changer sans moi. Sinon, en dur.
- Garde l'inscription à la newsletter de l'en-tête intacte.

## 4. Informations à me donner (sans rien modifier)

- L'adresse e-mail de contact des lecteurs affichée sur le site, et où elle est définie.
- Comment le formulaire d'inscription est relié à Brevo : appel d'API, identifiant de liste, nom de la variable d'environnement de la clé.
- L'ID du projet Sanity, l'adresse du Studio en ligne, et où le site est hébergé.

## À la fin

Un récapitulatif court : ce qui est fait (fichiers modifiés), les captures, ce que je dois faire moi-même (rôles Sanity, Brevo), et la commande pour déployer quand je donne mon accord.
