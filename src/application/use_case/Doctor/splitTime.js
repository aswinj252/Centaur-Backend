import TimeEntity from "../../../entities/Time.js"
import moment from "moment/moment.js"
const splitTime = async(startingTime,endingTime,slots,date,docId,id,repository)=>{
    
    const inputDate = new Date(startingTime);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedSTime = inputDate.toLocaleTimeString(undefined, options);


    const inputEDate = new Date(endingTime);
    const option = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedETime = inputEDate.toLocaleTimeString(undefined, option);

    const start = moment(formattedSTime, 'h:mm A');
    const end = moment(formattedETime, 'h:mm A');

    const duration = end.diff(start, 'minutes');
    const slotDuration = duration / slots;

    const slot = [];
    let currentSlot = start.clone();

    for (let i = 0; i < slots; i++) {
        const slotStartTime = currentSlot.format('h:mm A');
        currentSlot.add(slotDuration, 'minutes');
        const slotEndTime = currentSlot.format('h:mm A');
        const type = "videoBooking"
    
        slot.push({date ,time: slotStartTime,docId,Id:id,type });
      }
    
      console.log(slot,"slot");
    // const details = await TimeEntity(slot)
    const Time = await repository.split(slot)
    return {Time}
    }

export default splitTime