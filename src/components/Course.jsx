import { useState } from "react";
import { authrequest } from "../utils/api"

export default function Course({cours}) {
    const [course, setCourse] = useState(cours)
    return course ? (
    <div className="col-lg-4 col-md-6">
<div className="classes-item">
    <div className="bg-light rounded-circle w-75 mx-auto p-3">
        <img className="img-fluid rounded-circle" src="img/Maxwell.png" alt="" />
    </div>
    <div className="bg-light rounded p-4 pt-5 mt-n5">
        <a className="d-block text-center h3 mt-3 mb-4"
            href="">{course.name}</a>
        <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
                <div className="ms-3">
                    <h6 className="text-primary mb-1">{course.ownername} | {course.contractid}</h6>
                    <small>Teacher</small>
                </div>
            </div>
            <span id="coursebtn" onClick={async () => {
                        if(course.goal-course.balance <= 0) {
                            alert("Test Key: arduino")
                            return
                        }
                        const token = localStorage.getItem('token')
                        const ammount = parseInt(prompt('insert ammount in HBAR'))
                        try {
                            const r = await fetch('http://localhost:3000/api/v1/course/pay', {
                    body: JSON.stringify({
                        contractId: course.contractid,
                        ammount 
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: "post"
                });
                            const req = await r.json() 
                            setCourse({
                                name: course.name,
                                ownername: course.ownername,
                                contractid: course.contractid,
                                goal: course.goal,
                                balance: course.balance + ammount 
                            })
                        } catch(e) {
                            alert("transaction failed: ammount is higher than goal")
                            console.log(e)
                        }
                                             
                    }} className="bg-primary text-white rounded-pill py-2 px-3" href="">{course.goal-course.balance > 0 ? course.goal-course.balance +  " HBAR left" : "Get Key"}</span>
        </div>
    </div>
</div>
</div>
): <></>;

}