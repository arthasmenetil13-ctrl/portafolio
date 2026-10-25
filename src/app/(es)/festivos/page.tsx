import type { Metadata } from "next";
import Festivos from "@/components/Festivos";
import { dict } from "@/content/site";

const t = dict.es.tool;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { languages: { en: "/en/festivos" } },
};

export default function Page() {
  return <Festivos t={t} lang="es" home="/" />;
}
