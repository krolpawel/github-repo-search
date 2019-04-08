import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Dimensions, Text, View, StyleSheet, Platform, Image, LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import {
  repositoriesFetch, searchedValueFetch, userTyping, capitalizedErrorChange, clearRepositoriesList,
} from '../actions';
import {
  Button,
  Input,
  Screen,
  Section,
  Spinner,
} from './common';
import RepositoriesList from './RepositoriesList';
import RecentSearchList from './RecentSearchList';

const logoImage = require('../../logo/logo-1024.png');

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerViewLogo: {
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  appLogo: {
    width: width / 2,
    height: width / 2,
  },
  appLogoWithSearch: {
    width: width / 4,
    height: width / 4,
  },
  listSection: {
    height: height - 135,
  },
  listStyle: {
    height: 50,
  },
  screen: {
    borderWidth: 0,
    height: 400,
  },
  rootView: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 40,
      },
      android: {
        marginTop: 10,
      },
    }),
  },
  searchSection: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    marginBottom: 10,
  },
  totalStarsView: {
    backgroundColor: '#DDD',
    position: 'absolute',
    bottom: 0,
    height: 40,
    width,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  spinnerContainer: {
    width: 5,
    marginRight: 20,
    position: 'relative',
  },
  textFieldError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorMessage: {
    color: 'red',
  },
});

class SearchScreen extends Component {
  state={};
  static getDerivedStateFromProps() {
    LayoutAnimation.easeInEaseOut();

    return null;
  }

  render() {
    const {
      searchText,
      fetchingRepositories,
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
            <Image source={logoImage} style={[appLogo, ((repositories.length || searchText.length) && appLogoWithSearch)]} />
          </View>
          <Section style={[searchSection, capitalizedError && textFieldError]}>
            <Input placeholder="Search repo..." onChangeText={text => this.searchTextChanged(text)} value={searchText} />
            {fetchingRepositories && <View style={spinnerContainer}>
              <Spinner size="small" />
            </View>}
          </Section>
          {!!capitalizedError && <Text style={errorMessage}>
            Don&apos;t use capital letters
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
    const { selectedItems, repositories } = this.props;
    let count = 0;

    selectedItems.forEach((selectedItem) => {
      const itemInResults = repositories.find(item => item.id === selectedItem);
      if (itemInResults) count += itemInResults.stars;
    });

    return this.constructor.bigStars(count);
  }

  static bigStars(stars) {
    if (stars >= 1000000) return `${(stars / 1000000).toFixed(1)}M`;
    if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
    return stars;
  }

  searchTextChanged(searchedText) {
    const { userTyped, capitalizedError } = this.props;

    if (searchedText !== searchedText.toLowerCase() && !capitalizedError) {
      this.props.capitalizedErrorChange(true);
      return;
    }
    if (capitalizedError) {
      if (searchedText === searchedText.toLowerCase()) {
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
        }, 500),
      );
    }
    if (!searchedText.length) {
      this.props.resetRepoList();
    }
  }
}

SearchScreen.propTypes = {
  searchText: PropTypes.string,
  fetchingRepositories: PropTypes.bool,
  repoFetch: PropTypes.func,
  searchTextFetch: PropTypes.func,
  repositoriesCount: PropTypes.number,
  repositories: PropTypes.arrayOf(PropTypes.object),
  capitalizedError: PropTypes.bool,
  recentSearched: PropTypes.arrayOf(PropTypes.string),
  resetRepoList: PropTypes.func,
  userTyping: PropTypes.func,
  capitalizedErrorChange: PropTypes.func,
  userTyped: PropTypes.any,
  selectedItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.number])),
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  searchText: state.test.searchedText,
  repositories: state.repositories.repositories.map(repo => ({
    id: repo.id,
    name: repo.name,
    stars: repo.stargazers_count,
    created_at: repo.created_at,
    owner: {
      login: repo.owner.login,
      avatarUrl: repo.owner.avatar_url,
    },
    htmlUrl: repo.html_url,
  })),
  selectedItems: state.repositories.selectedItems,
  repositoriesCount: state.repositories.repositoriesCount,
  userTyped: state.repositories.userTyped,
  fetchingRepositories: state.repositories.fetchingRepositories,
  capitalizedError: state.repositories.capitalizedError,
  recentSearched: state.repositories.recentSearched,
});
const mapDispatchToProps = dispatch => ({
  resetRepoList: () => dispatch(clearRepositoriesList()),
  repoFetch: searchText => dispatch(repositoriesFetch(searchText)),
  searchTextFetch: searchedText => dispatch(searchedValueFetch(searchedText)),
  userTyping: timeoutF => dispatch(userTyping(timeoutF)),
  capitalizedErrorChange: status => dispatch(capitalizedErrorChange(status)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
