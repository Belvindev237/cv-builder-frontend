/**
 * Extrait TOUS les styles CSS de la page actuelle
 * Fonctionne pour tous les templates automatiquement
 */
export function extractAllStyles() {
  const styles = [];
  
  try {
    // Parcourir toutes les feuilles de style
    for (const sheet of document.styleSheets) {
      try {
        // Vérifier que le stylesheet est accessible (pas de CORS)
        if (sheet.cssRules) {
          for (const rule of sheet.cssRules) {
            styles.push(rule.cssText);
          }
        }
      } catch (e) {
        // Ignorer les erreurs CORS des CDN externes
        console.warn('Cannot access stylesheet:', sheet.href);
      }
    }
  } catch (e) {
    console.error('Error extracting styles:', e);
  }
  
  return styles.join('\n');
}

/**
 * Génère le HTML complet avec tous les styles inline
 */
export function generateStyledHTML(htmlContent, templateId) {
  const allStyles = extractAllStyles();
  
  // ✅ Ajustements spécifiques par template
const templateAdjustments = {
  5: `
    @page {
      size: A4;
      margin: 0; /* Supprime les marges par défaut du navigateur */
    }

    /* Force le conteneur à ne jamais dépasser une feuille */
    .min-h-\\[29\\.7cm\\] { 
      height: 29.7cm !important;
      min-height: 29.7cm !important;
      max-height: 29.7cm !important;
      overflow: hidden !important;
      box-shadow: none !important;
    }

    /* Empêche de couper les blocs d'expérience au milieu */
    section, .relative.pl-14 {
      break-inside: avoid;
    }

    /* Réduction légère des paddings pour gagner de l'espace de sécurité */
    .p-10 { padding: 1.5rem !important; }
    .p-8 { padding: 1.2rem !important; }
    .mb-10 { margin-bottom: 1.5rem !important; }
  `,
};
  
  const customAdjustments = templateAdjustments[templateId] || '';
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    /* Styles extraits */
    ${allStyles}
    
    /* Ajustements par template */
    ${customAdjustments}
    
    /* Styles de base */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', sans-serif; 
      -webkit-print-color-adjust: exact; 
      print-color-adjust: exact; 
    }
    
    /* Empêcher les coupures de page */
    section { 
      page-break-inside: avoid; 
      break-inside: avoid; 
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
  `;
}