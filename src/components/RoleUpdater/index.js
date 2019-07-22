import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, Switch,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MembersActions from '~/store/ducks/members';

import api from '~/services/api';

import Modal from '~/components/Modal';

import styles from './styles';

class RoleUpdater extends Component {
  static propTypes = {
    updateMemberRequest: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    member: PropTypes.shape({
      id: PropTypes.number,
      roles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
      })),
    }).isRequired,
  }

  state = {
    roles: [],
  };

  async componentDidMount() {
    const response = await api.get('roles');
    this.setState({ roles: response.data });
  }

  handleRoleChange = (value, role) => {
    const { updateMemberRequest, onRequestClose, member } = this.props;

    const newRoles = value
      ? [...member.roles, role]
      : member.roles.filter(memberRole => memberRole.id !== role.id);

    updateMemberRequest(member.id, newRoles);

    onRequestClose();
  }

  render() {
    const { roles } = this.state;
    const { visible, onRequestClose, member } = this.props;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <View>
          {roles.map(role => (
            <View key={role.id} style={styles.roleContainer}>
              <Text style={styles.roleText}>{role.name}</Text>
              <Switch
                value={!!member.roles.find(memberRole => memberRole.id === role.id)}
                onValueChange={value => this.handleRoleChange(value, role)}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>Voltar</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(RoleUpdater);
