import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome' 
import { Button } from 'react-bootstrap' 
//import { Link } from 'react-router'
//import firebase from 'firebase'
import SearchInput, { createFilter } from 'react-search-input'
import { map } from 'lodash'

import { submitPost, postError } from '../modules'
import css from './post.scss'
import pokemonsObject from 'static/pokemons.json'
import PmImg from 'components/PmImg'

const fullPokemonList = map(pokemonsObject, (name, id) => ({id, name}))
const KEYS_TO_FILTERS = ['id', 'name']

class PokemonFilterInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }
  }
  
  searchUpdated = (term) => {
    this.setState({searchTerm: term})
  }

  render() {
    const MAX_PM = 5
    const pokemonFilter = createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    const filteredPokemons = this.state.searchTerm.length ? 
      fullPokemonList.filter(pokemonFilter).slice(0, MAX_PM) :
      undefined
    return (
      <div className={css.searchContainer}>
        <SearchInput
          className={`${css.searchInput} input-group`}
          onChange={this.searchUpdated}
          inputClassName='form-control'
          placeholder='Which Pokemon did you catch just now?'
        />
        <div className={css.searchResultPositioner}>
          {filteredPokemons &&
            <div className={css.searchResult}>
            {
              filteredPokemons.map((pokemon) => {
                return (
                  <div className={css.searchResultItem}>
                    <div
                      className={css.searchResultWrapper}
                      key={pokemon.id}
                      onClick={this.props.onSelect.bind(this, pokemon.id)}
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
                )
              })
            }
            </div>
          }
        </div>
      </div>
    )
  }
}

class PokemonSelected extends Component {
  render() {
    const pokemon = pokemonsObject[this.props.pmId]
    return (
      <div className={css.toPost}>
        <div className={css.toPostLeft}>
          <PmImg id={this.props.pmId} size={60} />
        </div>
        <div className={css.toPostRight}>
          <div className={css.toPostLine}>
            <FontAwesome name='dot-circle-o' className={css.toPostLineIcon} />
            <span className={css.toPostLineContents}>{pokemon}</span>
          </div>
          <div className={css.toPostLine}>
            <FontAwesome name='clock-o' className={css.toPostLineIcon} />
            <span className={css.toPostLineContents}>Just now</span>
          </div>
        </div>
      </div>
    )
  }
}

export default
@connect(
  (state) => ({
    user: state.auth.user,
  }),
  {
    submitPost,
    postError,
  }
)
class PostPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pmIdSelected: null,
    }
  }

  componentWillMount() {
    this.props.postError()
  }

  onPmSelect = (pmId) => {
    this.setState({pmIdSelected: pmId})
  }

  onPmDeselect = () => {
    this.setState({pmIdSelected: null})
  }

  render() {
    return (
      <div className={css.postContainer}>
        <div className={css.pmSelector}>
        {this.state.pmIdSelected ? 
          <PokemonSelected
            pmId={this.state.pmIdSelected}
            onDeselect={this.onPmDeselect}
          />
         :
          <PokemonFilterInput
            onSelect={this.onPmSelect}
          />
        }
        </div>
        <div className={css.actionRow}>
          <div className={css.actionRowFiller}></div>
          <Button
            disabled={!this.state.pmIdSelected}
            onClick={this.onPmDeselect}
          >
            Clear
          </Button>
          <Button
            bsStyle="primary"
            disabled={!this.state.pmIdSelected}
          >
            Post!
          </Button>
        </div>
      </div>
    )
  }
}

