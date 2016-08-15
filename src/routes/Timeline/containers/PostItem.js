import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { filter, get } from 'lodash'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import PmImg from 'components/PmImg'
import FontAwesome from 'react-fontawesome'
import ProfileImage from 'components/ProfileImage'
import css from './timeline.scss'
import classNames from 'classnames'
import pokemonsObject from 'static/pokemons.json'
import { changeCountValue } from '../modules/counts'
import { gpsToText } from 'utils/utils'


@connect(
  (state, {postId, type, uid}) => ({
    count: get(state, ['counts', postId, type], {}),
    myCount: get(state, ['counts', postId, type, uid], false),
  }),
  {
    changeCountValue,
  }
)
class CountIcon extends Component {
  onClick = () => {
    const {postId, type, uid, myCount} = this.props
    this.props.changeCountValue(postId, type, uid, !myCount)
  }

  render() {
    const {type, count, myCount} = this.props
    const icon = type === 'like' ? '👍' :
                 type === 'kiss' ? '😘' :
                 type === 'angry' ? '😡' : undefined
    const countNumber = filter(count, (v, k) => v).length
    const countText = countNumber || undefined
    const wrapperClass = classNames(css.iconWrapper, {
      [css.iconWrapperActive]: myCount,
    })
    return icon ? (
      <div className={wrapperClass}>
        <Button onClick={this.onClick}>
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
    uid: get(state, 'auth.user.uid'),
    token: state.auth.token,
  }),
)
class PostItem extends Component {
  render() {
    const {uid, postId, photoURL, displayName, pmId, time, gps} = this.props
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
            {!!gps &&
              <div className={css.gpsLine}>
                <FontAwesome name='map-marker' />
                <span className={css.gpsSpan}>{gpsToText(gps)}</span>
              </div>
            }
          </div>
          <div className={css.postRight}>
            <PmImg id={pmId} />
          </div>
        </div>
        <div className={css.postBottom}>
          <CountIcon postId={postId} uid={uid} type='like' />
          <CountIcon postId={postId} uid={uid} type='kiss' />
          <CountIcon postId={postId} uid={uid} type='angry' />
        </div>
      </div>
    )
  }
}
