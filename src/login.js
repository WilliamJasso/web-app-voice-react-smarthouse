import React, { useState } from "react";
import "./login.css";
import Loader from "./loader";
import microphoneIcon from "./icon-mic.png";

function LoginPage({ onLogin }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleMicrophoneClick = () => {
    setIsListening(true);
    recognizeSpeech();
  };

  const recognizeSpeech = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setPin(transcript);
      handleSubmit();
    };

    recognition.onerror = function (event) {
      setError("Error en el reconocimiento de voz. Intenta nuevamente.");
      setIsListening(false); // Detener el escuchando cuando hay un error
    };

    recognition.onend = function () {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSubmit = () => {
    const pinWithoutSpaces = pin.replace(/\s+/g, '');
    console.log("PIN reconocido sin espacios:", pinWithoutSpaces);
    if (pinWithoutSpaces === "1234") {
      onLogin();
    } else {
      setError("PIN incorrecto. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="login">
      <h2>Login Administrador</h2>
      <p>Por favor, di el PIN:</p>
      {isListening && <Loader />} {/* Mostrar el Loader si está escuchando */}
      {!isListening && (
        <button className="microphone-button" onClick={handleMicrophoneClick}>
          <img src={microphoneIcon} alt="Microphone" style={{ width: "40px" }} />
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
