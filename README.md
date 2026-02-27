# EduThumb Pro — Advanced Educational Thumbnail Studio

EduThumb Pro is a web-based, advanced thumbnail generator tailored specifically for educational content creators. Whether you are creating videos for university admissions, job preparations, or core academic subjects, EduThumb Pro allows you to bulk-generate high-quality thumbnails with ease directly from your browser.

## Features

- **Bulk Generation:** Input multiple titles (one per line) and generate a batch of thumbnails instantly.
- **Dynamic Layouts & Aspect Ratios:** Choose from different templates and standard aspect ratios (16:9, 4:3, 1:1, 9:16, 21:9).
- **Customizable Backgrounds:** Use gradients, mesh, patterns, or solid colors with intuitive color pickers and randomization options.
- **Advanced Typography:** A curated selection of modern fonts (Poppins, Playfair Display, Rajdhani, Noto Serif Bengali, etc.) with customizable text effects (shadow, glow, 3D, outline), alignment, and sizes.
- **Overlays & Effects:** Add subject-specific floating icons (Math, Science, Job Prep, etc.), geometric shapes, math formulas, progress bars, vignette, and noise textures.
- **Branding & Tags:** Add labels/badges (e.g., NEW, HOT, 2024, PDF, BCS), custom watermarks, and website URLs to protect and brand your content.
- **Easy Export:** Export individual thumbnails or download all as a ZIP file in JPEG, PNG, or WebP formats at adjustable quality settings.

## Tech Stack

- **HTML5** & **CSS3** for a modern, responsive user interface.
- **Vanilla JavaScript** (with Canvas API) for the live preview and thumbnail generation.
- **JSZip** library to compile thumbnails into a downloadable ZIP archive.
- **Google Fonts** for rich typography support.

## Usage

1. **Clone or Download** the repository.
2. Simply open the `index.html` file in your modern web browser.
3. Use the **Sidebar** to configure your texts, template, background, typography, effects, and branding.
4. Preview the template in the **Live Preview** section.
5. Click **Generate Thumbnails** to create your thumbnails beneath the preview.
6. Download them individually or use the **Download ZIP** button to get them all at once.

## Project Structure

```text
.
├── index.html       # The main application interface
├── css/
│   └── style.css    # Styles for the application
├── js/
│   └── main.js      # Core logic for Canvas drawing and UI handling
└── README.md        # Project documentation
```

## Status

Currently an active local build, ready for production use by content creators.
