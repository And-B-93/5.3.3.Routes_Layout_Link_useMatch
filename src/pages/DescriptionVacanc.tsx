import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import ky from "ky";
import { Spinner } from "../components/Spinner";
import { VacancyCard } from "../components/VacancyCard";

export function DescriptionVacancy() {
  const { id } = useParams<{ id: string }>();

  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchVacancy = async () => {
      try {
        setLoading(true);
        const data = await ky
          .get(`https://api.hh.ru/vacancies/${id}`)
          .json<Vacancy>();
        setVacancy(data);
      } catch (err) {
        if (err instanceof Error) {
          return err.message;
        } else {
          return "Oшибка";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVacancy();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <Container size="1100px" py="xl">
      <VacancyCard
        vacancy={vacancy}
        showDescription={true}
        showButtonSeeVacancy={false}
      />
    </Container>
  );
}
