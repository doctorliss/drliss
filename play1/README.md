# File Tree Viewer - React Native

A React Native application that displays the file system structure of this repository in an interactive tree view.

## Features

- 📂 Interactive tree view of the repository file system
- 🖱️ Clickable nodes that show selected item information
- 📁 Expandable/collapsible directories
- 🎨 Clean and intuitive UI with folder/file icons
- 📱 Works on iOS, Android, and Web

## Project Structure

```
play1/
├── App.js          # Main application component
├── TreeView.js     # Tree view container with file system data
├── TreeNode.js     # Individual tree node component
├── package.json    # Project dependencies
└── README.md       # This file
```

## Components

### App.js
Main application component that wraps the TreeView in a SafeAreaView.

### TreeView.js
Container component that:
- Holds the file system data structure
- Manages the selected node state
- Displays selected node information at the bottom
- Renders the tree using TreeNode components

### TreeNode.js
Recursive component that:
- Renders individual tree nodes (files/directories)
- Handles expand/collapse for directories
- Highlights selected nodes
- Shows appropriate icons (📂 for open folders, 📁 for closed, 📄 for files)

## How It Works

1. **Click on any node**: The node gets highlighted and its details appear at the bottom
2. **Click on a folder**: It expands/collapses to show/hide its contents
3. **Selection indicator**: Selected nodes are highlighted with a blue background
4. **Information panel**: Shows the full path and type of the selected item

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (for easiest setup)

### Installation

1. Navigate to the play1 directory:
   ```bash
   cd play1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Expo CLI globally (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

### Running the App

#### Using Expo (Recommended)

1. Start the development server:
   ```bash
   npm start
   ```

2. Choose your platform:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web

#### Using React Native CLI

If you prefer React Native CLI:

```bash
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

## Customization

### Adding More Files
Edit the `fileSystemData` object in `TreeView.js` to add more files or directories:

```javascript
const fileSystemData = {
  name: 'root',
  path: '/',
  type: 'directory',
  children: [
    {
      name: 'newfile.txt',
      path: '/newfile.txt',
      type: 'file',
    },
    // ... more items
  ],
};
```

### Styling
Modify the `StyleSheet.create()` sections in each component to customize colors, spacing, and appearance.

### Icons
Change the emoji icons in `TreeNode.js`:
- `📂` - Open folder
- `📁` - Closed folder
- `📄` - File

## Current File System Structure

The app displays the following structure:

```
drliss/
├── .gitignore
├── 404.html
├── README.md
├── index.html
└── play1/
    ├── .gitkeep
    ├── package.json
    ├── TreeNode.js
    ├── TreeView.js
    ├── App.js
    └── README.md
```

## Future Enhancements

Possible improvements:
- Add file content preview
- Implement search functionality
- Add file type-specific icons
- Support for sorting (by name, type, date)
- Add file operations (rename, delete, etc.)
- Integration with actual file system API

## License

MIT
