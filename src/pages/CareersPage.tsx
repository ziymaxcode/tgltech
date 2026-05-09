import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  ShieldCheck,
  Briefcase,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import { COURSES, INTERNSHIPS } from "../data/mockData";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function CareersPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<
    "phd" | "internships" | "certifications"
  >("internships");

  const [courseCategory, setCourseCategory] = useState<string>("All Courses");
  const [courseSearch, setCourseSearch] = useState<string>("");

  const [internshipCategory, setInternshipCategory] =
    useState<string>("All Internships");
  const [internshipSearch, setInternshipSearch] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "phd" || tab === "internships" || tab === "certifications") {
      setActiveTab(tab);
    }
    const cat = params.get("category");
    if (cat) {
      if (tab === "certifications") {
        if (cat === "programming") setCourseCategory("Programming Foundations");
        else if (cat === "robotics") setCourseCategory("Robotics & Automation");
        else if (cat === "iot") setCourseCategory("Internet of Things (IoT)");
        else if (cat === "ai") setCourseCategory("Artificial Intelligence");
        else setCourseCategory("All Courses");
      } else if (tab === "internships") {
        if (cat === "iot") setInternshipCategory("IoT Development");
        else if (cat === "web") setInternshipCategory("Web Development");
        else if (cat === "embedded") setInternshipCategory("Embedded Systems");
        else if (cat === "ai") setInternshipCategory("AI & Machine Learning");
        else setInternshipCategory("All Internships");
      }
    }
  }, [location]);

  const COURSE_CATEGORIES = [
    "All Courses",
    "Programming Foundations",
    "Robotics & Automation",
    "Internet of Things (IoT)",
    "Artificial Intelligence",
  ];

  const INTERNSHIP_CATEGORIES = [
    "All Internships",
    "IoT Development",
    "Web Development",
    "Embedded Systems",
    "AI & Machine Learning",
  ];

  const filteredCourses = COURSES.filter((c) => {
    const matchesCategory =
      courseCategory === "All Courses" || c.category === courseCategory;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(courseSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredInternships = INTERNSHIPS.filter((i) => {
    const matchesCategory =
      internshipCategory === "All Internships" ||
      i.category === internshipCategory;
    const matchesSearch = i.title
      .toLowerCase()
      .includes(internshipSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
              {activeTab === "phd" && "PhD Research Support"}
              {activeTab === "internships" && "Internships"}
              {activeTab === "certifications" && "Certified Courses"}
            </h1>
          </div>

          {(activeTab === "certifications" || activeTab === "internships") && (
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder={`Search ${activeTab === "certifications" ? "courses" : "internships"}...`}
                value={
                  activeTab === "certifications"
                    ? courseSearch
                    : internshipSearch
                }
                onChange={(e) =>
                  activeTab === "certifications"
                    ? setCourseSearch(e.target.value)
                    : setInternshipSearch(e.target.value)
                }
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-600 font-medium text-sm text-[#1d1d1f] placeholder:text-gray-400 outline-none transition-shadow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {activeTab === "phd" && (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 lg:p-16 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <ShieldCheck className="w-96 h-96" />
            </div>
            <div className="max-w-3xl relative z-10">
              <span className="text-[10px] uppercase text-blue-600 font-black tracking-widest mb-4 block">
                Mentorship & Development
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-8 tracking-tight">
                Accelerate Your PhD Research
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                TGL Technologies provides dedicated support for doctoral
                candidates and researchers. From sourcing rare customized
                components to assisting with complex hardware/software system
                designs, our engineering team acts as an extension of your
                research lab.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 text-blue-600 mr-4" /> Dedicated
                  Engineering Mentorship
                </li>
                <li className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-4" /> Custom
                  Firmware & Schematic Design
                </li>
                <li className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 text-blue-600 mr-4" /> Accelerated
                  PCB Fab & Sourcing
                </li>
              </ul>
              <a
                href="https://wa.me/919876543210?text=Hi, I am interested in PhD Research Support."
                target="_blank"
                rel="noreferrer"
                className="bg-[#1d1d1f] text-white hover:bg-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors inline-block"
              >
                Consult With Our Experts
              </a>
            </div>
          </div>
        )}

        {activeTab === "internships" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col-reverse md:flex-row gap-8">
              {/* Sidebar */}
              <aside className="w-full md:w-64 shrink-0">
                <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
                  <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight shrink-0">
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
                  </h3>
                  <ul className="space-y-1 overflow-y-auto pr-2 flex-1">
                    {INTERNSHIP_CATEGORIES.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setInternshipCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                            internshipCategory === cat
                              ? "bg-gray-50 text-blue-600 font-bold border border-gray-100"
                              : "text-gray-500 hover:bg-gray-50 hover:text-[#1d1d1f]"
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Internships Grid */}
              <div className="flex-1">
                {filteredInternships.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredInternships.map((internship) => (
                      <div
                        key={internship.id}
                        className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                      >
                        <div>
                          <span
                            className={`${internship.type === "Remote" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"} px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest mb-6 inline-block`}
                          >
                            {internship.type}
                          </span>
                          <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">
                            {internship.title}
                          </h3>
                          <p className="text-gray-500 mb-6 leading-relaxed text-sm">
                            {internship.description}
                          </p>
                          <div className="space-y-2 mb-8">
                            <p className="text-sm text-gray-600">
                              <span className="font-bold">Duration:</span>{" "}
                              {internship.duration}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-bold">Requirements:</span>{" "}
                              {internship.requirements}
                            </p>
                          </div>
                        </div>
                        <button className="w-full bg-gray-50 border border-gray-100 text-[#1d1d1f] font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:border-blue-600 hover:text-blue-600 transition-colors shadow-sm">
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                    <p className="text-gray-500 text-lg">
                      No internships found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col-reverse md:flex-row gap-8">
              {/* Sidebar */}
              <aside className="w-full md:w-64 shrink-0">
                <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
                  <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight shrink-0">
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
                  </h3>
                  <ul className="space-y-1 overflow-y-auto pr-2 flex-1">
                    {COURSE_CATEGORIES.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setCourseCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                            courseCategory === cat
                              ? "bg-gray-50 text-blue-600 font-bold border border-gray-100"
                              : "text-gray-500 hover:bg-gray-50 hover:text-[#1d1d1f]"
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Courses Grid */}
              <div className="flex-1">
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                      >
                        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-50 mb-6 shrink-0 relative">
                          <img
                            src={course.image}
                            className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"
                            alt={course.name}
                          />
                          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-gray-100 text-[10px] font-black uppercase text-blue-600 tracking-widest px-3 py-1.5 rounded-xl z-10 shadow-sm">
                            {course.level}
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                            {course.category}
                          </span>
                          <h2 className="font-bold text-xl text-[#1d1d1f] mb-4 tracking-tight leading-tight">
                            {course.name}
                          </h2>
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center text-sm font-medium text-gray-500">
                              <BookOpen className="w-4 h-4 mr-3 text-gray-400" />{" "}
                              {course.duration}
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-500">
                              <Users className="w-4 h-4 mr-3 text-gray-400" />{" "}
                              Mentor: {course.mentor}
                            </div>
                          </div>
                          <div className="mt-auto flex gap-2">
                            <button className="flex-1 bg-[#1d1d1f] hover:bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
                              Enroll
                            </button>
                            <button className="flex-1 bg-gray-50 border border-gray-100 hover:border-blue-600 hover:text-blue-600 text-gray-500 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                              Syllabus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                    <p className="text-gray-500 text-lg">
                      No courses found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
