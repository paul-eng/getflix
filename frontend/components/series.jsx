import React from 'react';
import { connect } from 'react-redux';
import { fetchSerie } from '../actions/series_actions';

class Series extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.fetchSerie(this.props.serie.id);
  }

  render()  {
    return(
      <div className="series">

        <div className="seriesMedia">
          <div className="imageScaler"></div>
          <img className="seriesImg" src={this.props.serie.thumbnail_url}/>
          <div className="seriesBgFade"/>
        </div>

        <div className="seriesInfo">
          <p>{ this.props.serie.title }</p>
          <text>{this.props.serie.description}</text>
        </div>

        <i onClick={this.handleClick} className="fa fa-angle-down"></i>


      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSerie: (id) => (dispatch(fetchSerie(id)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Series);
