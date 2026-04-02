---
title: "Void Engine"
description: "An interactive 3D space exploration experience built for the browser using Three.js and WebGL. Real-time procedural nebulae, 10,000-star systems, and a generative ambient soundtrack."
tags: ["Web", "Three.js", "TypeScript", "WebGL"]
cover: "/images/projects/void-engine.jpg"
date: "2024-11"
github: "https://github.com/yourusername/void-engine"
demo: "https://void-engine.vercel.app"
featured: true
---

## Overview

Void Engine started as a weekend experiment — "can I make space feel *real* in a browser?" Eight weeks later it became a fully interactive galaxy explorer with procedural content generation at every scale.

## Key Features

- 10,000 instanced star meshes rendered at 60fps via GPU instancing
- Procedural nebulae using 3D simplex noise and additive blending shaders
- Generative ambient audio synced to player position
- Mouse parallax and gyroscope tilt on mobile

## Technical Highlights

Stars are rendered as a single `InstancedMesh` with per-instance color and size. Nebulae are **raymarched GLSL shaders** that sample 4 octaves of Perlin noise — the math for this took longer than everything else combined. The generative audio uses the **Web Audio API** with oscillators tuned to a pentatonic scale.
