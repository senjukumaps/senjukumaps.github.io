# Senjutsu Map Maker

(auto generated, not that useful readme)

## Key Files and Directories

- `package.json`: Contains the metadata about the project, including the project's dependencies and scripts for running, building, and deploying the project.

- `public/index.html`: The main HTML file for the project. It includes a div with the id `root`, where the React application is injected.

- `src/index.js`: The entry point of the React application. It renders the `App` component into the `root` div in `index.html`.

- `src/App.tsx`: The main component of the application. It sets up the layout of the application, including a sidebar for tokens and a hexagonal grid for the game map.

- `src/GameLayout.tsx`: This component represents the game map. It handles the logic for dragging and dropping tokens onto the hexagonal grid.

- `src/Sidebar.tsx`: This component represents the sidebar of the application, where the tokens are displayed.

- `src/GameTile.ts`: This file defines the `GameTile` class, which represents a tile on the game map.

- `src/TilesLayout.tsx`: This component represents a layout of tiles. It's currently not used in the application and may be part of an older version of the code.

- `src/tokens.json`: This file contains the data for the tokens that can be dragged and dropped onto the game map.

## Running the Project

To run the project, you need to install the project's dependencies using `npm install`. Then, you can start the project using `npm start`.

## Conclusion

This project is a good example of a React application built with TypeScript. It demonstrates how to use drag and drop functionality in a web application and how to structure a project with multiple components.