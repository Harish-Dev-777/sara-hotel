export interface Room {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  image: string;
  features: string[];
  details: {
    guests: string;
    bed: string;
    size: string;
    view: string;
  };
  amenities: string[];
}

export const rooms: Room[] = [
  {
    id: "standard-room",
    title: "Standard Room",
    description: "Elegant simplicity meets modern comfort. Ideal for short stays and business travelers.",
    longDescription: "Our Standard Room offers a refined atmosphere where comfort and functionality converge. Designed for guests who value a peaceful night's rest, the room features high-quality linens and a minimalist design that emphasizes the luxury of simplicity.",
    price: "2,499",
    image: "/room-images/standard-room.png",
    features: ["Queen Bed", "Work Desk", "Free Wi-Fi", "Walk-in Shower"],
    details: {
      guests: "1–2",
      bed: "Queen Size",
      size: "280 sq.ft",
      view: "City View"
    },
    amenities: ["Free WiFi", "Air Conditioning", "Work Desk", "Bath Amenities", "Daily Housekeeping"]
  },
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    description: "A perfect blend of comfort and style with enhanced space and premium furnishings.",
    longDescription: "Experience the perfect harmony of modern aesthetics and ultimate comfort. Our Deluxe Rooms are generously sized and feature premium furniture, providing a relaxing environment for both leisure and business stays.",
    price: "3,499",
    image: "/room-images/delax-room.png",
    features: ["King Size Bed", "City View", "Smart TV", "Mini Bar"],
    details: {
      guests: "2",
      bed: "King Size",
      size: "350 sq.ft",
      view: "City View"
    },
    amenities: ["Free WiFi", "Smart TV", "Mini Bar", "Air Conditioning", "Safe Box", "Tea/Coffee Maker"]
  },
  {
    id: "superior-room",
    title: "Superior Room",
    description: "Upgrade your experience with luxury finishes and elevated guest services.",
    longDescription: "Our Superior Room is designed to offer an elevated sense of luxury. With premium finishes, expansive windows, and a dedicated workspace, it's the ideal choice for guests who seek a more refined hotel experience in Chennai.",
    price: "4,499",
    image: "/room-images/superior-room.png",
    features: ["King Bed", "Premium View", "Coffee Station", "Bathrobe & Slippers"],
    details: {
      guests: "2",
      bed: "King Bed",
      size: "380 sq.ft",
      view: "Premium City View"
    },
    amenities: ["Free WiFi", "High-End Bath Products", "Bathrobe & Slippers", "Mini Bar", "Room Service"]
  },
  {
    id: "garden-view-room",
    title: "Garden View Room",
    description: "Serene views of our private landscaped gardens for a peaceful retreat.",
    longDescription: "Escape the bustle of the city in our Garden View Room. Wake up to the tranquil scenery of our lush, landscaped interior gardens. This room is a haven of peace, perfect for recharging after a busy day.",
    price: "3,999",
    image: "/room-images/garden-view-room.png",
    features: ["Garden Terrace", "Soundproof", "Luxury Linens", "Tea Selection"],
    details: {
      guests: "2",
      bed: "King Bed",
      size: "400 sq.ft",
      view: "Lush Gardens"
    },
    amenities: ["Private Balcony", "Garden Access", "Premium Linens", "Safe Box", "Smart TV"]
  },
  {
    id: "family-room",
    title: "Family Room",
    description: "Designed for groups and families, offering comfort and privacy for all ages.",
    longDescription: "Traveling with family has never been easier. Our Family Rooms provide ample space and thoughtful design to ensure everyone enjoys their stay. Featuring two beds and a spacious lounge area, it's a home away from home.",
    price: "5,999",
    image: "/room-images/family-room.png",
    features: ["Two Double Beds", "Kid-Friendly Space", "Large Bathroom", "Interconnecting Options"],
    details: {
      guests: "3–4",
      bed: "Two Double Beds",
      size: "550 sq.ft",
      view: "City Skyline"
    },
    amenities: ["Free WiFi", "Kids' Amenities", "Mini Fridge", "Large Tub", "Smart TV", "Extra Bed Possible"]
  },
  {
    id: "junior-suite",
    title: "Junior Suite",
    description: "A sophisticated haven with a dedicated seating area and refined décor.",
    longDescription: "The Junior Suite is the ultimate expression of modern elegance. It features a separate seating area that blends seamlessly into a luxurious bedroom, offering a studio-apartment feel with all the high-end hotel services.",
    price: "7,499",
    image: "/room-images/junior-suite-room.png",
    features: ["Seating Lounge", "Welcome Amenities", "Early Check-in Path", "Turn-down Service"],
    details: {
      guests: "2–3",
      bed: "King Size",
      size: "480 sq.ft",
      view: "Sea Peek / City View"
    },
    amenities: ["Separate Lounge", "Early Check-in Path", "Turn-down Service", "Premium Coffee Maker", "Spa Discount"]
  },
  {
    id: "executive-suite",
    title: "Executive Suite",
    description: "Experience elevated comfort in our Executive Suite, featuring modern interiors, spacious layout, and stunning city views.",
    longDescription: "The Executive Suite is designed for guests who seek both luxury and functionality. With distinct areas for living and sleeping, it provides the perfect backdrop for long stays or hosting business guests in a private, high-end environment.",
    price: "7,999",
    image: "/room-images/suite-room.png",
    features: ["Separate Living Room", "Dining Area", "Club Lounge Access", "Personal Concierge"],
    details: {
      guests: "2–3",
      bed: "King Size",
      size: "520 sq.ft",
      view: "City / Sea"
    },
    amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Mini Bar", "Room Service", "Balcony"]
  },
  {
    id: "presidential-suite",
    title: "Presidential Suite",
    description: "The pinnacle of luxury. Unmatched space, privacy, and panoramic views of Chennai.",
    longDescription: "Our Presidential Suite is the crowning jewel of Sara Hotel. It offers grand-scale living with a private kitchen, dedicated workspace, and a master bathroom that serves as a private spa. It's not just a room; it's a world-class residence.",
    price: "29,999",
    image: "/room-images/presidential-suite-room.png",
    features: ["Private Kitchen", "Master Bedroom", "24/7 Butler", "Airport Transfer Included"],
    details: {
      guests: "4",
      bed: "Master King Suite",
      size: "1200 sq.ft",
      view: "360° Panoramic Chennai View"
    },
    amenities: ["24/7 Butler", "Private Kitchen", "Dining Hall", "In-room Jacuzzi", "Private Balcony", "Limousine Transfer"]
  }
];

export const getRoomById = (id: string) => {
  return rooms.find(room => room.id === id);
};
