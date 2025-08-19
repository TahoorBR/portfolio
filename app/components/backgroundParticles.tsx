/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        background: { color: "#0b1216" },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: ["repulse", "grab"],
            },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 150, duration: 0.6 },
            grab: { distance: 200, links: { opacity: 0.7 } },
            push: { quantity: 4 },
          },
        },
        particles: {
          color: { value: "#00c8b8" },
          links: {
            color: "#00f0d0",
            distance: 150,
            enable: true,
            opacity: 0.6,
            width: 1.5,
            blink: true,
            triangles: { enable: true, color: "#007663", opacity: 0.1 },
          },
          collisions: { enable: false },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 2,
            straight: false,
          },
          number: { density: { enable: true, area: 800 }, value: 80 },
          opacity: {
            value: { min: 0.3, max: 0.9 },
            animation: { enable: true, speed: 1.5, minimumValue: 0.3, sync: false },
          },
          shape: { type: "circle" },
          size: { value: { min: 2, max: 6 }, animation: { enable: true, speed: 3, minimumValue: 2, sync: false } },
          font: { value: "'Exo 2', sans-serif" }
        },
        detectRetina: true,
      }}
    />
  );
}
