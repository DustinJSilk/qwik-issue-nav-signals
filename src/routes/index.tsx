import { component$, useComputed$, useTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const { url } = useLocation();

  const pathname = useComputed$(() => url.pathname);

  // A task the just tracks the URL
  useTask$(({ track, cleanup }) => {
    track(() => pathname.value);

    // This should run once on the server when the task is created
    console.log("Running task A for path: ", pathname.value);

    // This should run once on the server when the task is cleaned up
    cleanup(() => console.log("Cleaning up task A for path", pathname.value));
  });

  // A task the tracks the URL but is run on the client at least once before navigating away
  useTask$(
    ({ track, cleanup }) => {
      track(() => pathname.value);

      // This should run once on the server then once in the browser
      console.log("Running task B for path: ", pathname.value);

      // This should run once on the server then once in the browser when navigating away
      cleanup(() => console.log("Cleaning up task B for path", pathname.value));
    },
    { eagerness: "load" }
  );

  return (
    <>
      <Link href="/child/">Click me</Link>
    </>
  );
});
