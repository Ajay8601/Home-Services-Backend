const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Import Routes
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors({
  origin: "https://home-services-frontend-9152.vercel.app/",
  credentials: true,
}));
app.use(express.json());

// ✅ MongoDB Connection Fix
mongoose.connect('mongodb://127.0.0.1:27017/Data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error:', err));

// ✅ Authentication Routes
app.use('/api/auth', authRoutes);

// ✅ Serve Static Images
app.use("/images", express.static(path.join(__dirname, "public/images"))); // Ensure 'public/images' exists

// ✅ Services Data
const services = [
  { img: "/images/PopulerServices/plumbing-service.jpg", alt: "Plumbing service", title: "Plumbing", description: "Expert plumbing services for all your needs." },
  { img: "/images/PopulerServices/electrician-service.avif", alt: "Electrical service", title: "Electrical", description: "Reliable electrical services for your home." },
  { img: "/images/PopulerServices/cleaning-service.jpeg", alt: "Cleaning service", title: "Cleaning", description: "Professional cleaning services for your home." },
  { img: "/images/PopulerServices/Appliance Repair Services.jpg", alt: "Appliance repair service", title: "Appliance Repair", description: "Efficient appliance repair services." },
  { img: "/images/PopulerServices/painting-service.jpg", alt: "Painting service", title: "Painting", description: "High-quality painting services for your home." },
  { img: "/images/PopulerServices/carpentry-service.jpg", alt: "Carpentry service", title: "Carpentry", description: "Expert carpentry services for your home." },
  { img: "/images/PopulerServices/cctv-installation.jpeg", alt: "Home security service", title: "Home Security", description: "Professional home security solutions." },
  { img: "/images/PopulerServices/ac-repaire.jpg", alt: "AC repair service", title: "AC and HVAC", description: "Reliable AC and HVAC services." },
  { img: "/images/PopulerServices/gardering.jpg", alt: "Gardening service", title: "Gardening", description: "Professional gardening and landscaping services." }
];

// ✅ Most Booked Services Data
const mostBookedServices = [
  { img: "/images/most-booked images/instence-bathroom-cleaner.webp", title: "Intense Bathroom Cleaning", rating: "4.5 (1.1M)", price: "₹499" },
  { img: "/images/most-booked images/bathroom.png", title: "Classic Bathroom Cleaning", rating: "4.8 (1.4M)", price: "₹399" },
  { img: "/images/most-booked images/fully-automatic-washing.webp", title: "Fully Automatic Washing Machine", rating: "4.2 (249K)", price: "₹149" },
  { img: "/images/most-booked images/Sofa cleaning.webp", title: "Sofa Cleaning", rating: "4.1 (400K)", price: "₹499" },
  { img: "/images/most-booked images/Haircut.webp", title: "Haircut for Men", rating: "4.5 (309K)", price: "₹249" },
  { img: "/images/most-booked images/glow-facials.webp", title: "Instant Glow Facials", rating: "4.5 (149K)", price: "₹799" },
  { img: "/images/most-booked images/Deluxe Peicure.webp", title: "Deluxe Pedicure", rating: "4.55 (258K)", price: "₹549" },
  { img: "/images/most-booked images/Elysian firming wine.webp", title: "Elysian Firming Wine Glow Facial", rating: "4.28 (126K)", price: "₹999" }
];

// ✅ API Routes
app.get("/api/services", (req, res) => res.json(services));
app.get("/api/most-booked-services", (req, res) => res.json(mostBookedServices));
app.get("/api/serviceprovider", (req,res) => res.json(authRoutes));

// ✅ Start Server
app.listen(process.env.PORT, () => console.log(`✅ Server running at http://localhost:${process.env.PORT}`));
