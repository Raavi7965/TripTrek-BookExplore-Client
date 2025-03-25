import { useEffect, useState, useRef, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "./TourDetails.css"
import { AlertTriangle, CheckSquare, Square, Sun, Cloud, CloudRain, Thermometer, User, Star, Calendar, MapPin, Shield, Package, Users, PenToolIcon as Tool, ShoppingCart, CreditCard, Clock, Phone, Mail, ExternalLink } from 'lucide-react'

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Location coordinates for each tour
const tourLocations = {
  1: { lat: 30.0869, lng: 78.2676, name: "Rishikesh" }, // Rishikesh
  2: { lat: 32.2396, lng: 77.1887, name: "Manali" }, // Manali
  3: { lat: 14.2191, lng: 74.1055, name: "Netrani Island" }, // Netrani Island
  4: { lat: 12.9716, lng: 77.5946, name: "Bangalore" }, // Bangalore
  5: { lat: 32.2462, lng: 78.2346, name: "Spiti Valley" }, // Spiti Valley
  6: { lat: 10.2381, lng: 77.4892, name: "Kodaikanal" }, // Kodaikanal
  7: { lat: 34.1526, lng: 77.5771, name: "Ladakh" }, // Ladakh
  8: { lat: 15.2993, lng: 74.124, name: "Goa" }, // Goa
  9: { lat: 25.467, lng: 91.3662, name: "Meghalaya" }, // Meghalaya
  10: { lat: 26.9124, lng: 70.9128, name: "Jaisalmer" }, // Jaisalmer
  11: { lat: 30.0869, lng: 78.2676, name: "Rishikesh" }, // White Water Rafting (Rishikesh)
  12: { lat: 12.4244, lng: 75.7382, name: "Coorg" }, // Coorg
  13: { lat: 34.17, lng: 77.58, name: "Zanskar" }, // Zanskar
  14: { lat: 10.0889, lng: 77.0595, name: "Munnar" }, // Munnar
  15: { lat: 17.9307, lng: 73.6477, name: "Mahabaleshwar" }, // Mahabaleshwar
  16: { lat: 11.7401, lng: 92.6586, name: "Andaman" }, // Andaman
  17: { lat: 11.4102, lng: 76.695, name: "Ooty" }, // Ooty
  18: { lat: 30.0869, lng: 78.2676, name: "Rishikesh" }, // Bungee Jumping (Rishikesh)
}

// Add these data structures after the tourLocations object

// Safety guidelines for each adventure type
const safetyGuidelines = {
  trekking: [
    "Always carry a first aid kit and know how to use it",
    "Inform someone about your trekking route and expected return time",
    "Carry enough water and stay hydrated throughout the trek",
    "Wear appropriate footwear with good grip",
    "Check weather conditions before starting your trek",
    "Carry a map, compass, or GPS device",
    "Avoid trekking alone, especially in remote areas",
  ],
  rafting: [
    "Always wear a life jacket and helmet",
    "Listen carefully to the safety briefing before starting",
    "Follow your guide's instructions at all times",
    "Know how to swim or inform your guide if you can't",
    "Secure all loose items and remove jewelry",
    "Learn the proper paddling techniques",
    "Know what to do if you fall into the water",
  ],
  diving: [
    "Never dive alone - always use the buddy system",
    "Maintain proper buoyancy control",
    "Monitor your air supply frequently",
    "Ascend slowly to avoid decompression sickness",
    "Stay within your certification limits",
    "Perform safety checks before every dive",
    "Be aware of marine life and avoid touching coral",
  ],
  camping: [
    "Set up camp in designated areas only",
    "Store food properly to avoid attracting wildlife",
    "Know how to safely set up and use camping equipment",
    "Always fully extinguish campfires before sleeping or leaving",
    "Carry a whistle or other signaling device",
    "Be prepared for changing weather conditions",
    "Leave no trace - pack out all trash",
  ],
  biking: [
    "Always wear a helmet and appropriate protective gear",
    "Maintain your bike and check it before each ride",
    "Be visible to others - wear bright clothing and use lights",
    "Follow traffic rules and use hand signals",
    "Carry basic repair tools and know how to use them",
    "Stay hydrated and carry energy snacks",
    "Be aware of your surroundings and road conditions",
  ],
  paragliding: [
    "Only fly with certified instructors and equipment",
    "Check weather conditions and never fly in unstable weather",
    "Complete a thorough pre-flight check of all equipment",
    "Understand and follow all landing procedures",
    "Maintain awareness of other aircraft and obstacles",
    "Know emergency procedures and landing techniques",
    "Never fly beyond your skill level",
  ],
  bungee: [
    "Only jump with certified operators and equipment",
    "Follow all instructions from the jump master",
    "Disclose any medical conditions before jumping",
    "Wear appropriate clothing and remove loose items",
    "Listen carefully to the safety briefing",
    "Maintain the correct body position during the jump",
    "Don't hesitate to ask questions if you're unsure about anything",
  ],
  default: [
    "Research your activity and location thoroughly before going",
    "Check weather conditions before starting your adventure",
    "Inform someone about your plans and expected return time",
    "Carry appropriate safety equipment for your activity",
    "Stay hydrated and bring sufficient food and water",
    "Know your physical limits and don't push beyond them",
    "Carry a first aid kit and know basic first aid procedures",
  ],
}

// Packing checklist templates for different adventure types
const packingChecklists = {
  trekking: [
    { id: 1, item: "Hiking boots", category: "Essentials", checked: false },
    { id: 2, item: "Backpack (30-40L)", category: "Essentials", checked: false },
    { id: 3, item: "Water bottle/hydration system", category: "Essentials", checked: false },
    { id: 4, item: "First aid kit", category: "Safety", checked: false },
    { id: 5, item: "Map/compass/GPS", category: "Navigation", checked: false },
    { id: 6, item: "Weather-appropriate clothing", category: "Clothing", checked: false },
    { id: 7, item: "Rain jacket/poncho", category: "Weather", checked: false },
    { id: 8, item: "Sunscreen", category: "Health", checked: false },
    { id: 9, item: "Insect repellent", category: "Health", checked: false },
    { id: 10, item: "Headlamp/flashlight", category: "Equipment", checked: false },
    { id: 11, item: "Snacks/energy bars", category: "Food", checked: false },
    { id: 12, item: "Trekking poles", category: "Equipment", checked: false },
  ],
  rafting: [
    { id: 1, item: "Quick-dry clothing", category: "Clothing", checked: false },
    { id: 2, item: "Water shoes", category: "Essentials", checked: false },
    { id: 3, item: "Waterproof bag", category: "Equipment", checked: false },
    { id: 4, item: "Sunscreen", category: "Health", checked: false },
    { id: 5, item: "Sunglasses with strap", category: "Accessories", checked: false },
    { id: 6, item: "Towel", category: "Essentials", checked: false },
    { id: 7, item: "Change of clothes", category: "Clothing", checked: false },
    { id: 8, item: "Water bottle", category: "Essentials", checked: false },
  ],
  diving: [
    { id: 1, item: "Swimsuit", category: "Clothing", checked: false },
    { id: 2, item: "Towel", category: "Essentials", checked: false },
    { id: 3, item: "Sunscreen", category: "Health", checked: false },
    { id: 4, item: "Certification card", category: "Documentation", checked: false },
    { id: 5, item: "Logbook", category: "Documentation", checked: false },
    { id: 6, item: "Mask, snorkel, fins (if not renting)", category: "Equipment", checked: false },
    { id: 7, item: "Wetsuit (if not renting)", category: "Equipment", checked: false },
    { id: 8, item: "Underwater camera", category: "Optional", checked: false },
  ],
  camping: [
    { id: 1, item: "Tent", category: "Shelter", checked: false },
    { id: 2, item: "Sleeping bag", category: "Shelter", checked: false },
    { id: 3, item: "Sleeping pad", category: "Shelter", checked: false },
    { id: 4, item: "Headlamp/flashlight", category: "Equipment", checked: false },
    { id: 5, item: "Multi-tool or knife", category: "Tools", checked: false },
    { id: 6, item: "Cooking equipment", category: "Food", checked: false },
    { id: 7, item: "Food supplies", category: "Food", checked: false },
    { id: 8, item: "Water container", category: "Essentials", checked: false },
    { id: 9, item: "First aid kit", category: "Safety", checked: false },
    { id: 10, item: "Fire starter", category: "Equipment", checked: false },
    { id: 11, item: "Insect repellent", category: "Health", checked: false },
    { id: 12, item: "Weather-appropriate clothing", category: "Clothing", checked: false },
  ],
  biking: [
    { id: 1, item: "Helmet", category: "Safety", checked: false },
    { id: 2, item: "Cycling shorts/pants", category: "Clothing", checked: false },
    { id: 3, item: "Cycling gloves", category: "Accessories", checked: false },
    { id: 4, item: "Water bottle", category: "Essentials", checked: false },
    { id: 5, item: "Bike repair kit", category: "Tools", checked: false },
    { id: 6, item: "Spare tube", category: "Tools", checked: false },
    { id: 7, item: "Bike lock", category: "Security", checked: false },
    { id: 8, item: "Sunglasses", category: "Accessories", checked: false },
    { id: 9, item: "Sunscreen", category: "Health", checked: false },
    { id: 10, item: "Energy snacks", category: "Food", checked: false },
  ],
  paragliding: [
    { id: 1, item: "Comfortable clothing", category: "Clothing", checked: false },
    { id: 2, item: "Sturdy shoes", category: "Essentials", checked: false },
    { id: 3, item: "Sunglasses", category: "Accessories", checked: false },
    { id: 4, item: "Sunscreen", category: "Health", checked: false },
    { id: 5, item: "Light jacket/windbreaker", category: "Clothing", checked: false },
    { id: 6, item: "Camera (secure strap)", category: "Optional", checked: false },
    { id: 7, item: "Water bottle", category: "Essentials", checked: false },
  ],
  default: [
    { id: 1, item: "Appropriate clothing", category: "Clothing", checked: false },
    { id: 2, item: "Water bottle", category: "Essentials", checked: false },
    { id: 3, item: "Sunscreen", category: "Health", checked: false },
    { id: 4, item: "First aid kit", category: "Safety", checked: false },
    { id: 5, item: "Snacks", category: "Food", checked: false },
    { id: 6, item: "Camera", category: "Optional", checked: false },
    { id: 7, item: "Phone/communication device", category: "Communication", checked: false },
    { id: 8, item: "Identification", category: "Documentation", checked: false },
  ],
}

// Mock data for local guides
const localGuides = {
  Rishikesh: [
    {
      id: 1,
      name: "Rahul Sharma",
      specialization: "Rafting & Trekking",
      experience: "10 years",
      languages: ["English", "Hindi"],
      rating: 4.8,
      reviews: 124,
      price: "₹2,500/day",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      contact: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Priya Patel",
      specialization: "Adventure Sports & Yoga",
      experience: "7 years",
      languages: ["English", "Hindi", "German"],
      rating: 4.9,
      reviews: 98,
      price: "₹2,800/day",
      availability: ["Wed", "Thu", "Fri", "Sat", "Sun"],
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      contact: "+91 87654 32109",
    },
  ],
  Manali: [
    {
      id: 3,
      name: "Vikram Singh",
      specialization: "Snow Trekking & Skiing",
      experience: "12 years",
      languages: ["English", "Hindi", "Punjabi"],
      rating: 4.7,
      reviews: 156,
      price: "₹3,000/day",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      contact: "+91 76543 21098",
    },
  ],
  Ladakh: [
    {
      id: 4,
      name: "Tenzin Dorje",
      specialization: "Mountain Biking & High Altitude Trekking",
      experience: "15 years",
      languages: ["English", "Hindi", "Ladakhi", "Tibetan"],
      rating: 4.9,
      reviews: 210,
      price: "₹3,500/day",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      contact: "+91 65432 10987",
    },
  ],
  Goa: [
    {
      id: 5,
      name: "Carlos Fernandes",
      specialization: "Water Sports & Scuba Diving",
      experience: "9 years",
      languages: ["English", "Portuguese", "Hindi"],
      rating: 4.6,
      reviews: 87,
      price: "₹2,700/day",
      availability: ["Wed", "Thu", "Fri", "Sat", "Sun"],
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      contact: "+91 54321 09876",
    },
  ],
  Andaman: [
    {
      id: 6,
      name: "Anita Roy",
      specialization: "Scuba Diving & Marine Life",
      experience: "8 years",
      languages: ["English", "Hindi", "Bengali"],
      rating: 4.8,
      reviews: 112,
      price: "₹3,200/day",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      contact: "+91 43210 98765",
    },
  ],
  default: [
    {
      id: 7,
      name: "Ajay Kumar",
      specialization: "General Adventure Guide",
      experience: "5 years",
      languages: ["English", "Hindi"],
      rating: 4.5,
      reviews: 65,
      price: "₹2,000/day",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      contact: "+91 32109 87654",
    },
  ],
}

// Mock weather alerts data
const weatherAlerts = {
  Rishikesh: [
    {
      type: "Rainfall",
      message: "Moderate to heavy rainfall expected in the next 48 hours. Rafting activities may be affected.",
      severity: "moderate",
      startDate: "2024-03-25",
      endDate: "2024-03-27",
    },
  ],
  Manali: [
    {
      type: "Snowfall",
      message: "Heavy snowfall expected at higher elevations. Some trekking routes may be closed.",
      severity: "high",
      startDate: "2024-03-24",
      endDate: "2024-03-26",
    },
    {
      type: "Road Closure",
      message: "Rohtang Pass closed due to snow accumulation. Alternative routes available.",
      severity: "high",
      startDate: "2024-03-20",
      endDate: "2024-04-15",
    },
  ],
  "Spiti Valley": [
    {
      type: "Landslide Risk",
      message: "Increased risk of landslides due to recent rainfall. Exercise caution on mountain roads.",
      severity: "high",
      startDate: "2024-03-23",
      endDate: "2024-03-28",
    },
  ],
  Ladakh: [
    {
      type: "Cold Wave",
      message: "Extreme cold conditions expected. Night temperatures may drop below -15°C.",
      severity: "high",
      startDate: "2024-03-25",
      endDate: "2024-03-30",
    },
  ],
  Goa: [
    {
      type: "High Tide",
      message: "High tide warning for coastal areas. Water sports activities may be restricted.",
      severity: "moderate",
      startDate: "2024-03-26",
      endDate: "2024-03-28",
    },
  ],
  Andaman: [
    {
      type: "Strong Currents",
      message: "Strong underwater currents reported. Diving activities may be restricted to certain sites.",
      severity: "moderate",
      startDate: "2024-03-24",
      endDate: "2024-03-27",
    },
  ],
}

// Gear and Equipment Rental data
const gearRentals = {
  trekking: [
    {
      id: 1,
      name: "Mountain Gear Rentals",
      location: "Central Market",
      items: [
        { name: "Trekking Poles", price: "₹150/day", available: true },
        { name: "Backpack (40L)", price: "₹200/day", available: true },
        { name: "Hiking Boots", price: "₹250/day", available: true },
        { name: "Sleeping Bag", price: "₹300/day", available: true },
        { name: "Tent (2-person)", price: "₹500/day", available: true },
      ],
      rating: 4.7,
      reviews: 89,
      contact: "+91 98765 43210",
      website: "www.mountaingear.com",
      hours: "9:00 AM - 7:00 PM",
    },
    {
      id: 2,
      name: "Trek Essentials",
      location: "Hill Road",
      items: [
        { name: "Trekking Poles", price: "₹180/day", available: true },
        { name: "Backpack (50L)", price: "₹250/day", available: true },
        { name: "GPS Device", price: "₹350/day", available: true },
        { name: "Camping Stove", price: "₹200/day", available: true },
        { name: "Headlamp", price: "₹100/day", available: true },
      ],
      rating: 4.5,
      reviews: 65,
      contact: "+91 87654 32109",
      website: "www.trekessentials.com",
      hours: "8:00 AM - 8:00 PM",
    },
  ],
  rafting: [
    {
      id: 3,
      name: "River Rapids Gear",
      location: "Riverside Market",
      items: [
        { name: "Life Jacket", price: "₹150/day", available: true },
        { name: "Helmet", price: "₹100/day", available: true },
        { name: "Wetsuit", price: "₹300/day", available: true },
        { name: "Waterproof Bag", price: "₹150/day", available: true },
        { name: "Water Shoes", price: "₹120/day", available: true },
      ],
      rating: 4.8,
      reviews: 112,
      contact: "+91 76543 21098",
      website: "www.riverrapidsgear.com",
      hours: "7:00 AM - 6:00 PM",
    },
  ],
  diving: [
    {
      id: 4,
      name: "Deep Blue Dive Shop",
      location: "Beach Road",
      items: [
        { name: "Mask & Snorkel", price: "₹200/day", available: true },
        { name: "Fins", price: "₹250/day", available: true },
        { name: "BCD", price: "₹500/day", available: true },
        { name: "Regulator", price: "₹450/day", available: true },
        { name: "Wetsuit", price: "₹350/day", available: true },
        { name: "Underwater Camera", price: "₹800/day", available: true },
      ],
      rating: 4.9,
      reviews: 156,
      contact: "+91 65432 10987",
      website: "www.deepbluedive.com",
      hours: "8:00 AM - 7:00 PM",
    },
  ],
  camping: [
    {
      id: 5,
      name: "Camp Essentials",
      location: "Market Square",
      items: [
        { name: "Tent (2-person)", price: "₹500/day", available: true },
        { name: "Tent (4-person)", price: "₹800/day", available: true },
        { name: "Sleeping Bag", price: "₹300/day", available: true },
        { name: "Camping Stove", price: "₹200/day", available: true },
        { name: "Camping Chair", price: "₹100/day", available: true },
        { name: "Cooler", price: "₹150/day", available: true },
      ],
      rating: 4.6,
      reviews: 78,
      contact: "+91 54321 09876",
      website: "www.campassentials.com",
      hours: "9:00 AM - 8:00 PM",
    },
  ],
  biking: [
    {
      id: 6,
      name: "Wheel Deal Rentals",
      location: "Main Street",
      items: [
        { name: "Mountain Bike", price: "₹600/day", available: true },
        { name: "Helmet", price: "₹150/day", available: true },
        { name: "Bike Lock", price: "₹100/day", available: true },
        { name: "Repair Kit", price: "₹150/day", available: true },
        { name: "GPS Device", price: "₹350/day", available: true },
      ],
      rating: 4.7,
      reviews: 92,
      contact: "+91 43210 98765",
      website: "www.wheeldeal.com",
      hours: "8:00 AM - 7:00 PM",
    },
  ],
  paragliding: [
    {
      id: 7,
      name: "Sky High Equipment",
      location: "Hill Station Road",
      items: [
        { name: "GoPro Camera", price: "₹800/day", available: true },
        { name: "Flying Suit", price: "₹400/day", available: true },
        { name: "Helmet", price: "₹200/day", available: true },
        { name: "Gloves", price: "₹150/day", available: true },
      ],
      rating: 4.8,
      reviews: 45,
      contact: "+91 32109 87654",
      website: "www.skyhigh.com",
      hours: "7:00 AM - 5:00 PM",
    },
  ],
  bungee: [
    {
      id: 8,
      name: "Extreme Sports Gear",
      location: "Adventure Zone",
      items: [
        { name: "GoPro Camera", price: "₹800/day", available: true },
        { name: "Sports Shoes", price: "₹300/day", available: true },
        { name: "Sportswear", price: "₹250/day", available: true },
      ],
      rating: 4.5,
      reviews: 38,
      contact: "+91 21098 76543",
      website: "www.extremesportsgear.com",
      hours: "8:00 AM - 6:00 PM",
    },
  ],
  default: [
    {
      id: 9,
      name: "Adventure Essentials",
      location: "Town Center",
      items: [
        { name: "Backpack", price: "₹200/day", available: true },
        { name: "Water Bottle", price: "₹50/day", available: true },
        { name: "First Aid Kit", price: "₹100/day", available: true },
        { name: "Portable Charger", price: "₹150/day", available: true },
        { name: "Binoculars", price: "₹250/day", available: true },
      ],
      rating: 4.4,
      reviews: 56,
      contact: "+91 10987 65432",
      website: "www.adventureessentials.com",
      hours: "9:00 AM - 8:00 PM",
    },
  ],
}

// Updated mockTourData with consistent images for all tours
const mockTourData = {
  1: {
    id: 1,
    name: "Rishikesh River Rafting",
    location: "Rishikesh",
    description:
      "Experience the thrill of white water rafting in the Ganges. Suitable for beginners and experienced rafters alike.",
    price: "₹1,500",
    discountedPrice: "₹1,200",
    images: [
      "https://images.unsplash.com/photo-1560523799-99a86c4c9c7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1604335889388-9855925456ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1541848756-a6faeff29c09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival in Rishikesh",
      "Safety briefing and rafting instructions",
      "River rafting session (3 hours)",
      "Lunch by the river",
      "Departure",
    ],
    reviews: [
      {
        user: "Alice",
        date: "2024-03-15",
        rating: 5,
        comment: "Amazing experience! The guides were professional and the scenery was breathtaking.",
        images: [
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        ],
        title: "Best Rafting Trip Ever!",
      },
      {
        user: "Bob",
        date: "2024-03-10",
        rating: 4,
        comment: "Good fun, but the water was a bit cold. Overall, a great day out.",
        title: "Fun but Cold",
      },
    ],
  },
  2: {
    id: 2,
    name: "Manali Trekking Adventure",
    location: "Manali",
    description:
      "Explore the scenic trails around Manali with our guided trekking tours. Suitable for all fitness levels.",
    price: "₹2,000",
    discountedPrice: "₹1,800",
    images: [
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1501785888024-9291476ff2c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival in Manali",
      "Acclimatization walk",
      "Trek to Hadimba Temple",
      "Trek to Jogini Falls",
      "Departure",
    ],
    reviews: [
      {
        user: "Charlie",
        date: "2024-03-20",
        rating: 5,
        comment: "Incredible views and well-organized trek. Highly recommended!",
        title: "Amazing Views",
      },
      {
        user: "Diana",
        date: "2024-03-18",
        rating: 4,
        comment: "The trek was a bit challenging, but the scenery made it worth it.",
        title: "Challenging but Rewarding",
      },
    ],
  },
  3: {
    id: 3,
    name: "Netrani Island Scuba Diving",
    location: "Netrani Island",
    description:
      "Discover the underwater world of Netrani Island with our scuba diving excursions. Suitable for certified divers.",
    price: "₹3,000",
    discountedPrice: "₹2,700",
    images: [
      "https://images.unsplash.com/photo-1579621954041-686b65981809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1552510388-4df5185794fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1563795586564-3723423dd404?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival at dive site",
      "Dive briefing and equipment check",
      "Scuba diving session (45 minutes)",
      "Debriefing and logbook entry",
      "Departure",
    ],
    reviews: [
      {
        title: "Amazing Dive!",
        user: "Eve",
        date: "2024-03-25",
        rating: 5,
        comment: "The coral reefs were stunning, and the marine life was abundant. A must-do for divers!",
        images: [
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        ],
      },
      {
        title: "Good Experience",
        user: "Frank",
        date: "2024-03-22",
        rating: 4,
        comment: "Visibility was a bit low, but overall a good diving experience.",
        images: [],
      },
    ],
  },
  4: {
    id: 4,
    name: "Bangalore City Tour",
    location: "Bangalore",
    description:
      "Explore the Garden City with our guided city tours. Visit historical landmarks and cultural attractions.",
    price: "₹1,000",
    discountedPrice: "₹800",
    images: [
      "https://images.unsplash.com/photo-1600987334511-65a5c69eaffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1617588455974-2cd33b4ca409?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1628977434344-ba978411544c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Visit Bangalore Palace",
      "Explore Tipu Sultan's Summer Palace",
      "Visit Lal Bagh Botanical Garden",
      "Explore Vidhana Soudha",
      "Departure",
    ],
    reviews: [
      {
        title: "Great City Tour",
        user: "Grace",
        date: "2024-03-28",
        rating: 5,
        comment: "The tour guide was knowledgeable, and the city is beautiful. Highly recommended!",
        images: [],
      },
      {
        title: "Informative Tour",
        user: "Henry",
        date: "2024-03-25",
        rating: 4,
        comment: "The tour was informative, but the traffic was a bit heavy.",
        images: [],
      },
    ],
  },
  5: {
    id: 5,
    name: "Spiti Valley Adventure",
    location: "Spiti Valley",
    description:
      "Embark on an unforgettable journey through the rugged terrain of Spiti Valley. Experience the raw beauty of the Himalayas.",
    price: "₹4,500",
    discountedPrice: "₹4,000",
    images: [
      "https://images.unsplash.com/photo-1507518858883-755ca39f3bc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1547754980-c1f3906fba51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1547754980-c1f3906fba51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: ["Arrival in Spiti Valley", "Visit Key Monastery", "Explore Chandratal Lake", "Visit Kaza", "Departure"],
    reviews: [
      {
        title: "Unforgettable Trip",
        user: "Ivy",
        date: "2024-04-01",
        rating: 5,
        comment: "Spiti Valley is a hidden gem. The landscapes are breathtaking, and the culture is fascinating.",
        images: [],
      },
      {
        title: "Amazing Experience",
        user: "Jack",
        date: "2024-03-29",
        rating: 4,
        comment: "The roads are rough, but the journey is worth it. Highly recommended for adventure seekers.",
        images: [],
      },
    ],
  },
  6: {
    id: 6,
    name: "Kodaikanal Adventure",
    location: "Kodaikanal",
    description:
      "Explore the beauty of Kodaikanal with our guided tours. Visit historical landmarks and cultural attractions.",
    price: "₹2,500",
    discountedPrice: "₹2,200",
    images: [
      "https://images.unsplash.com/photo-1617588455974-2cd33b4ca409?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1628977434344-ba978411544c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600987334511-65a5c69eaffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Visit Kodaikanal Lake",
      "Explore Coaker's Walk",
      "Visit Bryant Park",
      "Explore Silver Cascade Falls",
      "Departure",
    ],
    reviews: [
      {
        title: "Great City Tour",
        user: "Grace",
        date: "2024-03-28",
        rating: 5,
        comment: "The tour guide was knowledgeable, and the city is beautiful. Highly recommended!",
        images: [],
      },
      {
        title: "Informative Tour",
        user: "Henry",
        date: "2024-03-25",
        rating: 4,
        comment: "The tour was informative, but the traffic was a bit heavy.",
        images: [],
      },
    ],
  },
  7: {
    id: 7,
    name: "Ladakh Adventure",
    location: "Ladakh",
    description:
      "Embark on an unforgettable journey through the rugged terrain of Ladakh. Experience the raw beauty of the Himalayas.",
    price: "₹5,500",
    discountedPrice: "₹5,000",
    images: [
      "https://images.unsplash.com/photo-1507518858883-755ca39f3bc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1547754980-c1f3906fba51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1547754980-c1f3906fba51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: ["Arrival in Ladakh", "Visit Key Monastery", "Explore Chandratal Lake", "Visit Kaza", "Departure"],
    reviews: [
      {
        title: "Unforgettable Trip",
        user: "Ivy",
        date: "2024-04-01",
        rating: 5,
        comment: "Spiti Valley is a hidden gem. The landscapes are breathtaking, and the culture is fascinating.",
        images: [],
      },
      {
        title: "Amazing Experience",
        user: "Jack",
        date: "2024-03-29",
        rating: 4,
        comment: "The roads are rough, but the journey is worth it. Highly recommended for adventure seekers.",
        images: [],
      },
    ],
  },
  // Adding the missing tours
  8: {
    id: 8,
    name: "Goa Water Sports",
    location: "Goa",
    description: "Experience thrilling water sports in the beautiful beaches of Goa. Activities include jet skiing, parasailing, and banana boat rides.",
    price: "₹2,000",
    discountedPrice: "₹1,800",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival at Baga Beach",
      "Safety briefing and instructions",
      "Jet skiing session (30 minutes)",
      "Parasailing experience (15 minutes)",
      "Banana boat ride (15 minutes)",
      "Departure",
    ],
    reviews: [
      {
        title: "Amazing Water Sports Experience",
        user: "Michael",
        date: "2024-03-15",
        rating: 5,
        comment: "Had an incredible time with the water sports package. The instructors were professional and ensured safety throughout.",
        images: [],
      },
      {
        title: "Fun Day at the Beach",
        user: "Sarah",
        date: "2024-03-10",
        rating: 4,
        comment: "Great experience overall. Parasailing was the highlight of the day!",
        images: [],
      },
    ],
  },
  9: {
    id: 9,
    name: "Meghalaya Caving Adventure",
    location: "Meghalaya",
    description: "Explore the mysterious caves of Meghalaya, known as the 'Abode of Clouds'. Discover underground rivers, stalactites, and stalagmites.",
    price: "₹3,500",
    discountedPrice: "₹3,200",
    images: [
      "https://images.unsplash.com/photo-1504218727796-db522a2cef6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1519075428252-6c1b0e9d1c35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival in Shillong",
      "Transfer to Mawsmai Cave",
      "Guided caving expedition (3 hours)",
      "Lunch at a local restaurant",
      "Visit to Nohkalikai Falls",
      "Return to Shillong",
    ],
    reviews: [
      {
        title: "Unforgettable Caving Experience",
        user: "David",
        date: "2024-03-20",
        rating: 5,
        comment: "The caves were spectacular! Our guide was knowledgeable and made the experience safe and enjoyable.",
        images: [],
      },
      {
        title: "Adventure of a Lifetime",
        user: "Emma",
        date: "2024-03-18",
        rating: 4,
        comment: "Challenging but incredibly rewarding. The underground rivers were magical.",
        images: [],
      },
    ],
  },
  10: {
    id: 10,
    name: "Sand Dune Safari & Camping",
    location: "Jaisalmer",
    description: "Experience the magic of the Thar Desert with a thrilling sand dune safari followed by an overnight camping experience under the stars.",
    price: "₹4,000",
    discountedPrice: "₹3,600",
    images: [
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1682686581362-796145f0e123?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Pickup from Jaisalmer",
      "Camel safari to Sam Sand Dunes",
      "Sunset views from the dunes",
      "Cultural program and dinner at camp",
      "Overnight stay in desert tents",
      "Sunrise view and breakfast",
      "Return to Jaisalmer",
    ],
    reviews: [
      {
        title: "Magical Desert Experience",
        user: "Thomas",
        date: "2024-03-25",
        rating: 5,
        comment: "The desert safari was incredible. Watching the sunset over the dunes was a moment I'll never forget.",
        images: [],
      },
      {
        title: "Great Cultural Experience",
        user: "Sophia",
        date: "2024-03-22",
        rating: 4,
        comment: "The cultural program and food were excellent. The tents were comfortable but it got quite cold at night.",
        images: [],
      },
    ],
  },
  11: {
    id: 11,
    name: "White Water Rafting",
    location: "Rishikesh",
    description: "Challenge yourself with an adrenaline-pumping white water rafting experience on the Ganges River in Rishikesh, the adventure capital of India.",
    price: "₹1,800",
    discountedPrice: "₹1,500",
    images: [
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1623796898303-c95f26d5e2c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival at rafting point",
      "Safety briefing and equipment distribution",
      "Rafting through grade III and IV rapids (16 km)",
      "Cliff jumping opportunity (optional)",
      "Lunch break by the river",
      "Return to starting point",
    ],
    reviews: [
      {
        title: "Thrilling Adventure",
        user: "James",
        date: "2024-03-15",
        rating: 5,
        comment: "The rapids were amazing! Our guide was excellent and made sure we had a safe but exciting experience.",
        images: [],
      },
      {
        title: "Great Team Building Activity",
        user: "Olivia",
        date: "2024-03-12",
        rating: 4,
        comment: "We went as a group of friends and had a blast. The cliff jumping was an unexpected highlight!",
        images: [],
      },
    ],
  },
  12: {
    id: 12,
    name: "Coorg Coffee Plantation Trek",
    location: "Coorg",
    description: "Trek through the lush coffee plantations of Coorg, learning about coffee cultivation while enjoying the beautiful Western Ghats landscape.",
    price: "₹2,200",
    discountedPrice: "₹1,900",
    images: [
      "https://images.unsplash.com/photo-1599631438222-8d7c7f7d0fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1504387432042-8aca549e4729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Pickup from Madikeri",
      "Trek through coffee plantations (3-4 hours)",
      "Coffee processing demonstration",
      "Coffee tasting session",
      "Traditional Kodava lunch",
      "Visit to nearby waterfall",
      "Return to Madikeri",
    ],
    reviews: [
      {
        title: "Educational and Beautiful",
        user: "William",
        date: "2024-03-18",
        rating: 5,
        comment: "Learned so much about coffee cultivation. The plantation was beautiful and the coffee tasting was excellent!",
        images: [],
      },
      {
        title: "Peaceful Trek",
        user: "Ava",
        date: "2024-03-15",
        rating: 4,
        comment: "A relaxing trek with stunning views. The traditional lunch was delicious and authentic.",
        images: [],
      },
    ],
  },
  13: {
    id: 13,
    name: "Zanskar Frozen River Trek",
    location: "Zanskar",
    description: "Embark on the legendary Chadar Trek along the frozen Zanskar River, one of the most unique and challenging winter treks in the world.",
    price: "₹25,000",
    discountedPrice: "₹22,000",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1494564605686-2e931f77a8e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1516638121-7d8c9e67a0f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival in Leh and acclimatization (2 days)",
      "Drive to Chilling, starting point of the trek",
      "Trek on the frozen river (6 days)",
      "Visit to remote villages and monasteries",
      "Return to Chilling and drive back to Leh",
    ],
    reviews: [
      {
        title: "Once in a Lifetime Experience",
        user: "Benjamin",
        date: "2024-02-20",
        rating: 5,
        comment: "The most challenging and rewarding trek I've ever done. Walking on the frozen river was surreal.",
        images: [],
      },
      {
        title: "Breathtaking but Difficult",
        user: "Charlotte",
        date: "2024-02-15",
        rating: 4,
        comment: "Not for the faint-hearted but absolutely worth it. The landscapes are otherworldly.",
        images: [],
      },
    ],
  },
  14: {
    id: 14,
    name: "Munnar Tea Estate Walk",
    location: "Munnar",
    description: "Stroll through the verdant tea plantations of Munnar, learning about tea cultivation and processing while enjoying the cool mountain air.",
    price: "₹1,500",
    discountedPrice: "₹1,300",
    images: [
      "https://images.unsplash.com/photo-1598322252413-8603f2775e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1544233726-9f1d0a91fd31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Pickup from Munnar town",
      "Guided walk through tea estates (2-3 hours)",
      "Visit to tea factory",
      "Tea tasting session",
      "Visit to Munnar Tea Museum",
      "Return to Munnar town",
    ],
    reviews: [
      {
        title: "Beautiful Landscapes",
        user: "Daniel",
        date: "2024-03-22",
        rating: 5,
        comment: "The rolling hills covered in tea plantations were stunning. The guide was knowledgeable about tea cultivation.",
        images: [],
      },
      {
        title: "Relaxing Experience",
        user: "Mia",
        date: "2024-03-20",
        rating: 4,
        comment: "A peaceful walk with beautiful views. The tea tasting was interesting and educational.",
        images: [],
      },
    ],
  },
  15: {
    id: 15,
    name: "Mahabaleshwar Paragliding",
    location: "Mahabaleshwar",
    description: "Soar above the beautiful Sahyadri mountains with a tandem paragliding experience in Mahabaleshwar, offering breathtaking views of the valleys below.",
    price: "₹3,000",
    discountedPrice: "₹2,700",
    images: [
      "https://images.unsplash.com/photo-1503507420689-7b961cc77da5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1605493725784-56651e4c7b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600255821058-c4f89958d700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival at paragliding site",
      "Safety briefing and equipment check",
      "Tandem paragliding flight (15-20 minutes)",
      "Photo and video recording (optional)",
      "Certificate of completion",
      "Departure",
    ],
    reviews: [
      {
        title: "Exhilarating Experience",
        user: "Ethan",
        date: "2024-03-25",
        rating: 5,
        comment: "The views were incredible and the pilot was very professional. Felt completely safe throughout.",
        images: [],
      },
      {
        title: "Worth Every Penny",
        user: "Isabella",
        date: "2024-03-22",
        rating: 4,
        comment: "A bit scary at first but amazing once in the air. The valley views were spectacular.",
        images: [],
      },
    ],
  },
  16: {
    id: 16,
    name: "Andaman Scuba Diving",
    location: "Andaman",
    description: "Discover the vibrant underwater world of the Andaman Islands with scuba diving experiences suitable for beginners and certified divers.",
    price: "₹4,500",
    discountedPrice: "₹4,000",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1682686581362-796145f0e123?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Pickup from hotel in Port Blair/Havelock",
      "Boat ride to dive site",
      "Diving briefing and equipment setup",
      "Scuba diving session (45-60 minutes)",
      "Refreshments on boat",
      "Return to shore",
    ],
    reviews: [
      {
        title: "Amazing Marine Life",
        user: "Jacob",
        date: "2024-03-28",
        rating: 5,
        comment: "The coral reefs were vibrant and we saw so many colorful fish. The instructors were excellent.",
        images: [],
      },
      {
        title: "Great for Beginners",
        user: "Sophia",
        date: "2024-03-25",
        rating: 4,
        comment: "It was my first time diving and I felt completely safe. The underwater world was magical.",
        images: [],
      },
    ],
  },
  17: {
    id: 17,
    name: "Ooty Nilgiri Toy Train Ride",
    location: "Ooty",
    description: "Experience the charm of the UNESCO-listed Nilgiri Mountain Railway, a heritage toy train that winds through picturesque landscapes and tunnels.",
    price: "₹1,200",
    discountedPrice: "₹1,000",
    images: [
      "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1589395937772-f67057e233df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1527667175137-6fea2fb4d5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Pickup from Ooty/Mettupalayam",
      "Board the heritage Nilgiri Mountain Railway",
      "Scenic train journey through mountains and forests (2-3 hours)",
      "Photo stops at scenic viewpoints",
      "Arrival at destination station",
      "Return transfer to hotel",
    ],
    reviews: [
      {
        title: "Nostalgic Journey",
        user: "Noah",
        date: "2024-03-20",
        rating: 5,
        comment: "A beautiful journey through time. The steam locomotive and vintage coaches were charming and the scenery was spectacular.",
        images: [],
      },
      {
        title: "Scenic Route",
        user: "Emma",
        date: "2024-03-18",
        rating: 4,
        comment: "The views were amazing but the train was quite crowded. Still, a must-do experience in Ooty.",
        images: [],
      },
    ],
  },
  18: {
    id: 18,
    name: "Bungee Jumping in Rishikesh",
    location: "Rishikesh",
    description: "Experience the ultimate adrenaline rush with a bungee jump from a 83-meter high platform over the Ganges River in Rishikesh.",
    price: "₹3,500",
    discountedPrice: "₹3,200",
    images: [
      "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1629196914168-3a2652305f9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1605493725784-56651e4c7b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    itinerary: [
      "Arrival at bungee jumping site",
      "Registration and medical check",
      "Safety briefing and equipment fitting",
      "Bungee jump from 83-meter platform",
      "Certificate of completion",
      "Photo and video package (optional)",
      "Departure",
    ],
    reviews: [
      {
        title: "Terrifying but Amazing",
        user: "Lucas",
        date: "2024-03-25",
        rating: 5,
        comment: "The scariest thing I've ever done but also the most exhilarating. The staff were professional and safety was clearly a priority.",
        images: [],
      },
      {
        title: "Bucket List Experience",
        user: "Lily",
        date: "2024-03-22",
        rating: 4,
        comment: "Took me three attempts to finally jump but it was worth it! The views of the river and mountains were incredible.",
        images: [],
      },
    ],
  },
}

