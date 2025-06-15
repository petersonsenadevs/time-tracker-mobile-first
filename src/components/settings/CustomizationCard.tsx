
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Moon, Sun, Globe, Calendar } from 'lucide-react';
import { useState } from 'react';

const CustomizationCard = () => {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('es');
  const [dateFormat, setDateFormat] = useState('dd/MM/yyyy');

  const themes = [
    { id: 'dark', name: 'Oscuro', icon: Moon },
    { id: 'light', name: 'Claro', icon: Sun }
  ];

  const languages = [
    { id: 'es', name: 'Español' },
    { id: 'en', name: 'English' }
  ];

  const dateFormats = [
    { id: 'dd/MM/yyyy', name: 'DD/MM/AAAA' },
    { id: 'MM/dd/yyyy', name: 'MM/DD/AAAA' },
    { id: 'yyyy-MM-dd', name: 'AAAA-MM-DD' }
  ];

  return (
    <div className="space-y-3 h-full overflow-hidden flex flex-col">
      {/* Tema */}
      <Card className="bg-gray-900/50 border-gray-700 flex-shrink-0">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-white text-sm">
            <Palette className="h-4 w-4 text-teal-400" />
            Tema
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`p-2 rounded-lg border transition-all flex items-center gap-2 text-xs ${
                  theme === themeOption.id
                    ? 'border-teal-400 bg-teal-400/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <themeOption.icon className="h-3 w-3 text-white" />
                <span className="text-white font-medium">{themeOption.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Idioma */}
      <Card className="bg-gray-900/50 border-gray-700 flex-shrink-0">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-white text-sm">
            <Globe className="h-4 w-4 text-teal-400" />
            Idioma
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`w-full p-2 rounded-lg border transition-all text-left text-xs ${
                  language === lang.id
                    ? 'border-teal-400 bg-teal-400/10 text-teal-300'
                    : 'border-gray-600 hover:border-gray-500 text-white'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formato de Fecha */}
      <Card className="bg-gray-900/50 border-gray-700 flex-1 min-h-0 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-white text-sm">
            <Calendar className="h-4 w-4 text-teal-400" />
            Formato de Fecha
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 h-full flex flex-col">
          <div className="space-y-1 flex-1">
            {dateFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setDateFormat(format.id)}
                className={`w-full p-2 rounded-lg border transition-all text-left text-xs ${
                  dateFormat === format.id
                    ? 'border-teal-400 bg-teal-400/10 text-teal-300'
                    : 'border-gray-600 hover:border-gray-500 text-white'
                }`}
              >
                <div className="flex justify-between">
                  <span>{format.name}</span>
                  <span className="text-gray-400">{format.id}</span>
                </div>
              </button>
            ))}
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white mt-3 h-8 text-xs">
            Guardar Configuración
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizationCard;
