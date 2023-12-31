import React from "react";
import PropTypes from "prop-types";
import readedSvg from "../images/readed.svg";
import noReadedSvg from "../images/noreaded.svg";

const IconReaded = ({ isMe, isReaded }) =>
  (isMe &&
    (isReaded ? (
      <img className="message__icon-readed" src={readedSvg} alt="Readed icon" />
    ) : (
      <img
        className="message__icon-readed message__icon-readed--no"
        src={noReadedSvg}
        alt="No readed icon"
      />
    ))) ||
  null;

IconReaded.propTypes = {
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool
};

export default IconReaded;