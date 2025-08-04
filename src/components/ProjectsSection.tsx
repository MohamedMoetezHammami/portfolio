import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';
import { Button } from '@/components/ui/button';

// Import project images
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "3D Interactive Web Experience",
      description: "Immersive 3D web application with holographic elements and smooth animations using Three.js and GSAP.",
      image: project1,
      tech: ["React", "Three.js", "GSAP", "WebGL"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 2,
      title: "Modern E-Commerce Platform",
      description: "Sleek e-commerce solution with advanced filtering, smooth animations, and mobile-first design.",
      image: project2,
      tech: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with interactive charts and data visualizations for business insights.",
      image: project3,
      tech: ["React", "D3.js", "Node.js", "Socket.io"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 4,
      title: "Social Media App",
      description: "Modern social media platform with real-time messaging, post sharing, and user engagement features.",
      image: project4,
      tech: ["React Native", "Firebase", "Redux", "TypeScript"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 5,
      title: "Creative Portfolio Template",
      description: "Stunning portfolio template with creative layouts, typography focus, and modern design patterns.",
      image: project5,
      tech: ["Vue.js", "Nuxt", "SCSS", "Framer Motion"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 6,
      title: "Real Estate Platform",
      description: "Comprehensive real estate platform with property listings, map integration, and advanced search filters.",
      image: project6,
      tech: ["React", "Node.js", "PostgreSQL", "Mapbox"],
      github: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.fromTo(titleRef.current,
      {
        opacity: 0,
        y: 50,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Projects stagger animation
    const projectCards = projectsRef.current?.children;
    if (projectCards) {
      gsap.fromTo(projectCards,
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-neon-pink/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work, featuring cutting-edge technologies and innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass rounded-3xl overflow-hidden group hover:glow-primary transition-all duration-500 hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="sm"
                    className="bg-neon-purple/90 hover:bg-neon-purple text-white rounded-full p-3"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    <ArrowUpRight size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/30 hover:bg-white/10 text-white rounded-full p-3"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <GithubLogo size={16} />
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-neon-purple transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-neon-purple/20 text-neon-purple rounded-full border border-neon-purple/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="glass border-glass-border hover:bg-neon-purple/10 hover:border-neon-purple/50 text-foreground font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            View More Projects
            <ArrowUpRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;