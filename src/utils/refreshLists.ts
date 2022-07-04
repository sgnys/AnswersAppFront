export const refreshLists = async (path: string, setState: Function) =>{
    setState(null);
    const res = await fetch(`http://localhost:3001${path}`);
    const data = await res.json();
    setState(data);
};