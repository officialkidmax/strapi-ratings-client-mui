import React, { useContext } from "react"
//@mui
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

import ReviewsContext from "../ReviewsProvider";

// const RootStyle = styled('div')(({ theme }) => ({
//   marginBlock: theme.spacing(11),
// }));

const ErrorBox = () => {
  const { errorHelperMessage } = useContext(ReviewsContext)
  if (!errorHelperMessage) {
    return null;
  };
  return (
    <>
      <Alert severity="error">{errorHelperMessage}</Alert>
    </>
  );
};

export default ErrorBox;
