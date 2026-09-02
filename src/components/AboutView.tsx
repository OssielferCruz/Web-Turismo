export default function AboutView() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#faf7f4] pb-24 md:pb-12 text-[#2d2420]">
      {/* Hero Cover Header */}
      <div className="relative bg-gradient-to-r from-[#1a1612] via-[#2a1e17] to-[#3d2b20] text-white py-12 px-6 sm:px-12 border-b border-[#4a3d35] shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#e97c2e] backdrop-blur-xs">
              <span>🇳🇮</span>
              <span>León, Nicaragua · 12.4353° N, 86.8792° O</span>
            </div>
            <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Santiago de los Caballeros de León
            </h1>
            <p className="text-sm sm:text-base text-[#d4c5b9] leading-relaxed font-light">
              Capital Cultural · Cuna de la Educación Universitaria · Tesoro Arquitectónico de Nicaragua
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/10 border border-white/20 p-4 rounded-2xl text-center backdrop-blur-sm min-w-[140px]">
            <span className="text-3xl font-extrabold font-['Outfit',sans-serif] text-[#e97c2e] block">
              1524
            </span>
            <span className="text-[11px] uppercase tracking-wider font-mono text-[#c4b6ab]">
              Año de Fundación
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area - Editorial Layout without rigid cards */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-10 space-y-12">
        {/* Section 1: Historia & Origen */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-[#e5ddd5] pb-3">
            <span className="text-2xl">📜</span>
            <h2 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-[#1a1612]">
              Historia y Evolución Urbana
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[#4a423d] leading-relaxed pt-2">
            <div className="space-y-3">
              <p className="first-letter:text-4xl first-letter:font-extrabold first-letter:text-[#c2622a] first-letter:float-left first-letter:mr-2">
                León es una de las ciudades de mayor arraigo histórico en América Latina. Fundada originalmente en 1524 a orillas del Lago Xolotlán por Francisco Hernández de Córdoba, debió ser trasladada a su emplazamiento actual en 1610 tras una violenta serie de sismos y la erupción del volcán Momotombo.
              </p>
              <p>
                El diseño urbano de la nueva León siguió el modelo colonial de cuadrícula hispánica alrededor de su Plaza Mayor (1573), donde convergen los poderes políticos, religiosos y culturales de la nación.
              </p>
            </div>
            <div className="space-y-3 border-l-2 border-[#e97c2e]/30 pl-4">
              <p>
                Cuna de sabios, poetas y próceres de la patria, León albergó en 1812 la fundación de la primera universidad de Nicaragua (UNAN-León), convirtiendo a la ciudad en la capital intelectual de Centroamérica.
              </p>
              <p>
                Sus calles adoquinadas han sido testigo de momentos trascendentales, desde las gestas independentistas hasta la proclamación de la Junta de Gobierno de Reconstrucción Nacional en 1979 en el histórico Paraninfo.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Los Estilos Arquitectónicos de León */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-[#e5ddd5] pb-3">
            <span className="text-2xl">🏛️</span>
            <h2 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-[#1a1612]">
              Riqueza y Estilos Arquitectónicos
            </h2>
          </div>

          <p className="text-sm text-[#4a423d] leading-relaxed">
            La arquitectura leonesa destaca por una fascinante superposición de épocas, materiales y tendencias artísticas que conviven armónicamente en su casco antiguo:
          </p>

          {/* Editorial Stream Line */}
          <div className="space-y-6 pt-2">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#fff4ee] text-[#c2622a] border border-[#c2622a]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                01
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  Art Déco (Principios del Siglo XX)
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  Caracterizado por volumetrías rectangulares, simetría rigurosa y relieve en vanos verticales. El ejemplo emblemático en la ciudad es la <strong className="text-[#1a1612]">Alcaldía Municipal de León</strong> (1942), construida sobre el solar colonial de la antigua Casa de Gobernadores.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#eff6ff] text-[#1d4ed8] border border-[#1d4ed8]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                02
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  Neoclásico Monumental
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  Con arquerías señoriales y frontis ornamentados, liderados por el célebre arquitecto Marcelo Targá. Sobresale el <strong className="text-[#1a1612]">Palacio Departamental</strong> (1935), actual Museo de la Revolución.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#fffbeb] text-[#b45309] border border-[#b45309]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                03
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  Romántico Militante / Iglesia Fortín
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  Única en su clase entre las 16 iglesias de León, la <strong className="text-[#1a1612]">Iglesia Nuestra Señora del Pilar de Zaragoza</strong> (1884–1934) fue levantada en sillería de piedra vista sin pintar, emulando la solidez de un baluarte defensivo colonial.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#f5f3ff] text-[#7c3aed] border border-[#7c3aed]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                04
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  Neogótico y Vitrales Importados
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  Espacios de esbeltas ojivas y rosetones traídos de Europa, presentes en la <strong className="text-[#1a1612]">Capilla del Colegio La Asunción</strong> (1935), adosada al histórico Palacio Episcopal de 1679.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#fdf2f8] text-[#be185d] border border-[#be185d]/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                05
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612]">
                  Colonial Leonés y Arquería de Madera
                </h3>
                <p className="text-xs sm:text-sm text-[#5c524c] mt-1 leading-relaxed">
                  Casonas señoriales de doble planta con patios centrales y carpintería labrada, evidenciadas en el <strong className="text-[#1a1612]">Paraninfo UNAN-León</strong> (antiguo Convento de La Merced) y la <strong className="text-[#1a1612]">Antigua Casa de Salud Debayle</strong> (1814), cuna de la medicina privada centroamericana.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Qué Encontrarás en Esta Plataforma Web */}
        <section className="bg-gradient-to-br from-[#2a1e17] to-[#1a1612] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#4a3d35] space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#e97c2e] uppercase tracking-wider">
              Contenido de la Plataforma Web
            </span>
            <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-extrabold text-white">
              ¿Qué puedes explorar en este sitio web?
            </h2>
            <p className="text-xs sm:text-sm text-[#c4b6ab] leading-relaxed">
              Esta plataforma ha sido diseñada como un recorrido interactivo multimedia de alta precisión sobre el patrimonio arquitectónico de León:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            <div className="flex gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  Mapa Interactivo con Google Places
                </h4>
                <p className="text-xs text-[#b8a99c] mt-1 leading-relaxed">
                  Ubicaciones georreferenciadas con pines resaltados y enlaces directos a las fichas oficiales en Google Maps.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🎧</span>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  Audioguías Narradas
                </h4>
                <p className="text-xs text-[#b8a99c] mt-1 leading-relaxed">
                  Reproductor de audio integrado con cronómetro en tiempo real (`mm:ss`) y barra interactiva para adelantar o retroceder el relato.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🏛️</span>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  Fichas Arquitectónicas Detalladas
                </h4>
                <p className="text-xs text-[#b8a99c] mt-1 leading-relaxed">
                  Información técnica estructurada sobre años de construcción, arquitectos, estilos, usos históricos y elementos distintivos.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🖼️</span>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                  Galería Fotográfica en Alta Resolución
                </h4>
                <p className="text-xs text-[#b8a99c] mt-1 leading-relaxed">
                  Colecciones de fotos originales de cada edificio con visor expandible a pantalla completa (Lightbox).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Technical Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e5ddd5] text-xs text-[#9a8e84] font-mono">
          <span>WGS84 · Zona Horaria UTC−6</span>
          <span>Moneda: Córdoba Nicaragüense (C$)</span>
          <span>León, Nicaragua</span>
        </div>
      </div>
    </div>
  );
}
