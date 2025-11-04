import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';

const FileOperations = ({ selectedNode, onCreateFile, onRenameFile, onDeleteFile }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [newFileName, setNewFileName] = useState('');

  const handleCreate = () => {
    if (fileName.trim()) {
      onCreateFile(fileName.trim(), fileContent);
      setFileName('');
      setFileContent('');
      setShowCreateModal(false);
    }
  };

  const handleRename = () => {
    if (newFileName.trim() && selectedNode) {
      onRenameFile(selectedNode.path, newFileName.trim());
      setNewFileName('');
      setShowRenameModal(false);
    }
  };

  const handleDelete = () => {
    if (selectedNode) {
      onDeleteFile(selectedNode.path);
      setShowDeleteModal(false);
    }
  };

  const openRenameModal = () => {
    if (selectedNode) {
      setNewFileName(selectedNode.name);
      setShowRenameModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Operations</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={styles.buttonText}>➕ Create File</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.renameButton, !selectedNode && styles.buttonDisabled]}
          onPress={openRenameModal}
          disabled={!selectedNode}
        >
          <Text style={[styles.buttonText, !selectedNode && styles.buttonTextDisabled]}>
            ✏️ Rename
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton, !selectedNode && styles.buttonDisabled]}
          onPress={() => setShowDeleteModal(true)}
          disabled={!selectedNode}
        >
          <Text style={[styles.buttonText, !selectedNode && styles.buttonTextDisabled]}>
            🗑️ Delete
          </Text>
        </TouchableOpacity>
      </View>

      {/* Create File Modal */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New File</Text>

            <Text style={styles.label}>File Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="example.txt"
              value={fileName}
              onChangeText={setFileName}
            />

            <Text style={styles.label}>File Content:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter file content here..."
              value={fileContent}
              onChangeText={setFileContent}
              multiline
              numberOfLines={6}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowCreateModal(false);
                  setFileName('');
                  setFileContent('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleCreate}
              >
                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Rename File Modal */}
      <Modal visible={showRenameModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rename File</Text>

            <Text style={styles.label}>Current: {selectedNode?.name}</Text>
            <Text style={styles.label}>New Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="new-name.txt"
              value={newFileName}
              onChangeText={setNewFileName}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowRenameModal(false);
                  setNewFileName('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleRename}
              >
                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>Rename</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete File Modal */}
      <Modal visible={showDeleteModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete File</Text>

            <Text style={styles.warningText}>
              Are you sure you want to delete "{selectedNode?.name}"?
            </Text>
            <Text style={styles.warningSubtext}>
              This action cannot be undone.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButtonModal]}
                onPress={handleDelete}
              >
                <Text style={[styles.modalButtonText, styles.deleteButtonTextModal]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {selectedNode && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedInfoText}>
            Selected: {selectedNode.name}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#4caf50',
  },
  renameButton: {
    backgroundColor: '#ff9800',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonTextDisabled: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#4caf50',
  },
  confirmButtonText: {
    color: '#fff',
  },
  deleteButtonModal: {
    backgroundColor: '#f44336',
  },
  deleteButtonTextModal: {
    color: '#fff',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  warningSubtext: {
    fontSize: 14,
    color: '#f44336',
    textAlign: 'center',
  },
  selectedInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
  },
  selectedInfoText: {
    fontSize: 14,
    color: '#1976d2',
  },
});

export default FileOperations;
