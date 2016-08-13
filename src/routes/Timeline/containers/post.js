import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome' 
//import { Link } from 'react-router'
//import firebase from 'firebase'
import SearchInput, { createFilter } from 'react-search-input'
import { map } from 'lodash'

import { submitPost, postError } from '../modules'
import css from './post.scss'
import pokemonsObject from 'static/pokemons.json'

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
    const filteredPokemons = this.state.searchTerm.length ? 
      fullPokemonList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS)) :
      undefined
    return (
      <div className={css.searchContainer}>
        <SearchInput className={css.searchInput} onChange={this.searchUpdated} />
        {filteredPokemons &&
          <div className={css.searchResult}>
          {
            filteredPokemons.map((pokemon) => {
              return (
                <div
                  className={css.searchResultItem}
                  key={pokemon.id}
                  onClick={this.props.onSelect.bind(this, pokemon.id)}
                  >
                  <div>{pokemon.name}</div>
                </div>
              )
            })
          }
          </div>
        }
      </div>
    )
  }
}

class PokemonSelected extends Component {
  render() {
    return (
      <div>Selected: 
      {
        pokemonsObject[this.props.pmId]
      }
        <div onClick={this.props.onDeselect}>
          <FontAwesome name='times' size='10px'/>
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
      </div>
    )
  }
}

