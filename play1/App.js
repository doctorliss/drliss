import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import TreeView from './TreeView';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
      <TreeView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
