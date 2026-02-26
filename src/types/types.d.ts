interface Area {
  id: string;
  name: string;
}

interface Salary {
  from: string;
  to: string;
  currency: string;
}

interface Employer {
  id: string;
  name: string;
}

interface WorkFormat {
  id: string;
  name: string;
}

interface Experience {
  id: string;
  name: string;
}

interface Key_skill {
  name: string;
}

interface Vacancy {
  id: string;
  name: string;
  area: Area;
  salary: Salary;
  employer: Employer;
  work_format: WorkFormat[];
  experience: Experience;
  key_skill: Key_skill[];
  description: string;
}

interface VacanciesResponse {
  items: Vacancy[];
  pages: number;
  page: number;
  per_page: number;
}
