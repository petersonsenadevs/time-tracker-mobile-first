
# Configuración para Desarrollo Móvil

Esta aplicación está configurada para funcionar como app nativa en Android e iOS usando Capacitor.

## Requisitos Previos

- **Para iOS**: Mac con Xcode instalado
- **Para Android**: Android Studio instalado
- Node.js y npm

## Pasos para Desarrollo Móvil

### 1. Exportar y Clonar el Proyecto

1. Haz clic en el botón "Export to GitHub" en Lovable
2. Clona el repositorio en tu máquina local:
   ```bash
   git clone <tu-repo-url>
   cd <nombre-del-proyecto>
   ```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Añadir Plataformas Móviles

Para Android:
```bash
npx cap add android
```

Para iOS:
```bash
npx cap add ios
```

### 4. Actualizar Dependencias Nativas

```bash
npx cap update ios
npx cap update android
```

### 5. Build y Sincronización

```bash
# Hacer build del proyecto web
npm run build

# Sincronizar cambios con las plataformas nativas
npx cap sync
```

### 6. Ejecutar en Dispositivo/Emulador

Para Android:
```bash
npx cap run android
```

Para iOS:
```bash
npx cap run ios
```

## Desarrollo Continuo

Después de hacer cambios en el código:

1. `npm run build` - para compilar los cambios web
2. `npx cap sync` - para sincronizar con las apps nativas
3. `npx cap run android/ios` - para probar en dispositivo

## Hot Reload

Durante el desarrollo en Lovable, la app móvil puede conectarse directamente al servidor de desarrollo para ver cambios en tiempo real, sin necesidad de rebuild constante.

## Características Nativas Disponibles

Con Capacitor, puedes acceder a:
- Cámara y galería
- Geolocalización
- Notificaciones push
- Almacenamiento nativo
- Y muchas más APIs nativas

Para añadir plugins adicionales:
```bash
npm install @capacitor/camera @capacitor/geolocation @capacitor/push-notifications
npx cap sync
```
