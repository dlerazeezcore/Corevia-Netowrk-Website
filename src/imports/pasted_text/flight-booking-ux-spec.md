Create a production-ready frontend implementation and UX specification for a premium mobile flight booking experience inside the Tulip app.

Important context:
- This flow must be GENERAL for all airlines, not designed as if Tulip only sells Eurowings.
- Some airlines have fare families and some do not.
- The UI, data model, logic, and component structure must support both:
  1. airlines with fare families such as Basic / Smart / Biz
  2. airlines without fare families, where a single flight offer can be selected directly
- Use Eurowings only as one example for mock data and one reference for how fare-family content may appear.
- Do not design the product around Eurowings branding, layout, or business rules.
- The result must feel professional, premium, scalable, airline-agnostic, and fully aligned with Tulip’s design system and consistency standards.

Your task:
Produce a very detailed frontend implementation prompt and a screen-by-screen UX specification document for a mobile app flight booking flow.

The experience starts from Home and includes:
- activating Flights on Home
- entering the flight search flow
- searching for flights
- choosing trip type
- selecting airports
- selecting dates from a beautiful premium calendar
- selecting passengers including adults, children, and infants
- viewing search results
- selecting a flight
- conditionally selecting a fare family only when that airline/offer supports fare families
- continuing with the selected offer

The final output should be structured for frontend developers and UX/product designers and must cover:
- product goals
- UX principles
- screen-by-screen behavior
- component requirements
- interaction states
- data scenarios
- conditional logic
- accessibility expectations
- mobile responsiveness
- mock data behavior
- edge cases
- acceptance criteria

Design and product direction:
The experience must feel more premium, modern, and polished than the airline screenshots provided as references.
Use the screenshots only to understand:
- common flight search structure
- fare-family concepts
- fare information hierarchy
Do NOT copy their visual design.
Create a more professional and cleaner experience with stronger hierarchy, better spacing, more elegant cards, clearer actions, and better conversion flow.

General UX requirements:
- Follow Tulip design guidelines across every screen
- Preserve consistency in colors, spacing, typography, shadows, radius, iconography, labels, input patterns, chips, cards, CTAs, sheets, and transitions
- Keep the experience airline-agnostic
- Support both one-way and round-trip
- Support adults, children, and infants
- Support airlines with and without fare families
- Clearly distinguish between flight selection and fare selection
- Never force a fare-family step for airlines that do not provide fare families
- Make the search experience feel premium, calm, and efficient
- Make the results experience easy to scan and trustworthy
- Make the fare-family comparison easy to understand when shown
- Keep the UI conversion-oriented but not aggressive
- All pages must feel like one unified product

Functional rule for fare families:
- Fare-family UI is conditional.
- If the selected airline/offer includes multiple branded fares, show a fare-family selection module after the user selects the flight.
- If the selected airline/offer does not include fare families, allow direct selection of the flight offer and continue without a fare-family comparison screen.
- The product architecture, components, and state management must support both cases cleanly.

Mock data scenario:
Use one search scenario for demonstration:
- Origin: EBL
- Destination: DUS
- Departure date: 1 Jun
- Trip type: One Way
- Passengers: 1 Adult

Results behavior for the mock:
- Include at least one Eurowings flight result from EBL to DUS on 1 Jun
- For this Eurowings result, show an example airline that has fare families
- Also structure the product so other mock results can represent airlines without fare families
- Use mock data that demonstrates both logic paths:
  1. a result with fare families
  2. a result without fare families

Example fare-family scenario for one airline such as Eurowings:
- Basic
- Smart
- Biz
These are only example branded fares, not a global rule for all airlines.
The UI and code must not hardcode these names as platform-wide assumptions.

Now generate the deliverable in the following exact structure:

SECTION 1. PRODUCT OVERVIEW
Write a concise but professional summary of the feature, its goals, and the business/user value.
Explain that the system supports standard flight offers and branded fare-family offers depending on airline response.

SECTION 2. CORE UX PRINCIPLES
Define the UX principles for the whole flight booking flow.
Include principles such as:
- clarity first
- premium simplicity
- progressive disclosure
- trust and transparency
- consistency across screens
- fast scanability
- low-friction input
- conditional complexity only when needed
- airline-agnostic architecture and UI

