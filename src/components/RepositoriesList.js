import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import Svg, { Path } from 'react-native-svg';
import Swipeable from 'react-native-swipeable';
import { itemSelect, itemUnselect, itemRemove } from '../actions';

const styles = StyleSheet.create({
  rightRemoveButton: {
    backgroundColor: '#F22',
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  rootContainer: {
    marginBottom: 5,
  },
  itemView: {
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
  },
  itemSelected: {
    backgroundColor: '#DDD',
  },
  mainInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 25,
    height: 25,
    margin: 10,
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
  },
});

class RepositoriesList extends Component {
  totalStars = 0;

  static keyExtractor = item => item.id.toString();

  static getDerivedDataFromState() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const { data } = this.props;
    const sortedData = _.sortBy(data, item => item.created_at);

    return (
      <FlatList
          data={sortedData}
          extraData={this.props.selectedItems.length}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
    );
  }

  onPressItem = (props) => {
    const { selectItem, unselectItem, onPressItem } = this.props;

    if (typeof onPressItem === 'function') {
      onPressItem(props.htmlUrl);
    } else if (props.itemSelected) unselectItem(props.id);
    else selectItem(props.id);
  };

  onItemRemove = (id) => {
    this.props.removeItem(id);
  }

  renderItem = ({ item }) => {
    const { selectedItems, style, disableSelecting } = this.props;
    const selected = !!selectedItems.find(value => value === item.id);
    if (selected) {
      this.totalStars += item.stars;
    }
    return <ListItem
        style={style}
        id={item.id}
        onPressItem={this.onPressItem}
        onItemRemove={this.onItemRemove}
        itemSelected={!disableSelecting ? selected : false}
        name={item.name}
        ownerLogin={item.owner.login}
        ownerAvatar={item.owner.avatarUrl}
        stars={item.stars}
        created_at={item.created_at}
        htmlUrl={item.htmlUrl}
      />;
  }
}

RepositoriesList.propTypes = {
  data: PropTypes.array,
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  disableSelecting: PropTypes.boolean,
  style: PropTypes.instanceOf(StyleSheet),
  removeItem: PropTypes.func,
  onPressItem: PropTypes.func,
  selectItem: PropTypes.func,
  unselectItem: PropTypes.func,
};

class ListItem extends Component {
  onRemovePress = () => {
    LayoutAnimation.spring();
    this.props.onItemRemove(this.props.id);
  };

  onPress = () => {
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
      starText,
    } = styles;
    const {
      ownerAvatar, ownerLogin, name, stars,
    } = this.props;
    const swipeButtons = [
      <TouchableOpacity onPress={this.onRemovePress} style={styles.rightRemoveButton} key="remove">
        <Text style={{ color: '#FFF' }}>Remove</Text>
      </TouchableOpacity>,
    ];

    return (
      <View style={rootContainer}>
        <Swipeable
          rightButtons={swipeButtons}
          rightActionActivationDistance={250}
          onRightActionActivate={this.onRemovePress}
        >
          <TouchableOpacity onPress={this.onPress}>
              <View style={[itemView, this.props.itemSelected ? itemSelected : null]}>
                <View style={mainInfoContainer}>
                  <Image style={itemImage} source={{ uri: ownerAvatar }} />
                  <View style={itemInfoView}>
                    <Text style={itemRepoName}>{name}</Text>
                    <Text style={itemRepoOwner}>{ownerLogin}</Text>
                  </View>
                </View>
                <View style={starsView}>
                  <Svg
                    width="14"
                    height="16">
                    <Path
                      fillRule="evenodd"
                      d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z">
                    </Path>
                  </Svg>
                  <Text style={starText}>{this.constructor.bigStars(stars)}</Text>
                </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>
    );
  }

  static bigStars(stars) {
    if (stars >= 1000000) return `${(stars / 1000000).toFixed(1)}M`;
    if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
    return stars;
  }
}

ListItem.propTypes = {
  onItemRemove: PropTypes.func,
  onPressItem: PropTypes.func,
  ownerAvatar: PropTypes.string,
  ownerLogin: PropTypes.string,
  name: PropTypes.string,
  stars: PropTypes.number,
  created_at: PropTypes.string,
  itemSelected: PropTypes.boolean,
  id: PropTypes.number,
};

const mapStateToProps = state => ({
  selectedItems: state.repositories.selectedItems,
});
const mapDispatchToProps = dispatch => ({
  selectItem: id => dispatch(itemSelect(id)),
  unselectItem: id => dispatch(itemUnselect(id)),
  removeItem: id => dispatch(itemRemove(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepositoriesList);
