import React, { useState } from "react";
import "./btninfo.css";
import foco from "./img/foco-encendido.png";
import camara from "./img/camara-icon-.png";
import ventilador from "./img/ventilador-icon.png";
import cortina from "./img/cortina.png";

function BtnInfo() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <span className={`tooltip ${isTooltipVisible ? "visible" : ""}`}>
        <div className="tooltip-title"> Dime: </div>
        
        <div className="Logo">
          <img src={cortina} alt="CamaraLogo" />
        </div>
        <div className="tooltip-item">"Abre las cortinas"</div>
        <div className="tooltip-item">"Cierra las cortinas"</div>
        <br/>
        <div className="Logo">
          <img src={ventilador} alt="Ventilador Logo" />
        </div>
        <div className="tooltip-item">"Enciende el ventilador"</div>
        <div className="tooltip-item"> "Apaga el ventilador"</div>
       
        <br />
       
       
        <div className="Logo">
          <img src={camara} alt="CamaraLogo" />
        </div>
        <div className="tooltip-item">"Enciende las cámaras de seguridad"</div>
        <div className="tooltip-item">"Apaga las cámaras de seguridad"</div>
        <br />
        
        <div className="Logo">
          <img src={foco} alt="Foco Logo" />
        </div>
        <div className="tooltip-item">"Enciende la luz de la sala o comedor"</div>
        <div className="tooltip-item">"Apaga la luz de la sala o comedor"</div>
        <br />
  
        <div className="tooltip-item">"Enciende las luces del jardin"</div>
        <div className="tooltip-item">"Apaga las luces del jardin"</div>
   
   
       
        
        {/* Logo de youtube */}
       
      </span>
      <span className="text">Como usarlo? 🤔 </span>
    </div>
  );
}

export default BtnInfo;
