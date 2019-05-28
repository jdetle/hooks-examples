import React, { useEffect, useState } from "react";

const delayedFetch = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};
const OwnUserContext = (props: {}) => {
  const [a, setA] = useState<any>("I am item a unrendered ");
  const [b, setB] = useState<any>("I am item b unrendered!");
  useEffect(() => {
    delayedFetch(1000).then(() => {
      setA("I Am Item A Rendering");
    });
  }, []);

  useEffect(() => {
    delayedFetch(4000).then(() => {
      setB("I Am Item B Rendering");
    });
  }, []);

  return (
    <div>
      <article>{a}</article>
      <article>{b}</article>
    </div>
  );
};

export default OwnUserContext;
