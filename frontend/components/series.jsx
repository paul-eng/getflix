import React from 'react';
import { connect } from 'react-redux';
import { fetchSeries } from '../actions/series_actions';

class Series extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSeries(this.props.seriesId);
  }

  render() {
      return(
        <div>
          { this.props.series.id }
          { this.props.series.name }
        </div>
      );
    }
  }

const mapStateToProps = (state, ownProps) => {
  return {
    series: state.series
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSeries: (id) => (dispatch(fetchSeries(id)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Series);
