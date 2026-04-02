---
title: "Pixel Vanguard"
description: "A 2.5D side-scrolling action platformer with pixel-art aesthetics and a fluid 30-move combo system. Built with Unreal Engine 5 using Paper2D."
tags: ["Unreal", "C++", "Blueprint", "2.5D"]
cover: "/images/projects/pixel-vanguard.jpg"
date: "2023-08"
github: "https://github.com/yourusername/pixel-vanguard"
featured: true
---

## Overview

Pixel Vanguard blends retro pixel art with modern 3D lighting, creating a distinctive 2.5D look. The combo system tracks timing windows between attacks to chain special moves.

## Key Features

- 30-move combo system with input buffering
- Dynamic parallax background with 8 independent scroll layers
- Custom pixel art shaders in Unreal's Material editor
- Full controller support with haptic feedback

## Technical Highlights

The combo system uses a **Finite State Machine** in C++ with a 200ms input buffer, allowing forgiving yet precise combat. The pixel art aesthetic is achieved by rendering to a low-res render target then upscaling — no post-process cheats.
