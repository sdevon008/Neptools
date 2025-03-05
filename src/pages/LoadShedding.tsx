
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { Zap, Clock, CalendarClock } from 'lucide-react';
import { LoadSheddingSchedule } from '@/components/loadshedding/LoadSheddingSchedule';
import { LocationSelector } from '@/components/loadshedding/LocationSelector';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

const LoadShedding = () => {
  const { toast } = useToast();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showSelector, setShowSelector] = useState(true);
  
  const handleLocationSelect = (group: string) => {
    setSelectedGroup(group);
    setShowSelector(false);
    
    // Show toast notification
    toast({
      title: "Location Selected",
      description: `Showing load shedding schedule for ${group}`,
      duration: 3000,
    });
    
    // Trigger a refetch of the data
    queryClient.invalidateQueries({ queryKey: ['loadSheddingData'] });
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Nepal Electricity Load Shedding Schedule - NepTools</title>
          <meta name="description" content="Stay updated with the latest electricity load shedding schedules in Nepal. Real-time updates from Nepal Electricity Authority (NEA)." />
        </Helmet>
        
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nepal Electricity Load Shedding Schedule
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Stay updated with the latest electricity load shedding schedules. 
                  Data is automatically fetched daily from Nepal Electricity Authority.
                </p>
                <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Last updated: {format(new Date(), 'MMMM dd, yyyy')}</span>
                  <span className="mx-2">•</span>
                  <CalendarClock className="mr-1 h-4 w-4" />
                  <span>Auto-updates daily</span>
                </div>
              </div>
              
              {/* Ad Space */}
              <div className="mb-8">
                <AdSpace size="banner" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side - Location selector */}
                <div className="lg:col-span-1">
                  {showSelector ? (
                    <LocationSelector onSelectLocation={handleLocationSelect} />
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Your Location</h3>
                        <button 
                          onClick={() => setShowSelector(true)}
                          className="text-sm text-nepal-red hover:underline"
                        >
                          Change
                        </button>
                      </div>
                      
                      <div className="flex items-center p-3 bg-nepal-red/10 rounded-lg">
                        <MapPin className="mr-2 h-5 w-5 text-nepal-red" />
                        <div className="font-medium text-gray-900">{selectedGroup}</div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Important Notice</h4>
                        <p className="text-sm text-gray-600">
                          The schedule may change without prior notice. Please check 
                          regularly for the most up-to-date information.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right side - Load shedding schedule */}
                <div className="lg:col-span-2">
                  <LoadSheddingSchedule />
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default LoadShedding;
