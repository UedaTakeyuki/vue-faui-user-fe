export default {
  methods: {
    toDateString(unixtime){
      if (unixtime == 0){
        return ""
      } else {
        let dateTime = new Date(unixtime);
        let dtstr = dateTime.toString()
        console.log(dtstr)
        let dtstrs = dtstr.split(' ');
        dtstrs.splice(3,1) // delete milli second.
        dtstrs.splice(4,2) // delete timezone.
        dtstrs.push(String(dateTime.getFullYear()))
        console.log(dateTime.getFullYear())
        return dtstrs.join(' ')
      }
    }
  }
}