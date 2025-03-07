import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

import { colors } from '../../assets/colors';

export const WideContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  width: 95%;
  background-color: ${colors.white};
  border-radius: 20px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
  elevation: 5;
`;