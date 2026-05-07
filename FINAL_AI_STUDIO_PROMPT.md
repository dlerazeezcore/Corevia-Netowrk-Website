# Corevia Network Website — Final AI Studio Prompt

Upload or paste this prompt in AI Studio to seamlessly modify, rebuild, or maintain the **Corevia Network** website without losing its core business concept, design system, or layout.

---

### Corevia Network - Business systems, operations, and technology solutions

Build and refine a polished, premium, professional one-page portfolio website for **Corevia Network**. 

**1. Business Concept:**
- Corevia Network is a business systems, operations, and technology company. They assemble operational foundations for companies (software, HR, PBX, CRM). 
- Corevia Network has a subsidiary named **Peak Travel**, for which they have developed a travel app called **Tulip Booking**. This relationship must be clearly shown on the app.

**2. Design & Styling:**
- **Vibe:** Polished, elegant, corporate, tech-forward, yet accessible. High contrast, dark mode.
- **Colors:**
  - Background: Deep black/dark gray (`#0A0A0A`, `#111111`, `#1A1A1A`)
  - Accent Color: A vibrant, professional yellow/lime (`#D8FF44`). Use this yellow tastefully for highlights, active links, hover states, border-tops, active lines, and checkmarks to bring warmth to the corporate vibe. 
  - Blue (`#173FFF`) should be used strictly as a subtle background glow if needed.
- **Typography:**
  - Use elegant, sharp sans-serif fonts: `Outfit` for headings and `Open Sans` for body text.
- **Logos:**
  - The standard Corevia Network logo is black text. Always apply CSS (`brightness-0 invert`) or equivalent logic to make the logo large, white, and prominent inside the dark hero header.
  - Keep the Tulip Booking logo crisp.

**3. Layout & Structure:**
- **Navigation:** Home, Services, About Us, Contact Us.
- **Hero:** Big, bold Typography, subtle deep gradients. "Business systems, operations, and technology solutions for modern companies." Includes "Explore Our Services" and "Contact Us" buttons.
- **Services (Cards):** Cards covering Business Consultancy, Accounting Software, HR, PBX Systems, CRM/Sales support, and Travel Technology.
  - *Interaction:* Cards should have a subtle premium hover effect (e.g., slight lift, soft shadow glow using the yellow accent, hover border shift). Assign professional icons (e.g., Lucide React icons) for each service.
- **Tulip Booking Showcase:** A specialized section explaining Tulip Booking by Peak Travel. 
  - *Layout:* On the left, a grouped title area showing the Tulip Logo seamlessly next to its title.
  - *Visual Area:* On the right, instead of a plain image, create an abstract 2x2 grid card showing travel icons with subtle animations (Hotel, Flights, eSIM, Transfers) matching the theme and yellow accent colors.
  - *CTAs:* Include links to the App Store and Google Play.
- **About Us:** Two-column text blocks explaining what Corevia Network does and its relationship to Peak Travel / Tulip Booking.
  - *Interaction:* Add smooth, professional fade-in scroll animations for the text blocks. Not overly flashy, just polished.
- **Contact Us:** A clean, wide form offering inputs for Name, Company, Email, Phone, and Message. Success state is a big animated Checkmark.
- **Footer:** Crisp, large logo, links, copyright.

**4. Code Constraints:**
- React, Vite, Tailwind CSS. `motion/react` for scroll animations (`Fade In`, `whileInView`).
- No placeholder text. All text must reflect the exact business copy of Corevia Network as seen in the website.
- Do not redesign from scratch; preserve this precise layout and conceptual direction, simply continuing to refine it as needed.
