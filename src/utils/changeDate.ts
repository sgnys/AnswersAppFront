export const changeDate = (date: Date | undefined): string | undefined=> {
    if(date !== undefined){
        const time = new Date(date)

        if(time.getDate() < 10){
            return "0"+ time.toLocaleDateString();
        }
        return  time.toLocaleDateString();
    }
}