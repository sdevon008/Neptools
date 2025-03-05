
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';

const NepaliCalendar = () => {
  // Get current year in Nepali calendar (approximately 56-57 years ahead of Gregorian)
  const currentDate = new Date();
  const currentGregorianYear = currentDate.getFullYear();
  const currentNepaliYear = currentGregorianYear + 56;  // Approximate conversion
  
  // List of Nepali months for SEO content
  const nepaliMonths = [
    'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 
    'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 
    'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`Nepali Calendar ${currentNepaliYear} | BS to AD Date Converter | Nepali Patro`}</title>
        <meta name="description" content={`View Nepali Calendar ${currentNepaliYear}, ${currentNepaliYear+1}, ${currentNepaliYear+2} with holidays and festivals. Convert dates between BS and AD. Check Falgun, Chaitra, and Magh calendars.`} />
        <meta name="keywords" content={`nepali calendar, nepali patro, nepali calendar ${currentNepaliYear}, nepali calendar ${currentNepaliYear+1}, nepali calendar ${currentNepaliYear+2}, nepali to english calendar, falgun calendar, chaitra calendar, magh calendar, nepali date, holi 2025, hamro patro`} />
        <link rel="canonical" href="/nepali-calendar" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nepali Calendar {currentNepaliYear} (BS)
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                View the complete Nepali calendar with festivals, holidays, and important dates.
              </p>
              <p className="text-sm text-gray-500">
                Also available: Nepali Calendar {currentNepaliYear+1} | Nepali Calendar {currentNepaliYear+2}
              </p>
            </div>
            
            {/* Month quick links */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
              <h2 className="text-lg font-semibold mb-3">Quick Navigate to Months</h2>
              <div className="flex flex-wrap gap-2">
                {nepaliMonths.map((month) => (
                  <a 
                    key={month} 
                    href={`#${month.toLowerCase()}`} 
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-nepal-red/10 hover:text-nepal-red rounded-full transition-colors"
                  >
                    {month}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Year quick links */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
              <h2 className="text-lg font-semibold mb-3">View Other Years</h2>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-nepal-red/10 hover:text-nepal-red rounded-full transition-colors cursor-pointer"
                  >
                    {currentNepaliYear - 3 + i}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Ad Space */}
            <div className="mb-8">
              <AdSpace size="banner" />
            </div>
            
            {/* Calendar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="calendar-wrapper flex justify-center">
                <iframe 
                  src="https://www.hamropatro.com/widgets/calender-full.php" 
                  frameBorder="0" 
                  scrolling="no" 
                  style={{ 
                    border: 'none', 
                    overflow: 'hidden', 
                    width: '100%', 
                    height: '840px', 
                    maxWidth: '800px',
                    margin: 0 
                  }} 
                  allowTransparency="true"
                  title="Nepali Calendar"
                />
              </div>
            </div>
            
            {/* SEO-optimized content sections */}
            <div className="space-y-8 mb-12">
              <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4">Nepali Calendar {currentNepaliYear} Overview</h2>
                <p className="mb-4">
                  The Nepali Calendar {currentNepaliYear} (BS - Bikram Sambat) is the official calendar used in Nepal. 
                  This calendar is approximately 56-57 years ahead of the Gregorian calendar (AD) used internationally. 
                  The current Nepali year {currentNepaliYear} contains important cultural festivals and national holidays 
                  celebrated throughout Nepal.
                </p>
                <p>
                  Each month in the Nepali calendar has significant festivals. For example, 
                  Falgun features Holi (the festival of colors), Chaitra includes the Nepali New Year, 
                  while Magh has important celebrations like Maghe Sankranti.
                </p>
              </section>
              
              <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4">Important Festivals in Nepali Calendar {currentNepaliYear}</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Dashain</strong> - The most important festival in Nepal, celebrated in Ashwin/Kartik</li>
                  <li><strong>Tihar</strong> - The festival of lights, usually celebrated in Kartik</li>
                  <li><strong>Holi {currentGregorianYear+1}</strong> - Celebrated in Falgun, the festival of colors</li>
                  <li><strong>Nepali New Year</strong> - Celebrated on the 1st of Baishakh</li>
                  <li><strong>Teej</strong> - Important festival for women, celebrated in Bhadra</li>
                </ul>
              </section>
              
              <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4">Converting Between Nepali and English Calendars</h2>
                <p className="mb-4">
                  Need to convert between Nepali (BS) and English (AD) dates? Our <a href="/date-converter" className="text-nepal-red hover:underline">Date Converter tool</a> allows 
                  you to quickly convert any date between the two calendar systems.
                </p>
                <p>
                  The Nepali calendar is approximately 56-57 years ahead of the Gregorian calendar, but the exact 
                  conversion varies as Nepali months have different numbers of days each year based on astronomical calculations.
                </p>
              </section>
              
              <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4">Popular Nepali Calendar Months</h2>
                <div className="space-y-4">
                  <div id="falgun">
                    <h3 className="text-xl font-semibold mb-2">Falgun {currentNepaliYear}</h3>
                    <p>
                      Falgun is the 11th month in the Nepali calendar. It typically falls between February-March in the Gregorian calendar.
                      Falgun is known for the celebration of Holi, the festival of colors, which is one of the most popular festivals in Nepal.
                    </p>
                  </div>
                  
                  <div id="chaitra">
                    <h3 className="text-xl font-semibold mb-2">Chaitra {currentNepaliYear}</h3>
                    <p>
                      Chaitra is the 12th and final month of the Nepali calendar year. It generally corresponds to March-April in the Gregorian calendar.
                      Chaitra is significant as it marks the end of the Nepali year and includes celebrations like Chaitra Dashain.
                    </p>
                  </div>
                  
                  <div id="magh">
                    <h3 className="text-xl font-semibold mb-2">Magh {currentNepaliYear}</h3>
                    <p>
                      Magh is the 10th month of the Nepali calendar, usually falling in January-February of the Gregorian calendar.
                      It's known for Maghe Sankranti, an important winter festival marking the end of the winter solstice.
                    </p>
                  </div>
                </div>
              </section>
            </div>
            
            {/* FAQ Section for SEO */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">What is the current Nepali year?</h3>
                  <p>The current Nepali year is {currentNepaliYear} BS (Bikram Sambat).</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">How many months are in the Nepali calendar?</h3>
                  <p>The Nepali calendar has 12 months: Baishakh, Jestha, Ashadh, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, and Chaitra.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">When is Holi {currentGregorianYear+1} in Nepal?</h3>
                  <p>Holi is typically celebrated in Falgun month of the Nepali calendar, which falls around February-March in the Gregorian calendar.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">How do I convert from Nepali to English calendar?</h3>
                  <p>You can use our <a href="/date-converter" className="text-nepal-red hover:underline">Date Converter tool</a> to convert between Nepali (BS) and English (AD) dates easily.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">What is the difference between Nepali Calendar and Hamro Patro?</h3>
                  <p>Nepali Calendar refers to the Bikram Sambat calendar system used in Nepal, while "Hamro Patro" (meaning "Our Calendar" in Nepali) is a popular calendar application. Our tool provides the same Nepali calendar functionality with a clean, ad-light experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NepaliCalendar;
