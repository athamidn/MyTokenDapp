
---

# MyToken Dapp

MyToken Dapp is a decentralized application (DApp) that demonstrates the creation, minting, and transferring of an ERC20 token. The project includes both a backend (smart contract) written in Solidity and a frontend built with React and Material-UI. This DApp allows users to mint new tokens, transfer tokens to other addresses, and view transaction history and balances.

## Features

1. **Mint Tokens**: Users can mint new tokens to their address.
2. **Transfer Tokens**: Users can transfer tokens to another address.
3. **View Balance**: Users can view their token balance.
4. **View Recipient Balance**: Users can check the token balance of another address.
5. **Transaction History**: Users can view the history of minting and transferring transactions.

## Technologies Used

- **Solidity**: For writing the smart contract.
- **Hardhat**: For compiling, deploying, and testing the smart contract.
- **React**: For building the frontend.
- **Material-UI**: For styling the frontend components.
- **Ethers.js**: For interacting with the Ethereum blockchain.
- **Infura**: For connecting to the Ethereum network.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed.
- A MetaMask wallet installed in your browser.
- An Infura account for connecting to the Ethereum network.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/MyTokenDapp.git
cd MyTokenDapp
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Set the following environment variables in your terminal before running the Hardhat scripts:

```json
export INFURA_API_KEY=YOUR_INFURA_PROJECT_ID
export SEPOLIA_PRIVATE_KEY=YOUR_PRIVATE_KEY
```

### 4. Compile the Smart Contract

Use Hardhat to compile the smart contract:

```bash
npx hardhat compile
```

### 5. Deploy the Smart Contract

Deploy the smart contract to the desired network:

```bash
npx hardhat run scripts/deployer.js --network sepolia
```

Note: Replace `sepolia` with your desired network if necessary.

### 6. Run the Frontend

Start the frontend development server:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000` to interact with the DApp.

### 7. Interact with the DApp

- **Mint Tokens**: Enter the amount to mint and click "Mint".
- **Transfer Tokens**: Enter the recipient address and amount to transfer, then click "Transfer".
- **Check Recipient Balance**: Enter the recipient address and click "Check Recipient Balance".
- **View Transaction History**: View the list of minting and transferring transactions.

## Project Structure

- `contracts/`: Contains the Solidity smart contract `MyToken.sol`.
- `scripts/`: Contains the deployment script `deployer.js`.
- `src/`: Contains the React frontend code.
    - `App.js`: The main React component.
    - `MyToken.json`: ABI of the deployed smart contract.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, feel free to reach out.

---
