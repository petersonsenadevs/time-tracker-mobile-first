
#!/bin/bash

echo "Inicializando Capacitor..."

# Verificar si Capacitor ya está inicializado
if [ ! -f "capacitor.config.ts" ]; then
    echo "Error: capacitor.config.ts no encontrado. El archivo ya debe existir."
    exit 1
fi

echo "Configuración de Capacitor encontrada."
echo "Para continuar el desarrollo móvil:"
echo ""
echo "1. Exporta este proyecto a GitHub usando el botón 'Export to GitHub'"
echo "2. Clona el repositorio localmente: git clone <tu-repo-url>"
echo "3. Instala dependencias: npm install"
echo "4. Añade plataformas:"
echo "   - Para Android: npx cap add android"
echo "   - Para iOS: npx cap add ios"
echo "5. Actualiza dependencias nativas: npx cap update ios/android"
echo "6. Haz build del proyecto: npm run build"
echo "7. Sincroniza cambios: npx cap sync"
echo "8. Ejecuta en dispositivo:"
echo "   - Android: npx cap run android"
echo "   - iOS: npx cap run ios"
echo ""
echo "Requisitos:"
echo "- Para iOS: Mac con Xcode instalado"
echo "- Para Android: Android Studio instalado"
echo ""
echo "¡Capacitor está listo para usar!"
