import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      Child
      <div>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
});
