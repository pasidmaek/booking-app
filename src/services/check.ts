import bookingData from '../data/booking-data.json'

const checkAvailability = (roomId: string, startTime: string, endTime: string) => {\
  //TODO: check is Available (startDate and booking.startTime) 
  const roomIdBook = bookingData.filter((room) => room.roomId === roomId)
  return roomIdBook.every((booking) => {
    console.log(endTime)
    console.log(startTime)
    console.log(booking?.startTime)
    console.log(booking?.endTime)
    return (
      endTime <= booking?.startTime && startTime >= booking?.endTime
    );
  })
}

const getBookingsForWeek = (roomId: string, weekNo: 'today' | 't-week' | 'n-week') => {
  const today = new Date()

  switch (weekNo) {
    case 'today':
      return bookingData.filter((booking) => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);
        return (
          booking.roomId === roomId &&
          today >= bookingStart &&
          today <= bookingEnd
        )
      });

    case 't-week':
      return bookingData.filter((booking) => {
        const startOfWeek = new Date();
        startOfWeek.setDate(today.getDate() + today.getDay());
        const endOfWeek = new Date();
        endOfWeek.setDate(today.getDate() + 6);

        const bookingStart = new Date(booking.startTime);
        return (
          booking.roomId === roomId &&
          bookingStart >= startOfWeek &&
          bookingStart <= endOfWeek
        )
      });

    case 'n-week':
      return bookingData.filter((booking) => {
        const startOfNextWeek = new Date();
        startOfNextWeek.setDate(today.getDate() - today.getDay() + 7);
        const endOfNextWeek = new Date(startOfNextWeek);
        endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

        const bookingStart = new Date(booking.startTime);
        return (
          booking.roomId === roomId &&
          bookingStart >= startOfNextWeek &&
          bookingStart <= endOfNextWeek
        )
      });

    default:
      return [];
  }
}

export { checkAvailability, getBookingsForWeek }