import React, { useEffect, useRef, useState } from 'react';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOpacity, setVideoOpacity] = useState<number>(0);
  const videoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    const fadeDuration = 0.5; // Window sizing for fade in/out loops (0.5 seconds)

    const checkVideoTime = () => {
      if (video) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        if (duration > 0) {
          // Fade in loop over the starting 0.5s
          if (currentTime < fadeDuration) {
            setVideoOpacity(currentTime / fadeDuration);
          } 
          // Fade out loop during the terminal 0.5s
          else if (currentTime > duration - fadeDuration) {
            const timeRemaining = duration - currentTime;
            setVideoOpacity(Math.max(0, timeRemaining / fadeDuration));
          } 
          // Static hold while running inside the clip interior
          else {
            setVideoOpacity(1);
          }
        }
      }
      animationFrameId = requestAnimationFrame(checkVideoTime);
    };

    // Callback capturing standard HTML video stream end cycles
    const handleVideoEnded = async () => {
      setVideoOpacity(0);
      
      // Forces a 100ms thread wait to prevent artifact flickering
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      if (video) {
        video.currentTime = 0;
        try {
          await video.play();
        } catch (error) {
          console.warn("Autoplay block prevention caught: ", error);
        }
      }
    };

    video.addEventListener('ended', handleVideoEnded);
    animationFrameId = requestAnimationFrame(checkVideoTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FFFFFF] font-inter">
      
      {/* Background Video Layer Core */}
      <div 
        className="absolute left-0 right-0 transition-opacity duration-100 ease-out z-0"
        style={{ top: '300px', bottom: 0, opacity: videoOpacity }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          autoPlay
          className="w-full h-full object-cover"
        />
        {/* Core Linear Glassmorphic Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-transparent to-[#FFFFFF]" />
      </div>

      {/* Navigation Bar Header Component */}
      <nav className="relative z-10 max-w-7xl mx-auto px-8 py-6 flex justify-between items-center bg-transparent">
        <div className="text-3xl tracking-tight font-instrument text-[#000000] font-normal select-none">
          Aethera<sup>®</sup>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm text-[#000000] font-medium transition-colors">Home</a>
          <a href="#" className="text-sm text-[#6F6F6F] hover:text-[#000000] transition-colors">Studio</a>
          <a href="#" className="text-sm text-[#6F6F6F] hover:text-[#000000] transition-colors">About</a>
          <a href="#" className="text-sm text-[#6F6F6F] hover:text-[#000000] transition-colors">Journal</a>
          <a href="#" className="text-sm text-[#6F6F6F] hover:text-[#000000] transition-colors">Reach Us</a>
        </div>

        <button className="bg-[#000000] text-[#FFFFFF] text-sm font-medium rounded-full px-6 py-2.5 transition-transform duration-200 hover:scale-103 active:scale-95">
          Begin Journey
        </button>
      </nav>

      {/* Main Structural Display Hero */}
      <main 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
        style={{ paddingTop: 'calc(8rem - 75px)' }}
      >
        {/* Main Headline */}
        <h1 
          className="font-instrument font-normal text-5xl sm:text-7xl md:text-8xl max-w-7xl text-[#000000] animate-fade-rise"
          style={{ lineHeight: 0.95, letterSpacing: '-2.46px' }}
        >
          Beyond <span className="text-[#6F6F6F] italic font-normal">silence,</span> we build <span className="text-[#6F6F6F] italic font-normal">the eternal.</span>
        </h1>

        {/* Supporting Description Subtext */}
        <p className="text-base sm:text-lg text-[#6F6F6F] max-w-2xl mt-8 leading-relaxed font-normal animate-fade-rise-delay">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. 
          Through the noise, we craft digital havens for deep work and pure flows.
        </p>

        {/* Accentuated Hero CTA Call */}
        <button className="bg-[#000000] text-[#FFFFFF] text-base font-medium rounded-full px-14 py-5 mt-12 transition-transform duration-200 hover:scale-103 active:scale-95 animate-fade-rise-delay-2">
          Begin Journey
        </button>
      </main>
    </div>
  );
};