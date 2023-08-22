const TimeEntity = (eventArray) => {
    const timeEntities = eventArray.map(event => {
        console.log(event.Id,"fdfddfdf");
        return {
            getDate: () => event.date,
            getTime: () => event.time,
            getDocId: () => event.docId,
            getAppId: () => event.Id
        };
    });

    return timeEntities;
};

export default TimeEntity;
