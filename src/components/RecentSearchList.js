import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { recentSearchItemClicked, repositoriesFetch, clearRecent } from '../actions';
import { Button } from './common';

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 5,
  },
  itemView: {
    paddingBottom: 10,
    paddingLeft: 20,
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
  },
});

class RecentSearchedList extends Component {
    static keyExtractor = item => item.toString();

    static getDerivedDataFromState() {
      LayoutAnimation.easeInEaseOut();
    }

    render() {
      const { data, extraData } = this.props;

      return (
        <View style={{ flex: 1 }}>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
            }}>
                <Text style={[{ fontWeight: 'bold' }, !data.length && { marginTop: 6 }]}>Recent searched:</Text>
                {data.length && <Button onPress={this.clearRecent}>Clear</Button>}
            </View>
            <FlatList
                data={data}
                extraData={extraData}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
        </View>
      );
    }

    clearRecent = () => {
      this.props.clearRecent();
    };

    onPressItem = (props) => {
      this.props.recentItemClicked(props.id);
    };

    renderItem = ({ item }) => <RecentSearchedListItem
            style={this.props.styles}
            id={item.id}
            onPressItem={this.onPressItem}
            searchedString={item}
        />
}

RecentSearchedList.propTypes = {
  data: PropTypes.array,
  extraData: PropTypes.any,
  styles: PropTypes.instanceOf(StyleSheet),
  recentItemClicked: PropTypes.func,
  clearRecent: PropTypes.func,
};

class RecentSearchedListItem extends Component {
    onPress = () => {
      this.props.onPressItem(this.props);
    };

    render() {
      const {
        rootContainer,
        itemView,
        itemRepoName,
      } = styles;
      const { searchedString } = this.props;

      return (
        <View style={rootContainer}>
            <TouchableOpacity onPress={this.onPress}>
                <View style={itemView}>
                    <Text style={itemRepoName}>{searchedString}</Text>
                </View>
            </TouchableOpacity>
        </View>
      );
    }
}

RecentSearchedListItem.propTypes = {
  searchedString: PropTypes.string,
  onPressItem: PropTypes.func,
};

const mapStateToProps = state => ({
  recentSearched: state.repositories.recentSearched,
});
const mapDispatchToProps = dispatch => ({
  clearRecent: () => dispatch(clearRecent()),
  recentItemClicked: (text) => {
    dispatch(recentSearchItemClicked(text));
    dispatch(repositoriesFetch(text));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentSearchedList);
