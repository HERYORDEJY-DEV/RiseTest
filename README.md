## Key Tech used

- [React Native](https://reactnative.dev/) (CLI) - used for the main development environment.
- [Typescript](https://www.typescriptlang.org/) - This strongly typed programming language builds on JavaScript, giving you better tooling at any scale.
- [Redux](https://redux.js.org/) and its ecosystems - used for utilising global state management.
- [React Navigation](https://reactnavigation.org/) is the library that will be used for navigating between screens.
- [date-fns](https://date-fns.org/) will be used for parsing, validating, manipulating, and displaying dates and times in JavaScript.
- [react-query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/docs/intro) a promise-based HTTP Client for API request calls

## Folder structuring

- src/ - **the main source code folder**
  - assets/ - **the assets parent folder**
    - fonts/ - **this contains the fonts used in the project**
    - images/ - **this contains the static image assets used in the project**
    - svgs/ - **this contains static SVG assets used in the project, extracted from the Figma design**
    - _index.ts_ - **this is the main entry point to the parent asset folder, for all exported static assets**
  - components/ - **the parent folder for all reusable components. Components are further grouped based on related use types or related parent screen or screen stack**
  - hooks/ - **this contains all custom hooks**
  - navigation/ - **the parent folder for the app’s navigation setup**
    - _index.tsx_ - **the root navigation file export**
  - screens/ - **the parent folder for all screen (or page) components. Screens are further grouped based on related screen stack**
  - store/ - **the parent folder for the global state management setup**
    - Slice/ - **this contains each slice of data contained in the state**
      - \*index.ts - **this contains all reducers for the state data manipulation, for each slice of data\***
    - Types - **type definition for the state management**
    - _index.ts_ - **this is the state’s store configuration**
  - styles/ - **this contains the app styles configuration**
  - utils/ - **this contains all utility functions and constants**
