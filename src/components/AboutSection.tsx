import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Globe, 
  Lightning,
  Database,
  DeviceMobile
} from 'phosphor-react';
import profileImage from '@/assets/profile-image.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Image animation
    gsap.fromTo(imageRef.current, 
      { 
        opacity: 0, 
        x: -100,
        scale: 0.8,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
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
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Skills stagger animation
    const skillIcons = skillsRef.current?.children;
    if (skillIcons) {
      gsap.fromTo(skillIcons,
        {
          opacity: 0,
          y: 30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
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

  const skills = [
    { name: 'Frontend', icon: Code, color: 'text-neon-purple' },
    { name: 'UI/UX', icon: Palette, color: 'text-neon-blue' },
    { name: 'React', icon: Globe, color: 'text-neon-cyan' },
    { name: 'Performance', icon: Lightning, color: 'text-neon-pink' },
    { name: 'Backend', icon: Database, color: 'text-neon-purple' },
    { name: 'Mobile', icon: DeviceMobile, color: 'text-neon-blue' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-neon-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue rounded-3xl p-1 glow-primary group-hover:glow-secondary transition-all duration-500">
                <div className="bg-background rounded-3xl h-full w-full"></div>
              </div>
              
              {/* Profile image */}
              <div className="relative rounded-3xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <img
                  src={profileImage}
                  alt="Hammami Mohamed Moetez"
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-cyan/60 rounded-full blur-sm animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-pink/60 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Hi! I'm <span className="text-neon-purple font-semibold">Hammami Mohamed Moetez</span>, 
                  a passionate web developer with a keen eye for creating immersive digital experiences.
                </p>
                
                <p>
                  I specialize in modern web technologies, bringing designs to life with smooth animations, 
                  responsive layouts, and cutting-edge development practices. Every project is an opportunity 
                  to push boundaries and create something extraordinary.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open source 
                  projects, and constantly learning to stay ahead of the curve in this ever-evolving field.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Skills & Expertise
              </h3>
              
              <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="glass rounded-2xl p-4 hover:glow-primary transition-all duration-300 hover:scale-105 group cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        <IconComponent 
                          size={32} 
                          className={`${skill.color} group-hover:text-neon-purple transition-colors duration-300`} 
                        />
                        <span className="text-sm font-medium text-foreground group-hover:text-neon-purple transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;