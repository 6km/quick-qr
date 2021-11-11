import React, { useRef, useState } from 'react';
import { isUrl, sendMessage } from '../utils/utils.js'
import audio from '../assets/audio/success.wav';

export default function QRCode() {
  let urlInputRef = useRef();
  let [qrcode, setQrcode] = useState();
  let [isSaveDisabled, setIsSaveDisabled] = useState(true);
  let [timer, setTimer] = useState(false);
  const args = {
    message: 'showSaveDialog',
    args: {
      url: qrcode
    }
  }

  let handleChange = () => {
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      if (urlInputRef.current.value.trim() && isUrl(urlInputRef.current.value)) {
        setQrcode(`https://api.qrserver.com/v1/create-qr-code/?size=248x248&qzone=2&data=${urlInputRef.current.value.trim()}`);
        setIsSaveDisabled(false);
        new Audio(audio).play();
      } else {
        setQrcode(null);
        setIsSaveDisabled(true);
      }
    }, 400)

    setTimer(newTimer)
  };

  return (
    <>
      <div id="code" className={`m ${!isSaveDisabled && 'hasImg'}`}>
        {!isSaveDisabled && <img alt="qrcode" src={qrcode} />}
      </div>
      <div id="qr-container">
        <input id="url-input" autoFocus type="text" placeholder="google.com" onChange={() => handleChange()} ref={urlInputRef}/>
        <button type="button" onClick={() => sendMessage(args)} disabled={isSaveDisabled}>Save as..</button>
      </div>
    </>
  )
}
