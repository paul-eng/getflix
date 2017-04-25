import React from 'react';
import { connect } from 'react-redux';
import Series from './series';
import SeriesViewer from './series_viewer';

class SeriesRow extends React.Component {
  constructor(props) {
      super(props);

      this.state = {selectedSerie: ''};
      // this.handleClick = this.handleClick.bind(this);
  }


  // handleClick(event) {
  //   this.setState({selectedSerie: event.currentTarget.className}, this.closeAllViewers);
  // }
  //
  // // componentWillReceiveProps(newProps){
  // //   let thisSeriesIds = this.props.row.map(serie=>serie.id);
  // //
  // //   if (newProps.seriesDetail !== this.props.seriesDetail) {
  // //     if (thisSeriesIds.includes(newProps.seriesDetail.id))
  // //     this.openThisViewer();
  // //   }
  // // }
  //
  // closeAllViewers() {
  //   let viewers = document.getElementsByClassName('viewer');
  //   for (var i = 0; i < viewers.length; i++) {
  //     viewers[i].classList.remove('viewerSlideOut');
  //   }
  // }
  //
  // openThisViewer() {
  //   let myViewer = document.getElementsByClassName(`viewer-${this.props.rowId}`)[0];
  //   myViewer.classList.add('viewerSlideOut');
  // }


  render()  {

    let series = this.props.row.map(serie=><li className={serie.id} key={serie.id} ><Series  serie={serie} /></li>);

    let serieId = series[0].key;
    if (this.state.selectedSerie !== '') {
      serieId = this.state.selectedSerie;
    }

    return(
      <div className="seriesRow">
        { series }
        <aside className="clearFlex"/>
        <div className={`viewer viewer-${this.props.rowId}`}><SeriesViewer thisViewerId={`viewer-${this.props.rowId}`} serieId={serieId}/></div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    seriesDetail: state.series.seriesDetail
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesRow);
