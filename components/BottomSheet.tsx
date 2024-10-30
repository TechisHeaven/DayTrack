import React, { useEffect } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

interface BottomSheetPopoverProps {
  isOpened: boolean;
  toggleModal: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
}

const BottomSheetPopover: React.FC<BottomSheetPopoverProps> = ({
  isOpened,
  toggleModal,
  onOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpened && onOpen) {
      onOpen();
    }
    if (!isOpened && onClose) {
      onClose();
    }
  }, [isOpened, onOpen, onClose]);

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isOpened}
      onRequestClose={toggleModal} // Close the modal on hardware back button press
    >
      <GestureHandlerRootView style={styles.modalContainer}>
        <TouchableOpacity style={styles.overlay} onPress={toggleModal} />
        <PanGestureHandler
          onGestureEvent={() => {
            /* Handle drag events here if needed */
          }}
        >
          <View style={styles.bottomSheet}>{children}</View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default BottomSheetPopover;
