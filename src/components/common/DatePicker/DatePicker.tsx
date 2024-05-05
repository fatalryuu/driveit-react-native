import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import { COLORS } from "../../../palette";
import { Flex } from "../Flex/Flex";

interface DatePickerProps {
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, setValue }) => {
  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || value;
    setValue(currentDate);
  };

  return (
    <Flex alignItems="center" gap={6}>
      <Typography>Birthday</Typography>
      <DateTimePicker
        value={value}
        mode="date"
        display="default"
        onChange={onChange}
        accentColor={COLORS.PRIMARY}
        themeVariant="dark"
      />
    </Flex>
  );
};
