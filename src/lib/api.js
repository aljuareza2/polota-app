/**
 * Polota.ar API Service
 * Combines both API-Football (for live match tracking, H2H, lineups)
 * and The-Odds-API (for live betting odds from multiple bookmakers).
 */

const ODDS_API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY;
const FOOTBALL_API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY;

// 1. THE-ODDS-API: Fetching Odds
export async function fetchLiveOdds(sport = 'soccer_argentina_primera_division') {
    // Defensively returning mock data if API key is not present in Vercel
    if (!ODDS_API_KEY) {
        console.warn("The-Odds-API key is missing. Returning fallback odds.");
        return getFallbackOdds();
    }

    try {
        const response = await fetch(
            `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${ODDS_API_KEY}&regions=eu,uk,us&markets=h2h&bookmakers=bet365,betsson,codere,betano&oddsFormat=decimal`,
            { next: { revalidate: 60 } } // Next.js cache config: revalidate every 60s
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching odds:", error);
        return getFallbackOdds();
    }
}

// 2. API-FOOTBALL: Fetching Live Matches & Fixtures
export async function fetchLiveMatches() {
    // Defensively returning mock data if API key is not present
    if (!FOOTBALL_API_KEY) {
        console.warn("API-Football key is missing. Returning fallback matches.");
        return getFallbackMatches();
    }

    try {
        const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": FOOTBALL_API_KEY
            },
            next: { revalidate: 30 } // revalidate every 30s
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error fetching matches:", error);
        return getFallbackMatches();
    }
}


// --- FALLBACK DATA ---
// Provided so Vercel deployment doesn't crash before you add the environment variables

function getFallbackOdds() {
    return [
        {
            id: 'mock_odds_1',
            sport_key: 'soccer_argentina_primera_division',
            home_team: 'Boca Juniors',
            away_team: 'River Plate',
            bookmakers: [
                {
                    title: 'Bet365',
                    markets: [{ key: 'h2h', outcomes: [{ name: 'Boca Juniors', price: 2.50 }, { name: 'Draw', price: 3.10 }, { name: 'River Plate', price: 2.85 }] }]
                },
                {
                    title: 'Codere',
                    markets: [{ key: 'h2h', outcomes: [{ name: 'Boca Juniors', price: 2.65 }, { name: 'Draw', price: 3.00 }, { name: 'River Plate', price: 2.70 }] }]
                }
            ]
        }
    ];
}

function getFallbackMatches() {
    return [
        {
            fixture: { id: 1, status: { short: "2H", elapsed: 74 } },
            league: { name: "Liga Profesional Argentina" },
            teams: { home: { name: "Boca Juniors" }, away: { name: "River Plate" } },
            goals: { home: 1, away: 1 }
        },
        {
            fixture: { id: 2, status: { short: "NS", elapsed: null } },
            league: { name: "Liga Profesional Argentina" },
            teams: { home: { name: "Racing Club" }, away: { name: "Independiente" } },
            goals: { home: null, away: null }
        }
    ];
}
