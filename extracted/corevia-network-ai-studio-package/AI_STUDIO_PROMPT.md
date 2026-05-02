# AI Studio Prompt: Corevia Network Website Generation

You are generating the final website. Use this package as the complete source of truth.

## Objective
Create a premium, production-ready, one-page corporate website for **Corevia Network**.

Do not create a generic template. Recreate the same visual design direction as the provided template reference files in `template-reference/`.

## Must-Use Reference Inputs
1. Template visual references in:
- `template-reference/images/preview.jpg`
- `template-reference/stylesheets/style.css`
- `template-reference/stylesheets/sub-style.css`
- `template-reference/stylesheets/_sub-base-variable.scss`
- `template-reference/template.conf`
- `template-reference/sub-visual-editor.conf`

2. Brand assets:
- Primary brand logo: `assets/corevia/corevia-network-logo.svg`
- Fallback logo: `assets/corevia/corevia-network-logo.png`
- Tulip logo (prefer SVG): `assets/tulip-booking/tulip-booking-logo.svg`
- Tulip logo fallback: `assets/tulip-booking/tulip-booking-logo.png`

3. App links:
- App Store: `assets/app-links/app-store-link.txt`
- Google Play: `assets/app-links/google-play-link.txt`

## Visual Style Requirements (match template direction)
Apply the same design language from the template reference:
- Background style: deep near-black base (`#0A0A0A`) with layered depth, subtle overlays, and selective glow accents.
- Accent color: neon-lime style (`#D8FF44`) used intentionally for CTA, active nav states, highlight strips, and key callouts.
- Core contrast: dark surfaces + light text (`#FFFFFF`) + muted dark gray support (`#4A4A4A`).
- Typography feel: bold geometric headings and clean readable sans body text. Match the high-impact heading rhythm from the reference.
- Spacing: premium whitespace, consistent vertical rhythm, generous section spacing.
- Buttons: pill-shaped/rounded CTAs with contrast inversion on hover (lime-on-dark and dark-on-lime patterns).
- Cards: rounded containers, strong hierarchy, high-contrast text, clean shadows/borders.
- Header: clean top navigation, minimal clutter, anchor links, active-state emphasis.
- Footer: compact but premium multi-column/structured layout with brand block and navigation links.
- Effects: subtle shadows, radius, overlays, and glow accents only where useful; avoid noisy effects.

## Website Type and Navigation
Build a **single-page website** with anchor navigation.

Navigation items must be exactly:
- Home
- Services
- About Us
- Contact Us

Do not include extra menu tabs.

## Website Content (use exactly, no lorem ipsum)

### 1) Home / Hero
Headline:
Corevia Network

Subheadline:
Business systems, operations, and technology solutions for modern companies.

Description:
Corevia Network helps companies build the operational foundation they need to grow. From accounting software and HR administration to PBX communication systems and sales support channels, we design and implement the tools that keep businesses organized, connected, and scalable.

Primary button text:
Explore Our Services

Secondary button text:
Contact Us

Hero requirement:
Follow the visual style of the provided template/demo.

### 2) Services
Section title:
Our Services

Intro:
We help companies implement the systems, processes, and tools needed to operate professionally and efficiently.

Service cards:
1. Business Consultancy
Description: We support companies with operational planning, system selection, workflow design, and digital transformation guidance.

2. Accounting Software Setup
Description: We help businesses configure and implement accounting platforms, organize charts of accounts, and build reliable financial workflows.

3. Administration & HR
Description: We assist with administrative structures, HR systems, employee management processes, and internal documentation.

4. PBX & Communication Systems
Description: We set up PBX, call management, business phone systems, and communication tools that help teams stay connected.

5. Sales & Support Channels
Description: We implement sales pipelines, customer support channels, CRM tools, ticketing systems, and client communication workflows.

6. Travel Technology
Description: Through our subsidiary Peak Travel, we develop and support travel technology products such as Tulip Booking.

### 3) Tulip Booking / Peak Travel
Section title:
Tulip Booking by Peak Travel

Subtitle:
A mobile travel app developed by Corevia Network for Peak Travel.

Description:
Tulip Booking brings essential travel services into one mobile experience. Users can access flights, hotels, eSIM services, transfers, and other travel solutions through a simple and convenient app designed for modern travelers.

Required in this section:
- Use Tulip Booking logo from package assets.
- Clearly state that Peak Travel is a subsidiary of Corevia Network.
- Include App Store button/link:
  https://apps.apple.com/us/app/tulip-booking/id6759516330
- Include Google Play button/link:
  https://play.google.com/store/apps/details?id=com.theesim.app&hl=en-US

If official store badges are unavailable, create styled buttons that match the template design style.

### 4) About Us
Section title:
About Corevia Network

Content:
Corevia Network is built to help companies operate with structure, clarity, and reliable systems. We combine consultancy, business software implementation, administration, HR support, communication systems, and sales support tools into one practical service model.

Our work focuses on helping companies move away from scattered manual processes and toward organized, scalable digital operations. Whether a company needs accounting software, HR workflows, PBX systems, CRM setup, or customer support channels, Corevia Network provides the planning and implementation needed to make those systems work together.

Corevia Network also develops and manages technology projects, including Tulip Booking for Peak Travel.

### 5) Contact Us
Section title:
Contact Us

Description:
Ready to set up better systems for your company? Contact Corevia Network to discuss your business needs.

Contact form fields:
- Full Name
- Company Name
- Email Address
- Phone Number
- Message
- Submit button

Form behavior:
- Frontend validation required.
- If backend is unavailable, provide clean frontend-only success feedback state.

### 6) Footer
Footer brand text:
Corevia Network

Footer description:
Business systems, operations, and technology solutions.

Footer links:
- Home
- Services
- About Us
- Contact Us

Include Tulip Booking App Store and Google Play links in footer only if it fits the design cleanly.

## Asset and Branding Rules
- Use **Corevia Network** naming everywhere.
- Do not use "Corevia Consultants" anywhere.
- Use `assets/corevia/corevia-network-logo.svg` as the primary logo source.
- Use Tulip logo only in the Tulip section and where relevant.

## Responsive and Code Requirements
- Build fully responsive layout for desktop, tablet, and mobile.
- Preserve premium visual hierarchy at all breakpoints.
- Use semantic HTML, clean CSS (or modern framework output), and maintainable structure.
- Generate production-ready frontend code.
- Do not include placeholder text or lorem ipsum.
- Do not add sections not requested.

## Final Output Expectations
Produce a complete polished one-page website implementation matching this content and the template visual direction, with anchored navigation and professional interaction states.
