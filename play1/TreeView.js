import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import TreeNode from './TreeNode';

// File system structure of the repository
const fileSystemData = {
  name: 'drliss',
  path: '/',
  type: 'directory',
  children: [
    {
      name: '.gitignore',
      path: '/.gitignore',
      type: 'file',
    },
    {
      name: '404.html',
      path: '/404.html',
      type: 'file',
    },
    {
      name: 'README.md',
      path: '/README.md',
      type: 'file',
    },
    {
      name: 'index.html',
      path: '/index.html',
      type: 'file',
    },
    {
      name: 'play1',
      path: '/play1',
      type: 'directory',
      children: [
        {
          name: '.gitkeep',
          path: '/play1/.gitkeep',
          type: 'file',
        },
        {
          name: 'package.json',
          path: '/play1/package.json',
          type: 'file',
        },
        {
          name: 'TreeNode.js',
          path: '/play1/TreeNode.js',
          type: 'file',
        },
        {
          name: 'TreeView.js',
          path: '/play1/TreeView.js',
          type: 'file',
        },
        {
          name: 'App.js',
          path: '/play1/App.js',
          type: 'file',
        },
      ],
    },
  ],
};

const TreeView = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>File System Tree</Text>
      </View>

      <ScrollView style={styles.treeContainer}>
        <TreeNode
          node={fileSystemData}
          onNodeClick={handleNodeClick}
          selectedPath={selectedNode?.path}
        />
      </ScrollView>

      {selectedNode && (
        <View style={styles.selectedInfoContainer}>
          <Text style={styles.selectedInfoTitle}>Selected:</Text>
          <Text style={styles.selectedInfoPath}>{selectedNode.path}</Text>
          <Text style={styles.selectedInfoType}>
            Type: {selectedNode.type === 'directory' ? '📂 Directory' : '📄 File'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1976d2',
    padding: 15,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  treeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  selectedInfoContainer: {
    backgroundColor: '#fff3e0',
    padding: 15,
    borderTopWidth: 2,
    borderTopColor: '#ff9800',
  },
  selectedInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 5,
  },
  selectedInfoPath: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  selectedInfoType: {
    fontSize: 14,
    color: '#666',
  },
});

export default TreeView;
