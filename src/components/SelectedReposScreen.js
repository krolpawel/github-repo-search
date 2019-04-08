import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import RepositoriesList from './RepositoriesList';

class SelectedReposScreen extends Component {
  static onPressItem(url) {
    Linking.openURL(url);
  }

  render() {
    const { repositories, selectedItems } = this.props;
    const selectedRepos = repositories.filter(
      item => selectedItems.find(sItem => sItem === item.id),
    );

    return (
      <RepositoriesList
          data={selectedRepos}
          disableSelecting
          onPressItem={this.constructor.onPressItem} />
    );
  }
}

SelectedReposScreen.propTypes = {
  repositories: PropTypes.array,
  selectedItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.number])),
};

const mapStateToProps = state => ({
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
});
export default connect(
  mapStateToProps,
  {},
)(SelectedReposScreen);
