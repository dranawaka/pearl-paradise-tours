import { useEffect, useMemo, useState } from "react";
import heroSlide1 from "../images/hero-slide-1.jpg";
import heroSlide2 from "../images/hero-slide-2.jpg";
import heroSlide3 from "../images/hero-slide-3.jpg";

const heroSlides = [
  {
    image: heroSlide1,
    title: "Your Gateway to Paradise",
    subtitle: "Golden beaches, ancient temples & wild heart",
  },
  {
    image: heroSlide2,
    title: "Designed Just for You",
    subtitle: "Adventures for every traveller - culture, wildlife & relaxation",
  },
  {
    image: heroSlide3,
    title: "Let's Make Your Best Trip",
    subtitle: "Unforgettable experiences with Pearl Paradise Tours",
  },
];

const dayTourDurations = [
  { days: "1", label: "Day Tour", listings: "5 Listings" },
  { days: "2", label: "Days Tour", listings: "3 Listings" },
  { days: "3", label: "Days Tour", listings: "7 Listings" },
  { days: "5", label: "Days Tour", listings: "2 Listings" },
  { days: "6", label: "Days Tour", listings: "2 Listings" },
  { days: "7", label: "Days Tour", listings: "2 Listings" },
  { days: "8", label: "Days Tour", listings: "2 Listings" },
];

const services = [
  "Airport Pickups & Airport Drops",
  "Private & Family Tour Arrangements",
  "Group Tour Arrangements",
  "Scooter & Tuk Tuk Rental",
  "Hotel Bookings",
  "Train Ticket Bookings",
  "Wildlife Safari & Camping Bookings",
  "Traditional & Western Wedding Planning",
];

const testimonials = [
  {
    quote:
      "Everything was arranged for us - hotels, train tickets, and day tours. Our driver was friendly, the itinerary was smooth, and we enjoyed every moment. Pearl Paradise Tours made our trip unforgettable.",
    author: "Emma & Daniel",
    country: "UK",
  },
  {
    quote:
      "We wanted a mix of culture, beaches, and wildlife. The team created a tailor-made plan that fit our family perfectly, even with small kids. Highly professional and always available.",
    author: "The Rodriguez Family",
    country: "Spain",
  },
  {
    quote:
      "Well-maintained tuk-tuk and help with routes and permits. It was the most fun way to explore the island. Excellent service and quick communication.",
    author: "Jonas H.",
    country: "Germany",
  },
];

