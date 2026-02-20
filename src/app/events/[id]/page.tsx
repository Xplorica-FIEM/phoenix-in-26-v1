import { EVENTS } from '@/data/events';
import EventDetails from './EventDetails';

export async function generateStaticParams() {
  return EVENTS.map((event) => ({
    id: event.id.toString(),
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <EventDetails id={id} />;
}
