import './hero.css';

import bgImage from '../../../assets/home-page/banner.webp';
import { handleAnimationAndAction } from '../../utils/animation-handler';

const Hero = () => {
  const scrollToIntro = () => {
    const introSection = document.getElementById('sobre');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-15 text-white bg-gradient-to-t from-[rgba(0,9,51,0.8)] to-transparent">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 font-sansation">
            IMPULSIONADOS PELA INOVAÇÃO. <br /> MOVIDOS POR DESAFIOS.
          </h1>
          <p className="text-lg mb-6 max-w-xl">
            Conheça a equipe que, em apenas 118 dias, projetou, construiu, testou e colocou em voo
            um drone autônomo totalmente funcional. Uma prova de engenharia, inovação e trabalho em
            equipe que saiu do papel e ganhou os céus.
          </p>

          <button
            className="hero-button"
            onClick={(e) => handleAnimationAndAction(e, scrollToIntro)}
          >
            <span className="hero-button-text">Descubra o que nos move</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
