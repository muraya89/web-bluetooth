import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

document.querySelector('#app').innerHTML = `
  <div>
    
  </div>
  <button id="connect">Find a device to pair with</button>
`;
async function connectToBluetooth() {
  try {
    console.log(navigator.bluetooth);
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }],
    });
    const server = await device.gatt?.connect();
    const service = await server?.getPrimaryService('battery_service');
    const characteristic = await service?.getCharacteristic('battery_level');
    const batteryLevel = await characteristic?.readValue();
    console.log('Battery level:', batteryLevel?.getUint8(0));
  } catch (error) {
    console.error('Bluetooth connection failed', error);
  }
}

let button = document.getElementById('connect');
button.addEventListener('click', connectToBluetooth);

setupCounter(document.querySelector('#counter'));
