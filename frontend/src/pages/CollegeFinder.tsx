import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Building, MapPin, GraduationCap, Users, Banknote, Navigation } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for default marker icons in react-leaflet
import L from 'leaflet';
// @ts-ignore
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import iconUrl from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
});

const MOCK_COLLEGES = [
  { id: 1, name: 'Stanford University', lat: 37.4275, lng: -122.1697, ranking: 1, fees: '$55k/yr', placements: '99%', type: 'Private' },
  { id: 2, name: 'MIT', lat: 42.3601, lng: -71.0942, ranking: 2, fees: '$53k/yr', placements: '98%', type: 'Private' },
  { id: 3, name: 'UC Berkeley', lat: 37.8715, lng: -122.2599, ranking: 4, fees: '$44k/yr', placements: '95%', type: 'Public' },
];

const CollegeFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<typeof MOCK_COLLEGES[0] | null>(null);

  // Default center (USA)
  const center = [39.8283, -98.5795] as [number, number];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row relative">
      
      {/* Sidebar List */}
      <div className="w-full md:w-96 bg-background/80 backdrop-blur-xl border-r border-border flex flex-col h-1/2 md:h-full z-10">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold mb-4 flex items-center">
            <Building className="mr-2 text-primary" /> College Finder
          </h1>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by city or name..." 
              className="pl-9 bg-black/20 border-border"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MOCK_COLLEGES.map(college => (
            <motion.div 
              key={college.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCollege(college)}
              className={`p-4 rounded-xl cursor-pointer transition-colors border ${
                selectedCollege?.id === college.id 
                  ? 'bg-primary/20 border-primary' 
                  : 'bg-black/20 border-border hover:border-border'
              }`}
            >
              <h3 className="font-bold text-lg mb-1">{college.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs mr-2">{college.type}</span>
                Rank #{college.ranking}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-accent"><Banknote className="w-4 h-4 mr-1" /> {college.fees}</div>
                <div className="flex items-center text-success"><Users className="w-4 h-4 mr-1" /> {college.placements}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="flex-1 h-1/2 md:h-full relative z-0">
        <MapContainer 
          center={center} 
          zoom={4} 
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {MOCK_COLLEGES.map(college => (
            <Marker 
              key={college.id} 
              position={[college.lat, college.lng]}
              eventHandlers={{ click: () => setSelectedCollege(college) }}
            >
              <Popup className="custom-popup">
                <div className="font-sans text-background p-1">
                  <h3 className="font-bold text-lg mb-1">{college.name}</h3>
                  <p className="text-sm mb-2">{college.type} University</p>
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Details</Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Map Overlay info if needed */}
        <div className="absolute bottom-6 right-6 z-[1000] glass-card border-border shadow-sm p-3 rounded-full flex space-x-2">
          <Button size="icon" variant="secondary" className="rounded-full bg-background/80 hover:bg-primary"><Navigation className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeFinder;
