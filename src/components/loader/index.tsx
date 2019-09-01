import React from "react";

interface OwnProps {
  visible: boolean;
}

const Loader: React.FC<OwnProps> = ({ visible }) => {
  return visible ? (
    <div className="loader">
      <div className="loader-icon">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  ) : null;
};

export { Loader };
