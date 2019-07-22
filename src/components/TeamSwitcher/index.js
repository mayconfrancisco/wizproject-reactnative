import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TeamsActions from '~/store/ducks/teams';

import NewTeam from '~/components/NewTeam';

import styles from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamsRequest: PropTypes.func.isRequired,
    selectTeam: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { getTeamsRequest } = this.props;
    getTeamsRequest();
  }

  toggleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  toggleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const { teams, selectTeam } = this.props;
    return (
      <View style={styles.container}>
        {teams.data.map(team => (
          <TouchableOpacity
            key={team.id}
            onPress={() => selectTeam(team)}
            style={styles.teamContainer}
          >
            <Image
              style={styles.teamAvatar}
              source={{
                uri: `https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${
                  team.name
                }`,
              }}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={this.toggleModalOpen} style={styles.newTeam}>
          <Icon name="add" size={24} color="#999" />
        </TouchableOpacity>

        <NewTeam visible={isModalOpen} onRequestClose={this.toggleModalClose} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
});

const mapDispatchToProps = dispatch => bindActionCreators(TeamsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSwitcher);
