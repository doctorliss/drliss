import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import TreeNode from './TreeNode';
import FilePreview from './FilePreview';
import FileOperations from './FileOperations';

// Initial file system structure of the repository
const initialFileSystemData = {
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
          name: 'App.js',
          path: '/play1/App.js',
          type: 'file',
        },
        {
          name: 'FileOperations.js',
          path: '/play1/FileOperations.js',
          type: 'file',
        },
        {
          name: 'FilePreview.js',
          path: '/play1/FilePreview.js',
          type: 'file',
        },
        {
          name: 'README.md',
          path: '/play1/README.md',
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
          name: 'app.json',
          path: '/play1/app.json',
          type: 'file',
        },
        {
          name: 'fileIconUtils.js',
          path: '/play1/fileIconUtils.js',
          type: 'file',
        },
        {
          name: 'index.js',
          path: '/play1/index.js',
          type: 'file',
        },
        {
          name: 'package.json',
          path: '/play1/package.json',
          type: 'file',
        },
      ],
    },
  ],
};

const TreeView = () => {
  const [fileSystemData, setFileSystemData] = useState(initialFileSystemData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'type'

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  // Create a new file
  const handleCreateFile = (fileName, content) => {
    const newFile = {
      name: fileName,
      path: `/play1/${fileName}`,
      type: 'file',
    };

    setFileSystemData(prevData => {
      // Create a deep copy of the data structure
      const updatedData = JSON.parse(JSON.stringify(prevData));
      const play1Folder = updatedData.children.find(child => child.name === 'play1');
      if (play1Folder) {
        play1Folder.children.push(newFile);
      }
      return updatedData;
    });

    // Use native alert for web compatibility
    if (typeof window !== 'undefined') {
      window.alert(`File "${fileName}" created successfully!`);
    } else {
      Alert.alert('Success', `File "${fileName}" created successfully!`);
    }
  };

  // Rename a file
  const handleRenameFile = (oldPath, newName) => {
    const renameInTree = (node) => {
      if (node.path === oldPath) {
        const pathParts = oldPath.split('/');
        pathParts[pathParts.length - 1] = newName;
        return {
          ...node,
          name: newName,
          path: pathParts.join('/'),
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(child => renameInTree(child)),
        };
      }
      return node;
    };

    setFileSystemData(prevData => renameInTree(prevData));
    setSelectedNode(null);

    // Use native alert for web compatibility
    if (typeof window !== 'undefined') {
      window.alert(`File renamed to "${newName}" successfully!`);
    } else {
      Alert.alert('Success', `File renamed to "${newName}" successfully!`);
    }
  };

  // Delete a file
  const handleDeleteFile = (path) => {
    const deleteFromTree = (node) => {
      if (node.children) {
        return {
          ...node,
          children: node.children.filter(child => child.path !== path).map(child => deleteFromTree(child)),
        };
      }
      return node;
    };

    setFileSystemData(prevData => deleteFromTree(prevData));
    setSelectedNode(null);

    // Use native alert for web compatibility
    if (typeof window !== 'undefined') {
      window.alert('File deleted successfully!');
    } else {
      Alert.alert('Success', 'File deleted successfully!');
    }
  };

  // Sort nodes
  const sortNodes = (nodes) => {
    if (!nodes) return nodes;

    const sorted = [...nodes].sort((a, b) => {
      // Directories always come first
      if (a.children && !b.children) return -1;
      if (!a.children && b.children) return 1;

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'type') {
        const aExt = a.name.split('.').pop() || '';
        const bExt = b.name.split('.').pop() || '';
        return aExt.localeCompare(bExt) || a.name.localeCompare(b.name);
      }
      return 0;
    });

    // Recursively sort children
    return sorted.map(node => ({
      ...node,
      children: node.children ? sortNodes(node.children) : undefined
    }));
  };

  // Filter tree based on search query
  const filterTree = (node, query) => {
    if (!query) return node;

    const lowerQuery = query.toLowerCase();

    // Check if current node matches
    const nameMatches = node.name.toLowerCase().includes(lowerQuery);

    // If it's a file and matches, return it
    if (!node.children && nameMatches) {
      return node;
    }

    // If it's a directory, recursively filter children
    if (node.children) {
      const filteredChildren = node.children
        .map(child => filterTree(child, query))
        .filter(child => child !== null);

      // If directory matches or has matching children, return it
      if (nameMatches || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren
        };
      }
    }

    return null;
  };

  const filteredData = filterTree(fileSystemData, searchQuery);
  const sortedData = filteredData ? { ...filteredData, children: sortNodes(filteredData.children) } : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>File System Tree</Text>
      </View>

      <FileOperations
        selectedNode={selectedNode}
        onCreateFile={handleCreateFile}
        onRenameFile={handleRenameFile}
        onDeleteFile={handleDeleteFile}
      />

      <View style={styles.controlsContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search files..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <Text
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              ✕
            </Text>
          )}
        </View>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
            onPress={() => setSortBy('name')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'name' && styles.sortButtonTextActive]}>
              Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'type' && styles.sortButtonActive]}
            onPress={() => setSortBy('type')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'type' && styles.sortButtonTextActive]}>
              Type
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.treePanel}>
          <ScrollView style={styles.treeScroll}>
            {sortedData ? (
              <TreeNode
                node={sortedData}
                onNodeClick={handleNodeClick}
                selectedPath={selectedNode?.path}
              />
            ) : (
              <Text style={styles.noResults}>No files found matching "{searchQuery}"</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.previewPanel}>
          <FilePreview selectedNode={selectedNode} />
        </View>
      </View>
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
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  clearButton: {
    marginLeft: 10,
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
    padding: 5,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  sortButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: '#1976d2',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noResults: {
    padding: 20,
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  treePanel: {
    flex: 1,
    backgroundColor: '#fff',
    borderRightWidth: 2,
    borderRightColor: '#ddd',
  },
  treeScroll: {
    flex: 1,
    padding: 10,
  },
  previewPanel: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});

export default TreeView;
