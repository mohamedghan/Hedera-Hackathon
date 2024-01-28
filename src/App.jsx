import { useEffect, useState, Suspense } from 'react'
import  Course from './components/Course.jsx'
import { useLoaderData, Await } from 'react-router-dom';
import './App.css'

function App() {
    const { courses, user } = useLoaderData();

  return (

    <Suspense fallback={
    <div id="spinner"
    className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
    <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
        <span className="sr-only">Loading...</span>
    </div>
    </div>}>
    <Await resolve={Promise.all([courses,user])}>
      {([courses, user]) => (
        <div className=" container-xxl bg-white p-0">
        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
            <a href="index.html" className="navbar-brand">
                <h1 className="m-0 text-primary"><i className="fa">MetaVersity</i></h1>
            </a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav mx-auto">
                    <a href="index.html" className="nav-item nav-link active">Home</a>
                    <a href="#Mission" className="nav-item nav-link">Our Mission</a>
                    <a href="#Teach" className="nav-item nav-link">Become a teacher</a>
                    <a href="#Courses" className="nav-item nav-link">Courses</a>
                    <a href="#AXE US" className="nav-item nav-link">AXE US</a>
                    <a href="store.html" className="nav-item nav-link">Store</a>
                </div>
                <a id="sign" onClick={() => {
                    localStorage.removeItem("token")
                    window.location = "/login" 
                }}  className="btn btn-primary rounded-pill px-3 d-none d-lg-block">{user.username}</a>
            </div>
        </nav>

        <div className="container-fluid p-0 mb-5">

        </div>
        <div id="Mission" className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto mb-5" style={{maxWidth: "600px"}}>
                    <h1 className="mb-3">Our Mission</h1>
                    <p>Metaversity reimagines education in the digital age, merging advanced technology with limitless
                        creativity to transform
                        learning. It’s a platform where knowledge transcends traditional boundaries, empowering learners
                        to explore, create, and
                        innovate in a vibrant, virtual universe.</p>
                </div>
                <div className="row g-4">
                    <div className="col-lg-3 col-sm-6">
                        <div className="facility-item">
                            <div className="facility-icon bg-primary">
                                <span className="bg-primary"></span>

                                <span className="bg-primary"></span>
                            </div>
                            <div className="facility-text bg-primary">
                                <h3 className="text-primary mb-3">Facilitate conveying complex ideas</h3>
                                <p className="mb-0">Complex ideas, especially those that are spatial or dynamic, can be
                                    better understood through interactive 3D models that are omnipresent</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="facility-item">
                            <div className="facility-icon bg-success">
                                <span className="bg-success"></span>

                                <span className="bg-success"></span>
                            </div>
                            <div className="facility-text bg-success">
                                <h3 className="text-success mb-3">A safe experimeting ground</h3>
                                <p className="mb-0">experiment and learn from mistakes without real-world
                                    risks, which is crucial in fields like surgery, piloting, chemistry</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="facility-item">
                            <div className="facility-icon bg-warning">
                                <span className="bg-warning"></span>

                                <span className="bg-warning"></span>
                            </div>
                            <div className="facility-text bg-warning">
                                <h3 className="text-warning mb-3">Infinite resources</h3>
                                <p className="mb-0">all we need is a physics engine and we can simulate you anything you
                                    want</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div className="facility-item">
                            <div className="facility-icon bg-info">
                                <span className="bg-info"></span>

                                <span className="bg-info"></span>
                            </div>
                            <div className="facility-text bg-info">
                                <h3 className="text-info mb-3">Emprowering Teachers</h3>
                                <p className="mb-0">Being able to convey your ideas effectively can be highly
                                    attractive to individuals who might run away from teaching for its monotony</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="Teach" className="container-xxl py-5">
            <div className="container">
                <div className="bg-light rounded">
                    <div className="row g-0">
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s" style={{minHeight: "400px"}}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded" src="img/Tesla.png"
                                  style={{objectFit: "cover"}} />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <div className="h-100 d-flex flex-column justify-content-center p-5">
                                <h1 className="mb-4">Become A Teacher</h1>
                                <p className="mb-4">if you are talented in teaching and want to make a living out of it and
                                    enlighten thousands of people , this is the where to start
                                </p>
                                <a className="btn btn-primary py-3 px-5" onClick={async () => {
                                    const name = prompt("add the course name")
                                    const token = localStorage.getItem("token")
                                    const ammount = parseInt(prompt("add goal to be reached"))
                                    const r = await fetch('http://localhost:3000/api/v1/course', {
                                        body: JSON.stringify({
                                            name,
                                            ammount 
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${token}`,
                                        },
                                        method: "post"
                                    });
                                    window.location = "/"
                                }} href="">Add course<i
                                        className="fa fa-arrow-right ms-2"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="Courses" className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
                    <h1 className="mb-3">Metaversity Classes</h1>
                    <p>Here's a simple preview of The Courses our users love most</p>
                </div>
                <div className="row g-4">
                {
                    courses.map(e => <Course key={e.id} cours={e} />)
                }
                  <Course title={"Arduino"} teacher={"chater"} money={1000} image={"img/Maxwell.png"} />
                  <Course title={"Mechanical Engines"} teacher={"ghassen"} money={5500} image={"img/Engines.png"} />
                  <Course title={"Basic chemistry"} teacher={"Bachir"} money={8500} image={"img/Maxwell.png"} />
                  <Course title={"Neurology"} teacher={"Baha"} money={2560} image={"img/Maxwell.png"}/>
                  <Course title={"Architecture"} teacher={"fedi"} money={3560} image={"img/Maxwell.png"}/>
                </div>
            </div>
        </div>
        <div id="AXE US" className="container-xxl py-5">
            <div className="container">
                <div className="bg-light rounded">
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <div className="h-100 d-flex flex-column justify-content-center p-5">
                                <h1 className="mb-4">ask any question or make any suggestion</h1>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control border-0" id="gname"
                                                    placeholder="Gurdian Name" />
                                                <label htmlFor="gname">First Name</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control border-0" id="gmail"
                                                    placeholder="Gurdian Email" />
                                                <label htmlFor="gmail">Last Name</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control border-0" id="cname"
                                                    placeholder="Child Name" />
                                                <label htmlFor="cname">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control border-0" id="cage"
                                                    placeholder="Child Age" />
                                                <label htmlFor="cage">Topic</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control border-0"
                                                    placeholder="Leave a message here" id="message"
                                                    style={{height: "100px"}}></textarea>
                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6"style={{minHeight: "400px"}}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded" src="img/AXEUS.png"
                                    style={{objectFit: "cover"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>
      )}
    </Await>
  </Suspense>

    
  )
}

export default App
