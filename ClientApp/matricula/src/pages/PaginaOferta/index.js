import OfertaAcademica from "pages/OfertaAcademica";
import { useEffect, useState } from "react";

const PaginaOferta = () =>{
    const [needsRefresh, setNeedsRefresh] = useState(true);
    return(<OfertaAcademica needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh}/>)
}

export default PaginaOferta