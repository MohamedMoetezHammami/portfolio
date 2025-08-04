import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set(textRef.current, { opacity: 0, y: 30 });
    gsap.set(progressRef.current, { width: "0%" });

    // Animate text in
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })

    // Animate progress bar
    .to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out"
    }, "-=0.5")

    // Wait a moment
    .to({}, { duration: 0.5 })

    // Fade out loader
    .to(loaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="loader fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-darker"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-neon-cyan/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main content */}
      <div ref={textRef} className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
          Hammami Mohamed Moetez
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-light">
          Web Developer & Digital Creator
        </p>
      </div>

      {/* Progress bar */}
      <div className="progress-bar relative mt-8">
        <div 
          ref={progressRef}
          className="progress-fill h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full glow-primary"
        ></div>
      </div>

      {/* Loading percentage (optional) */}
      <div className="mt-4 text-sm text-muted-foreground">
        Loading Experience...
      </div>
    </div>
  );
};

export default LoadingScreen;