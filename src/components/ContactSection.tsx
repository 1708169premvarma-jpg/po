import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

export function ContactSection() {
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'sahithivadlamudi99@gmail.com',
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=sahithivadlamudi99@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '8977533233',
      link: 'https://wa.me/918977533233'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'MG Road, Bangalore, Karnataka',
      link: null
    }
  ];

  const socialMedia = [
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      link: 'https://www.instagram.com/sahithi_.varma_?igsh=MXI0bDNjYmNqejZxbw==',
      color: 'hover:bg-pink-500/20 hover:border-pink-500/50'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      link: 'https://www.linkedin.com/in/sahithi-vadlamudi-b80933218?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      color: 'hover:bg-blue-500/20 hover:border-blue-500/50'
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=sahithivadlamudi99@gmail.com',
      color: 'hover:bg-white/20 hover:border-white/50'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      {/* Main Content */}
      <div className="flex-1 py-20 px-6 md:px-12 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-6xl md:text-8xl mb-4 popup-on-hover">CONTACT</h2>
            <p className="text-xl text-white/70">
              Let's create something beautiful together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl mb-6">Get in Touch</h3>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-sm mb-1">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-lg hover:text-white/80 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-3xl mb-6">Send a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-white/70 mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-4 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Social Media Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-3xl mb-6 text-center">Follow Me</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-all ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="border-t border-white/10 py-8 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-2xl mb-1">DESIGN x STYLE</p>
              <p className="text-white/60 text-sm">Fashion Designer </p>
            </div>

            

            <p className="text-white/150 text-sm">
             SAHITHI'S PORTFOLIO
            </p>
          </div>
        </div>
      </motion.footer>
    </motion.section>
  );
}
