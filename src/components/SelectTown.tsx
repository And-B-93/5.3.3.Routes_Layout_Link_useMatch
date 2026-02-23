import { Select } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { setArea } from "../reducers/fetchSlice";
import type { AppDispatch, RootState } from "../store/store";

const SelectTown = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { area } = useSelector((state: RootState) => state.fetch);

  const iconMap = <IconMapPin />;

  const handleAreaChange = (value: string | null) => {
    dispatch(setArea(value || ""));
  };

  return (
    <Select
      data={[
        { value: "", label: "Все города" },
        { value: "1", label: "Москва" },
        { value: "2", label: "Санкт-Петербург" },
      ]}
      value={area}
      onChange={handleAreaChange}
      leftSection={iconMap}
      style={{
        padding: "24px",
        backgroundColor: "white",
        borderRadius: "12px",
      }}
    />
  );
};
export { SelectTown };
