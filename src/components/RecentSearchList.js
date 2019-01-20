//@flow
import React, { PureComponent, Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Image, ScrollView, FlatList, TouchableOpacity, Animated, LayoutAnimation } from "react-native";
import _ from 'lodash';
import Svg, { Path } from 'react-native-svg';
import { recentSearchItemClicked, repositoriesFetch, clearRecent } from "../actions";
import Swipeable from 'react-native-swipeable';
import { Button } from "./common";

type RecentSearchedListProps = {
    data: Array<any>,
    extraData: any,
    styles: StyleSheet,
    recentSearchItemClicked: Function
};

class RecentSearchedList extends Component<RecentSearchedListProps> {
    _keyExtractor = (item, index) => item.toString();

    componentWillReceiveProps(nextProps) {
        LayoutAnimation.easeInEaseOut();
    }

    render() {
        const { data, extraData } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <Text style={[{fontWeight: 'bold'}, !data.length && {marginTop: 6}]}>Recent searched:</Text>
                    {data.length && <Button onPress={this._clearRecent}>Clear</Button>}
                </View>
                <FlatList
                    data={data}
                    extraData={extraData}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }

    _clearRecent = () => {
        this.props.clearRecent();
    };

    _onPressItem = (props) => {
        const { recentSearchItemClicked } = this.props;
        recentSearchItemClicked(props.id);
    };

    _renderItem = ({ item }) => {
        return <RecentSearchedListItem
            style={this.props.styles}
            id={item.id}
            onPressItem={this._onPressItem}
            searchedString={item}
        />
    }
}

type RecentSearchedListItemProps = {
    searchedString: string,
    onPressItem: Function,
};

class RecentSearchedListItem extends Component<RecentSearchedListItemProps> {
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
        const { searchedString }: {searchedString: string} = this.props;

        return (
            <View style={rootContainer}>
                <TouchableOpacity onPress={this._onPress}>
                    <View style={itemView}>
                        <Text style={itemRepoName}>{searchedString}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 5,
    },
    itemView: {
        paddingBottom: 10,
        paddingLeft: 20,
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "#DDD",
        flex: 1,
        flexDirection: "row",
    },
});

const mapStateToProps = state => {
    return {
        recentSearched: state.repositories.recentSearched,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        clearRecent: () => dispatch(clearRecent()),
        recentSearchItemClicked: (text) => {
            dispatch(recentSearchItemClicked(text));
            dispatch(repositoriesFetch(text))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecentSearchedList);
