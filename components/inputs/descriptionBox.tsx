import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import { View, TextInput } from 'react-native';

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

const StyledTextInput = styled(TextInput)`
  height: 100px;
  text-align-vertical: top;
  flex: 1;
`;

const DescriptionBox = forwardRef(({ initialValue, onSubmit }: DescriptionBoxProps, ref) => {
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
      />
    </InputView>
  );
});

export default DescriptionBox;