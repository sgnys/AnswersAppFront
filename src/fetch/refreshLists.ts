export const refreshLists = async (path: string, setState: Function, setError: Function) =>{
    setState(null);
    try {
        const res = await fetch(`http://localhost:3001${path}`)

        if (res.status === 404) {
            throw new Error("Nie można połączyć się z serwerem")
        }

        if ([400, 500].includes(res.status)) {

            const error = await res.json();
            setError(error.message);
            throw new Error(error.message);

        }
        const data = await res.json();
        setState(data);

    } catch (error: any) {
        setError(error.message);
    }


    // setState(null);
    // const res = await fetch(`http://localhost:3001${path}`);
    // const data = await res.json();
    // setState(data);
};