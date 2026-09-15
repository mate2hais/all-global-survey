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

interface ConfirmareProps {
  nume?: string
  telefon?: string
  localitate?: string
  tip?: string
  mesaj?: string | null
  fisiere?: string[]
}

export const SolicitareConfirmare = ({
  nume = 'Client',
  telefon = '',
  localitate = '',
  tip = '',
  mesaj = '',
  fisiere = [],
}: ConfirmareProps) => (
  <Html lang="ro" dir="ltr">
    <Head />
    <Preview>Am primit solicitarea dumneavoastră de audit energetic</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brand}>Iulian Gabriel Panainte</Text>
          <Text style={brandSub}>Auditor energetic Gradul I — Galați</Text>
        </Section>
        <Heading style={h1}>Solicitarea dumneavoastră a fost înregistrată</Heading>
        <Text style={text}>
          Bună ziua, {nume}! Vă mulțumesc pentru încredere. Am primit solicitarea dumneavoastră și
          vă voi contacta în cel mai scurt timp pentru a stabili detaliile și oferta.
        </Text>
        <Section style={card}>
          <Text style={row}>
            <strong>Tip lucrare:</strong> {tip}
          </Text>
          <Text style={row}>
            <strong>Localitate:</strong> {localitate}
          </Text>
          <Text style={row}>
            <strong>Telefon:</strong> {telefon}
          </Text>
          {mesaj ? (
            <Text style={row}>
              <strong>Mesaj:</strong> {mesaj}
            </Text>
          ) : null}
          {fisiere.length > 0 ? (
            <Text style={row}>
              <strong>Documente atașate:</strong> {fisiere.join(', ')}
            </Text>
          ) : null}
        </Section>
        <Hr style={hr} />
        <Text style={text}>
          Pentru orice detaliu suplimentar mă puteți contacta la{' '}
          <Link href="tel:+40773932496" style={link}>
            0773.932.496
          </Link>{' '}
          sau pe WhatsApp.
        </Text>
        <Text style={footer}>Iulian Gabriel Panainte — Auditor energetic Gradul I, CAA nr. 02471</Text>
      </Container>
    </Body>
  </Html>
)

export default SolicitareConfirmare

export const template = {
  component: SolicitareConfirmare,
  subject: 'Am primit solicitarea dumneavoastră — audit energetic Galați',
  displayName: 'Confirmare solicitare (client)',
  previewData: {
    nume: 'Ion Popescu',
    telefon: '0722 111 222',
    localitate: 'Galați',
    tip: 'CPE (Certificat de performanță energetică)',
    mesaj: 'Apartament 3 camere, 78 mp.',
    fisiere: ['plan.pdf'],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#f4f7f6', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = {
  padding: '24px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  maxWidth: '600px',
}
const header = { borderBottom: '3px solid #0f766e', paddingBottom: '12px', marginBottom: '20px' }
const brand = { fontSize: '18px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0' }
const brandSub = { fontSize: '13px', color: '#0f766e', margin: '4px 0 0' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#41505f', lineHeight: '1.6', margin: '0 0 16px' }
const card = {
  backgroundColor: '#f1f6f5',
  borderRadius: '10px',
  padding: '16px 18px',
  margin: '0 0 16px',
}
const row = { fontSize: '14px', color: '#0f172a', lineHeight: '1.6', margin: '0 0 8px' }
const hr = { borderColor: '#e2e8e7', margin: '20px 0' }
const link = { color: '#0f766e', fontWeight: 'bold' as const }
const footer = { fontSize: '12px', color: '#8a949c', margin: '24px 0 0' }
