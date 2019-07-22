import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TeamSwitcher from '~/components/TeamSwitcher';
import Projects from '~/components/Projects';
import Members from '~/components/Members';

import styles from './styles';

class Main extends Component {
  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    activeTeam: null,
  };

  state = {
    leftOpen: false,
    rightOpen: false,
  };

  toggleMenu = (position, isOpen) => {
    this.setState({ [`${position}Open`]: isOpen });
  };

  render() {
    const { leftOpen, rightOpen } = this.state;
    const { activeTeam } = this.props;

    return (
      <View style={styles.backgroundWrapper}>
        <SideMenu
          isOpen={leftOpen}
          disableGestures
          onChange={isOpen => this.toggleMenu('left', isOpen)}
          openMenuOffset={70}
          menu={<TeamSwitcher />}
        >
          <SideMenu
            isOpen={rightOpen}
            disableGestures
            onChange={isOpen => this.toggleMenu('right', isOpen)}
            openMenuOffset={285}
            menuPosition="right"
            menu={<Members />}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => this.toggleMenu('left', true)}
                  hitSlop={{
                    top: 5,
                    bottom: 5,
                    left: 10,
                    right: 10,
                  }}
                >
                  <Icon name="menu" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.teamTitle}>
                  {activeTeam ? activeTeam.name : 'Selecione um time'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleMenu('right', true);
                  }}
                  hitSlop={{
                    top: 5,
                    bottom: 5,
                    left: 10,
                    right: 10,
                  }}
                >
                  <Icon name="group" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              <Projects />
            </View>
          </SideMenu>
        </SideMenu>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
});

export default connect(mapStateToProps)(Main);
