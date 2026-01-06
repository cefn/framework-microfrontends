import { useData } from "vike-react/useData";
import { Page as PageComponent } from "shared-components";
import type { Data } from "./+data";

export default function Page() {
  const data = useData<Data>();
  const { pageName } = data;
  return (
    <>
      <h1>Vike templated content</h1>
      <p>
        This vike page '{pageName}' contains a React <i>Page</i> component
      </p>
      <PageComponent {...data} />
    </>
  );
}