SECTION 3. USER FLOW
Describe the full mobile user flow step by step:
1. Home
2. Tap Flights
3. Open search
4. Choose trip type
5. Choose origin and destination
6. Choose date(s)
7. Choose passengers
8. Tap search
9. View results
10. Select a flight
11. If fare families exist, select fare family
12. If fare families do not exist, continue directly
13. Review selected offer summary
14. Continue

SECTION 4. SCREEN-BY-SCREEN UX SPECIFICATION
For each screen below, write a detailed UX specification using the subheadings:
- Purpose
- Layout structure
- Key components
- User actions
- States
- Validation
- Transition behavior
- UX notes

The screens to cover are:

Screen 1. Home with Flights entry point
Requirements:
- Flights must be clearly discoverable on home
- Should feel integrated and premium
- Can be a service card, booking shortcut, or prominent travel module
- Must align with Tulip brand and home screen patterns
- Include state when Flights is active/selected

Screen 2. Flight Search main screen
Requirements:
- Show trip type toggle: One Way / Round Trip
- Show origin and destination inputs
- Show swap action
- Show departure and return date fields
- For one-way, return should be hidden or visually inactive
- Show passenger selector summary
- Show clear primary Search CTA
- Search container should feel elegant and refined, not crowded
- Include recent searches or suggested routes if helpful
- Support clean error and validation states

Screen 3. Airport selection screen or bottom sheet
Requirements:
- Searchable airport selection UX
- Show airport code, city, and airport name
- Support origin and destination contexts
- Show recent selections
- Show popular routes or suggestions
- Easy scanability and clear tap targets
- Strong empty state for no result
- Keyboard-safe layout

Screen 4. Date selection calendar
Requirements:
- Premium mobile calendar design
- Support one-way and round-trip logic
- Clear departure/return selection states
- Clear selected date range styling
- Easy month navigation
- Optional price hints if desired, but must remain clean
- Should feel visually polished and lighter than typical airline calendars

Screen 5. Passenger selector
Requirements:
- Bottom sheet or modal
- Adults, Children, Infants
- Plus/minus stepper controls
- Optional helper text for age ranges
- Live summary updates
- Clear done/apply CTA
- Respect typical logical constraints if needed
- Make the interaction premium and intuitive

Screen 6. Search results screen
Requirements:
- Show search summary at top
- Allow change search action
- Show list of available flight results
- Each result card should contain airline, route, times, duration, stops/nonstop, airport codes, and price
- Show important tags such as Best value, Fastest, Lowest fare only if relevant
- Make cards easy to compare
- Do not overwhelm the screen
- Strong loading, empty, and error states

Screen 7. Flight result card behavior
Requirements:
- Define interaction when user taps a result
- If result has no fare families, selecting the card may immediately choose the offer or open a concise confirmation state
- If result has fare families, tapping the result should reveal or navigate to fare-family selection
- The interaction must feel predictable and not confusing

Screen 8. Fare-family selection screen or module
Requirements:
- Only shown when branded fares exist for that selected flight
- Must clearly communicate that these are fare options for the selected airline/flight, not a universal app rule
- Cards should be easy to compare
- Show fare name, included benefits, restrictions, and price
- Highlight recommended fare when backend/business logic provides a recommended option
- Use elegant information hierarchy and premium spacing
- Benefits can include baggage, seat selection, check-in, boarding priority, flexibility, cancellation, and comfort
- Show selected state clearly
- Make differences between fares immediately understandable
- Avoid cramped dense layouts
- Include a route back to flight results if needed

Screen 9. Fare details state
Requirements:
- This can be a bottom sheet, drawer, expansion panel, or dedicated details state
- Show a more detailed explanation of included and excluded benefits
- Must help users understand what they are buying
- Keep tone transparent and trust-building
- Do not overload users with legal-style text
- Use scannable grouped sections

Screen 10. Selected offer summary / pre-continue screen
Requirements:
- Show selected flight details
- If fare family was selected, show selected fare summary
- If no fare family existed, show selected flight offer summary only
- Show total price and pricing label clearly
- Strong Continue CTA
- Allow edit/change actions for search or fare if relevant

