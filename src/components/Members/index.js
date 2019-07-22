import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MembersActions from '~/store/ducks/members';

import InviteMember from '~/components/InviteMember';
import RoleUpdater from '~/components/RoleUpdater';
import Can from '~/components/Can';

import styles from './styles';

class Members extends Component {
  static propTypes = {
    getMembersRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
          name: PropTypes.string,
        }),
      })),
    }).isRequired,
  }

  state = {
    isInviteModalOpen: false,
    isRoleModalOpen: false,
    memberEdit: null,
  }

  componentDidMount() {
    const { getMembersRequest } = this.props;
    getMembersRequest();
  }

  toggleInviteModalOpen = () => {
    this.setState({ isInviteModalOpen: true });
  }

  toggleInviteModalClose = () => {
    this.setState({ isInviteModalOpen: false });
  }

  toggleRoleModalOpen = (member) => {
    this.setState({ isRoleModalOpen: true, memberEdit: member });
  }

  toggleRoleModalClose = () => {
    this.setState({ isRoleModalOpen: false, memberEdit: null });
  }

  render() {
    const { isInviteModalOpen, isRoleModalOpen, memberEdit } = this.state;
    const { members } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>MEMBROS</Text>

        <FlatList
          style={styles.memberList}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.user.name}</Text>
              <Can checkRole="administrator">
                <TouchableOpacity
                  onPress={() => this.toggleRoleModalOpen(item)}
                  hitSlop={{
                    top: 5,
                    left: 5,
                    right: 5,
                    bottom: 5,
                  }}
                >
                  <Icon name="settings" size={20} color="#b0b0b0" />
                </TouchableOpacity>
              </Can>
            </View>
          )}
          ListFooterComponent={() => (
            <Can checkPermission="invites_create">
              <TouchableOpacity onPress={this.toggleInviteModalOpen} style={styles.button}>
                <Text style={styles.buttonText}>Convidar</Text>
              </TouchableOpacity>
            </Can>
          )}
        />

        {memberEdit && (
          <RoleUpdater
            visible={isRoleModalOpen}
            onRequestClose={this.toggleRoleModalClose}
            member={memberEdit}
          />
        )}

        <Can checkPermission="invites_create">
          <InviteMember visible={isInviteModalOpen} onRequestClose={this.toggleInviteModalClose} />
        </Can>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);
