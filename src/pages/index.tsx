import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="zyphur-hero">
      <div className="container">
        <Heading as="h1" className="zyphur-hero-title">
          {siteConfig.title}
        </Heading>
        <p className="zyphur-hero-subtitle">
          API de documentos para desarrolladores
        </p>
        <div>
          <Link
            className="zyphur-hero-button"
            to="/docs/intro">
            Tutorial Rápido - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Bienvenido a ${siteConfig.title}`}
      description="Documentación oficial de la API Zyphur para generación, edición y extracción de información de PDFs.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
