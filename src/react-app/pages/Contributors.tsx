import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import '../styles/landing-mobile.css';

interface Contributor {
  id: string;
  name: string;
  location: string;
  photoCandidates: string[];
  experience: string[];
  education: string[];
  achievements?: string[];
  initials: string;
}

const CONTRIBUTORS: Contributor[] = [
  {
    id: 'dr-chhatrapati-parida',
    name: 'Dr. Chhatrapati Parida',
    location: 'Bhubaneswar, India',
    photoCandidates: [
      '/assets/contributors/dr-chhatrapati-parida.jpg',
      encodeURI('/assets/contributors/chhatrapati Parida .jpg'),
      '/assets/contributors/chhatrapati Parida .jpg'
    ],
    experience: [
      'Associate Professor of Physics, Odisha University of Agriculture and Technology (OUAT)',
      'Supervised 4 Ph.D. scholars, authored 6 textbooks, and published more than 50 research papers in peer-reviewed journals'
    ],
    education: [
      'Ph.D. in Physics from Utkal University',
      'M.Sc. in Physics from NIT Rourkela',
      'B.Sc. in Physics (Hons) from Ravenshaw College'
    ],
    initials: 'CP'
  },
  {
    id: 'dr-bibhuprasad-mahakud',
    name: 'Dr. Bibhuprasad Mahakud',
    location: 'Bhubaneswar, India',
    photoCandidates: [
      '/assets/contributors/dr-bibhuprasad-mahakud.jpg',
      encodeURI('/assets/contributors/Bibhuprasad Mahakud.jpg'),
      '/assets/contributors/Bibhuprasad Mahakud.jpg'
    ],
    experience: [
      '7+ years at CERN, Geneva, Switzerland',
      'Over 10 years of experience in AI and technology'
    ],
    education: [
      'Postdoctoral Research at Purdue University, USA',
      'Ph.D. in Physics Data Analysis from TIFR, Mumbai',
      "Master's degree from IIT Delhi",
      'Bachelor, OUAT'
    ],
    achievements: [
      'AI Innovation Award',
      'Tech Leader 2023'
    ],
    initials: 'BM'
  },
  {
    id: 'ipsit-panda',
    name: 'Ipsit Panda',
    location: 'Bhubaneswar, India',
    photoCandidates: [
      '/assets/contributors/ipsit-panda.jpg',
      encodeURI('/assets/contributors/Ipsit Panda.jpg'),
      '/assets/contributors/Ipsit Panda.jpg'
    ],
    experience: [
      'Extensive experience in teaching and academic leadership'
    ],
    education: [
      "Master's degree from IIT Delhi",
      'Bachelor, OUAT'
    ],
    achievements: [
      'AI Research Excellence',
      'Innovation Pioneer'
    ],
    initials: 'IP'
  }
];

