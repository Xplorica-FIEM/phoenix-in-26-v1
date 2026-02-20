import EventDetails from './EventDetails';

export async function generateStaticParams() {
  try {
    const response = await fetch('https://phoenix-app-2-0-backend-nodejs-qqwx.onrender.com/api/catalog/events');
    const result = await response.json();

    if (result.status === 'success' && result.data) {
      return result.data.map((event: { event_id: number }) => ({
        id: event.event_id.toString(),
      }));
    }
  } catch (error) {
    console.error('Failed to generate static params for events:', error);
  }
  return [];
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <EventDetails id={id} />;
}
