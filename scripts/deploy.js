async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(2000000);
    await token.waitForDeployment();
    console.log('Token deployed to:', await token.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
