import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';

import styles from './styles';

class InviteMember extends Component {
  static propTypes = {
    inviteMemberRequest: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  state = {
    email: '',
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { inviteMemberRequest, onRequestClose } = this.props;

    inviteMemberRequest(email);
    onRequestClose();

    this.setState({ email: '' });
  };

  render() {
    const { email } = this.state;
    const { visible, onRequestClose } = this.props;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>E-MAIL</Text>
        <TextInput
          style={styles.input}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>CONVIDAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>CANCELAR</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(InviteMember);
