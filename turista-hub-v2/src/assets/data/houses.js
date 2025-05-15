import houseImg01 from "../images/house-img01.jpg";
import houseImg02 from "../images/house-img02.jpg";
import houseImg03 from "../images/house-img03.jpg";
import houseImg04 from "../images/house-img04.jpg";
import houseImg05 from "../images/house-img05.jpg";
import houseImg06 from "../images/house-img06.jpg";
import houseImg07 from "../images/house-img07.jpg";

const houses = [
  {
    id: "01",
    title: "Apartment with Bosphorus View",
    city: "Istanbul",
    location: "Sariyer",
    address: "123 Queen Street",
    price: 120,
    bedrooms: 3,
    bathrooms: 2,
    area: "120 m²",
    type: "Apartment",
    maxGroupSize: 4,
    desc: "Modern and bright apartment with a stunning Bosphorus view, located in an upscale area close to transportation and cafes.",
    reviews: [
      {
        name: "Alice Smith",
        rating: 4.8,
      },
    ],
    avgRating: 4.8,
    photo: houseImg01,
    
  },
  {
    id: "02",
    title: "Luxury Villa with Private Pool",
    city: "Ankara",
    location: "Kirazli",
    address: "Sunset Road, Kirazli",
    price: 150,
    bedrooms: 5,
    bathrooms: 4,
    area: "250 m²",
    type: "Villa",
    maxGroupSize: 6,
    desc: "Spacious villa featuring a private pool and garden, perfect for families seeking peace and privacy in a quiet neighborhood.",
    reviews: [
      {
        name: "John Doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.6,
    photo: houseImg02,
    
  },
  {
    id: "03",
    title: "Mountain House with Scenic Views",
    city: "Istanbul",
    location: "Taksim",
    address: "Hilltop Viewpoint",
    price: 90,
    bedrooms: 2,
    bathrooms: 1,
    area: "80 m²",
    type: "Mountain House",
    maxGroupSize: 5,
    desc: "Peaceful mountain house located near Taksim, offering fresh air and stunning natural surroundings.",
    reviews: [],
    avgRating: 0,
    photo: houseImg03,
    
  },
  {
    id: "04",
    title: "Cozy Cottage by the Sea",
    city: "Istanbul",
    location: "Atakent",
    address: "Beachside Lane",
    price: 110,
    bedrooms: 2,
    bathrooms: 1,
    area: "95 m²",
    type: "Cottage",
    maxGroupSize: 4,
    desc: "Charming seaside cottage perfect for couples or small families, located steps away from Atakent Beach.",
    reviews: [
      {
        name: "Liam Brown",
        rating: 4.7,
      },
    ],
    avgRating: 4.7,
    photo: houseImg06,
    
  },
  {
    id: "05",
    title: "Eco Cabin in Sapanca Forest",
    city: "Sapanca",
    location: "Nature Park",
    address: "Jungle Trail",
    price: 95,
    bedrooms: 1,
    bathrooms: 1,
    area: "60 m²",
    type: "Eco Cabin",
    maxGroupSize: 3,
    desc: "Sustainable eco-friendly cabin surrounded by lush forests in the heart of Sapanca, ideal for nature lovers.",
    reviews: [
      {
        name: "Emily Johnson",
        rating: 4.9,
      },
    ],
    avgRating: 4.9,
    photo: houseImg04,
    
  },
  {
    id: "06",
    title: "Traditional House in Cherry Garden",
    city: "Sapanca",
    location: "Cherry Garden",
    address: "Sakura Street",
    price: 130,
    bedrooms: 1,
    bathrooms: 1,
    area: "70 m²",
    type: "Traditional House",
    maxGroupSize: 2,
    desc: "Beautiful traditional Turkish house surrounded by cherry trees, perfect for a peaceful getaway in Sapanca.",
    reviews: [
      {
        name: "Kenji Tanaka",
        rating: 4.8,
      },
    ],
    avgRating: 4.8,
    photo: houseImg05,
    
  },
  {
    id: "07",
    title: "Charming Stone House ",
    city: "Antalya",
    location: "(Kaleiçi)",
    address: "Rue de Provence",
    price: 140,
    bedrooms: 3,
    bathrooms: 2,
    area: "110 m²",
    type: "Stone House",
    maxGroupSize: 4,
    desc: "Historic stone house located in the heart of Antalya's Old Town, close to historical sites, cafes, and the marina.",
    reviews: [
      {
        name: "Marie Dupont",
        rating: 4.5,
      },
    ],
    avgRating: 4.5,
    photo: houseImg07,
    
  },
];

export default houses;
