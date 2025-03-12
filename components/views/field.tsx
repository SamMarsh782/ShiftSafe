import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { colors } from '../../assets/colors';

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
  color: ${colors.safariGreen};
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const LabelText = styled(SectionText)`
  color: ${colors.buttonColor};
`;

type FieldProps = {
  label: string;
  value: string;
};

export const Field = ({label, value, ...rest}: FieldProps) => (
  <FieldView>
    <LabelFieldView>
      <LabelText>{label}</LabelText>
    </LabelFieldView>
    <ValueFieldView>
      <SectionText>{value}</SectionText>
    </ValueFieldView>
  </FieldView>
);