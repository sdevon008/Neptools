
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';

interface LocationSelectorProps {
  onSelectLocation: (location: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  // Mock data - in production this would come from an API
  const locations = [
    { name: "Kathmandu - New Baneshwor", group: "Group A" },
    { name: "Kathmandu - Baluwatar", group: "Group B" },
    { name: "Lalitpur - Jawalakhel", group: "Group C" },
    { name: "Bhaktapur - Durbar Square", group: "Group D" },
    { name: "Kathmandu - Maharajgunj", group: "Group A" },
    { name: "Lalitpur - Pulchowk", group: "Group B" },
    { name: "Kathmandu - Chakrapath", group: "Group C" },
    { name: "Bhaktapur - Suryabinayak", group: "Group D" },
  ];
  
  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  const handleSelectLocation = (group: string) => {
    onSelectLocation(group);
    setShowResults(false);
    setSearchQuery('');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Your Location</h3>
      
      <form onSubmit={handleSearch} className="relative mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your area name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-red/50"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          
          <CustomButton
            type="submit"
            variant="primary"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            Search
          </CustomButton>
        </div>
      </form>
      
      {showResults && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, index) => (
              <div 
                key={index} 
                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleSelectLocation(location.group)}
              >
                <div className="flex items-start">
                  <MapPin className="mt-0.5 mr-2 h-5 w-5 text-nepal-red flex-shrink-0" />
                  <div>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-gray-500">{location.group}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No locations found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Locations</h4>
        <div className="flex flex-wrap gap-2">
          {locations.slice(0, 4).map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelectLocation(location.group)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
