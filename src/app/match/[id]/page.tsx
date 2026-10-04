import { notFound } from 'next/navigation';
import { MatchScreen } from '@/components/match/match-screen';
import { MOCK_MATCHES } from '@/data/mockData';

export function generateStaticParams() {
  return MOCK_MATCHES.map((match) => ({ id: match.id }));
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = MOCK_MATCHES.find((entry) => entry.id === id);
  if (!match) notFound();

  return <MatchScreen match={match} />;
}
