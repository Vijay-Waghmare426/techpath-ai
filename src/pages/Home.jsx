import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card';
import { 
  Users, 
  BookOpen, 
  Brain, 
  Code, 
  Server, 
  Cloud, 
  Shield, 
  Smartphone,
  ArrowRight,
  Star
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (link) => {
    navigate(link);
  };
  const features = [
    {
      icon: Users,
      title: "Interview Hub",
      description: "Comprehensive preparation paths for Frontend, Backend, DevOps, and Cloud interviews with mock Q&A sessions.",
      link: "/interview-hub"
    },
    {
      icon: BookOpen,
      title: "Tech Blogs",
      description: "Curated tech articles, tutorials, and trending technology insights from industry experts.",
      link: "/tech-blogs"
    },
    {
      icon: Brain,
      title: "AI Issue Solver",
      description: "AI-powered debugging assistant to help solve complex coding problems and technical challenges.",
      link: "/ai-solver"
    }
  ];

  const technologies = [
    { icon: Code, name: "Frontend Development" },
    { icon: Server, name: "Backend Systems" },
    { icon: Cloud, name: "Cloud Architecture" },
    { icon: Shield, name: "DevOps & Security" },
    { icon: Smartphone, name: "Mobile Development" },
    { icon: Brain, name: "AI & Machine Learning" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "TechPath.ai helped me ace my technical interviews. The mock Q&A sessions were incredibly realistic!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "DevOps Engineer at AWS",
      content: "The AI solver saved me hours of debugging. It's like having a senior developer always available.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Full Stack Developer",
      content: "The tech blogs keep me updated with the latest trends. The content quality is exceptional.",
      rating: 5
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features-section" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Everything You Need to
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Excel in Tech
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive tools and resources designed to accelerate your technology career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  variant="featured"
                  onClick={() => handleFeatureClick(feature.link)}
                >
                  <div className="flex items-center text-purple-400 text-sm font-medium mt-4 group-hover:text-pink-400 transition-colors duration-200">
                    <span>Explore now</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Master Every Technology Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From frontend frameworks to cloud architecture, we cover all the technologies you need to know
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-200"
              >
                <tech.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers who have accelerated their careers with TechPath.ai
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-purple-400 text-sm">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-purple-400/30 rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Transform Your Tech Career?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join TechPath.ai today and get access to comprehensive interview preparation, cutting-edge tech content, and AI-powered development tools.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 text-lg"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;