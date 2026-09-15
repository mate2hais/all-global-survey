import * as React from 'react'

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'

interface NotificareProps {
  id?: string
  nume?: string
  telefon?: string
  email?: string | null
  localitate?: string
  tip?: string
  mesaj?: string | null
  data?: string
  fisiere?: { name: string; url?: string | null }[]
}

export const SolicitareNotificare = ({
  id = '',
  nume = '',
  telefon = '',
  email = '',
  localitate = '',
  tip = '',
  mesaj = '',
  data = '',
  fisiere = [],
}: NotificareProps) => (
  <Html lang="ro" dir="ltr">
    <Head />
    <Preview>
      Solicitare nouă: {tip} — {localitate}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brand}>Solicitare nouă de pe site</Text>
          <Text style={brandSub}>energyprogalati.ro — formular de contact</Text>
        </Section>
        <Heading style={h1}>
          {nume} — {tip}
        </Heading>
        <Section style={card}>
          <Text style={row}>
            <strong>Nume:</strong> {nume}
          </Text>
          <Text style={row}>
            <strong>Telefon:</strong>{' '}
            <Link href={`tel:${telefon}`} style={link}>
              {telefon}
            </Link>
          </Text>
          <Text style={row}>
            <strong>Email:</strong>{' '}
            {email ? (
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            ) : (
              'nu a fost completat'
            )}
          </Text>
          <Text style={row}>
            <strong>Localitate:</strong> {localitate}
          </Text>
          <Text style={row}>
            <strong>Tip lucrare / clădire:</strong> {tip}
          </Text>
          <Text style={row}>
            <strong>Mesaj:</strong> {mesaj || '—'}
          </Text>
          <Text style={row}>
            <strong>Data:</strong> {data}
          </Text>
        </Section>
        <Heading style={h2}>Poze și documente încărcate</Heading>
        {fisiere.length === 0 ? (
          <Text style={text}>Solicitantul nu a atașat fișiere.</Text>
        ) : (
          fisiere.map((f) => (
            <Text key={f.name} style={row}>
              {f.url ? (
                <Link href={f.url} style={link}>
                  {f.name}
                </Link>
              ) : (
                f.name
              )}
            </Text>
          ))
        )}
        <Hr style={hr} />
        <Text style={footer}>
          Solicitarea este salvată și în panoul de administrare (referință {id}). Linkurile către
          fișiere sunt valabile 7 zile.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SolicitareNotificare

export const template = {
  component: SolicitareNotificare,
  subject: (d: Record<string, any>) =>
    `Solicitare nouă: ${d['tip'] ?? 'audit energetic'} — ${d['localitate'] ?? 'Galați'}`,
  displayName: 'Notificare solicitare (auditor)',
  to: 'Panainte.iuliangabriel@yahoo.com',
  previewData: {
    id: '00000000-0000-0000-0000-000000000000',
    nume: 'Ion Popescu',
    telefon: '0722 111 222',
    email: 'ion@exemplu.ro',
    localitate: 'Galați',
    tip: 'Audit energetic',
    mesaj: 'Bloc de locuințe, 4 scări.',
    data: '15.09.2026, 14:20',
    fisiere: [{ name: 'plan.pdf', url: 'https://example.com/plan.pdf' }],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#f4f7f6', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = {
  padding: '24px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  maxWidth: '600px',
}
const header = { borderBottom: '3px solid #1d4ed8', paddingBottom: '12px', marginBottom: '20px' }
const brand = { fontSize: '18px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0' }
const brandSub = { fontSize: '13px', color: '#1d4ed8', margin: '4px 0 0' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 16px' }
const h2 = { fontSize: '15px', fontWeight: 'bold' as const, color: '#0f172a', margin: '20px 0 10px' }
const text = { fontSize: '14px', color: '#41505f', lineHeight: '1.6', margin: '0 0 16px' }
const card = {
  backgroundColor: '#f1f5fb',
  borderRadius: '10px',
  padding: '16px 18px',
  margin: '0 0 16px',
}
const row = { fontSize: '14px', color: '#0f172a', lineHeight: '1.6', margin: '0 0 8px' }
const hr = { borderColor: '#e2e8e7', margin: '20px 0' }
const link = { color: '#1d4ed8', fontWeight: 'bold' as const }
const footer = { fontSize: '12px', color: '#8a949c', margin: '0' }
