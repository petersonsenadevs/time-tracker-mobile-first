
export interface OnboardingStep {
  title: string;
  description: string;
  image: string;
  features: string[];
}

export const onboardingSteps: OnboardingStep[] = [
  {
    title: "Gestiona tus Jornadas Laborales",
    description: "Controla todas tus horas trabajadas de forma fácil e intuitiva. Visualiza tu progreso mensual y mantén un registro detallado de tu tiempo.",
    image: "/lovable-uploads/bfd99b63-af51-4f55-b15d-b526c781aec2.png",
    features: ["Seguimiento de horas mensuales", "Cálculo automático de salario", "Calendario interactivo"]
  },
  {
    title: "Crea Nuevas Jornadas",
    description: "Registra fácilmente nuevas jornadas de trabajo con hora de inicio, fin y tipo de trabajo. Todo en una interfaz simple y clara.",
    image: "/lovable-uploads/66f39635-85e3-4f8c-b1f3-14a00e3ba067.png",
    features: ["Configuración rápida", "Tipos de trabajo flexibles", "Validación inteligente"]
  },
  {
    title: "Reportes y Estadísticas",
    description: "Accede a reportes detallados con estadísticas de tu rendimiento. Visualiza tus horas normales y extra de forma clara.",
    image: "/lovable-uploads/eec8982f-0585-4f4c-ae65-a0518519858f.png",
    features: ["Reportes mensuales", "Estadísticas visuales", "Exportación de datos"]
  }
];
