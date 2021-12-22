import React from 'react';

const ClipPath = (props) => (
  <svg
    width={332}
    height={205}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <clipPath id='myClip'>
      <path
        d='M312.847 125.19 177.32 188.575c-6.863 3.233-15.795 3.233-22.659 0L19.137 124.872c-5.703-2.687-9.13-7.216-9.129-12.067l.002-24.439c-.207-4.633 2.68-9.33 8.69-12.32L154.237 8.632c7.056-3.51 16.46-3.51 23.516 0l135.535 67.414c6.003 2.985 8.901 7.692 8.704 12.319l-.015 24.762c0 4.85-3.427 9.378-9.129 12.063Z'
        fill='#fff'
        fillOpacity={0.6}
      />
    </clipPath>
  </svg>
);

export default ClipPath;
