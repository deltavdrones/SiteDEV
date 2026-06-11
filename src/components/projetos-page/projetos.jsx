import '../utils/global-cta.css';
import './projetos.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import imgLoganV0 from '../../assets/projetos-page/logan_v0.webp';
import imgLoganV1 from '../../assets/projetos-page/logan_v1.webp';
import imgLoganV2 from '../../assets/projetos-page/logan_v2.webp';
import {
  default as imgKwid,
  default as imgLoganV3,
} from '../../assets/projetos-page/suspense.webp';
import { handleAnimationAndAction } from '../utils/animation-handler';

const loganHistory = [
  {
    id: 'v0',
    version: 'LOGAN V0',
    year: '2025',
    tag: 'Marco Inicial',
    highlight: 'Do Zero ao Primeiro Voo Manual',
    description:
      'O verdadeiro ponto de partida da nossa equipe. Saímos do zero absoluto de conhecimento teórico e experiência prática. A partir de um frame, idealizamos o projeto, iniciamos o desenvolvimento e superamos a total falta de experiência prática para dar vida a um drone real capaz de voar. Nessa etapa pioneira, o Logan ainda não era nem parcialmente nem totalmente autônomo, operando inteiramente via rádio controle (RC), mas foi onde aprendemos na prática como colocar uma aeronave no ar.',
    tecnologias: ['Fusion 360', 'Rádio Controle (RC)', 'Ardupilot', 'Mission Planner'],
    imagem: imgLoganV0,
    conquistas: [
      'Capacitação da equipe, que saiu do nível totalmente leigo para o entendimento prático.',
      'Transformação de peças mecânicas e eletrônicas avulsas em um drone funcional.',
      'Primeiras decolagens e estabilização de atitude bem-sucedidas em ambiente interno controlado via controle RC.',
    ],
  },
  {
    id: 'v1',
    version: 'LOGAN V1',
    year: '2025',
    tag: 'Primeira Versão Autônoma',
    highlight: 'Primeiros Passos rumo à Autonomia',
    description:
      'O Logan V1 representou o nosso primeiro grande avanço técnico e a estreia oficial em competições de nível nacional. Foi a versão que preparamos e levamos para a Eletroquad 2025. Embora a aeronave não tenha chegado a voar oficialmente na competição, esse modelo foi um marco crucial: foi nele que realizamos nossos primeiros testes práticos de voo 100% autônomo, validando o ecossistema de controle por software.',
    tecnologias: ['DroneKit', 'Pixhawk 2.4.8', 'Visão Computacional Clássica', 'PyMavLink'],
    imagem: imgLoganV1,
    conquistas: [
      'Primeira versão a participar de uma competição nacional (Eletroquad 2025)',
      'Primeira experiência da equipe na integração entre o DroneKit e controladora de voo.',
      'Primeiros testes de voo autônomo com procedimentos de decolagem, navegação e pouso automatizados.',
    ],
  },
  {
    id: 'v2',
    version: 'LOGAN V2',
    year: '2026',
    tag: 'Navegação Autônoma',
    highlight: 'Realização de Missões Autônomas',
    description:
      'Melhoramos significativamente o projeto do Logan V1, com isso conseguimos um voo 100% autônomo, capacitando o drone a realizar diversas missões complexas sozinho, dependendo exclusivamente de sua inteligência embarcada. Como o Logan V2, fomos capazes de voar e realizar 2 missões completas na Eletroquad 2026, consagrando-nos como a única equipe de todo o Brasil a concluir uma missão específica da competição naquele ano.',
    tecnologias: [
      'YOLO',
      'OpenCV',
      'Pixhawk 6C PRO',
      'Ansys Mechanical',
      '',
      'Softwares proprietários da DeltaV',
    ],
    imagem: imgLoganV2,
    conquistas: [
      'Realização de 2 missões 100% completas na competição nacional Eletroquad 2026.',
      'Única equipe de todo o Brasil a concluir a missão Hang The Right Wire na Eletroquad 2026.',
      'Autonomia com tomada de decisão automática inteiramente baseada  em inteligência embarcada.',
    ],
  },
  {
    id: 'v3',
    version: 'LOGAN V3',
    year: '2027',
    tag: 'Próxima Evolução',
    highlight: 'Novos desafios e aprendizados',
    description:
      'A equipe se prepara para a próxima evolução do Logan, focando em missões autônomas mais complexasnpm run . O objetivo é superar os limites atuais e alcançar novos patamares de desempenho e capacidade.',
    tecnologias: ['...'],
    imagem: imgLoganV3,
    conquistas: ['...'],
  },
];

const kwidData = {
  titulo: 'KWID',
  subtitulo: 'Minidrone Educacional de Plataforma Aberta',
  descricao:
    'O Kwid é um minidrone desenvolvido de ponta a ponta pela nossa equipe com um propósito especial: democratizar o conhecimento em robótica aérea e programação. Como um projeto open-source de baixo custo, ele serve como uma plataforma prática e interativa que ajuda estudantes e entusiastas a compreenderem desde a física mecânica do voo até o código de controle de atitude.',
  tecnologias: ['ESP32', 'Beginner Friendly', 'C/C++', 'MPU6050', 'Impressão 3D', 'Controle PID'],
  pilares: [
    {
      titulo: 'Montagem Didática',
      descricao:
        'Chassis compacto impresso em 3D, idealizado para montagem simples e intuitiva de componentes eletrônicos essenciais.',
    },
    {
      titulo: 'Código Aberto (C/C++)',
      descricao:
        'Firmware modular inteiramente escrito para microcontroladores como ESP32, com comentários que explicam as equações físicas e matemáticas do controle PID de voo.',
    },
    {
      titulo: 'Disseminação Científica',
      descricao:
        'Material didático associado para escolas e feiras científicas, servindo como uma porta de entrada amigável para a engenharia.',
    },
  ],
  specs: [
    { label: 'Controlador de Voo', val: 'ESP32 Dual-Core' },
    { label: 'Sensores', val: 'IMU MPU6050 (Acel. & Giroscópio)' },
    { label: 'Conectividade', val: 'Wi-Fi & Bluetooth nativos' },
    { label: 'Autonomia', val: 'Em desenvolvimento' },
    { label: 'Massa Total', val: 'Em desenvolvimento' },
  ],
};

