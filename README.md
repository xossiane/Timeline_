# Timeline Assignment

## What I liked about my implementation

I enjoyed implementing the interactive drag-and-drop functionality for timeline items, as it provides a natural and intuitive way for users to manipulate events directly on the timeline. The inline editing feature enhances user experience by allowing quick and seamless updates to event names without leaving the context of the timeline. Additionally, the zoom functionality—controlled via a slider—is a powerful addition that’s not commonly seen in similar apps I’ve used. It offers users flexible control over their view, enabling them to zoom in for detailed inspection or zoom out for a broad overview, which greatly improves usability.

---

## What I would change if I were to do it again

From a code architecture perspective, I would refactor the components to follow an atomic design methodology, which would increase modularity and reusability across the app. Breaking down UI elements into smaller, reusable atoms and molecules makes maintenance easier and scaling the app more straightforward. Additionally, I would adopt SASS or another CSS preprocessor for styling instead of inline styles. This would allow for cleaner, more maintainable stylesheets with variables, mixins, and nesting—enhancing both development speed and code clarity.

In terms of user experience, I would reconsider the horizontal layout of the timeline. While it is visually intuitive for some cases, a vertical timeline or alternative calendar views might offer more fluid readability and better accommodate varying numbers of events. Sometimes, simplifying the display with fewer lanes or grouping events differently can improve clarity—embracing the principle that less is more.

---

## How I made my design decisions

Given the time constraints, I focused primarily on functionality and code clarity. I prioritized features that enhance usability, such as drag-and-drop and inline editing, which I believe are critical for a timeline tool. I incorporated zoom to provide users with flexible control of their timeline view, inspired by modern calendar applications that offer similar scaling features.

Although I didn't deeply research existing timeline libraries or apps for this implementation, accessibility considerations and performance guided my choices. I chose to use Ariakit, a Brazilian library of accessible components, to ensure the timeline UI components would be as accessible as possible. This choice reflects my commitment to inclusive design and leveraging well-maintained, community-driven resources.

If I had more time, I would analyze popular timeline UIs and accessibility best practices further to refine the design.

---

## How I would test this if I had more time

I would implement a comprehensive testing suite starting with unit tests using Jest to verify core logic—such as date calculations, lane assignments, and item state updates during drag-and-drop operations. I would also cover edge cases like overlapping events and invalid date inputs.

For UI and interaction testing, I would add end-to-end (E2E) tests using a framework like Cypress or Playwright. These tests would simulate real user behaviors such as dragging items, resizing events, editing names inline, and adjusting the zoom slider, ensuring the app behaves correctly across browsers and screen sizes.

Finally, I would incorporate accessibility testing tools like axe-core to verify that the timeline is navigable via keyboard and screen readers, ensuring compliance with WCAG guidelines for inclusive design.

---

## How to Run
1. Navigate to this project directory
2. Run `npm install` to install dependencies
3. Run `npm start` to initialize and connect to a node server with your default browser
