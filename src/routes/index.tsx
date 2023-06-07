import { component$, useComputed$, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const { url } = useLocation();

  const pathname = useComputed$(() => url.pathname);

  useVisibleTask$(({ track, cleanup }) => {
    track(() => pathname.value);

    // This should only run on page load for path '/'
    console.log("Running task for path: ", pathname.value);

    // This should only when leaving the page
    cleanup(() => console.log("Cleaning up task for path", pathname.value));
  });

  return (
    <>
      <Link href="/child/">Click me</Link>
    </>
  );
});
