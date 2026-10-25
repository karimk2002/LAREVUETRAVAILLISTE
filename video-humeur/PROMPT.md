# Prompt : vidéo de l'Humeur du N°01

À coller dans une session Claude Code ouverte sur ce dépôt, avec le connecteur **Flora** branché (images et voix). Modèle principal : **Opus** pour le brainstorming ; la session confie la production à Sonnet et Haiku.

---

Tu m'aides (Karim) à produire une courte vidéo verticale pour Jean-Marc Pasquet, directeur de **La revue Travailliste**. C'est la démonstration offerte promise dans ma proposition : l'**Humeur** du N°01 (le billet d'humeur du numéro) en vidéo de 45 à 60 secondes, avec une voix de narrateur, des illustrations animées et le texte à l'écran. Jean-Marc l'attend et la montrera à son équipe. **Elle doit être envoyée le mardi 27 octobre**, avant le lancement du site le jeudi 29.

À lire d'abord : `STATUS.md` et `proposition/`. Identité : rouge `#C90419`, Newsreader pour les titres, Barlow Semi Condensed pour le texte (Google Fonts), nom écrit « La revue Travailliste ». Instagram : `@larevuetravailliste`. Tout est en français.

## Règles

1. **Phase 1 = conversation avec moi, par écrit.** Aucune génération payante et aucun sous-agent tant que je n'ai pas écrit `GO PRODUCTION` après avoir validé le brief.
2. **Couper, jamais ajouter.** Chaque mot dit ou affiché vient du texte de l'Humeur, sauf le carton de fin. Pas de reformulation, pas de fait ni de chiffre inventé.
3. **Aucun visage reconnaissable de personne réelle** dans les images (responsables politiques, syndicalistes…). Illustration symbolique uniquement, et pas de texte généré dans les images.
4. **Argent :** avant chaque appel payant à Flora, utilise d'abord le mode devis (`quote`) et annonce le coût. **Plafond total : 15 €.** Si une étape le dépasse, arrête-toi et demande-moi.
5. **Voix de narrateur standard**, jamais le clone de quelqu'un.
6. Travaille dans `video-humeur/`. Ne commite pas les médias générés (ajoute un `.gitignore` pour `video-humeur/assets/` et `video-humeur/out/`) ; commite seulement le brief, les scripts et le rapport de vérification.

## Outils disponibles

- **Flora** (espace de travail de Karim) : images, animation image vers vidéo, et voix **ElevenLabs** (Multilingual v2 ou v3, environ 0,12 $ par génération ; Eleven v4, environ 0,05 $). Pas besoin de clé ElevenLabs séparée.
- **ffmpeg / ffprobe** pour le montage, les sous-titres et les contrôles.
- **Google Fonts** pour télécharger Newsreader et Barlow Semi Condensed.

## Phase 1 : brainstorming avec moi (toi, session principale, effort élevé)

Je te colle le texte de l'Humeur. Propose ensuite, en restant bref :

1. Deux ou trois angles créatifs (ton, style d'illustration, rythme), avec ta recommandation.
2. La découpe : le texte ramené à 45 à 60 secondes de narration (environ 110 à 150 mots), en montrant ce qui est retiré.
3. Un storyboard de 6 à 10 plans : durée, texte dit, texte à l'écran, idée d'illustration, mouvement.
4. L'accroche (3 premières secondes) et le carton de fin (« La revue Travailliste », `@larevuetravailliste`).
5. Deux ou trois voix françaises à tester.

On itère jusqu'à ce que je valide. Écris alors `video-humeur/brief.md`, la seule référence pour la suite, et attends `GO PRODUCTION`.

## Phase 2 : production (sous-agents, le modèle le moins cher qui fait le travail)

Lance les sous-agents avec l'outil Agent en précisant `model` et `effort` pour chacun :

| Tâche | Modèle | Effort |
|---|---|---|
| Brief, choix créatifs, décision finale (toi) | session principale | élevé |
| Prompts d'images Flora, direction de la voix (rythme, accents, prononciation) | sonnet | moyen |
| Appels Flora, téléchargements, fichiers, sous-titres, montage ffmpeg | haiku | bas |
| Ce que haiku rate deux fois | sonnet | moyen |
| Vérification (phase 3) | sonnet | élevé |

Chaque sous-agent reçoit `brief.md` et seulement ce dont il a besoin, et rend des chemins de fichiers et un court rapport, pas le contenu des fichiers.

Ordre, avec un point de validation par moi avant chaque dépense :

1. **Test de voix :** une phrase du script dans 2 ou 3 voix. Je choisis.
2. **Narration plan par plan :** une génération de voix par plan, dans la voix choisie. La durée de chaque fichier donne le calage des sous-titres ; si un plan est raté, on ne régénère que lui.
3. **Images :** une par plan dans Flora, en qualité brouillon d'abord. Montre-moi une planche contact ; ne régénère que celles que je refuse.
4. **Mouvement :** par défaut en ffmpeg (zoom lent, panoramique, animation du texte). Animation IA payante pour 1 ou 2 plans clés au plus, et seulement si je suis d'accord.
5. **Montage (ffmpeg) :** 1080 × 1920, 30 i/s, H.264 + AAC, volume autour de −14 LUFS. Sous-titres incrustés en Barlow Semi Condensed. Laisse libres d'éléments importants les ~250 px du haut et les ~400 px du bas (interface d'Instagram et de LinkedIn). Carton de fin. Exporte :
   - `out/humeur-n01.mp4` (sous-titres incrustés)
   - `out/humeur-n01-sans-texte.mp4` et `out/humeur-n01.srt`

## Phase 3 : vérification (un sous-agent séparé, jamais celui qui a produit)

Pour chaque point, réussi ou raté, avec la preuve :

- **Fidélité du texte :** compare le texte de chaque plan au texte de l'Humeur, mot à mot. Rien d'ajouté, rien de déformé.
- **Prononciation :** noms propres, chiffres, sigles, liaisons (écoute plan par plan, signale les doutes).
- **Sous-titres :** orthographe, typographie française (« guillemets », espace insécable avant : ; ! ?), coupures de lignes, synchronisation.
- **Format :** contrôle avec ffprobe (résolution, cadence, codecs, durée, volume).
- **Images :** une image extraite par plan. Couleurs et polices de la revue, zones libres respectées, aucun visage réel, aucun texte déformé dans les images.
- **Carton de fin :** nom exact « La revue Travailliste » et `@larevuetravailliste`.

Le producteur corrige ce qui a raté ; le vérificateur ne revérifie que ces points. Après deux tours, remonte-moi le problème.

## Livraison

Montre-moi la vidéo finale, une planche de 6 images, le rapport de vérification et la dépense totale. J'envoie la vidéo à Jean-Marc moi-même sur WhatsApp. Mets à jour `STATUS.md` (vidéo faite, dépense, fichiers).
