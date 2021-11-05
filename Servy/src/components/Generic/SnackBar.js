import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

const MyComponent = ({ message, setVisible, visible }) => {
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      {visible && (
        <View style={styles.container}>
          <Snackbar
            style={{
              backgroundColor: "#60ad7f",
              paddingTop: 5,
              paddingBottom: 5,
            }}
            visible={visible}
            duration={2000}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Dismiss",
              onPress: () => {
                onDismissSnackBar();
              },
            }}
            theme={{ colors: { surface: "#fff", accent: "#fff" } }}
          >
            {message}
          </Snackbar>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: "space-between",
  },
});

export default MyComponent;
