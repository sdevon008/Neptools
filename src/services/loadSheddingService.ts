
import { useQuery } from '@tanstack/react-query';

// Interfaces for the load shedding data structure
export interface LoadSheddingGroup {
  group: string;
  schedule: Array<{
    day: string;
    times: string[];
  }>;
}

export interface LoadSheddingData {
  lastUpdated: string;
  source: string;
  groups: LoadSheddingGroup[];
}

// Dummy data for fallback when fetch fails
const dummyData: LoadSheddingData = {
  lastUpdated: new Date().toISOString(),
  source: "Nepal Electricity Authority",
  groups: [
    {
      group: "Group A",
      schedule: [
        { day: "Sunday", times: ["06:00 - 09:00", "18:00 - 21:00"] },
        { day: "Monday", times: ["09:00 - 12:00", "21:00 - 00:00"] },
        { day: "Tuesday", times: ["00:00 - 03:00", "12:00 - 15:00"] },
        { day: "Wednesday", times: ["03:00 - 06:00", "15:00 - 18:00"] },
        { day: "Thursday", times: ["06:00 - 09:00", "18:00 - 21:00"] },
        { day: "Friday", times: ["09:00 - 12:00", "21:00 - 00:00"] },
        { day: "Saturday", times: ["00:00 - 03:00", "12:00 - 15:00"] },
      ]
    },
    {
      group: "Group B",
      schedule: [
        { day: "Sunday", times: ["03:00 - 06:00", "15:00 - 18:00"] },
        { day: "Monday", times: ["06:00 - 09:00", "18:00 - 21:00"] },
        { day: "Tuesday", times: ["09:00 - 12:00", "21:00 - 00:00"] },
        { day: "Wednesday", times: ["00:00 - 03:00", "12:00 - 15:00"] },
        { day: "Thursday", times: ["03:00 - 06:00", "15:00 - 18:00"] },
        { day: "Friday", times: ["06:00 - 09:00", "18:00 - 21:00"] },
        { day: "Saturday", times: ["09:00 - 12:00", "21:00 - 00:00"] },
      ]
    },
    {
      group: "Group C",
      schedule: [
        { day: "Sunday", times: ["00:00 - 03:00", "12:00 - 15:00"] },
        { day: "Monday", times: ["03:00 - 06:00", "15:00 - 18:00"] },
        { day: "Tuesday", times: ["06:00 - 09:00", "18:00 - 21:00"] },
        { day: "Wednesday", times: ["09:00 - 12:00", "21:00 - 00:00"] },
        { day: "Thursday", times: ["00:00 - 03:00", "12:00 - 15:00"] },
        { day: "Friday", times: ["03:00 - 06:00", "15:00 - 18:00"] },
        { day: "Saturday", times: ["06:00 - 09:00", "18:00 - 21:00"] },
      ]
    },
    {
      group: "Group D",
      schedule: [
        { day: "Sunday", times: ["09:00 - 12:00", "21:00 - 00:00"] },
        { day: "Monday", times: ["00:00 - 03:00", "12:00 - 15:00"] },
        { day: "Tuesday", times: ["03:00 - 06:00", "15:00 - 18:00"] },
        { day: "Wednesday", times: ["06:00 - 09:00", "18:00 - 21:00"] },
        { day: "Thursday", times: ["09:00 - 12:00", "21:00 - 00:00"] },
        { day: "Friday", times: ["00:00 - 03:00", "12:00 - 15:00"] },
        { day: "Saturday", times: ["03:00 - 06:00", "15:00 - 18:00"] },
      ]
    },
  ]
};

/**
 * Fetches load shedding data from the NEA website
 * This function would typically scrape the NEA website, but for now returns dummy data
 */
const fetchLoadSheddingData = async (): Promise<LoadSheddingData> => {
  try {
    // In a real implementation, we would use a serverless function to scrape the NEA website
    // since direct browser scraping is limited by CORS
    // For now, we'll simulate a delay and return dummy data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, we return the dummy data
    // In production, we would parse the actual NEA website data
    return {
      ...dummyData,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error fetching load shedding data:", error);
    // Return dummy data as fallback
    return dummyData;
  }
};

/**
 * React Query hook for fetching load shedding data
 */
export const useLoadSheddingData = () => {
  return useQuery({
    queryKey: ['loadSheddingData'],
    queryFn: fetchLoadSheddingData,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    refetchInterval: 24 * 60 * 60 * 1000, // Refetch every 24 hours
  });
};
