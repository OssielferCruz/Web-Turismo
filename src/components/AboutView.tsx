import { Language } from "../types/site";

interface AboutViewProps {
  lang?: Language;
}

export default function AboutView({ lang = "es" }: AboutViewProps) {
  const isEn = lang === "en";

  return (
    <div className="flex-1 overflow-y-auto bg-[#faf7f4] pb-36 md:pb-12 text-[#2d2420]">
      {/* Hero Cover Header */}
      <div className="relative bg-gradient-to-r from-[#1a1612] via-[#2a1e17] to-[#3d2b20] text-white py-12 px-6 sm:px-12 border-b border-[#4a3d35] shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#e97c2e] backdrop-blur-xs">
              <span>🇳🇮</span>
              <span>León, Nicaragua · 12.4353° N, 86.8792° W</span>
            </div>
            <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Santiago de los Caballeros de León
            </h1>
            <p className="text-sm sm:text-base text-[#d4c5b9] leading-relaxed font-light">
              {isEn
                ? "Cultural Capital · Cradle of University Education · Architectural Treasure of Nicaragua"
                : "Capital Cultural · Cuna de la Educación Universitaria · Tesoro Arquitectónico de Nicaragua"}
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/10 border border-white/20 p-4 rounded-2xl text-center backdrop-blur-sm min-w-[140px]">
            <span className="text-3xl font-extrabold font-['Outfit',sans-serif] text-[#e97c2e] block">
              1524
            </span>
            <span className="text-[11px] uppercase tracking-wider font-mono text-[#c4b6ab]">
              {isEn ? "Founding Year" : "Año de Fundación"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area - Editorial Layout */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-10 space-y-12">
        {/* Section 1: Historia & Origen */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-[#e5ddd5] pb-3">
            <span className="text-2xl">📜</span>
            <h2 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-[#1a1612]">
              {isEn ? "History & Urban Evolution" : "Historia y Evolución Urbana"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm text-[#4a423d] leading-relaxed pt-2">
            <div className="space-y-3">
              <p className="first-letter:text-4xl first-letter:font-extrabold first-letter:text-[#c2622a] first-letter:float-left first-letter:mr-2">
                {isEn
                  ? "León is one of the most historically significant cities in Latin America. Originally founded in 1524 on the shores of Lake Xolotlán by Francisco Hernández de Córdoba, it was relocated to its current site in 1610 following violent earthquakes and the eruption of the Momotombo volcano."
                  : "León es una de las ciudades de mayor arraigo histórico en América Latina. Fundada originalmente en 1524 a orillas del Lago Xolotlán por Francisco Hernández de Córdoba, debió ser trasladada a su emplazamiento actual en 1610 tras una violenta serie de sismos y la erupción del volcán Momotombo."}
              </p>
              <p>
                {isEn
                  ? "The urban design of new León followed the Hispanic colonial grid model around its Plaza Mayor (1573), where the political, religious, and cultural powers of the nation converge."
                  : "El diseño urbano de la nueva León siguió el modelo colonial de cuadrícula hispánica alrededor de su Plaza Mayor (1573), donde convergen los poderes políticos, religiosos y culturales de la nación."}
              </p>
            </div>
            <div className="space-y-3 border-l-2 border-[#e97c2e]/30 pl-4">
              <p>
                {isEn
                  ? "Cradle of scholars, poets, and national heroes, León hosted the founding of Nicaragua's first university in 1812 (UNAN-León), transforming the city into Central America's intellectual capital."
                  : "Cuna de sabios, poetas y próceres de la patria, León albergó en 1812 la fundación de la primera universidad de Nicaragua (UNAN-León), convirtiendo a la ciudad en la capital intelectual de Centroamérica."}
              </p>
              <p>
                {isEn
                  ? "Its cobblestone streets have witnessed historic milestones, from independence struggles to the July 18, 1979 installation of the National Reconstruction Government Junta in the historic Paraninfo."
                  : "Sus calles adoquinadas han sido testigo de momentos trascendentales, desde las gestas independentistas hasta la instalación de la Junta de Gobierno de Reconstrucción Nacional el 18 de julio de 1979 en el histórico Paraninfo."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Los Estilos Arquitectónicos de León */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-[#e5ddd5] pb-3">
            <span className="text-2xl">🏛️</span>
            <h2 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-[#1a1612]">
              {isEn ? "Architectural Diversity & Styles" : "Riqueza y Estilos Arquitectónicos"}
            </h2>
          </div>

          <p className="text-sm text-[#4a423d] leading-relaxed">
            {isEn
              ? "León's architecture stands out for a fascinating blend of historical eras, materials, and artistic movements coexisting harmoniously in its historic center:"
              : "La arquitectura leonesa destaca por una fascinante superposición de épocas, materiales y tendencias artísticas que conviven armónicamente en su casco antiguo:"}
          </p>

          {/* Editorial Stream Line */}
          <div className="space-y-6 pt-2">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#fff4ee] text-[#c2622a] border border-[#c2622a]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                01
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  {isEn ? "Art Déco (Early 20th Century)" : "Art Déco (Principios del Siglo XX)"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  {isEn
                    ? "Characterized by rectangular volumes, strict symmetry, and vertical relief. The city's primary example is the León Municipal City Hall (1942), built over the colonial House of Governors."
                    : "Caracterizado por volumetrías rectangulares, simetría rigurosa y relieve en vanos verticales. El ejemplo emblemático en la ciudad es la Alcaldía Municipal de León (1942), construida sobre el solar colonial de la antigua Casa de Gobernadores."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#eff6ff] text-[#1d4ed8] border border-[#1d4ed8]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                02
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  {isEn ? "Monumental Neoclassical" : "Neoclásico Monumental"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  {isEn
                    ? "With stately archways and ornamented frontispieces led by renowned architect Marcelo Targá. Highlighted by the Departmental Palace (1935), now the Revolution Museum."
                    : "Con arquerías señoriales y frontis ornamentados, liderados por el célebre arquitecto Marcelo Targá. Sobresale el Palacio Departamental (1935), actual Museo de la Revolución."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#fffbeb] text-[#b45309] border border-[#b45309]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                03
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  {isEn ? "Historicist & Fortress Church Style" : "Estilo Historicista e Iglesia Fortín"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  {isEn
                    ? "Unique among León's 16 churches, Our Lady of the Pillar Zaragoza Church (1884–1934) combines historicism with Romanesque inspiration and visible stone masonry, evoking a colonial defense bastion."
                    : "Única en su clase entre las 16 iglesias de León, la Iglesia Nuestra Señora del Pilar de Zaragoza (1884–1934) combina el estilo historicista con inspiración románica en sillería de piedra visible sin pintar, emulando la solidez de un baluarte defensivo."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#f5f3ff] text-[#7c3aed] border border-[#7c3aed]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                04
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  {isEn ? "Neogothic & Imported Stained Glass" : "Neogótico y Vitrales Importados"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  {isEn
                    ? "Slender ogives and rose windows imported from Europe, featured in La Asunción School Chapel (1935), attached to the 1679 Episcopal Palace."
                    : "Espacios de esbeltas ojivas y rosetones traídos de Europa, presentes en la Capilla del Colegio La Asunción (1935), adosada al histórico Palacio Episcopal de 1679."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#fdf2f8] text-[#be185d] border border-[#be185d]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                05
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  {isEn ? "Historicist University & Fine Arts Heritage" : "Historicismo Universitario y Bellas Artes"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  {isEn
                    ? "Stately historicist and colonial structures with central courtyards, carved woodwork, and Solomonic columns, seen in the Paraninfo UNAN-León and the Former Debayle Health House (1814), now the Mariana Sansón School of Fine Arts."
                    : "Estructuras de estilo historicista y colonial señorial con patios centrales, carpintería labrada y columnitas salomónicas, evidenciadas en el Paraninfo UNAN-León y la Antigua Casa de Salud Debayle (1814), actual Escuela de Bellas Artes 'Mariana Sansón'."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Qué Encontrarás en Esta Plataforma Web */}
        <section className="bg-gradient-to-br from-[#2a1e17] to-[#1a1612] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#4a3d35] space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#e97c2e] uppercase tracking-wider">
              {isEn ? "Web Platform Content" : "Contenido de la Plataforma Web"}
            </span>
            <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-extrabold text-white">
              {isEn ? "What can you explore on this website?" : "¿Qué puedes explorar en este sitio web?"}
            </h2>
            <p className="text-xs sm:text-sm text-[#c4b6ab] leading-relaxed">
              {isEn
                ? "This platform is designed as an interactive high-precision multimedia tour of León's architectural heritage:"
                : "Esta plataforma ha sido diseñada como un recorrido interactivo multimedia de alta precisión sobre el patrimonio arquitectónico de León:"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            <div className="flex gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  {isEn ? "Interactive Map with Google Places Pins" : "Mapa Interactivo con Fichas de Google Places"}
                </h4>
                <p className="text-xs text-[#b8a99c] mt-1 leading-relaxed">
                  {isEn
                    ? "Georeferenced locations with highlighted pins and direct links to official Google Maps entity cards."
                    : "Ubicaciones georreferenciadas con pines resaltados y enlaces directos a las fichas oficiales en Google Maps."}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🎧</span>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  {isEn ? "Bilingual Narrated Audio Guides" : "Audioguías Narradas Bilingües"}
                </h4>
                <p className="text-xs text-[#b8a99c] mt-1 leading-relaxed">
                  {isEn
                    ? "Integrated audio player with real-time seeker (mm:ss), background preloading, and seamless language toggling between Spanish and English audio tracks."
                    : "Reproductor de audio integrado con cronómetro en tiempo real (`mm:ss`), precarga automática y alternancia limpia entre pistas de español e inglés."}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🏛️</span>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  {isEn ? "Detailed Architectural Sheets" : "Fichas Arquitectónicas Detalladas"}
                </h4>
                <p className="text-xs text-[#b8a99c] mt-1 leading-relaxed">
                  {isEn
                    ? "Structured technical data covering construction dates, architects, styles, historical uses, and distinctive features."
                    : "Información técnica estructurada sobre años de construcción, arquitectos, estilos, usos históricos y elementos distintivos."}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🖼️</span>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  {isEn ? "Photo Gallery" : "Galería Fotográfica"}
                </h4>
                <p className="text-xs text-[#b8a99c] mt-1 leading-relaxed">
                  {isEn
                    ? "Original photo collections of each building with full-screen Lightbox viewer."
                    : "Colecciones de fotos originales de cada edificio con visor expandible a pantalla completa (Lightbox)."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Technical Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e5ddd5] text-xs text-[#9a8e84] font-mono">
          <span>WGS84 · {isEn ? "Timezone UTC−6" : "Zona Horaria UTC−6"}</span>
          <span>{isEn ? "Currency: Nicaraguan Córdoba (C$)" : "Moneda: Córdoba Nicaragüense (C$)"}</span>
          <span>León, Nicaragua</span>
        </div>
      </div>
    </div>
  );
}
