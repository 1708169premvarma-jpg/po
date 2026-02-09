
import { Navbar } from './components/navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <div id="home"><HomeSection /></div>
      <div id="about"><AboutSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div className="flex justify-center my-12">
        <a
          href="/all-projects"
          className="px-8 py-4 bg-white/10 text-white rounded-xl text-2xl font-semibold shadow-lg hover:bg-white/20 transition-all border border-white/20 backdrop-blur-md"
        >
          More Projects
        </a>
      </div>
      <div id="experiences"><ExperiencesSection /></div>
      <div id="contact"><ContactSection /></div>
    </div>
  );
}
