import {
  ShoppingCart,
  GraduationCap,
  Microscope,
  Cpu,
  PenTool,
  LayoutTemplate,
} from "lucide-react";

export const STORE_PRODUCTS = [
  {
    id: "p1",
    name: "ESP32 Development Board",
    price: "₹ 450",
    category: "Development Boards",
    image:
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=600",
    description: "Powerful Wi-Fi + Bluetooth IoT module.",
    projectsUsingThis: ["proj1", "proj2"],
    relatedCourses: ["c1"],
    alsoBuy: ["p2", "p3"],
  },
  {
    id: "p2",
    name: '0.96" OLED Display NodeMCU',
    price: "₹ 250",
    category: "Displays",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "I2C OLED Display for rich UIs.",
    projectsUsingThis: ["proj1"],
    relatedCourses: [],
    alsoBuy: ["p1"],
  },
  {
    id: "p3",
    name: "DHT11 Temperature & Humidity Sensor",
    price: "₹ 120",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1580983574519-72c21dc5ab97?auto=format&fit=crop&q=80&w=600",
    description: "Basic environmental sensor.",
    projectsUsingThis: ["proj2"],
    relatedCourses: ["c1"],
    alsoBuy: ["p1"],
  },
  {
    id: "p4",
    name: "IoT Smart Agriculture Kit",
    price: "₹ 1,250",
    category: "Kits",
    image:
      "https://images.unsplash.com/photo-1574347781079-6799015bc2de?auto=format&fit=crop&q=80&w=600",
    description:
      "Complete kit for smart agriculture monitoring with ESP32 and soil sensors.",
    projectsUsingThis: ["proj1"],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p5",
    name: "Advanced Robotics Starter Kit",
    price: "₹ 2,450",
    category: "Kits",
    image:
      "https://images.unsplash.com/photo-1563207153-f404bef561b6?auto=format&fit=crop&q=80&w=600",
    description: "Everything you need to build your first autonomous robot.",
    projectsUsingThis: [],
    relatedCourses: ["c1"],
    alsoBuy: [],
  },
  // Sensors
  {
    id: "p6",
    name: "IR Sensor",
    price: "₹ 150",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Infrared sensor for obstacle detection.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p7",
    name: "LIDAR Sensor",
    price: "₹ 2500",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "High precision laser distance measurement.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p8",
    name: "GAS Sensors(MG)",
    price: "₹ 300",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Detect various gases.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p9",
    name: "Temperature Sensor",
    price: "₹ 200",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Measure ambient temperature accurate.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p10",
    name: "Motion Sensor",
    price: "₹ 250",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "PIR motion detection.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p11",
    name: "Proximity Sensors",
    price: "₹ 180",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Detect nearby objects without contact.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p12",
    name: "Load Cells",
    price: "₹ 400",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Measure weight and force.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p13",
    name: "Radars",
    price: "₹ 600",
    category: "Sensors",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Doppler radar sensors.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },

  // Development Boards
  {
    id: "p14",
    name: "Arduino",
    price: "₹ 500",
    category: "Development Boards",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Standard Arduino development board.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p15",
    name: "ESP8266",
    price: "₹ 300",
    category: "Development Boards",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "WiFi microchip with basic microcontroller.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p16",
    name: "ESP32",
    price: "₹ 450",
    category: "Development Boards",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Powerful WiFi + Bluetooth board.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p17",
    name: "STM32",
    price: "₹ 600",
    category: "Development Boards",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "32-bit ARM Cortex-M microcontroller.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p18",
    name: "Raspberry PI",
    price: "₹ 3500",
    category: "Development Boards",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Single board computer.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },

  // Modules
  {
    id: "p19",
    name: "Relay",
    price: "₹ 100",
    category: "Modules",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Electro-mechanical switch module.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p20",
    name: "GSM",
    price: "₹ 900",
    category: "Modules",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Cellular communication module.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p21",
    name: "GPS",
    price: "₹ 700",
    category: "Modules",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Global positioning system module.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p22",
    name: "Bluetooth",
    price: "₹ 250",
    category: "Modules",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Bluetooth communication.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p23",
    name: "WiFi",
    price: "₹ 300",
    category: "Modules",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "WiFi communication.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p24",
    name: "OLED",
    price: "₹ 200",
    category: "Modules",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Organic Light-Emitting Diode display.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p25",
    name: "LCD",
    price: "₹ 150",
    category: "Modules",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Liquid Crystal Display module.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p26",
    name: "Power Modules",
    price: "₹ 350",
    category: "Modules",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Voltage regulators and converters.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },

  // Robotics
  {
    id: "p27",
    name: "Development Kits",
    price: "₹ 1500",
    category: "Robotics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "General robotics development.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p28",
    name: "STEM Education Kits",
    price: "₹ 2000",
    category: "Robotics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Educational robot kits.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p29",
    name: "AI Kits",
    price: "₹ 4500",
    category: "Robotics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Kits containing edge AI components.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },

  // Drone Components
  {
    id: "p30",
    name: "BLDC Motors",
    price: "₹ 600",
    category: "Drone Components",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Brushless DC drone motors.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p31",
    name: "ESC",
    price: "₹ 500",
    category: "Drone Components",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Electronic Speed Controllers.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p32",
    name: "Flight Controllers",
    price: "₹ 1800",
    category: "Drone Components",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Drone flight stabilizing boards.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p33",
    name: "Frames & Accessories",
    price: "₹ 1000",
    category: "Drone Components",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Carbon fiber or plastic frames.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },

  // Kits
  {
    id: "p34",
    name: "BLDC Motors (Kits)",
    price: "₹ 2500",
    category: "Kits",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Combined motor kits.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p35",
    name: "ESC (Kits)",
    price: "₹ 1500",
    category: "Kits",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Multi-ESC packs.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p36",
    name: "Flight Controllers (Kits)",
    price: "₹ 3800",
    category: "Kits",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "FC + GPS combo kits.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
  {
    id: "p37",
    name: "Frames & Accessories (Kits)",
    price: "₹ 3000",
    category: "Kits",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "Full frame hardware kits.",
    projectsUsingThis: [],
    relatedCourses: [],
    alsoBuy: [],
  },
];

export const PROJECTS = [
  {
    id: "proj1",
    name: "Smart Home Automation Dashboard",
    category: "IoT Projects",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600",
    description: "Control home appliances via Wi-Fi and Web UI.",
    synopsis:
      "A centralized dashboard to monitor and control household appliances over Wi-Fi, featuring real-time status updates and scheduled automation using ESP32.",
    abstract:
      "This project demonstrates the implementation of a smart home architecture using an ESP32 microcontroller as the central hub. It explores IoT communication protocols like MQTT and HTTP to establish reliable two-way communication between the hardware edge nodes and a centralized web dashboard. The system allows users to remotely actuate relays to control high-voltage appliances while monitoring environmental conditions through connected sensors, ensuring both low-latency responses and energy efficiency.",
    componentsUsed: ["p1", "p2"],
    relatedCourses: ["c1"],
    isReadymade: true,
    price: "₹3500",
  },
  {
    id: "proj2",
    name: "AI Weather Station",
    price: "₹5500",
    category: "AI Projects",
    image:
      "https://images.unsplash.com/photo-156ca1eafaaa0-2c7da19de95f?auto=format&fit=crop&q=80&w=600",
    description: "Predict weather utilizing localized ML models on ESP32.",
    synopsis:
      "An edge AI device that collects local environmental data to run a lightweight machine learning model, predicting short-term weather anomalies in real-time.",
    abstract:
      "Conventional weather stations rely on cloud connectivity and generalized data for forecasting. This project introduces an Edge AI / TinyML approach, where a quantized neural network is deployed directly onto the ESP32. By continuously collecting data from the DHT11 and other atmospheric sensors, the on-device inference engine can predict localized anomalies (such as sudden rain or temperature drops) without internet dependency. This project covers data collection, model training in TensorFlow Lite for Microcontrollers, and deployment.",
    componentsUsed: ["p1", "p3"],
    relatedCourses: ["c1", "c2"],
    isReadymade: true,
  },
  {
    id: "proj3",
    name: "Plug & Play Smart Mirror",
    category: "Readymade Projects",
    image:
      "https://images.unsplash.com/photo-1610450949065-9f55c275df28?auto=format&fit=crop&q=80&w=600",
    description:
      "Fully assembled smart mirror showing time, weather, and news. Just plug it in.",
    synopsis:
      "A beautifully crafted two-way mirror integrating a hidden display to surface daily information like calendars, weather, and news unobtrusively.",
    abstract:
      "The Smart Mirror is a consumer-ready IoT product that blends smart home functionality with interior design. Powered by an internal microcontroller and a high-contrast OLED/LCD display hidden behind an acrylic two-way mirror, it retrieves localized data via APIs to display real-time widgets. Built with a sleek wooden frame and optimized for passive cooling, it serves as a non-intrusive smart hub for bedrooms, bathrooms, or entryways.",
    componentsUsed: ["p1", "p2"], // Represents internal components
    relatedCourses: [],
    isReadymade: true,
    price: "₹ 8,500",
  },
  {
    id: "proj4",
    name: "Ready-to-Fly Drone Kit Fully Assembled",
    category: "Readymade Projects",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b68904e3b?auto=format&fit=crop&q=80&w=600",
    description:
      "Pre-assembled structural drone with tuned PID controllers for immediate flight.",
    synopsis:
      "A fully calibrated, out-of-the-box quadcopter system featuring stabilized flight control, telemetry downlinks, and an ergonomic transmitter.",
    abstract:
      "This fully assembled quadcopter project abstracts away the complexities of drone calibration, component matching, and firmware flashing. Designed for immediate deployment, it features a rigorously tuned PID controller running on a standard flight controller architecture. The system includes integrated ESCs, brushless motors optimized for the frame's weight class, and a 6-axis gyroscope for stabilization. It is an ideal platform for researchers or hobbyists who want to bypass the build phase and focus directly on flight dynamics, aerial photography, or payload delivery.",
    componentsUsed: [],
    relatedCourses: [],
    isReadymade: true,
    price: "₹ 15,000",
  },
];

export const COURSES = [
  {
    id: "c1",
    name: "Mastering IoT with ESP32",
    duration: "4 Weeks",
    level: "Beginner to Intermediate",
    category: "Internet of Things (IoT)",
    image:
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=600",
    mentor: "Dr. A. Sharma",
    relatedProjects: ["proj1", "proj2"],
    relatedProducts: ["p1", "p3"],
  },
  {
    id: "c2",
    name: "Edge AI & TinyML Certification",
    duration: "8 Weeks",
    level: "Advanced",
    category: "Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=600",
    mentor: "Prof. R. Kumar",
    relatedProjects: ["proj2"],
    relatedProducts: ["p1"],
  },
  {
    id: "c3",
    name: "C/C++ Programming for Embedded Systems",
    duration: "6 Weeks",
    level: "Beginner",
    category: "Programming Foundations",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
    mentor: "Prof. S. Gupta",
    relatedProjects: [],
    relatedProducts: ["p14", "p16"],
  },
  {
    id: "c4",
    name: "Autonomous Drone Development",
    duration: "10 Weeks",
    level: "Advanced",
    category: "Robotics & Automation",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b68904e3b?auto=format&fit=crop&q=80&w=600",
    mentor: "Dr. V. Singh",
    relatedProjects: ["proj4"],
    relatedProducts: ["p32", "p30", "p31"],
  },
];

export const INTERNSHIPS = [
  {
    id: "int1",
    title: "Embedded Systems Intern",
    type: "On-Site / Remote",
    duration: "3-6 Months",
    requirements: "C/C++, Basic PCB Design, Microcontrollers",
    category: "Embedded Systems",
    description:
      "Work directly with our hardware team designing custom PCBs, writing RTOS firmware, and integrating IoT solutions for enterprise clients.",
  },
  {
    id: "int2",
    title: "IoT Cloud Intern",
    type: "Remote",
    duration: "3-6 Months",
    requirements: "React, Node.js, WebSockets, Firebase",
    category: "IoT Development",
    description:
      "Build scalable backends, deploy MQTT brokers, and create real-time React dashboards for connected devices.",
  },
];

export const ECOSYSTEMS = [
  {
    id: "store",
    title: "Electronics DIY Store",
    description: "Components, boards, and robotic kits.",
    icon: ShoppingCart,
    path: "/store",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "projects",
    title: "Engineering Projects",
    description: "Source code, diagrams, and tutorials.",
    icon: LayoutTemplate,
    path: "/projects",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "courses",
    title: "Certified Courses",
    description: "IEEE-inspired learning tracks.",
    icon: GraduationCap,
    path: "/careers?tab=certifications",
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "labs",
    title: "Lab Setups",
    description: "Institutional AICTE/ATL innovation labs.",
    icon: Microscope,
    path: "/labs",
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "solutions",
    title: "Technical Solutions",
    description: "Embedded, PCB design & 3D Prototyping.",
    icon: Cpu,
    path: "/solutions",
    color: "bg-rose-50 text-rose-600",
  },
];
