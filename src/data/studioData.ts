import { ProjectItem, ServiceItem, HowWeWorkStep, CourseItem } from '../types';

export const STUDIO_META = {
  name: 'Groovinto',
  location: 'Bengaluru, India',
  tagline: 'We make films — with cameras, with AI, and with everything in between.',
  email: 'groovinto@gmail.com',
  heroDescription:
    "Groovinto is a Bengaluru-based content studio building cinematic video for brands and storytellers. We shoot when a story needs a set, a face, a real place. We generate when a story needs a world that doesn't exist yet. Most of the time, we do both — in the same project.",
  aboutParagraphs: [
    "Groovinto isn't an \"AI studio\" or a \"production house.\" It's a content studio that treats both as the same toolkit.",
    "We come from screenwriting and traditional production, and we've spent the last few years building fluency in AI-assisted filmmaking — cinematic prompting, consistent characters, virtual sets, AI-voiced performances — without losing the instincts that make a story actually land: pacing, performance, sound, edit.",
    "That combination is the point. A client doesn't come to us asking for \"an AI video\" or \"a shoot.\" They come with a story, a budget, and a deadline — and we pick whichever tools (or mix of tools) gets it made at the quality it deserves."
  ],
  ctaHeadline: "Have a story? Let's figure out how to shoot it — or build it."
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ugc-ads',
    title: 'UGC Ads & Creator-Style Videos',
    tagline: 'Authentic creator energy paired with studio conversion psychology',
    summary:
      'Native, authentic User-Generated Content (UGC) and creator-style ads that do not look like polished corporate commercials. We script, cast, shoot, and edit relatable problem-solution videos, unboxings, authentic founder vlogs, and TikTok/Reels native reaction formats that build immediate trust.',
    deliverables: [
      'Authentic Creator Sourcing & Script Direction',
      'Relatable Problem-Solution & Unboxing Storyboards',
      'Native Smartphone Capture + Hybrid AI Enhancements',
      'Platform-Tuned Sound Design, Trending Audio & Caption Burn-in'
    ],
    pipelineTags: ['Authentic UGC', 'Creator Castings', 'TikTok / Reels Native', 'High Retention'],
    idealFor: 'Consumer brands, skincare & wellness, tech gadgets, fintech apps, and eCommerce looking for high trust.',
    iconName: 'Smartphone'
  },
  {
    id: 'social-media-content',
    title: 'Social Media Content & Growth Engine',
    tagline: 'Always-on viral short-form pipeline for Instagram, Shorts & TikTok',
    summary:
      'A continuous content engine producing high-frequency, algorithm-tuned short-form video. From episodic brand culture series and founder thought leadership to trend-jacking reels and micro-documentaries that grow organic followers and community engagement.',
    deliverables: [
      'Monthly Content Batching (15–30 vertical videos/month)',
      'Trend-Jacking & Viral Concept Ideation',
      'Episodic Series Architecture & Consistent Visual Branding',
      'Multi-Platform Optimization (Instagram Reels, YouTube Shorts, TikTok)'
    ],
    pipelineTags: ['Organic Growth', 'Daily Content Engine', 'Viral Hooks', 'Vertical Video'],
    idealFor: 'Personal brands, startup founders, lifestyle labels, and enterprises building an engaged social following.',
    iconName: 'Share2'
  },
  {
    id: 'narrative-brand',
    title: 'Narrative & Brand Films',
    tagline: 'Scripted, cinematic stories with heart & scale',
    summary:
      'Scripted, cinematic video — brand stories, explainers, short films — built with live-action shoots, AI generation, or a hybrid pipeline depending on scope and budget.',
    deliverables: [
      'Original Screenplays & Scriptwriting',
      'Hybrid Production Pipeline',
      'Full Cinematic Color Grade & Sound Design',
      'Broadcast & Digital Delivery Masters'
    ],
    pipelineTags: ['Live + AI Hybrid', 'Story-First', 'Cinema Sound', 'Anamorphic Grade'],
    idealFor: 'Brands looking for emotional resonance and epic scale without 8-figure studio budgets.',
    iconName: 'Clapperboard'
  },
  {
    id: 'ai-assisted',
    title: 'AI-Assisted Production',
    tagline: 'Worlds that do not exist yet, realized today',
    summary:
      "Full AI video pipelines: consistent characters, virtual locations, AI voice and performance, rapid concept-to-screen turnaround for projects that don't need a physical shoot.",
    deliverables: [
      'Character LoRAs & Identity Consistency',
      'Virtual World Building & Photoreal Sets',
      'Synthetic Neural Voice & Multilingual Localization',
      'Rapid Look-Dev & Concept-to-Screen Turns'
    ],
    pipelineTags: ['Virtual Sets', 'Consistent Personas', 'Synthetic Voice', 'Rapid Turnaround'],
    idealFor: 'Speculative fiction, high-concept visual campaigns, fintech, and hard-to-stage worlds.',
    iconName: 'Sparkles'
  },
  {
    id: 'traditional-shoots',
    title: 'Traditional Shoots & Commercials',
    tagline: 'Physical sets, genuine human emotion, optical glass',
    summary:
      'Full-crew production — direction, cinematography, sound, on-location or studio — for stories that need real performers and real places.',
    deliverables: [
      'Director & Director of Photography (DoP)',
      'Location Scouting (Bengaluru & PAN India)',
      'Casting & Talent Direction',
      'Live Location Sound Recording'
    ],
    pipelineTags: ['ARRI / RED Optics', 'Location Sets', 'Live Sound', 'Real Performers'],
    idealFor: 'Authentic founder documentaries, physical product interaction, and genuine human drama.',
    iconName: 'Film'
  }
];

