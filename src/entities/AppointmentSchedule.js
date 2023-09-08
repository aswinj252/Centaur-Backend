const ScheduleEntity = (startingTime, endingTime, slots, date, docId,Apptype) => {
  return {
    getStarting: () => startingTime,
    getEnding: () => endingTime,
    getSlots: () => slots,
    getDate: () => date,
    getDocId: () => docId,
    getType: () => Apptype

  };
};

export default ScheduleEntity;
