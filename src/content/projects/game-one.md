---
title: "Neon Labyrinth"
description: "A top-down roguelike dungeon crawler set in a cyberpunk megacity. Procedurally generated levels, 50+ enemy types, and a synth-wave soundtrack."
tags: ["Unity", "C#", "Procedural Generation", "2D"]
cover: "/images/projects/neon-labyrinth.jpg"
date: "2024-03"
github: "https://github.com/yourusername/neon-labyrinth"
demo: "https://yourusername.itch.io/neon-labyrinth"
featured: true
---

## Overview

Neon Labyrinth is a fast-paced roguelike built in Unity over 8 months. Players navigate procedurally generated floors filled with cyberpunk enemies, collect power-ups, and fight bosses.

## Key Features

- Procedural dungeon generation using BSP tree algorithm
- 50+ enemy types with behaviour trees (patrol, chase, attack)
- Dynamic lighting system with real-time neon glow shaders
- Steam leaderboard integration

## Technical Highlights

The dungeon generator uses a **Binary Space Partitioning** tree to carve rooms, then connects them with corridors using A* pathfinding. Enemy AI is driven by a custom **Behaviour Tree** framework built from scratch — no third-party AI package.
