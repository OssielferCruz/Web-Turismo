import { Site } from "../types/site";

export const SITES: Site[] = [
  {
    id: 1,
    name: "Alcaldía Municipal de León",
    shortName: "Alcaldía de León",
    category: "Patrimonio UNESCO",
    emoji: "🏛️",
    lat: 12.4348,
    lng: -86.8795,
    description:
      "Sede histórica del gobierno municipal de León construida en 1942 en el solar fundacional de la Plaza Mayor de 1573. Destaca por su elegante arquitectura Art Déco y su papel como principal centro de decisión política de la ciudad.",
    history:
      "El terreno que ocupa la Alcaldía fue desde finales del siglo XVIII la Casa de los Gobernadores y el Cabildo Colonial, siguiendo las Ordenanzas de Nueva Población de 1573 dictadas por Felipe II. El edificio actual fue inaugurado en 1942 en la Plaza Mayor.",
    tips:
      "Ubicada frente al Parque Central Juan José Quesada y la Catedral. Es un punto excelente para iniciar el recorrido a pie por el centro histórico de León.",
    schedule: "Lun–Vie 08:00–17:00",
    rating: 4.6,
    reviews: 320,
    visitors: "25.000/año",
    entrance: "Ingreso libre (Áreas públicas)",
    duration: "20–30 min",
    difficulty: "Fácil",
    images: [
      "/Fotos/Alcaldia/alcaldia1.jpeg",
      "/Fotos/Alcaldia/alcaldia3.jpeg",
      "/Fotos/Alcaldia/alcaldia4.jpeg",
    ],
    tags: ["Art Déco", "Gobierno", "Historia", "Plaza Mayor"],
    audioUrl: "",
    details: {
      officialName: "Alcaldía Municipal de León",
      constructionDate: "1942 (Solar ocupado desde finales del s. XVIII por el Cabildo Colonial)",
      architect: "Administración Municipal de León (1942)",
      functionInfo: "Original y Actual: Sede del gobierno municipal y principal órgano político administrativo de León.",
      architecturalStyle: "Art Déco de los años 20 (Volumetría rectangular con simetría de vanos verticales y horizontales)",
      historicalImportance: "Ocupa el solar fundacional de la Plaza Mayor establecida en 1573 por las Ordenanzas de Nueva Población de Felipe II.",
      distinctiveElements: "Balcón de fachada que acentúa el relieve del edificio; interior dividido entre área administrativa y sector cultural-recreativo."
    }
  },
  {
    id: 2,
    name: "Palacio Departamental - Museo de la Revolución",
    shortName: "Palacio Departamental",
    category: "Museo",
    emoji: "🚩",
    lat: 12.4349,
    lng: -86.8790,
    description:
      "Emblemático inmueble neoclásico de 1935 que sirvió como sede del Gobierno Departamental. Hoy alberga el Museo de la Revolución, donde excombatientes guían a los visitantes entre fotografías, recortes de prensa y vestigios históricos.",
    history:
      "Diseñado por el reputado arquitecto Marcelo Targá en 1935. Durante la insurrección de 1979 el edificio sufrió impactos de bala y daños por la Guardia Nacional; sus salas conservan la memoria de la lucha revolucionaria en León.",
    tips:
      "El recorrido incluye el acceso a la azotea del edificio, ofreciendo una vista panorámica espectacular de la Catedral y los techos coloniales de León.",
    schedule: "Lun–Dom 08:00–17:00",
    rating: 4.7,
    reviews: 640,
    visitors: "40.000/año",
    entrance: "C$50 nacionales / $3 extranjeros",
    duration: "45–60 min",
    difficulty: "Fácil",
    images: [
      "/Fotos/PalacioDepartamental/palaciodep1.jpeg",
      "/Fotos/PalacioDepartamental/palaciodep2.jpeg",
      "/Fotos/PalacioDepartamental/palaciodep3.jpeg",
      "/Fotos/PalacioDepartamental/palaciodep5.jpeg",
    ],
    tags: ["Neoclásico", "Revolución", "Historia", "Museo"],
    audioUrl: "",
    details: {
      officialName: "Antiguo Palacio Departamental de León (Hoy Museo de la Revolución)",
      constructionDate: "1935",
      architect: "Arq. Marcelo Targá (Precursor del neoclasicismo en León)",
      functionInfo: "Original: Sede del Gobierno Departamental. Actual: Museo de la Revolución sobre la lucha sandinista.",
      architecturalStyle: "Influencias neoclásicas con pátina histórica de conservación de época",
      historicalImportance: "Testimonio vivo de la insurrección de 1979; sus muros conservan marcas del conflicto y salones dedicados a los héroes y mártires.",
      distinctiveElements: "Fachada neoclásica de 2 plantas, vestíbulos con murales históricos, artefactos de guerra y terraza panorámica."
    }
  },
  {
    id: 3,
    name: "Paraninfo UNAN-León",
    shortName: "Paraninfo UNAN",
    category: "Universidad",
    emoji: "🎓",
    lat: 12.4342,
    lng: -86.8789,
    description:
      "Edificio central y Salón de Actos Solemnes de la Universidad Nacional Autónoma de Nicaragua en León, fundada en 1812. Antiguo Convento de La Merced, es la cuna académica de la educación superior nicaragüense.",
    history:
      "El edificio fue originalmente el Convento de La Merced (1680) y pasó a ser sede de la universidad entre 1887 y 1899. El 18 de julio de 1979 se instaló aquí la primera Junta de Gobierno de Reconstrucción Nacional.",
    tips:
      "Visita el patio central colonial y la biblioteca. Durante días lectivos se pueden apreciar exposiciones abiertas sobre Rubén Darío y la historia universitaria.",
    schedule: "Lun–Vie 08:00–17:00",
    rating: 4.8,
    reviews: 510,
    visitors: "30.000/año",
    entrance: "Ingreso libre (Áreas comunes)",
    duration: "30–45 min",
    difficulty: "Fácil",
    images: [
      "/Fotos/Paraninfo/paraninfo1.jpg",
      "/Fotos/Paraninfo/paraninfo2.jpg",
      "/Fotos/Paraninfo/paraninfo3.jpg",
      "/Fotos/Paraninfo/paraninfo4.jpg",
    ],
    tags: ["Ecléctico", "Universidad", "Colonial", "UNAN"],
    audioUrl: "",
    details: {
      officialName: "Paraninfo / Edificio Central de la UNAN-León (antiguo Convento de La Merced)",
      constructionDate: "1887 - 1899 (Adaptación del Convento de La Merced de 1680)",
      architect: "Diseñado por el Arq. José Mateu",
      functionInfo: "Original: Convento de La Merced. Actual: Rectoría, Vicerrectoría, Biblioteca Central y Paraninfo de la UNAN-León.",
      architecturalStyle: "Eclecticism peculiar de 2 niveles en disposición simétrica elegante",
      historicalImportance: "Cuna de la educación universitaria nicaragüense (1812) y sitio histórico donde se proclamo la victoria revolucionaria de 1979.",
      distinctiveElements: "Carpintería artesanal labrada, pilastras en bajorrelieve en la biblioteca y ventanas interiores partidas con columnitas salomónicas (ajimez)."
    }
  },
  {
    id: 4,
    name: "Iglesia Nuestra Señora del Pilar de Zaragoza",
    shortName: "Iglesia de Zaragoza",
    category: "Iglesia",
    emoji: "⛪",
    lat: 12.4354,
    lng: -86.8870,
    description:
      "Singular templo romántico y ecléctico construido en piedra vista sin pintar entre 1884 y 1934. Conocida como la 'iglesia fortín', su arquitectura de sillería evoca la solidez de un castillo o baluarte defensivo.",
    history:
      "La construcción inició entre 1884 y 1886 y concluyó en 1934 bajo la dirección de Monseñor Salmerón y el Dr. Francisco Mateo. Su posición en el límite urbano histórico con el pueblo indígena de Sutiava le otorgó un carácter defensivo militar único.",
    tips:
      "Destaca por ser la única iglesia de León cuya fachada es íntegramente de piedra cantera sin repello ni pintura. Hermosa iluminación al atardecer.",
    schedule: "Lun–Dom 07:00–18:00",
    rating: 4.7,
    reviews: 390,
    visitors: "15.000/año",
    entrance: "Entrada libre",
    duration: "30–45 min",
    difficulty: "Fácil",
    images: [
      "/Fotos/Zaragoza/zaragoza1.jpeg",
      "/Fotos/Zaragoza/zaragoza2.jpeg",
      "/Fotos/Zaragoza/zaragoza3.jpeg",
    ],
    tags: ["Románico", "Piedra Vista", "Iglesia Fortín", "Colonial"],
    audioUrl: "",
    details: {
      officialName: "Iglesia Nuestra Señora del Pilar de Zaragoza",
      constructionDate: "1884-1886 (Inicios) - 1934 (Conclusión)",
      architect: "Concluida por Monseñor Salmerón; frontis diseñado por el Dr. Francisco Mateo",
      functionInfo: "Original y Actual: Templo católico parroquial (Uso constante sin interrupciones).",
      architecturalStyle: "Estilo ecléctico romántico de inspiración románica con detalles de arquitectura militar",
      historicalImportance: "Única 'iglesia fortín' entre las 16 iglesias coloniales de León, diseñada para resguardar la frontera entre León colonial y el asentamiento indígena de Sutiava.",
      distinctiveElements: "Construcción en sillería de piedra vista sin pintar, fachada tipo fortaleza y torre campanario central piramidal de 3 cuerpos."
    }
  },
  {
    id: 5,
    name: "Antigua Casa de Salud Debayle",
    shortName: "Casa Debayle",
    category: "Salud / Historia",
    emoji: "🏥",
    lat: 12.4348,
    lng: -86.8775,
    description:
      "Casona colonial de 1814 donde el célebre Dr. Luis Henry Debayle fundó en 1900 la primera clínica privada de Centroamérica. Hoy es sede de la Escuela de Bellas Artes 'Mariana Sansón' y recinto cultural de la UNAN-León.",
    history:
      "Construida en 1814 como sede del banco privado 'Bola de Oro' de la familia Ramírez. En 1900 fue adaptada como sanatorio por el Dr. Debayle, figura pionera de la medicina moderna. Entre 1926 y 1931 sirvió como cuartel de los Marines de EE.UU.",
    tips:
      "Alberga valiosas colecciones de arte precolombino con piezas de más de 2,500 años de antigüedad y salas de pintura nicaragüense contemporánea.",
    schedule: "Lun–Vie 09:00–17:00",
    rating: 4.6,
    reviews: 280,
    visitors: "18.000/año",
    entrance: "C$30 pp",
    duration: "45–60 min",
    difficulty: "Fácil",
    images: [
      "/Fotos/CasaDebayle/Casadebayle1.jpeg",
      "/Fotos/CasaDebayle/Cadadebayle2.jpeg",
      "/Fotos/CasaDebayle/Casadebayle3.jpeg",
      "/Fotos/CasaDebayle/Casadebayle4.jpeg",
      "/Fotos/CasaDebayle/Casadebayle5.jpeg",
    ],
    tags: ["Colonial", "Medicina", "Bellas Artes", "Historia"],
    audioUrl: "",
    details: {
      officialName: "Antigua Casa de Salud Debayle (Hoy Escuela de Bellas Artes Mariana Sansón - UNAN León)",
      constructionDate: "1814 (Casa original Bola de Oro) / 1900-1926 (Clínica médica)",
      architect: "Familia Ramírez / Adaptada por el Dr. Luis Henry Debayle",
      functionInfo: "Original: Banco privado 'Bola de Oro' (1814) -> Sanatorio médico (1900) -> Cuartel Militar (1926). Actual: Escuela de Bellas Artes y Recinto Cultural.",
      architecturalStyle: "Arquitectura señorial colonial leonesa de dos niveles con patio interior",
      historicalImportance: "Cuna de la primera clínica quirúrgica privada de Centroamérica. Restaurada tras los daños del Huracán Mitch de 1998.",
      distinctiveElements: "Salones dedicados a arqueología precolombina (500 a.C.), salas de exposiciones plásticas contemporáneas y galerías con arquería de madera."
    }
  },
  {
    id: 6,
    name: "Capilla y Colegio La Asunción",
    shortName: "Colegio La Asunción",
    category: "Iglesia",
    emoji: "⛪",
    lat: 12.4338,
    lng: -86.8785,
    description:
      "Majestuoso conjunto arquitectónico constituido por el antiguo Palacio Episcopal de 1679 y la bellísima Capilla Neogótica trazada en 1935. Es un ícono de la educación y el patrimonio religioso de León.",
    history:
      "El edificio original fue residencia de los obispos de León desde 1679. En 1898 el Obispo Simeón Pereira y Castellón cediá las instalaciones a las Religiosas de la Asunción. Tras el sismo de 1935, el Arq. Marcelo Targá construyó la actual capilla neogótica.",
    tips:
      "Admira los vitrales traídos de Europa e integrados en la fachada neogótica. Se ubica a solo 100 metros al sur del Parque Central.",
    schedule: "Lun–Vie 07:30–16:30",
    rating: 4.8,
    reviews: 410,
    visitors: "22.000/año",
    entrance: "Ingreso a capilla libre en horarios de culto",
    duration: "30–45 min",
    difficulty: "Fácil",
    images: [
      "/Fotos/LaAsunción/asuncion1.jpeg",
      "/Fotos/LaAsunción/asuncion2.jpeg",
      "/Fotos/LaAsunción/asuncion3.jpeg",
      "/Fotos/LaAsunción/asuncion5.jpeg",
      "/Fotos/LaAsunción/asuncion6.jpeg",
    ],
    tags: ["Neogótico", "Religioso", "Educación", "Vitrales"],
    audioUrl: "",
    details: {
      officialName: "Capilla y Colegio La Asunción (Antiguo Palacio Episcopal)",
      constructionDate: "1679 (Inmueble original Palacio Episcopal) / 1935 (Capilla Neogótica)",
      architect: "Obispo Andrés de las Navas y Quevedo (1679) / Capilla neogótica por Arq. Marcelo Targá (1935)",
      functionInfo: "Original: Palacio Episcopal (Residencia de los Obispos de León por dos siglos). Actual: Capilla y Colegio de las Madres Asuncionistas.",
      architecturalStyle: "Capilla Neogótica y Colegio con fachadas elípticas y neoclásicas",
      historicalImportance: "Residencia episcopal de Nicaragua durante más de 200 años y centro educativo católico femenino de gran arraigo desde 1898.",
      distinctiveElements: "Fachada neogótica con rosetón central, magníficos vitrales policromados y combinación de dos volumetrías históricas diferenciadas."
    }
  }
];