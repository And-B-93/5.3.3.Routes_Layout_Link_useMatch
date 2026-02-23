import { Button, Group, Pill, Text, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useState } from "react";
import { addSkill, removeSkill } from "../reducers/fetchSlice";

const Skills = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { skills } = useSelector((state: RootState) => state.fetch);

  const iconPlus = <IconPlus />;

  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      dispatch(addSkill(newSkill.trim()));
      setNewSkill("");
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };
  return (
    <Group
      style={{
        padding: "24px",
        backgroundColor: "white",
        borderRadius: "12px",
      }}
    >
      <Text size="m" fw={700}>
        Ключевые навыки
      </Text>

      <Group justify="center">
        <TextInput
          size="sm"
          placeholder="Навык"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={handleAddSkill}>{iconPlus}</Button>
      </Group>

      {skills.map((skill) => (
        <Pill
          size="md"
          key={skill}
          withRemoveButton
          onRemove={() => dispatch(removeSkill(skill))}
        >
          {skill}
        </Pill>
      ))}
    </Group>
  );
};
export { Skills };
