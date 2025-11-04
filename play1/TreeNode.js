import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

  const getIcon = () => {
    if (!hasChildren) {
      return '📄 ';
    }
    return isExpanded ? '📂 ' : '📁 ';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.nodeContainer,
          { paddingLeft: level * 20 + 10 },
          isSelected && styles.selectedNode
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={[styles.nodeText, isSelected && styles.selectedText]}>
          {node.name}
        </Text>
      </TouchableOpacity>

      {hasChildren && isExpanded && (
        <View style={styles.childrenContainer}>
          {node.children.map((child, index) => (
            <TreeNode
              key={`${child.path}-${index}`}
              node={child}
              level={level + 1}
              onNodeClick={onNodeClick}
              selectedPath={selectedPath}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 10,
    borderRadius: 4,
  },
  selectedNode: {
    backgroundColor: '#e3f2fd',
  },
  icon: {
    fontSize: 16,
    marginRight: 5,
  },
  nodeText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  childrenContainer: {
    marginLeft: 0,
  },
});

export default TreeNode;
