import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { get } from 'lodash'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import PmImg from 'components/PmImg'
import ProfileImage from 'components/ProfileImage'
import css from './timeline.scss'
import classNames from 'classnames'
import pokemonsObject from 'static/pokemons.json'


@connect(
  (state, {postId, type, uid}) => ({
    count: get(state, ['counts', postId, type], 0),
    myCount: get(state, ['counts', postId, type, uid], 0),
  }),
)
class CountIcon extends Component {
  render() {
    const {type, count, myCount} = this.props
    const icon = type === 'like' ? '👍' :
                 type === 'kiss' ? '😘' :
                 type === 'angry' ? '😡' : undefined
    const countText = count || undefined
    const wrapperClass = classNames(css.iconWrapper, {
      [css.iconWrapperActive]: myCount,
    })
    return icon ? (
      <div className={wrapperClass}>
        <Button>
          <div className={css.icon}>{icon}</div>
          {!!countText &&
            <div className={css.countText}>
            {countText}
            </div>
          }
        </Button>
      </div>
    ) : <noscript />
  }
}

export default
@withRouter
@connect(
  (state) => ({
    token: state.auth.token,
  }),
)
class PostItem extends Component {
  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const {photoURL, displayName, pmId, time} = this.props
    const pmName = pokemonsObject[pmId]
    const timeAgo = moment.duration(time - Date.now()).humanize(true)
    return (
      <div className={css.postItem}>
        <div className={css.postTop}>
          <div className={css.postLeft}>
            <ProfileImage photoURL={photoURL} responsive />
          </div>
          <div className={css.postMiddle}>
            <div>
              <b>{displayName}</b> caught <b>{pmName}</b> <span className={css.time}>{timeAgo}</span>
            </div>
          </div>
          <div className={css.postRight}>
            <PmImg id={pmId} />
          </div>
        </div>
        <div className={css.postBottom}>
          <CountIcon type='like' />
          <CountIcon type='kiss' />
          <CountIcon type='angry' />
        </div>
      </div>
    )
  }
}
