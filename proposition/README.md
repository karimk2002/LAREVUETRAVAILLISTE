# Proposition « La diffusion de La Revue travailliste » (octobre 2026)

- `proposition.html` : source des trois pages A4 (polices Newsreader et Barlow Semi Condensed, rouge #C90419).
- `La-Revue-travailliste-proposition-diffusion.pdf` : version avec démonstration dans sa propre voix.
- `La-Revue-travailliste-proposition-diffusion-narrateur.pdf` : même document, démonstration avec une voix de narrateur.
- `apercu/` : une image par page et par version, pour relire sans ouvrir le PDF.
- `messages.md` : e-mail, WhatsApp et suite à donner (dont la réponse à Jean-Marc du 16 octobre).
- `../STATUS.md` : où on en est et prochaines étapes.

Régénérer les PDF après une modification :

```sh
NODE_PATH=$(npm root -g) node proposition/render.cjs
```

Le script s'arrête si les polices ne se chargent pas ou si un élément déborde d'une page. La variante narrateur est la classe `narrateur` sur `<body>`.

## Test de voix, avant d'envoyer

À faire sur le Mac, avec **la voix de Karim** : la question technique (le clonage tient-il en français ?) est la même, et on ne clone pas la voix de Jean-Marc sans son accord.

1. fish.audio → Créer une voix → privée, une à deux minutes de la voix de Karim (Dictaphone, pièce calme).
2. Coller le texte de l'Humeur du N°01 (Studio → Humeurs) et générer.
3. Écouter : prononciation, rythme, liaisons, chiffres. Si c'est convaincant, joindre la version « voix » ; sinon, la version « narrateur ».
