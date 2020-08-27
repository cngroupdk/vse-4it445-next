import React from 'react';

import { MainSection, Heading } from '../atoms';
import { TopNavigation } from '../organisms';

export function AboutTemplate() {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>About</Heading>
        <p>Hello, about page!</p>
      </MainSection>
    </>
  );
}
