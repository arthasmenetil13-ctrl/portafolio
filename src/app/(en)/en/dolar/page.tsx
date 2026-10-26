import type { Metadata } from "next";
import Dolar from "@/components/Dolar";
import { dict } from "@/content/site";

const t = dict.en.trm;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { languages: { es: "/dolar" } },
};

export default function Page() {
  return <Dolar t={t} lang="en" home="/en" />;
}
