import { useState } from 'react';
import { MapPin, Phone, Clock, Search, Map } from 'lucide-react';
import { FadeIn } from '@hemanath-afk/afk-motion';

const storeLocations = [
  {
    id: 1,
    name: 'Quantum Delhi Flagship',
    city: 'New Delhi',
    address: 'E-Block, Connaught Place, Inner Circle, New Delhi, 110001',
    phone: '+91 11 4050 2000',
    hours: '10:00 AM - 9:00 PM',
    mapCoords: '28.6304, 77.2177',
    desc: 'Our premier experience zone featuring custom gaming rigs and audio test suites.'
  },
  {
    id: 2,
    name: 'Quantum Bengaluru Tech Hub',
    city: 'Bengaluru',
    address: '100 Feet Road, Indiranagar, Bengaluru, Karnataka, 560038',
    phone: '+91 80 4050 3000',
    hours: '10:00 AM - 9:30 PM',
    mapCoords: '12.9716, 77.5946',
    desc: 'The tech hub experience center. Join our weekly builder and keyboard workshops here.'
  },
  {
    id: 3,
    name: 'Quantum Mumbai Experience Center',
    city: 'Mumbai',
    address: 'Linking Road, Bandra West, Mumbai, Maharashtra, 400050',
    phone: '+91 22 4050 4000',
    hours: '10:30 AM - 9:00 PM',
    mapCoords: '19.0760, 72.8777',
    desc: 'Premium lounge with personalized audio fittings and display calibration rooms.'
  },
  {
    id: 4,
    name: 'Quantum Chennai Elite',
    city: 'Chennai',
    address: 'Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu, 600006',
    phone: '+91 44 4050 5000',
    hours: '10:00 AM - 8:30 PM',
    mapCoords: '13.0827, 80.2707',
    desc: 'Elite luxury workspace store featuring high-end display setups and studio hardware.'
  }
];

const StoreLocatorScreen = () => {
  const [selectedStore, setSelectedStore] = useState(storeLocations[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = storeLocations.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FadeIn duration={0.5}>
      <div className="space-y-8 transition-colors duration-300 text-left">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 dark:bg-primary-950/40 p-3 rounded-2xl">
            <Map className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white">
              Store <span className="text-primary-600 dark:text-primary-400">Locator</span>
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-550 font-semibold mt-1">
              Visit our experience zones to try premium gear and consult our team
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Stores List */}
          <div className="lg:col-span-5 space-y-6">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city or store name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-xs shadow-sm"
              />
            </div>

            {/* List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {filteredStores.length === 0 ? (
                <div className="card p-8 text-center text-gray-400">
                  No stores found matching your search.
                </div>
              ) : (
                filteredStores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`w-full text-left card p-5 flex flex-col justify-between border-2 transition-all cursor-pointer ${
                      selectedStore.id === store.id
                        ? 'border-primary-600 dark:border-primary-500 bg-primary-50/10 dark:bg-primary-950/10'
                        : 'border-transparent dark:bg-gray-800'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 px-2.5 py-0.5 rounded font-black uppercase tracking-wider">
                        {store.city}
                      </span>
                      <h3 className="font-extrabold text-gray-900 dark:text-white text-base mt-2">{store.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-405 mt-1 line-clamp-1">{store.address}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-750 text-xs text-gray-400 font-semibold">
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {store.hours}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Details & Map Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="card p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 space-y-6">
              <div>
                <span className="text-[10px] bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                  {selectedStore.city} Outlet
                </span>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-3">{selectedStore.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{selectedStore.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-750">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-gray-400 dark:text-gray-550 uppercase tracking-widest">Address</h4>
                      <p className="text-sm text-gray-900 dark:text-white font-medium mt-1 leading-relaxed">{selectedStore.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-gray-400 dark:text-gray-550 uppercase tracking-widest">Opening Hours</h4>
                      <p className="text-sm text-gray-900 dark:text-white font-medium mt-1">{selectedStore.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-gray-400 dark:text-gray-550 uppercase tracking-widest">Contact Phone</h4>
                      <p className="text-sm text-gray-950 dark:text-white font-black mt-1 hover:text-primary-600 transition-colors">
                        <a href={`tel:${selectedStore.phone}`}>{selectedStore.phone}</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stylized SVG Map Graphic */}
                <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-750 relative overflow-hidden h-[220px]">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#302b63_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Grid Lines mockup */}
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 dark:bg-gray-800" />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-gray-300 dark:bg-gray-800" />
                  
                  {/* Radar Circles */}
                  <div className="w-16 h-16 rounded-full border border-primary-500/30 absolute animate-ping pointer-events-none" />
                  <div className="w-28 h-28 rounded-full border border-primary-500/20 absolute animate-pulse pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary-600 dark:bg-primary-500 text-white flex items-center justify-center shadow-lg transform -rotate-6 scale-105">
                      <MapPin className="w-6 h-6 animate-bounce" />
                    </div>
                    <span className="text-xs font-bold text-gray-905 dark:text-white mt-3">Quantum Hub Active</span>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">Coordinates: {selectedStore.mapCoords}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default StoreLocatorScreen;
