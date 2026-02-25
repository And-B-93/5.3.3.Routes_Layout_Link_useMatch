import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextInput,
  Group,
  Button,
  Pagination,
  Container,
  Stack,
  Flex,
} from "@mantine/core";
import "./Vacansies.css";
import type { RootState } from "../store/store";
import {
  fetchVacancies,
  setSearch,
  setPage,
  addSkill,
  setArea,
} from "../reducers/fetchSlice";
import type { AppDispatch } from "../store/store";
import { IconSearch } from "@tabler/icons-react";
import { SelectTown } from "../components/SelectTown";
import { Skills } from "../components/Skills";
import { Spinner } from "../components/Spinner";
import { VacancyCard } from "../components/VacancyCard";
import { useSearchParams } from "react-router-dom";

function Vacancies() {
  const dispatch = useDispatch<AppDispatch>();
  const { vacancies, loading, totalPages, page, search, skills, area } =
    useSelector((state: RootState) => state.fetch);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlArea = searchParams.get("city") || "";
    const urlSkills = searchParams.get("skills")?.split(",") || [
      "TypeScript",
      "React",
      "Redux",
    ];

    if (urlSearch) dispatch(setSearch(urlSearch));
    if (urlArea) dispatch(setArea(urlArea));
    if (urlSkills.length) {
      urlSkills.map((skill) => dispatch(addSkill(skill)));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (area) params.set("city", area);
    if (skills.length) params.set("skills", skills.join(","));
    setSearchParams(params);
  }, [search, area, skills]);

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
              <VacancyCard vacancy={vacancy} key={vacancy.id} />
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
