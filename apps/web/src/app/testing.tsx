try {
  // First query: Get all transactions for the given userId
  const userId = res.locals.user.id;
  console.log('userId', userId);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
    select: {
      eventId: true,
      status: true, // Include the status field
    },
  });
  console.log('transactions', transactions);

  // Group transactions by eventId and count tickets
  const eventTicketCount = transactions.reduce(
    (acc, transaction) => {
      acc[transaction.eventId] = (acc[transaction.eventId] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  // Extract unique eventIds and convert them to numbers
  const eventIds = Object.keys(eventTicketCount).map((id) => Number(id));

  if (eventIds.length === 0) {
    return res.json([]); // No events found for the user
  }

  // Second query: Get events by eventIds
  const events = await prisma.event.findMany({
    where: {
      id: {
        in: eventIds, // Use the extracted unique eventIds
      },
    },
  });
  console.log('events', events);

  // Combine events with their ticket counts and status
  const eventsWithTicketCountsAndStatus = events.map((event) => ({
    ...event,
    ticketCount: eventTicketCount[event.id],
    status: transactions.find((t) => t.eventId === event.id)?.status || null,
  }));

  return res.json(eventsWithTicketCountsAndStatus);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}
