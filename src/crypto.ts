import {ethers} from 'ethers'
import {acceptHWRUpdate, defineStore} from 'pinia'
import contractABI from '../artifacts/contracts/WavePortal.sol/WavePortal.json'
const contractAddress = '0x656b3249d86e49ED1da1650EC99CF6073162A9f2';

export const useCryptoStore = defineStore('user', () => {
  const account = ref(null);
  const guestPosts = ref([] as any);
  const loading = ref(false);
  const guestPostsCount = ref(0);

  async function getBalance() {
    setLoader(true);
    try {
      const { ethereum } = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
        const count = await wavePortalContract.getBalance();
        const amt = ethers.utils.formatEther(count);
        console.log('count', amt);
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  }

  async function wave(messageInput) {
    console.log('setting loader');
    setLoader(true);
    try {
      console.log('got', messageInput)
      const {ethereum} = window;
    
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
        wavePortalContract.on("PrizeMoneySent", (reciever, amount) => {
          console.log('prize won!', reciever, amount);
        })

        const overrides = {
          value: ethers.utils.parseEther('.0005'),
        }

        const waveTxn = await wavePortalContract.wave(messageInput);
        console.log('Mining...', waveTxn.hash);
        await waveTxn.wait();
        console.log('Mined -- ', waveTxn.hash);

        const count = await wavePortalContract.totalWaveCount();
        console.log('count', count);
        messageInput = '';
        setLoader(false);

        setLoader(false);
      } else {
        console.log("No eht");
      }
    } catch(err) {
      setLoader(false);
      console.log(err);
    }
  }

  async function getAllWaves() {
    console.log('setting loader');
    setLoader(true);
    try {
      console.log('got', messageInput)
      const {ethereum} = window;
    
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

        const waves = await wavePortalContract.getAllWaves();

        const waveCleaned = [] as any;
        waves.forEach((wave) => {
          const waveTime = new Date(wave.timestamp * 1000);
          const waveTimeFormatted = new Intl.DateTimeFormat('en-US').format(waveTime) as any;

          wavesCleaned.push({
            address: wave.waver,
            timestamp: waveTimeFormatted,
            message: wave.message
          })

          guestPosts.value = wavesCleaned;
          wavePortalContract.on("NewWave", (from, message, timestamp) => {
            console.log('NewWave', from, message, timestamp);
            const waveTime = new Date(timestamp * 1000);
            
          }
        })
  }
