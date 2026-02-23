import { Stack } from "@mantine/core";

const AboutMe = () => {
  return (
    <Stack
      gap="xs"
      style={{
        border: "1px solid #dee2e6",
        borderRadius: "12px",
        backgroundColor: "white",
        minHeight: "250px !important",
        width: "660px",
        padding: "24px",
        margin: "24px auto",
      }}
    >
      <h1 style={{ margin: "0" }}>Привет! </h1>
      <h2 style={{ margin: "0" }}>Меня зовут Андрей Бондаренко.</h2>
      <p>
        Я начинающий Frontend-разработчик . Быстро осваиваю новые технологии и
        инструменты, стремлюсь применять современные подходы для создания
        эффективных интерфейсов.
      </p>
      <h3>Ключевые навыки</h3>
      <ul>
        JavaScript (ES6+):
        <li>Понимание асинхронности</li>
        <li>замыканий</li>
        <li>работы с DOM-деревом</li>
      </ul>
      <ul>
        React:
        <li>Практический опыт построения компонентной архитектуры</li>
        <li>использование хуков</li>
        <li>управление жизненным циклом компонентов</li>
      </ul>
      <ul>
        Redux:
        <li>Уверенная работа с управлением состоянием (Redux Toolkit)</li>
      </ul>
      <ul>
        <h3>Личные навыки:</h3>
        <li>быстро вникаю в работу</li> <li>спокойно отношусь к замечаниям</li>
        <li>отстаиваю свою точку зрения</li>
        <li>внимательно прорабатываю задачу</li>
        <li>могу работать как в команде, так и в одиночку</li>
      </ul>
    </Stack>
  );
};

export { AboutMe };
