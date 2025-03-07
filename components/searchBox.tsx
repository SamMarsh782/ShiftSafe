import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import styled from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../assets/colors';

const RowView = styled(View)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 8px;
  background-color: white;
  border-radius: 10px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  padding-vertical: 0;
`;

const StyledFieldText = styled(Text)`
  color: ${colors.darkBrown};
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
          <StyledFieldText>
            <MaterialCommunityIcons
              name="close"
              color={colors.neutralGray}
              size={20}
            />
          </StyledFieldText>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          fieldButtonFunction;
        }}>
        <StyledFieldText>{fieldButtonLabel}</StyledFieldText>
      </TouchableOpacity>
    </RowView>
  );
}