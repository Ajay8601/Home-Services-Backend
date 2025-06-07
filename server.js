const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["https://home-services-frontend-tau.vercel.app", "http://localhost:5173"], // ✅ no trailing slash
  credentials: true,
}));
app.use(express.json());

// ✅ MongoDB Connection (Production-safe)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Serve Static Images from "public/images"
app.use("/images", express.static(path.join(__dirname, "public/images")));

// ✅ Sample Static Data
const services = [
  { img: "https://home-services-backend-five.vercel.app/images/PopulerServices/plumbing-service.jpg", alt: "Plumbing service", title: "Plumbing", description: "Expert plumbing services for all your needs." },
  { img: "/images/PopulerServices/electrician-service.avif", alt: "Electrical service", title: "Electrical", description: "Reliable electrical services for your home." },
  { img: "/images/PopulerServices/cleaning-service.jpeg", alt: "Cleaning service", title: "Cleaning", description: "Professional cleaning services for your home." },
  { img: "/images/PopulerServices/Appliance Repair Services.jpg", alt: "Appliance repair service", title: "Appliance Repair", description: "Efficient appliance repair services." },
  { img: "/images/PopulerServices/painting-service.jpg", alt: "Painting service", title: "Painting", description: "High-quality painting services for your home." },
  { img: "/images/PopulerServices/carpentry-service.jpg", alt: "Carpentry service", title: "Carpentry", description: "Expert carpentry services for your home." },
  { img: "/images/PopulerServices/cctv-installation.jpeg", alt: "Home security service", title: "Home Security", description: "Professional home security solutions." },
  { img: "/images/PopulerServices/ac-repaire.jpg", alt: "AC repair service", title: "AC and HVAC", description: "Reliable AC and HVAC services." },
  { img: "/images/PopulerServices/gardering.jpg", alt: "Gardening service", title: "Gardening", description: "Professional gardening and landscaping services." }
];

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

// ✅ Sample Route
app.get("/", (req, res) => {
  res.send("API running ✅");
});

// ✅ Mount Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Fix /api/serviceprovider route if needed
// If authRoutes has a GET for /api/auth/serviceprovider, don't need this line
app.get("/api/serviceprovider", (req, res) => res.json(authRoutes));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
