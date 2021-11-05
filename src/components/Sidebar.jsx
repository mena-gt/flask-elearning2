import React from 'react';
import {Link} from 'react-router-dom';

import './sidebar.css';
import '../boxicons-2.0.7/css/boxicons.min.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

/**
  <script>

  let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
   let arrowParent = e.target.parentElement.parentElement;
   arrowParent.classList.toggle("showMenu");
    });
  }

  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".bx-menu");
  console.log(sidebarBtn);
  sidebarBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });
  </script>
 */


    render() {
        let classSidebar = 'sidebar'; 
        classSidebar += this.props.close ? ' close' : '' ;
        return (
            <div className={classSidebar}>
                <div className="logo-details">
                    <i className='bx bxl-c-plus-plus'></i>
                    <span className="logo_name">CodingLab</span>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/courses">
                            <i className='bx bxs-book-reader'></i>
                            <span className="link_name">Courses</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Courses</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="iocn-link">
                            <a href="#">
                                <i className='bx bx-collection' ></i>
                                <span className="link_name">Category</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Category</a></li>
                            <li><a href="#">HTML & CSS</a></li>
                            <li><a href="#">JavaScript</a></li>
                            <li><a href="#">PHP & MySQL</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="iocn-link">
                            <a href="#">
                                <i className='bx bx-book-alt' ></i>
                                <span className="link_name">Posts</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Posts</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Login Form</a></li>
                            <li><a href="#">Card Design</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-pie-chart-alt-2' ></i>
                            <span className="link_name">Analytics</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Analytics</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-line-chart' ></i>
                            <span className="link_name">Chart</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Chart</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="iocn-link">
                            <a href="#">
                                <i className='bx bx-plug' ></i>
                                <span className="link_name">Plugins</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Plugins</a></li>
                            <li><a href="#">UI Face</a></li>
                            <li><a href="#">Pigments</a></li>
                            <li><a href="#">Box Icons</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-compass' ></i>
                            <span className="link_name">Explore</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Explore</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-history'></i>
                            <span className="link_name">History</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">History</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-cog' ></i>
                            <span className="link_name">Setting</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Setting</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="profile-details">
                            <div className="profile-content">
                                <img src="image/profile.jpg" alt="profile" />
                            </div>
                            <div className="name-job">
                                <div className="profile_name">Prem Shahi</div>
                                <div className="job">Web Desginer</div>
                            </div>
                            <i className='bx bx-log-out' ></i>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;