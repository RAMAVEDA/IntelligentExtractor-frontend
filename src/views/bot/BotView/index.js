import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Bot"
    >
      <Container maxWidth="lg">
      {/* <Toolbar /> */}
      <iframe style={{
        // border: "solid",
        minWidth: "100%",
        height: "80vh",
      }} src='https://webchat.botframework.com/embed/hackathon-ie-qna-bot?s=eppLXtKmfDY.DFTJp-8LhcyPzXCKz7oqEE1CETKBm3Z-CbujujcftJc'  ></iframe>
      </Container>
    </Page>
  );
};

export default SettingsView;
