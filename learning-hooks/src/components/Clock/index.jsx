import React from 'react';
import useClock from '../../hooks/useClock';

Clock.propTypes = {};

function Clock() {
  const { timeString } = useClock();
  return (
    <p styel={{ fontSize: '50px' }}>{timeString}</p>
  );
}

export default Clock;