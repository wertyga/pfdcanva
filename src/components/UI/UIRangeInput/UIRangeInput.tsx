import React, { useRef } from 'react';

import s from './styles.module.css';

export const UIRangeInput = ({ min = 0, max = 100, onChange, value }) => {
  const thumbRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLInputElement>(null);

  const calculateThumbPosition = () => {
    if (!wrapperRef.current || !thumbRef.current) return 0;
    const onePer = wrapperRef.current.offsetWidth / max;
    const currentPosition = onePer * value * 0.89;
    return currentPosition;
  };

  return (
    <div className={`UI__rangeInput ${s.rangeInput}`}>
      <span
        ref={thumbRef}
        className={s.thumb}
        style={{
          left: calculateThumbPosition(),
        }}
      />
      <span className={s.rangeSlide} />
      <span
        className={s.track}
        ref={trackRef}
        style={{
          width:
            calculateThumbPosition() + (thumbRef.current?.offsetWidth || 0) / 2,
        }}
      />
      <input
        ref={wrapperRef}
        type="range"
        min={min}
        max={max}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
