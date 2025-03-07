import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

import { colors } from '../../assets/colors';

export const BackgroundView = styled(View)`
    background-color: ${colors.canvasBrown};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;