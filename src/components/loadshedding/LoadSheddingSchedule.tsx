
import { useState } from 'react';
import { Calendar, Clock, MapPin, AlertTriangle, Info } from 'lucide-react';
import { useLoadSheddingData, LoadSheddingGroup } from '@/services/loadSheddingService';
import { format } from 'date-fns';

export const LoadSheddingSchedule = () => {
  const { data, isLoading, isError, error } = useLoadSheddingData();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showAllGroups, setShowAllGroups] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-t-4 border-nepal-red border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading the latest load shedding schedule...</p>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="bg-red-50 p-6 rounded-lg flex items-start space-x-4">
        <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-medium text-red-800">Failed to load schedule</h3>
          <p className="text-red-700 mt-1">
            {error instanceof Error ? error.message : 'Unable to fetch the load shedding schedule. Please try again later.'}
          </p>
        </div>
      </div>
    );
  }
  
  if (!data || !data.groups || data.groups.length === 0) {
    return (
      <div className="bg-yellow-50 p-6 rounded-lg flex items-start space-x-4">
        <Info className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-medium text-yellow-800">No Schedule Available</h3>
          <p className="text-yellow-700 mt-1">
            There is currently no load shedding schedule available. Please check back later.
          </p>
        </div>
      </div>
    );
  }
  
  const lastUpdated = new Date(data.lastUpdated);
  
  const filteredGroups = selectedGroup 
    ? data.groups.filter(group => group.group === selectedGroup) 
    : showAllGroups 
      ? data.groups 
      : [data.groups[0]];
  
  return (
    <div className="space-y-6">
      <div className="bg-nepal-red/10 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2 text-nepal-red mb-2 md:mb-0">
          <Info className="h-5 w-5" />
          <span className="font-medium">Last Updated: {format(lastUpdated, 'MMMM dd, yyyy, HH:mm')}</span>
        </div>
        <div className="text-sm text-gray-600">
          Source: {data.source}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => {
            setSelectedGroup(null);
            setShowAllGroups(true);
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            showAllGroups && !selectedGroup 
              ? 'bg-nepal-red text-white' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Show All Groups
        </button>
        
        {data.groups.map((group) => (
          <button
            key={group.group}
            onClick={() => {
              setSelectedGroup(group.group);
              setShowAllGroups(false);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedGroup === group.group 
                ? 'bg-nepal-red text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {group.group}
          </button>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredGroups.map((group) => (
          <ScheduleCard key={group.group} group={group} />
        ))}
      </div>
    </div>
  );
};

interface ScheduleCardProps {
  group: LoadSheddingGroup;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ group }) => {
  // Determine today's day to highlight it
  const today = format(new Date(), 'EEEE');
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-nepal-red text-white p-4">
        <h3 className="text-xl font-bold flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          {group.group}
        </h3>
      </div>
      
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="pb-2 text-left text-gray-500 font-medium">Day</th>
              <th className="pb-2 text-left text-gray-500 font-medium">Load Shedding Times</th>
            </tr>
          </thead>
          <tbody>
            {group.schedule.map((day) => (
              <tr 
                key={day.day}
                className={`border-t border-gray-100 ${day.day === today ? 'bg-nepal-red/5' : ''}`}
              >
                <td className="py-3 pr-4 flex items-center">
                  <Calendar className={`mr-2 h-4 w-4 ${day.day === today ? 'text-nepal-red' : 'text-gray-400'}`} />
                  <span className={day.day === today ? 'font-bold text-nepal-red' : ''}>
                    {day.day}
                    {day.day === today && <span className="ml-2 text-xs bg-nepal-red text-white px-2 py-0.5 rounded-full">Today</span>}
                  </span>
                </td>
                <td className="py-3">
                  <div className="space-y-1">
                    {day.times.map((time, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <Clock className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
