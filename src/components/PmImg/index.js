import React, { Component } from 'react'
import { Image } from 'react-bootstrap' 
import { padStart } from 'lodash'

const padPmId = (id) => padStart(id, 3, '0')

export default class PmImg extends Component {
  render() {
    const {className, size, id, ...imageProps} = this.props
    imageProps.className = className || ''
    const wrapperStyle = size ? {width: size, height: size} : {}
    return (
      <div style={wrapperStyle}>
        <Image src={`/pokemon-imgs/${padPmId(id)}.png`} responsive {...imageProps} />
      </div>
    )
  }
}
