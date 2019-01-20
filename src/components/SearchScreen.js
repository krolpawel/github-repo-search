//@flow
import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, Platform, Image, LayoutAnimation } from "react-native";
import _ from 'lodash';
import { connect } from "react-redux";
import { repositoriesFetch, searchedValueFetch, userTyping, capitalizedErrorChange, clearRepositoriesList } from '../actions';
import {
  Button,
  Input,
  Screen,
  Section,
  Spinner,
} from './common';
import RepositoriesList from "./RepositoriesList";
import RecentSearchList from "./RecentSearchList";

const { height, width } = Dimensions.get('window');

type SearchScreenProp = {
  searchText: string,
  fetchingRepositories: boolean,
  onSearch: Function,
  repoFetch: Function,
  searchTextFetch: Function,
  repositoriesCount: number,
  repositories: Array<any>,
  capitalizedError: boolean,
  recentSearched: Array<string>,
  resetRepoList: Function,
  userTyping: Function,
  capitalizedErrorChange: Function,
  userTyped: any,
  selectedItems: Array<string>,
  navigation: any,
}
class SearchScreen extends Component<SearchScreenProp> {
  componentWillReceiveProps() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const {
      searchText,
      fetchingRepositories,
      onSearch,
      repoFetch,
      searchTextFetch,
      repositoriesCount,
      repositories,
      capitalizedError,
      recentSearched,
    } = this.props;
    const {
      rootView,
      screen,
      searchSection,
      totalStarsView,
      textFieldError,
      spinnerContainer,
      errorMessage,
      listStyle,
      listSection,
      appLogo,
      headerViewLogo,
      appLogoWithSearch,
    } = styles;
    return (
      <View style={rootView}>
        <Screen style={screen}>
          <View style={headerViewLogo}>
            <Image source={require('../../logo/logo-1024.png')} style={[appLogo, repositories.length && appLogoWithSearch]} />
          </View>
          <Section style={[searchSection, capitalizedError && textFieldError]}>
            <Input placeholder="Search repo..." onChangeText={text => this.searchTextChanged(text)} value={searchText} />
              {fetchingRepositories && <View style={spinnerContainer}>
                <Spinner size="small"/>
              </View>}
          </Section>
          {!!capitalizedError && <Text style={errorMessage}>
            Don't use capital letters
          </Text>}
          <Section style={listSection}>
            {!repositories.length && <RecentSearchList
              data={recentSearched}
              style={listStyle}
              extraData={recentSearched.length} />}
            {!!repositories.length && <RepositoriesList
              data={repositories}
              style={listStyle} />}
          </Section>
        </Screen>
        <View style={totalStarsView}>
          <Text>Total stars: {this.computeTotalStars()}</Text>
          <Button
            onPress={this.showSelectedList.bind(this)}
            disabled={!this.props.selectedItems.length}>
              Show selected
          </Button>
        </View>
      </View>
    );
  }

  showSelectedList() {
    this.props.navigation.navigate('SpecificView');
  }

  computeTotalStars() {
    let count = 0;
    _.each(this.props.selectedItems, (selectedItem) => {
      const itemInResults = this.props.repositories.find((item) => item.id === selectedItem);
      if(itemInResults)
        count += itemInResults.stars;
    });
    
    return this.bigStars(count);
  }

  bigStars(stars) {
    if (stars >= 1000000)
      return (stars / 1000000).toFixed(1) + 'M';
    if (stars >= 1000)
      return (stars / 1000).toFixed(1) + 'k';
    return stars;
  }

  searchTextChanged(searchedText) {
    const { userTyped, capitalizedError } = this.props;

    if (searchedText != searchedText.toLowerCase() && !capitalizedError) {
      this.props.capitalizedErrorChange(true);
      return;
    } else if (capitalizedError) {
      if (searchedText == searchedText.toLowerCase()) {
        this.props.capitalizedErrorChange(false);
      } else {
        return;
      }
    }

    if (userTyped) {
      clearTimeout(userTyped);
    }
    if (searchedText.length > 2) {
      this.props.userTyping(
        setTimeout(() => {
          this.props.repoFetch(searchedText);
        }, 500)
      );
    }
    if (!searchedText.length) {
      this.props.resetRepoList();
    }
  }
}

const styles = StyleSheet.create({
  headerViewLogo: {
    width: width,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20
  },
  appLogo: {
    width: width / 2,
    height: width / 2
  },
  appLogoWithSearch: {
    width: width / 4,
    height: width / 4
  },
  listSection: {
    height: height - 135
  },
  listStyle: {
    height: 50
  },
  screen: {
    borderWidth: 0,
    height: 400
  },
  rootView: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 40
      },
      android: {
        marginTop: 10
      }
    })
  },
  searchSection: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    marginBottom: 10
  },
  totalStarsView: {
    backgroundColor: "#DDD",
    position: "absolute",
    bottom: 0,
    height: 40,
    width: width,
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    padding: 5
  },
  spinnerContainer: {
    width: 5,
    marginRight: 20,
    position: "relative"
  },
  textFieldError: {
    borderColor: "red",
    borderWidth: 1
  },
  errorMessage: {
    color: 'red'
  }
});

const mapStateToProps = (state) => {
  return {
    searchText: state.test.searchedText,
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
    repositoriesCount: state.repositories.repositoriesCount,
    userTyped: state.repositories.userTyped,
    fetchingRepositories: state.repositories.fetchingRepositories,
    capitalizedError: state.repositories.capitalizedError,
    recentSearched: state.repositories.recentSearched,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetRepoList: () => dispatch(clearRepositoriesList()),
    repoFetch: searchText => dispatch(repositoriesFetch(searchText)),
    searchTextFetch: searchedText => dispatch(searchedValueFetch(searchedText)),
    userTyping: timeoutF => dispatch(userTyping(timeoutF)),
    capitalizedErrorChange: status => dispatch(capitalizedErrorChange(status)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);