import React from 'react';

import { HomeTemplate } from '../templates/HomeTemplate';

export function HomePage() {
  const quacks = [];
  return <HomeTemplate quacks={quacks} />;
}
