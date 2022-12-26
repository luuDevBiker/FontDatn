import React, { useEffect, useRef, useState } from 'react';

import CountDownCard from './CountDownCard';

const CountDownTimer = () => {
  //card ref
  const SecondsCardRef = useRef();
  const MinutesCardRef = useRef();
  const HoursCardRef = useRef();
  const DaysCardRef = useRef();
  //state
  const [days, setDays] = useState<any>(14);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    seconds === 0 && setSeconds(59);
    minutes === 0 && setMinutes(59);
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        SecondsCardRef?.current?.classList?.toggle('rotate');
      }, 1000);
    }
    if (seconds === 0 && minutes > 0) {
      setMinutes(minutes - 1);
      MinutesCardRef?.current?.classList.toggle('rotate');
    }
  }, [seconds, minutes]);
  useEffect(() => {
    hours === 0 && setHours(23);
    if (minutes === 0 && hours > 0) {
      setHours(hours - 1);
      HoursCardRef?.current?.classList?.toggle('rotate');
    }
  }, [minutes, hours]);
  useEffect(() => {
    days === 14 && setDays(13);
    hours === 0 &&
      setDays(Number(days) - 1) &&
      DaysCardRef.current?.classList.toggle('rotate');
  }, [hours, days]);
  return (
    <div className="countdown__container">
      <CountDownCard
        label="Ngày"
        number={days}
        cardRef={DaysCardRef}
      />
      <CountDownCard
        label="Giờ"
        number={hours}
        cardRef={HoursCardRef}
      />
      <CountDownCard
        label="Phút"
        number={minutes}
        cardRef={MinutesCardRef}
      />
      <CountDownCard
        label="Giây"
        number={seconds}
        cardRef={SecondsCardRef}
      />
    </div>
  );
};

export default CountDownTimer;
