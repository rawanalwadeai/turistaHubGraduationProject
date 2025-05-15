import carImg01 from "../images/car-img01.jpg";
import carImg02 from "../images/car-img02.jpg";
import carImg03 from "../images/car-img03.jpg";
import carImg04 from "../images/car-img04.jpg";
import carImg05 from "../images/car-img05.jpg";
import carImg06 from "../images/car-img06.jpg";
import carImg07 from "../images/car-img07.jpg";

const cars = [
  {
    id: "01",
    title: "Toyota Corolla 2021",
    address: "Istanbul",
    model: "Corolla",
    year: 2021,
    price: 150,
    type: "Sedan",
    desc: "Reliable and fuel-efficient for city rides.",
    avgRating: 4.7,
    reviews: [
      { name: "John Doe", rating: 4.7 },
    ],
    photo: carImg01,
  },
  {
    id: "02",
    title: "Ford Mustang GT 2020",
    address: "Istanbul",
    model: "Mustang GT",
    year: 2020,
    price: 550,
    type: "Sports",
    desc: "Powerful sports car with sleek design.",
    avgRating: 4.9,
    reviews: [
      { name: "Jane Doe", rating: 4.9 },
    ],
    photo: carImg02,
  },
  {
    id: "03",
    title: "Hyundai Elantra 2022",
    address: "Istanbul",
    model: "Elantra",
    year: 2022,
    price: 180,
    type: "Sedan",
    desc: "Modern, comfortable, and efficient.",
    avgRating: 4.6,
    reviews: [],
    photo: carImg03,
    
  },
  {
    id: "04",
    title: "Jeep Wrangler 2019",
    address: "Istanbul",
    model: "Wrangler",
    year: 2019,
    price: 400,
    type: "SUV",
    desc: "Perfect for off-road adventures.",
    avgRating: 4.8,
    reviews: [
      { name: "Ali", rating: 4.8 },
    ],
    photo: carImg04,
  },
  {
    id: "05",
    title: "Kia Sportage 2021",
    address: "Istanbul",
    model: "Sportage",
    year: 2021,
    price: 250,
    type: "SUV",
    desc: "Spacious and family-friendly.",
    avgRating: 4.5,
    reviews: [
      { name: "Sarah", rating: 4.5 },
    ],
    photo: carImg05,
    
  },
  {
    id: "06",
    title: "Mercedes-Benz C-Class 2022",
    address: "Istanbul",
    model: "C-Class",
    year: 2022,
    price: 700,
    type: "Luxury",
    desc: "Luxury and performance combined.",
    avgRating: 4.9,
    reviews: [
      { name: "Mike", rating: 5.0 },
    ],
    photo: carImg06,
  },
  {
    id: "07",
    title: "Tesla Model 3 2023",
    address: "Istanbul",
    model: "Model 3",
    year: 2023,
    price: 600,
    type: "Electric",
    desc: "Eco-friendly with cutting-edge tech.",
    avgRating: 4.8,
    reviews: [
      { name: "Lina", rating: 4.7 },
    ],
    photo: carImg07,
    
  },
];

export default cars;
