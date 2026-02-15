export interface ServiceContent {
    slug: string;
    title: string;
    shortDescription: string;
    heroImage?: string;
    icon: string;
    accent: string;
    glowColor: string;
    sections: ServiceSection[];
}

export interface ServiceSection {
    type: 'text' | 'image' | 'video' | 'gallery' | 'text-image';
    title?: string;
    content?: string;
    imageUrl?: string;
    videoUrl?: string;
    images?: string[];
    imagePosition?: 'left' | 'right';
}

export const servicesData: ServiceContent[] = [
    {
        slug: 'tour-manager',
        title: 'Tour Manager',
        shortDescription: 'Gestión integral de giras nacionales e internacionales. El adulto de la gira que convierte el caos en precisión.',
        icon: '/icons/tour-manager.png',
        accent: 'from-stage-magenta to-pink-600',
        glowColor: 'rgba(224, 64, 251, 0.3)',
        heroImage: '/images/services/tour-manager-hero.svg',
        sections: [
            {
                type: 'text',
                title: '¿Qué es un Tour Manager?',
                content: 'Un Tour Manager es el profesional encargado de la gestión integral de una gira musical. Coordina todos los aspectos logísticos, administrativos y operativos para garantizar que cada show se desarrolle sin contratiempos.',
            },
            {
                type: 'text-image',
                title: 'Servicios que ofrecemos',
                content: 'Nuestro equipo de Tour Managers con más de 15 años de experiencia se encarga de:\n\n• Planificación y coordinación de rutas de gira\n• Gestión de presupuestos y finanzas\n• Coordinación con venues y promotores\n• Logística de transporte y alojamiento\n• Resolución de problemas en tiempo real\n• Comunicación entre artistas, equipo técnico y promotores',
                imageUrl: '/images/services/tour-manager-1.svg',
                imagePosition: 'right',
            },
            {
                type: 'text',
                title: 'Experiencia probada',
                content: 'Hemos gestionado giras nacionales e internacionales de artistas de primer nivel, garantizando profesionalidad, eficiencia y tranquilidad para que los artistas puedan centrarse en lo que mejor saben hacer: actuar.',
            },
        ],
    },
    {
        slug: 'produccion-estadios',
        title: 'Producción de Estadios y Arenas',
        shortDescription: 'Palau Sant Jordi, Estadi Olímpic y más. Producción a gran escala con estándares internacionales.',
        icon: '/icons/estadios.png',
        accent: 'from-stage-cyan to-blue-600',
        glowColor: 'rgba(0, 229, 255, 0.3)',
        heroImage: '/images/services/estadios-hero.svg',
        sections: [
            {
                type: 'text',
                title: 'Producción de Gran Formato',
                content: 'Especialistas en la producción de eventos en espacios de gran capacidad como el Palau Sant Jordi, Estadi Olímpic y las principales arenas de España.',
            },
            {
                type: 'text-image',
                title: 'Servicios de Producción',
                content: 'Nuestra experiencia en estadios y arenas incluye:\n\n• Coordinación técnica completa\n• Gestión de equipos de sonido, iluminación y video a gran escala\n• Coordinación de montaje y desmontaje\n• Gestión de equipos técnicos\n• Coordinación con venue y seguridad\n• Planificación de tiempos y recursos',
                imageUrl: '/images/services/estadios-1.svg',
                imagePosition: 'left',
            },
            {
                type: 'text',
                title: 'Estándares Internacionales',
                content: 'Trabajamos con los más altos estándares de la industria, garantizando producciones de nivel internacional en cualquier venue de gran formato.',
            },
        ],
    },
    {
        slug: 'logistica-festivales',
        title: 'Logística de Festivales',
        shortDescription: 'Primavera Sound, Sónar, Cruïlla. Coordinación de escenarios, artistas y operaciones en tiempo real.',
        icon: '/icons/festivales.png',
        accent: 'from-stage-amber to-orange-600',
        glowColor: 'rgba(255, 171, 0, 0.3)',
        heroImage: '/images/services/festivales-hero.svg',
        sections: [
            {
                type: 'text',
                title: 'Especialistas en Festivales',
                content: 'Experiencia comprobada en los principales festivales de España: Primavera Sound, Sónar, Cruïlla y muchos más. Coordinación de múltiples escenarios, artistas y operaciones simultáneas.',
            },
            {
                type: 'text-image',
                title: 'Coordinación Logística Completa',
                content: 'Gestión integral de festivales que incluye:\n\n• Coordinación de múltiples escenarios\n• Gestión de riders y hospitality\n• Coordinación de transportes y transfers\n• Gestión de backstage y catering\n• Coordinación entre artistas, técnicos y producción\n• Resolución de conflictos en tiempo real',
                imageUrl: '/images/services/festivales-1.svg',
                imagePosition: 'right',
            },
            {
                type: 'text',
                title: 'Operaciones en Tiempo Real',
                content: 'Nuestro equipo está preparado para gestionar la complejidad de un festival, con múltiples artistas, cambios de escenario rápidos y la coordinación necesaria para que todo fluya perfectamente.',
            },
        ],
    },
    {
        slug: 'merchandising',
        title: 'Merchandising',
        shortDescription: 'Gestión completa de merchandising oficial: diseño, producción, logística y venta en gira.',
        icon: '/icons/merchandising.png',
        accent: 'from-stage-magenta to-stage-cyan',
        glowColor: 'rgba(224, 64, 251, 0.2)',
        heroImage: '/images/services/merchandising-hero.svg',
        sections: [
            {
                type: 'text',
                title: 'Merchandising de Gira',
                content: 'Gestión completa del merchandising oficial de artistas, desde el concepto inicial hasta la venta en gira y online.',
            },
            {
                type: 'text-image',
                title: 'Servicios Integrales',
                content: 'Nuestro servicio de merchandising incluye:\n\n• Diseño y desarrollo de productos\n• Producción y fabricación\n• Gestión de inventario\n• Logística y transporte\n• Montaje y gestión de stands en venues\n• Venta y gestión de personal\n• Reporting y análisis de ventas',
                imageUrl: '/images/services/merchandising-1.svg',
                imagePosition: 'left',
            },
            {
                type: 'text',
                title: 'Maximiza tus Ingresos',
                content: 'El merchandising es una fuente de ingresos fundamental en las giras. Nuestro equipo experto garantiza la máxima rentabilidad con productos de calidad que los fans adoran.',
            },
        ],
    },
    {
        slug: 'vehiculos',
        title: 'Vehículos',
        shortDescription: 'Flota propia de vehículos para transporte de equipos, backline y personal técnico.',
        icon: '/icons/vehiculos.png',
        accent: 'from-gray-400 to-gray-600',
        glowColor: 'rgba(200, 200, 220, 0.15)',
        heroImage: '/images/services/vehiculos-hero.svg',
        sections: [
            {
                type: 'text',
                title: 'Flota Propia',
                content: 'Disponemos de una flota propia de vehículos adaptados para el transporte de equipos, instrumentos, backline y personal técnico.',
            },
            {
                type: 'text-image',
                title: 'Servicios de Transporte',
                content: 'Nuestra flota incluye:\n\n• Furgonetas de carga para equipos y backline\n• Vehículos para transporte de personal\n• Conductores profesionales con experiencia en giras\n• Seguros completos\n• Mantenimiento y limpieza garantizados\n• Disponibilidad 24/7',
                imageUrl: '/images/services/vehiculos-1.svg',
                imagePosition: 'right',
            },
            {
                type: 'text',
                title: 'Confiabilidad Garantizada',
                content: 'Nuestros vehículos reciben mantenimiento regular y están preparados para las exigencias de las giras. Confiabilidad cuando más la necesitas.',
            },
        ],
    },
];
