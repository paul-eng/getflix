import React from 'react';
import { connect } from 'react-redux';
import { hashHistory, withRouter } from 'react-router';

class SearchBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {inputVal: ''};
      this.handleInput = this.handleInput.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.revealSearch = this.revealSearch.bind(this);
      this.searchSlide = this.searchSlide.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.searchSlide);
    if (this.props.queryString !== '') {
      this.revealSearch();
      this.setState({inputVal: this.props.queryString});
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location !== '/search') {
      this.setState({inputVal: ''});
    }
  }

  handleInput(event) {
    this.setState({inputVal: event.currentTarget.value}, this.updateQueryString);
  }

  updateQueryString() {
    if (this.state.inputVal !== '') {
      hashHistory.push(`/search?q=${this.state.inputVal}`);
    } 
  }

  handleClick() {
    this.setState({inputVal: ''}, this.updateQueryString);
    this.hideSearch()
  }

  revealSearch() {
    document.getElementsByClassName("searchBar")[0].classList.add('revealSearch');
    document.getElementsByClassName("inputField")[0].placeholder = "Search by Title";
    document.getElementsByClassName("inputField")[0].classList.add('placeholderColor');
  }

  hideSearch() {
    document.getElementsByClassName("searchBar")[0].classList.remove('revealSearch');
    document.getElementsByClassName("inputField")[0].placeholder = "Search";
    document.getElementsByClassName("inputField")[0].classList.remove('placeholderColor');
  }

  searchSlide(event) {
    let searchbar = document.getElementsByClassName('searchBar')[0];
    let clickedsearch = searchbar.contains(event.target);
    if (!clickedsearch && this.state.inputVal === '') {
     this.hideSearch()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.searchSlide);
  }

  render() {
    return(
      <div className="searchBar">
        <i className="fa fa-search"></i>
        <section className="inputBox">
          <input onClick={this.revealSearch} className="inputField" value={this.state.inputVal} onChange={this.handleInput} placeholder="Search" />
        </section>
        <div onClick={this.handleClick} className="closeBtn" >
        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 10.586l7.293-7.293 1.414 1.414L13.414 12l7.293 7.293-1.414 1.414L12 13.414l-7.293 7.293-1.414-1.414L10.586 12 3.293 4.707l1.414-1.414L12 10.586z" fill="currentColor"></path></svg>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.router.location.pathname,
    queryString: ownProps.router.location.search.slice(3)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
