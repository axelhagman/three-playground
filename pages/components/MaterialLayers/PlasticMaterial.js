import React from 'react';

const PlasticMaterial = (props) => (
  <svg
    width={332}
    height={205}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g filter='url(#plastic)'>
      <path
        d='M312.847 125.19 177.32 188.575c-6.863 3.233-15.795 3.233-22.659 0L19.137 124.872c-5.703-2.687-9.13-7.216-9.129-12.067l.002-24.439c-.207-4.633 2.68-9.33 8.69-12.32L154.237 8.632c7.056-3.51 16.46-3.51 23.516 0l135.535 67.414c6.003 2.985 8.901 7.692 8.704 12.319l-.015 24.762c0 4.85-3.427 9.378-9.129 12.063Z'
        fill='#fff'
        fillOpacity={0.6}
      />
      <path
        d='M177.323 163.81c-6.863 3.233-15.795 3.233-22.658 0M10.51 91.139c1.1 3.443 3.978 6.644 8.62 8.83m293.729 0c4.642-2.186 7.527-5.376 8.63-8.814m-8.424-14.662c5.874 2.922 8.613 7.47 8.426 11.85v.011c-.185 4.218-3.09 8.452-8.845 11.163L177.11 163.358c-6.728 3.169-15.504 3.169-22.232 0L19.342 99.517c-5.75-2.709-8.644-6.957-8.832-11.173-.196-4.387 2.53-8.924 8.414-11.85L154.459 9.08c6.915-3.44 16.155-3.44 23.07 0l135.536 67.413Zm.007 23.928c4.187-1.972 7.019-4.769 8.416-7.872l-.012 20.577c0 4.596-3.253 8.979-8.842 11.612l-135.526 63.384-.001.001c-6.728 3.169-15.504 3.169-22.233 0L19.35 124.419c-5.59-2.633-8.843-7.018-8.842-11.614l.002-20.27c1.394 3.108 4.22 5.914 8.406 7.886l135.536 63.842c6.998 3.296 16.086 3.296 23.085 0l135.535-63.842Z'
        stroke='#fff'
        strokeOpacity={0.3}
      />
    </g>
    <defs>
      <filter
        id='plastic'
        x={-5}
        y={-9}
        width={342}
        height={215}
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feGaussianBlur in='BackgroundImage' stdDeviation={7.5} />
        <feComposite
          in2='SourceAlpha'
          operator='in'
          result='effect1_backgroundBlur_113_6'
        />
        <feColorMatrix
          in='SourceAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={5} />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
        <feBlend
          in2='effect1_backgroundBlur_113_6'
          result='effect2_dropShadow_113_6'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect2_dropShadow_113_6'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);

export default PlasticMaterial;
