import React from 'react';
import { StyleSheet, View } from 'react-native';
import TreeView from './TreeView';

export default function App() {
  return (
    <View style={styles.container}>
      <TreeView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    height: '100vh',
    width: '100vw',
  },
});
