import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type IColor = {
	id: number;
	color: string;
}

export interface ColorPickerProps {
	selectedColor: IColor['id'];
  onSelect: (color: IColor['id']) => void;
  colors: IColor[];
}

export function ColorPicker({
	selectedColor,
  colors,
  onSelect,
}: ColorPickerProps) {

  return (
    <View style={styles.container}>
      {colors.map((color) => {
        const isSelected = selectedColor === color.id;

        return (
          <TouchableOpacity
            key={color.id}
            style={[
							styles.colorCircle, 
							isSelected && styles.selected,
							{ backgroundColor: color.color }
						]}
            onPress={() => onSelect(color.id)}
            activeOpacity={0.8}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorCircle: {
		width: 26,
		height: 26,
		borderRadius: 13,
		justifyContent: 'center',
		overflow: 'hidden',
		alignItems: 'center',
  },
	selected: {
		borderWidth: 2,
		borderColor: 'transparent',
		outlineWidth: 2,
		outlineStyle: 'solid',
		outlineColor: rt.colorScheme === 'dark' ? 
			theme.colors.onBackground : theme.colors.accent,
	},
}));
