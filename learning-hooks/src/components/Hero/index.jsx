import React from 'react';
import PropTypes from 'prop-types';

Hero.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
};

Hero.defaultProps = {
  name: '',
  data: []
}

function Hero(props) {
  const { name } = props;
  console.log("Hero", name);

  return (
    <div>
      Hero name: {name}
    </div>
  );
}

export default React.memo(Hero);