export const HOW_WE_WORK_STEPS: HowWeWorkStep[] = [
  {
    step: '01',
    title: 'Story first',
    subtitle: 'Every project starts as a script, not a tool choice',
    description:
      'Before we pick a camera lens or write a neural generation prompt, we nail the emotional spine of the narrative. Pacing, dramatic tension, character stakes, and clear messaging come before technical execution.',
    quote: '"If it does not work on the page in black and white, no camera rig or AI prompt will save it."'
  },
  {
    step: '02',
    title: 'Right tool for the shot',
    subtitle: 'We decide shot-by-shot: camera, AI, or both',
    description:
      'We do not force tools where they do not belong. A close-up tear in an actor\'s eye belongs on an optical sensor with tactile lighting. A sprawling neon megalopolis in 2049 belongs in our generative world-building pipeline. We composite both into one seamless visual language.',
    quote: '"We shoot reality when it breathes best; we render imagination when reality hits a wall."'
  },
  {
    step: '03',
    title: 'One creative team, one edit',
    subtitle: 'No handoff between "AI people" and "production people"',
    description:
      'Traditional VFX studios suffer from costly silo handoffs. At Groovinto, the screenwriters, directors, AI specialists, and editors sit in the exact same room in Bengaluru. One vision, unified color science, cohesive audio, zero friction.',
    quote: '"One singular aesthetic from the opening frame to the end credits."'
  }
];

export const WHY_GROOVINTO = [
  {
    badge: 'Direction & Voice',
    title: 'Screenwriting & Directing Heritage',
    summary:
      'We come from screenwriting and directing backgrounds across languages and genres — not just prompt engineering. We understand subtext, rhythm, eye-lines, and dramatic reveals.',
    icon: 'PenTool'
  },
  {
    badge: 'Fluid Pipeline',
    title: 'In-House Live & AI Generation',
    summary:
      'Because we master both live production and generative AI under one roof, budget and timeline decide the method — not the other way around. No tool bias, just storytelling efficacy.',
    icon: 'Workflow'
  },
  {
    badge: 'Democratized Scale',
    title: 'Cinematic Quality without Cinematic Budgets',
    summary:
      'Built specifically for bold brands and creators who need high-production value, breathtaking environments, and emotional depth without astronomical 8-figure production overheads.',
    icon: 'Sparkle'
  }
];

