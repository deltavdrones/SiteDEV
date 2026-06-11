import './Intro.css';

import { useNavigate } from 'react-router-dom';

import { handleAnimationAndAction } from '../../utils/animation-handler';

const Intro = () => {
  const navigate = useNavigate();
  const navigateToAbout = () => {
    navigate('/sobre');
  };

  return (
    <section id="sobre" className="intro-section">
      <div className="intro-content">
        <div className="intro-left">
          <div className="pernambuco-bar"></div>
          <div className="intro-text-content">
            <h2 className="intro-title">
              SOMOS A<br />
              DELTAV
            </h2>
            <p className="intro-subtitle">
              A PRIMEIRA EXTENSÃO DE <br /> DRONES EM PERNAMBUCO
            </p>

            <button
              className="intro-button"
              onClick={(e) => handleAnimationAndAction(e, navigateToAbout)}
            >
              <span className="button-text">Sobre nós</span>
              <span className="button-icon">→</span>
            </button>
          </div>
        </div>
        <div className="intro-right">
          <p className="intro-description">
            A DeltaV Drones é a primeira extensão universitária dedicada ao desenvolvimento de
            drones autônomos em Pernambuco, formada por estudantes da POLI/UPE. Atuamos na fronteira
            entre pesquisa acadêmica e aplicação prática, combinando inovação, engenharia e
            propósito. Por meio de projetos desafiadores, competições nacionais e colaboração
            multidisciplinar, cultivamos uma cultura de foco em resultados, impulsionando o futuro
            da mobilidade aérea inteligente e conectada.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
