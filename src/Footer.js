import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import ControlGroup from './ControlGroup'
import {makeStyles} from './util'
import {Mute, PlayerTime} from './Controls'
import {connectVideo} from './connectVideo'
import layout from './layout'
import styles from './styles'

export class Footer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {Left, Middle, Right} = this.props.layout

    return (
      <View style={this.props.styles.container}>
        {React.cloneElement(Left, {defaultStyles: {justifyContent: 'flex-start'}})}
        {React.cloneElement(Middle, {defaultStyles: {justifyContent: 'center'}})}
        {React.cloneElement(Right, {defaultStyles: {justifyContent: 'flex-end'}})}
      </View>
    )
  }

}

Footer.propTypes = {

  layout: PropTypes.shape({
    Left: PropTypes.object,
    Middle: PropTypes.object,
    Right: PropTypes.object
  }),

  styles: PropTypes.object

}

const Connected = connectVideo(['styles'])(Footer)

const Layout = layout({
  Left: <ControlGroup layout={[
    <PlayerTime />
  ]} />,
  Middle: <ControlGroup layout={[

  ]} />,
  Right: <ControlGroup layout={[
    <Mute />
  ]} />
})(Connected)

const Styled = styles((styles, theme) => ({
  container: {
    backgroundColor: (styles.Footer && styles.Footer.backgroundColor) || 'transparent',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    position: 'absolute',
    height: (styles.Footer && styles.Footer.height) || 50,
    right: (styles.Footer && styles.Footer.right) || 0,
    left: (styles.Footer && styles.Footer.left) || 0,
    bottom: (styles.Footer && styles.Footer.bottom) || 0
  }
}))(Layout)

export default Styled

export const makeFooter = (left, middle, right) => {
  return (
    <Styled layout={{
      Left: <ControlGroup layout={left} />,
      Middle: <ControlGroup layout={middle} />,
      Right: <ControlGroup layout={right} />
    }} />
  )
}
