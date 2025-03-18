import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import { View, TextInput } from 'react-native';

import { useTheme } from '@/contexts/themeContext';

interface DescriptionBoxProps {
  initialValue: string;
  onSubmit: (text: string) => void;
}

const InputView = styled(View)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
`;

const StyledTextInput = styled(TextInput)<{ color: string }>`
  height: 100px;
  text-align-vertical: top;
  flex: 1;
  color: ${({ color }) => color};
`;

const DescriptionBox = forwardRef(({ initialValue, onSubmit }: DescriptionBoxProps, ref) => {
  const { theme } = useTheme();
  const [text, setText] = useState(initialValue);

  useImperativeHandle(ref, () => ({
    getText: () => text,
  }));

  return (
    <InputView>
      <StyledTextInput
        multiline
        numberOfLines={4}
        value={text}
        onChangeText={setText}
        placeholder="Type your description here..."
        placeholderTextColor={theme.inverseBlankSpace}
        color={theme.inverseBlankSpace}
      />
    </InputView>
  );
});

export default DescriptionBox;