import { Button, Flex, Image, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Stack
      gap="xs"
      style={{
        border: "1px solid #dee2e6",
        borderRadius: "12px",
        backgroundColor: "white",
        minHeight: "250px !important",
        width: "660px",
        padding: "32px",
        margin: "24px auto",
      }}
    >
      <Flex>
        <div
          style={{
            width: "60%",
            margin: "0px",
            padding: "0px",
          }}
        >
          <p
            style={{
              fontSize: "34px",
              fontWeight: "bold",
              lineHeight: "1.2",
              margin: "0px",
              padding: "0px",
            }}
          >
            Упс! Такой страницы не существует
          </p>
          <p
            style={{
              color: "grey",
              margin: "0px",
              marginTop: "12px",
              padding: "0px",
            }}
          >
            Давайте перейдём к началу.
          </p>
        </div>
        <Button onClick={() => navigate("/")} style={{ margin: "auto auto" }}>
          На главную
        </Button>
      </Flex>

      <Image
        radius="md"
        src="https://media1.tenor.com/m/baBulgRz6XkAAAAd/sad-cat.gif"
        alt="котик грустит"
        style={{ marginTop: "12px" }}
      />
    </Stack>
  );
};

export { ErrorPage };
