const ScheduleEntity = (startingTime, endingTime, slots, date, docId) => {
  return {
    getStarting: () => startingTime,
    getEnding: () => endingTime,
    getSlots: () => slots,
    getDate: () => date,
    getDocId: () => docId,
  };
};

export default ScheduleEntity;
