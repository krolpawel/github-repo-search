//@flow
import React, { PureComponent, Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Image, ScrollView, FlatList, TouchableOpacity, Animated, LayoutAnimation } from "react-native";
import _ from 'lodash';
import Svg, { Path } from 'react-native-svg';
import { itemSelect, itemUnselect, itemRemove } from "../actions";
import Swipeable from 'react-native-swipeable';

type RepositoriesListProp = {
  data: Array<any>,
  selectedItems: Array<string>,
  disableSelecting: boolean,
  styles: StyleSheet,
  itemRemove: Function,
  onPressItem: Function,
  itemSelect: Function,
  itemUnselect: Function,
}
class RepositoriesList extends Component<RepositoriesListProp> {
  totalStars = 0;
  _keyExtractor = (item, index) => item.id;

  componentWillReceiveProps(nextProps) {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const { data } = this.props;
    const sortedData = _.sortBy(data, (item) => item.created_at);
    return (
      <FlatList
          data={sortedData}
          extraData={this.props.selectedItems.length}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
    );
  }

  _onPressItem = (props) => {
    const { itemSelect, itemUnselect } = this.props;
    console.log('props provided:');
    console.log(props);
    typeof this.props.onPressItem === "function" ? this.props.onPressItem(props.htmlUrl) : (props.itemSelected ? itemUnselect(props.id) : itemSelect(props.id));
  };

  _onItemRemove = (id: string) => {
    this.props.itemRemove(id);
  }

  _renderItem = ({ item }) => {

    const selected = !!this.props.selectedItems.find((value) => value === item.id);
    if (selected) {
      this.totalStars += item.stars;
    }
    return <ListItem
        style={this.props.styles}
        id={item.id}
        onPressItem={this._onPressItem}
        onItemRemove={this._onItemRemove}
        itemSelected={!this.props.disableSelecting ? selected : false}
        name={item.name}
        ownerLogin={item.owner.login}
        ownerAvatar={item.owner.avatarUrl}
        stars={item.stars}
        created_at={item.created_at}
        htmlUrl={item.htmlUrl}
      />
  }
}

type ListItemProp = {
  onItemRemove: Function,
  onPressItem: Function,
  ownerAvatar: string,
  ownerLogin: string,
  name: string,
  stars: number,
  created_at: string,
  itemSelected: boolean,
  id: number
}

class ListItem extends Component<ListItemProp> {
  _onRemovePress = () => {
    LayoutAnimation.spring();
    this.props.onItemRemove(this.props.id);
  };
  _onPress = () => {  
    this.props.onPressItem(this.props);
  };

  render() {
    const {
      rootContainer,
      itemView,
      itemSelected,
      itemImage,
      itemInfoView,
      itemRepoName,
      itemRepoOwner,
      starsView,
      mainInfoContainer,
      starText
    } = styles;
    const { ownerAvatar, ownerLogin, name, stars, created_at } = this.props;
    const swipeButtons = [
      <TouchableOpacity onPress={this._onRemovePress} style={styles.rightRemoveButton}>
        <Text style={{ color: '#FFF' }}>Remove</Text>
      </TouchableOpacity>
    ];

    return (
      <View style={rootContainer}>
        <Swipeable
          rightButtons={swipeButtons}
          rightActionActivationDistance={250}
          onRightActionActivate={this._onRemovePress}
        >
          <TouchableOpacity onPress={this._onPress}>
              <View style={[itemView, this.props.itemSelected ? itemSelected : null]}>
                <View style={mainInfoContainer}>
                  <Image style={itemImage} source={{ uri: ownerAvatar }} />
                  <View style={itemInfoView}>
                    <Text style={itemRepoName}>{name}</Text>
                    <Text style={itemRepoOwner}>{ownerLogin}</Text>
                  </View>
                </View>
                {/* <View>
                  <Text>{created_at}</Text>
                </View> */}
                <View style={starsView}>
                  <Svg
                    width="14"
                    height="16">
                    <Path
                      fillRule="evenodd"
                      d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z">
                    </Path>
                  </Svg>
                  <Text style={starText}>{this.bigStars(stars)}</Text>
                </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>
    );
  }

  bigStars(stars) {
    if (stars >= 1000000)
      return (stars / 1000000).toFixed(1) + 'M';
    if (stars >= 1000)
      return (stars / 1000).toFixed(1) + 'k';
    return stars;
  }
}

const styles = StyleSheet.create({
  rightRemoveButton: {
    backgroundColor: '#F22',
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'center'
  },
  rootContainer: {
    marginBottom: 5,
  },
  itemView: {
    //alignItems: 'center',
    justifyContent: 'flex-end',
    //height: 40,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    flex: 1,
    flexDirection: "row",
  },
  itemSelected: {
    backgroundColor: "#DDD",
  },
  mainInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
  },
  itemImage: {
    width: 25,
    height: 25,
    margin: 10,
    margin: 10
  },
  itemRepoName: {},
  itemInfoView: {},
  itemRepoOwner: {
    fontSize: 10,
    color: '#999',
  },
  starsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 5,
  },
  starText: {
    marginLeft: 3,
  }
});

const mapStateToProps = state => {
  return {
    selectedItems: state.repositories.selectedItems,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    itemSelect: (_id) => dispatch(itemSelect(_id)),
    itemUnselect: (_id) => dispatch(itemUnselect(_id)),
    itemRemove: (_id) => dispatch(itemRemove(_id)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepositoriesList);
