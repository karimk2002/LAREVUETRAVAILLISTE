// Rend proposition.html en PDF A4, en deux variantes (voix clonée / voix de narrateur),
// plus une image PNG par page pour contrôle.
// Usage : NODE_PATH=$(npm root -g) node proposition/render.cjs
const path = require('path');
const { chromium } = require('playwright');

const dir = __dirname;
const src = 'file://' + path.join(dir, 'proposition.html');
const variantes = [
  { nom: 'voix', fichier: 'La-Revue-travailliste-proposition-diffusion.pdf', classe: '' },
  { nom: 'narrateur', fichier: 'La-Revue-travailliste-proposition-diffusion-narrateur.pdf', classe: 'narrateur' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  for (const v of variantes) {
    await page.goto(src, { waitUntil: 'networkidle' });
    await page.evaluate((c) => { if (c) document.body.classList.add(c); }, v.classe);
    await page.evaluate(() => document.fonts.ready);
    const polices = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family));
    if (!polices.some((f) => f.includes('Newsreader')) || !polices.some((f) => f.includes('Barlow'))) {
      throw new Error('Polices non chargées : ' + polices.join(', '));
    }
    // Contrôle : aucun contenu ne doit déborder d'une page.
    const debords = await page.evaluate(() => [...document.querySelectorAll('.page')].map((p, i) => {
      const bas = p.getBoundingClientRect().bottom;
      const trop = [...p.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().bottom > bas + 0.5 && e.offsetParent !== null);
      return trop.length ? `page ${i + 1} : ${trop.length} éléments débordent` : null;
    }).filter(Boolean));
    if (debords.length) throw new Error(debords.join(' ; '));
    await page.pdf({ path: path.join(dir, v.fichier), format: 'A4', printBackground: true, preferCSSPageSize: true });
    const pages = await page.$$('.page');
    for (let i = 0; i < pages.length; i++) {
      await pages[i].screenshot({ path: path.join(dir, 'apercu', `${v.nom}-page${i + 1}.png`) });
    }
    console.log('OK', v.fichier);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
