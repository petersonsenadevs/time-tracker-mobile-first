
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
    <div className="space-y-6">
      {/* Tema */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Palette className="h-5 w-5 text-teal-400" />
            Tema de la Aplicación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`p-4 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  theme === themeOption.id
                    ? 'border-teal-400 bg-teal-400/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <themeOption.icon className="h-5 w-5 text-white" />
                <span className="text-white font-medium">{themeOption.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Idioma */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Globe className="h-5 w-5 text-teal-400" />
            Idioma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`w-full p-3 rounded-lg border transition-all text-left ${
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
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-teal-400" />
            Formato de Fecha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dateFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setDateFormat(format.id)}
                className={`w-full p-3 rounded-lg border transition-all text-left ${
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
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
};

export default CustomizationCard;
