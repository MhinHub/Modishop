import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Hero, PrimaryLayout, Promotions } from 'components';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
      <Promotions />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout title="Modishop" description="Home page of Modishop">
      {page}
    </PrimaryLayout>
  );
};

export default Home;

