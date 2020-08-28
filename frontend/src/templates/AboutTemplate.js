import React from 'react';

import { MainSection, Heading } from 'src/atoms';
import { TopNavigation } from 'src/organisms';

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
