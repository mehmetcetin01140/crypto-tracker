import React, { useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAppState, setModalShow } from "../store/slices/app-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faHouse,
  faMagnifyingGlass,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "../utils/use-media-query";

export default function SideBar() {
  const dispatch = useDispatch();
  const location = useLocation()
  const { modalShow } = useSelector(getAppState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isBreakpoint: boolean = useMediaQuery("(max-width:992px)");
  useEffect(()=>{
    setIsOpen(false)
  },[location])
  const RenderLinks = () => {
    return (
      <>
        <ul>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li>
              <FontAwesomeIcon icon={faHouse} fontSize={17} />
              Main Page
            </li>
          </Link>
          <li onClick={() => dispatch(setModalShow(!modalShow))}>
            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={17} />
            <span>Tracking Coins</span>
          </li>
          <Link to={"/news"} style={{ textDecoration: "none" }}>
            <li>
              <FontAwesomeIcon icon={faNewspaper} fontSize={17} />
              News
            </li>
          </Link>
        </ul>
      </>
    );
  };
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to={"/"}>
          <img
            src="https://media.licdn.com/dms/image/C4D0BAQH8qVqu_noW_w/company-logo_200_200/0/1528281855463?e=1684972800&v=beta&t=luCvxUBgwkEvSSVZ3jEphQA_eyB-rl1doHBqJbCWkdo"
            alt="logo"
          />
        </Link>
      </div>
      <FontAwesomeIcon
        fontSize={isOpen ? 34 : 30}
        icon={isOpen ? faXmark : faBars}
        onClick={() => setIsOpen(!isOpen)}
        className="bar-icon"
        style={{ zIndex: 33, cursor: "pointer" }}
      />
      {isOpen && isBreakpoint && (
        <div className="responsive-menu">
          <div className="sidebar-logo">
            <Link to={"/"}>
              <img
                src="https://media.licdn.com/dms/image/C4D0BAQH8qVqu_noW_w/company-logo_200_200/0/1528281855463?e=1684972800&v=beta&t=luCvxUBgwkEvSSVZ3jEphQA_eyB-rl1doHBqJbCWkdo"
                alt="logo"
              />
            </Link>
          </div>
          <RenderLinks />
        </div>
      )}
      <div className="sidebar-links">
        <RenderLinks />
      </div>
    </div>
  );
}
