import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  mainImage: string;
  gallery: string[];
  year: string;
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
       id: 1,
  title: ' KALA ',
  category: '1',
  description: 'Kala explores the contrast between shadow and light, silence and expression, tradition and individuality.',
  fullDescription: 'KALA embodies the artistic soul of South Indian tradition, where every drape color and ornament tells a story of culture and craftsmanship. This concept reimagines heritage through a modern lens, creating a dialogue between tradition and contemporary fashion expression.',
      mainImage: 'SHA 1_page-0001.jpg',
      gallery: [
        'SHA 1_page-0001.jpg',
        'SHA 1_page-0002.jpg',
        'SHA 1_page-0003.jpg',
        'SHA 1_page-0004.jpg',
        'SHA 1_page-0005.jpg',
        'SHA 1_page-0006.jpg',
        'SHA 1_page-0007.jpg',
      ],
      year: ''
    },
    {
       id: 2,
    title: 'ECHO',
    category: '2',
    description: 'Echo is inspired by moments of quiet connection in abandoned spaces where emotions bounce back like sound in empty walls.',
fullDescription: 'ECHO is an experimental styling narrative that investigates the relationship between body, material, and space. The use of raw fabric and industrial settings emphasizes imperfection and temporality, positioning fashion as an echo of human presence within constructed environments',
      mainImage: 'SHA 2_page-0001.jpg',
      gallery: [
        'SHA 2_page-0001.jpg',
        'SHA 2_page-0002.jpg',
        'SHA 2_page-0003.jpg',
        'SHA 2_page-0004.jpg',
        'SHA 2_page-0005.jpg',
        'SHA 2_page-0006.jpg',
        'SHA 2_page-0007.jpg', 
        'SHA 2_page-0008.jpg',
      ],
      year: ''
    },
{
  id: 3,
  title: 'UNTAMED',
  category: '3',
  description: 'Untamed draws from the spirit of a woman who belongs to no cage only to the land, the wind, and her own will.',
  fullDescription: 'UNTAMED investigates the dialogue between control and freedom through equestrian imagery and contemporary styling. By merging organic landscapes with constructed garments, the project redefines femininity as instinctive, powerful, and unrestrained.',
  mainImage: 'SHA 3_page-0001.jpg',
      gallery: [
        'SHA 3_page-0001.jpg',
        'SHA 3.1_page-0001.jpg',
        'SHA 3_page-0002.jpg',
        'SHA 3_page-0003.jpg',
        'SHA 3_page-0004.jpg',
        'SHA 3_page-0005.jpg',
        'SHA 3_page-0006.jpg',
       ],
      year: ''
    },
   
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
           <h2 className="text-6xl md:text-8xl font-normal mb-8 popup-on-hover">PROJECTS</h2>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 max-w-xs mx-auto">
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 max-h-72"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm">{project.description}</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                View Details
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div className="min-h-screen p-6 md:p-12">
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="max-w-5xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="ml-auto mb-6 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <X size={20} />
                  Close
                </button>

                {/* Project Header */}
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4">
                    {selectedProject.category} • {selectedProject.year}
                  </span>
                  <h2 className="text-5xl md:text-7xl mb-4">{selectedProject.title}</h2>
                  <p className="text-xl text-white/70 leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Photo Gallery */}
                <div className="grid grid-cols-1 gap-4">
                  {selectedProject.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-[1.416/1] rounded-2xl overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${selectedProject.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
