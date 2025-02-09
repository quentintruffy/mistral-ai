'use client';

import Lottie from 'lottie-react';

import animationData from '../../../public/assets/infinit.json';

const Background = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      className="absolute right-0 left-0 -z-10"
    />
  );
};

export { Background };
