import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';

import { useTheme } from '@/contexts/themeContext';

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const RowView = styled(View)<{ bgColor: string }>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 8px;
  margin: 0 5px;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  padding-vertical: 0;
`;

const StyledFieldText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  text-align: left;
`;

interface SortBarProps {
  initialValue: string;
  setSearchText: (text: string) => void;
  label: string;
  icon: JSX.Element;
  keyboardType?: KeyboardTypeOptions;
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
};

const SearchBar = ({
  initialValue,
  setSearchText,
  label,
  icon,
  keyboardType = 'default',
}: SortBarProps) => {
  const [text, setText] = useState(initialValue);

  const { theme } = useTheme();

  return (
    <Container>
      <RowView bgColor={theme.blankSpace}>
        {icon}
        <StyledTextInput
          autoCapitalize="none"
          placeholder={label}
          keyboardType={keyboardType}
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => {
            setSearchText(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setSearchText('');
          }}>
          <StyledFieldText color={theme.primaryColor}>Clear</StyledFieldText>
        </TouchableOpacity>
      </RowView>
    </Container>
  );
};

export default SearchBar;