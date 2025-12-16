import React, { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    // Initialize Particles.js
    if (window.particlesJS && document.getElementById('particles-js')) {
      window.particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#14b8a6"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            }
          },
          "opacity": {
            "value": 0.3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#14b8a6",
            "opacity": 0.2,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 0.5
              }
            }
          }
        },
        "retina_detect": true
      });
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Particles background */}
      <div id="particles-js" className="absolute inset-0 z-0"></div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-secondary-600/20 dark:from-primary-500/20 dark:via-transparent dark:to-secondary-500/20 animate-gradient z-0"></div>

      {/* Floating 3D elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/10 dark:bg-primary-400/10 blur-3xl animate-float" style={{animationDelay: '0s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary-500/10 dark:bg-secondary-400/10 blur-3xl animate-float-reverse" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Interactive hero content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text content */}
            <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-lg blur opacity-75 animate-pulse-slow"></div>
                <span className="relative px-4 py-1.5 bg-white/10 dark:bg-dark-800/50 backdrop-blur-sm rounded-lg text-white font-medium">
                  Healing the world, one thought at a time..
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight tracking-tight">
                <span className="gradient-text text-transparent bg-clip-text">Healthy Living</span>
              </h1>
 
              <p className="text-dark-600 dark:text-dark-300 text-lg md:text-xl mb-8 max-w-xl">
                Experience a revolutionary approach to mental health through immersive technology and compassionate care.
              </p>  

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#contact" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-primary-500/25 dark:hover:shadow-primary-400/25">
                  <span className="relative z-10">Begin Your Journey</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </a>
                <a href="#services" className="group relative overflow-hidden rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-medium text-dark-900 dark:text-white transition-all duration-300 hover:border-primary-500/50 dark:hover:border-primary-400/50">
                  <span className="relative z-10">Explore Services</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-secondary-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </a>
              </div>
            </div>

            {/* Interactive 3D visualization */}
            <div className="lg:w-1/2 mt-12 lg:mt-0" data-aos="fade-left" data-aos-delay="200">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 dark:from-primary-400/30 dark:to-secondary-400/30 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>

                {/* Interactive brain visualization */}
                <div className="relative h-[400px] w-full rounded-3xl overflow-hidden bg-dark-800/50 backdrop-blur-sm border border-white/10 shadow-2xl">
                  <div id="brain-visualization" className="absolute inset-0 flex items-center justify-center">
                    {/* Animated neural network */}
                    <div className="relative w-full h-full">
                      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                        {/* Neural paths */}
                        <path className="neural-path" d="M200,50 Q300,150 200,250 Q100,350 200,350" stroke="url(#neuralGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5" strokeDashoffset="0">
                          <animate attributeName="stroke-dashoffset" from="0" to="100" dur="10s" repeatCount="indefinite" />
                        </path>
                        <path className="neural-path" d="M200,50 Q100,150 200,250 Q300,350 200,350" stroke="url(#neuralGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5" strokeDashoffset="0">
                          <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="15s" repeatCount="indefinite" />
                        </path>
                        <path className="neural-path" d="M100,200 Q200,100 300,200" stroke="url(#neuralGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5" strokeDashoffset="0">
                          <animate attributeName="stroke-dashoffset" from="0" to="100" dur="12s" repeatCount="indefinite" />
                        </path>
                        <path className="neural-path" d="M100,200 Q200,300 300,200" stroke="url(#neuralGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5" strokeDashoffset="0">
                          <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="8s" repeatCount="indefinite" />
                        </path>

                        {/* Neural nodes */}
                        <circle cx="200" cy="50" r="8" fill="url(#nodeGrad)" className="animate-pulse-slow">
                          <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="200" cy="250" r="12" fill="url(#nodeGrad)" className="animate-pulse-slow">
                          <animate attributeName="r" values="12;15;12" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="200" cy="350" r="10" fill="url(#nodeGrad)" className="animate-pulse-slow">
                          <animate attributeName="r" values="10;12;10" dur="5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="100" cy="200" r="9" fill="url(#nodeGrad)" className="animate-pulse-slow">
                          <animate attributeName="r" values="9;11;9" dur="3.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="300" cy="200" r="9" fill="url(#nodeGrad)" className="animate-pulse-slow">
                          <animate attributeName="r" values="9;11;9" dur="4.5s" repeatCount="indefinite" />
                        </circle>

                        {/* Gradient definitions */}
                        <defs>
                          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#14b8a6" />
                            <stop offset="100%" stopColor="#d946ef" />
                          </linearGradient>
                          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#14b8a6" />
                            <stop offset="100%" stopColor="#d946ef" />
                          </radialGradient>
                        </defs>
                      </svg>

                      <div className="relative h-full w-full">
                        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-30">
                          <path d="M200,100 C260,60 320,80 350,130 C380,180 360,250 320,280 C280,310 240,300 200,290 C160,300 120,310 80,280 C40,250 20,180 50,130 C80,80 140,60 200,100 Z"
                                fill="none"
                                stroke="url(#brainGrad)"
                                strokeWidth="2"
                                strokeDasharray="1200"
                                strokeDashoffset="1200">
                            <animate attributeName="stroke-dashoffset" from="1200" to="0" dur="3s" fill="freeze" />
                          </path>
                          <defs>
                            <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#14b8a6" />
                              <stop offset="100%" stopColor="#d946ef" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    {/* Interactive elements */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="text-xs text-white/70">Neural activity visualization</div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" style={{animationDelay: '1s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="400">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/50 to-primary-500/0 dark:from-primary-400/50 dark:to-primary-400/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/5 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 group-hover:border-primary-500/50 dark:group-hover:border-primary-400/50">
                <div className="text-4xl font-bold text-dark-900 dark:text-white mb-2"></div>
                <div className="text-dark-600 dark:text-dark-300">Chat with Mental Health Professionals</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-500/0 to-secondary-500/50 dark:from-secondary-400/0 dark:to-secondary-400/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/5 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 group-hover:border-secondary-500/50 dark:group-hover:border-secondary-400/50">
                <div className="text-4xl font-bold text-dark-900 dark:text-white mb-2"></div>
                <div className="text-dark-600 dark:text-dark-300">Get interventions tailored to you</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 dark:from-primary-400/30 dark:to-secondary-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/5 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 group-hover:border-primary-500/30 dark:group-hover:border-primary-400/30">
                <div className="text-4xl font-bold text-dark-900 dark:text-white mb-2"></div>
                <div className="text-dark-600 dark:text-dark-300">Scan your thoughts with various scans</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
