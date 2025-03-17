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
    flex: 0 1 auto;
  `;

  const ValueFieldView = styled(View)`
    justify-content: flex-start;
    flex: 1;
  `;

  const SectionText = styled(Text)`
    color: ${theme.primaryColor};
    font-size: 18px;
    margin: 10px 0 10px 5px;
  `;

  const LabelText = styled(SectionText)`
    color: ${theme.secondaryColor};
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