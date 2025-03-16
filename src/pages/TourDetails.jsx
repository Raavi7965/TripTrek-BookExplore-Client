import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TourDetails.css';

const mockTourData = {
  1: {
    id: 1,
    name: 'Rishikesh Adventure Tour',
    images: [
      'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg',
      'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961566/adventour-tour-images/8d203e605cfd5118_mlqx9r.jpg',
      'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961575/adventour-tour-images/ff2e6398f6ffdc99_wru1vu.jpg'
    ],
    description: 'Rishikesh is a popular destination for adventure sports...',
    price: '₹15,500',
    discountedPrice: '₹14,500',
    itinerary: ['Day 1: Arrival', 'Day 2: Rafting', 'Day 3: Trekking', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Tushar',
        rating: 5,
        type: 'Friends',
        title: 'A Thrilling 3-Day Journey',
        comment: 'Embark on an unforgettable 3-Day Rishikesh Adventure Tour...',
        date: '29 May 2024',
        images: [
          'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716974597/tour-review-images/6c5f9ff8ad594285_w0p393.jpg',
          'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716974597/tour-review-images/06ad944afe6f66e3_hp7log.jpg']
      }
    ]
  },
  2: {
    id: 2,
    name: 'Manali Snow Adventure',
    images: [
      'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716286536/adventour-tour-images/53cb901e908965cb_okybzk.jpg',
      'https://www.seawatersports.com/images/activies/slide/trekking-in-manali-package.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOE9bL1J7VU-hm07fCd2Bun59UcReXnQfUw&s'
    ],
    description: 'Experience the thrill of snow-clad mountains in Manali...',
    price: '₹18,000',
    discountedPrice: '₹16,500',
    itinerary: ['Day 1: Arrival', 'Day 2: Skiing', 'Day 3: Snow Trekking', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Ravi',
        rating: 4,
        type: 'Couple',
        title: 'Romantic and Adventurous',
        comment: 'Manali was breathtaking, and the skiing experience was unmatched!',
        date: '10 Jan 2024',
        images: []
      }
    ]
  },
  3: {
    id: 3,
    name: 'Netrani Island Scuba Diving',
    images: [
      'https://dtmag.com/wp-content/uploads/2015/09/iStock_000028077202_600.jpg',
      'https://b3619545.smushcdn.com/3619545/wp-content/uploads/2023/09/Deep-Dive-Dubai-kids-first-Nomad-dive-1024x683.jpg?lossy=2&strip=1&webp=1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO6YE5QJl-OMDJWJHdj96ImRx-5_jRJ3WOPA&s'
    ],
    description: 'Dive into the crystal-clear waters of Netrani Island and explore vibrant marine life.',
    price: '₹18,000',
    discountedPrice: '₹16,500',
    itinerary: ['Day 1: Arrival', 'Day 2: Scuba Diving Training', 'Day 3: Deep Sea Dive', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Ravi',
        rating: 4,
        type: 'Couple',
        title: 'Romantic and Adventurous',
        comment: 'Manali was breathtaking, and the skiing experience was unmatched!',
        date: '10 Jan 2024',
        images: []
      }
    ]
  },
  4: {
    id: 4,
    name: 'Bangalore Trekking Adventure',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzKDuFYI3r2jlWU_S3-lip8iKZ_KGE3ruLgQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr2sN2GH2RHoTyj2fEmieGMU1EsrCL_2IQbF43DxMZwiHXOJ6MZN6Pm6MpiWf0EL5ApwY&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kCSAv9aQM1CMcwQ1Gb91W9-n7FN7GjgIKzpsRS9ujkriC7kO-k2DXM4QRKKohWvcHAQ&usqp=CAU'
    ],
    description: 'Embark on an exciting trek to Savandurga, one of the largest monolith hills in Asia. Experience breathtaking sunrise views, explore ancient temples, and trek through lush green trails surrounded by nature..',
    price: '₹18,000',
    discountedPrice: '₹16,500',
    itinerary: ['Day 1: Arrival', 'Day 2: base camp, briefing, and warm-up session', 'Day 3: Early morning trek to the peak, enjoy panoramic views.', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Ravi',
        rating: 4,
        type: 'Couple',
        title: 'Romantic and Adventurous',
        comment: 'Manali was breathtaking, and the skiing experience was unmatched!',
        date: '10 Jan 2024',
        images: []
      }
    ]
  },
  5: {
    id: 5,
    name: 'Spiti Valley Trek',
    images: [
      'https://www.himalayanhikers.in/wp-content/uploads/2023/05/WhatsApp-Image-2023-05-21-at-04.45.52-1.jpeg',
      'https://www.potala-himalaya.com/uploads/potala_himalaya/package/main/658a970a1aa01173_spiti_valley_tour_2024.png',
      'https://www.treksandtrails.org/system/images/000/271/930/94cb5f26c417261fd18fb18232d721b6/original/Spiti-homestay-trek.jpg?1648718310'
    ],
    description: 'Embark on an unforgettable trek through the remote and breathtaking landscapes of Spiti Valley. Experience rugged terrains, ancient monasteries, and stunning high-altitude villages.',
    price: '₹8,500',
    discountedPrice: '₹8,000',
    itinerary: ['Day 1: Arrival in Manali, acclimatization & briefing', 'Day 2: Trek to Key Monastery & Kibber village, breathtaking valley views', 'Day 3: Early morning trek to the peak, enjoy panoramic views.', 'Day 4: Trek to Hikkim (world’s highest post office), Langza, and back', 'Day 5: Explore Dhankar Monastery & Pin Valley','Day 6: Return journey & departure'],
    reviews: [
      {
        user: 'Priya',
        rating: 4.5,
        type: 'Couple',
        title: 'A Soul-Stirring Experience!',
        comment: 'Spiti Valley’s beauty is surreal! Trekking through the villages and monasteries felt like stepping into another world. Highly recommended!',
        date: '17 Jan 2024',
        images: []
      }
    ]
  },
  6: {
    id: 6,
    name: 'Kodai Lake Boating',
    images: [
      'https://c8.alamy.com/comp/GWBM2F/boating-in-kodaikanal-lake-GWBM2F.jpg',
      'https://www.ttdconline.com/_next/boat-house/kodaikanal/3.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPVNs3L7j0UI3HldBMRbS6qaTEwSKAzFEUeA&s'
    ],
    description: 'Experience a serene and picturesque boating adventure at Kodai Lake, the heart of Kodaikanal. Surrounded by lush green hills and misty landscapes, enjoy a peaceful ride on the tranquil waters. Choose from rowboats, pedal boats, or shikaras for a memorable experience with family, friends, or a loved one.,',
    price: '₹1,800',
    discountedPrice: '₹1,500',
    itinerary: ['Day 1: Arrival in Kodaikanal, local sightseeing', 'Day 2: Enjoy boating at Kodai Lake, cycle around the lake, visit Coaker’s Walk.', 'Day 3: Explore Bryant Park, Green Valley View, and Pillar Rocks','Day 4: Departure'],
    reviews: [
      {
        user: 'Ravi',
        rating: 4,
        type: 'Couple',
        title: 'Romantic and Peaceful',
        comment: 'Boating at Kodai Lake was the highlight of our trip! The misty hills, cool breeze, and calm waters made it a magical experience.',
        date: '01 feb 2024',
        images: []
      }
    ]
  },
  7: {
    id: 7,
    name: 'Ladakh Bike Tour',
    images: [
      'https://imgcld.yatra.com/ytimages/image/upload/v1517482103/AdvNation/ANN_TRP530/Bike-Expedition-Ladakh_1439472639_F6YkoV.jpg',
      'https://vl-prod-static.b-cdn.net/system/images/000/300/878/160b26bc2e280d83db6ada2224d6107e/x800gt/DSC00399.jpg?1594207788',
      'https://discoverlehladakh.in/wp-content/uploads/2021/02/Ladakh-bike-tour-package-banner.jpg'
    ],
    description: 'Embark on an exhilarating Ladakh Bike Tour, riding through some of the world’s highest motorable passes. Witness breathtaking landscapes, explore ancient monasteries, and experience the thrill of adventure as you traverse rugged mountain terrains. From the serene Pangong Lake to the iconic Khardung La, this journey promises an unforgettable experience.',
    price: '₹25,000',
    discountedPrice: '₹23,500',
    itinerary: ['Day 1: Arrival in Leh, acclimatization & local sightseeing', 'Day 2: Ride to Nubra Valley via Khardung La (world’s highest motorable pass)', 'Day 3: Explore Nubra, ride to Pangong Lake via Shyok Valley', 'Day 4: Sunrise at Pangong, ride back to Leh via Chang La Pass','Day 5: Departure'],
    reviews: [
      {
        user: 'Srinivas',
        rating: 4.5,
        type: 'Couple',
        title: 'Thrilling and Scenic Ride!',
        comment: 'Ladakh’s landscapes are surreal! The bike ride through high-altitude passes and stunning valleys made it an adventure of a lifetime.',
        date: '19 Dec 2023',
        images: []
      }
    ]
  },
  8: {
    id: 8,
    name: 'Bangalore Trekking Adventure',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9Hm6kxpccRODqV829QFsRu9k4eOwZMMu6g&s',
      'https://farm9.staticflickr.com/8227/29070149562_2ba5c527fd_z.jpg',
      'https://blog.moustachescapes.com/wp-content/uploads/2022/11/608f747c5a123_1620014204-1.jpg'
    ],
    description: 'Experience the thrill of Goa Water Sports, where adventure meets the sea! Dive into an action-packed day with activities like jet skiing, parasailing, banana boat rides, and scuba diving. Soak in the stunning coastal views, feel the rush of adrenaline, and create unforgettable memories on Goa’s pristine beaches.',
    price: '₹3,5000',
    discountedPrice: '₹3,000',
    itinerary: ['Day 1: Arrival in Goa, beach exploration, and local sightseeing', 'Day 2: Water sports adventure – jet skiing, parasailing, banana boat ride, and bumper ride', 'Day 3: Day 3: Scuba diving or snorkeling, dolphin spotting, and sunset cruise', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Durga',
        rating: 4,
        type: 'Couple',
        title: 'Thrilling & Fun Experience!',
        comment: 'Goa’s water sports were an absolute blast! Parasailing gave us the best aerial view of the beach, and jet skiing was pure adrenaline. A must-try experience!',
        date: '12 Mar 2024',
        images: []
      }
    ]
  },
  9: {
    id: 9,
    name: 'Meghalaya Caving Adventure',
    images: [
      'https://www.kipepeo.in/wp-content/uploads/meghalaya-caving-06.jpg',
      'https://www.holidayrentals.co.in/blog/wp-content/uploads/2015/12/Caving-Meghalaya-400x266.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-9Vb7Ug_oUG6hZIh35HWxhOji24DEmjUwg&s'
    ],
    description: 'Embark on an exciting Meghalaya Caving Adventure, exploring some of India’s most stunning and mysterious caves. Discover ancient limestone formations, underground rivers, and awe-inspiring stalactites and stalagmites. Experience the thrill of spelunking through hidden caverns while surrounded by Meghalaya’s breathtaking landscapes.',
    price: '₹8,000',
    discountedPrice: '₹7,500',
    itinerary: ['Day 1: Arrival in Shillong, local sightseeing', 'Day 2: Drive to Cherrapunji, briefing, and warm-up session', 'Day 3: Explore Mawsmai Cave, Arwah Cave & the thrilling Siju Cave expedition', 'Day 4: Visit Laitlum Canyon, relax at Umiam Lake, and departure'],
    reviews: [
      {
        user: 'Venky',
        rating: 3.5,
        type: 'Couple',
        title: 'Thrilling and Mysterious!',
        comment: 'Exploring Meghalaya’s caves was an incredible experience! The rock formations inside the caves were mesmerizing, and the adventure was truly one-of-a-kind.',
        date: '10 Feb 2024',
        images: []
      }
    ]
  },
  10: {
    id: 10,
    name: 'Sand Dune Safari & Camping',
    images: [
      'https://chokhidhani.com/desert-camp-jaisalmer/wp-content/uploads/2023/04/image11-768x512.jpg',
      'https://media-cdn.tripadvisor.com/media/photo-s/0d/06/96/11/dunes-desert-safari.jpg',
      'https://i.ytimg.com/vi/Un7pCv0W95I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDSwxwU4jeIdrCQd0yhkIv4VmaXtg'
    ],
    description: 'Embark on an unforgettable Sand Dune Safari & Camping adventure in the golden deserts of Rajasthan. Experience the thrill of dune bashing, witness a breathtaking sunset over the vast sand dunes, and enjoy a cultural evening with folk music and dance under the starlit sky. End the day with a cozy camping experience in traditional desert tents.',
    price: '₹10,000',
    discountedPrice: '₹9,500',
    itinerary: ['Day 1: Arrival in Jaisalmer, local sightseeing, and market visi', 'Day 2: Drive to the desert camp, dune bashing, and camel safari', 'Day 3: Enjoy cultural performances, Rajasthani dinner, and overnight camping', 'Day 4: Sunrise over the dunes and departure'],
    reviews: [
      {
        user: 'Sneha',
        rating: 5,
        type: 'Couple',
        title: 'Mesmerizing Desert Experience!',
        comment: 'The safari was thrilling, and camping under the stars was magical! The folk performances added a special touch to our experience.',
        date: '15 Jan 2025',
        images: []
      }
    ]
  },
  11: {
    id: 11,
    name: 'White Water Rafting',
    images: [
      'https://www.visitsouthwestidaho.org/wp-content/uploads/fly-images/4774/whitewater-rafting-in-idaho-payette-river-1-2-scaled-0x0.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBOw24L0kcWbfvlMzQcju-JFslfXw99wa-Rg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkGj0yYtQjhFrBc9IZRoljbS6DvTPE587gA&s'
    ],
    description: 'Get ready for an adrenaline-pumping White Water Rafting adventure! Navigate through thrilling rapids, experience the rush of fast-flowing rivers, and soak in the breathtaking natural landscapes around you. Whether you are a beginner or an experienced rafter, this adventure promises excitement, teamwork, and unforgettable moments on the water.',
    price: '₹5,000',
    discountedPrice: '₹4,500',
    itinerary: ['Day 1: Arrival at the rafting destination, safety briefing, and gear check', 'Day 2: Warm-up session, guided rafting experience through exhilarating rapids', 'Day 3: Explore nearby scenic spots, waterfalls, and local attractions.', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Jashu',
        rating: 4,
        type: 'Couple',
        title: 'hrilling and Unforgettable!',
        comment: 'Rafting was the highlight of our trip! The rush of navigating through rapids was an experience like no other. Highly recommended for adventure lovers!',
        date: '20 jun 2024',
        images: []
      }
    ]
  },
  12: {
    id: 12,
    name: 'Coorg Coffee Plantation Trek',
    images: [
      'https://d3kgrlupo77sg7.cloudfront.net/media/coorgvisit.com/images/tinymce/Image.20230208040947.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM89f34iSYcULHQ1lbVCy_3sfZflMsHJzfnw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYJvuby3HIN6wEIeW-2OoHmG540hVs8lZnA&s'
    ],
    description: 'Embark on a refreshing Coorg Coffee Plantation Trek, where adventure meets serenity. Walk through lush green coffee estates, breathe in the fresh aroma of coffee beans, and witness breathtaking landscapes. Enjoy the scenic trails, spot diverse flora and fauna, and experience the charm of Coorg’s misty hills and waterfalls.',
    price: '₹4,000',
    discountedPrice: '₹3,200',
    itinerary: ['Day 1: Arrival in Coorg, local sightseeing, and visit to a coffee estate', 'Day 2: Guided trek through coffee plantations, scenic viewpoints, and waterfalls', 'Day 3: Explore Dubare Elephant Camp, visit Abbey Falls, and relax at Raja’s Seat', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Poojitha',
        rating: 4,
        type: 'Couple',
        title: 'Tranquil & Refreshing!',
        comment: 'Walking through the coffee plantations was an absolute delight! The trek was easy and scenic, and the aroma of coffee in the air made the experience even better. A perfect getaway!',
        date: '10 Aug 2024',
        images: []
      }
    ]
  },
  13: {
    id: 13,
    name: 'Zanskar Frozen River Trek',
    images: [
      'https://trekthehimalayas.com/images/ChadarTrekFrozenRiver/GalleryDesktop/Winter/91a87695-e4bd-4cea-a274-724316afe373_Chadar-6.webp',
      'https://ekaxp.in/wp-content/uploads/2022/09/Chadar-Trek-Ladakh-India_Eka-Experiences3.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLkHXAwyWGmhgm-OerpKOkzTVGa6jACLUztg&s'
    ],
    description: 'Embark on an exhilarating Zanskar Frozen River Trek, also known as the Chadar Trek, one of the most challenging and breathtaking winter treks in India. Walk over the frozen Zanskar River, witness stunning ice formations, and experience the raw beauty of Ladakh’s winter wonderland. This trek offers a once-in-a-lifetime adventure through icy landscapes, frozen waterfalls, and remote Himalayan villages',
    price: '₹22,000',
    discountedPrice: '₹21,000',
    itinerary: ['Day 1: Arrival in Leh, acclimatization, and local exploration', 'Day 2: Acclimatization and trek briefing, visit Shanti Stupa and Leh Market', 'Day 3: Drive to Chilling, trek to Tsomo Paldar (first campsite on the frozen river).', 'Day 4: Trek to Dib Cave, experiencing surreal frozen landscapes','Day 5: Trek to Nerak Waterfall, admire the magnificent frozen waterfall', 'Day 6: Return trek to Tsomo Paldar via the same frozen route', 'Day 7: Trek back to Chilling, drive to Leh','Day 8: Departure from Leh'],
    reviews: [
      {
        user: 'Ravi',
        rating: 4,
        type: 'Couple',
        title: 'Romantic and Adventurous',
        comment: ' Walking on the frozen river was surreal! The icy landscapes and frozen waterfalls were mesmerizing. The trek was challenging, but the experience was totally worth it. A must-do for adventure lovers!',
        date: '10 apr 2024',
        images: []
      }
    ]
  },
  14: {
    id: 14,
    name: 'Munnar Tea Estate Walk',
    images: [
      'https://munnarinfo.in/uploads/profile/1560610709fdewrjya758276.jpg',
      'https://www.holidify.com/images/cmsuploads/compressed/Munnar66_20181211014155.jpg',
      'https://www.stayvista.com/blog/wp-content/uploads/2024/10/blog-33.jpg'
    ],
    description: 'Immerse yourself in the lush green beauty of Munnar’s Tea Estates, where rolling hills are covered in mist and endless tea plantations create a breathtaking landscape. Walk through the scenic tea gardens, learn about tea cultivation and processing, and experience the serenity of Munnar’s tranquil environment. This leisurely walk is perfect for nature lovers, photography enthusiasts, and those looking to escape into the refreshing air of the Western Ghats.',
    price: '₹2,500',
    discountedPrice: '₹2,000',
    itinerary: ['Day 1: Arrival in Munnar, explore local markets and tea museums', 'Day 2: Guided tea estate walk, visit tea factories, and interact with tea plantation workers', 'Day 3: Sunrise viewpoint trek, enjoy a picnic amidst the tea gardens', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Susmi',
        rating: 3,
        type: 'Couple',
        title: 'Serene & Refreshing Experience!',
        comment: 'Walking through the tea plantations was peaceful and rejuvenating. The aroma of fresh tea leaves and the breathtaking views made this an unforgettable experience. Highly recommended for nature lovers!',
        date: '17 July 2024',
        images: []
      }
    ]
  },
  15: {
    id: 15,
    name: 'Mahabaleshwar Paragliding',
    images: [
      'https://i.ytimg.com/vi/8O42tjbyHnc/sddefault.jpg',
      'https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/10/Paragliding-in-Mahabaleshwar-840x425.jpg',
      'https://curlytales.com/wp-content/uploads/2023/12/paragliding.jpg'
    ],
    description: 'Soar high above the stunning Sahyadri Hills with an exhilarating paragliding experience in Mahabaleshwar! Witness breathtaking views of the lush green valleys, sparkling rivers, and endless mountain landscapes as you glide through the sky. Whether you’re a first-time flyer or an adventure enthusiast, this paragliding experience is sure to leave you thrilled and awestruck.',
    price: '₹7,000',
    discountedPrice: '₹6,500',
    itinerary: ['Day 1: Arrival in Mahabaleshwar, explore scenic viewpoints and local attractions', 'Day 2: Paragliding briefing, safety instructions, and tandem paragliding flight over the valleys', 'Day 3: Optional sightseeing tour (Venna Lake, Pratapgad Fort) and leisure activities', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Chandu',
        rating: 5,
        type: 'Couple',
        title: 'hrilling & Unforgettable Experience!',
        comment: 'The paragliding experience was surreal! Floating above the beautiful landscapes of Mahabaleshwar was both thrilling and peaceful. A must-try for adventure seekers!',
        date: '14 feb 2023',
        images: []
      }
    ]
  },
  16: {
    id: 16,
    name: 'Andaman Scuba Diving',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS41FdXhIRlns4QshZYIhHOkJeX9hK-q99Nig&s',
      'https://cdn.experienceandamans.com/images/scuba-diving-andaman-islands.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLE4x6SbEihcrobwdAmu23jehjelN9bXTHmA&s'
    ],
    description: 'Dive into the crystal-clear waters of the Andaman Islands and explore a mesmerizing underwater world filled with vibrant coral reefs and diverse marine life. Whether you are a beginner or an experienced diver, this scuba diving adventure offers an unforgettable experience with trained instructors guiding you through the best dive sites in Andaman. Witness exotic fish, sea turtles, and stunning aquatic landscapes as you immerse yourself in the beauty of the ocean.',
    price: '₹58,000',
    discountedPrice: '₹55,500',
    itinerary: ['Day 1: Arrival in Port Blair, local sightseeing, and beach exploration', 'Day 2: Scuba diving briefing, safety training, and first dive experience at Havelock Island', 'Day 3: Advanced dive session at Elephant Beach, explore coral reefs and marine life.', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Vijay',
        rating: 4,
        type: 'Couple',
        title: 'Magical Underwater Experience!',
        comment: 'Scuba diving in Andaman was an absolute dream! The marine life and coral reefs were breathtaking. The instructors were very professional and made us feel completely safe throughout the experience.',
        date: '29 Jan 2024',
        images: []
      }
    ]
  },
  17: {
    id: 17,
    name: 'Ooty Nilgiri Toy Train Ride',
    images: [
      'https://i.ytimg.com/vi/H8-Z6RjoR-I/hqdefault.jpg',
      'https://www.katchutravels.com/wp-content/uploads/2018/01/26233519_10155687825470860_3950415352338804460_o.jpg',
      'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/the-nilgiri-mountain-railway-1654196073_a8a2bec2db7df995bf9e.webp'
    ],
    description: 'Take a scenic journey through the Nilgiri Hills aboard the iconic Nilgiri Mountain Railway, a UNESCO World Heritage Site. Experience breathtaking views of lush tea gardens, misty hills, and picturesque valleys as the toy train winds through tunnels and bridges. A perfect getaway for nature lovers and photography enthusiasts, this ride offers a nostalgic and serene escape into the beauty of Ooty.',
    price: '₹5,000',
    discountedPrice: '₹1,500',
    itinerary: ['Day 1: Arrival in Ooty, explore local attractions and botanical gardens', 'Day 2: Board the Nilgiri Toy Train, enjoy the scenic ride through tunnels, waterfalls, and forests', 'Day 3: Departure'],
    reviews: [
      {
        user: 'Bose',
        rating: 4.5,
        type: 'Couple',
        title: 'A Fairy Tale Train Ride!',
        comment: 'he Nilgiri Toy Train ride was mesmerizing! The slow journey through the misty hills and tea gardens felt like a dream. Highly recommended for a peaceful and scenic experience.',
        date: '10 Nov 2024',
        images: []
      }
    ]
  },
  18: {
    id: 18,
    name: 'Bungee Jumping in Rishikesh',
    images: [
      'https://media1.thrillophilia.com/filestore/vh7y49qhaawmyqe1ugx5svaz9uuw__BH_1023.JPG?w=400&dpr=2',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXCj1Ugpfaz8UXaBA-jon4Gj-euLrP8Tn0w&s',
      'https://campgangavatika.com/img/act/bungee-jumping-in-shivpuri.jpg'
    ],
    description: 'Get your adrenaline pumping with an unforgettable bungee jumping experience in Rishikesh, Indias adventure capital! Jump from 83 meters, the highest bungee platform in India, over the stunning Himalayan foothills and the Ganges River. Feel the ultimate thrill and free fall sensation, guided by certified professionals ensuring maximum safety and excitement. Perfect for adventure enthusiasts looking to conquer their fears!',
    price: '₹5,000',
    discountedPrice: '₹4,500',
    itinerary: ['Day 1: Arrival', 'Day 2: base camp, briefing, and warm-up session', 'Day 3: Early morning trek to the peak, enjoy panoramic views.', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Manas',
        rating: 5,
        type: 'Couple',
        title: 'Heart-Pounding Experience!',
        comment: ' Bungee jumping in Rishikesh was the most thrilling thing I’ve ever done! The free fall was insane, and the view was breathtaking. A must-try for adventure seekers!',
        date: '23 otc 2024',
        images: []
      }
    ]
  }

};

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const data = mockTourData[id];
        if (!data) {
          throw new Error('Tour not found');
        }
        setTour(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTourDetails();
  }, [id]);

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentImage('');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const handleBookNowClick = () => {
    navigate('/payment'); // Navigate to the payment page
  };

  return (
    <div className="tour-details-container">
      <h1 className="tour-title">{tour.name}</h1>
      <div className="tour-images">
        {tour.images.map((image, index) => (
          <img key={index} src={image} alt={`${tour.name} ${index + 1}`} className="tour-image" onClick={() => handleImageClick(image)} />
        ))}
      </div>
      <section className="tour-section">
        <h2>About</h2>
        <p>{tour.description}</p>
      </section>
      <section className="tour-section">
        <h2>Price</h2>
        <p>Starting from <span className="original-price">{tour.price}</span> <span className="discounted-price">{tour.discountedPrice}/person</span></p>
      </section>
      <section className="tour-section">
        <h2>Itinerary</h2>
        <ul>{tour.itinerary.map((item, index) => <li key={index}>{item}</li>)}</ul>
      </section>
      <section className="tour-section">
        <h2>Reviews</h2>
        <div className="reviews-container">
          {tour.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h3>{review.title}</h3>
              <p>{review.comment}</p>
              <p>Written on {review.date}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="tour-section">
        <h2>Booking Information</h2>
        <button className="book-now-button" onClick={handleBookNowClick}>Book Now</button>
      </section>

      {isModalOpen && (
        <div className="modal" onClick={handleModalClose}>
          <img src={currentImage} alt="Enlarged" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default TourDetails;