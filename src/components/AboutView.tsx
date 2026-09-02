export default function AboutView() {
  const sections = [
    {
      title: "La Ciudad de León",
      icon: "🏙️",
      text: "León es la segunda ciudad más grande de Nicaragua y su capital cultural e intelectual. Fundada originalmente en 1524, fue la primera capital del país y hoy alberga la universidad más antigua de Centroamérica. Sus calles adoquinadas, iglesias coloniales y vibrante vida estudiantil la convierten en un destino fascinante.",
    },
    {
      title: "Patrimonio de la Humanidad (UNESCO)",
      icon: "🏛️",
      text: "León cuenta con dos sitios reconocidos como Patrimonio de la Humanidad por la UNESCO: la majestuosa Catedral de la Asunción (declarada en 2011) y las Ruinas de León Viejo (declaradas en 2000). La catedral es la más grande de América Central, y las ruinas preservan la primera ciudad española sepultada por la erupción del volcán Momotombo en 1610.",
    },
    {
      title: "Naturaleza y Aventura Volcánica",
      icon: "🌋",
      text: "A pocos kilómetros del centro histórico se encuentra la impresionante Cordillera de los Maribios con siete volcanes activos. El Volcán Cerro Negro ofrece la famosa experiencia de 'volcano boarding', donde visitantes se deslizan por laderas de arena volcánica negra. A solo 30 minutos se encuentran las playas del Pacífico como Las Peñitas y Poneloya.",
    },
    {
      title: "Cómo Llegar y Traslados",
      icon: "✈️",
      text: "El aeropuerto internacional más cercano es Augusto C. Sandino (MGA) en Managua, situado a unos 90 km. Desde Managua existen microbuses expresos y taxis colectivos hacia León con frecuencia constante. El trayecto por la carretera panamericana toma aproximadamente 1 hora y media.",
    },
    {
      title: "Clima y Mejor Época para Visitar",
      icon: "☀️",
      text: "La mejor época para viajar comprende la temporada seca (noviembre a abril), ofreciendo días soleados y temperaturas entre 28°C y 35°C. La Semana Santa y las fiestas patronales de agosto destacan por sus elaboradas alfombras de aserrín y procesiones tradicionales.",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f5f0eb] pb-20 md:pb-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center gap-4 p-5 bg-white border border-[#e5ddd5] rounded-2xl shadow-xs">
          <div className="w-14 h-14 bg-[#c2622a] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
            🇳🇮
          </div>
          <div>
            <h2 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-extrabold text-[#1a1612]">
              León, Nicaragua
            </h2>
            <p className="text-xs sm:text-sm text-[#9a8e84]">
              Capital Cultural · Ciudad Universitaria · Patrimonio Colonial
            </p>
          </div>
        </div>

        {/* Content Cards */}
        {sections.map(({ title, icon, text }) => (
          <div
            key={title}
            className="bg-white border border-[#e5ddd5] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow"
          >
            <h3 className="font-['Outfit',sans-serif] text-base font-bold text-[#1a1612] mb-2 flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span>{title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#4a423d] leading-relaxed">{text}</p>
          </div>
        ))}

        {/* Technical Info Box */}
        <div className="p-4 bg-[#fff3ec] border border-[#fcd5b8] rounded-xl text-xs text-[#9a6040] font-mono leading-relaxed">
          DATUM · WGS84 · Zona Horaria UTC−6 · Moneda C$ (Córdoba Nicaragüense) · Código País +505
        </div>
      </div>
    </div>
  );
}
