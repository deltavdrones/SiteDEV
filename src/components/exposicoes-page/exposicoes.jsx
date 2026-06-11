import '../utils/global-cta.css';
import './exposicoes.css';

import { useNavigate } from 'react-router-dom';

import fotoETEPAM1 from '../../assets/exposicoes-page/ETEPAM/ete1.webp';
import fotoETEPAM2 from '../../assets/exposicoes-page/ETEPAM/ete2.webp';
import fotoETEPAM3 from '../../assets/exposicoes-page/ETEPAM/ete3.webp';
import fotoIFPE1 from '../../assets/exposicoes-page/IFPE/ifpe1.webp';
import fotoIFPE2 from '../../assets/exposicoes-page/IFPE/ifpe2.webp';
import fotoIFPE3 from '../../assets/exposicoes-page/IFPE/ifpe3.webp';
import fotoSU20251 from '../../assets/exposicoes-page/SU2025/SU1.webp';
import fotoSU20252 from '../../assets/exposicoes-page/SU2025/SU2.webp';
import fotoSU20253 from '../../assets/exposicoes-page/SU2025/SU3.webp';
import { handleAnimationAndAction } from '../utils/animation-handler';

const Exposicoes = () => {
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    handleAnimationAndAction(e, () => navigate('/contato'));
  };

  const visitas = [
    {
      local: 'Semana Universitária da POLI-UPE 2025',
      descricao:
        'A Semana Universitária da POLI-UPE 2025 marcou a primeira exposição oficial dos nossos novos integrantes, que conduziram as apresentações com notável competência e profissionalismo. Além de engajar a comunidade acadêmica com nossos drones, a equipe demonstrou alto desempenho técnico ao desenvolver, simultaneamente ao evento, uma solução integrada de software e hardware para um desafio interno proposto pela liderança, reafirmando o compromisso do grupo com a excelência na engenharia.',
      fotos: [fotoSU20251, fotoSU20252, fotoSU20253],
    },
    {
      local: 'IFPE Campus Recife (Instituto Federal de Pernambuco)',
      descricao:
        'No dia 8 de julho, nossa equipe teve a oportunidade de conhecer os estudantes do primeiro período do curso técnico em Mecânica do IFPE Campus Recife. A visita foi uma excelente oportunidade para mostrar como a teoria se aplica na prática, além de inspirar os alunos com as possibilidades que a engenharia e a tecnologia oferecem.',
      fotos: [fotoIFPE1, fotoIFPE2, fotoIFPE3],
    },
    {
      local: 'ETE-PAM (Escola Técnica Estadual Professor Agamenon Magalhães)',
      descricao:
        'No dia 4 de julho, nossa equipe esteve na ETEPAM para apresentar nosso drone e compartilhar com estudantes do ensino técnico um pouco da nossa trajetória em competições universitárias. Foi uma oportunidade valiosa de troca, divulgação científica e incentivo às áreas tecnológicas, reafirmando nosso compromisso com a formação de novos talentos e a conexão entre universidade e sociedade.',
      fotos: [fotoETEPAM1, fotoETEPAM2, fotoETEPAM3],
    },
  ];

  return (
    <section className="exposicoes-section">
      <div className="exposicoes-container">
        <div className="exposicoes-header">
          <h1 className="exposicoes-title">Nossas Exposições</h1>
          <p className="exposicoes-subtitle">
            Acreditamos que a engenharia tem o poder de transformar o futuro. Por isso, a DeltaV
            leva a nossa paixão por drones e tecnologia a escolas e eventos. Nosso objetivo é
            fomentar novas mentes, despertar a curiosidade em jovens e mostrar na prática como a
            inovação pode decolar.
          </p>
        </div>

        <div className="visitas-grid">
          {visitas.map((visita, index) => (
            <div key={index} className="visita-card">
              <h2 className="visita-local">{visita.local}</h2>
              <p className="visita-descricao">{visita.descricao}</p>
              <div className="fotos-container">
                {visita.fotos.length > 0 ? (
                  visita.fotos.map((foto, idx) => (
                    <img
                      key={idx}
                      src={foto}
                      alt={`Visita a ${visita.local}`}
                      className="visita-foto"
                      loading="lazy"
                      decoding="async"
                    />
                  ))
                ) : (
                  <div className="foto-placeholder">
                    <p>Espaço reservado para fotos da visita.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="global-cta-dark">
          <div className="cta-glow"></div>
          <h2 className="cta-title">Leve a DeltaV para sua escola ou evento.</h2>
          <p className="cta-desc">
            Leve nossa equipe para sua instituição. Será um prazer compartilhar conhecimento e
            inspirar futuros talentos!
          </p>
          <button onClick={handleContactClick} className="cta-button-glow">
            <span className="button-text">Fale Conosco</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Exposicoes;
