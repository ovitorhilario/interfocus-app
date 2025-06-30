import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView, BottomSheetTextInput  } from "@gorhom/bottom-sheet";
import { Typography } from "../Typography";
import React, { useCallback } from "react";

export interface TaskEditProps {
	onExit?: () => void;
}

export const TaskEditSheet = React.forwardRef<BottomSheetModal, TaskEditProps>(({
}, ref) => {

	const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props} 
      disappearsOnIndex={-1} 
      appearsOnIndex={0} 
    />
  ), []);

	return (
		<BottomSheetModal
			ref={ref}	
			backdropComponent={renderBackdrop}
			snapPoints={['50%', '90%']}
			keyboardBehavior="interactive"
			onChange={() => {}}
		>
			<BottomSheetView style={{ flex: 1, minHeight: 400 }}>
				<Typography size="subtitle">Awesome 🎉</Typography>
				<BottomSheetTextInput  
					defaultValue="Task title"
				/>
			</BottomSheetView>
		</BottomSheetModal>
	);
})