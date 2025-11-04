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
