import React from 'react';
import ScrollBGView from '@/components/views/scrollBGView';
import { useTheme } from '@/contexts/themeContext';
import ListButton from '@/components/buttons/listButton';

interface ButtonListProps {
    items: any[];
    filter?: string;
    onPress: (item: any) => void;
    children?: React.ReactNode;
}

const ButtonList: React.FC<ButtonListProps> = ({
    items,
    filter = '',
    onPress,
    children,
}) => {
    const { theme } = useTheme();
    return (
        <ScrollBGView>
          {items
            .filter(item => {
              const name = item.Name ?? '';
                return name.toLowerCase().includes(filter.toLowerCase());
            })
            .sort((a, b) => (a.Name ?? '').localeCompare(b.Name ?? ''))
            .map(item => (
              <ListButton
                key={item.ID}
                title={item.Name}
                onPress={() => onPress(item)}
              />
            ))}
          {children}
        </ScrollBGView>
    );
};

export default React.memo(ButtonList);