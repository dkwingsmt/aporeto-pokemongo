import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome' 
import { Button } from 'react-bootstrap' 
//import { Link } from 'react-router'
import SearchInput, { createFilter } from 'react-search-input'
import { map } from 'lodash'
import classNames from 'classnames'

import { postError } from '../modules'
import { submitPost, setDraftProperty, setDraftInfo, clearDraftInfo, findPosition, findPositionName } from '../modules/draft'
import css from './post.scss'
import pokemonsObject from 'static/pokemons.json'
import PmImg from 'components/PmImg'
import AlertBar from 'components/AlertBar'
import { gpsToText } from 'utils/utils'

const fullPokemonList = map(pokemonsObject, (name, id) => ({id, name}))
const KEYS_TO_FILTERS = ['id', 'name']

class PokemonFilterInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      selected: false,
    }
  }
  
  searchUpdated = (term) => {
    this.setState({searchTerm: term})
  }

  onSelect = () => {
    this.setState({selected: true})
  }

  onBlur = () => {
    this.setState({selected: false})
  }

  renderSearchResultItem = (pokemon) => 
    <div key={pokemon.id} className={css.searchResultItem}>
      <div
        className={css.searchResultWrapper}
        onClick={(e) => {
          this.props.onSelect(pokemon.id)
        }}
        >
        <div className={css.resultLeft}>
          <PmImg id={pokemon.id} />
        </div>
        <div className={css.resultRight}>
          <div className={css.resultId}>No. {pokemon.id}</div>
          <div className={css.resultName}>{pokemon.name}</div>
        </div>
      </div>
    </div>

  render() {
    const MAX_PM = 5
    const hasInputTerm = !!this.state.searchTerm.length
    const pokemonFilter = createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    const filteredPokemons = hasInputTerm ? 
      fullPokemonList.filter(pokemonFilter).slice(0, MAX_PM) :
      undefined
    return (
      <div className={css.searchContainer}>
        <SearchInput
          className={`${css.searchInput} input-group`}
          onChange={this.searchUpdated}
          onClick={this.onSelect}
          onBlur={this.onBlur}
          inputClassName='form-control'
          placeholder='Which Pokemon did you catch just now?'
        />
        <div className={css.searchResultPositioner}>
        {!hasInputTerm && this.state.selected &&
          <div className={css.searchResult}>
            <div className={`${css.searchResultItem} ${css.searchPrompt}`}>
              Input <em>name</em> or <em>ID</em> to search
            </div>
          </div>
        }
        {hasInputTerm && (
          <div className={css.searchResult}>
          {
            filteredPokemons.length ? (
              filteredPokemons.map(this.renderSearchResultItem)
            ) : (
              <div className={css.searchResultItem}>
              </div>
            )
          }
          </div>
        )}
        </div>
      </div>
    )
  }
}

@connect(
  (state) => ({
    draft: state.timeline.draft.contents,
    gpsFinding: state.timeline.draft.gpsFinding,
  }),
  {
    setDraftInfo,
    setDraftProperty,
    findPosition,
    findPositionName,
  }
)
class PokemonSelected extends Component {

  onToggleGps = () => {
    const hasGps = this.props.draft.gps || this.props.gpsFinding
    if (hasGps) {
      this.props.setDraftInfo({
        gps: undefined,
      })
      this.props.setDraftProperty({
        gpsFinding: false,
      })
    } else {
      this.props.findPosition().then(({result}) => {
        this.props.findPositionName(result)
      })
    }
  }

  render() {
    const {draft, pmId, gpsFinding} = this.props
    const {gps={}} = draft
    const pokemon = pokemonsObject[pmId]
    const supportGps = !!navigator.geolocation
    const gpsEnabled = !!draft.gps
    const gpsText = !gpsEnabled
      ? (gpsFinding ? 'Finding...' : 'Enable location')
      : gpsToText(gps)
    const gpsTextClass = classNames(css.toPostLine, {
      [css.textDisabled]: !gpsEnabled,
    })
    return (
      <div className={css.toPost}>
        <div className={css.toPostLeft}>
          <PmImg id={this.props.pmId} size={60} />
        </div>
        <div className={css.toPostRight}>
          <div className={css.toPostLine}>
            <FontAwesome name='dot-circle-o' />
            <div>{pokemon}</div>
          </div>
          <div className={css.toPostLine}>
            <FontAwesome name='clock-o' />
            <div>Just now</div>
          </div>
          {supportGps &&
            <div className={gpsTextClass} onClick={this.onToggleGps} >
              <FontAwesome name='map-marker' />
              <div>{gpsText}</div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default
@connect(
  (state) => ({
    user: state.auth.user,
    draft: state.timeline.draft.contents,
    alert: state.timeline.draft.alert,
    provider: state.auth.provider,
  }),
  {
    submitPost,
    postError,
    setDraftInfo,
    clearDraftInfo,
  }
)
class PostPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubmitting: false,
    }
  }

  componentWillMount() {
    this.props.postError()
  }

  onPmSelect = (pmId) => {
    this.props.setDraftInfo({
      pmId,
      time: Date.now(),
    })
  }

  onPmDeselect = () => {
    this.props.clearDraftInfo()
  }

  onSubmit = () => {
    this.setState({isSubmitting: true})
    this.props.submitPost(this.props.user, this.props.provider, this.props.draft)
      .then(() => {
        this.setState({isSubmitting: false})
      })
      .catch((error) => {
        this.setState({isSubmitting: false})
      })
  }

  render() {
    const {draft} = this.props
    const pmSelected = draft.pmId != null
    return (
      <div className={css.postContainer}>
        <div className={css.pmSelector}>
        {pmSelected ? 
          <PokemonSelected
            pmId={draft.pmId}
            onDeselect={this.onPmDeselect}
          />
         :
          <PokemonFilterInput
            onSelect={this.onPmSelect}
          />
        }
        </div>
        <AlertBar {...this.props.alert} />
        <div className={css.actionRow}>
          <div className={css.actionRowFiller}></div>
          <Button
            disabled={!pmSelected}
            onClick={this.onPmDeselect}
          >
            Clear
          </Button>
          <Button
            bsStyle="primary"
            disabled={!pmSelected || this.state.isSubmitting}
            onClick={this.onSubmit}
          >
            Post!
          </Button>
        </div>
      </div>
    )
  }
}

