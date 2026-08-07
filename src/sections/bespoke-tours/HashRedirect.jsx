"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Handles legacy anchor URLs like /bespoke-tours#blue-cave-five-islands
 * from before individual tour pages existed.
 *
 * Hash fragments never reach the server, so we have to do this on the client.
 * `router.replace()` doesn't add a history entry — the user's browser back
 * button still works to leave the site.
 */
export default function HashRedirect({ knownKeys }) {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    if (!knownKeys.includes(hash)) return;
    router.replace(`/tours/${hash}`);
  }, [router, knownKeys]);

  return null;
}
