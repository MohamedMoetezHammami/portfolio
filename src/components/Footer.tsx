import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Footer content animation
    gsap.fromTo(contentRef.current,
      {
        opacity: 0,
        y: 60,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating background particles
    gsap.to(".footer-particle-1", {
      y: -15,
      x: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to(".footer-particle-2", {
      y: 20,
      x: -15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1
    });

    gsap.to(".footer-particle-3", {
      y: -10,
      x: 5,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 2
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: GithubLogo,
      href: 'https://github.com',
      color: 'hover:text-neon-purple'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinLogo,
      href: 'https://linkedin.com',
      color: 'hover:text-neon-blue'
    },
    {
      name: 'Email',
      icon: EnvelopeSimple,
      href: 'mailto:contact@example.com',
      color: 'hover:text-neon-cyan'
    }
  ];

  return (
    <footer ref={footerRef} className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-background/50"></div>
        
        {/* Floating particles */}
        <div className="footer-particle-1 absolute top-1/4 left-1/4 w-32 h-32 bg-neon-purple/20 rounded-full blur-3xl"></div>
        <div className="footer-particle-2 absolute bottom-1/3 right-1/4 w-24 h-24 bg-neon-blue/20 rounded-full blur-3xl"></div>
        <div className="footer-particle-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-neon-cyan/20 rounded-full blur-3xl"></div>
        
        {/* Small floating dots */}
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-neon-pink/60 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-neon-purple/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-neon-cyan/60 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div ref={contentRef} className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">
              Hammami Mohamed Moetez
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Crafting digital experiences through innovative design and 
              cutting-edge development. Let's build the future together.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Navigation</h4>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-neon-purple transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className={`p-3 bg-glass-bg/50 border border-glass-border rounded-xl text-muted-foreground transition-all duration-300 hover:scale-110 hover:glow-primary ${social.color}`}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Available for freelance work
              </p>
              <p className="text-sm text-neon-purple">
                contact@example.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-glass-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart size={16} className="mx-1 text-neon-pink" /> using React, GSAP & Tailwind CSS
            </p>
            
            <p className="text-sm text-muted-foreground">
              © 2024 Hammami Mohamed Moetez. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;