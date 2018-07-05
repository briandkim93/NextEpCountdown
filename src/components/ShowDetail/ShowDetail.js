import React from 'react';

import './ShowDetail.css';

import CountDown from '../CountDown/CountDown';

const ShowDetail = (props) => { 
  function removeElementTags(string) {
    return string.replace(/<\/?[^>]+(>|$)/g, "");
  }
  if (props.show) {
    const imageSource = props.show.image ? props.show.image.original : '';
    return (
      <div className="show-detail row mt-3">
        <div className="show-detail-img col-sm-4">
          <img 
            className="img-fluid w-100" 
            src={imageSource} 
            alt={`Poster for ${props.show.name}`} 
          />
        </div>
        <div className="col-sm-8">
          <h1 className="show-title">{props.show.name}</h1>
          <hr />
          <p className="summary">{removeElementTags(props.show.summary)}</p>
          <hr />
          
          <CountDown secondsUntilNextEp={props.secondsUntilNextEp} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default ShowDetail;