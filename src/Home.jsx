import Blocks from './components/home-page/blocks/blocks';
import Hero from './components/home-page/hero/hero';
import Intro from './components/home-page/intro/intro';
import Metrics from './components/home-page/metrics/metrics';
import Supporters from './components/home-page/supporters/supporters';

const Home = () => {
  return (
    <>
      <Hero />
      <Intro />
      <Supporters />
      <Metrics />
      <Blocks />
    </>
  );
};

export default Home;