// Replace the TourDetails component with this enhanced version
const TourDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const [activeTab, setActiveTab] = useState("details")
  const mapRef = useRef(null)
  const [packingList, setPackingList] = useState([])
  const [alerts, setAlerts] = useState([])
  const [guides, setGuides] = useState([])
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [bookingDate, setBookingDate] = useState("")
  const [rentalShops, setRentalShops] = useState([])
  const [selectedShop, setSelectedShop] = useState(null)
  const [selectedRentalItems, setSelectedRentalItems] = useState([])
  const [rentalDays, setRentalDays] = useState(1)
  const [rentalStartDate, setRentalStartDate] = useState("")

  // Determine adventure type for safety guidelines and packing list
  const getAdventureType = useCallback((tourName) => {
    const tourNameLower = tourName.toLowerCase()
    if (tourNameLower.includes("trek") || tourNameLower.includes("hiking")) return "trekking"
    if (tourNameLower.includes("raft") || tourNameLower.includes("water")) return "rafting"
    if (tourNameLower.includes("scuba") || tourNameLower.includes("diving")) return "diving"
    if (tourNameLower.includes("camp")) return "camping"
    if (tourNameLower.includes("bike") || tourNameLower.includes("cycling")) return "biking"
    if (tourNameLower.includes("paraglid")) return "paragliding"
    if (tourNameLower.includes("bungee")) return "bungee"
    return "default"
  }, [])

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const data = mockTourData[id]
        if (!data) {
          throw new Error("Tour not found")
        }
        setTour(data)
        fetchWeather(data.location)
        fetchWeatherForecast(data.location)

        // Set packing list based on adventure type
        const adventureType = getAdventureType(data.name)
        setPackingList(packingChecklists[adventureType] || packingChecklists.default)

        // Set alerts for the location
        setAlerts(weatherAlerts[data.location] || [])

        // Set guides for the location
        setGuides(localGuides[data.location] || localGuides.default)
        
        // Set rental shops based on adventure type
        setRentalShops(gearRentals[adventureType] || gearRentals.default)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTourDetails()
  }, [id, getAdventureType])

  const fetchWeather = async (location) => {
    try {
      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY" // Replace with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`,
      )

      // Debugging: Check response status
      console.log("Fetching weather for:", location)
      console.log("Response Status:", response.status)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()

      // Debugging: Log fetched data
      console.log("Weather API Response:", data)

      if (!data.main || !data.weather) {
        throw new Error("Incomplete weather data received")
      }

      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: data.main.feels_like,
      })
    } catch (error) {
      console.error("Error fetching weather:", error.message)
      setWeather(null)
    }
  }

  const fetchWeatherForecast = async (location) => {
    try {
      // This would normally be a real API call
      // For demo purposes, we'll create mock forecast data
      const mockForecast = [
        {
          date: "Tomorrow",
          temperature: Math.floor(Math.random() * 10) + 20,
          condition: "Partly cloudy",
          icon: "cloud",
        },
        {
          date: "Day after tomorrow",
          temperature: Math.floor(Math.random() * 10) + 18,
          condition: "Sunny",
          icon: "sun",
        },
        {
          date: "In 3 days",
          temperature: Math.floor(Math.random() * 10) + 15,
          condition: "Light rain",
          icon: "cloud-rain",
        },
      ]

      setWeatherForecast(mockForecast)
    } catch (error) {
      console.error("Error fetching forecast:", error.message)
      setWeatherForecast([])
    }
  }

  const handleImageClick = (image) => {
    setCurrentImage(image)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setCurrentImage("")
  }

  const handleBookNowClick = () => {
    navigate("/payment") // Navigate to the payment page
  }

  const toggleChecklistItem = (itemId) => {
    setPackingList((prevList) =>
      prevList.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item)),
    )
  }

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide)
  }

  const handleBookGuide = () => {
    if (!bookingDate) {
      alert("Please select a date for booking the guide.")
      return
    }

    alert(`Guide ${selectedGuide.name} booked successfully for ${bookingDate}!`)
    setSelectedGuide(null)
    setBookingDate("")
  }

  const handleShopSelect = (shop) => {
    setSelectedShop(shop)
    setSelectedRentalItems([])
  }

  const handleRentalItemToggle = (item) => {
    const isSelected = selectedRentalItems.some(selectedItem => selectedItem.name === item.name)
    
    if (isSelected) {
      setSelectedRentalItems(selectedRentalItems.filter(selectedItem => selectedItem.name !== item.name))
    } else {
      setSelectedRentalItems([...selectedRentalItems, item])
    }
  }

  const calculateRentalTotal = () => {
    let total = 0
    selectedRentalItems.forEach(item => {
      const priceValue = parseInt(item.price.replace(/[^\d]/g, ''))
      total += priceValue * rentalDays
    })
    return `₹${total}`
  }

  const handleRentalBooking = () => {
    if (!rentalStartDate) {
      alert("Please select a start date for your rental.")
      return
    }
    
    if (selectedRentalItems.length === 0) {
      alert("Please select at least one item to rent.")
      return
    }

    const itemsList = selectedRentalItems.map(item => item.name).join(", ")
    alert(`Rental booking confirmed!\n\nShop: ${selectedShop.name}\nItems: ${itemsList}\nDuration: ${rentalDays} days\nStart Date: ${rentalStartDate}\nTotal: ${calculateRentalTotal()}`)
    
    setSelectedShop(null)
    setSelectedRentalItems([])
    setRentalDays(1)
    setRentalStartDate("")
  }

  const getWeatherIcon = (condition) => {
    if (condition === "Sunny" || condition === "Clear") return <Sun className="w-6 h-6 text-yellow-500" />
    if (condition === "Partly cloudy" || condition === "Cloudy") return <Cloud className="w-6 h-6 text-gray-500" />
    if (condition.includes("rain")) return <CloudRain className="w-6 h-6 text-blue-500" />
    return <Thermometer className="w-6 h-6 text-red-500" />
  }

  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case "low":
        return "bg-yellow-100 border-yellow-400 text-yellow-800"
      case "moderate":
        return "bg-orange-100 border-orange-400 text-orange-800"
      case "high":
        return "bg-red-100 border-red-400 text-red-800"
      default:
        return "bg-blue-100 border-blue-400 text-blue-800"
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  const location = tourLocations[id]
  const adventureType = getAdventureType(tour.name)
  const safetyTips = safetyGuidelines[adventureType] || safetyGuidelines.default

  return (
    <div className="tour-details-container">
      <h1 className="tour-title">{tour.name}</h1>

      <div className="tour-tabs">
        <button
          className={`tab-button ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Tour Details
        </button>
        <button className={`tab-button ${activeTab === "map" ? "active" : ""}`} onClick={() => setActiveTab("map")}>
          Location Map
        </button>
        <button
          className={`tab-button ${activeTab === "safety" ? "active" : ""}`}
          onClick={() => setActiveTab("safety")}
        >
          Safety & Packing
        </button>
        <button
          className={`tab-button ${activeTab === "weather" ? "active" : ""}`}
          onClick={() => setActiveTab("weather")}
        >
          Weather & Alerts
        </button>
        <button
          className={`tab-button ${activeTab === "guides" ? "active" : ""}`}
          onClick={() => setActiveTab("guides")}
        >
          Local Guides
        </button>
        <button
          className={`tab-button ${activeTab === "gear" ? "active" : ""}`}
          onClick={() => setActiveTab("gear")}
        >
          Gear Rentals
        </button>
        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {activeTab === "details" && (
        <>
          <div className="tour-images">
            {tour.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${tour.name} ${index + 1}`}
                className="tour-image"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          <section className="tour-section">
            <h2>About</h2>
            <p>{tour.description}</p>
          </section>

          <section className="tour-section">
            <h2>Price</h2>
            <p>
              Starting from <span className="original-price">{tour.price}</span>{" "}
              <span className="discounted-price">{tour.discountedPrice}/person</span>
            </p>
          </section>
          <section className="tour-section">
            <h2>Itinerary</h2>
            <ul>
              {tour.itinerary.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === "map" && (
        <section className="tour-section map-section">
          <h2>Tour Location</h2>
          <div className="map-container">
            {location && (
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={13}
                style={{ height: "500px", width: "100%", borderRadius: "8px" }}
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.lat, location.lng]}>
                  <Popup>
                    <strong>{tour.name}</strong>
                    <br />
                    {location.name}
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
          <div className="map-controls">
            <button onClick={() => mapRef.current && mapRef.current.zoomIn()}>Zoom In</button>
            <button onClick={() => mapRef.current && mapRef.current.zoomOut()}>Zoom Out</button>
          </div>
        </section>
      )}

      {activeTab === "safety" && (
        <section className="tour-section">
          <div className="safety-guidelines">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold">Safety Guidelines</h2>
            </div>
            <p className="mb-4">Follow these important safety tips for your {tour.name} adventure:</p>
            <ul className="safety-tips-list">
              {safetyTips.map((tip, index) => (
                <li key={index} className="safety-tip-item">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="packing-checklist mt-8">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">Packing Checklist</h2>
            </div>
            <p className="mb-4">Customize this checklist for your {tour.name} adventure:</p>

            <div className="checklist-container">
              {packingList.map((item) => (
                <div key={item.id} className="checklist-item" onClick={() => toggleChecklistItem(item.id)}>
                  <div className="flex items-center">
                    {item.checked ? (
                      <CheckSquare className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 mr-2" />
                    )}
                    <span className={item.checked ? "line-through text-gray-500" : ""}>{item.item}</span>
                  </div>
                  <span className="checklist-category">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "weather" && (
        <section className="tour-section">
          <div className="weather-section">
            <div className="flex items-center mb-4">
              <Thermometer className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-xl font-bold">Current Weather in {tour.location}</h2>
            </div>

            {weather ? (
              <div className="current-weather">
                <div className="weather-card">
                  <div className="weather-main">
                    <img src={weather.icon || "/placeholder.svg"} alt={weather.condition} className="weather-icon" />
                    <div className="weather-temp">{Math.round(weather.temperature)}°C</div>
                  </div>
                  <div className="weather-details">
                    <div className="weather-detail-item">
                      <span className="weather-label">Condition:</span>
                      <span className="weather-value">{weather.condition}</span>
                    </div>
                    <div className="weather-detail-item">
                      <span className="weather-label">Feels Like:</span>
                      <span className="weather-value">{Math.round(weather.feelsLike)}°C</span>
                    </div>
                    <div className="weather-detail-item">
                      <span className="weather-label">Humidity:</span>
                      <span className="weather-value">{weather.humidity}%</span>
                    </div>
                    <div className="weather-detail-item">
                      <span className="weather-label">Wind:</span>
                      <span className="weather-value">{weather.windSpeed} m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>Weather data is currently unavailable.</p>
            )}

            <div className="weather-forecast mt-6">
              <h3 className="text-lg font-semibold mb-3">3-Day Forecast</h3>
              <div className="forecast-container">
                {weatherForecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <div className="forecast-date">{day.date}</div>
                    <div className="forecast-icon">{getWeatherIcon(day.condition)}</div>
                    <div className="forecast-temp">{day.temperature}°C</div>
                    <div className="forecast-condition">{day.condition}</div>
                  </div>
                ))}
              </div>
            </div>

            {alerts.length > 0 && (
              <div className="weather-alerts mt-6">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <h3 className="text-lg font-semibold">Active Alerts</h3>
                </div>

                {alerts.map((alert, index) => (
                  <div key={index} className={`alert-card ${getAlertSeverityColor(alert.severity)}`}>
                    <div className="alert-type">{alert.type}</div>
                    <div className="alert-message">{alert.message}</div>
                    <div className="alert-dates">
                      Valid: {alert.startDate} to {alert.endDate}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === "guides" && (
        <section className="tour-section">
          <div className="local-guides">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold">Local Guides for {tour.location}</h2>
            </div>

            {guides.length > 0 ? (
              <div className="guides-container">
                {guides.map((guide) => (
                  <div key={guide.id} className="guide-card" onClick={() => handleGuideSelect(guide)}>
                    <div className="guide-image-container">
                      <img src={guide.image || "/placeholder.svg"} alt={guide.name} className="guide-image" />
                    </div>
                    <div className="guide-details">
                      <h3 className="guide-name">{guide.name}</h3>
                      <div className="guide-specialization">{guide.specialization}</div>
                      <div className="guide-experience">{guide.experience} experience</div>
                      <div className="guide-languages">Speaks: {guide.languages.join(", ")}</div>
                      <div className="guide-rating">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{guide.rating}</span>
                          <span className="text-gray-500 ml-1">({guide.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="guide-price">{guide.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No local guides available for this location at the moment.</p>
            )}

            {selectedGuide && (
              <div className="guide-booking-modal">
                <div className="guide-booking-content">
                  <h3 className="text-xl font-bold mb-4">Book {selectedGuide.name}</h3>

                  <div className="guide-booking-details">
                    <div className="flex items-center mb-3">
                      <User className="w-5 h-5 text-gray-600 mr-2" />
                      <span>{selectedGuide.specialization}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <Calendar className="w-5 h-5 text-gray-600 mr-2" />
                      <span>Available: {selectedGuide.availability.join(", ")}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <MapPin className="w-5 h-5 text-gray-600 mr-2" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center mb-5">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      <span>
                        {selectedGuide.rating} ({selectedGuide.reviews} reviews)
                      </span>
                    </div>

                    <div className="booking-form">
                      <div className="form-group">
                        <label htmlFor="booking-date" className="form-label">
                          Select Date:
                        </label>
                        <input
                          type="date"
                          id="booking-date"
                          className="form-input"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                        />
                      </div>

                      <div className="booking-actions">
                        <button className="book-guide-button" onClick={handleBookGuide}>
                          Book Now - {selectedGuide.price}
                        </button>
                        <button className="cancel-button" onClick={() => setSelectedGuide(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === "gear" && (
        <section className="tour-section">
          <div className="gear-rentals">
            <div className="flex items-center mb-4">
              <Tool className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-bold">Gear & Equipment Rentals</h2>
            </div>
            <p className="mb-4">Rent the gear you need for your {tour.name} adventure from these nearby shops:</p>

            {rentalShops.length > 0 ? (
              <div className="rental-shops-container">
                {rentalShops.map((shop) => (
                  <div key={shop.id} className="rental-shop-card" onClick={() => handleShopSelect(shop)}>
                    <div className="rental-shop-header">
                      <h3 className="rental-shop-name">{shop.name}</h3>
                      <div className="rental-shop-rating">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{shop.rating}</span>
                          <span className="text-gray-500 ml-1">({shop.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="rental-shop-details">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-gray-600 mr-2" />
                        <span>{shop.location}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-4 h-4 text-gray-600 mr-2" />
                        <span>{shop.hours}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Phone className="w-4 h-4 text-gray-600 mr-2" />
                        <span>{shop.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <ExternalLink className="w-4 h-4 text-gray-600 mr-2" />
                        <a href={`https://${shop.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" onClick={(e) => e.stopPropagation()}>
                          {shop.website}
                        </a>
                      </div>
                    </div>
                    <div className="rental-shop-items">
                      <h4 className="text-sm font-semibold mb-2">Available Equipment:</h4>
                      <ul className="rental-items-list">
                        {shop.items.slice(0, 3).map((item, index) => (
                          <li key={index} className="rental-item">
                            <span>{item.name}</span>
                            <span className="rental-item-price">{item.price}</span>
                          </li>
                        ))}
                        {shop.items.length > 3 && (
                          <li className="text-sm text-blue-500">+ {shop.items.length - 3} more items</li>
                        )}
                      </ul>
                    </div>
                    <button className="view-rentals-button">View All Equipment</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No rental shops available for this activity at the moment.</p>
            )}

            {selectedShop && (
              <div className="rental-booking-modal">
                <div className="rental-booking-content">
                  <h3 className="text-xl font-bold mb-4">Rent Equipment from {selectedShop.name}</h3>

                  <div className="rental-booking-details">
                    <div className="rental-shop-info mb-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 text-gray-600 mr-2" />
                        <span>{selectedShop.location}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-gray-600 mr-2" />
                        <span>{selectedShop.hours}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Star className="w-5 h-5 text-yellow-500 mr-2" />
                        <span>
                          {selectedShop.rating} ({selectedShop.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="rental-items-selection mb-4">
                      <h4 className="text-lg font-semibold mb-2">Select Equipment to Rent:</h4>
                      <div className="rental-items-grid">
                        {selectedShop.items.map((item, index) => (
                          <div 
                            key={index} 
                            className={`rental-item-card ${selectedRentalItems.some(selectedItem => selectedItem.name === item.name) ? 'selected' : ''}`}
                            onClick={() => handleRentalItemToggle(item)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="rental-item-name">{item.name}</span>
                              <span className="rental-item-price">{item.price}</span>
                            </div>
                            <div className="rental-item-availability">
                              {item.available ? (
                                <span className="text-green-500">Available</span>
                              ) : (
                                <span className="text-red-500">Out of stock</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rental-booking-form">
                      <div className="form-group mb-4">
                        <label htmlFor="rental-start-date" className="form-label">
                          Start Date:
                        </label>
                        <input
                          type="date"
                          id="rental-start-date"
                          className="form-input"
                          value={rentalStartDate}
                          onChange={(e) => setRentalStartDate(e.target.value)}
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="rental-days" className="form-label">
                          Number of Days:
                        </label>
                        <div className="rental-days-selector">
                          <button 
                            className="rental-days-btn" 
                            onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                            disabled={rentalDays <= 1}
                          >
                            -
                          </button>
                          <span className="rental-days-value">{rentalDays}</span>
                          <button 
                            className="rental-days-btn" 
                            onClick={() => setRentalDays(rentalDays + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {selectedRentalItems.length > 0 && (
                        <div className="rental-summary mb-4">
                          <h4 className="text-lg font-semibold mb-2">Rental Summary:</h4>
                          <ul className="rental-summary-list">
                            {selectedRentalItems.map((item, index) => (
                              <li key={index} className="rental-summary-item">
                                <span>{item.name}</span>
                                <span>{item.price} × {rentalDays} days</span>
                              </li>
                            ))}
                          </ul>
                          <div className="rental-total">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold">{calculateRentalTotal()}</span>
                          </div>
                        </div>
                      )}

                      <div className="rental-booking-actions">
                        <button 
                          className="book-rental-button" 
                          onClick={handleRentalBooking}
                          disabled={selectedRentalItems.length === 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Book Rental
                        </button>
                        <button className="cancel-button" onClick={() => setSelectedShop(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === "reviews" && (
        <section className="tour-section">
          <h2>Reviews</h2>
          <div className="reviews-container">
            {tour.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <h3>{review.title}</h3>
                <div className="review-rating">Rating: {review.rating}/5</div>
                <p>{review.comment}</p>
                <p className="review-date">
                  Written by {review.user} on {review.date}
                </p>
                {review.images && review.images.length > 0 && (
                  <div className="review-images">
                    {review.images.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img || "/placeholder.svg"}
                        alt={`Review image ${imgIndex + 1}`}
                        className="review-image"
                        onClick={() => handleImageClick(img)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="tour-section booking-section">
        <h2>Booking Information</h2>
        <button className="book-now-button" onClick={handleBookNowClick}>
          Book Now
        </button>
      </section>

      {isModalOpen && (
        <div className="modal" onClick={handleModalClose}>
          <img src={currentImage || "/placeholder.svg"} alt="Enlarged" className="modal-image" />
        </div>
      )}
    </div>
  )
}

export default TourDetails
