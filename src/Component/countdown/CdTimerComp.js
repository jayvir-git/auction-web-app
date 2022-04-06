import { useState } from 'react';
import CountDownTimer from './CountDownTimer';

const CdTimerComp = ({ targetDate }) => {
  return (
    <div className='countdown-container'>
      <CountDownTimer targetDate={targetDate} />
    </div>
  );
};

export default CdTimerComp;
