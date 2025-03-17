import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { useTheme } from '@/contexts/themeContext';

interface RadioListProps {
  items: Array<{ label: string; value: string }>;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const RadioList: React.FC<RadioListProps> = ({ items, selectedValue, setSelectedValue }) => {
  const { theme } = useTheme();

  const StyledText = styled(Text)`
    color: ${theme.primaryColor};
    font-size: 19px;
    margin-right: 10px;
  `;

  return (
    <RadioButton.Group
      onValueChange={value => setSelectedValue(value)}
      value={selectedValue}
    >

        {items.map(item => (
            <View key={item.value} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
                value={item.value}
                color={theme.secondaryColor}
                uncheckedColor={theme.neutralGray}/>
            <StyledText>{item.label} </StyledText>
            </View>
        ))}
    </RadioButton.Group>
  );
};

export default RadioList;