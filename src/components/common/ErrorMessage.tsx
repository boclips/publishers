import React from 'react';

export const ErrorMessage = ({ errorMessage }) => (
  <>
    <h2 className="col-start-2 col-end-12">Did not work dude!</h2>
    <div className="col-start-2 col-end-12">error message: {errorMessage}</div>
  </>
);
