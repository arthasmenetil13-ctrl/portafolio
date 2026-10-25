import type { Metadata } from "next";
import Festivos from "@/components/Festivos";
import { dict } from "@/content/site";

const t = dict.en.tool;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { languages: { es: "/festivos" } },
};

export default function Page() {
  return <Festivos t={t} lang="en" home="/en" />;
}
