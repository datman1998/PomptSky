import React, { useState } from 'react';
import { Copy, Check, Image as ImageIcon, FileText, Home, Lightbulb, Github, Search } from 'lucide-react';

const MOCK_PROMPTS = [
  {
    id: 1,
    type: 'image',
    tool: 'Midjourney',
    title: 'Norsk vinterhytte med nordlys',
    content: 'En fotorealistisk og koselig norsk hytte på fjellet om vinteren, tykt lag med snø på taket, sterkt grønt nordlys (aurora borealis) over stjernehimmelen, varmt og innbydende gult lys fra vinduene, 8k oppløsning, filmatisk belysning, nasjonalromantisk stil.',
    tags: ['Natur', 'Vinter', 'Fotorealisme']
  },
  {
    id: 2,
    type: 'image',
    tool: 'DALL-E 3',
    title: 'Cyberpunk Oslo',
    content: 'Et konseptbilde av Oslo sentrum (Karl Johan) i år 2150 i cyberpunk-stil. Mørkt, regnfullt, med neon-skilt på norsk. Slottet lyser opp i bakgrunnen med futuristiske detaljer. Flygende biler og mennesker med kybernetiske implantater. Detaljert digital kunst.',
    tags: ['Cyberpunk', 'Fremtid', 'Sci-fi']
  },
  {
    id: 3,
    type: 'text',
    tool: 'ChatGPT',
    title: 'Forklar komplekse temaer enkelt',
    content: 'Forklar konseptet [Sett inn tema, f.eks. Kvantefysikk / Rentes rente] for en 5-åring på norsk. Bruk enkle metaforer, korte setninger og en vennlig, oppmuntrende tone.',
    tags: ['Læring', 'Forenkling']
  },
  {
    id: 4,
    type: 'text',
    tool: 'Claude / ChatGPT',
    title: 'Bloggpost om kunstig intelligens',
    content: 'Skriv en engasjerende, profesjonell, men lettlest introduksjon (maks 3 avsnitt) til en bloggpost. Bloggposten skal handle om hvordan kunstig intelligens vil endre hverdagen til norske arbeidstakere de neste 5 årene. Avslutt med et spørsmål som engasjerer leseren.',
    tags: ['Blogg', 'Tekstforfatting', 'Jobb']
  },
  {
    id: 5,
    type: 'image',
    tool: 'Midjourney',
    title: 'Minimalistisk app-ikon',
    content: 'Et minimalistisk og moderne app-ikon for en norsk tur-app. Hovedmotivet er et stilisert fjell med en furu. Flat design, vektor-stil, harmoniske farger (mørkegrønn, skifergrå, hvit bakgrunn), ingen tekst.',
    tags: ['Design', 'Ikon', 'Minimalisme']
  },
  {
    id: 6,
    type: 'text',
    tool: 'Generell AI',
    title: 'Korrektur og forbedring av tekst',
    content: 'Vennligst les gjennom følgende tekst. Rett opp alle skrivefeil og grammatiske feil. Gjør språket mer flytende og profesjonelt, men behold den opprinnelige meningen. Gi meg først den forbedrede versjonen, og deretter en kort punktliste over de viktigste endringene du gjorde: [Lim inn teksten din her]',
    tags: ['Korrektur', 'Skriving']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'image', 'text'

  const handleCopy = (text, id) => {
    // Bruker document.execCommand for bredere kompatibilitet i iframes
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Kunne ikke kopiere tekst', err);
    }
    document.body.removeChild(textArea);
  };

  const filteredPrompts = MOCK_PROMPTS.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'all' || prompt.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                PomptSky
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}
              >
                <Home className="w-4 h-4" /> <span>Hjem</span>
              </button>
              <button
                onClick={() => setActiveTab('prompts')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'prompts' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}
              >
                <Search className="w-4 h-4" /> <span>Utforsk Prompts</span>
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'tips' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}
              >
                <Lightbulb className="w-4 h-4" /> <span>Tips & Triks</span>
              </button>
            </nav>

            {/* Mobile menu button (simplified for demo) */}
            <div className="md:hidden flex space-x-2">
              <button onClick={() => setActiveTab('home')} className={`p-2 rounded-md ${activeTab === 'home' ? 'bg-blue-100 text-blue-600' : 'text-slate-500'}`}><Home className="w-5 h-5" /></button>
              <button onClick={() => setActiveTab('prompts')} className={`p-2 rounded-md ${activeTab === 'prompts' ? 'bg-blue-100 text-blue-600' : 'text-slate-500'}`}><Search className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto pt-8 pb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                Norsk AI Prompt Builder
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                PomptSky er et åpent prosjekt dedikert til å samle, organisere og dele nyttige prompts til løsninger innen kunstig intelligens (AI) med fokus på bilde- og tekstgenerering.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => setActiveTab('prompts')}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Utforsk Prompts
                </button>
                <a href="#bidra" className="px-8 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium shadow-sm transition-all flex items-center justify-center gap-2">
                  <Github className="w-5 h-5" /> Bidra på GitHub
                </a>
              </div>
            </div>

            {/* Innhold / Kategori Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bildegenerering</h3>
                <p className="text-slate-600">Prompts for kunst, fotografi, ikoner og illustrasjoner (DALL·E, Midjourney, etc).</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tekstgenerering</h3>
                <p className="text-slate-600">Prompts for historier, skriving av oppgaver, analyser og kode (ChatGPT, Claude, etc).</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Beste praksis</h3>
                <p className="text-slate-600">Lær deg temabaserte eksempler og tips for å skrive mer effektive AI-prompts.</p>
              </div>
            </div>

            {/* Kom i gang & Bidra */}
            <div className="grid md:grid-cols-2 gap-8 mt-12" id="bidra">
              <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">🚀 Kom i gang</h2>
                <ol className="space-y-4 text-slate-700 list-decimal list-inside">
                  <li>Bla gjennom samlingen for å finne relevante prompts.</li>
                  <li>Kopier den prompten du ønsker å bruke.</li>
                  <li>Lim den inn i ditt valgte AI-verktøy.</li>
                  <li>Juster gjerne prompten til ditt eget bruk!</li>
                </ol>
              </div>

              <div className="bg-slate-100/50 p-8 rounded-2xl border border-slate-200">
                <h2 className="text-2xl font-bold mb-4 text-slate-900">🤝 Slik kan du bidra</h2>
                <p className="text-slate-700 mb-4">
                  Du er velkommen til å sende inn pull requests med egne forslag, forbedringer eller rettinger. Følg gjerne disse retningslinjene:
                </p>
                <ul className="space-y-2 text-slate-700 list-disc list-inside">
                  <li>Skriv tydelige og kortfattede beskrivelser</li>
                  <li>Angi hvilket AI-verktøy prompten er optimalisert for</li>
                  <li>Foreslå alltid norsk tekst der det er mulig</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PROMPTS TAB */}
        {activeTab === 'prompts' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-slate-900">Utforsk Prompts</h2>

              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Søk i prompts..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="border border-slate-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="all">Alle kategorier</option>
                  <option value="image">Bildegenerering</option>
                  <option value="text">Tekstgenerering</option>
                </select>
              </div>
            </div>

            {filteredPrompts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-500 text-lg">Fant ingen prompts som matchet søket ditt.</p>
                <button onClick={() => {setSearchQuery(''); setActiveFilter('all');}} className="mt-4 text-blue-600 font-medium hover:underline">Tøm søk</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt) => (
                  <div key={prompt.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {prompt.type === 'image' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-700">
                            <ImageIcon className="w-3.5 h-3.5" /> Bilde
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                            <FileText className="w-3.5 h-3.5" /> Tekst
                          </span>
                        )}
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                          {prompt.tool}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">{prompt.title}</h3>
                      <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 font-mono relative group whitespace-pre-wrap leading-relaxed border border-slate-100">
                        {prompt.content}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {prompt.tags.map(tag => (
                          <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">#{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                      <button
                        onClick={() => handleCopy(prompt.content, prompt.id)}
                        className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
                          copiedId === prompt.id
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {copiedId === prompt.id ? (
                          <><Check className="w-4 h-4" /> Kopiert!</>
                        ) : (
                          <><Copy className="w-4 h-4" /> Kopier Prompt</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Tips for å skrive effektive AI-prompts</h2>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                  Vær spesifikk og detaljert
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  I stedet for å si "skriv en historie om en hund", si heller "Skriv en spennende kort-historie for barn om en golden retriever som heter Max, som oppdager en hemmelig portal i bakgården, skrevet i en eventyrlig tone".
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                  Gi AI-en en rolle (Persona)
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Start prompten med å definere hvem AI-en skal være. For eksempel: "Opptre som en senior utvikler", "Du er en ekspert på norsk grammatikk", eller "Som en kreativ interiørdesigner...". Dette hjelper modellen med å treffe riktig tone og kunnskapsnivå.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span>
                  Angi formatet for utdata
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Fortell nøyaktig hvordan du vil ha svaret presentert. Vil du ha en tabell? En punktliste? JSON-format? Maksimalt to avsnitt? Ved å spesifisere format, unngår du at AI-en gjetter hvordan du vil ha det presentert.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold text-white mb-2 block">PomptSky</span>
            <p className="text-sm">Velkommen til Norges samling for smarte AI-prompts!</p>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>Dette prosjektet er open source og lisensiert under MIT-lisensen.</p>
            <p className="mt-2">© {new Date().getFullYear()} PomptSky Contributors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
