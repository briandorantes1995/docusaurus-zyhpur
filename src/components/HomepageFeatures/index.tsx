import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Renderizado HTML a PDF',
    icon: '📄',
    description: (
      <>
        Convierte cualquier URL o código HTML en un documento PDF de alta fidelidad,
        respetando estilos, tipografías y el diseño original.
      </>
    ),
  },
  {
    title: 'Herramientas de Edición',
    icon: '🛠️',
    description: (
      <>
        Une, divide, comprime, pon marcas de agua y protege tus PDFs con contraseña.
        Todo a través de una API simple y extremadamente rápida.
      </>
    ),
  },
  {
    title: 'Extracción y OCR',
    icon: '🔍',
    description: (
      <>
        Extrae texto nativo o utiliza nuestro motor OCR para recuperar información
        estructurada desde imágenes o documentos escaneados.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div style={{ fontSize: '4rem', marginBottom: '1rem', marginTop: '2rem' }}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
