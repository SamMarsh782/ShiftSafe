import React, { useState } from 'react';
import styled from 'styled-components';
import DropDownPicker from 'react-native-dropdown-picker';

import { useTheme } from '@/contexts/themeContext';

const StyledDropDown = styled(DropDownPicker).attrs((props: any) => ({
  containerStyle: {
    width: 140,
    height: 50,
    paddingRight: 10,
  },
}))<DropdownProps>`
  width: 100%;
  flex: 1;
  background-color: ${(props: any) => props.bgColor || props.theme.blankSpace};
`;

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  items: DropdownItem[];
  selected: string;
  setSelected: (selected: string) => void;
  bgColor?: string;
};

const Dropdown = ({ items, selected, setSelected, bgColor }: DropdownProps) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const dropdownItems = items.map(item => ({ label: item.label, value: item.value }));

  return (
    <StyledDropDown
      multiple={false}
      open={open}
      value={selected}
      items={dropdownItems}
      setOpen={setOpen}
      setValue={(callback) => {
        if (typeof callback === 'function') {
          setSelected(callback(selected));
        } else {
          setSelected(callback);
        }
      }}
      setItems={() => {}}
      placeholder="Select an item"
      bgColor={bgColor}
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export default Dropdown;