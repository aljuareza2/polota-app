import { Brain, Layers, BarChart2, Trophy } from 'lucide-react'
import { fetchLiveOdds, fetchLiveMatches } from '@/lib/api'

// We force dynamic rendering so Next.js fetches fresh data on every request in Vercel
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch data in parallel on the server
  const [oddsData, matchesData] = await Promise.all([
    fetchLiveOdds(),
    fetchLiveMatches()
  ])

  // Simple UI for the Server Component layout
  // (In a full scale app, we would split the Tabs into Client Components)
  
  return (
    <main className="min-h-screen bg-bg-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-bg-panel border-b border-glass-border">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-text-main font-display">
            Polota<span className="text-accent-cyan">.ar</span>
          </h1>
          <span className="bg-gradient-to-r from-accent-cyan to-blue-600 text-white px-2 py-0.5 rounded text-xs font-bold uppercase">
            Pulpo AI
          </span>
        </div>
        <div className="flex items-center gap-2 text-accent-danger font-bold text-sm">
          <span className="w-2 h-2 rounded-full bg-accent-danger pulse block"></span>
          EN VIVO
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto p-4 mt-6 space-y-12">
        
        {/* API-Football Data Section */}
        <section>
          <div className="bg-bg-panel p-4 rounded-t-lg border-b-2 border-accent-cyan flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent-cyan" />
            <h2 className="text-xl font-bold">Partidos En Vivo (Vía API-Football)</h2>
          </div>
          <div className="bg-bg-panel rounded-b-lg p-4">
            {matchesData && matchesData.length > 0 ? (
              <div className="space-y-2">
                 {matchesData.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border-b border-glass-border last:border-0 hover:bg-bg-panel-hover">
                      <div className="text-accent-green font-bold w-12 text-center">
                        {m.fixture?.status?.elapsed ? `${m.fixture.status.elapsed}'` : 'NS'}
                      </div>
                      <div className="flex-1 flex justify-center items-center gap-4 text-lg font-semibold">
                        <span className="text-right flex-1">{m.teams?.home?.name}</span>
                        <span className="bg-bg-dark px-4 py-1 rounded text-accent-cyan font-black">
                          {m.goals?.home ?? '-'} : {m.goals?.away ?? '-'}
                        </span>
                        <span className="text-left flex-1">{m.teams?.away?.name}</span>
                      </div>
                    </div>
                 ))}
              </div>
            ) : (
              <p className="text-text-muted">No hay partidos en vivo disponibles.</p>
            )}
          </div>
        </section>

        {/* The-Odds-API Data Section */}
        <section>
          <div className="bg-bg-panel p-4 rounded-t-lg border-b-2 border-accent-gold flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-accent-gold" />
            <h2 className="text-xl font-bold">Cuotas Globales (Vía The-Odds-API)</h2>
          </div>
          <div className="bg-bg-panel rounded-b-lg p-4 overflow-x-auto">
            {oddsData && oddsData.length > 0 ? (
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="p-3 text-left">Evento</th>
                    <th className="p-3 text-text-muted">Casa</th>
                    <th className="p-3 text-accent-gold">Cuotas (H2H)</th>
                  </tr>
                </thead>
                <tbody>
                  {oddsData.map((odd, i) => (
                    <tr key={i} className="border-b border-glass-border/30 hover:bg-bg-panel-hover">
                      <td className="p-3 text-left font-bold">
                        {odd.home_team} vs {odd.away_team}
                      </td>
                      <td className="p-3">
                        {odd.bookmakers?.map((b, idx) => (
                           <div key={idx} className="text-sm my-1">{b.title}</div>
                        ))}
                      </td>
                      <td className="p-3">
                        {odd.bookmakers?.map((b, idx) => (
                           <div key={idx} className="flex justify-center gap-2 my-1">
                             {b.markets[0]?.outcomes.map((out, oidx) => (
                               <span key={oidx} className="bg-bg-dark px-2 py-1 rounded text-xs">
                                 {out.name}: <span className="text-accent-gold font-bold">{out.price}</span>
                               </span>
                             ))}
                           </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-text-muted">No hay cuotas disponibles.</p>
            )}
          </div>
        </section>

      </div>
      
      {/* Affiliate Bar Mock */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 border-t-2 border-accent-gold p-4 flex justify-center gap-4 z-50">
        <a href="#" className="flex items-center gap-2 bg-white/5 px-6 py-2 rounded-lg border border-accent-gold/30 hover:bg-white/10 transition">
          <strong className="text-white">Codere</strong>
          <span className="bg-accent-gold text-black px-2 py-1 rounded text-xs font-black">Bono $100.000</span>
        </a>
      </div>
    </main>
  )
}
