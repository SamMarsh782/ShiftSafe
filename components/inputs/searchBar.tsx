import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const StyledTextInput = styled(TextInput)<{ color: string }>`
  flex: 1;
  padding-vertical: 0;
  color: ${(props) => props.color};
`;

const StyledFieldText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  text-align: left;
`;

interface SortBarProps {
  setSearchText: (text: string) => void;
  label: string;
  keyboardType?: KeyboardTypeOptions;
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
};

const SearchBar = ({
  setSearchText,
  label,
  keyboardType = 'default',
}: SortBarProps) => {
  const [text, setText] = useState('');

  const { theme } = useTheme();

  return (
    <Container>
      <RowView bgColor={theme.blankSpace}>
        <Icon name="search" size={20} color={theme.primaryColor} />
        <StyledTextInput
          autoCapitalize="none"
          placeholder={label}
          placeholderTextColor={theme.inverseBlankSpace}
          keyboardType={keyboardType}
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => {
            setSearchText(text);
          }}
          color={theme.inverseBlankSpace}
        />
        <TouchableOpacity
          onPress={() => {
            setSearchText('');
          }}>
          <StyledFieldText color={theme.inverseBlankSpace}>Clear</StyledFieldText>
        </TouchableOpacity>
      </RowView>
    </Container>
  );
};

export default SearchBar;