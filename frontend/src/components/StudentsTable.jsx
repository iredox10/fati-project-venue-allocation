import React from 'react';  

const StudentsTable = ({data}) => {  
    // Sample Data  

    return (  
        <div className="overflow-x-auto">  
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">  
                <thead>  
                    <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">  
                        <th className="py-3 px-6 text-left">Full Name</th>  
                        <th className="py-3 px-6 text-left">Candidate No</th>  
                        <th className="py-3 px-6 text-left">Department</th>  
                        <th className="py-3 px-6 text-left">Level</th>  
                    </tr>  
                </thead>  
                <tbody className="text-gray-600 text-sm font-light">  
                    {data.map((candidate, index) => (  
                        <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">  
                            <td className="py-3 px-6">{candidate.fullName}</td>  
                            <td className="py-3 px-6">{candidate.candidateNo}</td>  
                            <td className="py-3 px-6">{candidate.department}</td>  
                            <td className="py-3 px-6">{candidate.level}</td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>  
    );  
};  

export default StudentsTable;