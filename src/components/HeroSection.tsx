import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'phosphor-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });

    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.9
    });

    // Animate elements
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    // Floating background elements
    gsap.to(".glow-orb-1", {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to(".glow-orb-2", {
      y: 25,
      x: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1
    });

    gsap.to(".glow-orb-3", {
      x: -20,
      y: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 2
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb-1 absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl"></div>
        <div className="glow-orb-2 absolute bottom-1/3 right-1/4 w-48 h-48 bg-neon-blue/20 rounded-full blur-3xl"></div>
        <div className="glow-orb-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-neon-cyan/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text text-glow">
                Hammami Mohamed Moetez
              </span>{' '}
              <br />
              <span className="text-foreground">Web Developer</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Crafting digital experiences that inspire and engage through 
              innovative design and cutting-edge technology.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white font-semibold px-8 py-4 rounded-2xl glow-primary hover:scale-105 transition-all duration-300 group"
                onClick={scrollToProjects}
              >
                View My Work
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="glass border-glass-border hover:bg-neon-purple/10 hover:border-neon-purple/50 text-foreground font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Hire Me
              </Button>
            </div>
          </div>

          {/* Right Content - Spline 3D */}
          <div
            ref={splineRef}
            className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden"
          >
            <iframe
              src="https://my.spline.design/holoblobs-QJMXybzYyOvlcbyrn1qqQDGd/"
              frameBorder="0"
              width="100%"
              height="100%"
              className="rounded-3xl"
              title="3D Holographic Animation"
            ></iframe>
            
            {/* Overlay glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;