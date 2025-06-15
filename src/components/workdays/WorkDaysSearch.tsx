
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface WorkDaysSearchProps {
  searchDate: string;
  onSearchDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const WorkDaysSearch = ({ searchDate, onSearchDateChange, onSearch }: WorkDaysSearchProps) => {
  return (
    <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700 mb-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5 text-teal-400" />
          Buscar por Fecha
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="date-search" className="block text-sm font-medium text-gray-300 mb-2">
              Fecha (DD/MM/YYYY)
            </label>
            <Input
              id="date-search"
              type="text"
              placeholder="15/06/2025"
              value={searchDate}
              onChange={onSearchDateChange}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400"
              maxLength={10}
            />
          </div>
          <Button 
            onClick={onSearch}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkDaysSearch;
