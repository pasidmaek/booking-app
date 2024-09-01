import bookingData from '../data/booking-data.json'

const checkAvailability = (roomId: string, startTime: Date, endTime: Date) => {
  const roomIdBook = bookingData.filter((room) => room.roomId === roomId)
  return roomIdBook.every((booking) => {
    return (
      endTime <= new Date(booking?.startTime) || startTime >= new Date(booking?.endTime)
    );
  })
}

const getBookingsForWeek = (roomId: string, selectedDate: Date, weekNo: 'today' | 't-week' | 'n-week' | 'w-month') => {
  const today = selectedDate ?? new Date()
  today.setHours(0, 0, 0, 0);
  console.log("-------------------------------")

  switch (weekNo) {
    case 'today':
      return bookingData.filter((booking) => {
        const bookingStart = new Date(booking.startTime);
        bookingStart.setHours(0, 0, 0, 0);
        const bookingEnd = new Date(booking.endTime);
        bookingEnd.setHours(0, 0, 0, 0);

        return (
          booking.roomId === roomId &&
          (today.valueOf() === bookingStart.valueOf() || today.valueOf() === bookingEnd.valueOf())
        );
      });

    case 't-week':
      //set to sunday
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      console.log("STARTWEEK", startOfWeek)

      //set to saturday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      console.log("ENDWEEK", endOfWeek)

      return bookingData.filter((booking) => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);

        return (
          booking.roomId === roomId &&
          (bookingStart <= endOfWeek && bookingEnd >= startOfWeek)
        );
      });

    case 'n-week':
      const startOfNextWeek = new Date(today);
      startOfNextWeek.setDate(today.getDate() - today.getDay() + 7);
      startOfNextWeek.setHours(0, 0, 0, 0);
      console.log("STARTWEEK", startOfNextWeek)

      const endOfNextWeek = new Date(startOfNextWeek);
      endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
      endOfNextWeek.setHours(23, 59, 59, 999);
      console.log("ENDWEEK", endOfNextWeek)

      return bookingData.filter((booking) => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);

        return (
          booking.roomId === roomId &&
          (bookingStart <= endOfNextWeek && bookingEnd >= startOfNextWeek)
        );
      });

    case 'w-month':
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0);
      console.log("STARTMONTH", startOfMonth)

      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);
      console.log("ENDMONTH", endOfMonth)

      return bookingData.filter((booking) => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);

        return (
          booking.roomId === roomId &&
          (bookingStart <= endOfMonth && bookingEnd >= startOfMonth)
        );
      });

    default:
      return [];
  }
}

export { checkAvailability, getBookingsForWeek }