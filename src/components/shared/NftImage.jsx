import { useState } from "react";

const NftImage = (props) => {
  const { src } = props;
  let [reloadCount, setReloadCount] = useState(0);

  const handleOnError = ({ currentTarget }) => {
    currentTarget.onerror = null;
    if (reloadCount < 3) {
      console.log('reload img');
      setReloadCount(++reloadCount);
      currentTarget.src = src;
    }
  };

  return (
    <img
      {...props}
      src={src}
      onError={handleOnError}
    />
  );
};

export default NftImage;
