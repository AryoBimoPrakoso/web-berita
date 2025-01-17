import { Link } from "@inertiajs/react";
import React from "react";

const Paginator = ({ meta }) => {

    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    return (
        <div className="join">
            {prev && <Link href={prev} className="join-item btn bg-white text-black border-hidden shadow-xl hover:text-white">«</Link> }
            <Link className="join-item btn bg-white text-black border-hidden hover:text-white shadow-xl ">{current}</Link>
            {next && <Link href={next} className="join-item btn bg-white text-black border-hidden hover:text-white shadow-xl">»</Link> }
        </div>
    );
};

export default Paginator;
 