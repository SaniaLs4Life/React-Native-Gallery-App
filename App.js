import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  ScrollView
} from "react-native";
import Dashboard from "./components/Dashboard";
import { Header, Icon } from "react-native-elements";

export default class App extends React.Component {
  state = {
    modalVisible: false,
    modalImage: require("./components/image/img1.jpg"),
    images: [
      require("./components/image/img1.jpg"),
      require("./components/image/img2.jpg"),
      require("./components/image/img3.jpg"),
      require("./components/image/img1.jpg"),
      require("./components/image/img2.jpg"),
      require("./components/image/img3.jpg"),
      require("./components/image/img2.jpg"),
      require("./components/image/img3.jpg"),
      require("./components/image/img1.jpg"),
      require("./components/image/img2.jpg"),
      require("./components/image/img3.jpg"),
      require("./components/image/img2.jpg"),
      require("./components/image/img3.jpg"),
      require("./components/image/img1.jpg"),
      require("./components/image/img2.jpg"),
      require("./components/image/img3.jpg")
    ],
    currentIndex: 0
  };
  setModalVisibility(visible, imageKey) {
    this.setState({
      modalVisible: visible,
      modalImage: this.state.images[imageKey],
      currentIndex: imageKey
    });
  }
  getImage() {
    return this.state.modalImage;
  }
  goNext = () => {
    if (this.state.currentIndex < this.state.images.length) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        modalImage: this.state.images[this.state.currentIndex]
      });
    } else {
      this.setState({
        currentIndex: 0,
        modalImage: this.state.images[this.state.currentIndex]
      });
    }
  };
  goPrev = () => {
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
        modalImage: this.state.images[this.state.currentIndex]
      });
    } else {
      this.setState({
        currentIndex: this.state.images.length,
        modalImage: this.state.images[this.state.currentIndex]
      });
    }
  };
  render() {
    let images = this.state.images.map((val, key) => {
      return (
        <View>
          <TouchableWithoutFeedback
            key={key}
            onPress={() => this.setModalVisibility(true, key)}
          >
            <View style={styles.imageWrap}>
              <Dashboard imageSource={val} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    });
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: "image", color: "#fff" }}
          centerComponent={{ text: "Gallery App", style: { color: "#fff" } }}
        />
        <View style={styles.container}>
          <Modal
            style={styles.modal}
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modal}>
              <Text
                style={styles.text}
                onPress={() => this.setModalVisibility(false)}
              >
                Close
              </Text>

              <Dashboard imageSource={this.state.modalImage} />

              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <Text style={styles.prev} onPress={this.goPrev}>
                  Previous
                </Text>
                <Text style={styles.next} onPress={this.goNext}>
                  Next
                </Text>
              </View>
            </View>
          </Modal>
          <ScrollView
            contentContainerStyle={{
              flexWrap: "wrap",
              flexDirection: "row"
            }}
          >
            {images}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#EEE"
  },
  imageWrap: {
    margin: 2,
    padding: 2,
    height: Dimensions.get("window").height / 3 - 12,
    width: Dimensions.get("window").width / 2 - 4,
    backgroundColor: "#FFF"
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: "rgba(0,0,0,0.9)"
  },
  text: {
    color: "#FFF"
  },
  prev: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "left"
  },
  next: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "right"
  }
});
