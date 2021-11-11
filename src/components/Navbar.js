import logo from '../assets/logo.png';
import { MinusSmIcon, XIcon } from '@heroicons/react/solid';
import { sendMessage } from '../utils/utils.js';

function Navbar() {
  return(
    <nav>
      <img id="app-icon" src={logo} alt="logo"/>
      <div className="w"></div>
      <div className="buttons">
        <button type="button" onClick={() => sendMessage({message: 'appMinimize'})}><MinusSmIcon /></button>
        <button type="button" onClick={() => sendMessage({message: 'appExit'})} id="close-button"><XIcon /></button>
      </div>
    </nav>
  )
}

export default Navbar;
