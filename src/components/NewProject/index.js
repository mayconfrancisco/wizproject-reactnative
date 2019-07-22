import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '~/store/ducks/projects';

import Modal from '~/components/Modal';
import styles from './styles';

class NewProject extends Component {
  static propTypes = {
    createProjectRequest: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  state = {
    newProject: '',
  };

  handleSubmit = () => {
    const { newProject } = this.state;
    const { createProjectRequest, onRequestClose } = this.props;

    createProjectRequest(newProject);

    onRequestClose();
  };

  render() {
    const { newProject } = this.state;
    const { visible, onRequestClose } = this.props;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>TÍTULO</Text>
        <TextInput
          style={styles.input}
          autoFocus
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={newProject}
          onChangeText={text => this.setState({ newProject: text })}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>CRIAR PROJETO</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>CANCELAR</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ProjectsActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(NewProject);
