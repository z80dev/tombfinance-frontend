import React, { useEffect } from 'react';
import WalletCard from './WalletCard';
import { Modal, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import metamaskLogo from '../../assets/img/metamask-fox.svg';
import walletConnectLogo from '../../assets/img/wallet-connect.svg';
import { useWallet } from 'use-wallet';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

const WalletProviderModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account) {
      handleClose();
    }
  });

  return (
    <Modal
      aria-labelledby="connect a wallet"
      aria-describedby="connect your crypto wallet"
      open={open}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <h2>Connect Wallet</h2>
        <List component="nav" aria-label="main mailbox folders">
          <WalletCard
            icon={<img src={metamaskLogo} alt="Metamask logo" style={{ height: 32 }} />}
            onConnect={() => {
              connect('injected');
            }}
            title="Metamask"
          />
          <WalletCard
            icon={<img src={walletConnectLogo} alt="Wallet Connect logo" style={{ height: 24 }} />}
            onConnect={() => {
              connect('walletconnect');
            }}
            title="WalletConnect"
          />
        </List>
      </div>
    </Modal>
  );
};

export default WalletProviderModal;
