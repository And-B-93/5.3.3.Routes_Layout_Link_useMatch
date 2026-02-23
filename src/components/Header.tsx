import { Group, Text } from "@mantine/core";
import { Image } from "@mantine/core";
import HHImage from "../../public/HHImage.svg";
import { NavLink } from "react-router-dom";
import "./Header.css";

export function Header() {
  const handleClickAboutme = () => {};
  return (
    <header
      style={{
        alignItems: "center",
        height: "60px",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <Group
        justify="space-between"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <Group>
          <Image h={30} w={30} src={HHImage} />
          <Text size="xl" fw={500} style={{ color: "#000000" }}>
            .FrontEnd
          </Text>
        </Group>

        <Group>
          <NavLink
            style={{
              display: "flex",
              flexDirection: "row",
              color: "grey",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              alignItems: "center",
            }}
            to="/"
          >
            <div>Вакансии FE</div>{" "}
            <div
              className="point"
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "white",
                borderRadius: "50%",
                margin: "0 5px",
              }}
            />
          </NavLink>

          <NavLink
            onClick={handleClickAboutme}
            style={{
              display: "flex",
              color: "grey",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              flexDirection: "row",
              alignItems: "center",
            }}
            to="/aboutme"
          >
            <div>Обо мне</div>{" "}
            <div
              className="point"
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "white",
                borderRadius: "50%",
                margin: "0 5px",
              }}
            />
          </NavLink>
        </Group>
        <Group></Group>
      </Group>
    </header>
  );
}
<div
  style={{
    width: "10px",
    height: "10px",
    backgroundColor: "blue",
    borderRadius: "50%",
    margin: "0 5px",
  }}
/>;
