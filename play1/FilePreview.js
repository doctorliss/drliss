import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Sample file contents - in a real app this would fetch from an API
const fileContents = {
  '/.gitignore': `_site
.sass-cache
.jekyll-cache
.jekyll-metadata
vendor

# Node modules
node_modules/

# Expo
.expo/
.expo-shared/

# Dependencies
package-lock.json`,

  '/404.html': `<!DOCTYPE html>
<html>
<head>
  <title>404 - Page Not Found</title>
</head>
<body>
  <h1>404 - Page Not Found</h1>
</body>
</html>`,

  '/README.md': `# drliss

Welcome to the drliss repository!

This project contains a React Native file tree viewer.`,

  '/index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Welcome</title>
</head>
<body>
  <h1>Welcome to drliss</h1>
</body>
</html>`,

  '/play1/package.json': JSON.stringify({
    name: "file-tree-viewer",
    version: "1.0.0",
    description: "React Native File Tree Viewer"
  }, null, 2),

  '/play1/App.js': `import React from 'react';
import { StyleSheet, View } from 'react-native';
import TreeView from './TreeView';

export default function App() {
  return (
    <View style={styles.container}>
      <TreeView />
    </View>
  );
}`,

  '/play1/TreeNode.js': `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getFileIcon } from './fileIconUtils';

const TreeNode = ({ node, level = 0, onNodeClick, selectedPath }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedPath === node.path;

  const handlePress = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onNodeClick(node);
  };

  // Component renders tree node with icon and text
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{getFileIcon(node.name, hasChildren, isExpanded)} {node.name}</Text>
    </TouchableOpacity>
  );
};

export default TreeNode;`,

  '/play1/TreeView.js': `import React, { useState } from 'react';
import TreeNode from './TreeNode';
import FilePreview from './FilePreview';
import FileOperations from './FileOperations';

// Main TreeView component that displays file tree with search,
// sort, preview, and file operations (create, rename, delete)

const TreeView = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View>
      <FileOperations />
      <TreeNode node={data} onNodeClick={setSelectedNode} />
      <FilePreview selectedNode={selectedNode} />
    </View>
  );
};

export default TreeView;`,

  '/play1/FileOperations.js': `import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput } from 'react-native';

// Component for file operations: Create, Rename, Delete
// Uses modals for user input and confirmation

const FileOperations = ({ selectedNode, onCreateFile, onRenameFile, onDeleteFile }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShowCreateModal(true)}>
        <Text>➕ Create File</Text>
      </TouchableOpacity>
      {/* Modal dialogs for file operations */}
    </View>
  );
};

export default FileOperations;`,

  '/play1/FilePreview.js': `import React from 'react';
import { View, Text, ScrollView } from 'react-native';

// Displays file content preview in split panel
// Shows placeholder for directories and selected file content

const FilePreview = ({ selectedNode }) => {
  if (!selectedNode) {
    return <Text>Select a file to preview</Text>;
  }

  return (
    <ScrollView>
      <Text>{selectedNode.name}</Text>
      {/* File content display */}
    </ScrollView>
  );
};

export default FilePreview;`,

  '/play1/fileIconUtils.js': `// Utility functions for file type icons
// Maps file extensions to emoji icons

export const getFileIcon = (fileName, isDirectory, isExpanded) => {
  if (isDirectory) {
    return isExpanded ? '📂' : '📁';
  }

  const ext = fileName.split('.').pop()?.toLowerCase();
  const iconMap = {
    js: '📜',
    json: '📋',
    html: '🌐',
    md: '📝',
    // ... more mappings
  };

  return iconMap[ext] || '📄';
};`,

  '/play1/index.js': `import { registerRootComponent } from 'expo';
import App from './App';

// Entry point for the React Native app
registerRootComponent(App);`,

  '/play1/app.json': `{
  "expo": {
    "name": "file-tree-viewer",
    "slug": "file-tree-viewer",
    "version": "1.0.0",
    "platforms": ["ios", "android", "web"]
  }
}`,

  '/play1/README.md': `# File Tree Viewer - React Native

Interactive file tree viewer with features:
- File type-specific icons
- Search and filter
- Sort by name or type
- File preview panel
- Create, rename, delete operations

## How to Run
\`\`\`
npm install
npm start
\`\`\`

Press 'w' for web, 'a' for Android, 'i' for iOS`,

  '/play1/.gitkeep': `# Empty file to keep directory in git`,
};

const FilePreview = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>Select a file to preview its contents</Text>
      </View>
    );
  }

  // Only show preview for files, not directories
  if (selectedNode.type === 'directory') {
    const childCount = selectedNode.children?.length || 0;
    return (
      <View style={styles.container}>
        <Text style={styles.directoryInfo}>
          📂 Directory: {selectedNode.name}
        </Text>
        <Text style={styles.directoryInfo}>
          Contains {childCount} item{childCount !== 1 ? 's' : ''}
        </Text>
      </View>
    );
  }

  const content = fileContents[selectedNode.path] || '// File content not available for preview';

  return (
    <View style={styles.container}>
      <View style={styles.previewHeader}>
        <Text style={styles.fileName}>{selectedNode.name}</Text>
        <Text style={styles.filePath}>{selectedNode.path}</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  placeholder: {
    padding: 20,
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    fontStyle: 'italic',
  },
  previewHeader: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#1976d2',
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 3,
  },
  filePath: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  contentScroll: {
    flex: 1,
  },
  content: {
    padding: 15,
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#333',
    lineHeight: 20,
  },
  directoryInfo: {
    padding: 15,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default FilePreview;
