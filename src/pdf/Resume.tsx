import type { CollectionEntry } from 'astro:content';
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { labels, type Locale } from './labels';

type CvData = CollectionEntry<'cv'>['data'];

/**
 * A plain résumé, after celiobjunior/resume-template. Helvetica is a PDF
 * standard font, so nothing is embedded. Not a brand surface: no colour, no
 * site typography.
 */
const s = StyleSheet.create({
  page: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.35,
    color: '#000',
  },

  header: { alignItems: 'center', marginBottom: 0 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 17 },
  contact: { fontSize: 9, marginTop: 4 },
  link: { color: '#000', textDecoration: 'none' },

  sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 12.5 },
  rule: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#000',
    marginTop: 2,
    marginBottom: 5,
  },
  section: { marginTop: 8 },

  entry: { marginTop: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  company: { fontFamily: 'Helvetica-Bold' },
  italic: { fontFamily: 'Helvetica-Oblique' },

  bullets: { marginTop: 2 },
  bulletRow: { flexDirection: 'row', marginTop: 1.5 },
  bulletMark: { width: 10 },
  bulletText: { flex: 1 },

  skillLine: { marginTop: 2 },
  label: { fontFamily: 'Helvetica-Bold' },
  postLink: { color: '#000', textDecoration: 'underline' },
});

interface Props {
  cv: CvData;
  locale: Locale;
  siteUrl: string;
  siteLabel: string;
}

type Bullet = CvData['experience'][number]['bullets'][number];

function BulletText({ bullet }: { bullet: Bullet }) {
  if (typeof bullet === 'string')
    return <Text style={s.bulletText}>{bullet}</Text>;

  return (
    <Text style={s.bulletText}>
      {bullet.text}{' '}
      {bullet.links.map((post, index) => (
        <Text key={post.href}>
          {index > 0 && ', '}
          <Link src={post.href} style={s.postLink}>
            {post.label}
          </Link>
        </Text>
      ))}
    </Text>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.rule} />
      {children}
    </View>
  );
}

export function Resume({ cv, locale, siteUrl, siteLabel }: Props) {
  const t = labels[locale];
  const { person } = cv;

  return (
    <Document author={person.name} title={`${t.title} ${person.name}`}>
      <Page size='A4' style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{person.name}</Text>
          <Text style={s.contact}>
            {person.location} {'•'}{' '}
            <Link src={`mailto:${person.email}`} style={s.link}>
              {person.email}
            </Link>{' '}
            {'•'}{' '}
            <Link src={`https://${person.linkedin}`} style={s.link}>
              {person.linkedin}
            </Link>{' '}
            {'•'}{' '}
            <Link src={`https://${person.github}`} style={s.link}>
              {person.github}
            </Link>{' '}
            {'•'}{' '}
            <Link src={siteUrl} style={s.link}>
              {siteLabel}
            </Link>
          </Text>
        </View>

        <Section title={t.experience}>
          {cv.experience.map((job) => (
            <View
              key={`${job.company}-${job.title}`}
              style={s.entry}
              wrap={false}>
              <View style={s.row}>
                <Text style={s.company}>{job.company}</Text>
                <Text>{job.location ?? ''}</Text>
              </View>
              <View style={s.row}>
                <Text style={s.italic}>{job.title}</Text>
                <Text style={s.italic}>{job.dates}</Text>
              </View>
              <View style={s.bullets}>
                {job.bullets.map((bullet) => (
                  <View
                    key={typeof bullet === 'string' ? bullet : bullet.text}
                    style={s.bulletRow}>
                    <Text style={s.bulletMark}>{'•'}</Text>
                    <BulletText bullet={bullet} />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Section>

        <Section title={t.skills}>
          <Text style={s.skillLine}>{cv.skills.join(', ')}</Text>
          {cv.languages.length > 0 && (
            <Text style={s.skillLine}>
              <Text style={s.label}>{t.languages}: </Text>
              {cv.languages.map((l) => `${l.name} (${l.level})`).join(', ')}
            </Text>
          )}
          {cv.certifications.length > 0 && (
            <Text style={s.skillLine}>
              <Text style={s.label}>{t.certifications}: </Text>
              {cv.certifications.map((cert, index) => (
                <Text key={cert.text}>
                  {index > 0 && ', '}
                  {cert.href ? (
                    <Link src={cert.href} style={s.postLink}>
                      {cert.text}
                    </Link>
                  ) : (
                    cert.text
                  )}
                </Text>
              ))}
            </Text>
          )}
        </Section>

        <Section title={t.education}>
          {cv.education.map((school) => (
            <View key={school.institution} style={s.entry} wrap={false}>
              <View style={s.row}>
                <Text style={s.company}>{school.institution}</Text>
                <Text>{school.dates}</Text>
              </View>
              <Text style={s.italic}>
                {school.degree}, {school.field}
              </Text>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  );
}
