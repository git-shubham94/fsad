import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: "transparent" }
        },
        fpsLimit: 120,

        particles: {
          number: {
            value: 55,
            density: { enable: true, area: 900 }
          },

          color: {
            value: ["#ffffff", "#00f7ff", "#ffd700"] // white + neon + gold
          },

          shape: {
            type: "circle"
          },

          opacity: {
            value: 0.4,
            random: true
          },

          size: {
            value: { min: 1, max: 4 }
          },

          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: "out"
          },

          links: {
            enable: true,
            distance: 170,
            color: "#00f7ff",
            opacity: 0.15,
            width: 1
          }
        },

        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" }
          },
          modes: {
            repulse: { distance: 120 }
          }
        },

        detectRetina: true
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  );
};

export default ParticleBackground;