export const SHOWCASE_PROJECTS: ProjectItem[] = [
  {
    id: 'virupaksha-oraiyan',
    title: 'Virupaksha | AI Cinematic Video for Oraiyan Group',
    client: 'Oraiyan Group',
    category: 'commercial',
    categoryLabel: 'Commercial / Real Estate',
    tagline: 'Architectural grandeur meets AI-crafted cinematic mythology for Oraiyan Group',
    description:
      'An epic commercial film produced by Groovinto for Oraiyan Group’s premier development "Virupaksha". Combines majestic architectural design, celestial golden hour lighting, and photoreal scale with cinematic mythological depth.',
    aspectRatio: '16:9',
    pipeline: {
      liveRatio: 35,
      aiRatio: 65,
      cameraGear: ['Sony FX6 Cinema Rig', 'DJI Ronin RS3 Pro', 'Anamorphic Cinema Optics'],
      aiToolchain: ['Runway Gen-3 Spatial Extension', 'Midjourney v6 Architectural Plates', 'Premiere Pro Editing Suite']
    },
    duration: '01:10',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/C-k35UKYu28/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=C-k35UKYu28',
    youtubeId: 'C-k35UKYu28',
    isShort: false,
    breakdown: {
      storyChallenge:
        'Demonstrating the monumental spiritual and architectural scale of the Virupaksha township before civil ground completion.',
      hybridSolution:
        'Captured on-site establishing plates, matched them with generative neural landscape world-building, and edited on Premiere Pro with custom orchestral percussion.',
      deliverables: ['Official Commercial 4K Master', 'Social Teaser Variations', 'Broadcast Cinema Master']
    }
  },
  {
    id: 'ai-doc-us-brands',
    title: 'AI Documentary-Style Video Production for US Brands',
    client: 'US Brand Partners',
    category: 'brand-doc',
    categoryLabel: 'Brand Documentary',
    tagline: 'Hyper-narrative AI documentary filmmaking crafted for international US brands',
    description:
      'A high-impact documentary-style production showcasing how Groovinto crafts cinematic storytelling for United States enterprise and consumer brands. Merges tactile archival textures, genuine emotional human close-ups, and fluid generative sequences.',
    aspectRatio: '16:9',
    pipeline: {
      liveRatio: 50,
      aiRatio: 50,
      cameraGear: ['Blackmagic Cinema 6K', 'Vintage Super Takumar 50mm f/1.4', 'Sennheiser MKH 416 Boom'],
      aiToolchain: ['Generative Historical Textures', 'Neural Voice Synthesis', 'ACES Color Grading in Premiere Pro']
    },
    duration: '01:45',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/df87nOm3u4E/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=df87nOm3u4E',
    youtubeId: 'df87nOm3u4E',
    isShort: false,
    breakdown: {
      storyChallenge:
        'Bridging deep cultural narratives and enterprise brand messaging with documentary-grade emotional realism for North American audiences.',
      hybridSolution:
        'Intercut tactile physical cinematography with generative neural dreamscapes, unified with subtle 16mm film grain emulation in Premiere Pro.',
      deliverables: ['Long-form Brand Film (4K)', 'LinkedIn & YouTube Cutdowns', 'B2B Investor Edit']
    }
  },
  {
    id: 'express-city-oraiyan',
    title: 'Express City AI Video Shoot for Oraiyan Groups',
    client: 'Oraiyan Groups',
    category: 'commercial',
    categoryLabel: 'Commercial / Real Estate',
    tagline: 'Next-generation urban township visual showcase blending camera lenses and AI world expansion',
    description:
      'Commercial brand film produced for Oraiyan Groups’ Express City development. Blends Bengaluru suburban location footage with photoreal AI visual enhancements, highway infrastructure expansions, and luxury lifestyle visualization.',
    aspectRatio: '16:9',
    pipeline: {
      liveRatio: 40,
      aiRatio: 60,
      cameraGear: ['Sony FX3 Cage Rig', 'DJI Mavic 3 Cine 5.1K Drone', 'Sigma Art 24-70mm f/2.8'],
      aiToolchain: ['Photoreal Township 3D Extension', 'Neural Skylight Modeling', 'Premiere Pro Lumetri Grade']
    },
    duration: '01:25',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/V6HFxuWT6B0/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=V6HFxuWT6B0',
    youtubeId: 'V6HFxuWT6B0',
    isShort: false,
    breakdown: {
      storyChallenge:
        'Showcasing a massive multi-acre suburban layout with completed lifestyle amenities while construction is ongoing.',
      hybridSolution:
        'Captured aerial drone establishing plates and matched them with photoreal AI architectural generations seamlessly blended on the timeline.',
      deliverables: ['Investor Pitch Video', 'Digital Commercial Master', 'Sales Gallery 4K Loop']
    }
  },
  {
    id: 'twelfth-man-ep1',
    title: 'The Twelfth Man | Episode 1: The Call',
    client: 'Groovinto Originals',
    category: 'episodic',
    categoryLabel: 'Hindi AI Web Series',
    tagline: 'Psychological suspense & high-stakes drama — Groovinto’s original episodic AI series',
    description:
      'Episode 1 of Groovinto’s groundbreaking Hindi AI web series "The Twelfth Man". A gripping psychological thriller blending gritty character close-ups, atmospheric suspense, and cinematic storytelling crafted through Groovinto’s hybrid AI narrative pipeline.',
    aspectRatio: '16:9',
    pipeline: {
      liveRatio: 20,
      aiRatio: 80,
      cameraGear: ['Studio Voice Recording Neumann U87', 'Tactile Texture Macro Sensors'],
      aiToolchain: ['Consistent Character Facial LoRAs', 'Runway Gen-3 Alpha', 'Dolby Atmos Sound Mixing in Premiere Pro']
    },
    duration: '02:30',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/bOc63IwSD9A/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=bOc63IwSD9A',
    youtubeId: 'bOc63IwSD9A',
    isShort: false,
    breakdown: {
      storyChallenge:
        'Maintaining character facial consistency and emotional intensity across rapid cuts and shifting mood lighting in episodic fiction.',
      hybridSolution:
        'Trained character identity embeddings and directed voice actors in studio, assembling the entire episode inside Premiere Pro with suspense foley.',
      deliverables: ['Web Series Pilot Episode (4K)', 'Character Identity Bible', 'Social Teaser Shorts']
    }
  },
  {
    id: 'taj-mahal-investigation',
    title: 'The Story History Didn’t Tell: Taj Mahal — Two Truths, One Question',
    client: 'Groovinto Productions',
    category: 'narrative',
    categoryLabel: 'Historical Narrative',
    tagline: 'Recreating forgotten historical epochs with photoreal AI cinematography and architectural precision',
    description:
      'An investigative cinematic film exploring the architectural mysteries, legends, and dual perspectives surrounding the Taj Mahal. High-end historical reconstructions with dramatic chiaroscuro lighting and intricate period detailing.',
    aspectRatio: '16:9',
    pipeline: {
      liveRatio: 25,
      aiRatio: 75,
      cameraGear: ['Historical Reference Texture Scans', 'Optical Prism Elements'],
      aiToolchain: ['17th Century Mughal Architecture Models', 'Kling AI Motion Latents', 'Premiere Pro Audio Mix']
    },
    duration: '03:15',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/BGU4JF6d6YA/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=BGU4JF6d6YA',
    youtubeId: 'BGU4JF6d6YA',
    isShort: false,
    breakdown: {
      storyChallenge:
        'Depicting 17th-century Mughal craftsmanship, marble quarrying, and royal chambers without multimillion-dollar period sets.',
      hybridSolution:
        'Engineered historically grounded prompt embeddings and camera motion vectors with meticulous acoustic sound foley.',
      deliverables: ['Historical Investigation Cut', 'YouTube Master 4K', 'Vertical Teasers']
    }
  },
  {
    id: 'taj-mahal-trailer',
    title: 'Taj Mahal Ka Sach (Official Cinematic Trailer)',
    client: 'Groovinto Productions',
    category: 'narrative',
    categoryLabel: 'Cinematic Teaser',
    tagline: 'High-tempo dramatic teaser showcasing epic scale, lighting, and historical reconstructions',
    description:
      'The official cinematic trailer for "Taj Mahal Ka Sach". Fast-paced editorial cutting, thunderous sound design, and sweeping historical sequences demonstrating the power of AI-accelerated film trailers.',
    aspectRatio: '16:9',
    pipeline: {
      liveRatio: 30,
      aiRatio: 70,
      cameraGear: ['Cinema Color Calibration Suite', 'Surround Sound Mixing Monitors'],
      aiToolchain: ['Dynamic Pace Generation', 'Audio Beat Syncing', 'Premiere Pro Edit & Sound FX']
    },
    duration: '00:58',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/f2AQrv63ZTg/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=f2AQrv63ZTg',
    youtubeId: 'f2AQrv63ZTg',
    isShort: false,
    breakdown: {
      storyChallenge:
        'Building immense suspense and visual punch in under 60 seconds to drive audience anticipation.',
      hybridSolution:
        'Micro-cut pacing matched to heavy orchestral beats with deep bass drops and rapid visual flashes in Premiere Pro.',
      deliverables: ['Official Teaser Trailer (4K)', 'Social Media 9:16 Re-edits']
    }
  },
  {
    id: 'short-dashverse',
    title: 'DashVerse | AI Micro-Series Episode Sample',
    client: 'Groovinto Originals',
    category: 'shorts',
    categoryLabel: 'YouTube Short (9:16)',
    tagline: 'Fast-paced speculative sci-fi micro-episode engineered for viral vertical video retention',
    description:
      'An action-packed vertical micro-series sample crafted for YouTube Shorts and Instagram Reels. Dynamic kinetic pacing, high-speed visual hooks, and immersive cyberpunk aesthetics built for smartphone screens.',
    aspectRatio: '9:16',
    pipeline: {
      liveRatio: 20,
      aiRatio: 80,
      cameraGear: ['Vertical Framing 9:16 Rig', 'Wireless Audio Interface'],
      aiToolchain: ['Neural Motion Sync', 'Kinetic Typography Engine', 'Premiere Pro Vertical Timeline']
    },
    duration: '00:30',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/qw24qBoXoe0/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/shorts/qw24qBoXoe0',
    youtubeId: 'qw24qBoXoe0',
    isShort: true,
    breakdown: {
      storyChallenge:
        'Retaining viewer attention in the first 1.5 seconds on fast-scrolling vertical video feeds.',
      hybridSolution:
        'Designed a high-velocity visual hook followed by progressive disclosure storytelling tuned for loop replayability.',
      deliverables: ['YouTube Short 9:16 Master', 'Instagram Reel Version', 'Subtitled Cut']
    }
  },
  {
    id: 'short-emperor-mughal',
    title: 'When the Emperor Speaks, History Listens | Cinematic Mughal Short',
    client: 'Groovinto Productions',
    category: 'shorts',
    categoryLabel: 'YouTube Short (9:16)',
    tagline: 'Dramatic character monologue with period lighting and photoreal imperial court rendering',
    description:
      'A dramatic historical short focusing on the raw commanding presence of an imperial ruler. Intense eye-contact, majestic palace interiors, and rich acoustic vocal resonance crafted for vertical viewing.',
    aspectRatio: '9:16',
    pipeline: {
      liveRatio: 25,
      aiRatio: 75,
      cameraGear: ['Binaural Audio Microphone', 'Optical Diffusion Lens Filter'],
      aiToolchain: ['Photoreal Imperial Costume Models', 'Lip-Sync Animation Matrix', 'Premiere Pro Color Grade']
    },
    duration: '00:35',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/kr3bERgLuR8/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/shorts/kr3bERgLuR8',
    youtubeId: 'kr3bERgLuR8',
    isShort: true,
    breakdown: {
      storyChallenge:
        'Conveying supreme authority and historical gravitas in a vertical smartphone format.',
      hybridSolution:
        'Tight close-up framing with hyper-detailed facial textures and rich voice acoustics mastered in Premiere Pro.',
      deliverables: ['9:16 Vertical Short', '4K Archival Master']
    }
  },
  {
    id: 'short-secret-file',
    title: 'The Secret File They Tried to Hide... | Cinematic Short',
    client: 'Groovinto Originals',
    category: 'shorts',
    categoryLabel: 'YouTube Short (9:16)',
    tagline: '3-second hook driven classified thriller micro-short optimized for high engagement',
    description:
      'A high-tension mystery short built around a declassified secret dossier. Fast cuts, gritty document textures, suspenseful stingers, and a viral narrative cliffhanger.',
    aspectRatio: '9:16',
    pipeline: {
      liveRatio: 30,
      aiRatio: 70,
      cameraGear: ['Macro Lens for Physical Paper and Seal Textures'],
      aiToolchain: ['Classified Document Generators', 'Neural Audio Stinger FX', 'Premiere Pro Motion Graphics']
    },
    duration: '00:28',
    year: '2025',
    coverImage: 'https://img.youtube.com/vi/iNptn69sgDI/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/shorts/iNptn69sgDI',
    youtubeId: 'iNptn69sgDI',
    isShort: true,
    breakdown: {
      storyChallenge:
        'Hooking suspense enthusiasts within 2 seconds using sensory tactile elements and mystery.',
      hybridSolution:
        'Macro physical paper burning combined with generative conspiracy photoreal plates and rapid sound design.',
      deliverables: ['Vertical 9:16 Short', 'Hook Test Variants']
    }
  }
];

