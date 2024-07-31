import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MyToken from './MyToken.json';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  CssBaseline,
  AppBar,
  Toolbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const myTokenAddress = 'Deployed contract address';

function App() {
  const [balance, setBalance] = useState();
  const [amount, setAmount] = useState();
  const [recipient, setRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState();
  const [recipientBalance, setRecipientBalance] = useState();
  const [userAddress, setUserAddress] = useState();
  const [network, setNetwork] = useState('localhost');
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(myTokenAddress, MyToken.abi, provider);

        try {
          const balance = await contract.balanceOf(account);
          setBalance(balance.toString());
          fetchTransactionHistory(contract, account);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };
    fetchBalance();
  }, []);

  const fetchTransactionHistory = async (contract, account) => {
    const filterMint = contract.filters.TokensMinted(account, null);
    const filterTransferTo = contract.filters.TokensTransferred(null, account);
    const filterTransferFrom = contract.filters.TokensTransferred(account, null);

    const mintEvents = await contract.queryFilter(filterMint);
    const transferToEvents = await contract.queryFilter(filterTransferTo);
    const transferFromEvents = await contract.queryFilter(filterTransferFrom);

    const history = [
      ...mintEvents.map(event => ({
        type: 'Minted',
        amount: ethers.utils.formatUnits(event.args.amount, 18),
        to: event.args.to,
        transactionHash: event.transactionHash
      })),
      ...transferToEvents.map(event => ({
        type: 'Received',
        amount: ethers.utils.formatUnits(event.args.amount, 18),
        from: event.args.from,
        transactionHash: event.transactionHash
      })),
      ...transferFromEvents.map(event => ({
        type: 'Sent',
        amount: ethers.utils.formatUnits(event.args.amount, 18),
        to: event.args.to,
        transactionHash: event.transactionHash
      }))
    ];

    setTransactionHistory(history);
  };

  const handleMint = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(myTokenAddress, MyToken.abi, signer);

      try {
        const tx = await contract.mint(account, ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        const balance = await contract.balanceOf(account);
        setBalance(balance.toString());
        setSnackbarMessage("Tokens minted successfully!");
        setOpen(true);
        fetchTransactionHistory(contract, account);
      } catch (error) {
        console.error("Error minting tokens:", error);
        setSnackbarMessage("Error minting tokens.");
        setOpen(true);
      }
    }
  };

  const handleTransfer = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(myTokenAddress, MyToken.abi, signer);

      try {
        const tx = await contract.transfer(recipient, ethers.utils.parseUnits(transferAmount, 18), {
          gasLimit: 100000
        });
        await tx.wait();
        const balance = await contract.balanceOf(account);
        setBalance(balance.toString());
        const recipientBal = await contract.balanceOf(recipient);
        setRecipientBalance(recipientBal.toString());
        setSnackbarMessage("Tokens transferred successfully!");
        setOpen(true);
        fetchTransactionHistory(contract, account);
      } catch (error) {
        console.error("Error transferring tokens:", error);
        setSnackbarMessage("Error transferring tokens.");
        setOpen(true);
      }
    }
  };

  const handleCheckRecipientBalance = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(myTokenAddress, MyToken.abi, provider);

      try {
        const recipientBal = await contract.balanceOf(recipient);
        setRecipientBalance(recipientBal.toString());
      } catch (error) {
        console.error("Error fetching recipient balance:", error);
        setSnackbarMessage("Error fetching recipient balance.");
        setOpen(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
    // Add logic to switch networks if necessary
  };

  return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MyToken Dapp
            </Typography>
            {/*<FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>*/}
            {/*  <InputLabel>Network</InputLabel>*/}
            {/*  <Select*/}
            {/*      value={network}*/}
            {/*      onChange={handleNetworkChange}*/}
            {/*      label="Network"*/}
            {/*  >*/}
            {/*    <MenuItem value="localhost">Localhost</MenuItem>*/}
            {/*    <MenuItem value="rinkeby">Rinkeby</MenuItem>*/}
            {/*    <MenuItem value="mainnet">Mainnet</MenuItem>*/}
            {/*  </Select>*/}
            {/*</FormControl>*/}
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" component="div" gutterBottom>
              Your address: {userAddress}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              Your balance: {balance}
            </Typography>
            <TextField
                label="Amount to mint"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={e => setAmount(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleMint} fullWidth>
              Mint
            </Button>
            <TextField
                label="Recipient address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
            />
            <TextField
                label="Amount to transfer"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={e => setTransferAmount(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={handleTransfer} fullWidth>
              Transfer
            </Button>
            <Button variant="contained" onClick={handleCheckRecipientBalance} fullWidth sx={{ mt: 2 }}>
              Check Recipient Balance
            </Button>
            {recipient && recipientBalance !== undefined && (
                <Typography variant="h6" component="div" gutterBottom sx={{ mt: 2 }}>
                  Recipient balance: {recipientBalance}
                </Typography>
            )}
            <Typography variant="h6" component="div" gutterBottom sx={{ mt: 2 }}>
              Transaction History
            </Typography>
            <List>
              {transactionHistory.map((tx, index) => (
                  <ListItem key={index}>
                    <ListItemText
                        primary={`${tx.type} ${tx.amount} tokens`}
                        secondary={`Transaction Hash: ${tx.transactionHash}`}
                    />
                  </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </React.Fragment>
  );
}

export default App;
