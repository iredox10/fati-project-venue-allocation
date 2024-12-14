import React from 'react';  

const Table = ({data,onclick}) => {  

    return (  
        <div className="overflow-x-auto">  
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">  
                <thead>  
                    <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">  
                        <th className="py-3 px-6 text-left">#</th>  
                        <th className="py-3 px-6 text-left">Course Name</th>  
                        <th className="py-3 px-6 text-left">Course Code</th>  
                        <th className="py-3 px-6 text-left">number of Students</th>  
                        <th className="py-3 px-6 text-left">Duration</th>  
                        <th className="py-3 px-6 text-left">Venue Assign</th>  
                    </tr>  
                </thead>  
                <tbody className="text-gray-600 text-sm font-light cursor-pointer">  
                    {data.map((course,i) => (  
                        <tr onClick={() =>onclick(course.slug)} key={course._id} className="border-b border-gray-300 hover:bg-gray-100">  
                            <td className="py-3 px-6">{i+1}</td>  
                            <td  className="py-3 px-6">{course.name}</td>  
                            <td className="py-3 px-6">{course.code}</td>  
                            <td className="py-3 px-6">{course.noOfStudents}</td>  
                            <td className="py-3 px-6">{course.duration}</td>  
                            <td className="py-3 px-6">{course.venue ? course.venue : 'not assign'}</td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>  
    );  
};  

export default Table;