SECTION 5. CONDITIONAL LOGIC AND STATE MODEL
Write a very detailed explanation for frontend developers covering:
- search form state
- trip type state
- airport selection state
- date selection state
- passenger state
- results loading state
- selected flight state
- selected fare-family state
- pricing summary state

Then explicitly define logic branches:
Branch A: airline/offer has fare families
- user selects flight
- app opens fare-family comparison
- user selects one fare
- selected fare updates summary and continue action

Branch B: airline/offer has no fare families
- user selects flight offer directly
- no fare-family step is shown
- continue action uses selected offer immediately

Explain how to avoid hardcoded airline assumptions.
Recommend a backend-friendly data shape that allows:
- airline info
- offer id
- branded fare flag
- list of fare families if present
- included benefits
- restrictions
- price
- recommended badge
- selected state

SECTION 6. FRONTEND IMPLEMENTATION SPECIFICATION
Write a detailed implementation prompt for developers.
Cover:
- mobile-first architecture
- reusable component strategy
- design-system alignment
- state management expectations
- screen composition
- conditional rendering for fare-family flows
- loading skeletons
- empty states
- error states
- analytics events
- accessibility
- localization readiness
- future scalability

Define recommended components such as:
- service entry card
- segmented control
- airport input field
- swap button
- date field
- passenger summary field
- search CTA
- airport result row
- calendar day cell
- passenger stepper row
- flight result card
- fare-family comparison card
- benefit row
- sticky footer summary
- price block
- status chip
- inline validation message
- bottom sheet shell
- loading skeleton variants

For each component, describe:
- purpose
- required props
- optional props
- states
- interaction behavior
- accessibility notes

SECTION 7. MOCK DATA SPECIFICATION
Provide a mock JSON-style data example for:
- one airline result with fare families
- one airline result without fare families

Include the EBL to DUS on 1 Jun example.
For the airline with fare families, use example fares like:
- Basic
- Smart
- Biz
but clearly note these are sample branded fares for one airline only.

Include realistic fields such as:
- airlineCode
- airlineName
- flightNumber
- origin
- destination
- departureDateTime
- arrivalDateTime
- duration
- stops
- currency
- basePrice
- hasFareFamilies
- fareFamilies
- benefits
- restrictions
- badges
- isRecommended

SECTION 8. MICROCOPY GUIDELINES
Write professional microcopy recommendations for:
- field labels
- placeholders
- helper text
- empty states
- validation errors
- no results states
- fare comparison labels
- selected states
- CTA labels
Keep tone premium, clear, calm, and trustworthy.

SECTION 9. ACCESSIBILITY AND QUALITY BAR
Define the quality standard for:
- contrast
- touch targets
- dynamic text readiness
- screen reader labels
- focus behavior
- motion restraint
- keyboard-safe sheets and inputs
- error recovery
- semantic structure

SECTION 10. EDGE CASES
List and explain edge cases such as:
- same origin and destination
- missing return date in round-trip
- infant without adult
- no results returned
- results with mixed airline data quality
- missing fare benefits
- airline supports fare families but one family is sold out
- very long airport names
- overnight flights
- price updates after selection

SECTION 11. ACCEPTANCE CRITERIA
Write clear acceptance criteria for product, design, and engineering.
The criteria must ensure:
- the flow works for all airlines
- fare-family UI appears only when available
- the UX remains consistent across screens
- the EBL to DUS mock scenario works
- the app supports both one-way and round-trip
- the passenger selector supports adults, children, and infants
- the overall experience feels premium and professional

Additional design direction:
- The visual language must feel refined, modern, and premium
- The search experience should feel lighter and more sophisticated than typical airline sites
- Avoid visually heavy or cramped forms
- Use spacing and hierarchy to create calm
- Use cards and sheets elegantly
- Keep conversion strong without feeling pushy
- The fare-family comparison, when shown, should feel significantly better than the Eurowings reference screenshots in clarity and polish
- Maintain full consistency with Tulip’s brand and design system

Final instruction:
Write the output as if it will be handed directly to a frontend product team and design team to build the feature. It must be highly detailed, implementation-aware, and fully professional.