export const HYBRID_COMPARISON_SLICES = [
  {
    label: 'Live Set Capture',
    tools: 'ARRI Alexa Mini + Optical Glass + Ambient Studio Light',
    description: 'Real actor emotion, physical texture, and authentic human presence on set.',
    tag: 'Physical Stage',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop'
  },
  {
    label: 'AI World Extension',
    tools: 'Neural Depth Inpainting + Custom LoRA + Virtual Set Backgrounds',
    description: 'Expanding physical walls into boundless sci-fi skylines or period landscapes.',
    tag: 'Generative Scale',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
  },
  {
    label: 'Unified Cinematic Grade',
    tools: 'Premiere Pro Editing & Master Color + 5.1 Dolby Sound Design',
    description: 'One seamless film where camera and AI merge into an undeniable singular vision.',
    tag: 'Mastered Film',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop'
  }
];

export const COURSES: CourseItem[] = [
  {
    id: 'ai-video-production',
    title: 'AI Video Production Course',
    category: 'ai-video',
    subtitle: 'From Prompt Craft & Character Consistency to Complete Film in 2 Days',
    tagline: '2-Day live studio masterclass mastering the bleeding edge of AI cinema',
    duration: '2 Days (Live Studio Bootcamp)',
    level: 'Beginner to Advanced Creators',
    format: '2-Day Live Intensive Studio Workshop + Hands-on Production',
    badge: '2-Day Live Course',
    pricing: {
      originalPrice: 20000,
      offerPrice: 4999,
      currency: 'INR',
      currencySymbol: '₹',
      discountPercentage: 75,
      savings: 15001,
      priceNote: '2-Day Live Workshop Special · 75% OFF',
      limitedSeats: 'Limited Seats Available'
    },
    summary:
      'A power-packed 2-day intensive live studio masterclass where you learn our complete commercial AI cinema pipeline. Over two intensive days, you will master prompt craft, generate consistent characters, control camera motion in Runway & Kling AI, direct neural voice acting, and composite live footage with AI in Premiere Pro Editing to walk away with your own finished commercial film.',
    curriculum: [
      {
        module: 'Module 01: Foundations & The Cinematic Prompt Lexicon',
        topics: [
          'Deconstructing lighting, lenses (anamorphic, spherical), f-stops, and shutter angles in generative models',
          'Prompt weights, negative prompts, seed management, and visual consistency principles',
          'Style anchoring: developing distinctive aesthetic moodboards without generic AI tropes'
        ]
      },
      {
        module: 'Module 02: Consistent Characters, Face Identity & LoRAs',
        topics: [
          'Building persistent characters across varied environments and dramatic emotional arcs',
          'Multi-angle reference sheets, FaceID pipelines, and custom LoRA model fine-tuning',
          'Maintaining costume, lighting, and age consistency across shot sequences'
        ]
      },
      {
        module: 'Module 03: Virtual Cinematography & Motion Control',
        topics: [
          'Directing camera movement: pans, tracking shots, dolly zooms, and whip transitions',
          'Mastering Runway Gen-3 Alpha, Kling AI, Luma Dream Machine & Sora workflows',
          'Motion brush painting, camera trajectory vectors, and temporal stability control'
        ]
      },
      {
        module: 'Module 04: Synthetic Voices, Spatial Audio & Foley Sound Design',
        topics: [
          'Emotion-driven voice synthesis with ElevenLabs and neural speech direction',
          'Cinematic sound layering: sub-bass rumbles, ambient soundscapes, and spot foley effects',
          'AI-assisted musical score composition and tempo-matched edit pacing'
        ]
      },
      {
        module: 'Module 05: The Hybrid Pipeline: Merging Camera Shoots & AI',
        topics: [
          'Green-screen plate integration and generative depth inpainting in Premiere Pro Editing',
          'Grain matching, optical halation, film stock emulation, and 4K neural upscaling',
          'Fixing visual artifacts, temporal flicker removal, and clean commercial finishing'
        ]
      },
      {
        module: 'Module 06: Client Packaging, Commercial Pitching & Capstone Film',
        topics: [
          'Producing your own original 60-second festival-ready master film project',
          'Packaging AI production services for commercial brands, agencies, and studios',
          'Pricing, client contracts, intellectual property rights, and Groovinto Studio Certification'
        ]
      }
    ],
    outcomes: [
      'Direct, edit, and master broadcast-grade AI and hybrid films independently',
      'Deploy reproducible character and style models for commercial client work',
      'Command the leading AI filmmaking suite (Runway, Kling, Midjourney, ElevenLabs, Premiere Pro Editing)',
      'Complete a professional showcase portfolio piece reviewed by Groovinto directors'
    ],
    toolsOrMethods: [
      'Runway Gen-3 Alpha',
      'Midjourney v6',
      'Kling AI',
      'Luma Dream Machine',
      'ElevenLabs Voice AI',
      'Premiere Pro Editing',
      'Topaz Video AI'
    ],
    idealFor:
      'Filmmakers, video editors, creative directors, content creators, and agencies eager to lead the generative cinema revolution.'
  },
  {
    id: 'mind-training',
    title: 'Mind Training Course',
    category: 'mind-training',
    subtitle: 'Rewiring Creative Psychology, Unshakable Focus & Flow State Mastery',
    tagline: 'Complete pre-recorded video masterclass with instant lifetime access',
    duration: 'Pre-Recorded (Instant Lifetime Access)',
    level: 'All Creators, Founders & Storytellers',
    format: 'Pre-Recorded Video Course · Self-Paced · Watch Anytime',
    badge: 'Pre-Recorded Course',
    pricing: {
      originalPrice: 5000,
      offerPrice: 399,
      currency: 'INR',
      currencySymbol: '₹',
      discountPercentage: 92,
      savings: 4601,
      priceNote: 'Pre-Recorded Special · 92% OFF',
      limitedSeats: 'Limited Seats Available'
    },
    summary:
      'A comprehensive, self-paced pre-recorded video masterclass designed to rewire the psychological operating system of your mind. Get instant lifetime access to high-definition video modules, guided audio drills, and neuro-focus protocols to eliminate creative resistance, dissolve perfectionism under deadlines, and systematically tap into peak flow states on command.',
    curriculum: [
      {
        module: 'Module 01: The Neuroscience of Attention & Flow Architecture',
        topics: [
          'Understanding dopamine loops, focus gating, and default mode network (DMN) down-regulation',
          'The 4-stage flow cycle: Struggle, Release, Flow, Recovery — and how to trigger it daily',
          'Designing an immune environment against digital distraction and cognitive fragmentation'
        ]
      },
      {
        module: 'Module 02: Dissolving Resistance, Perfectionism & Impostor Syndrome',
        topics: [
          'Cognitive reframing techniques for fear of judgment, blank-page paralysis, and self-sabotage',
          'Separating creative ego from execution: the professional vs. amateur psychological threshold',
          'Micro-exposure therapy to shipping work quickly without agonizing anxiety'
        ]
      },
      {
        module: 'Module 03: Vision Architecture & Deep Intuitive Storytelling',
        topics: [
          'Connecting to emotional truth: uncovering high-voltage story concepts from life experience',
          'Divergent vs. convergent thinking protocols: how to generate 50 ideas without judgment',
          'Mental visualization drills used by visionary film directors and elite athletes'
        ]
      },
      {
        module: 'Module 04: High-Stakes Resilience & Sustainable Creative Longevity',
        topics: [
          'Breathwork and somatic vagus nerve reset protocols for high-pressure pitches and client calls',
          'Sleep architecture, cognitive nutrition, and active nervous system recovery',
          'Constructing your personalized lifelong creative ritual and non-negotiable mental toolkit'
        ]
      }
    ],
    outcomes: [
      'Enter sustained 90-minute deep creative flow states on demand within minutes',
      'Eradicate chronic procrastination, creative burnouts, and blank-page dread',
      'Communicate vision and lead creative productions with grounded, unshakeable calm',
      'Build a resilient mental framework that sustains decades of high-impact creative output'
    ],
    toolsOrMethods: [
      'Cognitive Flow Protocols',
      'Somatic Reset & Breathwork',
      'Deep Work Time Blocking',
      'Divergent Ideation Frameworks',
      'Mental Toughness Drills',
      'Personal Operating System Audit'
    ],
    idealFor:
      'Directors, writers, entrepreneurs, designers, and creative minds seeking clarity, emotional resilience, and peak mental performance.'
  }
];

