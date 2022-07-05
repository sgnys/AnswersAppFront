export const changeDate = (date: Date): string=> {
    const time = new Date(date)

    if(time.getDate() < 10){
        return "0"+ time.toLocaleDateString();
    }
    return  time.toLocaleDateString();
}