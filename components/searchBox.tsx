import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import styled from 'styled-components';

import { useTheme } from '@/contexts/themeContext';

const RowView = styled(View)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 8px;
  background-color: ${(props) => props.theme.blankSpace};
  border-radius: 10px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  padding-vertical: 0;
`;

const StyledFieldText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  text-align: left;
`;

type InputFieldProps = {
  label: string;
  icon: JSX.Element;
  keyboardType?: KeyboardTypeOptions;
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
};

export default function SearchBox({
  label,
  icon,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value,
}: InputFieldProps) {
  const { theme } = useTheme();

  return (
    <RowView>
      {icon}
      <StyledTextInput
        autoCapitalize="none"
        placeholder={label}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
      />

      {onChangeText && (
        <TouchableOpacity
          onPress={() => {
            onChangeText('');
          }}>
          <StyledFieldText color={theme.primaryColor}>Clear</StyledFieldText>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          fieldButtonFunction && fieldButtonFunction();
        }}>
        <StyledFieldText color={theme.primaryColor}>{fieldButtonLabel}</StyledFieldText>
      </TouchableOpacity>
    </RowView>
  );
}