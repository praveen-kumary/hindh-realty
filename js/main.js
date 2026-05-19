document.addEventListener('DOMContentLoaded', () => {
  // ── Sticky Header ──
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── Mobile Menu Toggle ──
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileBtn.textContent = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileBtn.textContent = '☰';
        document.body.style.overflow = '';
      });
    });
  }

  // ── Reveal Animations ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ── Enquire Drawer (left-slide) + Legacy Modal fallback ──
  const floatingBtn = document.getElementById('floatingContactBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawer = document.getElementById('enquireDrawer');
  const drawerClose = document.getElementById('drawerCloseBtn');
  // Legacy modal fallback
  const modalOverlay = document.getElementById('contactModalOverlay');
  const modalContent = document.querySelector('.modal-content');
  const modalClose = document.getElementById('modalCloseBtn');
  const enquiryBtns = document.querySelectorAll('.enquire-btn');

  function openDrawer() {
    if (drawer && drawerBackdrop) {
      drawer.classList.add('active');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else if (modalOverlay && modalContent) {
      modalOverlay.classList.add('active');
      modalContent.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && drawerBackdrop) {
      drawer.classList.remove('active');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (modalOverlay && modalContent) {
      modalOverlay.classList.remove('active');
      modalContent.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (floatingBtn) floatingBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  if (modalClose) modalClose.addEventListener('click', closeDrawer);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeDrawer(); });

  enquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  // ── Form Submission ──
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '✓ Sent Successfully!';
        btn.style.background = '#4CAF50';
        setTimeout(() => {
          closeDrawer();
          form.reset();
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 2000);
      }, 1500);
    });
  });

  // ═════════════════════════════════════════════
  // PROJECT FILTER (projects.html)
  // ═════════════════════════════════════════════
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.getElementById('projectsGrid');
  const filterCount = document.getElementById('filterCount');

  if (filterBtns.length && projectsGrid) {
    const allCards = Array.from(projectsGrid.querySelectorAll('.project-card'));
    const totalCount = allCards.length;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active state
        filterBtns.forEach(b => {
          b.classList.remove('active-filter');
          b.className = b.className.replace('btn-primary', 'btn-outline');
          b.style.color = 'var(--ink-soft)';
          b.style.borderColor = 'rgba(0,0,0,0.15)';
        });
        btn.classList.add('active-filter');
        btn.className = btn.className.replace('btn-outline', 'btn-primary');
        btn.style.color = '';
        btn.style.borderColor = '';

        // Filter cards
        let visibleCount = 0;
        allCards.forEach(card => {
          const status = card.dataset.status;
          const show = filter === 'All' || status === filter;
          card.style.display = show ? '' : 'none';
          if (show) visibleCount++;
        });

        if (filterCount) {
          filterCount.textContent = `Showing ${visibleCount} of ${totalCount} projects`;
        }
      });
    });
  }

  // ═════════════════════════════════════════════
  // PROJECT DETAIL (project-detail.html)
  // ═════════════════════════════════════════════
  const PROJECTS = [
    {
      slug: "north-city",
      title: "Hindh North City",
      tagline: "A landmark gated address in the heart of Devanahalli",
      location: "Devanahalli, North Bangalore",
      status: "Ongoing",
      image: "assets/proj-north-city.jpg",
      area: "10 Acres",
      plots: "400 Premium Plots",
      sizes: "1,200 – 2,400 Sq.Ft",
      price: "On Request",
      highlights: [
        "BIAAPA Approved & DC Converted",
        "10 Acres of Master-planned Living",
        "8 km from Kempegowda International Airport",
        "All Major Bank Loans Pre-approved"
      ],
      description: [
        "Hindh North City is our flagship development in Devanahalli — North Bangalore's most coveted real estate corridor. Spread across 10 pristine acres with 400 thoughtfully planned premium residential plots, the community is engineered for the next generation of homeowners and investors.",
        "Every plot is BIAAPA approved, DC converted, and has clear marketable title — pre-cleared with India's leading banks for instant home-loan eligibility. Wide BT roads, underground utilities, landscaped parks and round-the-clock security make this a place to build a legacy, not just a house.",
        "Positioned moments away from Kempegowda International Airport, Embassy Manyata Tech Park's expansion zone and Devanahalli Business Park, every plot here is an asset that grows in value with every passing season."
      ],
      distances: [
        { label: "Kempegowda Int'l Airport", value: "8 km" },
        { label: "NH-44 / Bellary Road", value: "2 km" },
        { label: "Devanahalli Town", value: "3 km" },
        { label: "Manyata Tech Park", value: "38 km" }
      ],
      amenities: [
        "24/7 Gated Security",
        "Wide BT Roads & Avenue Plantation",
        "Underground Electricity & Water",
        "Stormwater & Sewage Network",
        "Landscaped Central Park",
        "Children's Play Area",
        "Jogging & Walking Track",
        "Clubhouse Plot Reserved"
      ],
      approvals: ["BIAAPA Approved", "DC Converted", "RERA Compliant", "Bank-loan Approved"],
      mapQuery: "Devanahalli, Bangalore",
      masterPlan: [
        { icon: '<path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4"/>', label: "Total Area", value: "10 Acres" },
        { icon: '<path d="M12 3v19M5 8l7-5 7 5M5 21h14"/>', label: "Green Space", value: "25%" },
        { icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', label: "Road Width", value: "40 ft" },
        { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', label: "Entry Gates", value: "2" }
      ],
      investmentHighlights: [
        { title: "Airport Proximity Premium", desc: "Just 8 km from Kempegowda International Airport — the #1 driver of land appreciation in North Bangalore over the past decade." },
        { title: "Infrastructure Boom Zone", desc: "Metro Phase-2, BIAL Aerospace SEZ, and the upcoming ITIR are all catalysing unprecedented growth in the Devanahalli micro-market." },
        { title: "Proven 3-5× Returns", desc: "Land near the airport has appreciated 3-5× over the past decade. North City sits at the epicentre of this growth corridor." }
      ],
      neighbourhood: [
        { cat: "Airport", name: "Kempegowda Int'l Airport", dist: "8 km" },
        { cat: "Tech", name: "Embassy Manyata Tech Park", dist: "38 km" },
        { cat: "Education", name: "Canadian International School", dist: "12 km" },
        { cat: "Health", name: "Akash Hospital Devanahalli", dist: "3 km" },
        { cat: "Shopping", name: "Devanahalli Market", dist: "3 km" },
        { cat: "Highway", name: "NH-44 / Bellary Road", dist: "2 km" }
      ]
    },
    {
      slug: "aero-city",
      title: "Hindh Aero City",
      tagline: "975 plots adjacent to Kempegowda International Airport",
      location: "Devanahalli, Bangalore",
      status: "Ongoing",
      image: "assets/proj-aero-city.jpg",
      area: "Master-planned Township",
      plots: "975 Premium Plots",
      sizes: "1,200 – 2,400 Sq.Ft",
      price: "On Request",
      highlights: [
        "5 km from Kempegowda Int'l Airport",
        "Adjacent to BIAL Aerospace Park",
        "BIAAPA Approved Township-scale Layout",
        "Engineered for Exceptional ROI"
      ],
      description: [
        "Hindh Aero City is one of the most ambitious plotted township developments in North Bangalore. With 975 premium plots inside a meticulously master-planned gated community, the project sits at the doorstep of India's fastest-growing aerospace and aviation hub.",
        "Designed for investors and end-users alike, every plot benefits from proximity to the Kempegowda International Airport, the BIAL Aerospace SEZ, and India's first dedicated Hardware Technology Park — all of which are catalysing unprecedented appreciation in the micro-market.",
        "From wide internal avenues to landscaped central greens and a planned clubhouse, Hindh Aero City sets a new benchmark for plotted living near the airport."
      ],
      distances: [
        { label: "Kempegowda Int'l Airport", value: "5 km" },
        { label: "BIAL Aerospace Park", value: "3 km" },
        { label: "Devanahalli Business Park", value: "5 km" },
        { label: "Hebbal Junction", value: "40 km" }
      ],
      amenities: [
        "24/7 Gated Security",
        "Avenue Plantation along Wide BT Roads",
        "Underground Utilities",
        "Central Landscape Park",
        "Clubhouse Plot",
        "Sports Zone",
        "Sewage Treatment Plant",
        "Solar Street Lighting"
      ],
      approvals: ["BIAAPA Approved", "DC Converted", "RERA Compliant", "Bank-loan Approved"],
      mapQuery: "Devanahalli Airport, Bangalore",
      masterPlan: [
        { icon: '<path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4"/>', label: "Total Plots", value: "975" },
        { icon: '<path d="M12 3v19M5 8l7-5 7 5M5 21h14"/>', label: "Green Space", value: "30%" },
        { icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', label: "Road Width", value: "40 ft" },
        { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', label: "Security", value: "24/7" }
      ],
      investmentHighlights: [
        { title: "Aerospace SEZ Neighbour", desc: "Adjacent to BIAL Aerospace Park — home to Boeing, Airbus, GE. Thousands of high-income professionals need housing nearby." },
        { title: "Township-Scale Vision", desc: "975 plots in one master-planned community means better infrastructure, higher build quality, and stronger community governance." },
        { title: "5 km Airport Access", desc: "At just 5 km from KIA, Aero City offers the kind of proximity that commands premium pricing and rapid appreciation." }
      ],
      neighbourhood: [
        { cat: "Airport", name: "Kempegowda Int'l Airport", dist: "5 km" },
        { cat: "Tech", name: "BIAL Aerospace Park", dist: "3 km" },
        { cat: "City", name: "Devanahalli Business Park", dist: "5 km" },
        { cat: "Education", name: "Devanahalli Public School", dist: "4 km" },
        { cat: "Health", name: "Columbia Asia Hospital", dist: "8 km" },
        { cat: "Shopping", name: "Devanahalli Town Centre", dist: "6 km" }
      ]
    },
    {
      slug: "garden-city",
      title: "Hindh Garden City",
      tagline: "A successfully delivered gated community in Doddaballapura",
      location: "Doddaballapura, Bangalore",
      status: "Completed",
      image: "assets/proj-garden-city.jpg",
      area: "Delivered Community",
      plots: "140 Plots — Sold Out",
      sizes: "1,200 – 2,000 Sq.Ft",
      price: "Sold Out",
      highlights: [
        "Successfully Delivered & Fully Sold",
        "Direct connectivity to Dabaspete–Hosur Highway",
        "BIAAPA Approved Gated Layout",
        "Showcase of On-time Delivery Track Record"
      ],
      description: [
        "Hindh Garden City stands as a proud milestone — a 140-plot premium gated community in Doddaballapura that we delivered exactly as promised, on schedule, with every approval and bank clearance in place.",
        "Today, families live in beautifully built homes inside Garden City — a testament to Hindh Group's reputation for delivering on every commitment. Garden City is one of the strongest references our company holds for new buyers.",
        "Strategically located with direct connectivity to the Dabaspete–Hosur Highway and the upcoming peripheral ring road, the project continues to appreciate steadily."
      ],
      distances: [
        { label: "Doddaballapura Town", value: "5 km" },
        { label: "Dabaspete Highway", value: "2 km" },
        { label: "Kempegowda Int'l Airport", value: "42 km" },
        { label: "Yelahanka", value: "18 km" }
      ],
      amenities: [
        "Gated Community",
        "BT Roads",
        "Underground Electricity",
        "Water Supply",
        "Landscaped Park",
        "Street Lighting",
        "Stormwater Drains",
        "24/7 Security"
      ],
      approvals: ["BIAAPA Approved", "DC Converted", "Bank-loan Approved"],
      mapQuery: "Doddaballapura, Bangalore",
      masterPlan: [
        { icon: '<path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4"/>', label: "Total Plots", value: "140" },
        { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>', label: "Status", value: "Sold Out" },
        { icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', label: "Road Width", value: "30 ft" },
        { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', label: "Security", value: "24/7" }
      ],
      investmentHighlights: [
        { title: "100% Delivered & Occupied", desc: "A fully sold-out, delivered project with happy families living on-site — the strongest proof point for any developer's reputation." },
        { title: "Peripheral Ring Road Access", desc: "Upcoming peripheral ring road connectivity will dramatically improve Doddaballapura's access to Bangalore's tech corridors." },
        { title: "Steady Appreciation", desc: "Garden City plots have appreciated steadily since handover, with values continuing to rise as infrastructure develops around the area." }
      ],
      neighbourhood: [
        { cat: "Town", name: "Doddaballapura Town", dist: "5 km" },
        { cat: "Highway", name: "Dabaspete-Hosur Highway", dist: "2 km" },
        { cat: "Airport", name: "KIA Airport", dist: "42 km" },
        { cat: "City", name: "Yelahanka", dist: "18 km" },
        { cat: "Health", name: "Doddaballapura Hospital", dist: "5 km" },
        { cat: "Education", name: "Town Public School", dist: "6 km" }
      ]
    },
    {
      slug: "paradise",
      title: "Hindh Paradise",
      tagline: "7 lush acres along NH-44 in Vijaypura",
      location: "Vijaypura, North Bangalore",
      status: "Completed",
      image: "assets/proj-paradise.jpg",
      area: "7 Acres",
      plots: "160 Plots — Delivered",
      sizes: "1,200 – 1,800 Sq.Ft",
      price: "Sold Out",
      highlights: [
        "All 160 plots successfully delivered",
        "Located along National Highway 44",
        "Lush 7-acre gated community lifestyle",
        "Strong appreciation since handover"
      ],
      description: [
        "Hindh Paradise is one of our most celebrated completed projects — 160 premium residential plots spread across 7 lush acres in Vijaypura, along National Highway 44.",
        "Families chose Paradise for the same reasons they choose every Hindh project: serene surroundings, world-class gated infrastructure, and complete legal clarity. Today, all plots are occupied and the community continues to flourish.",
        "Paradise's location along NH-44 means seamless connectivity to Bangalore, the airport, Hyderabad and beyond."
      ],
      distances: [
        { label: "Vijaypura Town", value: "1 km" },
        { label: "NH-44", value: "0.5 km" },
        { label: "Devanahalli", value: "12 km" },
        { label: "Kempegowda Int'l Airport", value: "34 km" }
      ],
      amenities: [
        "Gated Community",
        "Avenue Roads",
        "Park & Open Spaces",
        "Underground Utilities",
        "Street Lighting",
        "Boundary Walls",
        "24/7 Security",
        "Stormwater Drains"
      ],
      approvals: ["BIAAPA Approved", "DC Converted", "Bank-loan Approved"],
      mapQuery: "Vijaypura, Bangalore",
      masterPlan: [
        { icon: '<path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4"/>', label: "Total Area", value: "7 Acres" },
        { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>', label: "Total Plots", value: "160" },
        { icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', label: "Road Width", value: "30 ft" },
        { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', label: "Security", value: "24/7" }
      ],
      investmentHighlights: [
        { title: "NH-44 Highway Access", desc: "Located along National Highway 44, providing seamless connectivity to Bangalore, the airport, Hyderabad and beyond." },
        { title: "Fully Occupied Community", desc: "All 160 plots delivered and occupied — a thriving community that continues to appreciate in value every year." },
        { title: "Growing Micro-market", desc: "Vijaypura and surrounding areas are seeing steady infrastructure development, with new roads, schools, and commercial activity." }
      ],
      neighbourhood: [
        { cat: "Town", name: "Vijaypura Town", dist: "1 km" },
        { cat: "Highway", name: "NH-44", dist: "0.5 km" },
        { cat: "City", name: "Devanahalli", dist: "12 km" },
        { cat: "Airport", name: "KIA Airport", dist: "34 km" },
        { cat: "Health", name: "Vijaypura PHC", dist: "1 km" },
        { cat: "Education", name: "Vijaypura School", dist: "2 km" }
      ]
    },
    {
      slug: "sahana",
      title: "Hindh Sahana",
      tagline: "Pre-launch — register your interest today",
      location: "North Bangalore",
      status: "Pre-Launch",
      image: "assets/proj-sahana.jpg",
      area: "To Be Announced",
      plots: "To Be Announced",
      sizes: "To Be Announced",
      price: "Pre-Launch Pricing",
      highlights: [
        "Pre-Launch — Early Bird Pricing",
        "BIAAPA Approvals in Final Stage",
        "Limited Inventory — Priority for Registered Buyers",
        "North Bangalore Growth Corridor"
      ],
      description: [
        "Hindh Sahana is the next chapter from Hindh Group — a brand-new plotted community currently in the pre-launch phase in North Bangalore.",
        "Pre-launch buyers receive priority access to the best plots and our most competitive pricing of the year. Final layout, plot sizes and specifications are being shared first with buyers who register their interest.",
        "Register today to be the first to receive the launch brochure, master-plan, price list and site-visit invite."
      ],
      distances: [
        { label: "Kempegowda Int'l Airport", value: "TBD" },
        { label: "NH-44", value: "TBD" },
        { label: "Devanahalli", value: "TBD" },
        { label: "Hebbal", value: "TBD" }
      ],
      amenities: [
        "Master-planned Gated Layout",
        "Wide Avenue Roads",
        "Landscaped Central Park",
        "Underground Utilities",
        "Clubhouse Reserved",
        "Sports Plot",
        "Solar Street Lighting",
        "24/7 Security"
      ],
      approvals: ["BIAAPA Approval In-progress", "DC Conversion In-progress"],
      mapQuery: "North Bangalore",
      masterPlan: [
        { icon: '<path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4"/>', label: "Layout", value: "TBA" },
        { icon: '<path d="M12 3v19M5 8l7-5 7 5M5 21h14"/>', label: "Green Space", value: "30%+" },
        { icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', label: "Road Width", value: "40 ft" },
        { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', label: "Security", value: "24/7" }
      ],
      investmentHighlights: [
        { title: "Pre-Launch Pricing Advantage", desc: "Early-bird buyers get the best plots at launch pricing — typically 15-25% below post-launch market rates." },
        { title: "North Bangalore Growth Story", desc: "The corridor continues to see unprecedented infrastructure investment — metro, airport expansion, ITIR, aerospace SEZ." },
        { title: "Hindh's Track Record", desc: "With 6 successfully delivered projects and 2,800+ families, Hindh Group's pre-launch is backed by 12+ years of proven credibility." }
      ],
      neighbourhood: [
        { cat: "Airport", name: "Kempegowda Int'l Airport", dist: "TBD" },
        { cat: "Highway", name: "NH-44", dist: "TBD" },
        { cat: "City", name: "Devanahalli", dist: "TBD" },
        { cat: "Metro", name: "Hebbal Metro", dist: "TBD" },
        { cat: "Tech", name: "Manyata Tech Park", dist: "TBD" },
        { cat: "Education", name: "International Schools", dist: "TBD" }
      ]
    },
    {
      slug: "prakruthi",
      title: "Hindh Prakruthi",
      tagline: "A serene gated layout among the hills of Jangamakote",
      location: "Jangamakote, Karnataka",
      status: "Completed",
      image: "assets/proj-prakruthi.jpg",
      area: "Delivered Layout",
      plots: "Delivered & Sold",
      sizes: "1,200 – 2,400 Sq.Ft",
      price: "Sold Out",
      highlights: [
        "Successfully Delivered Premium Layout",
        "Surrounded by Hills & Greenery",
        "Premium Gated Community Standards",
        "Hindh's first regional success outside Bangalore"
      ],
      description: [
        "Hindh Prakruthi was one of the early projects that put Hindh Group on the map for premium plotted living beyond the immediate Bangalore region.",
        "Located in the scenic Jangamakote area, the project blends clean plotted living with abundant nature — surrounded by hills, fields and a peaceful village landscape.",
        "Now fully delivered and sold out, Prakruthi remains an enduring example of Hindh Group's commitment to delivering premium gated communities, regardless of location complexity."
      ],
      distances: [
        { label: "Jangamakote", value: "1 km" },
        { label: "Hoskote", value: "30 km" },
        { label: "Bangalore", value: "55 km" },
        { label: "Airport", value: "60 km" }
      ],
      amenities: [
        "Gated Layout",
        "BT Roads",
        "Boundary Walls",
        "Water Connection",
        "Electricity",
        "Park",
        "Street Lights",
        "Drainage"
      ],
      approvals: ["DC Converted", "Bank-loan Approved"],
      mapQuery: "Jangamakote, Karnataka",
      masterPlan: [
        { icon: '<path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4"/>', label: "Layout Area", value: "Delivered" },
        { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>', label: "Community", value: "Gated" },
        { icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', label: "Road Width", value: "30 ft" },
        { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', label: "Security", value: "24/7" }
      ],
      investmentHighlights: [
        { title: "Scenic Location Premium", desc: "Properties near hills and natural landscapes command higher premiums as urbanisation increases, making Prakruthi plots a rare asset class." },
        { title: "Fully Delivered & Proven", desc: "A completed project with families living on-site is the strongest proof of a developer's credibility — increasing resale confidence." },
        { title: "Bangalore Expansion Corridor", desc: "As Bangalore expands outward, previously distant locations are being brought into the city's growth orbit, lifting land values steadily." }
      ],
      neighbourhood: [
        { cat: "Town", name: "Jangamakote Town", dist: "1 km" },
        { cat: "City", name: "Hoskote", dist: "30 km" },
        { cat: "Metro", name: "Bangalore City", dist: "55 km" },
        { cat: "Transit", name: "KIA Airport", dist: "60 km" },
        { cat: "Health", name: "Local Health Centre", dist: "2 km" },
        { cat: "Market", name: "Jangamakote Market", dist: "1 km" }
      ]
    }
  ];

  // ── SVG icon map for neighbourhood categories ──
  const NEIGHBOURHOOD_ICONS = {
    Airport: '<path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3s-3-.5-4.5 1L13 7 4.8 5.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 11l-2 2-3-.5-.5.5 3 2 2 3 .5-.5-.5-3 2-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/>',
    Transit: '<path d="M8 6v6M15.182 4.217A3 3 0 0114 11h-1"/><path d="M6 2l.6 1.2a5 5 0 004.1 2.8h2.6a5 5 0 004.1-2.8L18 2"/><path d="M4 22V12a2 2 0 012-2h12a2 2 0 012 2v10"/><path d="M2 22h20"/><path d="M8 22v-3a2 2 0 012-2h4a2 2 0 012 2v3"/>',
    Tech: '<path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16"/>',
    Education: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/>',
    Health: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    Shopping: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12"/>',
    City: '<path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/>',
    Town: '<path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/>',
    Highway: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"/><path d="M2 12h20"/>',
    Market: '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/>',
    Metro: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 3v18"/><path d="M4 12h16"/>',
    default: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>'
  };

  // ── SVG icons for investment cards ──
  const INVEST_ICONS = [
    '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    '<path d="M2 20h20"/><path d="M5 20V4h4v16"/><path d="M15 20V8h4v12"/>'
  ];

  // ── Populate Project Detail Page ──
  const heroSection = document.getElementById('heroSection');
  if (heroSection && window.location.pathname.includes('project-detail')) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('project');
    const project = PROJECTS.find(p => p.slug === slug);

    if (!project) {
      heroSection.innerHTML = '<div class="container-wide" style="text-align: center; padding: 15rem 0 10rem;"><h1 class="font-display" style="font-size: 3rem; color: var(--cream); margin-bottom: 1rem;">Project not found</h1><a href="projects.html" style="color: var(--gold); text-decoration: underline;">Back to all projects</a></div>';
      return;
    }

    // Page title & meta
    document.getElementById('pageTitle').textContent = `${project.title} | ${project.location} | Hindh Group`;
    document.getElementById('pageDesc').content = `${project.title} — ${project.tagline}. ${project.plots}, ${project.area}. BIAAPA approved, DC converted gated community by Hindh Group in ${project.location}.`;

    // Hero
    document.getElementById('heroImg').src = project.image;
    document.getElementById('heroImg').alt = project.title;
    const statusEl = document.getElementById('heroStatus');
    statusEl.textContent = project.status;
    if (project.status === 'Completed') statusEl.classList.add('completed');
    if (project.status === 'Pre-Launch') statusEl.classList.add('pre-launch');
    document.getElementById('heroTitle').textContent = project.title;
    document.getElementById('heroLocationText').textContent = project.location;
    document.getElementById('heroTagline').textContent = project.tagline;

    // Stats
    const statsData = [
      { l: "Land Area", v: project.area },
      { l: "Total Plots", v: project.plots },
      { l: "Plot Sizes", v: project.sizes },
      { l: "Pricing", v: project.price }
    ];
    document.getElementById('heroStats').innerHTML = statsData.map(s =>
      `<div style="background: var(--ink); padding: 1.5rem;">
        <div style="font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem;">${s.l}</div>
        <div class="font-display" style="font-size: 1.25rem; color: var(--cream);">${s.v}</div>
      </div>`
    ).join('');

    // Overview
    document.getElementById('overviewText').innerHTML = project.description.map(p => `<p style="margin-bottom: 1.5rem;">${p}</p>`).join('');
    const overviewBtn = document.getElementById('overviewEnquireBtn');
    overviewBtn.textContent = `Enquire about ${project.title.replace('Hindh ', '')}`;

    // Highlights (with SVG checkmark icons)
    document.getElementById('highlightsGrid').innerHTML = project.highlights.map((h, i) =>
      `<div class="card reveal" style="transition-delay: ${i * 0.08}s; padding: 2rem;">
        <div class="icon-box" style="margin-bottom: 1.5rem;"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
        <p class="font-display" style="font-size: 1.25rem;">${h}</p>
      </div>`
    ).join('');

    // Master Plan
    if (project.masterPlan) {
      document.getElementById('masterPlanGrid').innerHTML = project.masterPlan.map((m, i) =>
        `<div class="master-plan-stat reveal" style="transition-delay: ${i * 0.08}s;">
          <div class="stat-icon"><svg viewBox="0 0 24 24">${m.icon}</svg></div>
          <div class="stat-value">${m.value}</div>
          <div class="stat-label">${m.label}</div>
        </div>`
      ).join('');
    }

    // Amenities
    document.getElementById('amenitiesList').innerHTML = project.amenities.map(a =>
      `<li style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--ink-soft);">
        <svg style="flex-shrink: 0; margin-top: 2px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg>
        ${a}
      </li>`
    ).join('');

    // Approvals
    document.getElementById('approvalsList').innerHTML = project.approvals.map(a =>
      `<li style="display: flex; align-items: center; gap: 12px; font-size: 16px; color: rgba(253,252,248,0.85); margin-bottom: 1rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        ${a}
      </li>`
    ).join('');

    // Investment Highlights
    if (project.investmentHighlights) {
      document.getElementById('investmentGrid').innerHTML = project.investmentHighlights.map((inv, i) =>
        `<div class="invest-card reveal" style="transition-delay: ${i * 0.1}s;">
          <div class="icon-box" style="margin: 0 auto 1.5rem;"><svg viewBox="0 0 24 24">${INVEST_ICONS[i % 3]}</svg></div>
          <h3 class="font-display">${inv.title}</h3>
          <p>${inv.desc}</p>
        </div>`
      ).join('');
    }

    // Location subtitle
    document.getElementById('locationSubtitle').textContent = `${project.title} is positioned in ${project.location} — within minutes of every key destination that matters.`;

    // Distances
    document.getElementById('distancesList').innerHTML = project.distances.map((d, i) =>
      `<div class="reveal" style="transition-delay: ${i * 0.06}s; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.08); padding: 1.25rem 0;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style="font-size: 14px; color: var(--ink);">${d.label}</span>
        </div>
        <span class="font-display" style="font-size: 1.25rem; color: var(--gold-deep);">${d.value}</span>
      </div>`
    ).join('');

    // Map
    document.getElementById('projectMap').src = `https://www.google.com/maps?q=${encodeURIComponent(project.mapQuery)}&output=embed`;

    // Neighbourhood
    if (project.neighbourhood) {
      document.getElementById('neighbourhoodGrid').innerHTML = project.neighbourhood.map((n, i) => {
        const iconSvg = NEIGHBOURHOOD_ICONS[n.cat] || NEIGHBOURHOOD_ICONS.default;
        return `<div class="neighbour-card reveal" style="transition-delay: ${i * 0.05}s;">
          <div class="icon-box"><svg viewBox="0 0 24 24">${iconSvg}</svg></div>
          <div>
            <div class="category">${n.cat}</div>
            <h4>${n.name}</h4>
            <div class="distance">${n.dist}</div>
          </div>
        </div>`;
      }).join('');
    }

    // Gallery title
    document.getElementById('galleryTitle').innerHTML = `A glimpse into <em class="italic text-gold-deep">${project.title}.</em>`;

    // Gallery grid
    const galleryImgs = [project.image, 'assets/gallery-1.jpg', 'assets/gallery-2.jpg', 'assets/gallery-3.jpg', 'assets/gallery-4.jpg'];
    document.getElementById('galleryGrid').innerHTML = galleryImgs.map((src, i) =>
      `<div class="reveal" style="transition-delay: ${i * 0.05}s; ${i === 0 ? 'grid-column: span 2; grid-row: span 2;' : ''}">
        <div style="aspect-ratio: 1; overflow: hidden; border-radius: var(--radius);">
          <img src="${src}" alt="${project.title} gallery image ${i + 1}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </div>
      </div>`
    ).join('');

    // CTA title
    document.getElementById('ctaTitle').innerHTML = `Ready to walk <em class="italic" style="font-weight: normal;">${project.title}?</em>`;

    // Other projects
    const others = PROJECTS.filter(p => p.slug !== slug).slice(0, 3);
    document.getElementById('otherProjectsGrid').innerHTML = others.map((o, i) => {
      const statusClass = o.status === 'Completed' ? 'completed' : o.status === 'Pre-Launch' ? 'pre-launch' : '';
      return `<a href="project-detail.html?project=${o.slug}" class="project-card reveal" style="transition-delay: ${i * 0.08}s;">
        <div class="project-img-wrapper">
          <img src="${o.image}" alt="${o.title}">
          <span class="project-status ${statusClass}">${o.status}</span>
        </div>
        <div class="project-info">
          <div class="project-location">${o.location}</div>
          <h3 class="project-title">${o.title}</h3>
          <p class="project-tagline">${o.tagline}</p>
          <div class="project-meta">
            <div style="display: flex; gap: 20px;"><span><strong class="text-ink">${o.plots.split(' ')[0]}</strong> plots</span></div>
            <span class="text-gold-deep" style="text-transform: uppercase; letter-spacing: 0.15em;">View ↗</span>
          </div>
        </div>
      </a>`;
    }).join('');

    // Pre-select project in modal dropdown
    const modalProject = document.getElementById('modal-project');
    if (modalProject) {
      const options = modalProject.querySelectorAll('option');
      options.forEach(opt => {
        if (opt.textContent === project.title) opt.selected = true;
      });
    }

    // Re-observe newly added reveal elements
    document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active)').forEach(el => revealObserver.observe(el));
  }
});

