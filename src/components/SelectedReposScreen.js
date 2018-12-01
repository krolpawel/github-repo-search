//@flow
import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, Linking } from "react-native";
import {
    Input,
    Screen,
    Section,
    Spinner,
} from './common';
import _ from 'lodash';
import { connect } from "react-redux";
import { repositoriesFetch, searchedValueFetch, userTyping, capitalizedErrorChange } from '../actions';
import RepositoriesList from "./RepositoriesList";

type SelectedReposScreenProp = {
    selectedItems: Array<string>,
    repositories: Array<any>
}

class SelectedReposScreen extends Component<SelectedReposScreenProp> {
    _onPressItem(url) {
        Linking.openURL(url);
    }

    render() {
        const selectedRepositories = _.filter(this.props.repositories, (item) => {
            return _.find(this.props.selectedItems, (selectedItem) => selectedItem === item.id);
        })
        return (
            <RepositoriesList
                data={selectedRepositories}
                disableSelecting
                onPressItem={this._onPressItem} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        repositories: _.map(state.repositories.repositories, (repo) => {
            return {
                id: repo.id,
                name: repo.name,
                stars: repo.stargazers_count,
                created_at: repo.created_at,
                owner: {
                    login: repo.owner.login,
                    avatarUrl: repo.owner.avatar_url
                },
                htmlUrl: repo.html_url
            }
        }),
        selectedItems: state.repositories.selectedItems,
    };
};
export default connect(
    mapStateToProps,
    {}
)(SelectedReposScreen);
