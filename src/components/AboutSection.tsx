import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function AboutSection() {
  const fashionPhotos = [
    {
      url: 'Screenshot 2026-02-09 004457.png',
      title: ''
    },
    {
      url: 'Screenshot 2026-02-09 004649.png',
      title: ''
    },
    {
      url: 'Screenshot 2026-02-09 004704.png',
      title: ''
    },
    {
      url: 'Screenshot 2026-02-09 004718.png',
      title: ''
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={16} className="text-white/30" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-6xl md:text-8xl mb-8 popup-on-hover">STYLING </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl mb-4 text-white/90">Creative Vision</h3>
                <p className="text-white/70 leading-relaxed">
                 Contemporary Women in Control”
My creative vision explores the balance between structure and softness, presenting women who are confident, independent, and self-aware. The styling narrative focuses on redefining everyday silhouettes through layering, muted colour palettes, and sharp tailoring, creating a visual language that feels modern yet timeless.

                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl mb-4 text-white/90">Design Philosophy</h3>
                <p className="text-white/70 leading-relaxed">
                  My design philosophy is rooted in the idea of soft structure, where clothing becomes a medium to express control, individuality, and modern femininity. Through layered silhouettes, clean tailoring, and balanced proportions, the styling explores how garments can shape identity without relying on ornamentation. 
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl mb-4 text-white/90">SKILLS</h3>
                <div className="flex flex-wrap gap-3">
                  {['Haute Couture', 'Ready-to-Wear', 'Pattern Making', 'Textile Design', 'Fashion Illustration', 'Sustainable Fashion'].map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Fashion Photos Grid */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {fashionPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-sm">{photo.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
