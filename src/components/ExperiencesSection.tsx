import { motion } from 'motion/react';
import { Award, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
}

export function ExperiencesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
 
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-6xl md:text-8xl mb-4 popup-on-hover">EXPERIENCE</h2>
          <p className="text-xl text-white/70">
            Certifications & Achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <Award size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-1">{cert.title}</h3>
                  <p className="text-white/60 text-sm">{cert.issuer}</p>
                  <p className="text-white/40 text-xs mt-1">{cert.date}</p>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                {cert.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCertificate(cert)}
                className="w-full px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                View Certificate
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Work Experience Timeline */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-4xl mb-8">Work Experience</h3>
          
          <div className="space-y-6">
            {[
              {
                role: 'QA Consultant ',
                company: 'Myntra',
               
                description: 'As a QA Consultant and Content Writer at Myntra, I reviewed and ensured the quality, clarity, and brand consistency of product images while conducting detailed QC checks to verify styling, cropping, and accuracy. I created clear, engaging, and SEO-friendly product titles and descriptions, collaborated with category teams to resolve discrepancies, and maintained a high accuracy rate in daily onboarding tasks. I also contributed to process improvements by identifying recurring image and content issues, helping enhance overall product presentation on the platform.'
              },
              {
                role: 'Assistant Designer Intern',
                company: 'Humankind Style',
                
                description: 'Assisted in the development of design concepts, mooodboards, and fabric selections Supported senior designers in sketching, draping and sampling processes. Coordinated with the production team to ensure design accuracy and timely execution Helped in cataloguing and organizing fabric swatches and trims for design reference Participated instyling and garment fittings to refine final looks.'
              },
              {
                role: 'Trainee Merchandiser',
                company: 'Sunitha Impex',
                
                description: 'Worked for one month, assisting in product development, supplier coordination, and inventory management.'
              },
              
              {
                role: 'Fashion Intern',
                company: 'Sunitha ImpexBangalore Fashion Week',
               
                description: 'Interned during the event, assisting in event coordination, backstage management, and designer support.'
              }
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="relative pl-8 border-l-2 border-white/20 pb-6 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full transform -translate-x-[9px]" />
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-2xl mb-1">{job.role}</h4>
                  <p className="text-2xl mb-2">{job.company}</p>
                  <p className="text-white/40 text-sm mb-3"></p>
                  <p className="text-white/70 leading-relaxed">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedCertificate(null)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 bg-white/10 rounded-xl">
                <Award size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl mb-2">{selectedCertificate.title}</h3>
                <p className="text-white/70">{selectedCertificate.issuer}</p>
                <p className="text-white/50">{selectedCertificate.date}</p>
              </div>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-white/5">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              {selectedCertificate.description}
            </p>

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-white text-black rounded-xl hover:bg-white/90 transition-colors">
                Download Certificate
              </button>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}
