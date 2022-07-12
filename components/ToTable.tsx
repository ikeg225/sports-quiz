export default function ToTable({ rows } : any) {    
    const rowsJSON = JSON.parse(rows)
    return (
        <table className="w-full text-left font-body mb-10">
            <tbody>
                {rowsJSON.map((row : any) => (
                    <tr className="border-b-[1px] border-gray-400">
                        {row.map((value : any) => (
                            <td className="py-3 first:pl-0 last:pr-0 px-5">{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}