import { redirect } from "next/navigation";

export default function Custom404() {
  redirect("/"); // Redirect to home page
}