const faqs = [
  {
    q: "Why choose Pearl Paradise Tours?",
    a: "We create fully personalized tours around your interests - culture, beach, wildlife, adventure, or honeymoon. No fixed templates, just authentic local experiences.",
  },
  {
    q: "How do I book or enquire?",
    a: "Use the contact form below or click \"Enquire Now\". Share your travel dates and preferences, and we'll send you a custom itinerary within 24 hours.",
  },
  {
    q: "Are your tours suitable for families?",
    a: "Yes - we welcome infants, children, and adults. We tailor activities, pacing, and accommodation to suit your family's comfort.",
  },
  {
    q: "Do you offer airport transfers and other services?",
    a: "Absolutely. We arrange airport pick-ups & drops, private transport, hotel bookings, train tickets, wildlife safaris, cooking classes, tuk-tuk & scooter rentals, and more.",
  },
  {
    q: "Can I customize my itinerary?",
    a: "Yes! We specialize in tailor-made travel. Whether you want culture, adventure, relaxation, or a mix, we design the journey exactly the way you want.",
  },
];

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({
    itineraries: false,
    hire: false,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("Send Enquiry");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");

  const galleryImages = useMemo(() => {
    const loadedImages = import.meta.glob("../photo_gallery/*.{jpg,jpeg,png,webp}", {
      eager: true,
      import: "default",
    });

    const toNumber = (path) => {
      const filename = path.split("/").pop() || "";
      const value = Number(filename.split(".")[0]);
      return Number.isNaN(value) ? Number.MAX_SAFE_INTEGER : value;
    };

    return Object.values(loadedImages)
      .map((src) => String(src))
      .sort((a, b) => {
        const aPath = Object.keys(loadedImages).find((key) => loadedImages[key] === a) || "";
        const bPath = Object.keys(loadedImages).find((key) => loadedImages[key] === b) || "";
        return toNumber(aPath) - toNumber(bPath);
      });
  }, []);

  useEffect(() => {
    if (isHeroPaused) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isHeroPaused]);

  useEffect(() => {
    if (!lightboxSrc) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxSrc]);

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") {
        setLightboxSrc("");
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const goToSlide = (index) => {
    if (index < 0) {
      setCurrentSlide(heroSlides.length - 1);
      return;
    }
    if (index >= heroSlides.length) {
      setCurrentSlide(0);
      return;
    }
    setCurrentSlide(index);
  };

  const toggleDropdown = (event, key) => {
    if (window.innerWidth > 900) {
      return;
    }
    event.preventDefault();
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSubmitMessage("Thank you! We'll be in touch.");
    setIsSubmitted(true);

    window.setTimeout(() => {
      setSubmitMessage("Send Enquiry");
      setIsSubmitted(false);
    }, 3000);
  };

  const closeNav = () => setIsNavOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="logo">
            Pearl Paradise Tours
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`main-nav ${isNavOpen ? "is-open" : ""}`}>
            <ul>
              <li>
                <a href="#home" onClick={closeNav}>
                  Home
                </a>
              </li>
              <li className={`has-dropdown ${openDropdowns.itineraries ? "is-open" : ""}`}>
                <a href="#itineraries" onClick={(event) => toggleDropdown(event, "itineraries")}>
                  Itineraries
                </a>
                <ul className="dropdown">
                  <li>
                    <a href="#3-days" onClick={closeNav}>
                      3 Days South Coast
                    </a>
                  </li>
                  <li>
                    <a href="#5-days" onClick={closeNav}>
                      5 Days Elephant & Cultural
                    </a>
                  </li>
                  <li>
                    <a href="#7-days" onClick={closeNav}>
                      7 Days Honeymoon
                    </a>
                  </li>
                  <li>
                    <a href="#8-days" onClick={closeNav}>
                      8 Days Island Tour
                    </a>
                  </li>
                  <li>
                    <a href="#safari" onClick={closeNav}>
                      Safari & Camping
                    </a>
                  </li>
                </ul>
              </li>
              <li className={`has-dropdown ${openDropdowns.hire ? "is-open" : ""}`}>
                <a href="#hire" onClick={(event) => toggleDropdown(event, "hire")}>
                  Self Drive Hire
                </a>
                <ul className="dropdown">
                  <li>
                    <a href="#scooter" onClick={closeNav}>
                      Scooter
                    </a>
                  </li>
                  <li>
                    <a href="#tuktuk" onClick={closeNav}>
                      Tuk-Tuk
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#about-us" onClick={closeNav}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={closeNav}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeNav}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="hero"
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
        >
          <div className="hero-slider">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.title}
                className={`hero-slide ${index === currentSlide ? "active" : ""}`}
                style={{ backgroundImage: `url('${slide.image}')` }}
              >
                <div className="hero-overlay" />
                <div className="hero-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <div className="hero-cta">
                    <a href="#itineraries" className="btn btn-primary">
                      Explore Tours
                    </a>
                    <a href="#contact" className="btn btn-outline">
                      Enquire Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hero-dots">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`dot ${index === currentSlide ? "active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button className="hero-prev" aria-label="Previous slide" onClick={() => goToSlide(currentSlide - 1)}>
            {"\u2039"}
          </button>
          <button className="hero-next" aria-label="Next slide" onClick={() => goToSlide(currentSlide + 1)}>
            {"\u203a"}
          </button>
        </section>

        <section className="section intro-section">
          <div className="container">
            <h2 className="section-title">Explore the Pearl of the Indian Ocean</h2>
            <div className="intro-content">
              <p>
                Sri Lanka is a breathtaking island of golden beaches, lush tea plantations, ancient temples, vibrant
                wildlife, and rich culture. From Sigiriya Rock Fortress and the sacred city of Kandy to hill towns
                like Ella and Nuwara Eliya, every corner promises a unique experience.
              </p>
              <p>
                Enjoy wildlife safaris in Yala and Udawalawe, relax on beaches in Mirissa and Bentota, explore UNESCO
                sites, and savor authentic Sri Lankan cuisine. We offer customized tour packages tailored to your
                budget, interests, and dates - whether a luxury honeymoon, cultural discovery, wildlife adventure, or
                beach holiday.
              </p>
            </div>
          </div>
        </section>

        <section className="section tour-duration">
          <div className="container">
            <h2 className="section-title">Sri Lanka Day Tours</h2>
            <div className="duration-grid">
              {dayTourDurations.map((tour) => (
                <a key={`${tour.days}-${tour.label}`} href="#contact" className="duration-card">
                  <span className="num">{tour.days}</span>
                  {tour.label} <small>{tour.listings}</small>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section cookery">
          <div className="container">
            <h2 className="section-title">Sri Lankan Cookery Classes</h2>
            <p className="section-subtitle">
              Curious to learn Sri Lankan cuisine? Join a traditional mother in her home kitchen for an authentic
              cooking lesson.
            </p>
            <p>Available in: Negombo, Kandy, Tissamaharama, Yala, Ella, Habarana or Sigiriya</p>
            <a href="#contact" className="btn btn-primary">
              Learn More
            </a>
          </div>
        </section>

        <section className="section rentals">
          <div className="container">
            <h2 className="section-title">Your Perfect Sri Lankan Getaway Awaits</h2>
            <p className="section-subtitle">Explore, Experience, and Enjoy with Us</p>
            <div className="rental-cards">
              <div className="rental-card">
                <div className="rental-icon">🛵</div>
                <h3>Scooter Rental</h3>
                <p className="price">€10</p>
                <a href="#contact" className="btn btn-outline">
                  Book Now
                </a>
              </div>
              <div className="rental-card">
                <div className="rental-icon">🛺</div>
                <h3>Tuk Tuk Rental</h3>
                <p className="price">€20</p>
                <a href="#contact" className="btn btn-outline">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section services">
          <div className="container">
            <h2 className="section-title">Our Services</h2>
            <ul className="services-list">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="container">
            <h2 className="section-title">Photo Gallery</h2>
            <p className="section-subtitle">Moments from Sri Lanka - beaches, wildlife, culture & more</p>
            <div className="gallery-grid" role="list">
              {galleryImages.map((src, index) => (
                <button
                  key={src}
                  className="gallery-item"
                  type="button"
                  role="listitem"
                  onClick={() => setLightboxSrc(src)}
                >
                  <img src={src} alt={`Gallery image ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <div
            className="gallery-lightbox"
            id="gallery-lightbox"
            aria-hidden={lightboxSrc ? "false" : "true"}
            hidden={!lightboxSrc}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setLightboxSrc("");
              }
            }}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              aria-label="Close"
              onClick={() => setLightboxSrc("")}
            >
              {"\u00d7"}
            </button>
            <img src={lightboxSrc} alt="Gallery view" className="gallery-lightbox-img" />
          </div>
        </section>

        <section className="section testimonials">
          <div className="container">
            <h2 className="section-title">What Clients Say About Us</h2>
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <blockquote className="testimonial-card" key={item.author}>
                  <p>{item.quote}</p>
                  <footer>
                    <strong>{item.author}</strong>, {item.country}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <h2 className="section-title">Contact Us</h2>
            <div className="contact-grid">
              <div className="contact-info">
                <p>
                  <strong>Pearl Paradise Tours</strong>
                </p>
                <p>Your gateway to the Pearl of the Indian Ocean.</p>
                <p>
                  We take care of all details for your visit - whether you're a solo traveller, a couple on holiday or
                  honeymoon, or a group seeking activity or wellness. Whatever your interest: culture, trekking,
                  wildlife, scenic tours, tropical cuisine or Ayurveda - we design the perfect journey.
                </p>
                <ul className="contact-details">
                  <li>📞 +94 (0) 77 778 8577</li>
                  <li>✉️ info@pearlparadisetours.com</li>
                  <li>📍 Negombo, Sri Lanka</li>
                </ul>
              </div>
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="dates">Travel dates / preferences</label>
                <textarea id="dates" name="dates" rows="4" />
                <button type="submit" className="btn btn-primary" disabled={isSubmitted}>
                  {submitMessage}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="logo">
                Pearl Paradise Tours
              </a>
              <p>Since 2012 - excellent service, 100% recommended.</p>
            </div>
            <div className="footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about-us">About</a>
                </li>
                <li>
                  <a href="#itineraries">Itineraries</a>
                </li>
                <li>
                  <a href="#gallery">Gallery</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact</h4>
              <p>+94 (0) 77 123 4567</p>
              <p>info@pearlparadisetours.com</p>
              <p>Negombo, Sri Lanka</p>
            </div>
          </div>
          <p className="footer-copy">© 2025 Pearl Paradise Tours. All Rights Reserved.</p>
          <p className="footer-copy">Powered by Dilan H. Ranawaka</p>
        </div>
      </footer>
    </>
  );
}

export default App;
