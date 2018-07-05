import React from 'react';

import CountDown from '../CountDown/CountDown';

const ShowDetail = (props) => { 
  function removeHTML(string) {
    return string.replace(/<\/?[^>]+(>|$)/g, "");
  }
  if (props.show) {
    return (
      <div>
        <div>
          <img src={props.show.image.medium} alt={`Poster for ${props.show.name}`} />
        </div>
        <div>
          {removeHTML(props.show.summary)}
        </div>
        <CountDown nextEpAirTime={props.nextEpAirTime} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default ShowDetail;