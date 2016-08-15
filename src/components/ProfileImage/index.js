import React, { Component } from 'react'
import { Image } from 'react-bootstrap' 

export default class ProfileImage extends Component {
  render() {
    const {className, size, photoURL, ...imageProps} = this.props
    imageProps.className = className || ''
    const wrapperStyle = size ? {width: size, height: size} : {}
    return (
      <div style={wrapperStyle}>
        <Image src={photoURL} {...imageProps} />
      </div>
    )
  }
}
