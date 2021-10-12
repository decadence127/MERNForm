import { CircularProgress } from '@material-ui/core';
import classes from "LoadingSpinner.module.css"
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className={classes.outerContainer}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;