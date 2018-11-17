import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filtering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNow: false,
    }
    this.toggleOpenNow = this.toggleOpenNow.bind(this);
  }

  toggleOpenNow() {
    let currentValue = this.state.openNow;
    this.setState({ openNow: !currentValue });
  }
  render() {
    let { openNow } = this.state;
    return (
      <div className="filter-container">
        <div className="search-filters">
          <button 
            className={`filter-chip ${openNow ? "active" : ""}`}
            onClick={this.toggleOpenNow}
          >
            Open now
          </button>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    userLocation: state.user.location,
  };
}

export default connect(mapStateToProps)(Filtering);
