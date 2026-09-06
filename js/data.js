const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTu4ojCpcx6nXbkKRjiatZ_0oDCZ4ChrdL7OBSKq8q3tK0XTgFc4844OY3v7w5dNnACNOiO8pl57e4/pub?output=csv";

// Datos de respaldo actualizados de Coordinación
const fallbackData = {
    sabados: [
        { room: 'Aula Sistemas', capacity: '8', col1: '[LAE26C] ING0101 - Inglés Básico Inicial ESL (Karla Berenice López González)', col2: '[ISC25B] ISC0417 - Ecuaciones diferenciales y series (Karla Berenice López González)', col3: '[LAE26A, LAE26B] LAE0313 - Contabilidad Financiera (Juan Pablo Gómez Ruiz)' },
        { room: 'Montessori', capacity: '14', col1: '[ISC25B] ING0404 - Enseñanza de la segunda lengua en el idioma inglés (Samuel Guadalupe Pérez Urquín)', col2: '[LAE25A, LAE25B] LAE0522 - Administración Estratégica (Karime Esquivel Herrejón)', col3: '[ISC25A, LAE25A, LAE25B] ING0505 - Conversacional ESL (Samuel Guadalupe Pérez Urquín)' },
        { room: 'Piaget', capacity: '6', col1: '[LAE26A, LAE26B] LAE0312 - Presupuestos (Alejandra Estefanía Guzmán Gutiérrez)', col2: '[ISC24A, ISC24B] ISC0945 - Gestión estratégica de proyectos (Alejandra Estefanía Guzmán Gutiérrez)', col3: '[ISC24A, ISC24B] ISC0941 - Desarrollo de aplicaciones móviles (Luis Manuel Lescieur Santiago)' },
        { room: 'Salón Paulo Freire', capacity: '12', col1: '[LAE25A, LAE25B] LAE0521 - Logística y cadena de suministro (Juan Carlos Culej Pérez)', col2: '[LAE26A, LAE26B] ING0303 - Inglés pre-intermedio ESL (Samuel Guadalupe Pérez Urquín)', col3: '[LAE26C] LAE0102 - Entorno socioeconómico y político de México (Juan Carlos Culej Pérez)' },
        { room: 'Salón Vigotsky (PB)', capacity: 'Reserva', col1: 'Prioridad Embarazo / Accesibilidad', col2: 'Prioridad Embarazo / Accesibilidad', col3: 'Prioridad Embarazo / Accesibilidad' }
    ],
    hibrido: [
        { room: 'Salón John Dewey', capacity: '8', col1: '[ISC25A] ISC0524 - Programación Avanzada (Luis Manuel Lescieur)', col2: 'Presencial: 16:00 a 18:00 hrs', col3: 'Virtual: Actividades asíncronas Jueves a Sábado' },
        { room: 'Salón Vigotsky (PB)', capacity: '10', col1: '[LAE24B] LAE0734 - Marketing Digital (Karime Esquivel)', col2: 'Presencial: 18:00 a 20:00 hrs', col3: 'Virtual: Entregables semanales (Corte Domingo)' }
    ],
    remoto: [
        { room: 'Campus Virtual', capacity: 'Ilimitado', col1: '[ISC24C, LAE24B] ISC0525 - Gestión de equipos y liderazgo (Hugo Alberto Ozuna)', col2: 'Asíncrono 24/7 (Se contabiliza como impartida)', col3: 'Síncrono opcional: Martes 19:00 hrs (Zoom)' }
    ]
};

const DataManager = {
    currentData: fallbackData,
    
    async fetchAcademics() {
        return new Promise((resolve) => {
            if (!GOOGLE_SHEETS_CSV_URL) {
                resolve(this.currentData);
                return;
            }

            Papa.parse(GOOGLE_SHEETS_CSV_URL, {
                download: true,
                header: true,
                complete: (results) => {
                    // Aquí procesaremos el CSV en el futuro dividiéndolo por modalidad
                    // Por ahora, validamos la conexión y retornamos los datos seguros
                    console.log("Conexión exitosa a Google Sheets", results.data);
                    resolve(this.currentData); 
                },
                error: (error) => {
                    console.warn("Retornando datos de respaldo (Error de red/CSV):", error);
                    resolve(this.currentData);
                }
            });
        });
    }
};