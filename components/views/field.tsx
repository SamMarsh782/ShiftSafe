import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

import { useTheme } from '@/contexts/themeContext';

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const { theme } = useTheme();

  const FieldView = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  const LabelFieldView = styled(View)`
    justify-content: flex-start;
    width: 30%;
  `;

  const ValueFieldView = styled(View)`
    justify-content: flex-start;
    width: 70%;
  `;

  const SectionText = styled(Text)`
    color: ${theme.successColor};
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
  `;

  const LabelText = styled(SectionText)`
    color: ${theme.primaryColor};
  `;

  return (
    <FieldView>
      <LabelFieldView>
        <LabelText>{label}</LabelText>
      </LabelFieldView>
      <ValueFieldView>
        <SectionText>{value}</SectionText>
      </ValueFieldView>
    </FieldView>
  );
};

export default Field;