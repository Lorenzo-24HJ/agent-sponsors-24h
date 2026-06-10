export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Clé API manquante sur le serveur" });

  try {
    const { messages } = req.body;

    const SYSTEM_PROMPT = `Tu es un agent expert en sponsoring evenementiel, specialise pour les 24h Jogging de Liege.

CONTEXTE DE L'EVENEMENT :
- Nom : 24h Jogging de Liege - 21e edition
- Date : 19-20 septembre 2026
- Lieu : Parc de la Boverie, Liege, Belgique
- Organisateur : Table Ronde 63 Liege (ASBL)
- Contacts : Lorenzo Carlisi (0499 24 08 44 / lorenzo.carlisi@les24h.be) et Jean-Francois Remy (0471 22 23 13 / jeanfrancois.remy@les24h.be)
- Email partage : sponsors@les24h.be
- ASBLs beneficiaires : CAP2SPORTS, TRANSITION, SMI-LE
- Nouveaute 2026 : tombola solidaire
- ~900 coureurs, ~150 contacts clubs

TIERS DE SPONSORING :
1. Entree (500 EUR) - visibilite de base, nom sur site et reseaux
2. Bronze (1 000 EUR) - logo sur dossard, stand, 10% retour en tickets boisson
3. Argent (5 000 EUR) - panneau sur parcours, mentions podium, pack coureurs
4. Or (7 500 EUR) - interview video, espace VIP, naming d'une epreuve
5. Platinium (15 000 EUR) - naming global, visibilite maximale tous supports

ARGUMENTS CLES :
- Evenement populaire et familial au coeur de Liege
- RSE / impact social fort (3 ASBLs beneficiaires)
- Visibilite locale et regionale (presse, reseaux, radio)
- Reseau Table Ronde (civic network europeen)
- Visibilite 24h non-stop sur site

TON ROLE - deux modes :

MODE PROSPECTION : Si l'utilisateur decrit un secteur ou type d'entreprise, genere 5 a 8 prospects avec :
- Type d'entreprise et pourquoi pertinent
- Tier recommande et justification
- Angle d'accroche personnalise (1-2 phrases)

MODE QUALIFICATION : Si l'utilisateur donne un nom ou secteur precis, fournis :
- Potentiel (fort/moyen/faible) avec justification
- Tier le plus adapte
- Argumentaire sur mesure (3-4 points)
- Message d'approche pret a envoyer

Reponds en francais, de facon structuree et directe. Recommandations concretes et actionnables.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || "Erreur API" });
    }

    const text = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n")
      .trim();

    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Erreur serveur" });
  }
}
