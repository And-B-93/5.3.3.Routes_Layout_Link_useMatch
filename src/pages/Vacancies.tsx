import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextInput,
  Group,
  Button,
  Pagination,
  Container,
  Title,
  Stack,
  Flex,
  Text,
  Badge,
} from "@mantine/core";
import "./Vacansies.css";
import type { RootState } from "../store/store";
import { fetchVacancies, setSearch, setPage } from "../reducers/fetchSlice";
import type { AppDispatch } from "../store/store";
import { IconSearch } from "@tabler/icons-react";
import { SelectTown } from "../components/SelectTown";
import { Skills } from "../components/Skills";
import { Spinner } from "../components/Spinner";

function Vacancies() {
  const dispatch = useDispatch<AppDispatch>();
  const { vacancies, loading, error, totalPages, page, search, skills, area } =
    useSelector((state: RootState) => state.fetch);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch, page, skills, area]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSearchClick = () => {
    dispatch(fetchVacancies());
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage - 1));
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Ошибка: {error}
      </div>
    );

  const iconSearch = <IconSearch />;

  return (
    <>
      <Container size={1100}>
        <div className="titleSearch">
          <div className="title">
            <h2>Список вакансий</h2>
            <h3>по профессии Frontend-разработчик</h3>
          </div>
          <div className="search">
            <TextInput
              placeholder="Должность или название компании"
              value={search}
              onChange={handleSearchChange}
              leftSection={iconSearch}
              style={{ width: "100%", marginRight: "24px" }}
            />
            <div>
              <Button onClick={handleSearchClick}>Найти</Button>
            </div>
          </div>
        </div>

        <Flex
          gap="xs"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="nowrap"
        >
          <Stack
            w={317}
            style={{
              margin: "0 12px",
            }}
          >
            <Skills />
            <SelectTown />
          </Stack>

          <Stack style={{ alignItems: "center" }}>
            {vacancies.map((vacancy) => (
              <Stack
                gap="xs"
                key={vacancy.id}
                style={{
                  border: "1px solid #dee2e6",
                  borderRadius: "12px",
                  backgroundColor: "white",
                  minHeight: "250px !important",
                  width: "660px",
                  padding: "24px",
                  margin: "0 12px",
                }}
              >
                <Title order={5}>{vacancy.name}</Title>

                <Group>
                  <Text>
                    {vacancy.salary ? (
                      <>
                        {vacancy.salary.from} - {vacancy.salary.to}{" "}
                        {vacancy.salary.currency}
                      </>
                    ) : (
                      "з/п не указана"
                    )}
                  </Text>
                  <Text>Опыт: {vacancy.experience.name}</Text>
                </Group>

                <Text size="xs" style={{ color: "lightgray" }}>
                  {vacancy.employer.name}
                </Text>

                <Text size="xs">
                  {vacancy.work_format.map((format) => {
                    if (format.id === "REMOTE")
                      return (
                        <Badge
                          size="xs"
                          radius="xs"
                          style={{ marginLeft: "2px", marginRight: "2px" }}
                        >
                          {format.name}
                        </Badge>
                      );
                    if (format.id === "HYBRID")
                      return (
                        <Badge
                          color="black"
                          size="xs"
                          radius="xs"
                          style={{ marginLeft: "2px", marginRight: "2px" }}
                        >
                          {format.name}
                        </Badge>
                      );
                    if (format.id === "ON_SITE")
                      return (
                        <Badge
                          color="gray"
                          size="xs"
                          radius="xs"
                          style={{ marginLeft: "2px", marginRight: "2px" }}
                        >
                          {format.name}
                        </Badge>
                      );
                  })}
                </Text>

                <Text h={20}>{vacancy.area.name}</Text>

                <Group gap="xs">
                  <Button color="black" size="xs" variant="filled">
                    Смотреть вакансию
                  </Button>

                  <a type="button" href="https://hh.ru/">
                    <Button
                      variant="filled"
                      size="xs"
                      styles={{
                        root: {
                          backgroundColor: "lightgrey",
                        },
                      }}
                    >
                      <span style={{ color: "black" }}>Откликнуться</span>
                    </Button>
                  </a>
                </Group>
              </Stack>
            ))}
            {totalPages > 0 && (
              <Pagination.Root
                total={totalPages}
                onChange={handlePageChange}
                value={page + 1}
                style={{ margin: "24px" }}
              >
                <Group gap={5} justify="center">
                  <Pagination.First />
                  <Pagination.Previous />
                  <Pagination.Items />
                  <Pagination.Next />
                  <Pagination.Last />
                </Group>
              </Pagination.Root>
            )}
          </Stack>
        </Flex>
      </Container>
    </>
  );
}

export default Vacancies;
