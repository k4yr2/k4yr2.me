"use client";
import Typewriter from 'typewriter-effect';

const HomePage = () => {
  return (
    <div>
      HiHa
      <Typewriter
        options={{
          strings: ['Hello', 'World'],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}

export default HomePage;