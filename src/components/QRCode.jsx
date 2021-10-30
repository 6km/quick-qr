import React, { useRef, useState } from 'react';
import { sendMessage, isUrl } from '../utils/utils.js'
import audio from '../assets/audio/success.wav';

export default function QRCode() {
  var urlInputRef = useRef();
  var [qrcode, setQrcode] = useState();
  var [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const args = {
    message: 'showSaveDialog',
    args: {
      url: qrcode
    }
  }

  var handleChange = () => {
    if (urlInputRef.current.value && isUrl(urlInputRef.current.value)) {
      setQrcode(`https://api.qrserver.com/v1/create-qr-code/?size=248x248&qzone=2&data=${urlInputRef.current.value}`);
      setIsSaveDisabled(false);
      new Audio(audio).play();
    } else {
      setQrcode(null);
      setIsSaveDisabled(true);
    }
  }

  return (
    <React.Fragment>
      <div id="code" className={`m ${!isSaveDisabled && 'hasImg'}`}>
        {!isSaveDisabled && <img alt="qrcode" src={qrcode} />}
      </div>
      <div id="qr-container">
        <input id="url-input" type="text" placeholder="google.com" onChange={() => handleChange()} ref={urlInputRef}/>
        <button onClick={() => sendMessage(args)} disabled={isSaveDisabled}>Save as..</button>
      </div>
    </React.Fragment>
  )
}