function ContributorPhoto({ contributor }: { contributor: Contributor }) {
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageError = () => {
    if (candidateIdx < contributor.photoCandidates.length - 1) {
      setCandidateIdx(candidateIdx + 1);
    } else {
      setImageFailed(true);
    }
  };

  const currentSrc = contributor.photoCandidates[candidateIdx];

  return (
    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
      {!imageFailed ? (
        <img
          src={currentSrc}
          alt={contributor.name}
          onError={handleImageError}
          className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-102"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-700 p-6">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-700 font-bold text-2xl flex items-center justify-center mb-3">
            {contributor.initials}
          </div>
          <span className="text-sm font-semibold text-slate-800 text-center">
            {contributor.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Contributors() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 flex items-center justify-center mx-auto">
                <img
                  src="/examlogo.png"
                  alt="Exam Logo"
                  className="w-8 h-8 object-contain rounded-md transition-transform group-hover:scale-105"
                />
              </div>
              <span className="font-bold text-xl tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">
                DashoExams
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-slate-600">
              <Link to="/#features" className="hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link to="/#process" className="hover:text-blue-600 transition-colors">
                Process
              </Link>
              <Link to="/#security" className="hover:text-blue-600 transition-colors">
                Security
              </Link>
              <Link to="/#platform" className="hover:text-blue-600 transition-colors">
                Platform
              </Link>
              <Link
                to="/contributors"
                className="text-blue-600 font-bold transition-colors bg-blue-50/70 px-3 py-1.5 rounded-lg border border-blue-100/70"
              >
                Contributors
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="text-[13px] font-bold text-slate-800 hover:text-blue-600 px-3 py-2 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-95"
              >
                Sign up
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-600 p-2"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-4 shadow-lg absolute w-full left-0 top-16">
            <div className="space-y-2 text-sm font-bold text-slate-600">
              <Link
                to="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 border-b border-slate-50 hover:text-blue-600 transition-colors"
              >
                Features
              </Link>
              <Link
                to="/#process"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 border-b border-slate-50 hover:text-blue-600 transition-colors"
              >
                Process
              </Link>
              <Link
                to="/#security"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 border-b border-slate-50 hover:text-blue-600 transition-colors"
              >
                Security
              </Link>
              <Link
                to="/#platform"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 border-b border-slate-50 hover:text-blue-600 transition-colors"
              >
                Platform
              </Link>
              <Link
                to="/contributors"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 text-blue-600 font-bold"
              >
                Contributors
              </Link>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/register"
                className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="w-full text-center text-sm font-bold text-slate-900 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* HEADER SECTION WITH USER-APPROVED METRICS BAR */}
      <section className="pt-32 pb-14 relative overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800e_1px,transparent_1px),linear-gradient(to_bottom,#8080800e_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[650px] h-[280px] bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-cyan-400/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-[11px] font-bold text-blue-700 mb-5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="uppercase tracking-wider font-mono">Platform Contributors</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-[1.15]">
            Contributors
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Meet the contributors behind DashoExams.
          </p>

          {/* User-Approved Credential Highlights Bar */}
          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-3 max-w-2xl mx-auto divide-x divide-slate-100">
            <div className="px-3">
              <div className="text-sm sm:text-base font-bold text-slate-900">50+ Papers & 6 Books</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Academic Impact</div>
            </div>
            <div className="px-3">
              <div className="text-sm sm:text-base font-bold text-slate-900">CERN Research</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Large-Scale Data</div>
            </div>
            <div className="px-3">
              <div className="text-sm sm:text-base font-bold text-slate-900">IIT Delhi & TIFR</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Theoretical Rigor</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 EQUAL CONTRIBUTORS CARDS - CLEAN & AUTHENTIC */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {CONTRIBUTORS.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-6">
                  {/* Clean Photo Frame (No ghost details or overlays) */}
                  <ContributorPhoto contributor={person} />

                  {/* Name Only */}
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {person.name}
                    </h2>
                  </div>

                  {/* Experience Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Briefcase className="w-3 h-3" />
                      </div>
                      <span>Experience</span>
                    </div>

                    <ul className="space-y-2.5">
                      {person.experience.map((exp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Education Section */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                      <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <GraduationCap className="w-3 h-3" />
                      </div>
                      <span>Education</span>
                    </div>

                    <ul className="space-y-2">
                      {person.education.map((edu, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                          <span className="font-medium">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Achievements (where applicable) */}
                  {person.achievements && person.achievements.length > 0 && (
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                        <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                          <Award className="w-3 h-3" />
                        </div>
                        <span>Key Achievements</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {person.achievements.map((ach, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50/70 border border-amber-200/70 text-amber-900 font-semibold text-xs"
                          >
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>{ach}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Footer */}
                <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{person.location}</span>
                  </span>
                  <span className="text-blue-600 font-semibold text-[11px] uppercase tracking-wider">
                    Contributor
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/examlogo.png" alt="DashoExams" className="w-6 h-6 object-contain" />
              <div className="font-bold text-xl text-slate-900 tracking-tight">DashoExams</div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The infrastructure for global assessments.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link to="/#features" className="hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link to="/#process" className="hover:text-blue-600 transition-colors">Process</Link></li>
              <li><Link to="/#security" className="hover:text-blue-600 transition-colors">Security</Link></li>
              <li><Link to="/#platform" className="hover:text-blue-600 transition-colors">Platform</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Status</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
              <li><Link to="/contributors" className="text-blue-600 font-semibold">Contributors</Link></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-medium">
          <div>
            <span>© 2025 DashoExams. All rights reserved.</span>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
