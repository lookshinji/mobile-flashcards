import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

class DeckList extends Component {
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View>
          <View>
            <View>
              <Text>Título</Text>
            </View>
            <View>
              <Text># cards</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={decks}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => {
            return item.title;
          }}
        />
      </View>
    );
  }
}

export default DeckList