const Projetos = () => {
  const navigate = useNavigate();
  const [selectedLoganIdx, setSelectedLoganIdx] = useState(2);
  const activeLogan = loganHistory[selectedLoganIdx];

  const handleContactClick = (e) => {
    handleAnimationAndAction(e, () => navigate('/contato'));
  };

  return (
    <section className="projetos-section">
      <div className="projetos-glow-bg"></div>
      <div className="projetos-container">
        <div className="projetos-header">
          <h1 className="projetos-title">Evolução Tecnológica</h1>
          <div className="title-underline"></div>
          <p className="projetos-subtitle">
            Da concepção à otimização, cada projeto é uma jornada de inovação. Aqui você conhece os
            drones e as tecnologias que desenvolvemos na fronteira da engenharia.
          </p>
        </div>

        <div className="logan-showcase-section">
          <div className="section-label">
            <span className="label-line"></span>
            PROJETO PRINCIPAL
            <span className="label-line"></span>
          </div>

          <div className="logan-interactive-card">
            <div className="logan-timeline-container">
              <div className="timeline-bar"></div>
              {loganHistory.map((logan, idx) => (
                <button
                  key={logan.id}
                  onClick={() => setSelectedLoganIdx(idx)}
                  className={`timeline-node ${selectedLoganIdx === idx ? 'active' : ''}`}
                >
                  <span className="node-year">{logan.year}</span>
                  <span className="node-dot"></span>
                  <span className="node-version">{logan.version.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            <div className="logan-content-grid">
              <div className="logan-media-col">
                <div className="image-border-effect">
                  <img
                    src={activeLogan.imagem}
                    alt={activeLogan.version}
                    className="logan-showcase-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="logan-badge">
                  <span className="badge-pulse"></span>
                  {activeLogan.tag}
                </div>
              </div>

              <div className="logan-info-col">
                <div className="logan-info-header">
                  <h2 className="logan-info-title">{activeLogan.version}</h2>
                  <span className="logan-info-year">{activeLogan.year}</span>
                </div>
                <h3 className="logan-info-highlight">{activeLogan.highlight}</h3>

                <p className="logan-info-description">{activeLogan.description}</p>

                <div className="logan-tech-container">
                  <h4 className="tech-title">Tecnologias Envolvidas</h4>
                  <div className="tech-tags-grid">
                    {activeLogan.tecnologias.map((tech, idx) => (
                      <span key={idx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="logan-specs-container">
                  <h4 className="specs-title">Conquistas</h4>
                  <ul className="conquistas-list">
                    {activeLogan.conquistas.map((conquista, idx) => (
                      <li key={idx} className="conquista-item">
                        <span className="conquista-icon">✓</span>
                        <span className="conquista-text">{conquista}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="kwid-showcase-section">
          <div className="section-label">
            <span className="label-line"></span>
            PROJETO EDUCACIONAL
            <span className="label-line"></span>
          </div>

          <div className="kwid-card-layout">
            <div className="kwid-info-col">
              <h2 className="kwid-title">{kwidData.titulo}</h2>
              <h3 className="kwid-subtitle">{kwidData.subtitulo}</h3>
              <p className="kwid-description">{kwidData.descricao}</p>

              <div className="kwid-pillars-grid">
                {kwidData.pilares.map((pilar, idx) => (
                  <div key={idx} className="pilar-card">
                    <div className="pilar-num">0{idx + 1}</div>
                    <h4 className="pilar-card-title">{pilar.titulo}</h4>
                    <p className="pilar-card-desc">{pilar.descricao}</p>
                  </div>
                ))}
              </div>

              <div className="kwid-tech-section">
                <h4 className="tech-title">Ecosistema Tecnológico</h4>
                <div className="tech-tags-grid">
                  {kwidData.tecnologias.map((tech, idx) => (
                    <span key={idx} className="tech-badge educacional">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="kwid-media-col">
              <div className="kwid-image-wrapper">
                <div className="image-border-effect glow-cyan">
                  <img
                    src={imgKwid}
                    alt="Kwid Educational Minidrone"
                    className="kwid-showcase-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="kwid-specs-glass-card">
                <h4 className="glass-card-title">Especificações de Plataforma</h4>
                <table className="glass-specs-table">
                  <tbody>
                    {kwidData.specs.map((spec, idx) => (
                      <tr key={idx} className="glass-spec-tr">
                        <td className="glass-spec-td-label">{spec.label}</td>
                        <td className="glass-spec-td-val">{spec.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="global-cta-dark">
          <div className="cta-glow"></div>
          <h2 className="cta-title">Apoie a Nossa Evolução</h2>
          <p className="cta-desc">
            Seja através de patrocínio corporativo, colaboração científica ou interesse em levar o{' '}
            <strong>Kwid</strong> para a sua instituição educacional, nós adoraríamos conversar com
            você.
          </p>
          <button onClick={handleContactClick} className="cta-button-glow">
            <span className="button-text">Fale com a Equipe</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projetos;
