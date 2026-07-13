export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

/** Section headings and the download filename, per locale. */
interface Labels {
  title: string;
  filename: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
  certifications: string;
}

const en: Labels = {
  title: 'CV',
  filename: 'resume-gustavo-dantas.pdf',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  languages: 'Languages',
  certifications: 'Certifications',
};

const pt: Labels = {
  title: 'Currículo',
  filename: 'curriculo-gustavo-dantas.pdf',
  experience: 'Experiência',
  education: 'Formação',
  skills: 'Competências',
  languages: 'Idiomas',
  certifications: 'Certificações',
};

/** A key missing from a locale is a compile error, not a silent fallback. */
export const labels: Record<Locale, Labels> = { en, pt };
