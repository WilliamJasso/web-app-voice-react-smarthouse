import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./header";
import Loader from "./loader";
import BtnInfo from "./btninfo";
import LoginPage from "./login"; // Importa el componente LoginPage
import microphoneIcon from "./icon-mic.png";
import "./btn.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [textRecognized, setTextRecognized] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = (username, password) => {
    // Aquí podrías realizar la autenticación del usuario, por ejemplo, enviando una solicitud POST al servidor
    // axios.post("/login", { username, password })
    //   .then((response) => {
    //     setIsLoggedIn(true);
    //   })
    //   .catch((error) => {
    //     console.error("Error de inicio de sesión:", error);
    //   });

    // Por ahora, simularemos que el inicio de sesión es exitoso
    setIsLoggedIn(true);
  };

  const handleClick = () => {
    setIsListening(true);
    setIsLoading(true); // Mostrar el Loader cuando se inicia el reconocimiento de voz
    recognizeSpeech();
  };

  const recognizeSpeech = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript.toLowerCase(); // Convertir a minúsculas
      setRecognizedText(transcript);
      setTextRecognized(true); // Establecer el estado textRecognized a true cuando se reconoce el texto

      // Obtener la fecha y hora actual
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      // Hacer una solicitud POST con AXIOS para almacenar la orden en la API
      axios
        .post("https://660b579accda4cbc75dcaf79.mockapi.io/Orders", {
          order: transcript,
          user: "Admin", // Reemplaza "usuario" con el nombre de usuario real
          dateTime: formattedDate,
        })
        .then(function (response) {
          console.log("Orden almacenada con éxito:", response.data);
        })
        .catch(function (error) {
          console.error("Error al almacenar la orden:", error);
        });

      // Restaurar el estado textRecognized a false después de 5 segundos
      setTimeout(() => {
        setTextRecognized(false);
      }, 3000);
    };

    recognition.onerror = function (event) {
      setRecognizedText(
        "Error en el reconocimiento de voz. Intenta nuevamente."
      );
    };

    recognition.onend = function () {
      setIsListening(false);
      setIsLoading(false); // Ocultar el Loader cuando se detiene el reconocimiento de voz
    };

    recognition.start();
  };

  return (
    <div>
      <Header />
      {/* Si el usuario no ha iniciado sesión, muestra la página de inicio de sesión */}
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />}
      {/* Si el usuario ha iniciado sesión, muestra la aplicación principal */}
      {isLoggedIn && (
        <div className="App">
          <p>Haz click en el botón y di una orden ...</p>
          <button
            id="voiceBtn"
            className={`Btn ${isListening ? "active" : ""}`}
            onClick={handleClick}
            disabled={isListening}
          >
            <img src={microphoneIcon} alt="Microphone" />
          </button>
          {isLoading && <Loader />}
          <div id="result" className={`Result ${textRecognized ? "recognized" : ""}`}>
            <p>
              Orden identificada: <strong>{recognizedText}</strong>
            </p>
          </div>
          <BtnInfo />
        </div>
      )}
    </div>
  );
}

export default App;
